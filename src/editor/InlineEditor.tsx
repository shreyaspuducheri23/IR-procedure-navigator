import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { ClipboardEvent, FocusEvent, KeyboardEvent } from "react";
import type { RichText } from "@/schema/article";
import { EXTERNAL_HREF_PATTERN } from "@/schema/validate";
import { staticContentSource } from "@/content/source";
import {
  caretAtEnd,
  caretAtStart,
  currentRange,
  linkFromAnchor,
  makeAnchor,
  placeCaret,
  readRichText,
  renderRichText,
  richTextEquals,
  richTextToPlain,
  selectionOffsets,
  selectOffsets,
  splitAtCaret,
} from "./richTextDom";
import styles from "./Editor.module.css";

export type InlineEditorHandle = {
  focus(at?: "start" | "end" | number): void;
};

type CommonProps = {
  placeholder?: string;
  className?: string;
  ariaLabel: string;
  /** Enter was pressed; the content on either side of the caret. */
  onEnter?: (before: RichText, after: RichText) => void;
  /** Backspace with the caret at the very start. Return true if handled. */
  onBackspaceAtStart?: () => boolean;
  onTab?: (shift: boolean) => boolean;
  /** Arrow key at the first/last position: move to a neighbouring field. */
  onArrow?: (direction: -1 | 1) => boolean;
  /** Alt+Arrow: move this row. */
  onMove?: (direction: -1 | 1) => boolean;
  /** Several lines were pasted at once. */
  onPasteLines?: (lines: string[]) => void;
};

type RichProps = CommonProps & {
  plain?: false;
  value: RichText;
  onChange: (value: RichText) => void;
};

type PlainProps = CommonProps & {
  /** A string-only field: no bold, no links. */
  plain: true;
  value: string;
  onChange: (value: string) => void;
};

type LinkForm = {
  mode: "web" | "procedure";
  href: string;
  articleId: string;
  sectionId: string;
  text: string;
  /** Existing link being edited, if the caret was inside one. */
  editing: HTMLAnchorElement | null;
};

type ToolsPosition = { left: number; top: number };

const articles = [...staticContentSource.listArticles()].sort((a, b) => a.title.localeCompare(b.title));

function closestAnchor(node: Node | null, root: HTMLElement): HTMLAnchorElement | null {
  for (let at = node; at && at !== root; at = at.parentNode) {
    if (at.nodeName === "A") return at as HTMLAnchorElement;
  }
  return null;
}

