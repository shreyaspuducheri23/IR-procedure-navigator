import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { rememberedKey } from "./client";
import { rememberedName } from "./draft";
import styles from "./Editor.module.css";

/**
 * The last step before a change goes live: who is publishing, and optionally
 * why. Both end up in the site's change history.
 */
export function PublishDialog({
  open,
  title,
  isNew,
  changes,
  busy,
  error,
  needsKey,
  onPublish,
  onClose,
}: {
  open: boolean;
  title: string;
  isNew: boolean;
  /** Names of the parts that changed, for the person to check before publishing. */
  changes: string[];
  busy: boolean;
  error: string | null;
  /** The service asked for the shared passcode. */
  needsKey: boolean;
  onPublish: (input: { name: string; note: string; key: string }) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [key, setKey] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setName(rememberedName());
      setNote("");
      setKey(rememberedKey());
      dialog.showModal();
      nameRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (busy || !name.trim()) return;
    onPublish({ name: name.trim(), note: note.trim(), key: key.trim() });
  }

  return (
    <dialog ref={dialogRef} className={styles.dialog} onClose={onClose} aria-labelledby="publish-title">
      <form onSubmit={onSubmit} className={styles.dialogBody}>
        <h2 id="publish-title">{isNew ? "Publish this new procedure?" : "Publish these changes?"}</h2>
        <p className={styles.dialogLede}>
          <strong>{title || "Untitled"}</strong> will update on the live site in about two minutes.
        </p>

        {changes.length > 0 && (
          <div className={styles.changes}>
            <span>What changed</span>
            <ul>
              {changes.slice(0, 8).map((change) => (
                <li key={change}>{change}</li>
              ))}
              {changes.length > 8 && <li>and {changes.length - 8} more</li>}
            </ul>
          </div>
        )}

        <label className={styles.field}>
          <span>Your name</span>
          <input
            ref={nameRef}
            type="text"
            required
            maxLength={60}
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span>Note for the change history (optional)</span>
          <input
            type="text"
            maxLength={300}
            placeholder="e.g. Updated INR threshold per new policy"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </label>

        {needsKey && (
          <label className={styles.field}>
            <span>Editing passcode</span>
            <input
              type="password"
              required
              autoComplete="off"
              value={key}
              onChange={(event) => setKey(event.target.value)}
            />
          </label>
        )}

        {error && (
          <p className={styles.dialogError} role="alert">
            {error}
          </p>
        )}

        <div className={styles.dialogActions}>
          <button type="button" className={styles.secondary} onClick={onClose} disabled={busy}>
            Keep editing
          </button>
          <button type="submit" className={styles.primary} disabled={busy || !name.trim()}>
            {busy ? "Publishing…" : "Publish"}
          </button>
        </div>
      </form>
    </dialog>
  );
}
