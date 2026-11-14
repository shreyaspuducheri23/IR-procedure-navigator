import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import type { Article, Section } from "@/schema/article";
import { CATEGORIES } from "@/content/categories";
import { bundledImage, repositoryImage } from "@/content/images";
import { rememberPublished } from "@/content/published";
import { staticContentSource } from "@/content/source";
import { walkArticleBlocks } from "@/schema/validate";
import articleStyles from "@/components/article/ArticlePage.module.css";
import { editorAvailable, loadArticle, rememberKey, saveArticle } from "./client";
import { EditorContext } from "./context";
import type { EditorContextValue } from "./context";
import { clearDraft, readDraft, rememberName, writeDraft } from "./draft";
import type { Draft } from "./draft";
import { useHistory } from "./history";
import { prepareImage, previewUrl } from "./images";
import { InlineEditor } from "./InlineEditor";
import { Menu, MenuItem } from "./Menu";
import { MetaPanel } from "./MetaPanel";
import { describeChanges, findProblems, newArticle, newSection, tidyArticle } from "./model";
import { PublishDialog } from "./PublishDialog";
import { SectionEditor } from "./SectionEditor";
import styles from "./Editor.module.css";

/** Same canonical phase order the reader uses. */
const KIND_ORDER: Record<Section["kind"], number> = {
  overview: 0,
  pre: 1,
  intra: 2,
  post: 3,
  custom: 4,
  references: 5,
};

const SECTION_CHOICES: { kind: Section["kind"]; title: string; label: string; once: boolean }[] = [
  { kind: "overview", title: "Overview", label: "Overview", once: true },
  { kind: "pre", title: "Pre-procedure", label: "Pre-procedure", once: true },
  { kind: "intra", title: "Intra-procedure", label: "Intra-procedure", once: true },
  { kind: "post", title: "Post-procedure", label: "Post-procedure", once: true },
  { kind: "custom", title: "", label: "Another section", once: false },
  { kind: "references", title: "References", label: "References", once: true },
];

/** Most new images one publish may carry; mirrors the Worker's limit. */
const MAX_NEW_IMAGES = 4;

const knownArticleIds = new Set(staticContentSource.listArticles().map((article) => article.id));

type PendingImages = Map<string, { data: string; url: string }>;

type Loaded = {
  /** The article as stored; null for a procedure that has never been published. */
  original: Article | null;
  baseSha: string | null;
  serverImages: string[];
};

type Phase =
  | { state: "loading" }
  | { state: "failed"; message: string; missing: boolean }
  | { state: "ready" };

type Outcome =
  | { kind: "published"; commitUrl: string | null }
  | { kind: "unchanged" }
  | { kind: "conflict"; message: string };

type PublishedState = { justPublished?: { commitUrl: string | null } };

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

function pendingFromDraft(draft: Draft): PendingImages {
  return new Map(draft.images.map((image) => [image.name, { data: image.data, url: previewUrl(image.name, image.data) }]));
}

