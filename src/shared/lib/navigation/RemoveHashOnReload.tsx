'use client';
import { useEffect } from 'react';

export const RemoveHashOnReload = () => {
  useEffect(() => {
    const isReload = performance
      .getEntriesByType('navigation')
      .map((nav) => (nav as PerformanceNavigationTiming).type)
      .includes('reload');

    if (isReload && window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  return null;
};
