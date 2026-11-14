import { articleSchema, type Article, type ArticleMeta } from "@/schema/article";
import { articleIndex } from "virtual:article-index";
import { publishedArticle } from "./published";

/**
 * Everything the reader needs from the content layer, backed by the JSON files
 * in content/articles as they were at build time. The in-site editor does not
 * go through this: it reads and writes the repository directly (src/editor).
 */
export interface ContentSource {
  listArticles(): ArticleMeta[];
  getArticle(id: string): Promise<Article | null>;
}

/**
 * Article bodies are lazy: each article.json becomes its own chunk, fetched the
 * first time someone opens it. Only the metadata index ships up front.
 */
const loaders = import.meta.glob<{ default: unknown }>("/content/articles/*/article.json");

function loaderFor(id: string) {
  return loaders[`/content/articles/${id}/article.json`];
}

const cache = new Map<string, Article>();

export const staticContentSource: ContentSource = {
  listArticles() {
    return articleIndex;
  },

  async getArticle(id) {
    // Someone who just published from the editor sees their version until the
    // rebuilt site (which contains it) is the one loaded. See ./published.ts.
    const published = publishedArticle(id);
    if (published) return published;

    const cached = cache.get(id);
    if (cached) return cached;

    const load = loaderFor(id);
    if (!load) return null;

    const module = await load();
    const parsed = articleSchema.safeParse(module.default);
    if (!parsed.success) {
      // Content is validated in CI, so this only fires on locally broken JSON.
      console.error(`Invalid article "${id}":`, parsed.error.issues);
      return null;
    }
    cache.set(id, parsed.data);
    return parsed.data;
  },
};