function normalizeHref(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const href = /^[a-z][a-z0-9+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`;
  return EXTERNAL_HREF_PATTERN.test(href) ? href : null;
}

const stripBullet = (line: string) => line.replace(/^\s*(?:[•·▪◦●○*\-–]|\d{1,2}[.)])\s+/, "");

/**
 * One line of editable text. In rich mode it supports bold and links, which is
 * the whole of the schema's inline vocabulary; in plain mode it is a string.
 *
 * The DOM is the working copy while the field is focused: React never rewrites
 * it in response to the field's own edits, only when the value changes from
 * outside (undo, a row split or merge), so the caret stays where the user put it.
 */
export const InlineEditor = forwardRef<InlineEditorHandle, RichProps | PlainProps>(
  function InlineEditor(props, ref) {
    const { plain, placeholder, className, ariaLabel } = props;
    const rootRef = useRef<HTMLSpanElement>(null);
    const wrapRef = useRef<HTMLSpanElement>(null);
    const rendered = useRef(false);
    const lastEmitted = useRef<RichText>(props.value);
    const savedRange = useRef<Range | null>(null);
    const [tools, setTools] = useState<ToolsPosition | null>(null);
    const [form, setForm] = useState<LinkForm | null>(null);

    // Latest props for handlers that outlive a render.
    const latest = useRef(props);
    latest.current = props;

    useLayoutEffect(() => {
      const root = rootRef.current!;
      if (rendered.current && richTextEquals(props.value, lastEmitted.current)) return;
      rendered.current = true;
      lastEmitted.current = props.value;
      renderRichText(root, props.value);
    }, [props.value]);

    useImperativeHandle(ref, () => ({
      focus(at = "end") {
        if (rootRef.current) placeCaret(rootRef.current, at);
      },
    }));

    /** Reads the DOM and reports the value upward if it actually changed. */
    const emit = useCallback((rerender = false) => {
      const root = rootRef.current!;
      // Browsers leave a <br> in an emptied field; clear it so the placeholder shows.
      if ((root.textContent ?? "") === "" && root.childNodes.length > 0) root.replaceChildren();

      const read = readRichText(root);
      const current = latest.current;
      const next: RichText = current.plain ? richTextToPlain(read) : read;

      if (rerender) {
        const selection = selectionOffsets(root);
        renderRichText(root, next);
        if (selection) selectOffsets(root, selection[0], selection[1]);
      }
      if (richTextEquals(next, lastEmitted.current)) return;
      lastEmitted.current = next;
      if (current.plain) current.onChange(next as string);
      else current.onChange(next);
    }, []);

    // --- Selection toolbar -------------------------------------------------

    const updateTools = useCallback(() => {
      const root = rootRef.current;
      const wrap = wrapRef.current;
      if (!root || !wrap || latest.current.plain) return;
      const range = currentRange(root);
      const inLink = range ? closestAnchor(range.startContainer, root) : null;
      if (!range || (range.collapsed && !inLink)) {
        setTools(null);
        return;
      }
      const rect = (inLink ?? range).getBoundingClientRect();
      const base = wrap.getBoundingClientRect();
      setTools({ left: Math.max(0, rect.left - base.left), top: rect.bottom - base.top + 6 });
    }, []);

    useEffect(() => {
      if (plain) return;
      const onSelectionChange = () => {
        if (document.activeElement === rootRef.current) updateTools();
      };
      document.addEventListener("selectionchange", onSelectionChange);
      return () => document.removeEventListener("selectionchange", onSelectionChange);
    }, [plain, updateTools]);

    function toggleBold() {
      const root = rootRef.current!;
      const range = currentRange(root);
      root.focus({ preventScroll: true });
      // execCommand is long deprecated but remains the one bold toggle every
      // browser implements, including un-bolding part of a run.
      document.execCommand("bold");
      // With a bare caret nothing changed yet (bold applies to what is typed
      // next), and re-rendering would throw that pending state away.
      emit(!!range && !range.collapsed);
    }

    function openLinkForm() {
      const root = rootRef.current!;
      const range = currentRange(root);
      const editing = range
        ? (closestAnchor(range.startContainer, root) ?? closestAnchor(range.endContainer, root))
        : null;
      savedRange.current = range;
      const existing = editing ? linkFromAnchor(editing, editing.textContent ?? "") : null;
      setForm({
        mode: existing && "articleId" in existing ? "procedure" : "web",
        href: existing && "href" in existing ? existing.href : "",
        articleId: existing && "articleId" in existing ? existing.articleId : "",
        sectionId: existing && "articleId" in existing ? (existing.sectionId ?? "") : "",
        text: editing ? (editing.textContent ?? "") : (range?.toString() ?? ""),
        editing,
      });
    }

    function closeForm(refocus: boolean) {
      setForm(null);
      if (refocus && rootRef.current) placeCaret(rootRef.current, "end");
    }

    function applyLink(current: LinkForm) {
      const root = rootRef.current!;
      const text = current.text.trim();
      if (!text) return;
      const link =
        current.mode === "web"
          ? (() => {
              const href = normalizeHref(current.href);
              return href ? { text, href } : null;
            })()
          : current.articleId
            ? current.sectionId
              ? { text, articleId: current.articleId, sectionId: current.sectionId }
              : { text, articleId: current.articleId }
            : null;
      if (!link) return;

      const anchor = makeAnchor(root.ownerDocument, link);
      if (current.editing && root.contains(current.editing)) {
        current.editing.replaceWith(anchor);
      } else {
        const range = savedRange.current;
        if (range && root.contains(range.startContainer)) {
          range.deleteContents();
          range.insertNode(anchor);
        } else {
          root.append(anchor);
        }
      }
      setForm(null);
      emit(true);
      placeCaret(root, "end");
    }

    function removeLink(current: LinkForm) {
      const root = rootRef.current!;
      if (current.editing && root.contains(current.editing)) {
        current.editing.replaceWith(root.ownerDocument.createTextNode(current.editing.textContent ?? ""));
      }
      setForm(null);
      emit(true);
      placeCaret(root, "end");
    }

    // --- Events --------------------------------------------------------------

    function onKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
      const root = rootRef.current!;
      const current = latest.current;
      const modifier = event.metaKey || event.ctrlKey;
      const key = event.key;

      if (key === "Enter") {
        event.preventDefault();
        if (event.nativeEvent.isComposing || !current.onEnter) return;
        const split = splitAtCaret(root);
        if (split) current.onEnter(split[0], split[1]);
        return;
      }
      if (key === "Backspace" && current.onBackspaceAtStart && caretAtStart(root)) {
        if (current.onBackspaceAtStart()) event.preventDefault();
        return;
      }
      if (key === "Tab" && current.onTab) {
        if (current.onTab(event.shiftKey)) event.preventDefault();
        return;
      }
      if (key === "ArrowUp" || key === "ArrowDown") {
        const direction = key === "ArrowUp" ? -1 : 1;
        if (event.altKey) {
          if (current.onMove?.(direction)) event.preventDefault();
        } else if (current.onArrow && (direction === -1 ? caretAtStart(root) : caretAtEnd(root))) {
          if (current.onArrow(direction)) event.preventDefault();
        }
        return;
      }
      if (key === "Escape" && form) {
        closeForm(true);
        return;
      }
      if (!modifier) return;
      const letter = key.toLowerCase();
      // Italic and underline have no place in the schema.
      if (letter === "i" || letter === "u") event.preventDefault();
      if (letter === "b") {
        event.preventDefault();
        if (!current.plain) toggleBold();
      }
      if (letter === "k" && !current.plain) {
        event.preventDefault();
        openLinkForm();
      }
    }

    function onPaste(event: ClipboardEvent<HTMLSpanElement>) {
      // Always plain text: pasted HTML could carry any markup at all.
      event.preventDefault();
      const lines = event.clipboardData
        .getData("text/plain")
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);
      if (lines.length === 0) return;
      const current = latest.current;
      if (lines.length > 1 && current.onPasteLines) {
        current.onPasteLines(lines.map(stripBullet));
        return;
      }
      document.execCommand("insertText", false, lines.join(" "));
    }

    function onBlur(event: FocusEvent<HTMLSpanElement>) {
      if (wrapRef.current?.contains(event.relatedTarget as Node | null)) return;
      setTools(null);
      setForm(null);
    }

    const keepFocus = (event: { preventDefault(): void }) => event.preventDefault();

    return (
      <span className={styles.inlineWrap} ref={wrapRef} onBlur={onBlur}>
        <span
          ref={rootRef}
          className={`${styles.inline} ${className ?? ""}`}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-label={ariaLabel}
          aria-multiline="false"
          data-placeholder={placeholder}
          spellCheck
          onInput={() => emit()}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          onDrop={keepFocus}
          onFocus={updateTools}
          onClick={(event) => {
            // Links inside the field are for editing, never for following.
            if ((event.target as HTMLElement).closest("a")) event.preventDefault();
          }}
        />

        {!plain && tools && !form && (
          <span className={styles.inlineTools} style={tools} contentEditable={false}>
            <button type="button" onMouseDown={keepFocus} onClick={toggleBold} title="Bold (Ctrl+B)">
              <strong>B</strong>
            </button>
            <button type="button" onMouseDown={keepFocus} onClick={openLinkForm} title="Link (Ctrl+K)">
              Link
            </button>
          </span>
        )}

        {!plain && form && (
          <LinkFormPopover
            form={form}
            onChange={setForm}
            onApply={() => applyLink(form)}
            onRemove={form.editing ? () => removeLink(form) : undefined}
            onCancel={() => closeForm(true)}
          />
        )}
      </span>
    );
  },
);

function LinkFormPopover({
  form,
  onChange,
  onApply,
  onRemove,
  onCancel,
}: {
  form: LinkForm;
  onChange: (form: LinkForm) => void;
  onApply: () => void;
  onRemove?: () => void;
  onCancel: () => void;
}) {
  const [sections, setSections] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    let cancelled = false;
    setSections([]);
    if (form.mode !== "procedure" || !form.articleId) return;
    staticContentSource.getArticle(form.articleId).then((article) => {
      if (!cancelled && article) setSections(article.sections.map(({ id, title }) => ({ id, title })));
    });
    return () => {
      cancelled = true;
    };
  }, [form.mode, form.articleId]);

  const hrefInvalid = form.mode === "web" && form.href.trim() !== "" && !normalizeHref(form.href);
  const ready =
    form.text.trim() !== "" && (form.mode === "web" ? !!normalizeHref(form.href) : form.articleId !== "");

  return (
    <span
      className={styles.linkForm}
      contentEditable={false}
      role="dialog"
      aria-label="Link"
      onKeyDown={(event) => {
        if (event.key === "Escape") onCancel();
        if (event.key === "Enter" && ready) {
          event.preventDefault();
          onApply();
        }
      }}
    >
      <span className={styles.linkModes} role="radiogroup" aria-label="Link to">
        {(["web", "procedure"] as const).map((mode) => (
          <label key={mode}>
            <input
              type="radio"
              name="link-mode"
              checked={form.mode === mode}
              onChange={() => onChange({ ...form, mode })}
            />
            {mode === "web" ? "Web address" : "Another procedure"}
          </label>
        ))}
      </span>

      <label className={styles.field}>
        <span>Text</span>
        <input
          type="text"
          value={form.text}
          onChange={(event) => onChange({ ...form, text: event.target.value })}
        />
      </label>

      {form.mode === "web" ? (
        <label className={styles.field}>
          <span>Address</span>
          <input
            type="url"
            autoFocus
            placeholder="https://"
            value={form.href}
            aria-invalid={hrefInvalid}
            onChange={(event) => onChange({ ...form, href: event.target.value })}
          />
        </label>
      ) : (
        <>
          <label className={styles.field}>
            <span>Procedure</span>
            <select
              autoFocus
              value={form.articleId}
              onChange={(event) => onChange({ ...form, articleId: event.target.value, sectionId: "" })}
            >
              <option value="">Choose…</option>
              {articles.map((article) => (
                <option key={article.id} value={article.id}>
                  {article.title}
                </option>
              ))}
            </select>
          </label>
          {sections.length > 0 && (
            <label className={styles.field}>
              <span>Open at</span>
              <select
                value={form.sectionId}
                onChange={(event) => onChange({ ...form, sectionId: event.target.value })}
              >
                <option value="">Top of the page</option>
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.title}
                  </option>
                ))}
              </select>
            </label>
          )}
        </>
      )}

      <span className={styles.linkActions}>
        <button type="button" className={styles.primarySmall} disabled={!ready} onClick={onApply}>
          {form.editing ? "Update link" : "Add link"}
        </button>
        {onRemove && (
          <button type="button" className={styles.quiet} onClick={onRemove}>
            Remove link
          </button>
        )}
        <button type="button" className={styles.quiet} onClick={onCancel}>
          Cancel
        </button>
      </span>
    </span>
  );
}
