'use client';

import { motion } from 'framer-motion';

interface AuroraBackgroundProps {
  className?: string;
}

export const AuroraBackground = ({ className = '' }: AuroraBackgroundProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute -top-[30%] -left-[10%] w-[60%] h-[60%] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, var(--icon-accent) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute -top-[10%] -right-[15%] w-[50%] h-[50%] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, var(--icon-accent) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-[0%] left-[30%] w-[40%] h-[40%] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--icon-accent) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -20, 10, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};
