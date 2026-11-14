import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import styles from "./Editor.module.css";

/**
 * A button that opens a small popover of actions. Closes on Escape, on a click
 * outside, and whenever an item calls the `close` it is handed.
 */
export function Menu({
  label,
  button,
  buttonClassName,
  align = "end",
  children,
}: {
  /** Accessible name; also the tooltip. */
  label: string;
  button: ReactNode;
  buttonClassName?: string;
  align?: "start" | "end";
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <span className={styles.menu} ref={ref} data-open={open || undefined}>
      <button
        type="button"
        className={buttonClassName ?? styles.menuButton}
        aria-label={label}
        title={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {button}
      </button>
      {open && (
        <span className={styles.menuList} role="menu" data-align={align}>
          {children(() => setOpen(false))}
        </span>
      )}
    </span>
  );
}

export function MenuItem({
  onClick,
  disabled,
  danger,
  checked,
  children,
  hint,
}: {
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  /** Renders a tick column; undefined means a plain action. */
  checked?: boolean;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <button
      type="button"
      role={checked === undefined ? "menuitem" : "menuitemcheckbox"}
      aria-checked={checked}
      className={styles.menuItem}
      data-danger={danger || undefined}
      disabled={disabled}
      onClick={onClick}
    >
      {checked !== undefined && <span className={styles.menuTick}>{checked ? "✓" : ""}</span>}
      <span>{children}</span>
      {hint && <span className={styles.menuHint}>{hint}</span>}
    </button>
  );
}

export function MenuDivider() {
  return <span className={styles.menuDivider} role="separator" />;
}
