import { useEffect, type RefObject } from "react";

/**
 * Scrolls an element into view when `active` turns true.
 *
 * Two details matter here:
 *  - The scroll is deferred to a macrotask so it lands after the section it
 *    targets has expanded and after any router-driven scrolling on the same
 *    navigation. A timer rather than requestAnimationFrame: rAF does not fire
 *    in a backgrounded tab, which would strand a deep link opened in one.
 *  - The scroll is instant. On arrival at a deep link you want to be at the
 *    target immediately, not watch the page travel there.
 */
export function useScrollIntoViewWhen(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  block: ScrollLogicalPosition = "start",
) {
  useEffect(() => {
    if (!active) return;

    const timer = setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "auto", block });
    }, 0);

    return () => clearTimeout(timer);
  }, [ref, active, block]);
}
