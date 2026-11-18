/**
 * An in-memory stand-in for the slice of the GitHub REST API the Worker uses.
 * Seeded from the real content/ folder, so tests and local end-to-end runs
 * exercise real articles without touching the real repository.
 *
 * `handle(request)` takes a fetch Request and returns a Response, so the same
 * object works as a `globalThis.fetch` mock in unit tests and behind a plain
 * HTTP server for browser runs (scripts/dev-editor-stack.mjs).
 */
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))));

export function blobSha(buffer) {
  return createHash("sha1").update(`blob ${buffer.length}\0`).update(buffer).digest("hex");
}

const sha = (text) => createHash("sha1").update(text).digest("hex");

export class FakeGitHub {
  constructor({ owner = "owner", repo = "repo", branch = "main" } = {}) {
    this.prefix = `/repos/${owner}/${repo}`;
    this.branch = branch;
    /** sha -> Buffer */
    this.blobs = new Map();
    /** tree sha -> Map<path, blob sha> */
    this.trees = new Map();
    /** commit sha -> { tree, parents, message } */
    this.commits = new Map();
    this.issues = [];
    /** Every request seen, as "METHOD /path". */
    this.log = [];
    /** Set to a status to make every write (non-GET) fail with it. */
    this.failWrites = null;
    this.head = this.#commit(new Map(), [], "initial");
  }

  /** Loads content/articles from disk. Image bytes are replaced by a stub. */
  seedFromDisk(only) {
    const files = new Map(this.files());
    const dir = path.join(rootDir, "content", "articles");
    for (const id of readdirSync(dir)) {
      if (only && !only.includes(id)) continue;
      const file = path.join(dir, id, "article.json");
      if (!existsSync(file)) continue;
      files.set(`content/articles/${id}/article.json`, this.#blob(readFileSync(file)));
      const images = path.join(dir, id, "images");
      if (existsSync(images)) {
        for (const name of readdirSync(images)) {
          files.set(`content/articles/${id}/images/${name}`, this.#blob(Buffer.from(`stub:${name}`)));
        }
      }
    }
    files.set("README.md", this.#blob(Buffer.from("# readme\n")));
    this.head = this.#commit(files, [this.head], "seed");
    return this;
  }

  /** Map<path, blob sha> at the branch head. */
  files() {
    return this.trees.get(this.commits.get(this.head).tree);
  }

  read(filePath) {
    const blob = this.files().get(filePath);
    return blob ? this.blobs.get(blob) : null;
  }

  readText(filePath) {
    return this.read(filePath)?.toString("utf8") ?? null;
  }

  /** Commits a change behind the Worker's back, as a concurrent editor would. */
  writeDirect(filePath, text, message = "direct") {
    const files = new Map(this.files());
    files.set(filePath, this.#blob(Buffer.from(text)));
    this.head = this.#commit(files, [this.head], message);
  }

  headCommit() {
    return { sha: this.head, ...this.commits.get(this.head) };
  }

  commitCount() {
    let count = 0;
    for (let at = this.head; at; at = this.commits.get(at).parents[0]) count++;
    return count;
  }

  #blob(buffer) {
    const id = blobSha(buffer);
    this.blobs.set(id, buffer);
    return id;
  }

  #tree(files) {
    const id = sha("tree" + [...files].sort().map(([p, s]) => `${p}:${s}`).join("\n"));
    this.trees.set(id, files);
    return id;
  }

  #commit(files, parents, message) {
    const tree = this.#tree(files);
    const id = sha(`commit${tree}${parents.join()}${message}${this.commits.size}`);
    this.commits.set(id, { tree, parents, message });
    return id;
  }

  #resolve(ref) {
    if (this.commits.has(ref)) return ref;
    if (ref === this.branch) return this.head;
    return null;
  }

