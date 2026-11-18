import { useLayoutEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { CALLOUT_VARIANTS } from "@/schema/article";
import type { Block, CalloutBlock, RichText } from "@/schema/article";
import blockStyles from "@/components/article/BlockRenderer.module.css";
import { useEditorContext } from "./context";
import { IMAGE_ACCEPT } from "./images";
import { InlineEditor } from "./InlineEditor";
import { moveItem, useStableKeys } from "./keys";
import { ListEditor } from "./ListEditor";
import { Menu, MenuDivider, MenuItem } from "./Menu";
import { CALLOUT_NAMES, canonicalBlock, NEW_BLOCK_CHOICES, newBlock } from "./model";
import type { NewBlockKind } from "./model";
import styles from "./Editor.module.css";

const BLOCK_NAMES: Record<Block["type"], string> = {
  paragraph: "text",
  heading: "heading",
  list: "list",
  checklist: "titled list",
  callout: "box",
  image: "image",
  table: "table",
  calculator: "calculator",
};

function AddChoices({ onPick }: { onPick: (kind: NewBlockKind) => void }) {
  return (
    <>
      {NEW_BLOCK_CHOICES.map((choice) => (
        <MenuItem key={choice.kind} onClick={() => onPick(choice.kind)} hint={choice.hint}>
          {choice.label}
        </MenuItem>
      ))}
    </>
  );
}

/**
 * An editable run of blocks: the body of a topic, a section's intro, or the
 * inside of a callout box. Every block gets a "⋮" menu for moving, adding
 * below, type-specific options and deleting.
 */
export function BlockList({
  blocks,
  onChange,
  addLabel = "+ Add",
}: {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
  addLabel?: string;
}) {
  const context = useEditorContext();
  const keys = useStableKeys(blocks.length);
  const rootRef = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const imageIndex = useRef(0);
  const pendingFocus = useRef<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // The image flow is asynchronous; it must insert into the list as it is when
  // the file is ready, not as it was when the picker opened.
  const latest = useRef({ blocks, onChange });
  latest.current = { blocks, onChange };

  useLayoutEffect(() => {
    const key = pendingFocus.current;
    if (key === null) return;
    pendingFocus.current = null;
    const block = rootRef.current?.querySelector<HTMLElement>(`:scope > [data-block-key="${key}"]`);
    // A new box should put the caret in its body, not its optional title.
    const scope = block?.querySelector<HTMLElement>("[data-focus-first]") ?? block;
    const target = scope?.querySelector<HTMLElement>('[contenteditable="true"]');
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ block: "nearest" });
  });

  function insert(index: number, ...added: Block[]) {
    const current = latest.current;
    const at = Math.min(index, current.blocks.length);
    pendingFocus.current = keys.insert(at, added.length);
    current.onChange([...current.blocks.slice(0, at), ...added, ...current.blocks.slice(at)]);
  }

  function pick(index: number, kind: NewBlockKind) {
    setError(null);
    if (kind === "image") {
      imageIndex.current = index;
      fileInput.current?.click();
      return;
    }
    insert(index, newBlock(kind));
  }

  async function onFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const result = await context.addImage(file);
    if ("error" in result) setError(result.error);
    else insert(imageIndex.current, { type: "image", src: result.src, alt: "" });
  }

  function replace(index: number, ...next: Block[]) {
    if (next.length !== 1) {
      keys.remove(index);
      keys.insert(index, next.length);
    }
    onChange([...blocks.slice(0, index), ...next.map(canonicalBlock), ...blocks.slice(index + 1)]);
  }

  function remove(index: number) {
    keys.remove(index);
    onChange(blocks.filter((_, i) => i !== index));
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    keys.move(index, target);
    onChange(moveItem(blocks, index, target));
  }

  return (
    <div className={styles.blocks} ref={rootRef}>
      {blocks.map((block, index) => {
        const key = keys.at(index);
        return (
          <div key={key} className={styles.block} data-block-key={key} data-type={block.type}>
            <div className={styles.blockBody}>
              <BlockBody block={block} onChange={(next) => replace(index, next)} />
            </div>
            <Menu label={`Options for this ${BLOCK_NAMES[block.type]}`} button="⋮">
              {(close) => (
                <BlockMenu
                  block={block}
                  first={index === 0}
                  last={index === blocks.length - 1}
                  onMove={(direction) => move(index, direction)}
                  onReplace={(...next) => replace(index, ...next)}
                  onAddBelow={(kind) => {
                    close();
                    pick(index + 1, kind);
                  }}
                  onDelete={() => {
                    close();
                    remove(index);
                  }}
                />
              )}
            </Menu>
          </div>
        );
      })}

      <div className={styles.addLine}>
        <Menu label="Add content" button={addLabel} buttonClassName={styles.addButton} align="start">
          {(close) => (
            <AddChoices
              onPick={(kind) => {
                close();
                pick(blocks.length, kind);
              }}
            />
          )}
        </Menu>
        {error && (
          <span className={styles.inlineError} role="alert">
            {error}
          </span>
        )}
      </div>

      <input ref={fileInput} type="file" accept={IMAGE_ACCEPT} hidden onChange={onFile} />
    </div>
  );
}

