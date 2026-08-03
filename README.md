# IR Procedure Navigator

A reference for interventional radiology procedures, structured around the three phases
of a case: pre-procedure, intra-procedure, and post-procedure.

Each procedure is one JSON article under [`content/articles/`](content/README.md). The
front end renders those articles as collapsible phase bars with nested topics, callouts,
checklists, tables, and images.

## Running it

```bash
npm install
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload, including on content edits |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run validate:content` | Validate every article against the schema |
| `npm run migrate` | One-time import from `legacy/` — see below |
| `npm run worker:deploy` | Deploy the feedback Worker — see below |

## Layout

```
content/articles/<id>/article.json   The content. One folder per article.
content/README.md                    How to write an article.
src/schema/article.ts                The schema. Single source of truth.
src/content/                         Loading, categories, image resolution.
src/feedback/                        Feedback report model, issue composer, submitters.
src/components/                      layout / home / article / feedback components.
worker/                              Cloudflare Worker that files feedback as issues.
scripts/migrate.mjs                  Legacy importer (one-time).
scripts/validate-content.mjs         Schema + link + image validation.
legacy/                              The previous vanilla-JS app, kept for reference.
```

## How content is loaded

`vite.config.ts` contains a small plugin that scans `content/articles/` at build time and
builds two virtual modules:

- `virtual:article-index` — metadata only (title, category, keywords, summary, status). This
  is the only content in the initial bundle; the home grid and instant search run off it.
- `virtual:article-search-index` — the full body text of every section and subsection,
  fetched the first time someone uses the search box. Search matches article text, not just
  titles, and results deep-link to the topic that matched.

Article bodies themselves load on demand as their own per-article chunks.

Everything goes through the `ContentSource` interface in `src/content/source.ts`. Adding
authentication and an in-app editor later means adding a second implementation of that
interface, not rewriting components.

## Adding a procedure

1. Create `content/articles/<article-id>/article.json`.
2. Follow [the authoring guide](content/README.md).
3. Run `npm run validate:content`.

New articles appear on the home page automatically. Set `"status": "draft"` while a
procedure is still being written — drafts are hidden behind the home page's draft toggle
but remain reachable by direct link.

## Deployment

Pushing to `main` builds and publishes to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The workflow validates all
content before it builds, so a malformed article fails the deploy rather than shipping.

One-time repository setting: **Settings → Pages → Source → GitHub Actions**.

The site is served from `/IR-procedure-navigator/` (see `base` in `vite.config.ts`) and uses
hash routing, so deep links work without a redirect shim.

## Feedback

Every article has a "Suggest a correction" button, and the site footer has "Send feedback".
Both open one form, and a submission becomes a GitHub issue on this repo labelled `feedback`
plus `content-correction` / `bug` / `suggestion`. The issue carries a deep link back to the
exact topic the reader was looking at, the article's draft/complete status, and the build SHA.

A static site cannot hold a GitHub token, so the Worker in `worker/` holds it instead and
creates the issue on the reader's behalf. That is the only reason it exists — residents file
feedback without needing a GitHub account.

```
FeedbackDialog → FeedbackSubmitter → Cloudflare Worker → GitHub Issues API
```

`VITE_FEEDBACK_ENDPOINT` in [`.env`](.env) points at the deployed Worker. **Unset it and the
app falls back** to opening GitHub's prefilled new-issue page — which is what happens locally
if you clear it, and what keeps the button working if the Worker is ever down.

### Maintaining the Worker

```bash
npm run worker:deploy
```

The GitHub token lives only as a Cloudflare secret (`github_pat`), never in this repo. It is a
fine-grained PAT scoped to **Issues: read and write** on this repo alone, and GitHub caps those
at a year — when it expires, feedback submissions start failing and the fix is:

```bash
cd worker && npx wrangler secret put github_pat
```

Abuse protection is deliberately minimal: the Worker only accepts posts from the site's own
origin, silently drops anything that fills the form's hidden honeypot field, caps the body at
8 KB, and allowlists the labels a request may apply. If it is ever found and spammed, add a
rate-limiting rule in the Cloudflare dashboard — no code change needed.

Issues are **public**, so the form says so and warns against including patient information.

## The legacy app and the upstream fork

`legacy/` holds the original single-page app. Its 49 PDF-extracted procedures and the
hand-authored enrichments layered on top of them are imported into `content/` by
`scripts/migrate.mjs`, which evaluates the legacy sources to capture their post-enrichment
runtime state.

This repo was forked from [TBRUNDAGE35/IR-procedure-navigator](https://github.com/TBRUNDAGE35/IR-procedure-navigator),
which still authors content in that vanilla-JS app. Pulling their content in is therefore
a two-step merge:

```bash
git remote add upstream https://github.com/TBRUNDAGE35/IR-procedure-navigator.git  # once
git fetch upstream && git merge upstream/main
```

Git's rename detection lands their `app.js` edits on `legacy/app.js`. Then re-import:

```bash
npm run migrate && npm run validate:content
```

`npm run migrate` **overwrites `content/articles/` wholesale**, so it is only safe while no
article has been hand-edited here. Once articles are edited in this repo, `content/` becomes
the source of truth, `legacy/` should be deleted, and upstream changes have to be ported by
hand instead.
