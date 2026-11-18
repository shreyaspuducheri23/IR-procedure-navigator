import type { Env } from "./http.ts";

/** Thrown for any GitHub response the caller did not explicitly allow. */
export class GitHubError extends Error {
  readonly status: number;
  readonly detail: string;

  constructor(status: number, detail: string, what: string) {
    super(`GitHub ${what} failed with ${status}`);
    this.status = status;
    this.detail = detail;
  }
}

export function repoUrl(env: Env, path: string): string {
  const base = env.GITHUB_API_BASE ?? "https://api.github.com";
  return `${base}/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}${path}`;
}

export function githubHeaders(env: Env): Record<string, string> {
  return {
    authorization: `Bearer ${env.github_pat}`,
    accept: "application/vnd.github+json",
    "x-github-api-version": "2022-11-28",
    "content-type": "application/json",
    "user-agent": "ir-procedure-navigator-worker",
  };
}

/**
 * One GitHub REST call. Statuses listed in `allow` come back as `null` so the
 * caller can treat "not there" as data; anything else unexpected throws.
 */
export async function github<T>(
  env: Env,
  method: string,
  path: string,
  options: { body?: unknown; allow?: number[]; what: string },
): Promise<T | null> {
  const response = await fetch(repoUrl(env, path), {
    method,
    headers: githubHeaders(env),
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });
  if (options.allow?.includes(response.status)) return null;
  if (!response.ok) {
    throw new GitHubError(response.status, await response.text(), options.what);
  }
  return (await response.json()) as T;
}
