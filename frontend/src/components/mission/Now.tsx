'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from '@/data/i18n';
import { useMission } from './MissionContext';

/** What I do right now: the current run of the pipeline, three concrete lines. */
export const Now: React.FC = () => {
  const { t } = useTranslation();
  const { reduced } = useMission();
  const { label, role, company, items } = t.mc.now;

  return (
    <section id='now' className='relative mx-auto w-full max-w-content px-4 py-20 sm:px-6 xl:px-12 lg:py-28'>
      <p className='hud-label mb-2'>{label}</p>
      <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-12'>
        <div>
          <h2 className='font-display text-3xl font-bold text-fg sm:text-5xl'>{role}</h2>
          <p className='mt-3 flex items-center gap-3 font-[family-name:var(--font-jetbrains)] text-sm text-fg-muted'>
            <span className='inline-block h-2 w-2 rounded-full bg-run pulse-run' aria-hidden />
            {company}
          </p>
        </div>

        <ol className='flex flex-col divide-y divide-line border-y border-line'>
          {items.map((item, i) => (
            <motion.li
              key={item.title}
              className='grid gap-1 py-5 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-4'
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ type: 'spring', stiffness: 140, damping: 22, delay: reduced ? 0 : i * 0.08 }}
            >
              <span className='hud-label text-brand'>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className='text-base font-medium text-fg sm:text-lg'>{item.title}</p>
                <p className='mt-1 text-sm text-fg-muted'>{item.desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};
