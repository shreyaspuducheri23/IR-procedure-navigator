/**
 * The in-site editor's backend: read an article from the repo, and commit an
 * edited one straight to the publishing branch. The push triggers the normal
 * GitHub Actions deploy, so a save is live a couple of minutes later.
 *
 * Saves are open by design (no login), so everything here assumes a hostile
 * caller. The guarantees, in order of importance:
 *
 *   1. Path jail. The only paths ever written are
 *        content/articles/<slug>/article.json
 *        content/articles/<slug>/images/<safe-name>
 *      built from validated pieces, never from a client-supplied path. A save
 *      cannot touch code, workflows, or another article.
 *   2. Deploy safety. The article passes the same schema and cross-file checks
 *      as CI (src/schema), so a save cannot break the build for everyone.
 *   3. No silent overwrite. A save names the version it was based on; if the
 *      article changed since, it is refused with 409.
 */
import { articleSchema } from "../../src/schema/article.ts";
import type { Article } from "../../src/schema/article.ts";
import { unknownFields, validateArticle, walkArticleBlocks } from "../../src/schema/validate.ts";
import type { Cors, Env } from "./http.ts";
import { isAllowedOrigin, json } from "./http.ts";
import { github, GitHubError } from "./github.ts";

const ARTICLES_DIR = "content/articles";
const SLUG = /^[a-z0-9][a-z0-9-]{0,79}$/;
const IMAGE_NAME = /^[a-z0-9][a-z0-9._-]{0,79}\.(png|jpe?g|webp|gif)$/;
const BASE64 = /^[A-Za-z0-9+/]*={0,2}$/;

const MAX_ARTICLE_BYTES = 300 * 1024;
const MAX_IMAGES = 4;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
/** Images travel as base64 (4/3 the size), plus the article and some slack. */
const MAX_BODY_BYTES = Math.ceil((MAX_IMAGES * MAX_IMAGE_BYTES * 4) / 3) + MAX_ARTICLE_BYTES + 64 * 1024;
const EDITOR_MAX = 60;
const NOTE_MAX = 300;

type DirEntry = { name: string; type: string; sha: string };
type UploadedImage = { name: string; data: string };

/** What the repo holds for one article at one commit. */
type ArticleState = {
  /** Blob SHA of article.json, or null when the article does not exist. */
  sha: string | null;
  images: string[];
};

function branch(env: Env): string {
  return env.GITHUB_BRANCH ?? "main";
}

function fail(message: string, status: number, cors: Cors, extra: Record<string, unknown> = {}): Response {
  return json({ ok: false, error: message, ...extra }, status, cors);
}

async function listDir(env: Env, path: string, ref: string): Promise<DirEntry[] | null> {
  const entries = await github<DirEntry[] | DirEntry>(
    env,
    "GET",
    `/contents/${path}?ref=${encodeURIComponent(ref)}`,
    { allow: [404], what: `listing ${path}` },
  );
  return Array.isArray(entries) ? entries : null;
}

async function readArticleState(env: Env, id: string, ref: string): Promise<ArticleState> {
  const entries = await listDir(env, `${ARTICLES_DIR}/${id}`, ref);
  if (!entries) return { sha: null, images: [] };
  const file = entries.find((entry) => entry.name === "article.json" && entry.type === "file");
  const hasImages = entries.some((entry) => entry.name === "images" && entry.type === "dir");
  const images = hasImages ? await listDir(env, `${ARTICLES_DIR}/${id}/images`, ref) : null;
  return {
    sha: file?.sha ?? null,
    images: (images ?? []).filter((entry) => entry.type === "file").map((entry) => entry.name),
  };
}

