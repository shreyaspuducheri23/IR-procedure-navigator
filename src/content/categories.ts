/**
 * The canonical category list. Order here is the order categories appear in the
 * home filter row and the grouping of search results.
 *
 * `accent` is a hue token consumed by CSS (`--accent-<accent>` in tokens.css),
 * not a raw colour, so the palette stays in one place.
 */
export type Category = {
  id: string;
  label: string;
  /** Short blurb shown under the category heading on the home page. */
  blurb: string;
  accent: "blue" | "violet" | "teal" | "amber" | "cyan" | "rose" | "slate";
};

export const CATEGORIES: Category[] = [
  {
    id: "ir-procedure",
    label: "IR procedure",
    blurb: "General interventional procedures",
    accent: "blue",
  },
  {
    id: "vascular-intervention",
    label: "Vascular intervention",
    blurb: "Angiography, embolization, and vascular therapy",
    accent: "rose",
  },
  {
    id: "biopsy-ablation",
    label: "Biopsy / ablation",
    blurb: "Tissue sampling and thermal ablation",
    accent: "violet",
  },
  {
    id: "drain-tube",
    label: "Drain / tube procedure",
    blurb: "Catheter and tube placement, exchange, and removal",
    accent: "amber",
  },
  {
    id: "vascular-access",
    label: "Central venous / vascular access",
    blurb: "Ports, PICCs, and tunnelled catheters",
    accent: "cyan",
  },
  {
    id: "fluid-drainage",
    label: "Fluid drainage",
    blurb: "Paracentesis, thoracentesis, and collections",
    accent: "teal",
  },
  {
    id: "reference",
    label: "Reference",
    blurb: "Cross-cutting checklists and tables",
    accent: "slate",
  },
];

export const CATEGORY_IDS: string[] = CATEGORIES.map((c) => c.id);

const CATEGORY_BY_ID = new Map(CATEGORIES.map((c) => [c.id, c]));

const FALLBACK_CATEGORY: Category = {
  id: "reference",
  label: "Uncategorised",
  blurb: "",
  accent: "slate",
};

export function getCategory(id: string): Category {
  return CATEGORY_BY_ID.get(id) ?? { ...FALLBACK_CATEGORY, id };
}
