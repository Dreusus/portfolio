'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from '@/data/i18n';
import { useMission } from './MissionContext';

const IMAGES: Record<string, string> = { 'qa-desktop': '/images/desk-project.jpg' };
const LINKS: Record<string, string> = { 'qa-desktop': 'https://github.com/Dreusus' };

interface Item {
  id: string;
  title: string;
  tag: string;
  desc: string;
  stack: string[];
  status: string;
}

const Card: React.FC<{ item: Item; index: number; wide: boolean }> = ({ item, index, wide }) => {
  const { t } = useTranslation();
  const { fancy } = useMission();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 20 });
  const sry = useSpring(ry, { stiffness: 150, damping: 20 });
  const live = item.status.toLowerCase() === 'live';

  const onMove = (e: React.PointerEvent) => {
    if (!fancy || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1200 }}
      className={`glass relative flex shrink-0 flex-col overflow-hidden rounded-3xl ${
        wide ? 'h-[72vh] w-[min(70vw,960px)]' : 'w-full'
      }`}
    >
      <div className={`relative ${wide ? 'flex-1' : 'aspect-[16/10]'} overflow-hidden`}>
        <Image
          src={IMAGES[item.id] ?? '/images/coming-soon.jpg'}
          alt={item.title}
          fill
          sizes='(max-width: 768px) 100vw, 70vw'
          className='object-cover opacity-80 transition-transform duration-700 hover:scale-[1.04]'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent' />
        <div className='absolute left-5 top-5 flex items-center gap-2'>
          <span className='hud-label rounded-full border border-line-strong bg-bg/60 px-3 py-1 text-fg'>
            SUITE-{String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={`hud-label rounded-full px-3 py-1 ${
              live ? 'bg-pass/15 text-pass glow-pass' : 'bg-run/15 text-run'
            }`}
          >
            {live ? t.mc.suites.passed : t.mc.suites.soon}
          </span>
        </div>
      </div>
      <div className='flex flex-col gap-3 p-5 sm:p-7'>
        <h3 className='font-display text-2xl font-bold text-fg sm:text-4xl'>{item.title}</h3>
        <p className='max-w-2xl text-sm text-fg-muted sm:text-base'>{item.desc}</p>
        <div className='mt-1 flex flex-wrap items-center gap-2'>
          {item.stack.map((s) => (
            <span key={s} className='rounded-full border border-line px-3 py-1 font-[family-name:var(--font-jetbrains)] text-xs text-fg-muted'>
              {s}
            </span>
          ))}
          {LINKS[item.id] && (
            <a
              href={LINKS[item.id]}
              target='_blank'
              rel='noopener noreferrer'
              className='ml-auto inline-flex items-center gap-1 text-sm font-medium text-pass hover:underline'
            >
              {t.mc.suites.open} <ArrowUpRight className='h-4 w-4' />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

/** Pinned section: cards travel horizontally while the page scrolls. Vertical list on small screens. */
export const Suites: React.FC = () => {
  const { t } = useTranslation();
  const { reduced } = useMission();
  const items = t.projects.items as Item[];
  const ref = useRef<HTMLElement>(null);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setWide(mq.matches && !reduced);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [reduced]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(items.length - 1) * 72 + 10}vw`]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  if (!wide) {
    return (
      <section id='suites' ref={ref} className='mx-auto w-full max-w-content px-4 py-20 sm:px-6'>
        <p className='hud-label mb-2'>{t.mc.suites.label}</p>
        <h2 className='font-display mb-8 text-3xl font-bold text-fg sm:text-5xl'>{t.mc.suites.title}</h2>
        <div className='grid gap-6 md:grid-cols-2'>
          {items.map((item, i) => (
            <Card key={item.id} item={item} index={i} wide={false} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id='suites' ref={ref} className='relative' style={{ height: `${items.length * 90}vh` }}>
      <div className='sticky top-0 flex h-screen flex-col justify-center overflow-hidden'>
        <div className='mx-auto w-full max-w-content px-6'>
          <p className='hud-label mb-2'>{t.mc.suites.label}</p>
          <div className='flex items-end justify-between'>
            <h2 className='font-display text-5xl font-bold text-fg'>{t.mc.suites.title}</h2>
            <motion.p className='hud-label' style={{ opacity: hintOpacity }}>
              {t.mc.suites.hint} →
            </motion.p>
          </div>
        </div>
        <motion.div className='mt-8 flex gap-[2vw] pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))]' style={{ x }}>
          {items.map((item, i) => (
            <Card key={item.id} item={item} index={i} wide />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
