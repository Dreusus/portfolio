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
              className='group flex gap-4 items-start p-5 rounded-2xl card-base transition-all duration-300 hover:shadow-lg hover:shadow-icon-accent/5 hover:scale-[1.01]'
            >
              <div className='p-3 rounded-xl bg-icon-accent/15 text-icon-accent transition-all duration-300 group-hover:bg-icon-accent/20 group-hover:scale-105'>
                {React.cloneElement(icon, { className: 'w-5 h-5' })}
              </div>
              <div className='flex-1'>
                <h3 className='font-semibold text-foreground text-sm transition-colors duration-300 group-hover:text-icon-accent'>{feature.title}</h3>
                <p className='text-xs text-foreground/60 mt-1.5 leading-relaxed'>{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </BlockContainer>
  );
};
