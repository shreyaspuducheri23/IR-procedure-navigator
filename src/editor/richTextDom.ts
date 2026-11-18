/**
 * Conversion between the schema's rich text (a string, or an array of strings,
 * bold runs and links) and the DOM inside an editable field.
 *
 * The DOM vocabulary is deliberately tiny — text, <strong>/<b>, and <a> carrying
 * its target in data attributes — and reading is forgiving about whatever else a
 * browser's editing commands leave behind (spans, <br>, nested tags). Anything
 * the schema cannot express is flattened to plain text rather than rejected.
 */
import { isInternalLink } from "../schema/article.ts";
import type { ExternalLink, InlinePart, InternalLink, RichText } from "../schema/article.ts";

type Link = InternalLink | ExternalLink;

export function linkFromAnchor(anchor: HTMLElement, text: string): Link | null {
  const { article, section, href } = anchor.dataset;
  if (article) return section ? { text, articleId: article, sectionId: section } : { text, articleId: article };
  if (href) return { text, href };
  return null;
}

export function makeAnchor(doc: Document, link: Link): HTMLAnchorElement {
  const anchor = doc.createElement("a");
  anchor.textContent = link.text;
  if (isInternalLink(link)) {
    anchor.dataset.article = link.articleId;
    if (link.sectionId) anchor.dataset.section = link.sectionId;
    anchor.title = `Links to: ${link.articleId}${link.sectionId ? ` › ${link.sectionId}` : ""}`;
  } else {
    anchor.dataset.href = link.href;
    anchor.title = `Links to: ${link.href}`;
  }
  // No real href: a link in an editable field must never navigate away.
  return anchor;
}

/** Replaces the field's content with the DOM form of `value`. */
export function renderRichText(root: HTMLElement, value: RichText): void {
  const doc = root.ownerDocument;
  const parts = typeof value === "string" ? [value] : value;
  const nodes: Node[] = [];
  for (const part of parts) {
    if (typeof part === "string") {
      if (part) nodes.push(doc.createTextNode(part));
    } else if ("strong" in part) {
      const strong = doc.createElement("strong");
      strong.textContent = part.strong;
      nodes.push(strong);
    } else {
      nodes.push(makeAnchor(doc, part.link));
    }
  }
  root.replaceChildren(...nodes);
}

function isBold(element: HTMLElement): boolean {
  if (element.nodeName === "B" || element.nodeName === "STRONG") return true;
  const weight = element.style?.fontWeight;
  return weight === "bold" || Number(weight) >= 600;
}

/** Browsers pad editable text with non-breaking spaces and stray newlines. */
function cleanText(text: string): string {
  return text.replace(/ /g, " ").replace(/[\r\n]+/g, " ");
}

function collect(node: Node, bold: boolean, out: InlinePart[]): void {
  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType === 3) {
      const text = cleanText(child.textContent ?? "");
      if (text) out.push(bold ? { strong: text } : text);
      continue;
    }
    if (child.nodeType !== 1) continue;
    const element = child as HTMLElement;
    if (element.nodeName === "BR") continue;
    if (element.nodeName === "A") {
      const text = cleanText(element.textContent ?? "");
      const link = text ? linkFromAnchor(element, text) : null;
      if (link) {
        out.push({ link });
        continue;
      }
    }
    collect(element, bold || isBold(element), out);
  }
}

/** Merges neighbouring runs of the same kind and drops empty ones. */
function mergeParts(parts: readonly InlinePart[]): InlinePart[] {
  const merged: InlinePart[] = [];
  for (const part of parts) {
    const previous = merged[merged.length - 1];
    if (typeof part === "string") {
      if (!part) continue;
      if (typeof previous === "string") merged[merged.length - 1] = previous + part;
      else merged.push(part);
    } else if ("strong" in part) {
      if (typeof previous === "object" && "strong" in previous) {
        merged[merged.length - 1] = { strong: previous.strong + part.strong };
      } else merged.push(part);
    } else if (typeof previous === "object" && "link" in previous && sameTarget(previous.link, part.link)) {
      // Two halves of one link (split by Enter, rejoined by Backspace) are one link.
      merged[merged.length - 1] = { link: { ...previous.link, text: previous.link.text + part.link.text } };
    } else {
      merged.push(part);
    }
  }
  return merged;
}

function sameTarget(a: Link, b: Link): boolean {
  const { text: _a, ...targetA } = a;
  const { text: _b, ...targetB } = b;
  return JSON.stringify(targetA) === JSON.stringify(targetB);
}

function fromParts(parts: readonly InlinePart[]): RichText {
  const merged = mergeParts(parts);
  // A plain string covers the common case; the array form is only for formatting.
  if (merged.every((part) => typeof part === "string")) return merged.join("");
  return merged;
}

