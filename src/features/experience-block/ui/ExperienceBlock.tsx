'use client';

import { BlockContainer, BlockTitle } from '@/shared/ui';
import { PREVIOUS_JOBS } from '../model/data';
import { BlockIds } from '@/shared/types/blocks';
import { useTranslation } from '@/shared/i18n';

export const ExperienceBlock = () => {
  const { t } = useTranslation();

  const renderJobs = () =>
    PREVIOUS_JOBS.map((item, i) => (
      <div key={i} className='relative'>
        <div className='absolute -left-[11px] top-[calc(50%-10px)] w-5 h-5 rounded-full bg-secondary' />
        <div className='flex flex-col pl-6'>
          <h3 className='font-semibold text-xl'>{item.title}</h3>
          <p className='text-gray-400'>{item.company}</p>
          <p className='text-gray-600'>{item.description}</p>
        </div>
      </div>
    ));

  return (
    <BlockContainer id={BlockIds.Experience}>
      <BlockTitle title={t.experience.title} id={BlockIds.Experience} />
      <div className='flex flex-col gap-4 relative border-l-2 border-secondary ml-2.5'>
        {renderJobs()}
      </div>
    </BlockContainer>
  );
};
