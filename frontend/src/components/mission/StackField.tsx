'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { useTranslation } from '@/data/i18n';
import { SKILLS, type Skill, type SkillGroup } from '@/data/skillsData';
import { useMission } from './MissionContext';

const GROUPS: SkillGroup[] = ['lang', 'test', 'ops', 'data', 'perf'];
const SIZE = 60;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/** Floating icons that repel each other and drift toward the pointer. Static grid on touch / reduced motion. */
export const StackField: React.FC = () => {
  const { t } = useTranslation();
  const { fancy } = useMission();
  const [group, setGroup] = useState<SkillGroup | 'all'>('all');
  const [selected, setSelected] = useState<Skill | null>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const particles = useRef<Particle[]>([]);
  const pointer = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    if (!fancy) return;
    const field = fieldRef.current;
    if (!field) return;
    let raf = 0;
    let running = true;
    let w = field.clientWidth;
    let h = field.clientHeight;

    particles.current = SKILLS.map((_, i) => {
      const cols = Math.ceil(Math.sqrt(SKILLS.length));
      const col = i % cols;
      const row = Math.floor(i / cols);
      return {
        x: ((col + 0.5) / cols) * w + (Math.random() - 0.5) * 40,
        y: ((row + 0.5) / Math.ceil(SKILLS.length / cols)) * h + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      };
    });

    const onMove = (e: PointerEvent) => {
      const r = field.getBoundingClientRect();
      pointer.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
    };
    const onLeave = () => (pointer.current.active = false);
    field.addEventListener('pointermove', onMove);
    field.addEventListener('pointerleave', onLeave);
    const ro = new ResizeObserver(() => {
      w = field.clientWidth;
      h = field.clientHeight;
    });
    ro.observe(field);

    const step = () => {
      if (!running) return;
      const ps = particles.current;
      const p = pointer.current;
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i];
        // repel neighbours
        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d2 = dx * dx + dy * dy;
          const min = SIZE * 1.35;
          if (d2 < min * min && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = ((min - d) / min) * 0.25;
            const ux = dx / d;
            const uy = dy / d;
            a.vx -= ux * f;
            a.vy -= uy * f;
            b.vx += ux * f;
            b.vy += uy * f;
          }
        }
        // attract to pointer
        if (p.active) {
          const dx = p.x - a.x;
          const dy = p.y - a.y;
          const d = Math.hypot(dx, dy);
          if (d < 260 && d > 60) {
            a.vx += (dx / d) * 0.06;
            a.vy += (dy / d) * 0.06;
          } else if (d <= 60 && d > 0) {
            a.vx -= (dx / d) * 0.12;
            a.vy -= (dy / d) * 0.12;
          }
        }
        // gentle drift + damping
        a.vx += (Math.random() - 0.5) * 0.02;
        a.vy += (Math.random() - 0.5) * 0.02;
        a.vx *= 0.96;
        a.vy *= 0.96;
        a.x += a.vx;
        a.y += a.vy;
        const half = SIZE / 2 + 6;
        if (a.x < half) {
          a.x = half;
          a.vx = Math.abs(a.vx);
        } else if (a.x > w - half) {
          a.x = w - half;
          a.vx = -Math.abs(a.vx);
        }
        if (a.y < half) {
          a.y = half;
          a.vy = Math.abs(a.vy);
        } else if (a.y > h - half) {
          a.y = h - half;
          a.vy = -Math.abs(a.vy);
        }
        const el = nodeRefs.current[i];
        if (el) el.style.transform = `translate3d(${a.x - SIZE / 2}px, ${a.y - SIZE / 2}px, 0)`;
      }
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!raf) raf = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(field);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      field.removeEventListener('pointermove', onMove);
      field.removeEventListener('pointerleave', onLeave);
    };
  }, [fancy]);

  const dim = (s: Skill) => group !== 'all' && s.group !== group;

  const node = (s: Skill, i: number) => (
    <button
      key={s.name}
      ref={(el) => {
        nodeRefs.current[i] = el;
      }}
      type='button'
      onClick={() => setSelected(s)}
      aria-label={s.name}
      title={s.name}
      className={`group grid place-items-center rounded-2xl border border-line bg-bg-2/80 transition-[opacity,border-color,box-shadow] duration-300 hover:border-pass ${
        fancy ? 'absolute left-0 top-0 will-change-transform' : 'relative'
      } ${dim(s) ? 'opacity-20' : 'opacity-100'} ${selected?.name === s.name ? 'glow-pass border-pass' : ''}`}
      style={{ width: SIZE, height: SIZE, color: s.hoverColor, boxShadow: dim(s) ? undefined : `0 0 24px ${s.hoverColor}22` }}
    >
      {s.icon('h-8 w-8 rounded-md')}
    </button>
  );

  return (
    <section id='stack' className='mx-auto w-full max-w-content px-4 py-20 sm:px-6 lg:py-28'>
      <p className='hud-label mb-2'>{t.mc.stack.label}</p>
      <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
        <h2 className='font-display text-3xl font-bold text-fg sm:text-5xl'>{t.mc.stack.title}</h2>
        <div className='flex flex-wrap gap-1.5'>
          {(['all', ...GROUPS] as const).map((g) => (
            <button
              key={g}
              type='button'
              onClick={() => setGroup(g)}
              className={`hud-label rounded-full border px-3 py-1.5 transition-colors ${
                group === g ? 'border-pass text-pass' : 'border-line text-fg-muted hover:text-fg'
              }`}
            >
              {g === 'all' ? t.mc.stack.all : t.mc.stack.groups[g]}
            </button>
          ))}
        </div>
      </div>
      {fancy && <p className='hud-label mt-2'>{t.mc.stack.hint}</p>}

      <div className='relative mt-8 grid gap-6 lg:grid-cols-[1fr_360px]'>
        <div
          ref={fieldRef}
          className={`glass relative overflow-hidden rounded-3xl ${
            fancy ? 'h-[420px] sm:h-[480px]' : 'flex flex-wrap gap-3 p-5'
          }`}
        >
          {fancy && (
            <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.06),transparent_60%)]' />
          )}
          {SKILLS.map(node)}
        </div>

        <div className='glass relative min-h-[220px] rounded-3xl p-6'>
          <AnimatePresence mode='wait'>
            {selected ? (
              <motion.div
                key={selected.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                className='flex h-full flex-col'
              >
                <div className='flex items-start gap-3'>
                  <span className='grid h-12 w-12 place-items-center rounded-xl border border-line' style={{ color: selected.hoverColor }}>
                    {selected.icon('h-7 w-7 rounded-md')}
                  </span>
                  <div className='min-w-0 flex-1'>
                    <p className='font-display text-xl font-bold text-fg'>{selected.name}</p>
                    <p className='hud-label'>{t.mc.stack.groups[selected.group]}</p>
                  </div>
                  <button type='button' onClick={() => setSelected(null)} className='text-fg-muted hover:text-fg' aria-label='close'>
                    <X className='h-4 w-4' />
                  </button>
                </div>
                <p className='mt-4 text-sm text-fg-muted'>{t.mc.stack.usedAt[selected.name] ?? ''}</p>
                <div className='mt-auto pt-6'>
                  <div className='flex items-center justify-between font-[family-name:var(--font-jetbrains)] text-xs'>
                    <span className='hud-label'>{t.mc.stack.coverage}</span>
                    <span className='text-pass'>{selected.level}%</span>
                  </div>
                  <div className='mt-2 h-1.5 overflow-hidden rounded-full bg-line'>
                    <motion.div
                      className='h-full rounded-full bg-pass'
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                      style={{ width: `${selected.level}%`, transformOrigin: 'left' }}
                    />
                  </div>
                  <a
                    href={selected.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='mt-4 inline-flex items-center gap-1 text-sm text-pass hover:underline'
                  >
                    {t.mc.stack.docs} <ArrowUpRight className='h-4 w-4' />
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div key='empty' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='flex h-full flex-col justify-center'>
                <p className='font-display text-2xl font-bold text-fg-faint'>{SKILLS.length}</p>
                <p className='hud-label'>{t.skills.title}</p>
                <div className='mt-4 flex flex-wrap gap-1.5'>
                  {SKILLS.map((s) => (
                    <button
                      key={s.name}
                      type='button'
                      onClick={() => setSelected(s)}
                      className='rounded-full border border-line px-2.5 py-1 font-[family-name:var(--font-jetbrains)] text-[11px] text-fg-muted hover:border-pass hover:text-fg'
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
