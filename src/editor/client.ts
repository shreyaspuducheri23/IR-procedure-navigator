/**
 * The editor's link to the Cloudflare Worker (worker/src/content.ts), which
 * reads articles from the repository and commits edits to it.
 */
import { articleSchema } from "@/schema/article";
import type { Article } from "@/schema/article";

const endpoint = (import.meta.env.VITE_EDITOR_ENDPOINT ?? import.meta.env.VITE_FEEDBACK_ENDPOINT ?? "")
  .trim()
  .replace(/\/+$/, "");

export const editorAvailable = endpoint !== "";

const KEY_STORAGE = "ir-editor-key";

export type LoadedArticle = {
  article: Article;
  /** Version of the stored file; sent back on save to detect concurrent edits. */
  sha: string;
  /** File names already in the article's images/ folder. */
  images: string[];
};

export type PendingImage = { name: string; data: string };

export type SaveResult =
  | { ok: true; sha: string; unchanged: boolean; commitUrl: string | null }
  | { ok: false; message: string; conflict?: "stale" | "exists" | "image"; needsKey?: boolean };

const UNREACHABLE =
  "Could not reach the publishing service. Check your connection and try again.";

function articleUrl(id: string): string {
  return `${endpoint}/content/articles/${encodeURIComponent(id)}`;
}

export function rememberedKey(): string {
  try {
    return localStorage.getItem(KEY_STORAGE) ?? "";
  } catch {
    return "";
  }
}

export function rememberKey(key: string): void {
  try {
    if (key) localStorage.setItem(KEY_STORAGE, key);
    else localStorage.removeItem(KEY_STORAGE);
  } catch {
    // Private browsing: the passcode simply is not remembered.
  }
}

export async function loadArticle(id: string): Promise<LoadedArticle | { error: string; missing?: boolean }> {
  if (!editorAvailable) return { error: "The editor is not configured for this build." };
  try {
    const response = await fetch(articleUrl(id));
    const data = (await response.json().catch(() => null)) as
      | { ok?: boolean; article?: unknown; sha?: string; images?: string[]; error?: string }
      | null;
    if (response.status === 404) return { error: "That procedure does not exist.", missing: true };
    // A Worker deployed before the editor existed only knows POST.
    if (response.status === 405) {
      return {
        error:
          "The publishing service has not been updated for the editor yet. The site owner needs to redeploy the Worker (npm run worker:deploy).",
      };
    }
    if (!response.ok || !data?.ok || typeof data.sha !== "string") {
      return { error: data?.error ?? UNREACHABLE };
    }
    // Validate, but keep the object exactly as stored: zod would reorder keys,
    // and the editor's promise is that untouched content is saved back untouched.
    const parsed = articleSchema.safeParse(data.article);
    if (!parsed.success) {
      return { error: "The stored procedure has a format problem and cannot be edited here." };
    }
    return { article: data.article as Article, sha: data.sha, images: data.images ?? [] };
  } catch {
    return { error: UNREACHABLE };
  }
}

export async function saveArticle(input: {
  article: Article;
  baseSha: string | null;
  editor: string;
  note: string;
  images: PendingImage[];
}): Promise<SaveResult> {
  try {
    const key = rememberedKey();
    const response = await fetch(articleUrl(input.article.id), {
      method: "PUT",
      headers: { "content-type": "application/json", ...(key ? { "x-edit-key": key } : {}) },
      body: JSON.stringify(input),
    });
    const data = (await response.json().catch(() => null)) as
      | {
          ok?: boolean;
          sha?: string;
          unchanged?: boolean;
          commitUrl?: string | null;
          error?: string;
          conflict?: "stale" | "exists" | "image";
          needsKey?: boolean;
        }
      | null;
    if (!response.ok || !data?.ok || typeof data.sha !== "string") {
      return {
        ok: false,
        message: data?.error ?? UNREACHABLE,
        conflict: data?.conflict,
        needsKey: data?.needsKey,
      };
    }
    return { ok: true, sha: data.sha, unchanged: data.unchanged === true, commitUrl: data.commitUrl ?? null };
  } catch {
    return { ok: false, message: UNREACHABLE };
  }
}