function BlockMenu({
  block,
  first,
  last,
  onMove,
  onReplace,
  onAddBelow,
  onDelete,
}: {
  block: Block;
  first: boolean;
  last: boolean;
  onMove: (direction: -1 | 1) => void;
  onReplace: (...blocks: Block[]) => void;
  onAddBelow: (kind: NewBlockKind) => void;
  onDelete: () => void;
}) {
  const [adding, setAdding] = useState(false);

  if (adding) return <AddChoices onPick={onAddBelow} />;

  return (
    <>
      <MenuItem onClick={() => onMove(-1)} disabled={first}>
        Move up
      </MenuItem>
      <MenuItem onClick={() => onMove(1)} disabled={last}>
        Move down
      </MenuItem>
      <MenuItem onClick={() => setAdding(true)}>Add below…</MenuItem>

      {block.type === "list" && (
        <>
          <MenuDivider />
          <MenuItem
            checked={block.ordered === true}
            onClick={() => onReplace({ ...block, ordered: block.ordered ? undefined : true })}
          >
            Numbered
          </MenuItem>
          <MenuItem
            onClick={() =>
              onReplace({
                type: "checklist",
                title: "",
                items: block.items.flatMap((item, index) => [item, ...(block.subitems?.[index] ?? [])]),
              })
            }
          >
            Give this list a title
          </MenuItem>
        </>
      )}

      {block.type === "checklist" && (
        <>
          <MenuDivider />
          <MenuItem
            onClick={() => {
              const list: Block = { type: "list", items: block.items };
              const title = block.title?.trim();
              if (title) onReplace({ type: "heading", text: title }, list);
              else onReplace(list);
            }}
          >
            Turn into a plain bullet list
          </MenuItem>
        </>
      )}

      {block.type === "callout" && (
        <>
          <MenuDivider />
          {CALLOUT_VARIANTS.map((variant) => (
            <MenuItem
              key={variant}
              checked={block.variant === variant}
              onClick={() => onReplace({ ...block, variant })}
            >
              {CALLOUT_NAMES[variant]}
            </MenuItem>
          ))}
        </>
      )}

      {(block.type === "callout" || block.type === "table") && (
        <>
          <MenuDivider />
          <MenuItem
            checked={block.collapsible === true}
            onClick={() => onReplace({ ...block, collapsible: block.collapsible ? undefined : true })}
          >
            Collapsed until clicked
          </MenuItem>
        </>
      )}

      <MenuDivider />
      <MenuItem danger onClick={onDelete}>
        Delete
      </MenuItem>
    </>
  );
}

function BlockBody({ block, onChange }: { block: Block; onChange: (block: Block) => void }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className={blockStyles.paragraph}>
          <InlineEditor
            ariaLabel="Text"
            placeholder="Type here"
            value={block.text}
            onChange={(text) => onChange({ ...block, text })}
          />
        </p>
      );

    case "heading":
      return (
        <h4 className={blockStyles.heading}>
          <InlineEditor
            plain
            ariaLabel="Heading"
            placeholder="Heading"
            value={block.text}
            onChange={(text) => onChange({ ...block, text })}
          />
        </h4>
      );

    case "list":
    case "checklist":
      return <ListEditor block={block} onChange={onChange} />;

    case "callout":
      return <CalloutEditor block={block} onChange={onChange} />;

    case "image":
      return <ImageEditor block={block} onChange={onChange} />;

    case "table":
      return <TableEditor block={block} onChange={onChange} />;

    case "calculator":
      return (
        <p className={styles.locked}>
          Interactive {block.calculator === "meld" ? "MELD calculator" : "anticoagulation table"}. It
          appears here on the page and cannot be changed in this editor.
        </p>
      );
  }
}

function CalloutEditor({ block, onChange }: { block: CalloutBlock; onChange: (block: Block) => void }) {
  return (
    <aside className={blockStyles.callout} data-variant={block.variant}>
      <div className={blockStyles.calloutHead}>
        <span className={`${blockStyles.calloutLabel} ${styles.grow}`}>
          <InlineEditor
            plain
            ariaLabel="Box title"
            placeholder={CALLOUT_NAMES[block.variant]}
            value={block.title ?? ""}
            onChange={(title) => onChange({ ...block, title })}
          />
        </span>
        {block.collapsible && <span className={styles.badge}>Collapsed until clicked</span>}
      </div>
      <div className={blockStyles.calloutBody} data-focus-first>
        <BlockList blocks={block.blocks} onChange={(blocks) => onChange({ ...block, blocks })} />
      </div>
    </aside>
  );
}