function decodeBase64Utf8(value: string): string {
  const binary = atob(value.replace(/\s/g, ""));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/** The SHA git gives a file's content, so we can name a blob without asking GitHub. */
async function gitBlobSha(text: string): Promise<string> {
  const body = new TextEncoder().encode(text);
  const header = new TextEncoder().encode(`blob ${body.length}\0`);
  const bytes = new Uint8Array(header.length + body.length);
  bytes.set(header);
  bytes.set(body, header.length);
  const digest = await crypto.subtle.digest("SHA-1", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/** Key-order-independent JSON, for comparing what was sent with what the schema kept. */
function canonical(value: unknown): string {
  return JSON.stringify(value, (_key, inner: unknown) =>
    inner && typeof inner === "object" && !Array.isArray(inner)
      ? Object.fromEntries(Object.entries(inner).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)))
      : inner,
  );
}

/** Commit messages and logs are single-line fields; keep stray control characters out. */
function cleanLine(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max);
}

function sameSecret(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// ---------------------------------------------------------------------------
// GET /content/articles/:id
// ---------------------------------------------------------------------------

async function loadArticle(env: Env, id: string, cors: Cors): Promise<Response> {
  const file = await github<{ content?: string; sha: string }>(
    env,
    "GET",
    `/contents/${ARTICLES_DIR}/${id}/article.json?ref=${encodeURIComponent(branch(env))}`,
    { allow: [404], what: "reading the article" },
  );
  if (!file || typeof file.content !== "string") {
    return fail("That article does not exist.", 404, cors);
  }

  let article: unknown;
  try {
    article = JSON.parse(decodeBase64Utf8(file.content));
  } catch {
    return fail("The stored article is not valid JSON.", 502, cors);
  }

  const images = await listDir(env, `${ARTICLES_DIR}/${id}/images`, branch(env));
  return json(
    {
      ok: true,
      article,
      sha: file.sha,
      images: (images ?? []).filter((entry) => entry.type === "file").map((entry) => entry.name),
    },
    200,
    cors,
  );
}

// ---------------------------------------------------------------------------
// PUT /content/articles/:id
// ---------------------------------------------------------------------------

type SaveRequest = {
  article: Article;
  /** Exactly what gets committed: the client's key order, two-space indent. */
  text: string;
  baseSha: string | null;
  editor: string;
  note: string;
  images: UploadedImage[];
};

function parseSave(raw: string, id: string): SaveRequest | string {
  let payload: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return "Malformed request.";
    payload = parsed as Record<string, unknown>;
  } catch {
    return "Malformed request.";
  }

  const result = articleSchema.safeParse(payload.article);
  if (!result.success) {
    const issue = result.error.issues[0];
    return `The article is not valid: ${issue?.path.join(".") || "article"} — ${issue?.message ?? "unknown problem"}`;
  }
  // zod drops keys it does not know. Committing the client's object keeps its
  // key order (so diffs stay small), which is only safe if nothing was dropped.
  if (canonical(payload.article) !== canonical(result.data)) {
    const [field] = unknownFields(payload.article, result.data);
    return `The article contains a field the schema does not allow${field ? `: ${field}` : "."}`;
  }
  if (result.data.id !== id) {
    return `The article id "${result.data.id}" does not match the address "${id}".`;
  }

  const text = JSON.stringify(payload.article, null, 2) + "\n";
  if (text.length > MAX_ARTICLE_BYTES) return "The article is too large.";

  const baseSha = payload.baseSha ?? null;
  if (baseSha !== null && (typeof baseSha !== "string" || !/^[0-9a-f]{40}$/.test(baseSha))) {
    return "Malformed request.";
  }

  const editor = cleanLine(payload.editor, EDITOR_MAX);
  if (!editor) return "Please enter your name.";

  const images: UploadedImage[] = [];
  const rawImages = payload.images ?? [];
  if (!Array.isArray(rawImages) || rawImages.length > MAX_IMAGES) {
    return `At most ${MAX_IMAGES} new images per save.`;
  }
  for (const entry of rawImages as unknown[]) {
    const image = entry as { name?: unknown; data?: unknown } | null;
    if (!image || typeof image.name !== "string" || typeof image.data !== "string") {
      return "Malformed request.";
    }
    if (!IMAGE_NAME.test(image.name)) return `Image name not allowed: ${image.name.slice(0, 80)}`;
    if (images.some((other) => other.name === image.name)) return `Duplicate image: ${image.name}`;
    if (image.data.length === 0 || image.data.length % 4 !== 0 || !BASE64.test(image.data)) {
      return `Image ${image.name} is not valid.`;
    }
    if ((image.data.length * 3) / 4 > MAX_IMAGE_BYTES) return `Image ${image.name} is too large.`;
    images.push({ name: image.name, data: image.data });
  }

  return {
    article: result.data,
    text,
    baseSha,
    editor,
    note: cleanLine(payload.note, NOTE_MAX),
    images,
  };
}

