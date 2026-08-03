import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { captureContext, type FeedbackContext } from "./types";

type ArticleRef = { id: string; title: string; status: string };

type FeedbackControls = {
  /** Null while closed; the captured context while open. */
  context: FeedbackContext | null;
  open(article?: ArticleRef): void;
  close(): void;
};

const Controls = createContext<FeedbackControls | null>(null);

/**
 * Holds the open/closed state so the dialog can be mounted once, at the layout
 * level, rather than once per trigger. Context is captured on open, not on
 * render, so it reflects where the reader actually was when they clicked.
 */
export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [context, setContext] = useState<FeedbackContext | null>(null);

  const open = useCallback((article?: ArticleRef) => setContext(captureContext(article)), []);
  const close = useCallback(() => setContext(null), []);

  const value = useMemo(() => ({ context, open, close }), [context, open, close]);
  return <Controls.Provider value={value}>{children}</Controls.Provider>;
}

export function useFeedback(): FeedbackControls {
  const controls = useContext(Controls);
  if (!controls) throw new Error("useFeedback must be used inside <FeedbackProvider>");
  return controls;
}
