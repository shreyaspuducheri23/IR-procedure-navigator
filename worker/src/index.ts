/**
 * Feedback relay: takes a report from the static site and files it as a GitHub
 * issue.
 *
 * The site is a static GitHub Pages build, so it cannot hold a GitHub token —
 * anything shipped to the browser is public. This Worker holds the token instead,
 * which is the whole reason it exists. It does one thing: validate a small JSON
 * body and POST an issue. It never reads, never lists, never echoes the token.
 *
 * Deploy:  npx wrangler deploy
 * Secret:  npx wrangler secret put github_pat   (fine-grained, Issues: write)
 */

export interface Env {
  /** Fine-grained PAT scoped to Issues:write on the target repo. */
  github_pat: string;
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
  /** Comma-separated list of origins allowed to post here. */
  ALLOWED_ORIGINS: string;
}

const MAX_BODY_BYTES = 8 * 1024;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 4000;
const KINDS = new Set(["correction", "bug", "suggestion"]);
const LABELS = new Set(["feedback", "content-correction", "bug", "suggestion"]);

type Payload = {
  kind?: unknown;
  message?: unknown;
  contact?: unknown;
  honeypot?: unknown;
  title?: unknown;
  body?: unknown;
  labels?: unknown;
};

function corsHeaders(origin: string | null, env: Env): Record<string, string> {
  const allowed = env.ALLOWED_ORIGINS.split(",").map((value) => value.trim());
  const match = origin && allowed.includes(origin) ? origin : null;
  return {
    "access-control-allow-origin": match ?? allowed[0] ?? "",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    vary: "origin",
  };
}

function isAllowedOrigin(origin: string | null, env: Env): boolean {
  if (!origin) return false;
  return env.ALLOWED_ORIGINS.split(",")
    .map((value) => value.trim())
    .includes(origin);
}

function json(data: unknown, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, "content-type": "application/json" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("origin");
    const cors = corsHeaders(origin, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") {
      return json({ ok: false, error: "Method not allowed." }, 405, cors);
    }

    // The endpoint is public by necessity, so the origin check is the first and
    // cheapest filter. It stops casual cross-site posting, not a determined
    // attacker forging headers — see the README for what to add if that happens.
    if (!isAllowedOrigin(origin, env)) {
      return json({ ok: false, error: "Not allowed from this origin." }, 403, cors);
    }

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return json({ ok: false, error: "That report is too long." }, 413, cors);
    }

    let payload: Payload;
    try {
      payload = JSON.parse(raw) as Payload;
    } catch {
      return json({ ok: false, error: "Malformed request." }, 400, cors);
    }

    // A human never sees the honeypot field, so anything in it is a bot. Answer
    // with a plain success: an error would tell it which field gave it away.
    if (typeof payload.honeypot === "string" && payload.honeypot.trim() !== "") {
      return json({ ok: true, url: null }, 200, cors);
    }

    const kind = typeof payload.kind === "string" ? payload.kind : "";
    const message = typeof payload.message === "string" ? payload.message.trim() : "";
    const title = typeof payload.title === "string" ? payload.title.trim() : "";
    const body = typeof payload.body === "string" ? payload.body : "";

    if (!KINDS.has(kind)) {
      return json({ ok: false, error: "Unknown feedback type." }, 400, cors);
    }
    if (message.length < MESSAGE_MIN || message.length > MESSAGE_MAX) {
      return json({ ok: false, error: "Please write a bit more detail." }, 400, cors);
    }
    if (!title || !body) {
      return json({ ok: false, error: "Malformed request." }, 400, cors);
    }

    // Labels come from the client, so allowlist them rather than trusting the
    // list — otherwise a crafted request could invent labels in the repo.
    const labels = Array.isArray(payload.labels)
      ? payload.labels.filter((label): label is string => typeof label === "string" && LABELS.has(label))
      : ["feedback"];

    const response = await fetch(
      `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/issues`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${env.github_pat}`,
          accept: "application/vnd.github+json",
          "x-github-api-version": "2022-11-28",
          "content-type": "application/json",
          "user-agent": "ir-procedure-navigator-feedback",
        },
        body: JSON.stringify({ title, body, labels }),
      },
    );

    if (!response.ok) {
      // Log for us, stay vague for the client: GitHub's error text can name the
      // token's owner and permissions.
      console.error("GitHub issue creation failed", response.status, await response.text());
      return json({ ok: false, error: "Could not file the report. Please try again later." }, 502, cors);
    }

    const issue = (await response.json()) as { html_url?: string };
    return json({ ok: true, url: issue.html_url ?? null }, 200, cors);
  },
} satisfies ExportedHandler<Env>;
