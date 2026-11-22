#!/usr/bin/env node
/**
 * Rewrites every content/articles/<id>/article.json in the exact layout the web
 * editor's Worker writes (`JSON.stringify(article, null, 2)` plus a trailing
 * newline, see worker/src/content.ts). Hand-edited files that drift from that
 * layout would otherwise have their whole layout rewritten by the next web edit,
 * burying the real change in whitespace.
 *
 * Only layout changes: keys, order and values are kept as parsed. A file that is
 * not valid JSON cannot be laid out, so it is reported and the script exits 1.
 *
 *   node scripts/format-content.mjs           rewrite files in place
 *   node scripts/format-content.mjs --check   list files that need it, exit 1 if any
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const articlesDir = path.join(rootDir, "content", "articles");
const check = process.argv.includes("--check");

const changed = [];
const broken = [];

const dirNames = readdirSync(articlesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

for (const dirName of dirNames) {
  const file = path.join(articlesDir, dirName, "article.json");
  if (!existsSync(file)) continue;
  const rel = path.relative(rootDir, file);
  const text = readFileSync(file, "utf8");

  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    broken.push(`${rel}: not valid JSON (${error.message})`);
    continue;
  }

  const formatted = JSON.stringify(data, null, 2) + "\n";
  if (formatted === text) continue;
  changed.push(rel);
  if (!check) writeFileSync(file, formatted);
}

for (const rel of changed) {
  console.log(check ? `needs formatting: ${rel}` : `formatted: ${rel}`);
}
for (const message of broken) console.error(message);

if (broken.length > 0) process.exit(1);
if (check && changed.length > 0) {
  console.error("Run `npm run format:content` to fix.");
  process.exit(1);
}
if (changed.length === 0) console.log("All article.json files are already in editor format.");
