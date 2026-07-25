import { useEffect, useState } from "react";
import { staticContentSource } from "@/content/source";
import type { Article, ArticleMeta } from "@/schema/article";

export function useArticleIndex(): ArticleMeta[] {
  return staticContentSource.listArticles();
}

type ArticleState =
  | { status: "loading"; article: null }
  | { status: "ready"; article: Article }
  | { status: "missing"; article: null };

export function useArticle(id: string | undefined): ArticleState {
  const [state, setState] = useState<ArticleState>({ status: "loading", article: null });

  useEffect(() => {
    if (!id) {
      setState({ status: "missing", article: null });
      return;
    }
    let cancelled = false;
    setState({ status: "loading", article: null });
    staticContentSource.getArticle(id).then((article) => {
      if (cancelled) return;
      setState(article ? { status: "ready", article } : { status: "missing", article: null });
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return state;
}
