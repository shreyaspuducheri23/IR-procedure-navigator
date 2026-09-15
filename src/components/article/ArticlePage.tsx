import { AnticoagulationPage } from "./AnticoagulationPage";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useArticle } from "@/hooks/useArticle";
import { getCategory } from "@/content/categories";
import type { Article, Section } from "@/schema/article";
import { BleedRiskChip } from "./BleedRiskChip";
import { Callout } from "./BlockRenderer";
import { PhaseSection } from "./PhaseSection";
import { NotFound } from "@/components/NotFound";
import { FeedbackButton } from "@/components/feedback/FeedbackButton";
import styles from "./ArticlePage.module.css";

/** Canonical phase order, regardless of how the JSON happens to be ordered. */
const KIND_ORDER: Record<Section["kind"], number> = {
  overview: 0,
  pre: 1,
  intra: 2,
  post: 3,
  custom: 4,
  references: 5,
};

export function ArticlePage() {
  const { id } = useParams();
  const { status, article } = useArticle(id);

  if (status === "loading") return <ArticleSkeleton />;
  if (status === "missing" || !article) return <NotFound />;
  if (article.id === "anticoagulation-table") {
    const supplementary = {
      ...article,
      sections: article.sections.filter((section) => section.id !== "matrix"),
    };
    return (
      <AnticoagulationPage article={article}>
        <ArticleView article={supplementary} supplementary />
      </AnticoagulationPage>
    );
  }
  return <ArticleView article={article} />;
}

function ArticleView({
  article,
  supplementary = false,
}: {
  article: Article;
  supplementary?: boolean;
}) {
  const category = getCategory(article.category);
  const location = useLocation();
  // Hash routing puts the deep-link fragment after the route: #/article/x#pre,
  // or #/article/x#pre/labs to open a specific topic.
  const target = location.hash.replace(/^#/, "");
  const [targetSectionId = null, targetSubsectionId = null] = target
    ? target.split("/")
    : [];
  const targetSubsectionKey =
    targetSectionId && targetSubsectionId
      ? `${targetSectionId}/${targetSubsectionId}`
      : null;

  const sections = useMemo(
    () =>
      [...article.sections].sort(
        (a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind],
      ),
    [article.sections],
  );

  // Phases open by default — the article reads as an outline of collapsed
  // topic bars, which is what makes it scannable at the bedside.
  const [openSections, setOpenSections] = useState<Set<string>>(
    () => new Set(sections.map((section) => section.id)),
  );
  const [openSubsections, setOpenSubsections] = useState<Set<string>>(
    () =>
      new Set(
        sections.flatMap((section) =>
          (section.subsections ?? [])
            .filter((subsection) => subsection.defaultOpen)
            .map((subsection) => `${section.id}/${subsection.id}`),
        ),
      ),
  );

  useEffect(() => {
    if (targetSectionId) {
      setOpenSections((previous) => new Set(previous).add(targetSectionId));
    }
    if (targetSubsectionKey) {
      setOpenSubsections((previous) =>
        new Set(previous).add(targetSubsectionKey),
      );
    }
  }, [targetSectionId, targetSubsectionKey]);

  const toggle = useCallback((setter: typeof setOpenSections, key: string) => {
    setter((previous) => {
      const next = new Set(previous);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const allSubsectionKeys = useMemo(
    () =>
      sections.flatMap((section) =>
        (section.subsections ?? []).map(
          (subsection) => `${section.id}/${subsection.id}`,
        ),
      ),
    [sections],
  );
  const allExpanded =
    allSubsectionKeys.length > 0 &&
    allSubsectionKeys.every((key) => openSubsections.has(key));

  function toggleAll() {
    if (allExpanded) {
      setOpenSubsections(new Set());
    } else {
      setOpenSections(new Set(sections.map((section) => section.id)));
      setOpenSubsections(new Set(allSubsectionKeys));
    }
  }

  return (
    <article className={styles.page}>
      {!supplementary && (
        <>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/">All procedures</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/?category=${category.id}`}>{category.label}</Link>
          </nav>

          <header className={styles.header}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{article.title}</h1>
              <div className={styles.chips}>
                {article.bleedRisk && (
                  <BleedRiskChip risk={article.bleedRisk} />
                )}
                {article.status === "draft" && (
                  <span className={styles.draftChip}>Draft</span>
                )}
              </div>
            </div>
            {article.summary && (
              <p className={styles.summary}>{article.summary}</p>
            )}
            {article.lastReviewed && (
              <p className={styles.reviewed}>
                Last reviewed {article.lastReviewed}
              </p>
            )}
          </header>
        </>
      )}

      {article.status === "draft" && (
        <Callout variant="note" title="Draft content">
          <p>
            This article has not been through clinical review. Treat it as an
            outline and confirm every order against local policy.
          </p>
        </Callout>
      )}

      {allSubsectionKeys.length > 0 && (
        <div className={styles.toolbar}>
          <button
            type="button"
            className={styles.toolButton}
            onClick={toggleAll}
          >
            {allExpanded ? "Collapse all topics" : "Expand all topics"}
          </button>
        </div>
      )}

      <div className={styles.sections}>
        {sections.map((section) => (
          <PhaseSection
            key={section.id}
            section={section}
            articleId={article.id}
            open={openSections.has(section.id)}
            onToggle={() => toggle(setOpenSections, section.id)}
            openSubsections={openSubsections}
            onToggleSubsection={(key) => toggle(setOpenSubsections, key)}
            highlighted={targetSectionId === section.id}
            highlightedSubsectionKey={targetSubsectionKey}
          />
        ))}
      </div>

      {article.reviewNotes.length > 0 && (
        <Callout variant="note" title="Still to confirm">
          <ul className={styles.noteList}>
            {article.reviewNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </Callout>
      )}

      {article.provenance.length > 0 && (
        <footer className={styles.provenance}>
          <h2 className={styles.provenanceTitle}>Source</h2>
          <ul>
            {article.provenance.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </footer>
      )}

      <div className={styles.feedbackRow}>
        <p>Something here wrong, unclear, or out of date?</p>
        <FeedbackButton
          article={{
            id: article.id,
            title: article.title,
            status: article.status,
          }}
        />
      </div>
    </article>
  );
}

function ArticleSkeleton() {
  return (
    <div
      className={styles.skeleton}
      aria-busy="true"
      aria-label="Loading article"
    >
      <div
        className={styles.skelLine}
        style={{ width: "40%", height: "2rem" }}
      />
      <div className={styles.skelLine} style={{ width: "80%" }} />
      <div className={styles.skelBar} />
      <div className={styles.skelBar} />
      <div className={styles.skelBar} />
    </div>
  );
}
