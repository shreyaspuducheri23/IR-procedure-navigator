import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const articlesDir = path.join(rootDir, "content", "articles");

const META_ID = "virtual:article-index";
const SEARCH_ID = "virtual:article-search-index";
const VIRTUAL_IDS = [META_ID, SEARCH_ID];
const resolved = (id: string) => "\0" + id;

type IndexEntry = {
  id: string;
  title: string;
  category: string;
  status: string;
  bleedRisk: string | null;
  keywords: string[];
  summary: string;
};

/** One searchable chunk of an article: the text of a section or subsection. */
type Passage = {
  articleId: string;
  sectionId: string;
  sectionTitle: string;
  subsectionId: string | null;
  subsectionTitle: string | null;
  text: string;
};

/**
 * Loose shapes for build-time reading. The real schema lives in
 * src/schema/article.ts and is enforced by `npm run validate:content`; this
 * plugin only needs to walk the JSON, not re-validate it.
 */
type RawBlock = {
  type: string;
  text?: unknown;
  title?: string;
  caption?: string;
  items?: unknown[];
  blocks?: RawBlock[];
  header?: unknown[];
  rows?: unknown[][];
};
type RawSubsection = { id: string; title: string; blocks?: RawBlock[] };
type RawSection = {
  id: string;
  title: string;
  blocks?: RawBlock[];
  subsections?: RawSubsection[];
};
type RawArticle = {
  id: string;
  title: string;
  category: string;
  status: string;
  bleedRisk?: string | null;
  keywords?: string[];
  summary?: string;
  sections?: RawSection[];
};

function readArticles(): RawArticle[] {
  if (!existsSync(articlesDir)) return [];
  const articles: RawArticle[] = [];
  for (const dirent of readdirSync(articlesDir, { withFileTypes: true })) {
    if (!dirent.isDirectory()) continue;
    const file = path.join(articlesDir, dirent.name, "article.json");
    if (!existsSync(file)) continue;
    articles.push(JSON.parse(readFileSync(file, "utf8")) as RawArticle);
  }
  articles.sort((a, b) => a.title.localeCompare(b.title));
  return articles;
}

/** Flattens a rich-text value (string, or array of strings and links) to text. */
function richTextToString(value: unknown): string {
  if (typeof value === "string") return value;
  if (!Array.isArray(value)) return "";
  return value
    .map((part) => {
      if (typeof part === "string") return part;
      const link = (part as { link?: { text?: string } }).link;
      return link?.text ?? "";
    })
    .join("");
}

/** Collects every piece of human-readable text in a block tree. */
function blockText(blocks: RawBlock[] | undefined, out: string[]): void {
  for (const block of blocks ?? []) {
    if (block.title) out.push(block.title);
    if (block.caption) out.push(block.caption);
    switch (block.type) {
      case "paragraph":
        out.push(richTextToString(block.text));
        break;
      case "heading":
        out.push(richTextToString(block.text));
        break;
      case "list":
      case "checklist":
        for (const item of block.items ?? []) out.push(richTextToString(item));
        break;
      case "callout":
        blockText(block.blocks, out);
        break;
      case "table":
        for (const cell of block.header ?? []) out.push(richTextToString(cell));
        for (const row of block.rows ?? []) for (const cell of row) out.push(richTextToString(cell));
        break;
    }
  }
}

function buildPassages(article: RawArticle): Passage[] {
  const passages: Passage[] = [];
  for (const section of article.sections ?? []) {
    const base = {
      articleId: article.id,
      sectionId: section.id,
      sectionTitle: section.title,
    };

    const own: string[] = [];
    blockText(section.blocks, own);
    if (own.length > 0) {
      passages.push({ ...base, subsectionId: null, subsectionTitle: null, text: own.join(" ") });
    }

    for (const sub of section.subsections ?? []) {
      const text: string[] = [];
      blockText(sub.blocks, text);
      passages.push({
        ...base,
        subsectionId: sub.id,
        subsectionTitle: sub.title,
        text: text.join(" "),
      });
    }
  }
  return passages;
}

/**
 * Exposes two build-time indexes over content/articles:
 *
 *   virtual:article-index         metadata only — home grid, instant search
 *   virtual:article-search-index  full body text per section/subsection
 *
 * They are separate modules so the ~100 KB of body text loads lazily, the first
 * time someone actually uses the search box, rather than on every page load.
 * Article bodies themselves stay in their own per-article chunks.
 */
function articleIndexPlugin(): Plugin {
  return {
    name: "ir-article-index",
    resolveId(id) {
      return VIRTUAL_IDS.includes(id) ? resolved(id) : null;
    },
    load(id) {
      if (id === resolved(META_ID)) {
        const entries: IndexEntry[] = readArticles().map((article) => ({
          id: article.id,
          title: article.title,
          category: article.category,
          status: article.status,
          bleedRisk: article.bleedRisk ?? null,
          keywords: article.keywords ?? [],
          summary: article.summary ?? "",
        }));
        return `export const articleIndex = ${JSON.stringify(entries)};`;
      }
      if (id === resolved(SEARCH_ID)) {
        const passages = readArticles().flatMap(buildPassages);
        return `export const articlePassages = ${JSON.stringify(passages)};`;
      }
      return null;
    },
    configureServer(server) {
      server.watcher.add(articlesDir);
      const invalidate = (file: string) => {
        if (!file.startsWith(articlesDir)) return;
        let touched = false;
        for (const id of VIRTUAL_IDS) {
          const mod = server.moduleGraph.getModuleById(resolved(id));
          if (mod) {
            server.moduleGraph.invalidateModule(mod);
            touched = true;
          }
        }
        if (touched) server.ws.send({ type: "full-reload" });
      };
      server.watcher.on("add", invalidate);
      server.watcher.on("change", invalidate);
      server.watcher.on("unlink", invalidate);
    },
  };
}

export default defineConfig({
  // GitHub Pages project site. Combined with hash routing, deep links work
  // without a 404.html redirect shim.
  base: "/IR-procedure-navigator/",
  define: {
    // Stamped into feedback reports so an issue points at the exact build the
    // reader was looking at. GITHUB_SHA is set by Actions; "dev" locally.
    __APP_VERSION__: JSON.stringify(process.env.GITHUB_SHA?.slice(0, 7) ?? "dev"),
  },
  plugins: [react(), articleIndexPlugin()],
  resolve: {
    alias: {
      "@": path.join(rootDir, "src"),
    },
  },
});
