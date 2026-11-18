import { useCallback, useRef, useState } from "react";

type History<T> = { past: T[]; present: T; future: T[] };

const LIMIT = 100;
/** Changes closer together than this are one undo step (a burst of typing). */
const COALESCE_MS = 800;

/** Undo/redo over immutable snapshots. Cheap, because edits share structure. */
export function useHistory<T>(initial: T) {
  const [state, setState] = useState<History<T>>({ past: [], present: initial, future: [] });
  const lastChange = useRef(0);

  const set = useCallback((next: T) => {
    setState((current) => {
      if (next === current.present) return current;
      const now = Date.now();
      const coalesce = current.past.length > 0 && now - lastChange.current < COALESCE_MS;
      lastChange.current = now;
      return {
        past: coalesce ? current.past : [...current.past.slice(-(LIMIT - 1)), current.present],
        present: next,
        future: [],
      };
    });
  }, []);

  const undo = useCallback(() => {
    lastChange.current = 0;
    setState((current) => {
      const previous = current.past[current.past.length - 1];
      if (previous === undefined) return current;
      return {
        past: current.past.slice(0, -1),
        present: previous,
        future: [current.present, ...current.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    lastChange.current = 0;
    setState((current) => {
      const [next, ...rest] = current.future;
      if (next === undefined) return current;
      return { past: [...current.past, current.present], present: next, future: rest };
    });
  }, []);

  /** Replaces everything, e.g. after loading or publishing. Not undoable. */
  const reset = useCallback((value: T) => {
    lastChange.current = 0;
    setState({ past: [], present: value, future: [] });
  }, []);

  return {
    value: state.present,
    set,
    undo,
    redo,
    reset,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
  };
}