function formatWhen(timestamp: number): string {
  return new Date(timestamp).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

/** Route element for both /article/:id/edit and /new. */
export function EditorPage() {
  const { id } = useParams();
  // A different article is a different editing session: remount from scratch.
  return <Editor key={id ?? "new"} id={id ?? null} />;
}

function Editor({ id }: { id: string | null }) {
  const isNew = id === null;
  const draftKey = id ?? "new";
  const navigate = useNavigate();
  const location = useLocation();

  const [phase, setPhase] = useState<Phase>({ state: "loading" });
  const [loaded, setLoaded] = useState<Loaded>({ original: null, baseSha: null, serverImages: [] });
  const history = useHistory<Article>(BLANK);
  const article = history.value;
  const [pending, setPending] = useState<PendingImages>(new Map());
  /** A draft from this device that no longer matches the stored version. */
  const [staleDraft, setStaleDraft] = useState<Draft | null>(null);
  const [restoredAt, setRestoredAt] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [dialogError, setDialogError] = useState<string | null>(null);
  const [needsKey, setNeedsKey] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(() => {
    const state = location.state as PublishedState | null;
    return state?.justPublished ? { kind: "published", commitUrl: state.justPublished.commitUrl } : null;
  });
  const [attempt, setAttempt] = useState(0);

  // --- Load ----------------------------------------------------------------

  const resetHistory = history.reset;
  useEffect(() => {
    let cancelled = false;
    const draft = readDraft(draftKey);

    if (isNew) {
      setLoaded({ original: null, baseSha: null, serverImages: [] });
      if (draft) {
        resetHistory(draft.article);
        setPending(pendingFromDraft(draft));
        setRestoredAt(draft.savedAt);
      } else {
        resetHistory(BLANK);
      }
      setPhase({ state: "ready" });
      return;
    }

    setPhase({ state: "loading" });
    loadArticle(id).then((result) => {
      if (cancelled) return;
      if ("error" in result) {
        setPhase({ state: "failed", message: result.error, missing: result.missing === true });
        return;
      }
      setLoaded({ original: result.article, baseSha: result.sha, serverImages: result.images });
      if (draft && !same(draft.article, result.article)) {
        if (draft.baseSha === result.sha) {
          resetHistory(draft.article);
          setPending(pendingFromDraft(draft));
          setRestoredAt(draft.savedAt);
        } else {
          resetHistory(result.article);
          setStaleDraft(draft);
        }
      } else {
        resetHistory(result.article);
        if (draft) clearDraft(draftKey);
      }
      setPhase({ state: "ready" });
    });
    return () => {
      cancelled = true;
    };
  }, [id, isNew, draftKey, attempt, resetHistory]);

  // --- Derived ---------------------------------------------------------------

  const tidy = useMemo(() => tidyArticle(article, { isNew }), [article, isNew]);
  const dirty = phase.state === "ready" && !same(tidy, loaded.original ?? BLANK);

  const usedImages = useMemo(() => {
    const names = new Set<string>();
    for (const block of walkArticleBlocks(tidy)) {
      if (block.type === "image") names.add(block.src.replace(/^images\//, ""));
    }
    return names;
  }, [tidy]);

  const newImages = useMemo(
    () =>
      [...pending]
        .filter(([name]) => usedImages.has(name) && !loaded.serverImages.includes(name))
        .map(([name, image]) => ({ name, data: image.data })),
    [pending, usedImages, loaded.serverImages],
  );

  const problems = useMemo(() => {
    if (phase.state !== "ready") return [];
    const found = findProblems(tidy, {
      folderId: isNew ? tidy.id : id,
      knownArticleIds: new Set([...knownArticleIds, tidy.id]),
      imageExists: (src) => {
        const name = src.replace(/^images\//, "");
        return loaded.serverImages.includes(name) || pending.has(name);
      },
    });
    if (isNew && tidy.id && knownArticleIds.has(tidy.id)) {
      found.push("A procedure with this title already exists. Choose a different title.");
    }
    if (newImages.length > MAX_NEW_IMAGES) {
      found.push(
        `Only ${MAX_NEW_IMAGES} new images can be published at once. Remove ${newImages.length - MAX_NEW_IMAGES}, publish, then add the rest.`,
      );
    }
    return found;
  }, [phase.state, tidy, isNew, id, loaded.serverImages, pending, newImages.length]);

  const changes = useMemo(() => describeChanges(loaded.original, tidy), [loaded.original, tidy]);

  // --- Draft on this device ----------------------------------------------------

  useEffect(() => {
    if (phase.state !== "ready") return;
    if (!dirty) {
      clearDraft(draftKey);
      return;
    }
    const timer = setTimeout(() => {
      writeDraft(draftKey, {
        article,
        baseSha: loaded.baseSha,
        savedAt: Date.now(),
        images: [...pending].filter(([name]) => usedImages.has(name)).map(([name, image]) => ({ name, data: image.data })),
      });
    }, 400);
    return () => clearTimeout(timer);
  }, [phase.state, dirty, draftKey, article, loaded.baseSha, pending, usedImages]);

  // Closing the tab is safe (the draft is kept), but say so before it happens.
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  // --- Undo keys ----------------------------------------------------------------

  const { undo, redo } = history;
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "z") return;
      const target = event.target as HTMLElement | null;
      // Inside a text field the browser's own undo handles typing.
      if (target?.isContentEditable || target?.closest("input, textarea, select")) return;
      event.preventDefault();
      if (event.shiftKey) redo();
      else undo();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [undo, redo]);

  // --- Images ---------------------------------------------------------------------

  const pendingRef = useRef(pending);
  pendingRef.current = pending;
  const serverImagesRef = useRef(loaded.serverImages);
  serverImagesRef.current = loaded.serverImages;
  const imageFolder = isNew ? null : id;

  const context = useMemo<EditorContextValue>(
    () => ({
      articleId: imageFolder ?? "",
      resolveImage(src) {
        const name = src.replace(/^images\//, "");
        const local = pendingRef.current.get(name);
        if (local) return local.url;
        if (!imageFolder) return null;
        return (
          bundledImage(imageFolder, src) ??
          (serverImagesRef.current.includes(name) ? repositoryImage(imageFolder, src) : null)
        );
      },
      async addImage(file) {
        const prepared = await prepareImage(file, [...serverImagesRef.current, ...pendingRef.current.keys()]);
        if ("error" in prepared) return prepared;
        setPending((current) => new Map(current).set(prepared.name, { data: prepared.data, url: prepared.url }));
        return { src: `images/${prepared.name}` };
      },
    }),
    // The lookups read refs so `addImage` always sees the latest set; `pending`
    // and the server list are still dependencies so image blocks re-resolve
    // when either changes.
    [imageFolder, pending, loaded.serverImages],
  );

  // --- Actions --------------------------------------------------------------------

  const setArticle = history.set;
  const sections = useMemo(
    () =>
      article.sections
        .map((section, index) => ({ section, index }))
        .sort((a, b) => KIND_ORDER[a.section.kind] - KIND_ORDER[b.section.kind] || a.index - b.index),
    [article.sections],
  );

  const setSection = useCallback(
    (index: number, section: Section) =>
      setArticle({ ...article, sections: article.sections.map((s, i) => (i === index ? section : s)) }),
    [article, setArticle],
  );

  function moveSection(position: number, direction: -1 | 1) {
    const here = sections[position];
    const there = sections[position + direction];
    if (!here || !there || here.section.kind !== there.section.kind) return;
    const next = [...article.sections];
    [next[here.index], next[there.index]] = [next[there.index]!, next[here.index]!];
    setArticle({ ...article, sections: next });
  }

  function deleteSection(index: number) {
    const section = article.sections[index]!;
    const empty = (section.blocks ?? []).length === 0 && (section.subsections ?? []).length === 0;
    if (!empty && !window.confirm(`Delete the whole “${section.title}” section and everything in it?`)) return;
    setArticle({ ...article, sections: article.sections.filter((_, i) => i !== index) });
  }

  function discard() {
    if (!window.confirm("Discard all unpublished changes to this procedure?")) return;
    clearDraft(draftKey);
    setPending(new Map());
    setRestoredAt(null);
    setOutcome(null);
    if (loaded.original) history.reset(loaded.original);
    else history.reset(BLANK);
  }

  function adoptStaleDraft() {
    if (!staleDraft) return;
    // Deliberate: the person chose their own text over the newer stored version.
    history.set(staleDraft.article);
    setPending(pendingFromDraft(staleDraft));
    setStaleDraft(null);
  }

  async function publish(input: { name: string; note: string; key: string }) {
    setBusy(true);
    setDialogError(null);
    if (needsKey) rememberKey(input.key);
    rememberName(input.name);

    const summary = changes.length > 0 ? `Changed: ${changes.join("; ")}` : "";
    const result = await saveArticle({
      article: tidy,
      baseSha: loaded.baseSha,
      editor: input.name,
      note: input.note || summary,
      images: newImages,
    });
    setBusy(false);

    if (!result.ok) {
      if (result.needsKey) {
        setNeedsKey(true);
        setDialogError(
          needsKey ? "That passcode is not right." : "Publishing needs the editing passcode. Enter it below.",
        );
        return;
      }
      if (result.conflict === "stale") {
        setDialogOpen(false);
        setOutcome({ kind: "conflict", message: result.message });
        return;
      }
      setDialogError(result.message);
      return;
    }

    setDialogOpen(false);
    clearDraft(draftKey);
    setRestoredAt(null);
    rememberPublished(tidy);

    if (result.unchanged) {
      setOutcome({ kind: "unchanged" });
    } else if (isNew) {
      // The procedure now has an address; continue editing it there.
      navigate(`/article/${tidy.id}/edit`, {
        replace: true,
        state: { justPublished: { commitUrl: result.commitUrl } } satisfies PublishedState,
      });
      return;
    } else {
      setOutcome({ kind: "published", commitUrl: result.commitUrl });
    }
    setLoaded({
      original: tidy,
      baseSha: result.sha,
      serverImages: [...loaded.serverImages, ...newImages.map((image) => image.name)],
    });
    history.reset(tidy);
    window.scrollTo({ top: 0 });
  }

  // --- Render -----------------------------------------------------------------------

  if (!editorAvailable) {
    return <Message title="Editing is not set up">This copy of the site has no publishing service configured.</Message>;
  }
  if (phase.state === "loading") {
    return <Message title="Opening the editor…">Fetching the latest version of this procedure.</Message>;
  }
  if (phase.state === "failed") {
    return (
      <Message title={phase.missing ? "Procedure not found" : "The editor could not open"}>
        {phase.message}{" "}
        {!phase.missing && (
          <button type="button" className={styles.linkButton} onClick={() => setAttempt((n) => n + 1)}>
            Try again
          </button>
        )}
      </Message>
    );
  }

  const canPublish = dirty && problems.length === 0;
  const availableSections = SECTION_CHOICES.filter(
    (choice) => !choice.once || !article.sections.some((section) => section.kind === choice.kind),
  );

  return (
    <EditorContext.Provider value={context}>
      <article className={`${articleStyles.page} ${styles.page}`}>
        <nav className={articleStyles.breadcrumb} aria-label="Breadcrumb">
          {isNew ? <Link to="/">← All procedures</Link> : <Link to={`/article/${id}`}>← Back to the procedure</Link>}
          <span className={styles.modeChip}>{isNew ? "New procedure" : "Editing"}</span>
        </nav>

        {outcome?.kind === "published" && (
          <p className={styles.notice} data-tone="success" role="status">
            <strong>Published.</strong> The live site updates in about two minutes; until then other people still see
            the previous version.{" "}
            {outcome.commitUrl && (
              <a href={outcome.commitUrl} target="_blank" rel="noopener noreferrer">
                View the change
              </a>
            )}
          </p>
        )}
        {outcome?.kind === "unchanged" && (
          <p className={styles.notice} role="status">
            Nothing to publish: this matches what is already on the site.
          </p>
        )}
        {outcome?.kind === "conflict" && (
          <p className={styles.notice} data-tone="warning" role="alert">
            <strong>Not published.</strong> {outcome.message}{" "}
            <button
              type="button"
              className={styles.linkButton}
              onClick={() => {
                if (!window.confirm("Reload the latest version? Your unpublished changes here will be discarded.")) return;
                clearDraft(draftKey);
                setOutcome(null);
                setAttempt((n) => n + 1);
              }}
            >
              Reload the latest version
            </button>
          </p>
        )}
        {restoredAt && dirty && (
          <p className={styles.notice} role="status">
            Picked up your unpublished changes from {formatWhen(restoredAt)}.
          </p>
        )}
        {staleDraft && (
          <p className={styles.notice} data-tone="warning" role="status">
            You have unpublished changes from {formatWhen(staleDraft.savedAt)}, but this procedure has been updated
            since. You are looking at the current version.{" "}
            <button type="button" className={styles.linkButton} onClick={adoptStaleDraft}>
              Use my version instead
            </button>{" "}
            <button
              type="button"
              className={styles.linkButton}
              onClick={() => {
                clearDraft(draftKey);
                setStaleDraft(null);
              }}
            >
              Discard my old changes
            </button>
          </p>
        )}

        <header className={articleStyles.header}>
          <h1 className={articleStyles.title}>
            <InlineEditor
              plain
              ariaLabel="Procedure title"
              placeholder="Procedure title"
              value={article.title}
              onChange={(title) => setArticle({ ...article, title })}
            />
          </h1>
          <p className={articleStyles.summary}>
            <InlineEditor
              plain
              ariaLabel="Summary"
              placeholder="One or two sentences shown under the title and on the home page card."
              value={article.summary}
              onChange={(summary) => setArticle({ ...article, summary })}
            />
          </p>
          {isNew && tidy.id && <p className={styles.address}>Address: #/article/{tidy.id}</p>}
        </header>

        <MetaPanel article={article} onChange={setArticle} />

        <p className={styles.hint}>
          Click any text to change it. Select text to make it <strong>bold</strong> or a link. In a list, Enter adds a
          bullet and Tab makes a sub-bullet. Use ⋮ to move, add or delete.
        </p>

        <div className={articleStyles.sections}>
          {sections.map(({ section, index }, position) => (
            <SectionEditor
              key={section.id}
              section={section}
              onChange={(next) => setSection(index, next)}
              onDelete={() => deleteSection(index)}
              onMove={(direction) => moveSection(position, direction)}
              canMoveUp={sections[position - 1]?.section.kind === section.kind}
              canMoveDown={sections[position + 1]?.section.kind === section.kind}
            />
          ))}
        </div>

        {availableSections.length > 0 && (
          <div>
            <Menu label="Add a section" button="+ Add section" buttonClassName={styles.addButton} align="start">
              {(close) =>
                availableSections.map((choice) => (
                  <MenuItem
                    key={choice.kind}
                    onClick={() => {
                      close();
                      setArticle({ ...article, sections: [...article.sections, newSection(choice.kind, choice.title)] });
                    }}
                  >
                    {choice.label}
                  </MenuItem>
                ))
              }
            </Menu>
          </div>
        )}

        <div className={styles.bar} role="region" aria-label="Publishing">
          <div className={styles.barStatus}>
            {problems.length > 0 ? (
              <details className={styles.problems}>
                <summary>
                  {problems.length === 1 ? "1 thing to fix before publishing" : `${problems.length} things to fix before publishing`}
                </summary>
                <ul>
                  {problems.map((problem) => (
                    <li key={problem}>{problem}</li>
                  ))}
                </ul>
              </details>
            ) : dirty ? (
              <span>
                <strong>Unpublished changes</strong>
                <span className={styles.barDetail}> · kept on this device until you publish</span>
              </span>
            ) : (
              <span className={styles.barDetail}>No changes yet</span>
            )}
          </div>
          <div className={styles.barActions}>
            <button type="button" className={styles.secondary} onClick={history.undo} disabled={!history.canUndo}>
              Undo
            </button>
            <button type="button" className={styles.secondary} onClick={history.redo} disabled={!history.canRedo}>
              Redo
            </button>
            <button type="button" className={styles.secondary} onClick={discard} disabled={!dirty}>
              Discard
            </button>
            <button
              type="button"
              className={styles.primary}
              disabled={!canPublish}
              onClick={() => {
                setDialogError(null);
                setDialogOpen(true);
              }}
            >
              Publish
            </button>
          </div>
        </div>
      </article>

      <PublishDialog
        open={dialogOpen}
        title={tidy.title}
        isNew={isNew}
        changes={changes}
        busy={busy}
        error={dialogError}
        needsKey={needsKey}
        onPublish={publish}
        onClose={() => {
          if (!busy) setDialogOpen(false);
        }}
      />
    </EditorContext.Provider>
  );
}

/**
 * An untouched new procedure. Also what the history hook holds until the real
 * article has loaded, and what "nothing typed yet" is compared against.
 */
const BLANK: Article = newArticle({ title: "", category: CATEGORIES[0]!.id, bleedRisk: null });

function Message({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.message}>
      <h1>{title}</h1>
      <p>{children}</p>
      <p>
        <Link to="/">Back to all procedures</Link>
      </p>
    </div>
  );
}
