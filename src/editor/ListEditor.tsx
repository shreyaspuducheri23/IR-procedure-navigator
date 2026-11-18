import { useLayoutEffect, useRef } from "react";
import type { Block, RichText } from "@/schema/article";
import blockStyles from "@/components/article/BlockRenderer.module.css";
import { InlineEditor } from "./InlineEditor";
import type { InlineEditorHandle } from "./InlineEditor";
import { useStableKeys } from "./keys";
import { concatRichText, isEmptyRichText, richTextToPlain } from "./richTextDom";
import styles from "./Editor.module.css";

type ListBlock = Extract<Block, { type: "list" }>;
type ChecklistBlock = Extract<Block, { type: "checklist" }>;

/**
 * The list as the editor sees it: one flat run of rows, each either a bullet or
 * a sub-bullet. A sub-bullet belongs to the nearest bullet above it, which is
 * how the schema's `subitems` (keyed by parent index) is rebuilt on every edit.
 */
type Row = { text: RichText; level: 0 | 1 };

function toRows(block: ListBlock | ChecklistBlock): Row[] {
  const rows: Row[] = [];
  block.items.forEach((text, index) => {
    rows.push({ text, level: 0 });
    if (block.type === "list") {
      for (const child of block.subitems?.[index] ?? []) rows.push({ text: child, level: 1 });
    }
  });
  return rows;
}

function fromRows<T extends ListBlock | ChecklistBlock>(block: T, rows: Row[]): T {
  const items: RichText[] = [];
  const subitems: Record<string, RichText[]> = {};
  for (const row of rows) {
    if (row.level === 0 || items.length === 0 || block.type !== "list") {
      items.push(row.text);
    } else {
      (subitems[items.length - 1] ??= []).push(row.text);
    }
  }
  const next: Record<string, unknown> = { ...block, items };
  if (Object.keys(subitems).length > 0) next.subitems = subitems;
  else delete next.subitems;
  return next as T;
}

