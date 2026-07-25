import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scroll handling for the app, in place of react-router's ScrollRestoration.
 *
 * We need exactly two behaviours, and we need them in a predictable order:
 *  - navigating to a new page starts at the top;
 *  - navigating to a deep link (#pre, #pre/labs) leaves the scroll alone, so the
 *    targeted section can bring itself into view once it has expanded.
 *
 * ScrollRestoration can't express the second case: it resets the position on the
 * same navigation that carried the deep link, overriding the target's own scroll.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
