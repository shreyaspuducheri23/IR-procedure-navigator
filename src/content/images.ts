/**
 * Article images live beside their article (content/articles/<id>/images/...) and
 * are referenced relatively from the JSON. Vite hashes them at build time; this
 * maps the JSON's relative `src` onto the emitted URL.
 */
import { publishedArticle } from "./published";

const imageUrls = import.meta.glob<string>("/content/articles/*/images/*", {
  eager: true,
  query: "?url",
  import: "default",
});

export function bundledImage(articleId: string, src: string): string | null {
  return imageUrls[`/content/articles/${articleId}/${src}`] ?? null;
}

const contentRepo = import.meta.env.VITE_CONTENT_REPO?.trim();

/**
 * Where an image lives in the repository itself. Used for images published
 * from the in-site editor that the running build does not contain yet.
 */
export function repositoryImage(articleId: string, src: string): string | null {
  if (!contentRepo) return null;
  return `https://raw.githubusercontent.com/${contentRepo}/main/content/articles/${articleId}/${src}`;
}

export function resolveImage(articleId: string, src: string): string | null {
  return (
    bundledImage(articleId, src) ??
    // Only for an article this tab just published: otherwise a missing image
    // should stay visibly missing rather than become a broken request.
    (publishedArticle(articleId) ? repositoryImage(articleId, src) : null)
  );
}
