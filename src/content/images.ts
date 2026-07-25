/**
 * Article images live beside their article (content/articles/<id>/images/...) and
 * are referenced relatively from the JSON. Vite hashes them at build time; this
 * maps the JSON's relative `src` onto the emitted URL.
 */
const imageUrls = import.meta.glob<string>("/content/articles/*/images/*", {
  eager: true,
  query: "?url",
  import: "default",
});

export function resolveImage(articleId: string, src: string): string | null {
  return imageUrls[`/content/articles/${articleId}/${src}`] ?? null;
}
