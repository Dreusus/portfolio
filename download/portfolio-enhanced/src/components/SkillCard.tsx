'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils/utils';
import Link from 'next/link';

interface SkillCardProps {
  title: string;
  icon: React.ReactNode;
  url?: string;
  defaultColor?: string;
  hoverColor?: string;
}

export const SkillCard = ({
  title,
  icon,
  url,
  defaultColor = 'text-gray-500',
  hoverColor = 'text-blue-500',
}: SkillCardProps) => {
  const cardContent = (
    <motion.div
      whileHover={{ scale: 1.08, y: -5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={cn(
        'group relative flex flex-col items-center justify-center',
        'w-full aspect-square rounded-2xl',
        'bg-gradient-to-br from-primary/30 via-background to-secondary/20',
        'border border-primary/20',
        'shadow-sm hover:shadow-lg',
        'transition-shadow duration-300',
        'cursor-pointer overflow-hidden'
      )}
    >
      {/* Animated background gradient */}
      <div
        className={cn(
          'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          'bg-gradient-to-br from-icon-accent/5 to-transparent'
        )}
      />

      {/* Icon */}
      <div
        className={cn(
          'relative z-10 mb-2 transition-all duration-300',
          defaultColor,
          `group-hover:${hoverColor}`,
          'group-hover:scale-110 group-hover:drop-shadow-lg'
        )}
        style={{
          color: undefined,
        }}
      >
        <motion.div
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
          className="w-8 h-8 sm:w-10 sm:h-10"
        >
          {icon}
        </motion.div>
      </div>

      {/* Title */}
      <span
        className={cn(
          'relative z-10 text-xs sm:text-sm font-medium text-center',
          'text-foreground/80 group-hover:text-foreground',
          'transition-colors duration-300 px-1'
        )}
      >
        {title}
      </span>

      {/* Corner accent */}
      <div
        className={cn(
          'absolute top-2 right-2 w-2 h-2 rounded-full',
          'bg-icon-accent/0 group-hover:bg-icon-accent/50',
          'transition-all duration-300'
        )}
      />
    </motion.div>
  );

  if (url) {
    return (
      <Link href={url} target="_blank" rel="noopener noreferrer">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};
