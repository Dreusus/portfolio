'use client';

import { useCallback, useState } from 'react';

export interface BugHunter {
  active: boolean;
  found: Set<string>;
  total: number;
  /** increments on every arming, lets consumers reset per-session state */
  session: number;
  toggle: () => void;
  catchBug: (id: string) => void;
  complete: boolean;
}

export const useBugHunter = (total = 5): BugHunter => {
  const [active, setActive] = useState(false);
  const [session, setSession] = useState(0);
  const [found, setFound] = useState<Set<string>>(new Set());

  const toggle = useCallback(() => {
    setActive((a) => !a);
    setSession((s) => s + 1);
    setFound(new Set());
  }, []);

  const catchBug = useCallback((id: string) => {
    setFound((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  return { active, found, total, session, toggle, catchBug, complete: found.size === total };
};
