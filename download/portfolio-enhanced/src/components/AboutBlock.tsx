'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BlockIds } from '@/interfaces/blocks';
import { BlockContainer, BlockTitle } from '@/components';
import { Socials } from '@/components';
import { useTranslation } from '@/data/i18n';
import { MapPin, Calendar, Briefcase } from 'lucide-react';

export const AboutBlock = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <BlockContainer id={BlockIds.AboutMe}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <BlockTitle title={t.about.title} id={BlockIds.AboutMe} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='md:w-2/3 space-y-6'
      >
        {/* Description */}
        <p className='text-foreground/80 leading-relaxed text-base sm:text-lg'>
          {t.about.description}
        </p>

        {/* Quick info cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='flex flex-wrap gap-3'
        >
          <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/40 to-transparent border border-primary/20'>
            <Briefcase className='w-4 h-4 text-icon-accent' />
            <span className='text-sm font-medium'>{t.about?.role || 'Full Stack QA Engineer'}</span>
          </div>
          <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/40 to-transparent border border-primary/20'>
            <MapPin className='w-4 h-4 text-icon-accent' />
            <span className='text-sm font-medium'>{t.about?.location || 'Удалённо'}</span>
          </div>
          <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/40 to-transparent border border-primary/20'>
            <Calendar className='w-4 h-4 text-icon-accent' />
            <span className='text-sm font-medium'>{t.about?.experience || '3+ года опыта'}</span>
          </div>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='flex flex-col items-start gap-2 pt-2'
        >
          <span className='text-sm text-muted-foreground'>{t.about.socialLinks || 'Найти меня:'}</span>
          <Socials />
        </motion.div>
      </motion.div>
    </BlockContainer>
  );
};
