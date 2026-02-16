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
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'>
        {FEATURE_KEYS.map((key) => {
          const feature = t.whyChooseMe.features[key];
          const icon = FEATURE_ICONS[key];
          return (
            <div key={key} className='flex gap-3 items-start p-3 rounded-lg hover:bg-foreground/[0.02] transition-colors'>
              <div className='p-2 rounded-lg bg-icon-accent/10 text-icon-accent'>
                {React.cloneElement(icon, { className: 'w-5 h-5' })}
              </div>
              <div>
                <h3 className='font-semibold text-foreground text-sm'>{feature.title}</h3>
                <p className='text-xs text-foreground/60 mt-1'>{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </BlockContainer>
  );
};
