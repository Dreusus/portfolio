'use client';

import { BlockContainer, BlockTitle } from '@/components';
import { FEATURE_ICONS } from '@/data/chooseData';
import React from 'react';
import { BlockIds } from '@/interfaces/blocks';
import { useTranslation } from '@/data/i18n';

const FEATURE_KEYS = ['experience', 'automation', 'quality', 'reliable', 'teamwork', 'remote'] as const;

export const WhyChooseMeBlock = () => {
  const { t } = useTranslation();

  return (
    <BlockContainer id={BlockIds.WhyChooseMe}>
      <BlockTitle title={t.whyChooseMe.title} id={BlockIds.WhyChooseMe} />

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 w-full'>
        {FEATURE_KEYS.map((key, index) => {
          const feature = t.whyChooseMe.features[key];
          const icon = FEATURE_ICONS[key];
          return (
            <div
              key={key}
              className='group relative flex gap-3 items-start p-4 rounded-2xl bg-gradient-to-br from-white to-secondary/20 border border-icon-accent/10 transition-all duration-300 hover:border-icon-accent/30 hover:shadow-xl hover:shadow-icon-accent/10 overflow-hidden'
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient overlay на hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-icon-accent/5 to-accent-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className='relative z-10 p-2.5 rounded-xl bg-gradient-to-br from-icon-accent to-accent-orange text-white shadow-md shadow-icon-accent/20 transition-transform duration-300 group-hover:scale-110'>
                {React.cloneElement(icon, { className: 'w-5 h-5' })}
              </div>
              <div className='relative z-10 flex-1'>
                <h3 className='font-semibold text-foreground text-sm transition-colors duration-300 group-hover:text-icon-accent'>{feature.title}</h3>
                <p className='text-xs text-foreground/60 mt-1'>{feature.description}</p>
              </div>
              
              {/* Стрелочка при наведении */}
              <div className='relative z-10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-icon-accent'>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </BlockContainer>
  );
};
