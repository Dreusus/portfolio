'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BlockContainer, BlockTitle } from '@/shared/ui';
import { BlockIds } from '@/shared/types/blocks';
import { useTranslation } from '@/shared/i18n';
import { cn } from '@/shared/utils/utils';

export const ExperienceBlock = () => {
  const { t } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const jobs = t.experience.jobs;

  return (
    <BlockContainer id={BlockIds.Experience}>
      <BlockTitle title={t.experience.title} id={BlockIds.Experience} />
      <div className='flex flex-col gap-4 relative border-l-2 border-secondary ml-2.5'>
        {jobs.map((item, i) => {
          const isExpanded = expandedIndex === i;

          return (
            <div key={i} className='relative'>
              <div className='absolute -left-[11px] top-2 w-5 h-5 rounded-full bg-secondary' />
              <div
                className='flex flex-col pl-6 cursor-pointer group'
                onClick={() => toggleExpand(i)}
              >
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='font-semibold text-lg leading-tight'>{item.title}</h3>
                    <p className='text-gray-500 text-sm'>{item.company} · {item.period}</p>
                  </div>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0 transition-transform duration-200',
                      isExpanded && 'rotate-180'
                    )}
                  />
                </div>

                <div
                  className={cn(
                    'grid transition-all duration-200 ease-in-out',
                    isExpanded ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                  )}
                >
                  <ul className='overflow-hidden space-y-1'>
                    {item.points.map((text, j) => (
                      <li key={j} className='text-gray-600 text-sm flex items-start gap-2'>
                        <span className='text-icon-accent mt-0.5'>•</span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </BlockContainer>
  );
};
