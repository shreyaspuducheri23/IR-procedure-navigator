/**
 * The site's only server-side piece. The site itself is a static GitHub Pages
 * build, so it cannot hold a GitHub token — anything shipped to the browser is
 * public. This Worker holds the token instead and does two narrow jobs with it:
 *
 *   POST /                         file reader feedback as a GitHub issue
 *   GET  /content/articles/:id     read an article for the in-site editor
 *   PUT  /content/articles/:id     commit an edited article (auto-publishes)
 *
 * It never lists, never echoes the token, and can only write inside
 * content/articles/ — see content.ts for the rules.
 *
 * Deploy:  npm run worker:deploy            (config: wrangler.jsonc at the repo root)
 * Secret:  npx wrangler secret put github_pat   (run from the repo root)
 *          (fine-grained PAT on this repo: Issues + Contents, read and write)
 */
import type { Env } from "./http.ts";
import { corsHeaders, json } from "./http.ts";
import { handleFeedback } from "./feedback.ts";
import { handleContent } from "./content.ts";

const CONTENT_PREFIX = "/content/articles/";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const cors = corsHeaders(request.headers.get("origin"), env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    const { pathname } = new URL(request.url);

    if (pathname.startsWith(CONTENT_PREFIX)) {
      return handleContent(request, env, cors, pathname.slice(CONTENT_PREFIX.length));
    }

    if (pathname === "/" || pathname === "") {
      if (request.method !== "POST") {
        return json({ ok: false, error: "Method not allowed." }, 405, cors);
      }
      return handleFeedback(request, env, cors);
    }

    return json({ ok: false, error: "Not found." }, 404, cors);
  },
} satisfies ExportedHandler<Env>;
