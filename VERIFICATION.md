# Anticoagulation restoration verification

## Header revision

Updated per user feedback: removed the parent sidebar and procedure-card list.
The table now uses the shared AppHeader, search, footer, breadcrumbs, and article
title styles. The production build passes and browser verification confirms the
shared header, no procedure-card list, and all 36 table rows. The earlier visual
comparison below describes the initial restoration before this header revision.


Verified locally on September 15, 2026. Nothing was pushed or published.

## Baselines

- Fork main: c950dfaaa91f5b674b281d9bb2ecc6552df55aa4.
- Parent: 3832590521d3faa400fc5a781f7477ed82d886e9.
- 36 procedures and 11 medications; exact hold, restart, and note parity across
  four renal-function bands and two enoxaparin doses (3,168 comparisons).

## Automated checks

- `npm test`: 26 passed, including pinned parent parity and migration regression.
- `npm run validate:content`: all 57 articles valid.
- `npm run typecheck`: passed.
- `npm run build`: passed; production output served under `/IR-procedure-navigator/`.
- `git diff --check`: passed.

## Browser checks

- Compared parent and restored screenshots at 1440×1000, 768×1024, and 390×844.
- Risk filters: 17 low, 13 high, 5 conditional, 1 review; 36 total.
- Combined kidney search and high-risk filter: one result; low-risk filter: zero.
- Keyboard activation updates selected recommendation; renal-function/dose changes
  reset selection and update medication cells.
- At bottom-right of the scrolled table, procedure column and column heading
  remain sticky relative to the table viewport.
- Sidebar search and link to Kidney Biopsy, browser back/forward, and the procedure’s
  existing “Open anticoagulation table” link work.
- Existing `#high-risk-restart` supplementary deep link opens its target section.
- No browser warning/error logs during the final local navigation check.
- Mobile fixes prevent sidebar safety-note overlap, clipped filter labels, and
  long supplementary source URLs from overflowing the document (375px content
  width inside the 390px viewport, including its scrollbar).

## Maintenance and limits

The parent-style layout is limited to the anticoagulation page. Its sidebar uses
this fork’s complete-article catalog. Clinical text remains the parent baseline;
these tests establish restoration fidelity, not a new clinical guideline review.
The frozen fixture is test-only; the app does not fetch or execute parent code.

Preview: http://127.0.0.1:4173/IR-procedure-navigator/#/article/anticoagulation-table

Restart: `npm run build` then `npm run preview -- --host 127.0.0.1 --port 4173`.
