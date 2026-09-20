'use client';

import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from '@/data/i18n';
import { useMission } from './MissionContext';

/** Green wave that sweeps the page after the form is sent. */
export const PassWave: React.FC = () => {
  const { t } = useTranslation();
  const { released, reduced } = useMission();
  return (
    <AnimatePresence>
      {released && (
        <motion.div
          key='wave'
          className='pointer-events-none fixed inset-0 z-[150] flex items-center justify-center'
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <motion.div
            className='absolute inset-0 origin-bottom bg-pass/20'
            initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.p
            className='font-display text-glow relative text-[clamp(1.6rem,6vw,5rem)] font-extrabold tracking-[0.1em] text-pass'
            initial={reduced ? false : { scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 16 }}
          >
            {t.mc.contact.wave}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
