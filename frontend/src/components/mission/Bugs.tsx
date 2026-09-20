'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from '@/data/i18n';
import { useMission } from './MissionContext';

const BugGlyph: React.FC<{ squashed: boolean }> = ({ squashed }) => (
  <svg viewBox='0 0 24 24' width='28' height='28' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round'>
    <ellipse cx='12' cy='13' rx='5' ry='6' fill={squashed ? 'currentColor' : 'rgba(239,68,68,0.25)'} />
    <path d='M12 7V4 M9 5l3 2 3-2' />
    <path d='M7 10L3 9 M7 13H3 M7 16l-4 1' />
    <path d='M17 10l4-1 M17 13h4 M17 16l4 1' />
    <path d='M12 8v10 M9.5 11h5 M9.5 14h5' />
  </svg>
);

const rnd = (min: number, max: number) => min + Math.random() * (max - min);

const Crawler: React.FC<{ id: string; seed: number }> = ({ id, seed }) => {
  const { hunter, reduced } = useMission();
  const caught = hunter.found.has(id);
  const [run, setRun] = useState(0);

  // a fresh random path each time `run` changes (also when the pointer gets close)
  const path = useMemo(() => {
    const vw = typeof window === 'undefined' ? 1200 : window.innerWidth;
    const vh = typeof window === 'undefined' ? 800 : window.innerHeight;
    const pts = Array.from({ length: 4 }, () => ({ x: rnd(20, vw - 60), y: rnd(90, vh - 90) }));
    return {
      x: pts.map((p) => p.x),
      y: pts.map((p) => p.y),
      rotate: pts.map(() => rnd(-40, 40)),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run, seed]);

  const duration = reduced ? 0 : rnd(7, 12);

  return (
    <motion.button
      type='button'
      aria-label='bug'
      onClick={(e) => {
        e.stopPropagation();
        hunter.catchBug(id);
      }}
      onPointerEnter={() => {
        if (!caught && !reduced) setRun((r) => r + 1); // flee
      }}
      className='fixed left-0 top-0 z-[85] text-bug drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]'
      style={{ cursor: caught ? 'default' : 'crosshair' }}
      initial={{ x: path.x[0], y: path.y[0], opacity: 0, scale: 0.6 }}
      animate={
        caught
          ? { scaleY: 0.25, scaleX: 1.3, opacity: 0, y: path.y[0] + 160, transition: { duration: 0.7 } }
          : reduced
            ? { x: path.x[0], y: path.y[0], opacity: 1, scale: 1 }
            : { x: path.x, y: path.y, rotate: path.rotate, opacity: 1, scale: 1, transition: { duration, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' } }
      }
      whileHover={caught ? undefined : { scale: 1.25 }}
      whileTap={{ scale: 0.8 }}
    >
      <BugGlyph squashed={caught} />
    </motion.button>
  );
};

/** Five bugs crawl over the page while Bug Hunter is armed. */
export const Bugs: React.FC = () => {
  const { t } = useTranslation();
  const { hunter } = useMission();
  const seed = hunter.session;

  return (
    <AnimatePresence>
      {hunter.active && (
        <>
          {Array.from({ length: hunter.total }, (_, i) => (
            <Crawler key={`${seed}-${i}`} id={`bug-${i}`} seed={seed * 10 + i} />
          ))}
          <motion.div
            key='pill'
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className='glass fixed bottom-4 left-1/2 z-[86] flex -translate-x-1/2 items-center gap-3 rounded-full px-4 py-2 font-[family-name:var(--font-jetbrains)] text-xs'
          >
            <span className='h-2 w-2 rounded-full bg-bug' />
            {hunter.complete ? (
              <span className='text-pass'>{t.mc.bugs.done}</span>
            ) : (
              <span className='text-fg'>
                {t.mc.bugs.hint} · <span className='text-bug'>{hunter.found.size}</span>/{hunter.total}
              </span>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
