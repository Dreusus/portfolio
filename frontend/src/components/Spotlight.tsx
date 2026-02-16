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

  const springs = [
    { x: useSpring(mouseX, { stiffness: 120, damping: 15 }), y: useSpring(mouseY, { stiffness: 120, damping: 15 }) },
    { x: useSpring(mouseX, { stiffness: 100, damping: 20 }), y: useSpring(mouseY, { stiffness: 100, damping: 20 }) },
    { x: useSpring(mouseX, { stiffness: 80, damping: 25 }), y: useSpring(mouseY, { stiffness: 80, damping: 25 }) },
  ];

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 500);
  }, []);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight;

    mouseX.set(centerX);
    mouseY.set(centerY);

    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [mouseX, mouseY, containerId]);

  if (isMobile) return null;

  return (
    <>
      {springs.map((spring, i) => (
        <motion.div
          key={i}
          className={cn(
            'pointer-events-none absolute z-10 rounded-full mix-blend-multiply blur-2xl',
            i === 0 && 'bg-icon-accent/30',
            i === 1 && 'bg-secondary/40',
            i === 2 && 'bg-primary/30'
          )}
          style={{
            left: spring.x,
            top: spring.y,
            width: `${20 - i * 4}rem`,
            height: `${20 - i * 4}rem`,
            opacity: visible ? 0.6 - i * 0.15 : 0,
            transform: 'translate(-50%, -50%)',
          }}
          transition={{
            opacity: { duration: 0.5 }
          }}
        />
      ))}
    </>
  );
};
