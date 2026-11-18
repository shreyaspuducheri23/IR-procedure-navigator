/**
 * Unpublished work, kept in this browser so a closed tab or a wrong click does
 * not lose it. One draft per article.
 */
import type { Article } from "@/schema/article";
import type { PendingImage } from "./client";

export type Draft = {
  article: Article;
  /** Stored version the draft was based on; null for a procedure not yet published. */
  baseSha: string | null;
  savedAt: number;
  images: PendingImage[];
};

const PREFIX = "ir-editor-draft:";
const NAME_KEY = "ir-editor-name";
/** localStorage holds about 5 MB per site; leave room for everything else. */
const IMAGE_BUDGET = 3 * 1024 * 1024;

export function readDraft(key: string): Draft | null {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const draft = JSON.parse(raw) as Draft;
    return draft && typeof draft === "object" && draft.article ? { ...draft, images: draft.images ?? [] } : null;
  } catch {
    return null;
  }
}

export function writeDraft(key: string, draft: Draft): void {
  const fits = draft.images.reduce((total, image) => total + image.data.length, 0) <= IMAGE_BUDGET;
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(fits ? draft : { ...draft, images: [] }));
  } catch {
    try {
      // Over quota with images attached: the text is what matters most.
      localStorage.setItem(PREFIX + key, JSON.stringify({ ...draft, images: [] }));
    } catch {
      // Storage unavailable (private browsing). Editing still works, unsaved.
    }
  }
}

export function clearDraft(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    // Nothing to clear.
  }
}

export function rememberedName(): string {
  try {
    return localStorage.getItem(NAME_KEY) ?? "";
  } catch {
    return "";
  }
}

export function rememberName(name: string): void {
  try {
    localStorage.setItem(NAME_KEY, name);
  } catch {
    // Not remembered; the dialog will ask again.
  }
}
