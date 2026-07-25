import { Link } from "react-router-dom";
import type { ArticleMeta } from "@/schema/article";
import { BleedRiskChip } from "@/components/article/BleedRiskChip";
import styles from "./ArticleCard.module.css";

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link to={`/article/${article.id}`} className={styles.card}>
      <div className={styles.head}>
        <h3 className={styles.title}>{article.title}</h3>
        {article.status === "draft" && <span className={styles.draft}>Draft</span>}
      </div>
      {article.summary && <p className={styles.summary}>{article.summary}</p>}
      {article.bleedRisk && (
        <div className={styles.foot}>
          <BleedRiskChip risk={article.bleedRisk} />
        </div>
      )}
    </Link>
  );
}
