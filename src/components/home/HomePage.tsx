import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useArticleIndex } from "@/hooks/useArticle";
import { CATEGORIES } from "@/content/categories";
import { ArticleCard } from "./ArticleCard";
import styles from "./HomePage.module.css";
import cardStyles from "./ArticleCard.module.css";

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
      ).sort((a, b) => a.title.localeCompare(b.title)),
    [articles, activeCategory, showDrafts],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const article of articles) {
      if (!showDrafts && article.status === "draft") continue;
      map.set(article.category, (map.get(article.category) ?? 0) + 1);
    }
    map.set("vascular-access", (map.get("vascular-access") ?? 0) + 1);
    return map;
  }, [articles, showDrafts]);

  const totalVisible = articles.filter((a) => showDrafts || a.status !== "draft").length + 1;
  const draftCount = articles.filter((a) => a.status === "draft").length + 1;
  const references = visible.filter(article => article.category === "reference");
  const procedureCards = visible.filter(article => article.category !== "reference").map(article => ({
    id: article.id, title: article.title, content: <ArticleCard key={article.id} article={article} />,
  }));
  if (activeCategory === ALL || activeCategory === "vascular-access") {
    procedureCards.push({ id: "tdc-removal", title: "TDC Removal", content:
      <Link key="tdc-removal" to="/tdc-removal" className={cardStyles.card}>
        <div className={cardStyles.head}><h3 className={cardStyles.title}>TDC Removal</h3><span className={cardStyles.draft}>Draft</span></div>
        <p className={cardStyles.summary}>Tunneled dialysis catheter removal. Tools and stepwise workflow pending.</p>
      </Link>,
    });
  }
  procedureCards.sort((a, b) => a.title.localeCompare(b.title));

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

      {procedureCards.length === 0 && references.length === 0 ? (
        <p className={styles.empty}>Nothing matches these filters.</p>
      ) : (
            <div className={styles.grid}>
              {procedureCards.map(item => item.content)}
            </div>
      )}
      {references.length > 0 && <section className={`${styles.group} ${styles.references}`}>
        <h2 className={styles.groupTitle}>Reference Tools</h2>
        <div className={styles.grid}>{references.map(article => <ArticleCard key={article.id} article={article} />)}</div>
      </section>}
    </div>
  );
}
