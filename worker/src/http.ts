/**
 * Shared plumbing for every route: the environment shape, CORS, the origin
 * filter, and JSON responses.
 */

export interface Env {
  /**
   * Fine-grained PAT on the target repo. Needs Issues: write (feedback) and
   * Contents: write (the in-site editor).
   */
  github_pat: string;
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
  /** Comma-separated list of origins allowed to call this Worker. */
  ALLOWED_ORIGINS: string;
  /** Branch the editor commits to. Defaults to "main". */
  GITHUB_BRANCH?: string;
  /** Override for tests and local development. Defaults to api.github.com. */
  GITHUB_API_BASE?: string;
  /**
   * Optional shared passcode for the editor. Unset means saves are open; set it
   * with `npx wrangler secret put edit_key` to require it on every save.
   */
  edit_key?: string;
}

export type Cors = Record<string, string>;

function allowedOrigins(env: Env): string[] {
  return env.ALLOWED_ORIGINS.split(",").map((value) => value.trim());
}

export function corsHeaders(origin: string | null, env: Env): Cors {
  const allowed = allowedOrigins(env);
  const match = origin && allowed.includes(origin) ? origin : null;
  return {
    "access-control-allow-origin": match ?? allowed[0] ?? "",
    "access-control-allow-methods": "GET, POST, PUT, OPTIONS",
    "access-control-allow-headers": "content-type, x-edit-key",
    "access-control-max-age": "86400",
    vary: "origin",
  };
}

export function isAllowedOrigin(origin: string | null, env: Env): boolean {
  if (!origin) return false;
  return allowedOrigins(env).includes(origin);
}

export function json(data: unknown, status: number, headers: Cors): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, "content-type": "application/json" },
  });
}
