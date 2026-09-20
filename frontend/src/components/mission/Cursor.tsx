'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import { useMission } from './MissionContext';

/** Custom crosshair cursor + a soft spotlight that follows the pointer. Desktop only. */
export const Cursor: React.FC = () => {
  const { fancy, hunter } = useMission();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const lx = useSpring(x, { stiffness: 80, damping: 25 });
  const ly = useSpring(y, { stiffness: 80, damping: 25 });
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!fancy) return;
    document.documentElement.classList.add('mc-cursor');
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHover(!!el?.closest('a, button, [role="button"], input, textarea, [data-hover]'));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      document.documentElement.classList.remove('mc-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [fancy, x, y]);

  const spot = useMotionTemplate`radial-gradient(520px circle at ${lx}px ${ly}px, rgba(125,211,252,0.06), transparent 65%)`;

  if (!fancy) return null;

  const hunting = hunter.active;
  const size = hover ? 44 : 22;

  return (
    <>
      <motion.div
        aria-hidden
        className='pointer-events-none fixed inset-0 z-[5]'
        style={{ backgroundImage: spot }}
      />
      <motion.div
        aria-hidden
        className='pointer-events-none fixed left-0 top-0 z-[200] rounded-full border'
        style={{
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
          width: size,
          height: size,
          borderColor: hunting ? 'rgba(248,113,113,0.9)' : 'rgba(125,211,252,0.9)',
          backgroundColor: hover ? 'rgba(125,211,252,0.12)' : 'transparent',
          scale: down ? 0.8 : 1,
          transition: 'width 150ms ease, height 150ms ease, background-color 150ms ease',
        }}
      >
        {hunting && (
          <>
            <span className='absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-bug/70' />
            <span className='absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-bug/70' />
          </>
        )}
      </motion.div>
      <motion.div
        aria-hidden
        className='pointer-events-none fixed left-0 top-0 z-[200] h-1 w-1 rounded-full bg-brand'
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
};
