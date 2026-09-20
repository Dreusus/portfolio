'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useTranslation } from '@/data/i18n';
import { useMission } from './MissionContext';

/** Career as a run history: a line that draws itself while the stages light up. */
export const History: React.FC = () => {
  const { t } = useTranslation();
  const { reduced } = useMission();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });

  const jobs = [...t.experience.jobs].reverse(); // oldest first
  const tags = Object.values(t.whyChooseMe.features).map((f) => f.title);
  const marquee = [...tags, ...tags];

  return (
    <section id='history' className='relative w-full py-20 lg:py-28'>
      <div className='marquee mb-14 overflow-hidden border-y border-line py-3'>
        <div className='marquee-track flex w-max gap-10 whitespace-nowrap'>
          {marquee.map((tag, i) => (
            <span key={i} className='hud-label flex items-center gap-10 text-fg-muted'>
              {tag}
              <span className='h-1 w-1 rounded-full bg-pass' />
            </span>
          ))}
        </div>
      </div>

      <div className='mx-auto w-full max-w-content px-4 sm:px-6'>
        <p className='hud-label mb-2'>{t.mc.history.label}</p>
        <h2 className='font-display mb-12 text-3xl font-bold text-fg sm:text-5xl'>{t.mc.history.title}</h2>

        <div ref={ref} className='relative pl-10 sm:pl-16'>
          <div className='absolute bottom-0 left-[15px] top-0 w-px bg-line sm:left-[23px]' />
          <motion.div
            className='absolute left-[15px] top-0 w-px origin-top bg-pass sm:left-[23px]'
            style={{ scaleY: reduced ? 1 : line, height: '100%', boxShadow: '0 0 10px rgba(34,197,94,0.8)' }}
          />

          <ol className='flex flex-col gap-14'>
            {jobs.map((job, i) => {
              const running = i === jobs.length - 1;
              return (
                <motion.li
                  key={job.company}
                  className='relative'
                  initial={reduced ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-15% 0px' }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                >
                  <span
                    className={`absolute -left-10 top-1 grid h-8 w-8 place-items-center rounded-full border font-[family-name:var(--font-jetbrains)] text-xs sm:-left-16 sm:h-12 sm:w-12 sm:text-sm ${
                      running ? 'border-run bg-bg text-run pulse-run' : 'border-pass bg-bg text-pass'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className='glass rounded-3xl p-5 sm:p-7'>
                    <div className='flex flex-wrap items-center gap-3'>
                      <span className='hud-label'>{t.mc.history.stage} {i + 1}</span>
                      <span className={`hud-label rounded-full px-2.5 py-0.5 ${running ? 'bg-run/15 text-run' : 'bg-pass/15 text-pass'}`}>
                        {running ? t.mc.history.running : t.mc.history.passed}
                      </span>
                      <span className='ml-auto font-[family-name:var(--font-jetbrains)] text-xs text-fg-muted'>{job.period}</span>
                    </div>
                    <h3 className='font-display mt-3 text-2xl font-bold text-fg sm:text-3xl'>{job.company}</h3>
                    <p className='text-fg-muted'>{job.title}</p>
                    <ul className='mt-4 grid gap-2 sm:grid-cols-2'>
                      {job.points.map((p) => (
                        <li key={p} className='flex gap-2 text-sm text-fg-muted'>
                          <span className='mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-pass' />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
