#!/usr/bin/env node
/**
 * A safe place to try the in-site editor: `npm run dev:editor`.
 *
 * Starts the site's dev server wired to a local copy of the Worker, which in
 * turn talks to an in-memory stand-in for GitHub seeded from content/articles.
 * Publishing works end to end, but nothing leaves this machine and nothing on
 * disk changes: "published" edits live in memory until the process stops.
 *
 * Plain `npm run dev` is different — it uses the endpoint in .env, which is the
 * real Worker, so publishing from there edits the real site.
 *
 *   site     http://localhost:5173/IR-procedure-navigator/
 *   worker   http://localhost:8787
 *
 * The /__fake/* routes exist for the browser tests: they read the fake
 * repository and commit to it behind the editor's back.
 */
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import worker from "../worker/src/index.ts";
import { FakeGitHub } from "../tests/helpers/fake-github.mjs";

const WORKER_PORT = Number(process.env.EDITOR_WORKER_PORT ?? 8787);
const SITE_PORT = Number(process.env.EDITOR_SITE_PORT ?? 5173);
const API_BASE = "https://api.github.fake";

const github = new FakeGitHub().seedFromDisk();
const realFetch = globalThis.fetch;
globalThis.fetch = (input, init) => {
  const request = new Request(input, init);
  return request.url.startsWith(API_BASE) ? github.handle(request) : realFetch(request);
};

const env = {
  github_pat: "local",
  GITHUB_OWNER: "owner",
  GITHUB_REPO: "repo",
  GITHUB_API_BASE: API_BASE,
  ALLOWED_ORIGINS: `http://localhost:${SITE_PORT},http://127.0.0.1:${SITE_PORT}`,
  ...(process.env.EDITOR_KEY ? { edit_key: process.env.EDITOR_KEY } : {}),
};

async function readBody(incoming) {
  const chunks = [];
  for await (const chunk of incoming) chunks.push(chunk);
  return Buffer.concat(chunks);
}

function fakeRoute(url, body) {
  const json = (data, status = 200) =>
    new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });
  if (url.pathname === "/__fake/file") {
    const text = github.readText(url.searchParams.get("path") ?? "");
    return text === null ? json({ error: "not found" }, 404) : json({ text });
  }
  if (url.pathname === "/__fake/head") {
    const head = github.headCommit();
    return json({ sha: head.sha, message: head.message, commits: github.commitCount(), paths: [...github.files().keys()] });
  }
  if (url.pathname === "/__fake/write") {
    const { path, text } = JSON.parse(body.toString("utf8"));
    github.writeDirect(path, text, "concurrent edit");
    return json({ ok: true });
  }
  return json({ error: "not found" }, 404);
}

createServer(async (incoming, outgoing) => {
  try {
    const url = new URL(incoming.url ?? "/", `http://localhost:${WORKER_PORT}`);
    const body = incoming.method === "GET" || incoming.method === "HEAD" ? undefined : await readBody(incoming);
    const response = url.pathname.startsWith("/__fake/")
      ? fakeRoute(url, body ?? Buffer.alloc(0))
      : await worker.fetch(new Request(url, { method: incoming.method, headers: incoming.headers, body }), env);
    outgoing.writeHead(response.status, Object.fromEntries(response.headers));
    outgoing.end(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    console.error(error);
    outgoing.writeHead(500).end("worker error");
  }
}).listen(WORKER_PORT, () => {
  console.log(`\n  Local editor sandbox: publishing goes to an in-memory copy, not the real site.`);
  console.log(`  worker  http://localhost:${WORKER_PORT}\n`);
});

if (!process.argv.includes("--no-site")) {
  const site = spawn("npx", ["vite", "--port", String(SITE_PORT), "--strictPort"], {
    stdio: "inherit",
    env: {
      ...process.env,
      VITE_EDITOR_ENDPOINT: `http://localhost:${WORKER_PORT}`,
      VITE_FEEDBACK_ENDPOINT: `http://localhost:${WORKER_PORT}`,
    },
  });
  site.on("exit", (code) => process.exit(code ?? 0));
  process.on("SIGINT", () => site.kill("SIGINT"));
  process.on("SIGTERM", () => site.kill("SIGTERM"));
}
