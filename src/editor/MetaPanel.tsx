import type { Article } from "@/schema/article";
import { CATEGORIES } from "@/content/categories";
import styles from "./Editor.module.css";

const today = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local time

const toLines = (values: string[]) => values.join("\n");
const fromLines = (text: string) => text.split("\n").map((line) => line.trim()).filter(Boolean);

/**
 * Everything about an article that is not its body: where it is filed, how it
 * is flagged, and its housekeeping notes. Collapsed by default because most
 * edits never touch it.
 */
export function MetaPanel({ article, onChange }: { article: Article; onChange: (article: Article) => void }) {
  return (
    <details className={styles.meta}>
      <summary>
        Details
        <span className={styles.metaSummary}>
          {CATEGORIES.find((category) => category.id === article.category)?.label ?? article.category}
          {" · "}
          {article.status === "draft" ? "Draft" : "Complete"}
          {article.bleedRisk ? ` · ${article.bleedRisk === "high" ? "High" : "Low"} bleed risk` : ""}
        </span>
      </summary>

      <div className={styles.metaGrid}>
        <label className={styles.field}>
          <span>Category</span>
          <select value={article.category} onChange={(event) => onChange({ ...article, category: event.target.value })}>
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>Bleed risk</span>
          <select
            value={article.bleedRisk ?? ""}
            onChange={(event) =>
              onChange({ ...article, bleedRisk: (event.target.value || null) as Article["bleedRisk"] })
            }
          >
            <option value="">Not shown</option>
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
        </label>

        <label className={styles.field}>
          <span>Status</span>
          <select
            value={article.status}
            onChange={(event) => onChange({ ...article, status: event.target.value as Article["status"] })}
          >
            <option value="draft">Draft — hidden unless “Show drafts” is on</option>
            <option value="complete">Complete</option>
          </select>
        </label>

        <div className={styles.field}>
          <label htmlFor="meta-reviewed">Last reviewed</label>
          <span className={styles.fieldRow}>
            <input
              id="meta-reviewed"
              type="date"
              value={article.lastReviewed ?? ""}
              onChange={(event) => onChange({ ...article, lastReviewed: event.target.value || null })}
            />
            <button type="button" className={styles.quiet} onClick={() => onChange({ ...article, lastReviewed: today() })}>
              Today
            </button>
          </span>
        </div>

        <label className={`${styles.field} ${styles.wide}`}>
          <span>Extra search words, separated by commas</span>
          <input
            type="text"
            defaultValue={article.keywords.join(", ")}
            key={article.keywords.join("|")}
            onBlur={(event) => {
              const keywords = event.target.value.split(",").map((word) => word.trim()).filter(Boolean);
              if (keywords.join("|") !== article.keywords.join("|")) onChange({ ...article, keywords });
            }}
          />
        </label>

        <label className={`${styles.field} ${styles.wide}`}>
          <span>Source — shown at the bottom of the page, one per line</span>
          <textarea
            rows={2}
            defaultValue={toLines(article.provenance)}
            key={article.provenance.join("|")}
            onBlur={(event) => {
              const provenance = fromLines(event.target.value);
              if (provenance.join("|") !== article.provenance.join("|")) onChange({ ...article, provenance });
            }}
          />
        </label>

        <label className={`${styles.field} ${styles.wide}`}>
          <span>Review notes — things still to check, one per line (not shown to readers)</span>
          <textarea
            rows={3}
            defaultValue={toLines(article.reviewNotes)}
            key={article.reviewNotes.join("|")}
            onBlur={(event) => {
              const reviewNotes = fromLines(event.target.value);
              if (reviewNotes.join("|") !== article.reviewNotes.join("|")) onChange({ ...article, reviewNotes });
            }}
          />
        </label>
      </div>
    </details>
  );
}
