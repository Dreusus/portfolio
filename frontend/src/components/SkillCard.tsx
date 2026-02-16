'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SkillCardProps {
  title: string;
  icon: (className: string) => React.ReactNode;
  url: string;
  defaultColor: string;
  hoverColor: string;
  index?: number;
}

export const SkillCard = ({ title, icon, url, defaultColor, hoverColor, index = 0 }: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.1, y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col items-center justify-center p-4"
    >
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${hoverColor}20 0%, transparent 70%)`,
        }}
      />

      {/* Card background */}
      <motion.div
        className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center bg-white/50 backdrop-blur-sm border border-white/50 shadow-lg shadow-black/5 group-hover:shadow-xl group-hover:shadow-black/10 transition-all duration-300"
        style={{
          borderColor: isHovered ? `${hoverColor}40` : undefined,
          boxShadow: isHovered ? `0 10px 40px ${hoverColor}30` : undefined,
        }}
        animate={isHovered ? { rotate: [0, -5, 5, -5, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Icon */}
        <div
          style={{
            color: isHovered ? hoverColor : defaultColor,
            transition: 'color 0.4s ease, transform 0.3s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {icon('w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14')}
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
          }}
        />
      </motion.div>

      {/* Tooltip */}
      <motion.span
        initial={{ opacity: 0, y: 5 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
        transition={{ duration: 0.2 }}
        className="absolute -bottom-6 text-xs font-medium text-foreground/70 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm whitespace-nowrap"
      >
        {title}
      </motion.span>
    </motion.a>
  );
};
