'use client';

import { BlockContainer, BlockTitle } from '@/components';
import { FEATURE_ICONS } from '@/data/chooseData';
import React from 'react';
import { BlockIds } from '@/interfaces/blocks';
import { useTranslation } from '@/data/i18n';

const FEATURE_KEYS = ['experience', 'automation', 'quality', 'reliable', 'teamwork', 'remote'] as const;

export const WhyChooseMeBlock = () => {
  const { t } = useTranslation();

  const renderFeatures = () =>
    FEATURE_KEYS.map((key) => {
      const feature = t.whyChooseMe.features[key];
      const icon = FEATURE_ICONS[key];
      return (
        <div key={key} className='flex items-start gap-3 border-b border-border/65 pb-4'>
          {React.cloneElement(icon, {
            className: 'text-primary shrink-0 w-6 h-6 sm:w-7 sm:h-7',
          })}
          <div>
            <h3 className='text-lg font-semibold sm:text-xl'>{feature.title}</h3>
            <p className='text-sm text-muted-foreground leading-relaxed'>{feature.description}</p>
          </div>
        </div>
      );
    });

  return (
    <BlockContainer id={BlockIds.WhyChooseMe}>
      <BlockTitle title={t.whyChooseMe.title} id={BlockIds.WhyChooseMe} />
      <div id='why-choose-me'>
        <div className='mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2'>
          {renderFeatures()}
        </div>
      </div>
    </BlockContainer>
  );
};
