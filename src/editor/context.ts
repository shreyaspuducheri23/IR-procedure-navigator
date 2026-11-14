import { createContext, useContext } from "react";

/** What block editors need from the page that hosts them. */
export type EditorContextValue = {
  articleId: string;
  /** URL to display an image block, including images picked but not yet published. */
  resolveImage: (src: string) => string | null;
  /** Prepares a picked file for upload and returns the `src` to store in the block. */
  addImage: (file: File) => Promise<{ src: string } | { error: string }>;
};

export const EditorContext = createContext<EditorContextValue | null>(null);

export function useEditorContext(): EditorContextValue {
  const value = useContext(EditorContext);
  if (!value) throw new Error("Editor components must render inside EditorContext.");
  return value;
}
