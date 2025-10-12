'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '../utils/utils';
import { useIsMobile } from '@/shared/hooks/useIsMobile';

interface SpotlightProps {
  containerId: string;
}

export const Spotlight = ({ containerId }: SpotlightProps) => {
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();
  const mouseX = useMotionValue(300);
  const mouseY = useMotionValue(300);

  const tails = [
    useSpring(mouseX, { stiffness: 100, damping: 20 }),
    useSpring(mouseX, { stiffness: 95, damping: 24 }),
    useSpring(mouseX, { stiffness: 90, damping: 26 }),
  ];
  const tailsY = [
    useSpring(mouseY, { stiffness: 100, damping: 20 }),
    useSpring(mouseY, { stiffness: 95, damping: 24 }),
    useSpring(mouseY, { stiffness: 90, damping: 26 }),
  ];

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 300);
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

  return (
    !isMobile && (
      <>
        {tails.map((x, i) => (
          <motion.div
            key={i}
            className={cn(
              'pointer-events-none opacity-0 absolute z-10 bg-secondary rounded-full blur-md -translate-x-1/2 -translate-y-2/3 transition-opacity duration-300'
            )}
            style={{
              left: x,
              top: tailsY[i],
              width: `${16 - i * 3}rem`,
              height: `${16 - i * 3}rem`,
              opacity: visible ? `${0.8 - i * 0.1}` : 0,
            }}
          />
        ))}
      </>
    )
  );
};
