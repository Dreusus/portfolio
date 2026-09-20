'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useTranslation } from '@/data/i18n';
import { useMission } from './MissionContext';

const HIT = 44; // touch-friendly hit area
const GLYPH = 30;

const BugGlyph: React.FC<{ squashed: boolean }> = ({ squashed }) => (
  <svg viewBox='0 0 24 24' width={GLYPH} height={GLYPH} fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' aria-hidden>
    <ellipse cx='12' cy='13' rx='5' ry='6' fill={squashed ? 'currentColor' : 'rgba(248,113,113,0.35)'} />
    <path d='M12 7V4 M9 5l3 2 3-2' />
    <path d='M7 10L3 9 M7 13H3 M7 16l-4 1' />
    <path d='M17 10l4-1 M17 13h4 M17 16l4 1' />
    <path d='M12 8v10 M9.5 11h5 M9.5 14h5' />
  </svg>
);

const rnd = (min: number, max: number) => min + Math.random() * (max - min);

/** A random crawl path across the viewport; keyframes are absolute viewport coordinates. */
const makePath = () => {
  const vw = typeof window === 'undefined' ? 1200 : window.innerWidth;
  const vh = typeof window === 'undefined' ? 800 : window.innerHeight;
  const pts = Array.from({ length: 5 }, () => ({ x: rnd(16, vw - HIT - 16), y: rnd(96, vh - HIT - 96) }));
  return { x: pts.map((p) => p.x), y: pts.map((p) => p.y), rotate: pts.map(() => rnd(-35, 35)) };
};

const Crawler: React.FC<{ id: string }> = ({ id }) => {
  const { hunter, reduced } = useMission();
  const caught = hunter.found.has(id);
  // one path per mount (the parent remounts crawlers per session): the bug crawls back and forth and never teleports away from the pointer
  const path = useMemo(() => makePath(), []);
  const duration = useMemo(() => rnd(9, 14), []);

  return (
    <motion.button
      type='button'
      aria-label={`bug ${id}`}
      onClick={(e) => {
        e.stopPropagation();
        if (!caught) hunter.catchBug(id);
      }}
      className='fixed left-0 top-0 z-[85] grid place-items-center text-bug drop-shadow-[0_0_8px_rgba(248,113,113,0.6)]'
      style={{ width: HIT, height: HIT, cursor: caught ? 'default' : 'crosshair', pointerEvents: caught ? 'none' : 'auto' }}
      initial={{ x: path.x[0], y: path.y[0], opacity: 0, scale: 0.6 }}
      animate={
        caught
          ? { scaleY: 0.25, scaleX: 1.3, opacity: 0, y: path.y[0] + 160, transition: { duration: 0.6 } }
          : reduced
            ? { x: path.x[0], y: path.y[0], opacity: 1, scale: 1 }
            : {
                x: path.x,
                y: path.y,
                rotate: path.rotate,
                opacity: 1,
                scale: 1,
                transition: { duration, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' },
              }
      }
      whileHover={caught ? undefined : { scale: 1.3 }}
      whileTap={{ scale: 0.8 }}
    >
      <BugGlyph squashed={caught} />
    </motion.button>
  );
};

/** Five bugs crawl over the page while Bug Hunter is armed. Click or tap them; Esc stops the game. */
export const Bugs: React.FC = () => {
  const { t } = useTranslation();
  const { hunter } = useMission();
  const seed = hunter.session;
  const [banner, setBanner] = useState(false);

  // stop with Escape
  useEffect(() => {
    if (!hunter.active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hunter.toggle();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hunter]);

  // short "how to play" banner right after arming
  useEffect(() => {
    if (!hunter.active) return;
    const show = window.setTimeout(() => setBanner(true), 0);
    const hide = window.setTimeout(() => setBanner(false), 3200);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
      setBanner(false);
    };
  }, [hunter.active, seed]);

  return (
    <AnimatePresence>
      {hunter.active && (
        <React.Fragment key={`session-${seed}`}>
          {Array.from({ length: hunter.total }, (_, i) => (
            <Crawler key={`${seed}-${i}`} id={`bug-${i}`} />
          ))}

          <AnimatePresence>
            {banner && !hunter.complete && (
              <motion.p
                key='banner'
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className='glass pointer-events-none fixed left-1/2 top-1/2 z-[86] -translate-x-1/2 -translate-y-1/2 rounded-2xl px-6 py-4 text-center font-[family-name:var(--font-jetbrains)] text-sm text-fg'
              >
                {t.mc.bugs.intro}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.div
            key='pill'
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className='glass fixed bottom-4 left-1/2 z-[86] flex -translate-x-1/2 items-center gap-3 rounded-full py-2 pl-4 pr-2 font-[family-name:var(--font-jetbrains)] text-xs'
          >
            <span className='h-2 w-2 rounded-full bg-bug pulse-run' />
            {hunter.complete ? (
              <span className='text-pass'>{t.mc.bugs.done}</span>
            ) : (
              <span className='text-fg'>
                {t.mc.bugs.hint} · <span className='text-bug'>{hunter.found.size}</span>/{hunter.total}
              </span>
            )}
            <button
              type='button'
              onClick={hunter.toggle}
              className='ml-1 grid h-7 w-7 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg'
              aria-label={t.mc.bugs.stop}
              title={t.mc.bugs.stop}
            >
              <X className='h-3.5 w-3.5' />
            </button>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};
