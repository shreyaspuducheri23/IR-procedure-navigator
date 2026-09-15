import { AnticoagulationMatrix } from "./AnticoagulationMatrix";
import { useState } from "react";
import type {
  Block,
  CalloutVariant,
  RichText as RichTextValue,
} from "@/schema/article";
import { resolveImage } from "@/content/images";
import { MeldCalculator } from "./MeldCalculator";
import { RichText } from "./RichText";
import styles from "./BlockRenderer.module.css";

export function Blocks({
  blocks,
  articleId,
}: {
  blocks: Block[];
  articleId: string;
}) {
  return (
    <>
      {blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} articleId={articleId} />
      ))}
    </>
  );
}

function BlockRenderer({
  block,
  articleId,
}: {
  block: Block;
  articleId: string;
}) {
  switch (block.type) {
    case "calculator":
      return block.calculator === "anticoagulation" ? (
        <div className="anticoagulation-page">
          <AnticoagulationMatrix />
        </div>
      ) : (
        <MeldCalculator />
      );
    case "paragraph":
      return (
        <p className={styles.paragraph}>
          <RichText value={block.text} />
        </p>
      );

    case "heading":
      return <h4 className={styles.heading}>{block.text}</h4>;

    case "list":
      return block.ordered ? (
        <ol className={styles.orderedList}>
          <ListItems items={block.items} />
        </ol>
      ) : (
        <ul className={styles.list}>
          <ListItems items={block.items} />
        </ul>
      );

    case "checklist":
      return <Checklist title={block.title} items={block.items} />;

    case "callout":
      return (
        <Callout variant={block.variant} title={block.title}>
          <Blocks blocks={block.blocks} articleId={articleId} />
        </Callout>
      );

    case "image":
      return <ArticleImage articleId={articleId} block={block} />;

    case "table":
      return <ArticleTable block={block} />;
  }
}

function ListItems({ items }: { items: RichTextValue[] }) {
  return (
    <>
      {items.map((item, index) => (
        <li key={index} className={styles.listItem}>
          <RichText value={item} />
        </li>
      ))}
    </>
  );
}

/**
 * Tick state is deliberately component-local and not persisted — these are
 * "did I do this on this patient" checklists, not saved documents.
 */
function Checklist({
  title,
  items,
}: {
  title?: string;
  items: RichTextValue[];
}) {
  const [checked, setChecked] = useState<Set<number>>(() => new Set());

  function toggle(index: number) {
    setChecked((previous) => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className={styles.checklist}>
      {(title || checked.size > 0) && (
        <div className={styles.checklistHead}>
          {title && <h4 className={styles.checklistTitle}>{title}</h4>}
          {checked.size > 0 && (
            <button
              type="button"
              className={styles.reset}
              onClick={() => setChecked(new Set())}
            >
              Reset ({checked.size})
            </button>
          )}
        </div>
      )}
      <ul className={styles.checkItems}>
        {items.map((item, index) => (
          <li key={index}>
            <label className={styles.checkItem}>
              <input
                type="checkbox"
                checked={checked.has(index)}
                onChange={() => toggle(index)}
              />
              <span
                className={checked.has(index) ? styles.checkedText : undefined}
              >
                <RichText value={item} />
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

const CALLOUT_LABELS: Record<CalloutVariant, string> = {
  caution: "Caution",
  contraindication: "Do not proceed",
  pearl: "Pearl",
  note: "Note",
};

export function Callout({
  variant,
  title,
  children,
}: {
  variant: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className={styles.callout} data-variant={variant}>
      <div className={styles.calloutHead}>
        <CalloutIcon variant={variant} />
        <span className={styles.calloutLabel}>
          {title ?? CALLOUT_LABELS[variant]}
        </span>
      </div>
      <div className={styles.calloutBody}>{children}</div>
    </aside>
  );
}

function CalloutIcon({ variant }: { variant: CalloutVariant }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 15,
    height: 15,
    "aria-hidden": true,
    focusable: "false" as const,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (variant === "contraindication") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m6.2 6.2 11.6 11.6" />
      </svg>
    );
  }
  if (variant === "caution") {
    return (
      <svg {...common}>
        <path d="M12 4.5 21 19H3z" />
        <path d="M12 10v4M12 16.6v.1" />
      </svg>
    );
  }
  if (variant === "pearl") {
    return (
      <svg {...common}>
        <path d="M9 18h6M10 21h4" />
        <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2h5c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 7.9v.1" />
    </svg>
  );
}

function ArticleImage({
  articleId,
  block,
}: {
  articleId: string;
  block: Extract<Block, { type: "image" }>;
}) {
  const src = resolveImage(articleId, block.src);
  if (!src) {
    return <p className={styles.missingImage}>Image not found: {block.src}</p>;
  }
  return (
    <figure className={styles.figure}>
      <img src={src} alt={block.alt} loading="lazy" />
      {block.caption && (
        <figcaption className={styles.caption}>{block.caption}</figcaption>
      )}
    </figure>
  );
}

function ArticleTable({ block }: { block: Extract<Block, { type: "table" }> }) {
  return (
    <figure className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {block.header.map((cell, index) => (
                <th key={index} scope="col">
                  <RichText value={cell} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) =>
                  cellIndex === 0 ? (
                    <th key={cellIndex} scope="row">
                      <RichText value={cell} />
                    </th>
                  ) : (
                    <td key={cellIndex}>
                      <RichText value={cell} />
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {block.caption && (
        <figcaption className={styles.caption}>{block.caption}</figcaption>
      )}
    </figure>
  );
}
