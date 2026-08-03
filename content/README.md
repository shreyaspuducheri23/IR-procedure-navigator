# Authoring articles

Every article is one folder:

```
content/articles/<article-id>/
  article.json      # the content
  images/           # optional; referenced from article.json
```

The folder name **is** the article id and the URL (`/#/article/<article-id>`).

The shape is defined once, in [`src/schema/article.ts`](../src/schema/article.ts). Run
`npm run validate:content` after editing — it checks the schema plus the things the
schema can't see (folder name matches `id`, internal links resolve, image files exist).

## Skeleton

```jsonc
{
  "schemaVersion": 1,
  "id": "paracentesis",
  "title": "Paracentesis",
  "category": "fluid-drainage",   // must be an id from src/content/categories.ts
  "status": "complete",           // "draft" hides it behind the home page's draft toggle
  "bleedRisk": "low",             // "low" | "high" | null
  "keywords": ["ascites", "saag"],// extra search terms not present in the text
  "summary": "One or two sentences shown on the home card and article header.",
  "lastReviewed": "2026-06-01",   // ISO date, or null
  "provenance": ["Where this content came from."],
  "reviewNotes": ["Outstanding editorial checks."],
  "sections": [ /* see below */ ]
}
```

## Sections and subsections

A section is one full-width toggle bar. `kind` sets its colour and its place in the
canonical order:

| kind | Bar |
| --- | --- |
| `overview` | Overview |
| `pre` | Pre-procedure |
| `intra` | Intra-procedure |
| `post` | Post-procedure |
| `references` | References |
| `custom` | Anything else (reference pages with no procedural phases) |

```jsonc
{
  "id": "pre",              // lowercase kebab-case, unique within the article
  "kind": "pre",
  "title": "Pre-procedure",
  "blocks": [],             // optional: rendered directly under the bar
  "subsections": [
    { "id": "labs", "title": "Labs", "defaultOpen": false, "blocks": [ /* ... */ ] }
  ]
}
```

Subsections nest one level only. Use a `heading` block to group content further.

## Blocks

```jsonc
{ "type": "paragraph", "text": "Plain prose." }

{ "type": "heading", "text": "Diagnostic" }

{ "type": "list", "ordered": false, "items": ["First.", "Second."] }

{ "type": "checklist", "title": "Before starting", "items": ["Consent signed."] }

{ "type": "image", "src": "images/site-selection.png",
  "alt": "Ultrasound site selection", "caption": "Preferred LLQ entry site." }

{ "type": "table", "caption": "Hold intervals",
  "header": ["Agent", "High risk"], "rows": [["Warfarin", "5 days"]] }

{ "type": "callout", "variant": "pearl", "title": "Optional title",
  "blocks": [ { "type": "paragraph", "text": "Callouts can hold any blocks." } ] }
```

### Callout variants

| variant | Use for |
| --- | --- |
| `caution` | Amber. Things that go wrong if missed. |
| `contraindication` | Red. Hard stops — do not proceed. |
| `pearl` | Teal. Practical tips worth remembering. |
| `note` | Grey. Asides, draft markers, "needs review" content. |

## Links inside text

Any `text` or list `item` can be an array of parts instead of a plain string. Use the
array form only when you need a link.

```jsonc
{ "type": "list", "items": [
  "A plain item.",
  ["See the ", { "link": { "text": "hold table", "articleId": "anticoagulation-table" } }, " first."],
  [{ "link": { "text": "SIR guidelines", "href": "https://www.sirweb.org/" } }]
] }
```

`articleId` links stay inside the app and can deep-link with `"sectionId": "pre"`.
`href` links open in a new tab.

## Images

Put files in the article's own `images/` folder and reference them relatively
(`"src": "images/foo.png"`). Vite hashes and optimises them at build time; validation
fails if the file is missing.

## Where this content came from

The initial 50 articles were migrated from the legacy vanilla-JS app by
[`scripts/migrate.mjs`](../scripts/migrate.mjs), which reads `legacy/` and rebuilds this
folder. That script is a one-time import — once you start editing articles by hand,
do not re-run it.