/** The canonical form the editor writes: merged runs, a bare string when unformatted. */
export function normalizeRichText(value: RichText): RichText {
  return fromParts(typeof value === "string" ? [value] : value);
}

export function readRichText(root: Node): RichText {
  const parts: InlinePart[] = [];
  collect(root, false, parts);
  return fromParts(parts);
}

export function richTextEquals(a: RichText, b: RichText): boolean {
  return JSON.stringify(normalizeRichText(a)) === JSON.stringify(normalizeRichText(b));
}

export function richTextToPlain(value: RichText): string {
  if (typeof value === "string") return value;
  return value
    .map((part) => (typeof part === "string" ? part : "strong" in part ? part.strong : part.link.text))
    .join("");
}

export function isEmptyRichText(value: RichText): boolean {
  return richTextToPlain(value).trim() === "";
}

export function concatRichText(a: RichText, b: RichText): RichText {
  return fromParts([...(typeof a === "string" ? [a] : a), ...(typeof b === "string" ? [b] : b)]);
}

// ---------------------------------------------------------------------------
// Caret helpers
// ---------------------------------------------------------------------------

function selectionWithin(root: HTMLElement): Range | null {
  const selection = root.ownerDocument.getSelection();
  if (!selection || selection.rangeCount === 0) return null;
  const range = selection.getRangeAt(0);
  return root.contains(range.startContainer) && root.contains(range.endContainer) ? range : null;
}

export function currentRange(root: HTMLElement): Range | null {
  return selectionWithin(root)?.cloneRange() ?? null;
}

/** Characters before the caret (or before the start of the selection). */
export function caretOffset(root: HTMLElement): number | null {
  const range = selectionWithin(root);
  if (!range) return null;
  const before = root.ownerDocument.createRange();
  before.selectNodeContents(root);
  before.setEnd(range.startContainer, range.startOffset);
  return before.toString().length;
}

export function caretAtStart(root: HTMLElement): boolean {
  const range = selectionWithin(root);
  return !!range && range.collapsed && caretOffset(root) === 0;
}

export function caretAtEnd(root: HTMLElement): boolean {
  const range = selectionWithin(root);
  return !!range && range.collapsed && caretOffset(root) === (root.textContent ?? "").length;
}

export function placeCaret(root: HTMLElement, at: "start" | "end" | number): void {
  const doc = root.ownerDocument;
  const range = doc.createRange();
  const total = (root.textContent ?? "").length;
  const target = at === "start" ? 0 : at === "end" ? total : Math.max(0, Math.min(at, total));

  range.selectNodeContents(root);
  range.collapse(target === 0);
  if (target > 0 && target < total) {
    const walker = doc.createTreeWalker(root, 4 /* NodeFilter.SHOW_TEXT */);
    let seen = 0;
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const length = (node.textContent ?? "").length;
      if (seen + length >= target) {
        range.setStart(node, target - seen);
        range.collapse(true);
        break;
      }
      seen += length;
    }
  }

  root.focus({ preventScroll: true });
  const selection = doc.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

/** The content on each side of the caret, with formatting preserved on both. */
export function splitAtCaret(root: HTMLElement): [RichText, RichText] | null {
  const range = selectionWithin(root);
  if (!range) return null;
  const doc = root.ownerDocument;
  const before = doc.createRange();
  before.selectNodeContents(root);
  before.setEnd(range.startContainer, range.startOffset);
  const after = doc.createRange();
  after.selectNodeContents(root);
  after.setStart(range.endContainer, range.endOffset);
  return [readRichText(before.cloneContents()), readRichText(after.cloneContents())];
}

/** Start and end of the selection as character offsets, to restore it after a re-render. */
export function selectionOffsets(root: HTMLElement): [number, number] | null {
  const range = selectionWithin(root);
  if (!range) return null;
  const measure = root.ownerDocument.createRange();
  measure.selectNodeContents(root);
  measure.setEnd(range.startContainer, range.startOffset);
  const start = measure.toString().length;
  measure.setEnd(range.endContainer, range.endOffset);
  return [start, measure.toString().length];
}

function pointAt(root: HTMLElement, offset: number): [Node, number] {
  const walker = root.ownerDocument.createTreeWalker(root, 4 /* NodeFilter.SHOW_TEXT */);
  let seen = 0;
  let last: Node | null = null;
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const length = (node.textContent ?? "").length;
    if (seen + length >= offset) return [node, offset - seen];
    seen += length;
    last = node;
  }
  return last ? [last, (last.textContent ?? "").length] : [root, 0];
}

export function selectOffsets(root: HTMLElement, start: number, end: number): void {
  const range = root.ownerDocument.createRange();
  range.setStart(...pointAt(root, start));
  range.setEnd(...pointAt(root, end));
  const selection = root.ownerDocument.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}
