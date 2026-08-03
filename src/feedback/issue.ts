import {
  KIND_ISSUE_LABELS,
  KIND_LABELS,
  type FeedbackContext,
  type FeedbackReport,
} from "./types";

/**
 * Composes the GitHub issue from a report. Pure, and deliberately shared by both
 * submitters, so an issue filed through the Worker is indistinguishable from one
 * filed through the prefilled-link fallback.
 */

const TITLE_MAX = 70;

/** The site the issue should link back to. */
const SITE_ORIGIN = "https://shreyaspuducheri23.github.io/IR-procedure-navigator/";

export const ISSUE_REPO = { owner: "shreyaspuducheri23", repo: "IR-procedure-navigator" };

function firstLine(message: string): string {
  const line = message.trim().split("\n")[0]?.trim() ?? "";
  if (line.length <= TITLE_MAX) return line;
  // Cut at a word boundary so titles don't end mid-word.
  const cut = line.slice(0, TITLE_MAX);
  const space = cut.lastIndexOf(" ");
  return `${space > 30 ? cut.slice(0, space) : cut}…`;
}

const TITLE_PREFIX: Record<FeedbackReport["kind"], string> = {
  correction: "Correction",
  bug: "Bug",
  suggestion: "Suggestion",
};

export function issueTitle(report: FeedbackReport, context: FeedbackContext): string {
  const prefix = `[${TITLE_PREFIX[report.kind]}]`;
  const subject = context.articleTitle ? `${context.articleTitle} — ` : "";
  return `${prefix} ${subject}${firstLine(report.message)}`;
}

export function issueLabels(report: FeedbackReport): string[] {
  return ["feedback", KIND_ISSUE_LABELS[report.kind]];
}

export function issueBody(report: FeedbackReport, context: FeedbackContext): string {
  const lines = [report.message.trim(), ""];

  if (report.contact.trim()) {
    lines.push(`Reported by: ${report.contact.trim()}`, "");
  }

  lines.push("<details><summary>Context</summary>", "");
  if (context.articleTitle && context.articleId) {
    lines.push(
      `- Article: [${context.articleTitle}](${SITE_ORIGIN}${context.route}) \`${context.articleId}\``,
    );
    if (context.articleStatus) lines.push(`- Status: ${context.articleStatus}`);
  } else {
    lines.push(`- Page: ${SITE_ORIGIN}${context.route}`);
  }
  lines.push(
    `- App version: \`${context.appVersion}\``,
    `- Viewport: ${context.viewport}`,
    `- User agent: \`${context.userAgent}\``,
    "",
    "</details>",
    "",
    "_Filed from the in-app feedback form._",
  );

  return lines.join("\n");
}

/**
 * GitHub's prefilled new-issue URL. Used when no Worker endpoint is configured —
 * local development, and any deploy where the Worker is down or unconfigured.
 */
export function prefillUrl(report: FeedbackReport, context: FeedbackContext): string {
  const params = new URLSearchParams({
    title: issueTitle(report, context),
    body: issueBody(report, context),
    labels: issueLabels(report).join(","),
  });
  return `https://github.com/${ISSUE_REPO.owner}/${ISSUE_REPO.repo}/issues/new?${params}`;
}

/** Human-readable summary of the auto-captured context, for the "What gets sent" list. */
export function contextSummary(context: FeedbackContext): string[] {
  const rows = [
    context.articleTitle
      ? `Article: ${context.articleTitle}`
      : `Page: ${context.route.replace(/^#/, "") || "/"}`,
    `Link back to what you were reading: ${context.route}`,
    `App version: ${context.appVersion}`,
    `Screen size: ${context.viewport}`,
    `Browser: ${context.userAgent}`,
  ];
  return rows;
}

export { KIND_LABELS };
