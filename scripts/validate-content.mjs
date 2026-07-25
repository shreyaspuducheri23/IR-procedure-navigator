#!/usr/bin/env node
/**
 * Validates every content/articles/<id>/article.json against the zod schema in
 * src/schema/article.ts, plus cross-file invariants the schema can't see
 * (folder name matches id, internal links resolve, image files exist).
 *
 * Relies on Node's built-in TypeScript type stripping to import the schema
 * directly, so the schema is never duplicated. Requires Node >= 22.18.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { articleSchema } from "../src/schema/article.ts";
import { CATEGORY_IDS } from "../src/content/categories.ts";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const articlesDir = path.join(rootDir, "content", "articles");

/** Walks a block tree, yielding every block including those nested in callouts. */
function* walkBlocks(blocks) {
  for (const block of blocks ?? []) {
    yield block;
    if (block.type === "callout") yield* walkBlocks(block.blocks);
  }
}

function* walkArticleBlocks(article) {
  for (const section of article.sections) {
    yield* walkBlocks(section.blocks);
    for (const sub of section.subsections ?? []) yield* walkBlocks(sub.blocks);
  }
}

/** Yields every link object reachable from an article's rich text. */
function* walkLinks(article) {
  const fromRichText = function* (rich) {
    if (typeof rich === "string" || !Array.isArray(rich)) return;
    for (const part of rich) {
      if (typeof part === "object" && part !== null && "link" in part) yield part.link;
    }
  };
  for (const block of walkArticleBlocks(article)) {
    if (block.type === "paragraph") yield* fromRichText(block.text);
    if (block.type === "list" || block.type === "checklist") {
      for (const item of block.items) yield* fromRichText(item);
    }
    if (block.type === "table") {
      for (const cell of block.header) yield* fromRichText(cell);
      for (const row of block.rows) for (const cell of row) yield* fromRichText(cell);
    }
  }
}

function main() {
  if (!existsSync(articlesDir)) {
    console.error(`No content directory at ${articlesDir}`);
    process.exit(1);
  }

  const errors = [];
  const articles = [];

  const dirNames = readdirSync(articlesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  for (const dirName of dirNames) {
    const file = path.join(articlesDir, dirName, "article.json");
    const rel = path.relative(rootDir, file);
    if (!existsSync(file)) {
      errors.push(`${dirName}/: missing article.json`);
      continue;
    }

    let raw;
    try {
      raw = JSON.parse(readFileSync(file, "utf8"));
    } catch (err) {
      errors.push(`${rel}: invalid JSON — ${err.message}`);
      continue;
    }

    const parsed = articleSchema.safeParse(raw);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        errors.push(`${rel}: ${issue.path.join(".") || "<root>"} — ${issue.message}`);
      }
      continue;
    }

    const article = parsed.data;
    if (article.id !== dirName) {
      errors.push(`${rel}: id "${article.id}" does not match folder "${dirName}"`);
    }
    if (!CATEGORY_IDS.includes(article.category)) {
      errors.push(`${rel}: unknown category "${article.category}"`);
    }

    const sectionIds = new Set(article.sections.map((s) => s.id));
    if (sectionIds.size !== article.sections.length) {
      errors.push(`${rel}: duplicate section ids`);
    }
    for (const section of article.sections) {
      const subIds = new Set((section.subsections ?? []).map((s) => s.id));
      if (subIds.size !== (section.subsections ?? []).length) {
        errors.push(`${rel}: duplicate subsection ids in section "${section.id}"`);
      }
    }

    for (const block of walkArticleBlocks(article)) {
      if (block.type !== "image") continue;
      const imagePath = path.join(articlesDir, dirName, block.src);
      if (!existsSync(imagePath)) {
        errors.push(`${rel}: image not found — ${block.src}`);
      }
    }

    articles.push(article);
  }

  // Cross-article link resolution, once every article id is known.
  const knownIds = new Set(articles.map((a) => a.id));
  for (const article of articles) {
    for (const link of walkLinks(article)) {
      if ("articleId" in link && !knownIds.has(link.articleId)) {
        errors.push(`${article.id}: internal link to unknown article "${link.articleId}"`);
      }
    }
  }

  if (errors.length > 0) {
    console.error(`\n✗ Content validation failed (${errors.length} problem(s)):\n`);
    for (const error of errors) console.error(`  ${error}`);
    console.error("");
    process.exit(1);
  }

  const drafts = articles.filter((a) => a.status === "draft").length;
  console.log(
    `✓ ${articles.length} article(s) valid — ${articles.length - drafts} complete, ${drafts} draft`,
  );
}

main();
