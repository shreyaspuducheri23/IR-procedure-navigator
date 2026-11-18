/**
 * Feedback relay: takes a report from the static site and files it as a GitHub
 * issue, so residents can report a problem without a GitHub account.
 */
import type { Cors, Env } from "./http.ts";
import { isAllowedOrigin, json } from "./http.ts";
import { githubHeaders, repoUrl } from "./github.ts";

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

export async function handleFeedback(request: Request, env: Env, cors: Cors): Promise<Response> {
  const origin = request.headers.get("origin");

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

  const response = await fetch(repoUrl(env, "/issues"), {
    method: "POST",
    headers: githubHeaders(env),
    body: JSON.stringify({ title, body, labels }),
  });

  if (!response.ok) {
    // Log for us, stay vague for the client: GitHub's error text can name the
    // token's owner and permissions.
    console.error("GitHub issue creation failed", response.status, await response.text());
    return json({ ok: false, error: "Could not file the report. Please try again later." }, 502, cors);
  }

  const issue = (await response.json()) as { html_url?: string };
  return json({ ok: true, url: issue.html_url ?? null }, 200, cors);
}
