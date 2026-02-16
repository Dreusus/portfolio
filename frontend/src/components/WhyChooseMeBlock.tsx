'use client';

import { BlockContainer, BlockTitle } from '@/components';
import { FEATURE_ICONS } from '@/data/chooseData';
import React from 'react';
import { BlockIds } from '@/interfaces/blocks';
import { useTranslation } from '@/data/i18n';
import { motion } from 'framer-motion';

const FEATURE_KEYS = ['experience', 'automation', 'quality', 'reliable', 'teamwork', 'remote'] as const;

export const WhyChooseMeBlock = () => {
  const { t } = useTranslation();

  const renderFeatures = () =>
    FEATURE_KEYS.map((key, index) => {
      const feature = t.whyChooseMe.features[key];
      const icon = FEATURE_ICONS[key];
      return (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className='group relative'
        >
          <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-secondary/10 p-5 border border-white/50 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-icon-accent/10 transition-all duration-300'>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                  backgroundSize: '20px 20px',
                  opacity: 0.03
                }}
              />
            </div>

            {/* Content */}
            <div className='relative flex gap-4 items-start'>
              {/* Icon container */}
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className='p-3 rounded-xl bg-gradient-to-br from-icon-accent/20 to-secondary/30 group-hover:from-icon-accent/30 group-hover:to-secondary/40 transition-all duration-300'
              >
                {React.cloneElement(icon, {
                  className: 'text-icon-accent w-6 h-6 lg:w-7 lg:h-7',
                })}
              </motion.div>

              {/* Text */}
              <div className='flex-1 min-w-0'>
                <h3 className='font-bold text-lg text-foreground group-hover:text-icon-accent transition-colors duration-300 mb-1'>
                  {feature.title}
                </h3>
                <p className='text-sm text-foreground/60 leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            </div>

            {/* Decorative corner */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              className='absolute top-3 right-3 w-6 h-6 rounded-full bg-icon-accent/10 flex items-center justify-center'
            >
              <div className='w-2 h-2 rounded-full bg-icon-accent/50' />
            </motion.div>

            {/* Bottom gradient line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-icon-accent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>
      );
    });

  return (
    <BlockContainer id={BlockIds.WhyChooseMe}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <BlockTitle title={t.whyChooseMe.title} id={BlockIds.WhyChooseMe} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className='relative'
      >
        {/* Decorative background */}
        <div className="absolute -inset-4 bg-gradient-to-br from-icon-accent/5 via-transparent to-secondary/5 rounded-3xl blur-2xl" />

        <div className='relative bg-white/30 backdrop-blur-sm rounded-3xl p-4 sm:p-6 border border-white/50'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-6 max-w-4xl'>
            {renderFeatures()}
          </div>
        </div>
      </motion.div>
    </BlockContainer>
  );
};
