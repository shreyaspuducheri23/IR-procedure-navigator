import { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArticleIndex } from "@/hooks/useArticle";
import { useSearch, useSearchPassages, type SearchHit } from "@/search/useSearch";
import { getCategory } from "@/content/categories";
import styles from "./SearchBar.module.css";

export function SearchBar() {
  const articles = useArticleIndex();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const listboxId = useId();

  // The body-text index is fetched the first time the box is touched.
  const [searchTouched, setSearchTouched] = useState(false);
  const passages = useSearchPassages(searchTouched);
  const hits = useSearch(articles, passages, query);

  useEffect(() => setActiveIndex(0), [query]);

  // Close when focus or a click lands outside the combobox.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  // "/" focuses search from anywhere, the way most reference tools behave.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      event.preventDefault();
      inputRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function goTo(hit: SearchHit) {
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
    // Deep-link straight to the topic that matched, when the match was in the body.
    const target = hit.passage
      ? `#${hit.passage.sectionId}${hit.passage.subsectionId ? `/${hit.passage.subsectionId}` : ""}`
      : "";
    navigate(`/article/${hit.article.id}${target}`);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (hits.length === 0) return;
      event.preventDefault();
      setOpen(true);
      const delta = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index) => (index + delta + hits.length) % hits.length);
      return;
    }
    if (event.key === "Enter") {
      const hit = hits[activeIndex];
      if (hit) {
        event.preventDefault();
        goTo(hit);
      }
    }
  }

  const showResults = open && query.trim().length > 0;

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.field}>
        <SearchIcon />
        <input
          ref={inputRef}
          type="search"
          className={styles.input}
          placeholder="Search procedures…"
          aria-label="Search procedures"
          role="combobox"
          aria-expanded={showResults}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            showResults && hits[activeIndex] ? `${listboxId}-${activeIndex}` : undefined
          }
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setOpen(true);
            setSearchTouched(true);
          }}
          onKeyDown={onKeyDown}
        />
        {query ? (
          <button
            type="button"
            className={styles.clear}
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
          >
            ×
          </button>
        ) : (
          <kbd className={styles.hint} aria-hidden="true">
            /
          </kbd>
        )}
      </div>

      {showResults && (
        <ul className={styles.results} id={listboxId} role="listbox">
          {hits.length === 0 && (
            <li className={styles.empty}>No procedures match “{query.trim()}”.</li>
          )}
          {hits.map((hit, index) => (
            <li key={hit.article.id} role="none">
              <button
                type="button"
                id={`${listboxId}-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                className={`${styles.result} ${index === activeIndex ? styles.resultActive : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => goTo(hit)}
              >
                <span className={styles.resultTitle}>{hit.article.title}</span>
                <span className={styles.resultMeta}>
                  {getCategory(hit.article.category).label}
                  {hit.passage && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className={styles.resultPath}>
                        {hit.passage.sectionTitle}
                        {hit.passage.subsectionTitle && ` › ${hit.passage.subsectionTitle}`}
                      </span>
                    </>
                  )}
                  {hit.article.status === "draft" && (
                    <span className={styles.draftTag}>Draft</span>
                  )}
                </span>
                {hit.excerpt && (
                  <span className={styles.excerpt}>
                    {hit.excerpt.map((part, partIndex) =>
                      part.match ? (
                        <mark key={partIndex} className={styles.mark}>
                          {part.text}
                        </mark>
                      ) : (
                        <span key={partIndex}>{part.text}</span>
                      ),
                    )}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m16 16 4.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
