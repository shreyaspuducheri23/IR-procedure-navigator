declare module "virtual:article-index" {
  import type { ArticleMeta } from "@/schema/article";
  /** Built by `articleIndexPlugin` in vite.config.ts, sorted by title. */
  export const articleIndex: ArticleMeta[];
}

declare module "virtual:article-search-index" {
  import type { ArticlePassage } from "@/schema/article";
  /** Full body text per section/subsection. Loaded lazily — see src/search. */
  export const articlePassages: ArticlePassage[];
}
