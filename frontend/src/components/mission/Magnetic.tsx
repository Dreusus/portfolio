'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useMission } from './MissionContext';

interface Props {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

/** Wraps an element and lets it lean towards the pointer. No-op without a fine pointer. */
export const Magnetic: React.FC<Props> = ({ children, strength = 0.35, className }) => {
  const { fancy } = useMission();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const onMove = (e: React.PointerEvent) => {
    if (!fancy || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
};
