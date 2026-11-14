import { useLayoutEffect, useRef, useState } from "react";
import type { Section, Subsection } from "@/schema/article";
import phaseStyles from "@/components/article/PhaseSection.module.css";
import subStyles from "@/components/article/Subsection.module.css";
import { BlockList } from "./BlockList";
import { InlineEditor } from "./InlineEditor";
import { moveItem } from "./keys";
import { Menu, MenuDivider, MenuItem } from "./Menu";
import { canonicalSection, canonicalSubsection, newSubsection } from "./model";
import styles from "./Editor.module.css";

const PHASE_LABELS: Partial<Record<Section["kind"], string>> = {
  pre: "Phase 1",
  intra: "Phase 2",
  post: "Phase 3",
};

/** One phase bar and everything under it: intro content, then its topics. */
export function SectionEditor({
  section,
  onChange,
  onDelete,
  onMove,
  canMoveUp,
  canMoveDown,
}: {
  section: Section;
  onChange: (section: Section) => void;
  onDelete: () => void;
  onMove: (direction: -1 | 1) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  const subsections = section.subsections ?? [];
  const rootRef = useRef<HTMLElement>(null);
  const pendingFocus = useRef<string | null>(null);

  useLayoutEffect(() => {
    const id = pendingFocus.current;
    if (!id) return;
    pendingFocus.current = null;
    const title = rootRef.current?.querySelector<HTMLElement>(`[data-topic="${id}"] [contenteditable="true"]`);
    title?.focus({ preventScroll: true });
    title?.scrollIntoView({ block: "center" });
  });

  const update = (next: Section) => onChange(canonicalSection(next));
  const setSubsections = (next: Subsection[]) => update({ ...section, subsections: next });

  function addTopic() {
    const topic = newSubsection();
    pendingFocus.current = topic.id;
    setSubsections([...subsections, topic]);
  }

  return (
    <section ref={rootRef} className={`${phaseStyles.section} ${styles.sectionEdit}`} data-kind={section.kind}>
      <div className={`${phaseStyles.bar} ${styles.barEdit}`}>
        <span className={`${phaseStyles.barTitle} ${styles.grow}`}>
          <InlineEditor
            plain
            ariaLabel="Section title"
            placeholder="Section title"
            value={section.title}
            onChange={(title) => update({ ...section, title })}
          />
        </span>
        {PHASE_LABELS[section.kind] && (
          <span className={phaseStyles.phaseLabel}>{PHASE_LABELS[section.kind]}</span>
        )}
        <Menu label="Options for this section" button="⋮">
          {(close) => (
            <>
              <MenuItem onClick={() => onMove(-1)} disabled={!canMoveUp}>
                Move up
              </MenuItem>
              <MenuItem onClick={() => onMove(1)} disabled={!canMoveDown}>
                Move down
              </MenuItem>
              <MenuDivider />
              <MenuItem
                danger
                onClick={() => {
                  close();
                  onDelete();
                }}
              >
                Delete section
              </MenuItem>
            </>
          )}
        </Menu>
      </div>

      <div className={phaseStyles.panel}>
        <BlockList
          blocks={section.blocks ?? []}
          onChange={(blocks) => update({ ...section, blocks })}
          addLabel={subsections.length > 0 ? "+ Add content above the topics" : "+ Add"}
        />

        {subsections.length > 0 && (
          <div className={phaseStyles.subsections}>
            {subsections.map((subsection, index) => (
              <SubsectionEditor
                key={subsection.id}
                subsection={subsection}
                onChange={(next) =>
                  setSubsections(subsections.map((sub, i) => (i === index ? canonicalSubsection(next) : sub)))
                }
                onDelete={() => setSubsections(subsections.filter((_, i) => i !== index))}
                onMove={(direction) => setSubsections(moveItem(subsections, index, index + direction))}
                canMoveUp={index > 0}
                canMoveDown={index < subsections.length - 1}
              />
            ))}
          </div>
        )}

        <button type="button" className={styles.addTopic} onClick={addTopic}>
          + Add topic
        </button>
      </div>
    </section>
  );
}

/** A collapsible topic bar. Collapsing here is only to make a long page easier to work in. */
function SubsectionEditor({
  subsection,
  onChange,
  onDelete,
  onMove,
  canMoveUp,
  canMoveDown,
}: {
  subsection: Subsection;
  onChange: (subsection: Subsection) => void;
  onDelete: () => void;
  onMove: (direction: -1 | 1) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className={`${subStyles.subsection} ${styles.topicEdit}`} data-open={open || undefined} data-topic={subsection.id}>
      <div className={`${subStyles.bar} ${styles.barEdit}`}>
        <button
          type="button"
          className={styles.collapse}
          aria-expanded={open}
          aria-label={open ? "Collapse this topic" : "Expand this topic"}
          title={open ? "Collapse" : "Expand"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className={subStyles.marker} data-open={open || undefined} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
        <span className={`${subStyles.title} ${styles.grow}`}>
          <InlineEditor
            plain
            ariaLabel="Topic title"
            placeholder="Topic title"
            value={subsection.title}
            onChange={(title) => onChange({ ...subsection, title })}
          />
        </span>
        {subsection.defaultOpen && <span className={styles.badge}>Opens by default</span>}
        <Menu label="Options for this topic" button="⋮">
          {(close) => (
            <>
              <MenuItem onClick={() => onMove(-1)} disabled={!canMoveUp}>
                Move up
              </MenuItem>
              <MenuItem onClick={() => onMove(1)} disabled={!canMoveDown}>
                Move down
              </MenuItem>
              <MenuDivider />
              <MenuItem
                checked={subsection.defaultOpen === true}
                onClick={() => onChange({ ...subsection, defaultOpen: subsection.defaultOpen ? undefined : true })}
              >
                Open by default
              </MenuItem>
              <MenuDivider />
              <MenuItem
                danger
                onClick={() => {
                  close();
                  onDelete();
                }}
              >
                Delete topic
              </MenuItem>
            </>
          )}
        </Menu>
      </div>

      {open && (
        <div className={subStyles.panel}>
          <BlockList blocks={subsection.blocks} onChange={(blocks) => onChange({ ...subsection, blocks })} />
        </div>
      )}
    </div>
  );
}