export function ListEditor<T extends ListBlock | ChecklistBlock>({
  block,
  onChange,
}: {
  block: T;
  onChange: (block: T) => void;
}) {
  const rows = toRows(block);
  const keys = useStableKeys(rows.length);
  const handles = useRef(new Map<number, InlineEditorHandle>());
  const pendingFocus = useRef<{ key: number; at: "start" | "end" | number } | null>(null);
  const nestable = block.type === "list";
  const ordered = block.type === "list" && block.ordered === true;

  // Runs after the rows' own layout effects, so a row whose text just changed
  // has already re-rendered its DOM by the time the caret is placed in it.
  useLayoutEffect(() => {
    const pending = pendingFocus.current;
    if (!pending) return;
    pendingFocus.current = null;
    handles.current.get(pending.key)?.focus(pending.at);
  });

  const commit = (next: Row[]) => onChange(fromRows(block, next));
  const focusRow = (index: number, at: "start" | "end" | number) => {
    pendingFocus.current = { key: keys.at(index), at };
  };

  function setText(index: number, text: RichText) {
    commit(rows.map((row, i) => (i === index ? { ...row, text } : row)));
  }

  function removeRow(index: number) {
    if (rows.length === 1) {
      setText(0, "");
      return;
    }
    const neighbour = index > 0 ? index - 1 : 1;
    focusRow(neighbour, "end");
    keys.remove(index);
    commit(rows.filter((_, i) => i !== index));
  }

  function onEnter(index: number, before: RichText, after: RichText) {
    const row = rows[index]!;
    // Enter on a blank sub-bullet steps back out to a bullet, as in any outliner.
    if (isEmptyRichText(before) && isEmptyRichText(after) && row.level === 1) {
      commit(rows.map((r, i) => (i === index ? { ...r, level: 0 } : r)));
      return;
    }
    const fresh = keys.insert(index + 1);
    pendingFocus.current = { key: fresh, at: "start" };
    commit([
      ...rows.slice(0, index),
      { ...row, text: before },
      { text: after, level: row.level },
      ...rows.slice(index + 1),
    ]);
  }

  function onBackspaceAtStart(index: number): boolean {
    const row = rows[index]!;
    if (row.level === 1) {
      commit(rows.map((r, i) => (i === index ? { ...r, level: 0 } : r)));
      return true;
    }
    if (index === 0) return false;
    const previous = rows[index - 1]!;
    focusRow(index - 1, richTextToPlain(previous.text).length);
    keys.remove(index);
    commit([
      ...rows.slice(0, index - 1),
      { ...previous, text: concatRichText(previous.text, row.text) },
      ...rows.slice(index + 1),
    ]);
    return true;
  }

  function onTab(index: number, shift: boolean): boolean {
    if (!nestable) return false;
    const level = shift ? 0 : 1;
    if (!shift && index === 0) return true;
    if (rows[index]!.level !== level) {
      commit(rows.map((r, i) => (i === index ? { ...r, level } : r)));
    }
    return true;
  }

  function onArrow(index: number, direction: -1 | 1): boolean {
    const target = index + direction;
    if (target < 0 || target >= rows.length) return false;
    handles.current.get(keys.at(target))?.focus(direction === -1 ? "end" : "start");
    return true;
  }

  function onMove(index: number, direction: -1 | 1): boolean {
    const target = index + direction;
    if (target < 0 || target >= rows.length) return true;
    const next = [...rows];
    [next[index], next[target]] = [next[target]!, next[index]!];
    keys.move(index, target);
    commit(next);
    return true;
  }

  function onPasteLines(index: number, lines: string[]) {
    const row = rows[index]!;
    const replace = isEmptyRichText(row.text);
    const added: Row[] = lines.map((text) => ({ text, level: row.level }));
    const at = replace ? index : index + 1;
    if (replace) keys.remove(index);
    keys.insert(at, added.length);
    const next = [...rows.slice(0, at), ...added, ...rows.slice(replace ? index + 1 : at)];
    pendingFocus.current = { key: keys.at(at + added.length - 1), at: "end" };
    commit(next);
  }

  function addRow() {
    const fresh = keys.insert(rows.length);
    pendingFocus.current = { key: fresh, at: "start" };
    commit([...rows, { text: "", level: 0 }]);
  }

  return (
    <div className={styles.listBlock}>
      {block.type === "checklist" && (
        <InlineEditor
          plain
          className={blockStyles.heading}
          ariaLabel="List title"
          placeholder="List title (optional)"
          value={block.title ?? ""}
          onChange={(title) => onChange({ ...block, title })}
          onEnter={() => handles.current.get(keys.at(0))?.focus("start")}
        />
      )}

      <ul className={styles.rows} data-ordered={ordered || undefined}>
        {rows.map((row, index) => {
          const key = keys.at(index);
          return (
          <li key={key} className={styles.row} data-level={row.level}>
            <InlineEditor
              ref={(handle) => {
                if (handle) handles.current.set(key, handle);
                else handles.current.delete(key);
              }}
              ariaLabel={row.level === 1 ? "Sub-bullet" : "Bullet"}
              placeholder={row.level === 1 ? "Sub-bullet" : "Type here"}
              value={row.text}
              onChange={(text) => setText(index, text)}
              onEnter={(before, after) => onEnter(index, before, after)}
              onBackspaceAtStart={() => onBackspaceAtStart(index)}
              onTab={(shift) => onTab(index, shift)}
              onArrow={(direction) => onArrow(index, direction)}
              onMove={(direction) => onMove(index, direction)}
              onPasteLines={(lines) => onPasteLines(index, lines)}
            />
            <span className={styles.rowTools}>
              {nestable && index > 0 && (
                <button
                  type="button"
                  title={row.level === 1 ? "Make a bullet (Shift+Tab)" : "Make a sub-bullet (Tab)"}
                  aria-label={row.level === 1 ? "Make a bullet" : "Make a sub-bullet"}
                  onClick={() => {
                    focusRow(index, "end");
                    onTab(index, row.level === 1);
                  }}
                >
                  {row.level === 1 ? "←" : "→"}
                </button>
              )}
              <button
                type="button"
                title="Move up (Alt+↑)"
                aria-label="Move up"
                disabled={index === 0}
                onClick={() => onMove(index, -1)}
              >
                ↑
              </button>
              <button
                type="button"
                title="Move down (Alt+↓)"
                aria-label="Move down"
                disabled={index === rows.length - 1}
                onClick={() => onMove(index, 1)}
              >
                ↓
              </button>
              <button type="button" title="Remove" aria-label="Remove" onClick={() => removeRow(index)}>
                ×
              </button>
            </span>
          </li>
          );
        })}
      </ul>

      <button type="button" className={styles.addRow} onClick={addRow}>
        + Add bullet
      </button>
    </div>
  );
}
