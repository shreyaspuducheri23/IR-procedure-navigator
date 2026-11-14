#!/usr/bin/env node
/**
 * Validates every content/articles/<id>/article.json against the zod schema in
 * src/schema/article.ts, plus the cross-file invariants in src/schema/validate.ts
 * (folder name matches id, internal links resolve, image files exist).
 *
 * Relies on Node's built-in TypeScript type stripping to import the schema
 * directly, so the schema is never duplicated. Requires Node >= 22.18.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { articleSchema } from "../src/schema/article.ts";
import { unknownFields, validateArticle } from "../src/schema/validate.ts";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const articlesDir = path.join(rootDir, "content", "articles");

function main() {
  if (!existsSync(articlesDir)) {
    console.error(`No content directory at ${articlesDir}`);
    process.exit(1);
  }

  const errors = [];
  /** @type {{ dirName: string, rel: string, article: import("../src/schema/article.ts").Article }[]} */
  const parsedArticles = [];

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

    for (const field of unknownFields(raw, parsed.data)) {
      errors.push(`${rel}: ${field} — field is not in the schema`);
    }

    parsedArticles.push({ dirName, rel, article: parsed.data });
  }

  // Cross-file checks run once every article id is known, so internal links can
  // be resolved. The rules themselves live in src/schema/validate.ts, shared
  // with the in-site editor and its Worker.
  const knownArticleIds = new Set(parsedArticles.map(({ article }) => article.id));
  for (const { dirName, rel, article } of parsedArticles) {
    const problems = validateArticle(article, {
      folderId: dirName,
      knownArticleIds,
      imageExists: (src) => existsSync(path.join(articlesDir, dirName, src)),
    });
    for (const problem of problems) errors.push(`${rel}: ${problem}`);
  }

  const articles = parsedArticles.map(({ article }) => article);

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
