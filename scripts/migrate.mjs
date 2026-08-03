#!/usr/bin/env node
/**
 * Migration: legacy vanilla-JS procedure graph -> content/articles/<id>/article.json.
 *
 * The legacy app kept 49 PDF-extracted procedures in legacy/procedure-data.js and
 * then mutated most of them in place with hand-authored enrichment functions in
 * legacy/app.js, which also push a handful of extra articles (the reference pages,
 * the nephrostomy variants, nerve block, UAE). The authoritative content is
 * therefore the *runtime* state after those enrichments run, not either file alone.
 *
 * To capture it we evaluate both files in a Node vm. legacy/app.js is free of DOM
 * access up to `const els = {`, which is where the render layer begins, so we cut
 * the source there and let the data + enrichment half execute on its own.
 *
 * Still the importer, not a one-shot: the upstream repo this was forked from keeps
 * editing legacy/app.js, so merging upstream content means re-running this. It
 * overwrites content/articles/ wholesale, which is only safe while no article has
 * been hand-edited here.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { articleSchema, SCHEMA_VERSION } from "../src/schema/article.ts";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const legacyDir = path.join(rootDir, "legacy");
const outDir = path.join(rootDir, "content", "articles");

/** Marks where legacy/app.js stops being pure data and starts touching the DOM. */
const DOM_BOUNDARY = "const els = {";

/**
 * Legacy category labels -> the app's category slugs (src/content/categories.ts).
 * The legacy list grew ad hoc, so several labels fold into one slug: the three
 * reference flavours are one "Reference" filter here, and "Embolization" joins
 * the other embolizations under vascular intervention. "Pain control" folds into
 * the general IR bucket, where the other pain procedures (celiac plexus block,
 * botox injection) already sit.
 */
const CATEGORY_MAP = {
  "IR procedure": "ir-procedure",
  "Vascular intervention": "vascular-intervention",
  Embolization: "vascular-intervention",
  "Biopsy / ablation": "biopsy-ablation",
  "Drain / tube procedure": "drain-tube",
  "Central venous / vascular access": "vascular-access",
  "Fluid drainage": "fluid-drainage",
  "Pain control": "ir-procedure",
  "Reference checklist": "reference",
  "Reference calculator": "reference",
  "Reference table": "reference",
};

/**
 * Legacy ids are slugs of the original PDF titles. Where a procedure has since
 * been retitled or split in two, the id stopped describing the article and would
 * show up in the URL that way, so these get a clean slug. Link targets are mapped
 * through the same table, since `procedureId` references still use the old id.
 */
const ID_OVERRIDES = {
  "nephrostomy-nephroureteral-catheter-jj-stent-placement-exchange-conversion":
    "nephrostomy-tube-placement",
  "cholecystostomy-biliary-drain-placement-exchange-internalization":
    "cholecystostomy-tube-placement-exchange",
  "catheter-directed-thrombolysis-pe-dvt-frostbite-see-order-set":
    "catheter-directed-thrombolysis",
};

const articleIdFor = (legacyId) => ID_OVERRIDES[legacyId] ?? legacyId;

/** Legacy in-page anchors, rewritten to internal article links. */
const HREF_TO_ARTICLE = {
  "#anticoagulation-table": "anticoagulation-table",
  "#moderate-sedation-checklist": "moderate-sedation-checklist",
};

/** Root-level detail keys that describe the import itself, not clinical content. */
const PROVENANCE_KEYS = new Set(["Source", "Import status"]);

/** Detail keys that flag unfinished content; surfaced as "note" callouts. */
const PLACEHOLDER_KEYS = new Set([
  "Needs completion",
  "Needs structured table",
  "Needs bleeding risk",
  "Needs procedure-specific edit",
  "To build",
  "Suggested buckets",
  "Inputs to add",
]);

const SUMMARY_STOPWORDS = new Set([
  "and", "the", "for", "with", "are", "was", "per", "any", "all", "use", "used",
  "this", "that", "from", "into", "when", "before", "after", "during", "have",
  "has", "not", "but", "its", "his", "her", "their", "your", "our",
]);

// ---------------------------------------------------------------------------
// Capture
// ---------------------------------------------------------------------------

