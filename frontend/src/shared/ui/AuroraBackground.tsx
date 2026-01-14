'use client';

import { motion } from 'framer-motion';

interface AuroraBackgroundProps {
  className?: string;
}

export const AuroraBackground = ({ className = '' }: AuroraBackgroundProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Основные градиентные блобы */}
      <motion.div
        className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle, var(--icon-accent) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute -top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full opacity-50"
        style={{
          background: 'radial-gradient(circle, #d4a574 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-[20%] left-[20%] w-[50%] h-[50%] rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, #a8d5a2 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Дополнительные мелкие блобы */}
      <motion.div
        className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-[20%] right-[5%] w-[25%] h-[25%] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Сетка с noise эффектом */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
