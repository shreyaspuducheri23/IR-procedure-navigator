import { useId, useRef } from "react";
import type { Subsection as SubsectionData } from "@/schema/article";
import { useScrollIntoViewWhen } from "@/hooks/useScrollIntoViewWhen";
import { Blocks } from "./BlockRenderer";
import styles from "./Subsection.module.css";

export function Subsection({
  subsection,
  articleId,
  open,
  onToggle,
  highlighted = false,
}: {
  subsection: SubsectionData;
  articleId: string;
  open: boolean;
  onToggle: () => void;
  /** True when a deep link (search result, cross-reference) targeted this topic. */
  highlighted?: boolean;
}) {
  const panelId = useId();
  const ref = useRef<HTMLDivElement>(null);

  useScrollIntoViewWhen(ref, highlighted, "center");

  return (
    <div
      ref={ref}
      className={styles.subsection}
      data-open={open || undefined}
      data-highlighted={highlighted || undefined}
    >
      <h3 className={styles.barHeading}>
        <button
          type="button"
          className={styles.bar}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className={styles.marker} data-open={open || undefined} aria-hidden="true">
            <span />
            <span />
          </span>
          <span className={styles.title}>{subsection.title}</span>
        </button>
      </h3>

      {open && (
        <div className={styles.panel} id={panelId}>
          <Blocks blocks={subsection.blocks} articleId={articleId} />
        </div>
      )}
    </div>
  );
}
