'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useTranslation } from '@/data/i18n';
import { useCounter } from '@/hooks';
import { useMission } from './MissionContext';

const Word: React.FC<{ word: string; progress: MotionValue<number>; start: number; end: number; reduced: boolean }> = ({
  word,
  progress,
  start,
  end,
  reduced,
}) => {
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);
  return (
    <motion.span className='inline-block will-change-transform' style={reduced ? undefined : { opacity, y }}>
      {word}&nbsp;
    </motion.span>
  );
};

const Stat: React.FC<{ value: number; suffix: string; label: string }> = ({ value, suffix, label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const v = useCounter(value, inView, 1600);
  return (
    <div ref={ref} className='border-l border-line pl-4'>
      <p className='font-display text-3xl font-bold text-fg sm:text-4xl'>
        {v.toLocaleString('en-US')}
        {suffix}
      </p>
      <p className='hud-label mt-1'>{label}</p>
    </div>
  );
};

/** Kinetic manifest: three lines that light up word by word as you scroll. */
export const Manifest: React.FC = () => {
  const { t } = useTranslation();
  const { reduced } = useMission();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });

  const lines = t.mc.manifest.lines;
  const words = lines.flatMap((l, li) => l.split(' ').map((w) => ({ w, li })));
  const total = words.length;

  const stats = t.stats.items;

  let idx = 0;

  return (
    <section id='run' ref={ref} className='relative mx-auto w-full max-w-content px-4 py-28 sm:px-6 lg:py-40'>
      <p className='hud-label mb-8'>{t.mc.stages.run} · manifest</p>
      <div className='font-display text-[clamp(1.9rem,6vw,5.6rem)] font-bold leading-[1.05] tracking-[-0.02em]'>
        {lines.map((line, li) => (
          <p key={li} className={li === 1 ? 'text-pass' : 'text-fg'}>
            {line.split(' ').map((w, wi) => {
              const i = idx++;
              return (
                <Word
                  key={`${li}-${wi}`}
                  word={w}
                  progress={scrollYProgress}
                  start={i / total}
                  end={Math.min(1, (i + 1.5) / total)}
                  reduced={reduced}
                />
              );
            })}
          </p>
        ))}
      </div>

      <div className='mt-16 grid grid-cols-2 gap-6 sm:mt-24 lg:grid-cols-4'>
        {stats.map((s) => (
          <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </div>
    </section>
  );
};
