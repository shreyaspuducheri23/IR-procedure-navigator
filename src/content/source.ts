import { articleSchema, type Article, type ArticleMeta } from "@/schema/article";
import { articleIndex } from "virtual:article-index";

/**
 * Everything the app needs from the content layer. Today it is backed by JSON
 * files in content/articles; a future editor build can swap in a source backed
 * by an API without any component changing.
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