function ImageEditor({
  block,
  onChange,
}: {
  block: Extract<Block, { type: "image" }>;
  onChange: (block: Block) => void;
}) {
  const context = useEditorContext();
  const fileInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const latest = useRef({ block, onChange });
  latest.current = { block, onChange };
  const url = context.resolveImage(block.src);

  async function onFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setError(null);
    const result = await context.addImage(file);
    if ("error" in result) setError(result.error);
    else latest.current.onChange({ ...latest.current.block, src: result.src });
  }

  return (
    <figure className={blockStyles.figure}>
      {url ? (
        <img src={url} alt="" />
      ) : (
        <p className={blockStyles.missingImage}>This image has no file. Replace it or delete it.</p>
      )}
      <label className={styles.field}>
        <span>Caption (optional)</span>
        <input
          type="text"
          value={block.caption ?? ""}
          onChange={(event) => onChange({ ...block, caption: event.target.value })}
        />
      </label>
      <label className={styles.field}>
        <span>Description for screen readers</span>
        <input
          type="text"
          value={block.alt}
          onChange={(event) => onChange({ ...block, alt: event.target.value })}
        />
      </label>
      <span className={styles.addLine}>
        <button type="button" className={styles.addButton} onClick={() => fileInput.current?.click()}>
          Replace image
        </button>
        {error && (
          <span className={styles.inlineError} role="alert">
            {error}
          </span>
        )}
      </span>
      <input ref={fileInput} type="file" accept={IMAGE_ACCEPT} hidden onChange={onFile} />
    </figure>
  );
}

function TableEditor({
  block,
  onChange,
}: {
  block: Extract<Block, { type: "table" }>;
  onChange: (block: Block) => void;
}) {
  const columns = Math.max(block.header.length, ...block.rows.map((row) => row.length), 1);
  const pad = (cells: RichText[]) => [...cells, ...Array<RichText>(columns - cells.length).fill("")];
  const header = pad(block.header);
  const rows = block.rows.map(pad);
  const rowKeys = useStableKeys(rows.length);

  const setHeader = (column: number, value: RichText) =>
    onChange({ ...block, header: header.map((cell, i) => (i === column ? value : cell)), rows });
  const setCell = (row: number, column: number, value: RichText) =>
    onChange({
      ...block,
      header,
      rows: rows.map((cells, r) => (r === row ? cells.map((cell, c) => (c === column ? value : cell)) : cells)),
    });

  return (
    <figure className={blockStyles.tableWrap}>
      {block.collapsible && <span className={styles.badge}>Collapsed until clicked</span>}
      <div className={blockStyles.tableScroll}>
        <table className={`${blockStyles.table} ${styles.tableEdit}`}>
          <thead>
            <tr>
              {header.map((cell, column) => (
                <th key={column} scope="col">
                  <InlineEditor
                    ariaLabel={`Column ${column + 1} heading`}
                    placeholder="Heading"
                    value={cell}
                    onChange={(value) => setHeader(column, value)}
                  />
                  {columns > 1 && (
                    <button
                      type="button"
                      className={styles.cellTool}
                      title="Remove this column"
                      aria-label={`Remove column ${column + 1}`}
                      onClick={() =>
                        onChange({
                          ...block,
                          header: header.filter((_, i) => i !== column),
                          rows: rows.map((cells) => cells.filter((_, i) => i !== column)),
                        })
                      }
                    >
                      ×
                    </button>
                  )}
                </th>
              ))}
              <th className={styles.toolCell} />
            </tr>
          </thead>
          <tbody>
            {rows.map((cells, row) => (
              <tr key={rowKeys.at(row)}>
                {cells.map((cell, column) => (
                  <td key={column}>
                    <InlineEditor
                      ariaLabel={`Row ${row + 1}, column ${column + 1}`}
                      placeholder="—"
                      value={cell}
                      onChange={(value) => setCell(row, column, value)}
                    />
                  </td>
                ))}
                <td className={styles.toolCell}>
                  <button
                    type="button"
                    className={styles.cellTool}
                    title="Remove this row"
                    aria-label={`Remove row ${row + 1}`}
                    onClick={() => {
                      rowKeys.remove(row);
                      onChange({ ...block, header, rows: rows.filter((_, i) => i !== row) });
                    }}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <span className={styles.addLine}>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => {
            rowKeys.insert(rows.length);
            onChange({ ...block, header, rows: [...rows, Array<RichText>(columns).fill("")] });
          }}
        >
          + Add row
        </button>
        <button
          type="button"
          className={styles.addButton}
          onClick={() =>
            onChange({ ...block, header: [...header, ""], rows: rows.map((cells) => [...cells, ""]) })
          }
        >
          + Add column
        </button>
      </span>
      <label className={styles.field}>
        <span>Caption (optional)</span>
        <input
          type="text"
          value={block.caption ?? ""}
          onChange={(event) => onChange({ ...block, caption: event.target.value })}
        />
      </label>
      <label className={styles.field}>
        <span>Note under the table (optional)</span>
        <input
          type="text"
          value={block.note ?? ""}
          onChange={(event) => onChange({ ...block, note: event.target.value })}
        />
      </label>
    </figure>
  );
}
