import { useFeedback } from "@/feedback/FeedbackContext";
import styles from "./FeedbackButton.module.css";

type Props = {
  /** Present on an article page, so the report carries which article it is about. */
  article?: { id: string; title: string; status: string };
  variant?: "button" | "link";
  children?: string;
};

export function FeedbackButton({ article, variant = "button", children }: Props) {
  const { open } = useFeedback();
  return (
    <button
      type="button"
      className={variant === "link" ? styles.link : styles.button}
      onClick={() => open(article)}
    >
      {variant === "button" && <PencilIcon />}
      <span>{children ?? "Suggest a correction"}</span>
    </button>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false">
      <path
        d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
