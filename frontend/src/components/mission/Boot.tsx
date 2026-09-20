'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from '@/data/i18n';
import { SonarCanvas } from './SonarCanvas';
import { Terminal } from './Terminal';
import { Magnetic } from './Magnetic';
import { useMission } from './MissionContext';

const LINE_DELAY = 0.16;

const letter = {
  hidden: { y: '110%', rotate: 6, opacity: 0 },
  show: (i: number) => ({
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 320, damping: 26, delay: i * 0.035 },
  }),
};

const Word: React.FC<{ text: string; offset: number; reduced: boolean; className?: string }> = ({
  text,
  offset,
  reduced,
  className,
}) => (
  <span className={`inline-flex overflow-hidden ${className ?? ''}`} aria-hidden>
    {text.split('').map((ch, i) => (
      <motion.span
        key={i}
        custom={reduced ? 0 : offset + i}
        variants={letter}
        initial={reduced ? false : 'hidden'}
        animate='show'
        className='inline-block will-change-transform'
      >
        {ch}
      </motion.span>
    ))}
  </span>
);

export const Boot: React.FC = () => {
  const { t } = useTranslation();
  const { reduced } = useMission();
  const [ready, setReady] = useState(reduced);
  const [roleIdx, setRoleIdx] = useState(0);

  const lines = t.mc.boot.lines;
  const roles = [t.hero.title, ...t.hero.roles];

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => setReady(true), lines.length * LINE_DELAY * 1000 + 350);
    return () => window.clearTimeout(id);
  }, [reduced, lines.length]);

  useEffect(() => {
    const id = window.setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2400);
    return () => window.clearInterval(id);
  }, [roles.length]);

  const first = t.name.first.toUpperCase();
  const last = t.name.last.toUpperCase();

  return (
    <section id='boot' className='scanlines relative isolate flex min-h-[100svh] flex-col overflow-hidden'>
      <SonarCanvas className='absolute inset-0 -z-10 h-full w-full' />
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.10),transparent_55%)]' />

      <div className='mx-auto flex w-full max-w-content flex-1 flex-col justify-center px-4 pb-10 pt-24 sm:px-6 lg:pt-28'>
        {/* boot log */}
        <div className='font-[family-name:var(--font-jetbrains)] text-xs text-fg-muted sm:text-sm' aria-hidden={!ready}>
          <AnimatePresence>
            {!ready &&
              lines.map((l, i) => (
                <motion.p
                  key={l}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: i * LINE_DELAY } }}
                  exit={{ opacity: 0 }}
                >
                  <span className='text-fg-faint'>[{String(i + 1).padStart(2, '0')}]</span> {l}
                  <span className='text-pass'> {t.mc.boot.ok}</span>
                </motion.p>
              ))}
          </AnimatePresence>
        </div>

        {ready && (
          <>
            <p className='hud-label mb-4'>
              <span className='mr-2 inline-block h-2 w-2 rounded-full bg-pass pulse-pass align-middle' />
              {t.mc.status.available} · {t.location}
            </p>
            <h1
              className='font-display text-[clamp(2.6rem,11vw,10.5rem)] font-extrabold leading-[0.9] tracking-[-0.03em] text-fg'
              aria-label={`${t.name.first} ${t.name.last}`}
            >
              <Word text={first} offset={0} reduced={reduced} />
              <br />
              <Word text={last} offset={first.length} reduced={reduced} className='text-glow text-pass' />
            </h1>

            <div className='mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
              <div>
                <div className='h-8 overflow-hidden font-[family-name:var(--font-jetbrains)] text-base text-fg sm:text-xl'>
                  <AnimatePresence mode='wait'>
                    <motion.p
                      key={roleIdx}
                      initial={reduced ? false : { y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -24, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    >
                      <span className='text-pass'>&gt;</span> {roles[roleIdx]}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <p className='mt-2 max-w-xl text-sm text-fg-muted sm:text-base'>{t.mc.boot.subtitle}</p>
              </div>
              <div className='flex gap-3'>
                <Magnetic>
                  <a
                    href='#contact'
                    className='glow-pass inline-flex items-center rounded-full bg-pass px-6 py-3 font-semibold text-bg transition-transform hover:scale-[1.03]'
                  >
                    {t.mc.status.hire}
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href='#suites'
                    className='inline-flex items-center rounded-full border border-line-strong px-6 py-3 font-medium text-fg transition-colors hover:border-pass hover:text-pass'
                  >
                    {t.mc.stages.suites}
                  </a>
                </Magnetic>
              </div>
            </div>

            <motion.div
              className='mt-10'
              initial={reduced ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 120, damping: 20 }}
            >
              <Terminal />
            </motion.div>
          </>
        )}
      </div>

      <div className='hud-label pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center'>
        {t.mc.boot.scroll}
        <motion.span
          className='mx-auto mt-2 block h-6 w-px bg-pass'
          animate={reduced ? undefined : { scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </div>
    </section>
  );
};