  async handle(request) {
    const url = new URL(request.url);
    const method = request.method;
    this.log.push(`${method} ${url.pathname}`);

    const reply = (data, status = 200) =>
      new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });
    const notFound = () => reply({ message: "Not Found" }, 404);

    if (!request.headers.get("authorization")) return reply({ message: "Requires authentication" }, 401);
    if (!url.pathname.startsWith(this.prefix)) return notFound();
    const route = url.pathname.slice(this.prefix.length);

    if (method !== "GET" && this.failWrites) {
      return reply({ message: "Resource not accessible by personal access token" }, this.failWrites);
    }
    const body = method === "GET" ? null : await request.json();

    if (method === "POST" && route === "/issues") {
      this.issues.push(body);
      return reply({ html_url: `https://github.example/issues/${this.issues.length}` }, 201);
    }

    if (method === "GET" && route.startsWith("/contents/")) {
      const commit = this.#resolve(url.searchParams.get("ref") ?? this.branch);
      if (!commit) return notFound();
      const files = this.trees.get(this.commits.get(commit).tree);
      const target = decodeURIComponent(route.slice("/contents/".length)).replace(/\/$/, "");
      if (files.has(target)) {
        const blob = files.get(target);
        return reply({
          type: "file",
          name: path.posix.basename(target),
          path: target,
          sha: blob,
          encoding: "base64",
          // GitHub wraps base64 at 60 columns; keep that quirk so callers handle it.
          content: this.blobs.get(blob).toString("base64").replace(/(.{60})/g, "$1\n"),
        });
      }
      const children = new Map();
      for (const [filePath, blob] of files) {
        if (!filePath.startsWith(target + "/")) continue;
        const [name, ...rest] = filePath.slice(target.length + 1).split("/");
        if (!children.has(name)) {
          children.set(name, rest.length === 0
            ? { name, path: `${target}/${name}`, type: "file", sha: blob }
            : { name, path: `${target}/${name}`, type: "dir", sha: sha(`dir${target}/${name}`) });
        }
      }
      return children.size === 0 ? notFound() : reply([...children.values()]);
    }

    if (method === "GET" && route === `/git/ref/heads/${this.branch}`) {
      return reply({ ref: `refs/heads/${this.branch}`, object: { type: "commit", sha: this.head } });
    }

    if (method === "GET" && route.startsWith("/git/commits/")) {
      const commit = this.commits.get(route.slice("/git/commits/".length));
      return commit ? reply({ tree: { sha: commit.tree }, parents: commit.parents.map((p) => ({ sha: p })) }) : notFound();
    }

    if (method === "POST" && route === "/git/blobs") {
      const buffer = Buffer.from(body.content, body.encoding === "base64" ? "base64" : "utf8");
      return reply({ sha: this.#blob(buffer) }, 201);
    }

    if (method === "POST" && route === "/git/trees") {
      const base = this.trees.get(body.base_tree);
      if (!base) return reply({ message: "base_tree not found" }, 422);
      const files = new Map(base);
      for (const entry of body.tree) {
        if (typeof entry.content === "string") files.set(entry.path, this.#blob(Buffer.from(entry.content)));
        else if (this.blobs.has(entry.sha)) files.set(entry.path, entry.sha);
        else return reply({ message: "blob not found" }, 422);
      }
      return reply({ sha: this.#tree(files) }, 201);
    }

    if (method === "POST" && route === "/git/commits") {
      if (!this.trees.has(body.tree)) return reply({ message: "tree not found" }, 422);
      const files = this.trees.get(body.tree);
      return reply({ sha: this.#commit(files, body.parents, body.message) }, 201);
    }

    if (method === "PATCH" && route === `/git/refs/heads/${this.branch}`) {
      const commit = this.commits.get(body.sha);
      if (!commit) return reply({ message: "Object does not exist" }, 422);
      if (!body.force && commit.parents[0] !== this.head) {
        return reply({ message: "Update is not a fast forward" }, 422);
      }
      this.head = body.sha;
      return reply({ ref: `refs/heads/${this.branch}`, object: { sha: this.head } });
    }

    return notFound();
  }
}
