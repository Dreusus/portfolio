'use client';

import { useCallback, useState } from 'react';

export interface BugHunter {
  active: boolean;
  found: Set<string>;
  total: number;
  toggle: () => void;
  catchBug: (id: string) => void;
  complete: boolean;
}

export const useBugHunter = (total = 5): BugHunter => {
  const [active, setActive] = useState(false);
  const [found, setFound] = useState<Set<string>>(new Set());

  const toggle = useCallback(() => {
    setActive((a) => !a);
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

  return { active, found, total, toggle, catchBug, complete: found.size === total };
};
