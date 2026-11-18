/**
 * Pure helpers over the article model: ids, new-block factories, the tidy-up
 * applied before validating or publishing, and human descriptions of problems.
 *
 * Objects are built with keys in schema order so freshly added content
 * serialises the same way the existing files do.
 *
 * Relative `.ts` imports (here and in richTextDom.ts) so Node can run this file
 * directly for the unit tests in tests/editor-model.test.mjs.
 */
import { articleSchema, CALLOUT_VARIANTS } from "../schema/article.ts";
import type { Article, Block, CalloutVariant, RichText, Section, Subsection } from "../schema/article.ts";
import { validateArticle } from "../schema/validate.ts";
import { isEmptyRichText } from "./richTextDom.ts";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
}

export function uniqueId(base: string, taken: Iterable<string>): string {
  const used = new Set(taken);
  const stem = base || "item";
  if (!used.has(stem)) return stem;
  for (let n = 2; ; n++) {
    if (!used.has(`${stem}-${n}`)) return `${stem}-${n}`;
  }
}

/**
 * Ids of things added in this session start with this prefix and are replaced
 * by a slug of the title when the article is tidied. Existing ids never change,
 * so deep links and search results keep working when something is renamed.
 */
const TEMP_PREFIX = "new-";
let tempCounter = 0;
const tempId = (kind: string) => `${TEMP_PREFIX}${kind}-${Date.now().toString(36)}${(tempCounter++).toString(36)}`;
const isTempId = (id: string) => /^new-(topic|section)-[a-z0-9]+$/.test(id);

export function newSubsection(): Subsection {
  return { id: tempId("topic"), title: "", blocks: [] };
}

export function newSection(kind: Section["kind"], title: string): Section {
  return { id: tempId("section"), kind, title, subsections: [] };
}

export const CALLOUT_NAMES: Record<CalloutVariant, string> = {
  caution: "Caution",
  contraindication: "Do not proceed",
  pearl: "Pearl",
  note: "Note",
};

export type NewBlockKind =
  | "paragraph"
  | "heading"
  | "list"
  | "ordered"
  | "checklist"
  | "table"
  | "image"
  | `callout:${CalloutVariant}`;

export const NEW_BLOCK_CHOICES: { kind: NewBlockKind; label: string; hint: string }[] = [
  { kind: "list", label: "Bullet list", hint: "The usual choice" },
  { kind: "ordered", label: "Numbered list", hint: "Steps in order" },
  { kind: "heading", label: "Heading", hint: "A label above a group" },
  { kind: "paragraph", label: "Text", hint: "A plain paragraph" },
  { kind: "checklist", label: "Titled list", hint: "A list with its own title" },
  ...CALLOUT_VARIANTS.map((variant) => ({
    kind: `callout:${variant}` as const,
    label: `${CALLOUT_NAMES[variant]} box`,
    hint: {
      caution: "Things that go wrong if missed",
      contraindication: "Hard stops",
      pearl: "Practical tips",
      note: "Asides",
    }[variant],
  })),
  { kind: "image", label: "Image", hint: "Upload a picture" },
  { kind: "table", label: "Table", hint: "Rows and columns" },
];

/** Image blocks are created by the upload flow, which supplies `src`. */
export function newBlock(kind: Exclude<NewBlockKind, "image">): Block {
  switch (kind) {
    case "paragraph":
      return { type: "paragraph", text: "" };
    case "heading":
      return { type: "heading", text: "" };
    case "list":
      return { type: "list", items: [""] };
    case "ordered":
      return { type: "list", ordered: true, items: [""] };
    case "checklist":
      return { type: "checklist", title: "", items: [""] };
    case "table":
      return { type: "table", header: ["", ""], rows: [["", ""]] };
    default:
      return {
        type: "callout",
        variant: kind.slice("callout:".length) as CalloutVariant,
        blocks: [{ type: "list", items: [""] }],
      };
  }
}

export function newArticle(input: { title: string; category: string; bleedRisk: Article["bleedRisk"] }): Article {
  return {
    schemaVersion: 1,
    id: slugify(input.title),
    title: input.title,
    category: input.category,
    status: "draft",
    bleedRisk: input.bleedRisk,
    keywords: [],
    summary: "",
    lastReviewed: null,
    provenance: [],
    reviewNotes: [],
    sections: [
      { id: "pre", kind: "pre", title: "Pre-procedure", subsections: [] },
      { id: "intra", kind: "intra", title: "Intra-procedure", subsections: [] },
      { id: "post", kind: "post", title: "Post-procedure", subsections: [] },
    ],
  };
}

// ---------------------------------------------------------------------------
// Tidy
// ---------------------------------------------------------------------------

function withoutKey<T extends object>(value: T, key: string): T {
  const copy = { ...value } as Record<string, unknown>;
  delete copy[key];
  return copy as T;
}

function tidyBlocks(blocks: Block[]): Block[] {
  let changed = false;
  const next: Block[] = [];
  for (const block of blocks) {
    const tidied = tidyBlock(block);
    if (tidied !== block) changed = true;
    if (tidied) next.push(tidied);
  }
  return changed ? next : blocks;
}

