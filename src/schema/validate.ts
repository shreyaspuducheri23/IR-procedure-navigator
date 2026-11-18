/**
 * Checks the zod schema cannot express: an article's place among the others
 * (folder name, category list, link targets, image files).
 *
 * One function, three callers, so they cannot drift:
 *   - scripts/validate-content.mjs   CI gate before every deploy
 *   - src/editor                     inline problems, disables Publish
 *   - worker/src/content.ts          rejects a save that would break the deploy
 *
 * Relative imports with explicit `.ts` extensions on purpose: Node runs this
 * file directly through type stripping, which knows nothing about the `@/` alias.
 */
import type { Article, Block, ExternalLink, InternalLink, RichText } from "./article.ts";
import { CATEGORY_IDS } from "../content/categories.ts";

export type ValidationContext = {
  /** Folder the article lives in (content/articles/<folderId>). */
  folderId: string;
  /** Every article id that exists. Omit to skip internal-link checks. */
  knownArticleIds?: ReadonlySet<string>;
  /** Whether an image `src` (relative to the article folder) exists. Omit to skip. */
  imageExists?: (src: string) => boolean;
};

/**
 * Where an image block may point: a flat file inside the article's own images/
 * folder. Kept strict because the editor's Worker turns these into repo paths.
 */
export const IMAGE_SRC_PATTERN = /^images\/[a-z0-9][a-z0-9._-]*\.(png|jpe?g|webp|gif)$/;

/**
 * External links are rendered as real hrefs, and saves are open to anyone, so
 * only ordinary web, mail and phone addresses are accepted — never script URLs.
 */
export const EXTERNAL_HREF_PATTERN = /^(https?:\/\/|mailto:|tel:)\S+$/i;

/** Walks a block tree, yielding every block including those nested in callouts. */
export function* walkBlocks(blocks: readonly Block[] | undefined): Generator<Block> {
  for (const block of blocks ?? []) {
    yield block;
    if (block.type === "callout") yield* walkBlocks(block.blocks);
  }
}

export function* walkArticleBlocks(article: Article): Generator<Block> {
  for (const section of article.sections) {
    yield* walkBlocks(section.blocks);
    for (const sub of section.subsections ?? []) yield* walkBlocks(sub.blocks);
  }
}

function* linksIn(rich: RichText): Generator<InternalLink | ExternalLink> {
  if (typeof rich === "string") return;
  for (const part of rich) {
    if (typeof part === "object" && "link" in part) yield part.link;
  }
}

/** Yields every link object reachable from an article's rich text. */
export function* walkLinks(article: Article): Generator<InternalLink | ExternalLink> {
  for (const block of walkArticleBlocks(article)) {
    if (block.type === "paragraph") yield* linksIn(block.text);
    if (block.type === "list" || block.type === "checklist") {
      for (const item of block.items) yield* linksIn(item);
    }
    if (block.type === "list") {
      for (const subitems of Object.values(block.subitems ?? {})) {
        for (const item of subitems) yield* linksIn(item);
      }
    }
    if (block.type === "table") {
      for (const cell of block.header) yield* linksIn(cell);
      for (const row of block.rows) for (const cell of row) yield* linksIn(cell);
    }
  }
}

/**
 * Paths present in `raw` that the schema dropped while parsing it (zod strips
 * unknown keys silently). Content must have none: the editor commits the object
 * it was given, so a stray key would otherwise ride along unchecked.
 */
export function unknownFields(raw: unknown, parsed: unknown, path = ""): string[] {
  if (!raw || typeof raw !== "object" || !parsed || typeof parsed !== "object") return [];
  if (Array.isArray(raw)) {
    const other = Array.isArray(parsed) ? parsed : [];
    return raw.flatMap((item, index) => unknownFields(item, other[index], `${path}[${index}]`));
  }
  const found: string[] = [];
  for (const [key, value] of Object.entries(raw)) {
    const here = path ? `${path}.${key}` : key;
    if (!(key in parsed)) found.push(here);
    else found.push(...unknownFields(value, (parsed as Record<string, unknown>)[key], here));
  }
  return found;
}

/** Returns human-readable problems; an empty array means the article is sound. */
export function validateArticle(article: Article, context: ValidationContext): string[] {
  const problems: string[] = [];

  if (article.id !== context.folderId) {
    problems.push(`id "${article.id}" does not match folder "${context.folderId}"`);
  }
  if (!CATEGORY_IDS.includes(article.category)) {
    problems.push(`unknown category "${article.category}"`);
  }

  const sectionIds = new Set(article.sections.map((section) => section.id));
  if (sectionIds.size !== article.sections.length) {
    problems.push("duplicate section ids");
  }
  for (const section of article.sections) {
    const subsections = section.subsections ?? [];
    if (new Set(subsections.map((sub) => sub.id)).size !== subsections.length) {
      problems.push(`duplicate subsection ids in section "${section.id}"`);
    }
  }

  for (const block of walkArticleBlocks(article)) {
    if (block.type !== "image") continue;
    if (!IMAGE_SRC_PATTERN.test(block.src)) {
      problems.push(`image path not allowed — ${block.src}`);
    } else if (context.imageExists && !context.imageExists(block.src)) {
      problems.push(`image not found — ${block.src}`);
    }
  }

  for (const link of walkLinks(article)) {
    if ("articleId" in link) {
      if (context.knownArticleIds && !context.knownArticleIds.has(link.articleId)) {
        problems.push(`internal link to unknown article "${link.articleId}"`);
      }
    } else if (!EXTERNAL_HREF_PATTERN.test(link.href)) {
      problems.push(`link address not allowed — ${link.href.slice(0, 80)}`);
    }
  }

  return problems;
}
