import { useRef } from "react";
import type { Section } from "@/schema/article";
import { useScrollIntoViewWhen } from "@/hooks/useScrollIntoViewWhen";
import { Blocks } from "./BlockRenderer";
import { Subsection } from "./Subsection";
import styles from "./PhaseSection.module.css";

const PHASE_LABELS: Partial<Record<Section["kind"], string>> = {
  pre: "Phase 1",
  intra: "Phase 2",
  post: "Phase 3",
};

export function PhaseSection({
  section,
  articleId,
  open,
  onToggle,
  openSubsections,
  onToggleSubsection,
  highlighted,
  highlightedSubsectionKey,
}: {
  section: Section;
  articleId: string;
  open: boolean;
  onToggle: () => void;
  openSubsections: Set<string>;
  onToggleSubsection: (id: string) => void;
  highlighted: boolean;
  highlightedSubsectionKey: string | null;
}) {
  const ref = useRef<HTMLElement>(null);

  // Deep links (#pre) scroll their section into view once it has expanded —
  // unless a specific topic was targeted, which scrolls itself instead.
  useScrollIntoViewWhen(ref, highlighted && !highlightedSubsectionKey);

  const count = section.subsections?.length ?? 0;

  return (
    <section
      ref={ref}
      id={section.id}
      className={styles.section}
      data-kind={section.kind}
      data-highlighted={highlighted || undefined}
    >
      <h2 className={styles.barHeading}>
        <button
          type="button"
          className={styles.bar}
          aria-expanded={open}
          aria-controls={`${section.id}-panel`}
          onClick={onToggle}
        >
          <Chevron open={open} />
          <span className={styles.barTitle}>{section.title}</span>
          {PHASE_LABELS[section.kind] && (
            <span className={styles.phaseLabel}>{PHASE_LABELS[section.kind]}</span>
          )}
          {count > 0 && (
            <span className={styles.count}>
              {count} {count === 1 ? "topic" : "topics"}
            </span>
          )}
        </button>
      </h2>

      {open && (
        <div className={styles.panel} id={`${section.id}-panel`}>
          {section.blocks && section.blocks.length > 0 && (
            <div className={styles.intro}>
              <Blocks blocks={section.blocks} articleId={articleId} />
            </div>
          )}
          {section.subsections && section.subsections.length > 0 && (
            <div className={styles.subsections}>
              {section.subsections.map((subsection) => {
                const key = `${section.id}/${subsection.id}`;
                return (
                  <Subsection
                    key={subsection.id}
                    subsection={subsection}
                    articleId={articleId}
                    open={openSubsections.has(key)}
                    onToggle={() => onToggleSubsection(key)}
                    highlighted={highlightedSubsectionKey === key}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={styles.chevron}
      data-open={open || undefined}
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="m9 5 7 7-7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