/**
 * Removes what an editing session leaves behind — blank bullets, blank
 * paragraphs, empty optional titles. Returns the same object when there is
 * nothing to remove, so untouched content is never rewritten.
 */
function tidyBlock(block: Block): Block | null {
  switch (block.type) {
    case "paragraph":
      return isEmptyRichText(block.text) ? null : block;
    case "heading":
      return block.text.trim() === "" ? null : block;
    case "list": {
      if (!block.items.some(isEmptyRichText) && !hasBlankSubitems(block.subitems)) return block;
      const items: RichText[] = [];
      const subitems: Record<string, RichText[]> = {};
      block.items.forEach((item, index) => {
        const children = (block.subitems?.[index] ?? []).filter((child) => !isEmptyRichText(child));
        if (isEmptyRichText(item) && children.length === 0) return;
        if (children.length > 0) subitems[items.length] = children;
        items.push(item);
      });
      if (items.length === 0) return null;
      const next = { ...block, items };
      return Object.keys(subitems).length > 0 ? { ...next, subitems } : withoutKey(next, "subitems");
    }
    case "checklist": {
      const blankTitle = block.title !== undefined && block.title.trim() === "";
      if (!blankTitle && !block.items.some(isEmptyRichText)) return block;
      const items = block.items.filter((item) => !isEmptyRichText(item));
      if (items.length === 0) return null;
      const next = { ...block, items };
      return blankTitle ? withoutKey(next, "title") : next;
    }
    case "callout": {
      const blocks = tidyBlocks(block.blocks);
      const blankTitle = block.title === undefined || block.title.trim() === "";
      // Only a box with nothing in it at all goes. One that has a title but no
      // body is kept as it appears on screen: dropping it would lose words.
      if (blocks.length === 0 && blankTitle) return null;
      if (blocks === block.blocks && (block.title === undefined || !blankTitle)) return block;
      const next = { ...block, blocks };
      return blankTitle ? withoutKey(next, "title") : next;
    }
    case "image": {
      const blankCaption = block.caption !== undefined && block.caption.trim() === "";
      return blankCaption ? withoutKey(block, "caption") : block;
    }
    case "table": {
      let next = block;
      if (block.caption !== undefined && block.caption.trim() === "") next = withoutKey(next, "caption");
      if (block.note !== undefined && block.note.trim() === "") next = withoutKey(next, "note");
      return next;
    }
    default:
      return block;
  }
}

function hasBlankSubitems(subitems: Record<string, RichText[]> | undefined): boolean {
  return Object.values(subitems ?? {}).some((children) => children.length === 0 || children.some(isEmptyRichText));
}

/**
 * The article as it would be published: blanks removed and temporary ids
 * replaced. `isNew` articles also take their id from the title.
 */
export function tidyArticle(article: Article, options: { isNew: boolean }): Article {
  let next = article;

  const sectionIds = new Set(article.sections.filter((s) => !isTempId(s.id)).map((s) => s.id));
  const sections = article.sections.map((section) => {
    let current = section;

    if (isTempId(current.id)) {
      const id = uniqueId(slugify(current.title) || "section", sectionIds);
      sectionIds.add(id);
      current = { ...current, id };
    }

    if (current.blocks) {
      const blocks = tidyBlocks(current.blocks);
      if (blocks !== current.blocks) current = { ...current, blocks };
    }

    if (current.subsections) {
      const subIds = new Set(current.subsections.filter((s) => !isTempId(s.id)).map((s) => s.id));
      let changed = false;
      const subsections = current.subsections.map((sub) => {
        let tidied = sub;
        if (isTempId(tidied.id)) {
          const id = uniqueId(slugify(tidied.title) || "topic", subIds);
          subIds.add(id);
          tidied = { ...tidied, id };
        }
        const blocks = tidyBlocks(tidied.blocks);
        if (blocks !== tidied.blocks) tidied = { ...tidied, blocks };
        if (tidied !== sub) changed = true;
        return tidied;
      });
      if (changed) current = { ...current, subsections };
    }

    return current;
  });
  if (sections.some((section, index) => section !== article.sections[index])) {
    next = { ...next, sections };
  }

  if (options.isNew) {
    const id = slugify(next.title);
    if (id !== next.id) next = { ...next, id };
  }

  return next;
}

// ---------------------------------------------------------------------------
// Problems
// ---------------------------------------------------------------------------

function describePath(article: Article, path: (string | number)[]): string {
  const [first, second, third, fourth] = path;
  if (first !== "sections" || typeof second !== "number") {
    const names: Record<string, string> = {
      lastReviewed: "The last-reviewed date",
      category: "The category",
    };
    return names[String(first)] ?? `"${String(first)}"`;
  }
  const section = article.sections[second];
  const sectionName = section?.title || "a section";
  if (third === "subsections" && typeof fourth === "number") {
    const sub = section?.subsections?.[fourth];
    if (path[4] === "title") return `A topic in ${sectionName}`;
    return `${sectionName} › ${sub?.title || "untitled topic"}`;
  }
  if (third === "title") return "A section";
  return sectionName;
}

