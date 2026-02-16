'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/utils/utils';
import { useIsMobile } from '@/hooks/useIsMobile';

interface SpotlightProps {
  containerId: string;
}

export const Spotlight = ({ containerId }: SpotlightProps) => {
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();
  const mouseX = useMotionValue(300);
  const mouseY = useMotionValue(300);

  const springConfig = { stiffness: 100, damping: 20 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    setTimeout(() => setVisible(true), 300);
  }, []);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, containerId]);

  if (isMobile) return null;

  return (
    <motion.div
      className={cn(
        'pointer-events-none absolute z-10 w-64 h-64 rounded-full blur-3xl bg-icon-accent/20',
        !visible && 'opacity-0'
      )}
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};
