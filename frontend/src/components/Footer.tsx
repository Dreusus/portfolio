'use client';

import { DynamicLogo, Socials } from '@/components';
import { useTranslation } from '@/data/i18n';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className='relative overflow-hidden bg-gradient-to-t from-colored-background via-primary/20 to-transparent'
    >
      {/* Decorative top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-icon-accent/30 to-transparent" />

      {/* Background decorations */}
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-icon-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-secondary/20 rounded-full blur-2xl" />

      <div className='max-w-content relative flex flex-col sm:flex-row items-center sm:justify-between gap-6 w-full h-full mx-auto py-8 px-3 sm:px-5 z-10'>
        {/* Logo & Copyright */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='flex flex-col items-center sm:items-start gap-3'
        >
          <DynamicLogo />
          <p className='text-sm text-foreground/50 flex items-center gap-1.5'>
            <span>© {year}.</span>
            <span>{t.footer.copyright.replace('{year}', '').replace('©', '').trim()}</span>
          </p>
        </motion.div>

        {/* Made with love */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='hidden md:flex items-center gap-2 text-sm text-foreground/40'
        >
          <span>Made with</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className='w-4 h-4 text-red-400 fill-red-400' />
          </motion.div>
          <span>using Next.js & Tailwind</span>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='flex flex-col items-center sm:items-end gap-3'
        >
          <Socials />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className='text-xs text-foreground/40'>
              {t.footer.available || 'Available for hire'}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};
