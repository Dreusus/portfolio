'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BlockContainer, BlockTitle } from '@/components';
import { FEATURE_ICONS } from '@/data/chooseData';
import React from 'react';
import { BlockIds } from '@/interfaces/blocks';
import { useTranslation } from '@/data/i18n';

const FEATURE_KEYS = ['experience', 'automation', 'quality', 'reliable', 'teamwork', 'remote'] as const;

export const WhyChooseMeBlock = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const renderFeatures = () =>
    FEATURE_KEYS.map((key, index) => {
      const feature = t.whyChooseMe.features[key];
      const icon = FEATURE_ICONS[key];

      return (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className='group flex gap-4 items-start p-4 rounded-xl bg-gradient-to-r from-primary/20 to-transparent border border-primary/10 hover:border-icon-accent/30 hover:shadow-md transition-all duration-300'
        >
          <div className='p-2 rounded-lg bg-icon-accent/10 text-icon-accent group-hover:bg-icon-accent group-hover:text-white transition-all duration-300'>
            {React.cloneElement(icon, {
              className: 'w-6 h-6 lg:w-7 lg:h-7',
            })}
          </div>
          <div className='flex-1'>
            <h3 className='font-semibold text-base sm:text-lg text-foreground group-hover:text-foreground transition-colors'>
              {feature.title}
            </h3>
            <p className='text-sm text-muted-foreground mt-1 leading-relaxed'>
              {feature.description}
            </p>
          </div>
        </motion.div>
      );
    });

  return (
    <BlockContainer id={BlockIds.WhyChooseMe}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <BlockTitle title={t.whyChooseMe.title} id={BlockIds.WhyChooseMe} />
      </motion.div>

      <div className='w-full'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl'>
          {renderFeatures()}
        </div>
      </div>
    </BlockContainer>
  );
};
