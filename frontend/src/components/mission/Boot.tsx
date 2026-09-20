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
  // vertical padding keeps tall glyphs inside the clip box at leading 0.9
  <span className={`inline-flex overflow-hidden py-[0.06em] -my-[0.06em] ${className ?? ''}`} aria-hidden>
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
  // always false on the first render so server and client markup match; reduced motion flips it right after mount
  const [ready, setReady] = useState(false);

  const lines = t.mc.boot.lines;

  useEffect(() => {
    const delay = reduced ? 0 : lines.length * LINE_DELAY * 1000 + 350;
    const id = window.setTimeout(() => setReady(true), delay);
    return () => window.clearTimeout(id);
  }, [reduced, lines.length]);

  const first = t.name.first.toUpperCase();
  const last = t.name.last.toUpperCase();

  return (
    <section id='boot' className='scanlines relative isolate flex min-h-[100svh] flex-col overflow-hidden'>
      <SonarCanvas className='absolute inset-0 -z-10 h-full w-full' />
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(125,211,252,0.08),transparent_55%)]' />

      <div className='mx-auto flex w-full max-w-content flex-1 flex-col justify-center px-4 pb-20 pt-24 sm:px-6 xl:px-12 lg:pt-28'>
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
          <div className='grid gap-10 2xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] 2xl:items-center 2xl:gap-16'>
            <div>
            <p className='hud-label mb-4'>
              <span className='mr-2 inline-block h-2 w-2 rounded-full bg-pass pulse-pass align-middle' />
              {t.mc.status.available} · {t.location}
            </p>
            <h1
              className='font-display text-[clamp(2.8rem,11.5vw,10rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-fg 2xl:text-[clamp(5rem,5.8vw,8.75rem)]'
              aria-label={`${t.name.first} ${t.name.last}`}
            >
              <Word text={first} offset={0} reduced={reduced} />
              <br />
              <Word text={last} offset={first.length} reduced={reduced} />
            </h1>

            <div className='mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between 2xl:mt-10 2xl:flex-col 2xl:items-start'>
              <p className='max-w-xl text-base text-fg-muted sm:text-lg'>{t.mc.boot.subtitle}</p>
              <div className='flex gap-3'>
                <Magnetic>
                  <a
                    href='#contact'
                    className='glow-brand inline-flex items-center rounded-full bg-brand px-6 py-3 font-semibold text-bg transition-transform hover:scale-[1.03]'
                  >
                    {t.mc.boot.primaryCta}
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href='#history'
                    className='inline-flex items-center rounded-full border border-line-strong px-6 py-3 font-medium text-fg transition-colors hover:border-brand hover:text-brand'
                  >
                    {t.mc.boot.secondaryCta}
                  </a>
                </Magnetic>
              </div>
            </div>
            </div>

            <motion.div
              className='2xl:self-stretch'
              initial={reduced ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 120, damping: 20 }}
            >
              <Terminal />
            </motion.div>
          </div>
        )}
      </div>

      <div className='hud-label pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-center [@media(min-height:920px)]:block'>
        {t.mc.boot.scroll}
        <motion.span
          className='mx-auto mt-2 block h-6 w-px bg-brand'
          animate={reduced ? undefined : { scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </div>
    </section>
  );
};
