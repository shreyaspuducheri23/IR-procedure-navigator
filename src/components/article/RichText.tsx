import { Link } from "react-router-dom";
import { isInternalLink, type RichText as RichTextValue } from "@/schema/article";
import { staticContentSource } from "@/content/source";

const knownArticleIds = new Set(staticContentSource.listArticles().map((a) => a.id));

/**
 * Renders a schema rich-text value: a plain string, or a sequence of strings,
 * emphasized text, and links. Internal links stay inside the router; external
 * ones open in a new tab.
 */
export function RichText({ value }: { value: RichTextValue }) {
  if (typeof value === "string") return <>{value}</>;

  return (
    <>
      {value.map((part, index) => {
        if (typeof part === "string") return <span key={index}>{part}</span>;
        if ("strong" in part) return <strong key={index}>{part.strong}</strong>;

        const { link } = part;
        if (isInternalLink(link)) {
          // A link to content that no longer exists degrades to plain text
          // rather than a dead end. Validation catches these before release.
          if (!knownArticleIds.has(link.articleId)) return <span key={index}>{link.text}</span>;
          const to = link.sectionId
            ? `/article/${link.articleId}#${link.sectionId}`
            : `/article/${link.articleId}`;
          return (
            <Link key={index} to={to}>
              {link.text}
            </Link>
          );
        }

        return (
          <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
            {link.text}
          </a>
        );
      })}
    </>
  );
}
