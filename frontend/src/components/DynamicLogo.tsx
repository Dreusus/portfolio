'use client';

import Link from 'next/link';
import { useTranslation } from '@/data/i18n';
import { motion } from 'framer-motion';

export const DynamicLogo = () => {
  const { t } = useTranslation();

  return (
    <Link
      href={'/'}
      className='group relative flex items-center gap-3'
    >
      {/* Logo mark */}
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className='relative w-10 h-10 rounded-xl bg-gradient-to-br from-icon-accent via-secondary to-primary flex items-center justify-center shadow-lg shadow-icon-accent/20 group-hover:shadow-xl group-hover:shadow-icon-accent/30 transition-shadow duration-300'
      >
        <span className="text-white font-bold text-lg">
          {t.name.first?.[0] || 'A'}
        </span>

        {/* Shine effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* Logo text */}
      <div className='flex items-baseline gap-1'>
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className='text-xl sm:text-2xl font-bold tracking-tight'
        >
          <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-icon-accent group-hover:to-secondary transition-all duration-300">
            {t.name.first}
          </span>
        </motion.h1>

        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className='text-xl sm:text-2xl font-bold tracking-tight text-icon-accent overflow-hidden hidden sm:inline'
        >
          {t.name.last}
        </motion.span>
      </div>

      {/* Hover underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-icon-accent to-secondary rounded-full origin-left"
      />
    </Link>
  );
};
