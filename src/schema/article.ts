import { z } from "zod";

/**
 * The article schema is the single source of truth for content shape. It backs:
 *   - runtime parsing in the app (src/content/source.ts)
 *   - CI validation (scripts/validate-content.mjs)
 *   - the migration script's output check (scripts/migrate.mjs)
 *   - a future editor UI (forms can be generated from these unions)
 *
 * Design notes: blocks are a flat, discriminated-union array so an editor can
 * add/remove/reorder them without tree surgery, and the whole document is
 * plain JSON so it can later move into a database column unchanged.
 */

export const SCHEMA_VERSION = 1;

// ---------------------------------------------------------------------------
// Inline rich text
// ---------------------------------------------------------------------------

/** Link to another article in this app; optionally deep-links to a section. */
export const internalLinkSchema = z.object({
  text: z.string().min(1),
  articleId: z.string().min(1),
  sectionId: z.string().min(1).optional(),
});

/** Link to an external resource. */
export const externalLinkSchema = z.object({
  text: z.string().min(1),
  href: z.string().min(1),
});

export const inlinePartSchema = z.union([
  z.string(),
  z.object({ link: z.union([internalLinkSchema, externalLinkSchema]) }),
]);

/**
 * A plain string covers the common case; use the array form only when a run of
 * text embeds a link.
 */
export const richTextSchema = z.union([z.string(), z.array(inlinePartSchema)]);

// ---------------------------------------------------------------------------
// Blocks
// ---------------------------------------------------------------------------

export const CALLOUT_VARIANTS = ["caution", "contraindication", "pearl", "note"] as const;
export const calloutVariantSchema = z.enum(CALLOUT_VARIANTS);

const paragraphBlockSchema = z.object({
  type: z.literal("paragraph"),
  text: richTextSchema,
});

/** A labelled group inside a subsection. Renders below the subsection title. */
const headingBlockSchema = z.object({
  type: z.literal("heading"),
  text: z.string().min(1),
});

const listBlockSchema = z.object({
  type: z.literal("list"),
  ordered: z.boolean().optional(),
  items: z.array(richTextSchema),
});

/** Rendered as tickable checkboxes; tick state is ephemeral, never persisted. */
const checklistBlockSchema = z.object({
  type: z.literal("checklist"),
  title: z.string().optional(),
  items: z.array(richTextSchema),
});

const imageBlockSchema = z.object({
  type: z.literal("image"),
  /** Path relative to the article folder, e.g. "images/site-selection.png". */
  src: z.string().min(1),
  alt: z.string(),
  caption: z.string().optional(),
});

const tableBlockSchema = z.object({
  type: z.literal("table"),
  caption: z.string().optional(),
  header: z.array(richTextSchema),
  rows: z.array(z.array(richTextSchema)),
});

export type Block =
  | z.infer<typeof paragraphBlockSchema>
  | z.infer<typeof headingBlockSchema>
  | z.infer<typeof listBlockSchema>
  | z.infer<typeof checklistBlockSchema>
  | z.infer<typeof imageBlockSchema>
  | z.infer<typeof tableBlockSchema>
  | CalloutBlock;

/** Callouts nest blocks, so the type is recursive and needs an explicit annotation. */
export type CalloutBlock = {
  type: "callout";
  variant: (typeof CALLOUT_VARIANTS)[number];
  title?: string;
  blocks: Block[];
};

// Callouts nest blocks, so the inner array defers to `blockSchema` via z.lazy.
// The callout itself stays a plain ZodObject so it can take part in the
// discriminated union below.
const calloutBlockSchema = z.object({
  type: z.literal("callout"),
  variant: calloutVariantSchema,
  title: z.string().optional(),
  blocks: z.array(z.lazy((): z.ZodType<Block> => blockSchema)),
});

export const blockSchema: z.ZodType<Block> = z.discriminatedUnion("type", [
  paragraphBlockSchema,
  headingBlockSchema,
  listBlockSchema,
  checklistBlockSchema,
  imageBlockSchema,
  tableBlockSchema,
  calloutBlockSchema,
]);

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

/**
 * `kind` drives the phase bar's colour and the canonical ordering of an
 * article. `custom` exists for reference pages that have no procedural phases.
 */
export const SECTION_KINDS = [
  "overview",
  "pre",
  "intra",
  "post",
  "references",
  "custom",
] as const;
export const sectionKindSchema = z.enum(SECTION_KINDS);

const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9][a-z0-9-]*$/, "must be a lowercase kebab-case slug");

export const subsectionSchema = z.object({
  id: slugSchema,
  title: z.string().min(1),
  /** Open on first render. Defaults to false (collapsed). */
  defaultOpen: z.boolean().optional(),
  blocks: z.array(blockSchema),
});

export const sectionSchema = z.object({
  id: slugSchema,
  kind: sectionKindSchema,
  title: z.string().min(1),
  /** Blocks rendered directly under the phase bar, above any subsections. */
  blocks: z.array(blockSchema).optional(),
  subsections: z.array(subsectionSchema).optional(),
});

// ---------------------------------------------------------------------------
// Article
// ---------------------------------------------------------------------------

export const BLEED_RISKS = ["low", "high"] as const;
export const ARTICLE_STATUSES = ["complete", "draft"] as const;

export const articleSchema = z.object({
  schemaVersion: z.literal(SCHEMA_VERSION),
  /** Matches the containing folder name and the /article/:id route param. */
  id: slugSchema,
  title: z.string().min(1),
  /** Category slug; labels and colours live in src/content/categories.ts. */
  category: slugSchema,
  status: z.enum(ARTICLE_STATUSES),
  bleedRisk: z.enum(BLEED_RISKS).nullable(),
  keywords: z.array(z.string()),
  summary: z.string(),
  /** ISO date (YYYY-MM-DD) or null when unknown. */
  lastReviewed: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "must be an ISO date (YYYY-MM-DD)")
    .nullable(),
  /** Where the content came from; shown in the article footer. */
  provenance: z.array(z.string()),
  /** Outstanding editorial checks; shown as an "under review" footer callout. */
  reviewNotes: z.array(z.string()),
  sections: z.array(sectionSchema),
});

export type InternalLink = z.infer<typeof internalLinkSchema>;
export type ExternalLink = z.infer<typeof externalLinkSchema>;
export type InlinePart = z.infer<typeof inlinePartSchema>;
export type RichText = z.infer<typeof richTextSchema>;
export type CalloutVariant = (typeof CALLOUT_VARIANTS)[number];
export type Subsection = z.infer<typeof subsectionSchema>;
export type Section = z.infer<typeof sectionSchema>;
export type SectionKind = (typeof SECTION_KINDS)[number];
export type Article = z.infer<typeof articleSchema>;
export type BleedRisk = (typeof BLEED_RISKS)[number];
export type ArticleStatus = (typeof ARTICLE_STATUSES)[number];

/** Metadata subset produced by the `virtual:article-index` build plugin. */
export type ArticleMeta = {
  id: string;
  title: string;
  category: string;
  status: ArticleStatus;
  bleedRisk: BleedRisk | null;
  keywords: string[];
  summary: string;
};

/**
 * One searchable chunk of an article — the flattened text of a section or one
 * of its subsections. Produced by the `virtual:article-search-index` build
 * plugin and loaded lazily, so full-text search costs nothing until it is used.
 */
export type ArticlePassage = {
  articleId: string;
  sectionId: string;
  sectionTitle: string;
  subsectionId: string | null;
  subsectionTitle: string | null;
  text: string;
};

export function isInternalLink(link: InternalLink | ExternalLink): link is InternalLink {
  return "articleId" in link;
}
