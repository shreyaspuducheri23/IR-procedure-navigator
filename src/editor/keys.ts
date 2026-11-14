import { useRef } from "react";

let nextKey = 0;

/**
 * Stable React keys for an array of plain values that have no ids of their own
 * (blocks, list rows). The caller mirrors every insert/remove/move it performs;
 * if the array changes length some other way (undo, an external reset) the keys
 * are regenerated, which only costs a re-mount.
 *
 * Stable keys are what keep the caret in place: without them, inserting a row
 * would hand the focused DOM node a different row's text.
 */
export function useStableKeys(length: number) {
  const ref = useRef<number[]>([]);
  if (ref.current.length !== length) {
    ref.current = Array.from({ length }, () => nextKey++);
  }
  return {
    /** Reads the live array, so it is correct straight after an insert or remove. */
    at: (index: number) => ref.current[index]!,
    insert(index: number, count = 1) {
      const fresh = Array.from({ length: count }, () => nextKey++);
      ref.current = [...ref.current.slice(0, index), ...fresh, ...ref.current.slice(index)];
      return fresh[0]!;
    },
    remove(index: number) {
      ref.current = ref.current.filter((_, i) => i !== index);
    },
    move(from: number, to: number) {
      const next = [...ref.current];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved!);
      ref.current = next;
    },
  };
}

export function moveItem<T>(items: readonly T[], from: number, to: number): T[] {
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved!);
  return next;
}
