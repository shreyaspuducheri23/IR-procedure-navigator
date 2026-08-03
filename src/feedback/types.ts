/** What the reader is telling us. Drives the issue label and title prefix. */
export const FEEDBACK_KINDS = ["correction", "bug", "suggestion"] as const;
export type FeedbackKind = (typeof FEEDBACK_KINDS)[number];

export const KIND_LABELS: Record<FeedbackKind, string> = {
  correction: "Content correction",
  bug: "Bug or display problem",
  suggestion: "Suggestion",
};

/** GitHub label applied alongside the shared "feedback" label. */
export const KIND_ISSUE_LABELS: Record<FeedbackKind, string> = {
  correction: "content-correction",
  bug: "bug",
  suggestion: "suggestion",
};

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 4000;

/** What the reader typed. */
export type FeedbackReport = {
  kind: FeedbackKind;
  message: string;
  /** Optional, so we can follow up. Goes into a public issue — the form says so. */
  contact: string;
  /**
   * Hidden field, always empty for a human. Anything here means a bot filled the
   * form in, and the submission is dropped.
   */
  honeypot: string;
};

/**
 * What the app knows without asking. Collected at the moment the dialog opens and
 * shown to the reader before they send, under "What gets sent".
 */
export type FeedbackContext = {
  articleId: string | null;
  articleTitle: string | null;
  articleStatus: string | null;
  /** Route at the time of the report, e.g. "#/article/kidney-biopsy#pre/labs". */
  route: string;
  appVersion: string;
  userAgent: string;
  viewport: string;
};

export function emptyReport(): FeedbackReport {
  return { kind: "correction", message: "", contact: "", honeypot: "" };
}

/** Reads the ambient context. Call it when the dialog opens, not at module load. */
export function captureContext(article?: {
  id: string;
  title: string;
  status: string;
}): FeedbackContext {
  return {
    articleId: article?.id ?? null,
    articleTitle: article?.title ?? null,
    articleStatus: article?.status ?? null,
    route: window.location.hash || "#/",
    appVersion: __APP_VERSION__,
    userAgent: navigator.userAgent,
    viewport: `${window.innerWidth}×${window.innerHeight}`,
  };
}
