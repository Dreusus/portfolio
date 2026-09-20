'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'motion/react';
import { Bug as BugIcon } from 'lucide-react';
import { useTranslation } from '@/data/i18n';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { STAGES, useMission, type StageId } from './MissionContext';

/** Top HUD: pipeline stages as navigation, scroll progress, bug hunt, avatar. */
export const Hud: React.FC = () => {
  const { t } = useTranslation();
  const { stage, setStage, hunter, released } = useMission();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // which stage is on screen
  useEffect(() => {
    const els = STAGES.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) setStage(best.target.id as StageId);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.1, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [setStage]);

  const activeIdx = STAGES.indexOf(stage);

  return (
    <header className='fixed inset-x-0 top-0 z-[80]'>
      <div className='glass border-x-0 border-t-0'>
        <div className='mx-auto flex h-14 w-full max-w-content items-center gap-3 px-4 sm:px-6'>
          <a href='#boot' className='flex items-center gap-2' aria-label='top'>
            <span className='relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-brand/60'>
              <Image src='/images/me.png' alt='' fill sizes='32px' className='object-cover' />
            </span>
            <span className='hud-label hidden sm:inline'>
              AP <span className='text-fg-faint'>{'//'}</span> {t.mc.brand}
            </span>
          </a>

          <nav className='ml-auto hidden items-center gap-1 md:flex' aria-label='stages'>
            {STAGES.map((id, i) => {
              const done = i < activeIdx || released;
              const active = i === activeIdx;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`hud-label flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors ${
                    active ? 'text-fg' : done ? 'text-pass' : 'text-fg-faint hover:text-fg-muted'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      done ? 'bg-pass' : active ? 'bg-run pulse-run' : 'bg-fg-faint'
                    }`}
                  />
                  {t.mc.stages[id]}
                </a>
              );
            })}
          </nav>

          <button
            type='button'
            onClick={hunter.toggle}
            className={`ml-auto flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors md:ml-2 ${
              hunter.active
                ? 'border-bug/60 bg-bug/15 text-bug'
                : 'border-line-strong text-fg-muted hover:border-bug/60 hover:text-bug'
            }`}
            aria-pressed={hunter.active}
          >
            <BugIcon className='h-3.5 w-3.5' />
            <span className='hidden sm:inline'>
              {hunter.active ? `${hunter.found.size}/${hunter.total}` : t.mc.status.bugHunt}
            </span>
            {hunter.active && <span className='sm:hidden'>{hunter.found.size}/{hunter.total}</span>}
          </button>
          <LanguageSwitcher className='text-fg-muted hover:text-fg' />
        </div>
        <motion.div
          className='h-[2px] origin-left bg-brand'
          style={{ scaleX: progress, boxShadow: '0 0 10px rgba(var(--brand-rgb), 0.6)' }}
        />
      </div>
    </header>
  );
};

/** Bottom-left status line: local time in Saint Petersburg + availability. */
export const StatusLine: React.FC = () => {
  const { t } = useTranslation();
  const [time, setTime] = useState('--:--:--');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Moscow',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className='hud-label pointer-events-none fixed bottom-4 left-4 z-[70] hidden items-center gap-3 sm:flex'>
      <span className='h-1.5 w-1.5 rounded-full bg-pass pulse-pass' />
      <span>{t.mc.status.local} {time}</span>
      <span className='text-fg-faint'>·</span>
      <span>{t.mc.status.available}</span>
    </div>
  );
};
