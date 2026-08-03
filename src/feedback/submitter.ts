import { issueBody, issueLabels, issueTitle, prefillUrl } from "./issue";
import type { FeedbackContext, FeedbackReport } from "./types";

/**
 * How a report reaches GitHub. Two implementations, chosen at module load:
 *
 *   worker  the Cloudflare Worker creates the issue with its own token, so the
 *           reader never needs a GitHub account. This is the live path.
 *   link    GitHub's prefilled new-issue page, opened in a new tab. Used when no
 *           endpoint is configured — local development, and any deploy where the
 *           Worker is undeployed or its token has lapsed.
 *
 * Same seam as ContentSource in src/content/source.ts: components call the
 * interface and never learn which one is behind it.
 */
export interface FeedbackSubmitter {
  /** Why this matters to the UI: only "worker" can report a created issue URL. */
  readonly kind: "worker" | "link";
  submit(report: FeedbackReport, context: FeedbackContext): Promise<SubmitResult>;
}

export type SubmitResult =
  | { ok: true; issueUrl: string | null }
  | { ok: false; message: string };

const endpoint = import.meta.env.VITE_FEEDBACK_ENDPOINT?.trim();

const linkSubmitter: FeedbackSubmitter = {
  kind: "link",
  async submit(report, context) {
    const url = prefillUrl(report, context);
    // GitHub caps the query string; well past anything the form allows, but a
    // pasted wall of text should degrade to "open the form" rather than a 414.
    if (url.length > 7500) {
      return {
        ok: false,
        message: "That report is too long to hand off to GitHub. Please shorten it.",
      };
    }
    window.open(url, "_blank", "noopener,noreferrer");
    return { ok: true, issueUrl: null };
  },
};

function workerSubmitter(url: string): FeedbackSubmitter {
  return {
    kind: "worker",
    async submit(report, context) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            kind: report.kind,
            message: report.message.trim(),
            contact: report.contact.trim(),
            honeypot: report.honeypot,
            title: issueTitle(report, context),
            body: issueBody(report, context),
            labels: issueLabels(report),
          }),
        });
        const data = (await response.json().catch(() => null)) as {
          ok?: boolean;
          url?: string;
          error?: string;
        } | null;

        if (!response.ok || !data?.ok) {
          return { ok: false, message: data?.error ?? "Could not reach the feedback service." };
        }
        return { ok: true, issueUrl: data.url ?? null };
      } catch {
        return {
          ok: false,
          message: "Could not reach the feedback service. Check your connection and try again.",
        };
      }
    },
  };
}

export const feedbackSubmitter: FeedbackSubmitter = endpoint
  ? workerSubmitter(endpoint)
  : linkSubmitter;
