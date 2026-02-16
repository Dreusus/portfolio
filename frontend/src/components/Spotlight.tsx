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
      const posX = e.clientX - rect.left;
      const posY = e.clientY - rect.top;

      if (posX >= 0 && posY >= 0 && posX <= rect.width && posY <= rect.height) {
        mouseX.set(posX);
        mouseY.set(posY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, containerId]);

  if (isMobile) return null;

  return (
    <motion.div
      className={cn(
        'pointer-events-none absolute z-10 w-64 h-64 rounded-full blur-3xl bg-icon-accent/10',
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
