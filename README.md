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

## Layout

```
content/articles/<id>/article.json   The content. One folder per article.
content/README.md                    How to write an article.
src/schema/article.ts                The schema. Single source of truth.
src/content/                         Loading, categories, image resolution.
src/components/                      layout / home / article components.
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

## The legacy app

`legacy/` holds the original single-page app. Its 49 PDF-extracted procedures and the
hand-authored enrichments layered on top of them were imported into `content/` by
`scripts/migrate.mjs`, which evaluates the legacy sources to capture their post-enrichment
runtime state. That import has already run — do not re-run it once articles have been
edited by hand. `legacy/` can be deleted once the migrated content has been reviewed.
