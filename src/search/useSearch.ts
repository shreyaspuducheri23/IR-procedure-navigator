import { useEffect, useMemo, useState } from "react";
import type { ArticleMeta, ArticlePassage } from "@/schema/article";

export type SearchHit = {
  article: ArticleMeta;
  score: number;
  /** The best-matching passage, when the match came from the article body. */
  passage: ArticlePassage | null;
  /** A short excerpt around the match, with the matched runs marked. */
  excerpt: ExcerptPart[] | null;
};

export type ExcerptPart = { text: string; match: boolean };

/**
 * Field weights. Titles dominate so typing a procedure name puts it first;
 * body text scores lowest but still surfaces articles that only mention a term
 * deep inside a topic ("albumin", "mallampati", "bedrest").
 */
const WEIGHTS = {
  titlePrefix: 12,
  titleWord: 10,
  titleSubstring: 7,
  keyword: 5,
  category: 3,
  passageTitle: 3,
  summary: 2,
  passageText: 1,
};

const EXCERPT_RADIUS = 70;

function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function scoreMetadata(article: ArticleMeta, token: string): number {
  const title = article.title.toLowerCase();
  let score = 0;

  if (title.startsWith(token)) score += WEIGHTS.titlePrefix;
  else if (title.split(/[^a-z0-9]+/).some((word) => word.startsWith(token))) {
    score += WEIGHTS.titleWord;
  } else if (title.includes(token)) score += WEIGHTS.titleSubstring;

  if (article.keywords.some((keyword) => keyword.toLowerCase().includes(token))) {
    score += WEIGHTS.keyword;
  }
  if (article.category.includes(token)) score += WEIGHTS.category;
  if (article.summary.toLowerCase().includes(token)) score += WEIGHTS.summary;

  return score;
}

function scorePassage(passage: ArticlePassage, token: string): number {
  let score = 0;
  const headings = `${passage.sectionTitle} ${passage.subsectionTitle ?? ""}`.toLowerCase();
  if (headings.includes(token)) score += WEIGHTS.passageTitle;
  if (passage.text.toLowerCase().includes(token)) score += WEIGHTS.passageText;
  return score;
}

/**
 * Builds a short excerpt centred on the first token match, with the matched
 * runs flagged so the UI can highlight them.
 */
function buildExcerpt(text: string, tokens: string[]): ExcerptPart[] | null {
  const lower = text.toLowerCase();
  let first = -1;
  for (const token of tokens) {
    const index = lower.indexOf(token);
    if (index !== -1 && (first === -1 || index < first)) first = index;
  }
  if (first === -1) return null;

  let start = Math.max(0, first - EXCERPT_RADIUS);
  let end = Math.min(text.length, first + EXCERPT_RADIUS * 2);
  // Avoid cutting words in half.
  if (start > 0) {
    const space = text.indexOf(" ", start);
    if (space !== -1 && space < first) start = space + 1;
  }
  if (end < text.length) {
    const space = text.lastIndexOf(" ", end);
    if (space > first) end = space;
  }

  const slice = text.slice(start, end);
  const parts: ExcerptPart[] = [];
  if (start > 0) parts.push({ text: "…", match: false });

  // Walk the slice, splitting on every token occurrence.
  const sliceLower = slice.toLowerCase();
  let cursor = 0;
  while (cursor < slice.length) {
    let nextIndex = -1;
    let nextToken = "";
    for (const token of tokens) {
      const index = sliceLower.indexOf(token, cursor);
      if (index !== -1 && (nextIndex === -1 || index < nextIndex)) {
        nextIndex = index;
        nextToken = token;
      }
    }
    if (nextIndex === -1) {
      parts.push({ text: slice.slice(cursor), match: false });
      break;
    }
    if (nextIndex > cursor) parts.push({ text: slice.slice(cursor, nextIndex), match: false });
    parts.push({ text: slice.slice(nextIndex, nextIndex + nextToken.length), match: true });
    cursor = nextIndex + nextToken.length;
  }

  if (end < text.length) parts.push({ text: "…", match: false });
  return parts;
}

/**
 * Scores every article against the query. Every token must match somewhere in
 * the article — metadata or body — so "port removal" cannot surface an article
 * that only matches "port".
 */
export function searchArticles(
  articles: ArticleMeta[],
  passages: ArticlePassage[] | null,
  query: string,
  limit = 12,
): SearchHit[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const passagesByArticle = new Map<string, ArticlePassage[]>();
  for (const passage of passages ?? []) {
    const list = passagesByArticle.get(passage.articleId);
    if (list) list.push(passage);
    else passagesByArticle.set(passage.articleId, [passage]);
  }

  const hits: SearchHit[] = [];
  for (const article of articles) {
    const articlePassages = passagesByArticle.get(article.id) ?? [];

    let total = 0;
    let matchedEvery = true;
    // Track which passage accounts for the most of the match, to show as context.
    const passageScores = new Map<ArticlePassage, number>();

    for (const token of tokens) {
      let best = scoreMetadata(article, token);
      for (const passage of articlePassages) {
        const score = scorePassage(passage, token);
        if (score === 0) continue;
        passageScores.set(passage, (passageScores.get(passage) ?? 0) + score);
        if (score > best) best = score;
      }
      if (best === 0) {
        matchedEvery = false;
        break;
      }
      total += best;
    }
    if (!matchedEvery) continue;

    let bestPassage: ArticlePassage | null = null;
    let bestPassageScore = 0;
    for (const [passage, score] of passageScores) {
      if (score > bestPassageScore) {
        bestPassage = passage;
        bestPassageScore = score;
      }
    }

    // Nudge finished content above drafts when scores tie.
    if (article.status === "complete") total += 0.5;

    hits.push({
      article,
      score: total,
      passage: bestPassage,
      excerpt: bestPassage ? buildExcerpt(bestPassage.text, tokens) : null,
    });
  }

  hits.sort((a, b) => b.score - a.score || a.article.title.localeCompare(b.article.title));
  return hits.slice(0, limit);
}

/**
 * Loads the full-text index on demand. Search works on metadata alone until it
 * arrives, so the first keystroke is never blocked.
 */
export function useSearchPassages(enabled: boolean): ArticlePassage[] | null {
  const [passages, setPassages] = useState<ArticlePassage[] | null>(null);

  useEffect(() => {
    if (!enabled || passages) return;
    let cancelled = false;
    import("virtual:article-search-index").then((module) => {
      if (!cancelled) setPassages(module.articlePassages);
    });
    return () => {
      cancelled = true;
    };
  }, [enabled, passages]);

  return passages;
}

export function useSearch(
  articles: ArticleMeta[],
  passages: ArticlePassage[] | null,
  query: string,
  limit?: number,
): SearchHit[] {
  return useMemo(
    () => searchArticles(articles, passages, query, limit),
    [articles, passages, query, limit],
  );
}