type CommitResult =
  | { kind: "done"; commit: string | null }
  | { kind: "moved" }
  | { kind: "refused"; response: Response };

/** One attempt to commit on top of the branch's current head. */
async function tryCommit(env: Env, id: string, save: SaveRequest, newSha: string, cors: Cors): Promise<CommitResult> {
  const refused = (message: string, status: number, extra?: Record<string, unknown>): CommitResult => ({
    kind: "refused",
    response: fail(message, status, cors, extra),
  });

  const ref = await github<{ object: { sha: string } }>(env, "GET", `/git/ref/heads/${branch(env)}`, {
    what: "reading the branch",
  });
  const head = ref!.object.sha;

  const [state, articleDirs] = await Promise.all([
    readArticleState(env, id, head),
    listDir(env, ARTICLES_DIR, head),
  ]);

  if (save.baseSha === null && state.sha !== null) {
    return refused("An article with this address already exists. Choose a different title.", 409, {
      conflict: "exists",
    });
  }
  if (save.baseSha !== null && state.sha !== save.baseSha) {
    return refused(
      "Someone else published a change to this article while you were editing. " +
        "Your work is still here: copy anything you need, reload to get their version, then re-apply your change.",
      409,
      { conflict: "stale" },
    );
  }

  for (const image of save.images) {
    if (state.images.includes(image.name)) {
      return refused(`An image named ${image.name} already exists for this article.`, 409, {
        conflict: "image",
      });
    }
  }

  const knownArticleIds = new Set(
    (articleDirs ?? []).filter((entry) => entry.type === "dir").map((entry) => entry.name),
  );
  knownArticleIds.add(id);
  const available = new Set([...state.images, ...save.images.map((image) => image.name)]);
  const problems = validateArticle(save.article, {
    folderId: id,
    knownArticleIds,
    imageExists: (src) => available.has(src.slice("images/".length)),
  });
  if (problems.length > 0) {
    return refused(`The article has a problem: ${problems[0]}`, 400, { problems });
  }

  const referenced = new Set<string>();
  for (const block of walkArticleBlocks(save.article)) {
    if (block.type === "image") referenced.add(block.src);
  }
  for (const image of save.images) {
    if (!referenced.has(`images/${image.name}`)) {
      return refused(`Image ${image.name} was uploaded but is not used in the article.`, 400);
    }
  }

  // Nothing to do: the bytes on the branch are already these bytes.
  if (state.sha === newSha && save.images.length === 0) {
    return { kind: "done", commit: null };
  }

  const commit = await github<{ tree: { sha: string } }>(env, "GET", `/git/commits/${head}`, {
    what: "reading the latest commit",
  });

  const tree: { path: string; mode: "100644"; type: "blob"; content?: string; sha?: string }[] = [
    { path: `${ARTICLES_DIR}/${id}/article.json`, mode: "100644", type: "blob", content: save.text },
  ];
  for (const image of save.images) {
    const blob = await github<{ sha: string }>(env, "POST", "/git/blobs", {
      body: { content: image.data, encoding: "base64" },
      what: "uploading an image",
    });
    tree.push({
      path: `${ARTICLES_DIR}/${id}/images/${image.name}`,
      mode: "100644",
      type: "blob",
      sha: blob!.sha,
    });
  }

  const newTree = await github<{ sha: string }>(env, "POST", "/git/trees", {
    body: { base_tree: commit!.tree.sha, tree },
    what: "building the commit",
  });

  const verb = save.baseSha === null ? "Add" : "Edit";
  const subject = `${verb} ${save.article.title} via web editor (${save.editor})`;
  const newCommit = await github<{ sha: string }>(env, "POST", "/git/commits", {
    body: {
      message: save.note ? `${subject}\n\n${save.note}` : subject,
      tree: newTree!.sha,
      parents: [head],
    },
    what: "creating the commit",
  });

  // Not forced: if the branch moved since we read it, GitHub answers 422 and
  // the caller starts over from the new head instead of discarding that work.
  const moved = await github<{ ref: string }>(env, "PATCH", `/git/refs/heads/${branch(env)}`, {
    body: { sha: newCommit!.sha, force: false },
    allow: [409, 422],
    what: "publishing the commit",
  });
  if (moved === null) return { kind: "moved" };

  return { kind: "done", commit: newCommit!.sha };
}

