'use client';
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[60] origin-left"
      style={{ scaleX }}
    >
      <div className="h-full bg-gradient-to-r from-icon-accent via-secondary to-primary shadow-lg shadow-icon-accent/50" />
    </motion.div>
  );
};
