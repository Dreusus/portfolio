'use client';

import { BlockContainer, BlockTitle } from '../../../shared/ui';
import { FEATURE_ICONS } from '../model/data';
import React from 'react';
import { BlockIds } from '../../../shared/types/blocks';
import { useTranslation } from '../../../shared/i18n';

const FEATURE_KEYS = ['experience', 'automation', 'quality', 'reliable', 'teamwork', 'remote'] as const;

export const WhyChooseMeBlock = () => {
  const { t } = useTranslation();

  const renderFeatures = () =>
    FEATURE_KEYS.map((key) => {
      const feature = t.whyChooseMe.features[key];
      const icon = FEATURE_ICONS[key];
      return (
        <div key={key} className='flex gap-3 items-start'>
          {React.cloneElement(icon, {
            className: 'text-icon-accent shrink-0 w-8 h-8 lg:w-10 lg:h-10',
          })}
          <div>
            <h3 className='font-bold text-lg'>{feature.title}</h3>
            <p className='text-sm text-gray-600'>{feature.description}</p>
          </div>
        </div>
      );
    });

  return (
    <BlockContainer id={BlockIds.WhyChooseMe}>
      <BlockTitle title={t.whyChooseMe.title} id={BlockIds.WhyChooseMe} />
      <div className='bg-white text-gray-900' id='why-choose-me'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:pr-20 gap-6 max-w-4xl mx-auto'>
          {renderFeatures()}
        </div>
      </div>
    </BlockContainer>
  );
};
