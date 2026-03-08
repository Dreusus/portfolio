'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BlockContainer, BlockTitle } from '@/components';
import { BlockIds } from '@/interfaces/blocks';
import { useTranslation } from '@/data/i18n';
import { cn } from '@/utils/utils';

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
      <div className='flex flex-col gap-4 relative ml-2.5'>
        {/* Timeline gradient line */}
        <div className='absolute left-0 top-0 bottom-0 w-0.5 timeline-line rounded-full' />
        {jobs.map((item, i) => {
          const isExpanded = expandedIndex === i;

          return (
            <div key={i} className='relative'>
              <div className={cn(
                'absolute -left-[9px] top-2 w-[18px] h-[18px] rounded-full border-2 border-secondary transition-colors duration-300',
                isExpanded ? 'bg-secondary' : 'bg-background'
              )} />
              <div
                className='flex flex-col pl-6 cursor-pointer group'
                onClick={() => toggleExpand(i)}
              >
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='font-semibold text-lg leading-tight'>{item.title}</h3>
                    <p className='text-muted-foreground text-sm'>{item.company} · {item.period}</p>
                  </div>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-muted-foreground group-hover:text-foreground flex-shrink-0 transition-all duration-300',
                      isExpanded && 'rotate-180'
                    )}
                  />
                </div>

                <div
                  className={cn(
                    'grid transition-all duration-300 ease-out',
                    isExpanded ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                  )}
                >
                  <ul className='overflow-hidden space-y-1'>
                    {item.points.map((text, j) => (
                      <li key={j} className='text-muted-foreground text-sm flex items-start gap-2'>
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
