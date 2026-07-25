import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useArticleIndex } from "@/hooks/useArticle";
import { CATEGORIES, getCategory } from "@/content/categories";
import { ArticleCard } from "./ArticleCard";
import styles from "./HomePage.module.css";

const ALL = "all";

export function HomePage() {
  // Filter state lives in the URL so a filtered view is shareable.
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get("category") ?? ALL;
  const showDrafts = params.get("drafts") === "1";

  const articles = useArticleIndex();

  const visible = useMemo(
    () =>
      articles.filter(
        (article) =>
          (showDrafts || article.status !== "draft") &&
          (activeCategory === ALL || article.category === activeCategory),
      ),
    [articles, activeCategory, showDrafts],
  );

  const grouped = useMemo(() => {
    const byCategory = new Map<string, typeof visible>();
    for (const article of visible) {
      const list = byCategory.get(article.category) ?? [];
      list.push(article);
      byCategory.set(article.category, list);
    }
    return CATEGORIES.filter((category) => byCategory.has(category.id)).map((category) => ({
      category,
      articles: byCategory.get(category.id)!,
    }));
  }, [visible]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const article of articles) {
      if (!showDrafts && article.status === "draft") continue;
      map.set(article.category, (map.get(article.category) ?? 0) + 1);
    }
    return map;
  }, [articles, showDrafts]);

  const totalVisible = articles.filter((a) => showDrafts || a.status !== "draft").length;
  const draftCount = articles.filter((a) => a.status === "draft").length;

  function update(next: Record<string, string | null>) {
    const merged = new URLSearchParams(params);
    for (const [key, value] of Object.entries(next)) {
      if (value === null) merged.delete(key);
      else merged.set(key, value);
    }
    setParams(merged, { replace: true });
  }

  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <h1 className={styles.title}>Procedure library</h1>
        <p className={styles.lede}>
          Pre-procedure, intra-procedure, and post-procedure guidance for interventional
          radiology. Open a procedure to expand each phase.
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.filters} role="group" aria-label="Filter by category">
          <button
            type="button"
            className={`${styles.pill} ${activeCategory === ALL ? styles.pillActive : ""}`}
            aria-pressed={activeCategory === ALL}
            onClick={() => update({ category: null })}
          >
            All
            <span className={styles.pillCount}>{totalVisible}</span>
          </button>
          {CATEGORIES.map((category) => {
            const count = counts.get(category.id) ?? 0;
            if (count === 0) return null;
            const active = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                className={`${styles.pill} ${active ? styles.pillActive : ""}`}
                aria-pressed={active}
                onClick={() => update({ category: active ? null : category.id })}
              >
                {category.label}
                <span className={styles.pillCount}>{count}</span>
              </button>
            );
          })}
        </div>

        <label className={styles.draftToggle}>
          <input
            type="checkbox"
            checked={showDrafts}
            onChange={(event) => update({ drafts: event.target.checked ? "1" : null })}
          />
          <span>Show drafts ({draftCount})</span>
        </label>
      </div>

      {grouped.length === 0 ? (
        <p className={styles.empty}>Nothing matches these filters.</p>
      ) : (
        grouped.map(({ category, articles: list }) => (
          <section key={category.id} className={styles.group}>
            <div className={styles.groupHeader} data-accent={category.accent}>
              <h2 className={styles.groupTitle}>{getCategory(category.id).label}</h2>
              <p className={styles.groupBlurb}>{category.blurb}</p>
            </div>
            <div className={styles.grid}>
              {list.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
