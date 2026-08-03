import { useEffect, useRef, useState } from "react";
import { useFeedback } from "@/feedback/FeedbackContext";
import { contextSummary } from "@/feedback/issue";
import { feedbackSubmitter } from "@/feedback/submitter";
import {
  emptyReport,
  FEEDBACK_KINDS,
  KIND_LABELS,
  MESSAGE_MAX,
  MESSAGE_MIN,
  type FeedbackReport,
} from "@/feedback/types";
import styles from "./FeedbackDialog.module.css";

type Phase = { state: "editing" } | { state: "sending" } | { state: "sent"; url: string | null };

export function FeedbackDialog() {
  const { context, close } = useFeedback();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [report, setReport] = useState<FeedbackReport>(emptyReport);
  const [phase, setPhase] = useState<Phase>({ state: "editing" });
  const [error, setError] = useState<string | null>(null);

  // showModal() is what makes this a real modal: focus trap, inert background,
  // and Esc handling come from the platform rather than from us.
  //
  // The platform can also close the dialog behind React's back — Esc does exactly
  // that. So this effect keys off the context object's identity (a fresh one per
  // open() call) and reconciles against `dialog.open` rather than tracking a
  // boolean. Keying off a boolean meant that once the two disagreed, the value
  // never changed again, the effect never re-ran, and the trigger went dead.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (context && !dialog.open) {
      setReport(emptyReport());
      setPhase({ state: "editing" });
      setError(null);
      dialog.showModal();
      // showModal() puts focus on the first focusable child, which is a radio —
      // and then arrow keys would silently change the reader's answer. Send them
      // to the field they actually came here to fill in.
      messageRef.current?.focus();
    } else if (!context && dialog.open) {
      dialog.close();
    }
  }, [context]);

  if (!context) return <dialog ref={dialogRef} className={styles.dialog} />;

  const trimmed = report.message.trim();
  const tooShort = trimmed.length > 0 && trimmed.length < MESSAGE_MIN;
  const canSend = trimmed.length >= MESSAGE_MIN && phase.state === "editing";

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSend || !context) return;
    setPhase({ state: "sending" });
    setError(null);
    const result = await feedbackSubmitter.submit(report, context);
    if (result.ok) {
      setPhase({ state: "sent", url: result.issueUrl });
    } else {
      setPhase({ state: "editing" });
      setError(result.message);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="feedback-title"
      // Esc and backdrop dismissal both funnel through the provider so the
      // context is cleared and the next open starts fresh.
      onClose={close}
      onClick={(event) => {
        if (event.target === dialogRef.current) close();
      }}
    >
      {phase.state === "sent" ? (
        <div className={styles.body}>
          <h2 id="feedback-title" className={styles.title}>
            Thank you
          </h2>
          <p className={styles.sentText}>
            {feedbackSubmitter.kind === "worker"
              ? "Your report has been filed."
              : "GitHub is open in a new tab — press “Submit new issue” there to finish."}
          </p>
          {phase.url && (
            <p className={styles.sentText}>
              <a href={phase.url} target="_blank" rel="noopener noreferrer">
                View the issue
              </a>
            </p>
          )}
          <div className={styles.actions}>
            <button type="button" className={styles.primary} onClick={close}>
              Close
            </button>
          </div>
        </div>
      ) : (
        <form className={styles.body} onSubmit={onSubmit}>
          <h2 id="feedback-title" className={styles.title}>
            {context.articleTitle ? `Feedback on ${context.articleTitle}` : "Send feedback"}
          </h2>

          <p className={styles.notice}>
            Reports are filed as <strong>public</strong> issues on GitHub. Please do not
            include any patient information.
          </p>

          <fieldset className={styles.kinds}>
            <legend className={styles.label}>What kind of feedback is this?</legend>
            {FEEDBACK_KINDS.map((kind) => (
              <label key={kind} className={styles.kind}>
                <input
                  type="radio"
                  name="kind"
                  value={kind}
                  checked={report.kind === kind}
                  onChange={() => setReport((r) => ({ ...r, kind }))}
                />
                <span>{KIND_LABELS[kind]}</span>
              </label>
            ))}
          </fieldset>

          <label className={styles.field}>
            <span className={styles.label}>What did you find?</span>
            <textarea
              ref={messageRef}
              className={styles.textarea}
              value={report.message}
              maxLength={MESSAGE_MAX}
              rows={6}
              required
              placeholder="For a correction, say what the article currently reads and what it should read instead."
              onChange={(event) => setReport((r) => ({ ...r, message: event.target.value }))}
            />
            <span className={styles.counter}>
              {tooShort
                ? `A few more words, please — at least ${MESSAGE_MIN} characters.`
                : `${trimmed.length} / ${MESSAGE_MAX}`}
            </span>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>
              Your name or email <span className={styles.optional}>(optional, public)</span>
            </span>
            <input
              type="text"
              className={styles.input}
              value={report.contact}
              maxLength={120}
              autoComplete="off"
              placeholder="So we can follow up if it needs a conversation"
              onChange={(event) => setReport((r) => ({ ...r, contact: event.target.value }))}
            />
          </label>

          {/* Honeypot: off-screen and hidden from assistive tech, so only a bot fills it. */}
          <div className={styles.honeypot} aria-hidden="true">
            <label>
              Website
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={report.honeypot}
                onChange={(event) => setReport((r) => ({ ...r, honeypot: event.target.value }))}
              />
            </label>
          </div>

          <details className={styles.details}>
            <summary>What gets sent with this</summary>
            <ul>
              {contextSummary(context).map((row) => (
                <li key={row}>{row}</li>
              ))}
            </ul>
          </details>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <div className={styles.actions}>
            <button type="button" className={styles.secondary} onClick={close}>
              Cancel
            </button>
            <button type="submit" className={styles.primary} disabled={!canSend}>
              {phase.state === "sending" ? "Sending…" : "Send feedback"}
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
}