/** Everything that would stop this article from publishing, in plain words. */
export function findProblems(
  article: Article,
  context: { folderId: string; knownArticleIds: ReadonlySet<string>; imageExists: (src: string) => boolean },
): string[] {
  const problems: string[] = [];

  const parsed = articleSchema.safeParse(article);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const where = describePath(article, issue.path);
      const last = issue.path[issue.path.length - 1];
      if (issue.path.length === 1 && (last === "title" || last === "id")) {
        problems.push("Give the procedure a title.");
      } else if (issue.code === "too_small" && (last === "title" || last === "id")) {
        problems.push(`${where} needs a title.`);
      } else {
        problems.push(`${where}: ${issue.message}.`);
      }
    }
    return [...new Set(problems)];
  }

  for (const problem of validateArticle(article, context)) {
    if (problem.startsWith("image not found")) {
      problems.push(`An image is missing its file (${problem.split("— ")[1]}). Remove the image or add it again.`);
    } else if (problem.startsWith("internal link to unknown article")) {
      problems.push(`A link points to a procedure that does not exist (${problem.split('"')[1]}).`);
    } else if (problem.startsWith("duplicate")) {
      problems.push("Two sections or topics ended up with the same address. Rename one of them.");
    } else {
      problems.push(problem);
    }
  }
  return [...new Set(problems)];
}

/** "Pre-procedure › Labs"-style names of everything that differs from `before`. */
export function describeChanges(before: Article | null, after: Article): string[] {
  if (!before) return [];
  const changes: string[] = [];
  const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

  const { sections: beforeSections, ...beforeMeta } = before;
  const { sections: afterSections, ...afterMeta } = after;
  if (!same(beforeMeta, afterMeta)) changes.push("Details");

  const previous = new Map(beforeSections.map((section) => [section.id, section]));
  for (const section of afterSections) {
    const old = previous.get(section.id);
    previous.delete(section.id);
    if (!old) {
      changes.push(`${section.title} (new section)`);
      continue;
    }
    if (same(old, section)) continue;
    const oldSubs = new Map((old.subsections ?? []).map((sub) => [sub.id, sub]));
    let named = false;
    for (const sub of section.subsections ?? []) {
      const oldSub = oldSubs.get(sub.id);
      oldSubs.delete(sub.id);
      if (!oldSub) changes.push(`${section.title} › ${sub.title} (new)`);
      else if (!same(oldSub, sub)) changes.push(`${section.title} › ${sub.title}`);
      else continue;
      named = true;
    }
    for (const gone of oldSubs.values()) {
      changes.push(`${section.title} › ${gone.title} (removed)`);
      named = true;
    }
    if (!named || old.title !== section.title || !same(old.blocks, section.blocks)) {
      changes.push(section.title);
    }
  }
  for (const gone of previous.values()) changes.push(`${gone.title} (section removed)`);
  return changes;
}

// ---------------------------------------------------------------------------
// Key order
// ---------------------------------------------------------------------------

const KEY_ORDER: Record<string, string[]> = {
  paragraph: ["type", "text"],
  heading: ["type", "text"],
  list: ["type", "ordered", "items", "subitems"],
  checklist: ["type", "title", "items"],
  image: ["type", "src", "alt", "caption"],
  table: ["type", "collapsible", "note", "caption", "header", "rows"],
  callout: ["type", "variant", "title", "collapsible", "blocks"],
  calculator: ["type", "calculator"],
};

function ordered<T extends object>(value: T, order: string[]): T {
  const keys = Object.keys(value);
  const sorted = [...keys].sort((a, b) => order.indexOf(a) - order.indexOf(b));
  if (sorted.every((key, index) => key === keys[index])) return value;
  const source = value as Record<string, unknown>;
  return Object.fromEntries(sorted.map((key) => [key, source[key]])) as T;
}

/**
 * Puts a block's keys in the order the existing files use, so an optional field
 * added in the editor (a callout title, say) lands where a hand-written file
 * would have it and diffs stay readable. Unset optional fields are dropped.
 */
export function canonicalBlock<T extends Block>(block: T): T {
  const defined = Object.fromEntries(Object.entries(block).filter(([, value]) => value !== undefined)) as T;
  const clean = Object.keys(defined).length === Object.keys(block).length ? block : defined;
  return ordered(clean, KEY_ORDER[block.type] ?? []);
}

export function canonicalSection(section: Section): Section {
  const next = { ...section } as Record<string, unknown>;
  if (section.blocks && section.blocks.length === 0) delete next.blocks;
  const clean = Object.keys(next).length === Object.keys(section).length ? section : (next as Section);
  return ordered(clean, ["id", "kind", "title", "blocks", "subsections"]);
}

export function canonicalSubsection(subsection: Subsection): Subsection {
  const next = { ...subsection } as Record<string, unknown>;
  if (!subsection.defaultOpen) delete next.defaultOpen;
  const clean = Object.keys(next).length === Object.keys(subsection).length ? subsection : (next as Subsection);
  return ordered(clean, ["id", "title", "defaultOpen", "blocks"]);
}
