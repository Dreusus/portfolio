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
        {FEATURE_KEYS.map((key) => {
          const feature = t.whyChooseMe.features[key];
          const icon = FEATURE_ICONS[key];
          return (
            <div
              key={key}
              className='group flex gap-3 items-start p-4 rounded-xl bg-white border border-foreground/5 transition-all duration-300 hover:border-icon-accent/30 hover:shadow-md hover:shadow-icon-accent/5'
            >
              <div className='p-2.5 rounded-xl bg-icon-accent/10 text-icon-accent transition-all duration-300 group-hover:bg-icon-accent/20 group-hover:scale-105'>
                {React.cloneElement(icon, { className: 'w-5 h-5' })}
              </div>
              <div className='flex-1'>
                <h3 className='font-semibold text-foreground text-sm transition-colors duration-300 group-hover:text-icon-accent'>{feature.title}</h3>
                <p className='text-xs text-foreground/60 mt-1'>{feature.description}</p>
              </div>
              {/* Стрелочка при наведении */}
              <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-icon-accent/50'>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </BlockContainer>
  );
};