function captureLegacyState() {
  const dataSource = readFileSync(path.join(legacyDir, "procedure-data.js"), "utf8");
  const appSource = readFileSync(path.join(legacyDir, "app.js"), "utf8");

  const occurrences = appSource.split(DOM_BOUNDARY).length - 1;
  if (occurrences !== 1) {
    throw new Error(
      `Expected exactly one "${DOM_BOUNDARY}" marker in legacy/app.js, found ${occurrences}. ` +
        `The DOM boundary moved — re-check where the render layer starts before migrating.`,
    );
  }

  const source = [
    "var window = globalThis;",
    dataSource,
    appSource.slice(0, appSource.indexOf(DOM_BOUNDARY)),
    ";__capture({ procedures, hiddenProcedureTitles: Array.from(hiddenProcedureTitles) });",
  ].join("\n");

  let captured = null;
  vm.runInNewContext(source, { __capture: (value) => (captured = value), console });
  if (!captured?.procedures?.length) throw new Error("Captured no procedures from legacy sources.");
  return structuredClone(captured);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeText(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function contentTokens(text) {
  return new Set(
    normalizeText(text)
      .split(" ")
      .filter((token) => token.length >= 3 && !SUMMARY_STOPWORDS.has(token)),
  );
}

/**
 * The legacy node `summary` was a one-line preview for the bubble UI and usually
 * restates the detail list it sits above. Keep it only when it carries something
 * the items don't.
 */
function summaryAddsInformation(summary, itemsText) {
  if (!summary) return false;
  const summaryTokens = contentTokens(summary);
  if (summaryTokens.size === 0) return false;
  const itemTokens = contentTokens(itemsText);
  let overlap = 0;
  for (const token of summaryTokens) if (itemTokens.has(token)) overlap += 1;
  return overlap / summaryTokens.size < 0.8;
}

/** Legacy list items are strings or link objects; both become schema rich text. */
function convertItem(item, report) {
  if (typeof item === "string") return item;
  if (item && typeof item === "object" && item.text) {
    if (item.procedureId) {
      report.internalLinks += 1;
      return [{ link: { text: item.text, articleId: articleIdFor(item.procedureId) } }];
    }
    const mapped = HREF_TO_ARTICLE[item.href];
    if (mapped) {
      report.rewrittenLinks[item.href] = (report.rewrittenLinks[item.href] ?? 0) + 1;
      return [{ link: { text: item.text, articleId: mapped } }];
    }
    if (item.href) {
      report.externalLinks += 1;
      return [{ link: { text: item.text, href: item.href } }];
    }
    return item.text;
  }
  report.problems.push(`Unconvertible list item: ${JSON.stringify(item)}`);
  return String(item);
}

function plainText(item) {
  if (typeof item === "string") return item;
  if (item && typeof item === "object" && item.text) return item.text;
  return "";
}

/**
 * `checklistSections` is written two ways in the legacy sources: an array of
 * `{ title, items }` and a plain `{ title: items }` map. Normalise to the array.
 */
function checklistSectionsOf(node) {
  const sections = node.checklistSections;
  if (!sections) return [];
  if (Array.isArray(sections)) return sections;
  return Object.entries(sections).map(([title, items]) => ({ title, items }));
}

/**
 * Semantic buckets that earn their own callout. Applied to detail keys inside
 * caution-type nodes (and to draft placeholders anywhere).
 */
function calloutVariantForKey(key, nodeType) {
  if (PLACEHOLDER_KEYS.has(key)) return "note";
  if (nodeType !== "caution") return null;
  if (/absolute|contraindicat/i.test(key)) return "contraindication";
  if (/^relative\b|consider anesthesia/i.test(key)) return "caution";
  if (/things to note/i.test(key)) return "note";
  return null;
}

// ---------------------------------------------------------------------------
// Node -> blocks
// ---------------------------------------------------------------------------

function nodeToBlocks(node, ownTitle, report, { skipSummary = false } = {}) {
  const blocks = [];
  const details = node.details ?? {};
  const detailEntries = Object.entries(details).filter(([key]) => !PROVENANCE_KEYS.has(key));

  const allItemsText = [
    ...detailEntries.flatMap(([, items]) => items.map(plainText)),
    ...(node.checklist ?? []).map(plainText),
    ...checklistSectionsOf(node).flatMap((s) => s.items.map(plainText)),
  ].join(" ");

  if (!skipSummary && summaryAddsInformation(node.summary, allItemsText)) {
    blocks.push({ type: "paragraph", text: node.summary });
  }

  let calloutCount = 0;
  for (const [key, items] of detailEntries) {
    const list = { type: "list", items: items.map((item) => convertItem(item, report)) };
    const variant = calloutVariantForKey(key, node.type);
    if (variant) {
      blocks.push({ type: "callout", variant, title: key, blocks: [list] });
      calloutCount += 1;
    } else if (normalizeText(key) === normalizeText(ownTitle)) {
      // Heading would just repeat the subsection title above it.
      blocks.push(list);
    } else {
      blocks.push({ type: "heading", text: key });
      blocks.push(list);
    }
  }

  if (node.checklist?.length) {
    blocks.push({ type: "checklist", items: node.checklist.map((i) => convertItem(i, report)) });
  }
  for (const section of checklistSectionsOf(node)) {
    blocks.push({
      type: "checklist",
      title: section.title,
      items: section.items.map((item) => convertItem(item, report)),
    });
  }

  // Caution nodes get one amber wrap, unless their detail buckets already became
  // callouts of their own (the moderate-sedation screen, for example) — nesting
  // a callout inside a callout reads as noise.
  if (node.type === "caution" && calloutCount === 0 && blocks.length > 0) {
    return [{ type: "callout", variant: "caution", blocks }];
  }
  return blocks;
}

// ---------------------------------------------------------------------------
// Procedure -> article
// ---------------------------------------------------------------------------

const SECTION_KIND_BY_TITLE = {
  "Pre-procedure": { kind: "pre", id: "pre", title: "Pre-procedure" },
  Intraprocedure: { kind: "intra", id: "intra", title: "Intra-procedure" },
  "Post-procedure": { kind: "post", id: "post", title: "Post-procedure" },
};

function uniqueId(base, used) {
  let id = base || "section";
  let n = 2;
  while (used.has(id)) id = `${base}-${n++}`;
  used.add(id);
  return id;
}

/** Title for the subsection built from a phase node's own checklist/details. */
function leadingSubsectionTitle(node, kind) {
  const sections = checklistSectionsOf(node);
  if (sections.length === 1 && sections[0].title) return sections[0].title;
  if (node.checklist?.length || sections.length) {
    return kind === "pre" ? "Order set" : "Orders";
  }
  return "Overview";
}

function convertProcedure(procedure, hiddenTitles, report) {
  const nodes = procedure.nodes;
  const rootNode = nodes[procedure.root];
  const reviewNotes = [];
  const provenance = [];

  for (const [key, items] of Object.entries(rootNode.details ?? {})) {
    if (PROVENANCE_KEYS.has(key)) provenance.push(...items.map(plainText).filter(Boolean));
  }
  if (procedure.lastReviewed) provenance.push(procedure.lastReviewed);

  const sections = [];
  const usedSectionIds = new Set();

  for (const childId of rootNode.children ?? []) {
    const sectionNode = nodes[childId];
    if (!sectionNode) {
      report.problems.push(`${procedure.id}: root references missing node "${childId}"`);
      continue;
    }

    // "Needs review" is editorial metadata, not a phase of the procedure.
    if (/needs review/i.test(sectionNode.title)) {
      for (const items of Object.values(sectionNode.details ?? {})) {
        reviewNotes.push(...items.map(plainText).filter(Boolean));
      }
      continue;
    }

    const mapped = SECTION_KIND_BY_TITLE[sectionNode.title];
    const kind = mapped?.kind ?? "custom";
    const section = {
      id: uniqueId(mapped?.id ?? slugify(sectionNode.title), usedSectionIds),
      kind,
      title: mapped?.title ?? sectionNode.title,
    };

    const childIds = (sectionNode.children ?? []).filter((id) => {
      if (nodes[id]) return true;
      report.problems.push(`${procedure.id}: section "${section.id}" references missing "${id}"`);
      return false;
    });

    // A phase node's own summary was a navigational preview of its children, so
    // it is dropped whenever those children are about to be rendered as bars.
    const ownBlocks = nodeToBlocks(sectionNode, section.title, report, {
      skipSummary: (sectionNode.children ?? []).length > 0,
    });

    if (childIds.length === 0) {
      // Leaf phase: content sits directly under the phase bar.
      if (ownBlocks.length) section.blocks = ownBlocks;
    } else {
      const subsections = [];
      const usedSubIds = new Set();
      if (ownBlocks.length) {
        const title = leadingSubsectionTitle(sectionNode, kind);
        subsections.push({
          id: uniqueId(slugify(title), usedSubIds),
          title,
          blocks: ownBlocks,
        });
      }
      for (const id of childIds) {
        const childNode = nodes[id];
        subsections.push({
          id: uniqueId(slugify(childNode.title), usedSubIds),
          title: childNode.title,
          blocks: nodeToBlocks(childNode, childNode.title, report),
        });
      }
      section.subsections = subsections;
    }

    sections.push(section);
  }

  const reachable = new Set();
  const walk = (id) => {
    if (reachable.has(id) || !nodes[id]) return;
    reachable.add(id);
    (nodes[id].children ?? []).forEach(walk);
  };
  walk(procedure.root);
  for (const id of Object.keys(nodes)) {
    if (!reachable.has(id)) {
      report.orphans.push(`${procedure.id}: "${nodes[id].title}" (${id}) — superseded, dropped`);
    }
  }

  const category = CATEGORY_MAP[procedure.category];
  if (!category) report.problems.push(`${procedure.id}: unmapped category "${procedure.category}"`);

  // Two flavours of unfinished article: the untouched PDF extraction, and the
  // stubs the legacy authors added to reserve a slot for a procedure they had
  // not written yet (the nephrostomy variants, nerve block, UAE).
  const isBoilerplate = /^PDF-derived pre-procedure and post-procedure order draft/.test(
    procedure.summary ?? "",
  );
  const isStub = /^Future edit placeholder/i.test(procedure.summary ?? "");
  const isHidden = hiddenTitles.includes(procedure.title);
  // The sedation checklist is hidden from the legacy sidebar but is fully written.
  const forceComplete = procedure.id === "moderate-sedation-checklist";

  return {
    schemaVersion: SCHEMA_VERSION,
    id: articleIdFor(procedure.id),
    title: procedure.title,
    category: category ?? "reference",
    status: !forceComplete && (isHidden || isBoilerplate || isStub) ? "draft" : "complete",
    bleedRisk: procedure.bleedRisk ? procedure.bleedRisk.toLowerCase() : null,
    keywords: [...new Set(String(procedure.keywords ?? "").split(/\s+/).filter(Boolean))],
    summary: procedure.summary ?? "",
    lastReviewed: null,
    provenance,
    reviewNotes,
    sections,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const { procedures, hiddenProcedureTitles } = captureLegacyState();
  const report = {
    problems: [],
    orphans: [],
    rewrittenLinks: {},
    internalLinks: 0,
    externalLinks: 0,
  };

  const articles = procedures.map((p) => convertProcedure(p, hiddenProcedureTitles, report));

  const knownIds = new Set(articles.map((a) => a.id));
  for (const article of articles) {
    const parsed = articleSchema.safeParse(article);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        report.problems.push(`${article.id}: ${issue.path.join(".")} — ${issue.message}`);
      }
    }
  }

  if (report.problems.length > 0) {
    console.error("\n✗ Migration aborted — unresolved problems:\n");
    for (const problem of report.problems) console.error(`  ${problem}`);
    process.exit(1);
  }

  if (existsSync(outDir)) rmSync(outDir, { recursive: true });
  mkdirSync(outDir, { recursive: true });
  for (const article of articles) {
    const dir = path.join(outDir, article.id);
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, "article.json"), JSON.stringify(article, null, 2) + "\n");
  }

  const drafts = articles.filter((a) => a.status === "draft");
  console.log(`\n✓ Wrote ${articles.length} articles to content/articles/`);
  console.log(`  ${articles.length - drafts.length} complete, ${drafts.length} draft`);
  console.log(`  bleed risk tagged: ${articles.filter((a) => a.bleedRisk).length}`);
  console.log(
    `  links: ${report.internalLinks} internal, ${report.externalLinks} external, ` +
      `rewritten ${JSON.stringify(report.rewrittenLinks)}`,
  );

  const unresolved = [];
  for (const article of articles) {
    const json = JSON.stringify(article);
    for (const match of json.matchAll(/"articleId":"([^"]+)"/g)) {
      if (!knownIds.has(match[1])) unresolved.push(`${article.id} -> ${match[1]}`);
    }
  }
  console.log(`  unresolved internal links: ${unresolved.length}`);
  for (const u of unresolved) console.log(`    ${u}`);

  if (report.orphans.length) {
    console.log(`\n  dropped unreachable legacy nodes (${report.orphans.length}):`);
    for (const orphan of report.orphans) console.log(`    ${orphan}`);
  }

  console.log("\n  drafts:");
  for (const article of drafts) console.log(`    ${article.id}`);
  console.log("");
}

main();
