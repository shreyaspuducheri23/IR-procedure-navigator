# Authoring articles

Every article is one folder:

```
content/articles/<article-id>/
  article.json      # the content
  images/           # optional; referenced from article.json
```

The folder name **is** the article id and the URL (`/#/article/<article-id>`).

**Most edits should be made on the site**, with a procedure's Edit button — see
[Editing content](../README.md#editing-content). This page describes the file format for when
a file is edited by hand. These files are the source of truth; nothing regenerates them.

The shape is defined once, in [`src/schema/article.ts`](../src/schema/article.ts). Run
`npm run validate:content` after editing — it checks the schema plus the things the
schema can't see (folder name matches `id`, internal links resolve, image files exist, no
fields the schema does not know).

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

The articles were first generated from the legacy vanilla-JS app by
[`scripts/migrate.mjs`](../scripts/migrate.mjs). That importer is retired: the files here are
now edited directly, and re-running it would overwrite those edits (it refuses to run without
`--force`). Do not edit `legacy/` to change content.

Image paths must be flat files in the article's own folder (`images/<name>.png|jpg|jpeg|webp|gif`,
lowercase letters, digits, dots, dashes and underscores). External links must be `http(s)`,
`mailto:` or `tel:` addresses.

### MELD calculator block

```json
{ "type": "calculator", "calculator": "meld" }
```

This renders the adult React calculator. The article ID remains
`meld-score-reference` so existing article links work. This additive block retains
schema version 1; content and its renderer must be released together.

The five upstream example labs and unchecked sex/dialysis toggles are retained.
All five labs must be positive finite numbers, including creatinine when dialysis
is checked. State stays local to the component and resets when it is remounted.

Scoring follows [Kim et al., MELD 3.0](https://pmc.ncbi.nlm.nih.gov/articles/PMC8608337/)
and the [HRSA OPTN calculator](https://www.hrsa.gov/optn/data-calculators/allocation-calculators/meld-calculator).
Bilirubin, INR, and creatinine have a floor of 1. Creatinine ceilings are 4 for
MELD-Na and 3 for MELD 3.0; qualifying dialysis uses those ceilings. Sodium is
bounded to 125–137 and albumin to 1.5–3.5. Logarithms are natural, with final scores
rounded to integers and bounded to 6–40.

Intentional differences from upstream `2d79e209`:

- MELD-Na rounds the initial MELD before sodium adjustment and only applies that
  adjustment when initial MELD exceeds 11, following the historical allocation
  convention described in the paper. MELD 3.0 uses the published adult coefficients.
- Only scores are displayed: no survival/mortality percentages or automated TIPS
  risk classification. Static reference text remains. The upstream survival ranges
  are not a validated MELD 3.0-only prediction.
- Formula sources are clickable; inputs have labels, invalid-state guidance, and
  a live result announcement. The React UI uses the application's design tokens.

`tests/meld.test.mjs` checks the eight Table 4 examples, rounding, bounds,
invalid inputs, dialysis, sex, and the MELD-Na threshold. Migration tests check
recursive preservation, malformed graphs, calculator uniqueness, schema rejection,
and deterministic generation. Existing search indexing reads the flattened
headings and content, linking to the enclosing Procedural steps subsection.

### Anticoagulation matrix

Use `{ "type": "calculator", "calculator": "anticoagulation" }` for the interactive reference. The dedicated anticoagulation page renders the matrix above its supplementary article sections. Medication rules and procedure mappings are maintained in `src/calculators/anticoagulation.ts`.
