import { BlockContainer, BlockTitle } from '@/shared/ui';
import { FEATURES } from '../model/data';
import React from 'react';
import { BlockIds } from '@/shared/types/blocks';

export const WhyChooseMeBlock = () => {
  const renderFeatures = () =>
    FEATURES.map(({ icon, title, description }) => (
      <div key={title} className='flex gap-3 items-start'>
        {React.cloneElement(icon, {
          className: 'text-icon-accent shrink-0 w-8 h-8 lg:w-10 lg:h-10',
        })}
        <div>
          <h3 className='font-bold text-lg'>{title}</h3>
          <p className='text-sm text-gray-600'>{description}</p>
        </div>
      </div>
    ));

  return (
    <BlockContainer id={BlockIds.WhyChooseMe}>
      <BlockTitle title='Why Choose Me' id={BlockIds.WhyChooseMe} />
      <div className='bg-white text-gray-900' id='why-choose-me'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:pr-20 gap-6 max-w-4xl mx-auto'>
          {renderFeatures()}
        </div>
      </div>
    </BlockContainer>
  );
};
