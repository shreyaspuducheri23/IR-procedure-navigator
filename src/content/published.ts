/**
 * A just-published article, remembered for this browser tab.
 *
 * Publishing from the in-site editor commits to the repository, and the site
 * rebuilds a couple of minutes later. Until that build is the one loaded, the
 * bundle still holds the old text — so the person who just pressed Publish
 * would open the page and see their change missing. This keeps their version
 * to show them in the meantime.
 *
 * The entry is tagged with the build it was made under and ignored once a
 * different build is running, which by then contains the change itself.
 */
import { articleSchema } from "@/schema/article";
import type { Article } from "@/schema/article";

const PREFIX = "ir-published:";

export function rememberPublished(article: Article): void {
  try {
    sessionStorage.setItem(PREFIX + article.id, JSON.stringify({ build: __APP_VERSION__, article }));
  } catch {
    // No session storage: the page simply shows the old text until the rebuild.
  }
}

export function publishedArticle(id: string): Article | null {
  try {
    const raw = sessionStorage.getItem(PREFIX + id);
    if (!raw) return null;
    const entry = JSON.parse(raw) as { build?: string; article?: unknown };
    const parsed = entry.build === __APP_VERSION__ ? articleSchema.safeParse(entry.article) : null;
    if (!parsed?.success) {
      sessionStorage.removeItem(PREFIX + id);
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}
