import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Article } from "@/schema/article";
import { AnticoagulationMatrix } from "./AnticoagulationMatrix";
import styles from "./ArticlePage.module.css";
import "./AnticoagulationPage.css";

export function AnticoagulationPage({ article, children }: { article: Article; children: ReactNode }) {
  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link to="/">All procedures</Link>
        <span aria-hidden="true">/</span>
        <Link to="/?category=reference">Reference</Link>
      </nav>
      <header className={styles.header}>
        <div className={styles.titleRow}><h1 className={styles.title}>{article.title}</h1></div>
        <p className={styles.summary}>{article.summary}</p>
        <p className={styles.reviewed}>{article.provenance[0]}</p>
      </header>
      <div className="anticoagulation-page">
        <p className="anticoag-instructions">Find the procedure on the vertical axis and the medication on the horizontal axis, then select a cell for the complete SIR baseline recommendation.</p>
        <AnticoagulationMatrix />
      </div>
      <section className="anticoag-supplementary" aria-label="Supplementary guidance">
        <h2>Supplementary guidance</h2>
        {children}
      </section>
    </div>
  );
}