async function saveArticle(request: Request, env: Env, id: string, cors: Cors): Promise<Response> {
  if (env.edit_key) {
    const supplied = request.headers.get("x-edit-key") ?? "";
    if (!sameSecret(supplied, env.edit_key)) {
      return fail("That passcode is not right.", 401, cors, { needsKey: true });
    }
  }

  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY_BYTES) return fail("That save is too large.", 413, cors);
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return fail("That save is too large.", 413, cors);

  const save = parseSave(raw, id);
  if (typeof save === "string") return fail(save, 400, cors);

  const newSha = await gitBlobSha(save.text);

  for (let attempt = 0; attempt < 3; attempt++) {
    const result = await tryCommit(env, id, save, newSha, cors);
    if (result.kind === "refused") return result.response;
    if (result.kind === "done") {
      return json(
        {
          ok: true,
          sha: newSha,
          commit: result.commit,
          unchanged: result.commit === null,
          commitUrl: result.commit
            ? `https://github.com/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/commit/${result.commit}`
            : null,
        },
        200,
        cors,
      );
    }
  }
  return fail("The site is being updated by someone else right now. Please try again in a moment.", 503, cors);
}

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------

export async function handleContent(request: Request, env: Env, cors: Cors, path: string): Promise<Response> {
  if (!isAllowedOrigin(request.headers.get("origin"), env)) {
    return fail("Not allowed from this origin.", 403, cors);
  }

  if (!env.github_pat) {
    return fail(
      "The publishing service has no GitHub token stored. The site owner needs to set it " +
        "(npx wrangler secret put github_pat).",
      503,
      cors,
    );
  }

  // `path` is everything after /content/articles/. A single slug, nothing else:
  // this is the one place a client-chosen string becomes part of a repo path.
  if (!SLUG.test(path)) return fail("Not found.", 404, cors);

  try {
    if (request.method === "GET") return await loadArticle(env, path, cors);
    if (request.method === "PUT") return await saveArticle(request, env, path, cors);
    return fail("Method not allowed.", 405, cors);
  } catch (error) {
    if (error instanceof GitHubError) {
      // Log the detail for us; GitHub's text can name the token's owner.
      console.error(error.message, error.detail);
      if (error.status === 401) {
        return fail(
          "The publishing service's GitHub token has expired or is not valid. " +
            "The site owner needs to store a new one (npx wrangler secret put github_pat).",
          502,
          cors,
        );
      }
      if (error.status === 403 || error.status === 404) {
        return fail(
          "The publishing service's GitHub token cannot reach the site's repository. " +
            "The site owner needs to give it Contents: read and write on this repository.",
          502,
          cors,
        );
      }
      return fail("GitHub did not accept the change. Please try again in a moment.", 502, cors);
    }
    throw error;
  }
}
