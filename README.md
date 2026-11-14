# IR Procedure Navigator

A reference for interventional radiology procedures, structured around the three phases
of a case: pre-procedure, intra-procedure, and post-procedure.

Each procedure is one JSON article under [`content/articles/`](content/README.md). The
front end renders those articles as collapsible phase bars with nested topics, callouts,
checklists, tables, and images.

Procedures are edited on the site itself: every procedure has an **Edit** button, and
**Publish** puts the change live a couple of minutes later. See
[Editing content](#editing-content).

## Running it

```bash
npm install
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload, including on content edits |
| `npm run dev:editor` | Dev server plus a local sandbox for the editor: publishing works but stays in memory |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run validate:content` | Validate every article against the schema |
| `npm test` | Unit tests: validation, the Worker, the editor's model |
| `npm run worker:deploy` | Deploy the Worker (feedback and editor publishing) — see below |
| `npm run migrate` | Retired; refuses to run — see [Legacy import](#legacy-import) |

## Layout

```
content/articles/<id>/article.json   The content, and the source of truth. One folder per article.
content/README.md                    The article format, for editing a file by hand.
src/schema/article.ts                The schema. Single source of truth for the shape.
src/schema/validate.ts               Cross-file checks shared by CI, the editor and the Worker.
src/content/                         Loading, categories, image resolution.
src/editor/                          The in-site editor (its own lazy-loaded chunk).
src/feedback/                        Feedback report model, issue composer, submitters.
src/components/                      layout / home / article / feedback components.
worker/                              Cloudflare Worker: files feedback, commits editor saves.
scripts/validate-content.mjs         Schema + link + image validation (the CI gate).
scripts/dev-editor-stack.mjs         Local sandbox for the editor (`npm run dev:editor`).
scripts/migrate.mjs                  Retired legacy importer.
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

Readers get content through the `ContentSource` interface in `src/content/source.ts`, which
serves what was in the repository at build time. The editor does not: it reads and writes the
repository directly, so it always starts from the latest version.

## Editing content

Open a procedure, press **Edit**, change it in place, press **Publish**. **+ New procedure** on
the home page starts a new one (saved as a draft until its status is changed).

- Click any text to change it. Select text for **bold** or a link (to a web address or to
  another procedure). In a list, Enter adds a bullet, Tab makes a sub-bullet, Backspace at the
  start joins it to the one above.
- The ⋮ beside each block moves it, adds something below it, or deletes it. Topics and
  sections have the same menu.
- **Details** under the title holds category, bleed risk, draft/complete, last reviewed,
  search words, source and review notes.
- Unpublished work is kept in the browser, so a closed tab loses nothing. Undo and Redo are in
  the bar at the bottom.
- Publish asks for a name and an optional note; both go into the change history.

What Publish does:

```
editor -> Cloudflare Worker -> one commit on main -> the usual GitHub Actions deploy
```

There is no review step and no login: a publish is live in about two minutes. The Worker is
what keeps that safe to leave open —

- it runs the same schema and cross-file checks as CI, so a save cannot break the build;
- it can only write `content/articles/<id>/article.json` and images in that article's
  `images/` folder, never code or workflows;
- it refuses a save if someone else changed the same procedure in the meantime, instead of
  overwriting their work;
- links can only point to `http(s)`, `mailto:` and `tel:` addresses.

Every publish is an ordinary commit (`Edit <title> via web editor (<name>)`), so the full
history is on GitHub and any change can be reverted there.

**If the site is ever vandalised**, revert the commits on GitHub and turn on the shared
passcode — no code change needed:

```bash
cd worker && npx wrangler secret put edit_key
```

From then on Publish asks each person for that passcode once per device.

Not editable here (still code, changed through git): the FAQ pages, the on-call workflow, TDC
removal, the pager guide, the anticoagulation matrix data, and the category list.

### Trying the editor locally

```bash
npm run dev:editor
```

This runs the site against a local copy of the Worker and an in-memory stand-in for GitHub
seeded from `content/articles/`. Publishing works end to end, but nothing leaves the machine
and nothing on disk changes. Plain `npm run dev` uses the endpoint in `.env`, which is the real
Worker — publishing from there edits the real site.

## Adding a procedure

Use **+ New procedure** on the site. To do it by hand instead:

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
A publish from the in-site editor is a push to `main` like any other and deploys the same way.

One-time repository setting: **Settings → Pages → Source → GitHub Actions**.

The site is served from `/IR-procedure-navigator/` (see `base` in `vite.config.ts`) and uses
hash routing, so deep links work without a redirect shim.

## Feedback

Every article has a "Suggest a correction" button, and the site footer has "Send feedback".
Both open one form, and a submission becomes a GitHub issue on this repo labelled `feedback`
plus `content-correction` / `bug` / `suggestion`. The issue carries a deep link back to the
exact topic the reader was looking at, the article's draft/complete status, and the build SHA.

A static site cannot hold a GitHub token, so the Worker in `worker/` holds it instead and
creates the issue on the reader's behalf — residents file feedback without needing a GitHub
account. The same Worker commits saves from the [editor](#editing-content).

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

Run `npm install` in the repository root first: the Worker imports the article schema from
`src/schema/`, so the root dependencies must be present when it is bundled.

The GitHub token lives only as a Cloudflare secret (`github_pat`), never in this repo. It is a
fine-grained PAT on this repo alone with **Issues: read and write** (feedback) and
**Contents: read and write** (editor publishing). GitHub caps those at a year — when it
expires, feedback and publishing both start failing and the fix is:

```bash
cd worker && npx wrangler secret put github_pat
```

Abuse protection for feedback is deliberately minimal: the Worker only accepts posts from the
site's own origin, silently drops anything that fills the form's hidden honeypot field, caps the body at
8 KB, and allowlists the labels a request may apply. If it is ever found and spammed, add a
rate-limiting rule in the Cloudflare dashboard — no code change needed.

Issues are **public**, so the form says so and warns against including patient information.

## Anticoagulation reference page

The anticoagulation route (`#/article/anticoagulation-table`) uses the same shared header, search, breadcrumbs, and title styling as other
procedure pages, with the parent’s interactive matrix below. The original hold/restart sections remain below the matrix,
including their existing deep links.

This fork is the maintained source of truth. The table has no runtime dependency
on the parent site or `legacy/`. The port preserves the parent’s clinical wording;
it does not constitute a new guideline review.

- `src/calculators/anticoagulation.ts` owns the 36 procedure mappings, 11 agents,
  and context-dependent hold/restart recommendations.
- `AnticoagulationPage` and `AnticoagulationMatrix` own the layout and interaction;
  their stylesheet is scoped to `.anticoagulation-page`.
- The article schema supports `{ "type": "calculator", "calculator": "anticoagulation" }`.
  Migration now retains that marker instead of silently dropping it.
- `tests/fixtures/anticoagulation-parent.js.txt` is a frozen copy of the upstream
  calculator from commit `3832590521d3faa400fc5a781f7477ed82d886e9`, kept for
  reference only; no tests use it. Its wording is not kept in sync with
  `src/calculators/anticoagulation.ts` and may be outdated, so do not treat it as
  current clinical guidance.

For a production preview, run `npm run build` then
`npm run preview -- --host 127.0.0.1 --port 4173` and open
`http://127.0.0.1:4173/IR-procedure-navigator/#/article/anticoagulation-table`.

## Legacy import

Retired. `legacy/` is the original vanilla-JS app, and `scripts/migrate.mjs` generated
`content/articles/` from it while content was still authored there. Content is now edited
directly (see [Editing content](#editing-content)), so **do not edit `legacy/` and do not run
the importer**: it rewrites every `article.json` and would discard everything published since.
`npm run migrate` refuses to run for that reason; `npm run migrate -- --force` overrides it for
a deliberate re-import.

`tests/migrate.test.mjs` still exercises the importer against `legacy/`, but no longer
compares its output with the committed articles.
