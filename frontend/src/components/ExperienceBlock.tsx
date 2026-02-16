'use client';

import { useState } from 'react';
import { ChevronDown, Calendar, Building2 } from 'lucide-react';
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

      <div className='flex flex-col gap-3 w-full'>
        {jobs.map((item, i) => {
          const isExpanded = expandedIndex === i;

          return (
            <div
              key={i}
              className={cn(
                'rounded-xl border transition-all duration-300 overflow-hidden',
                isExpanded
                  ? 'bg-gradient-to-br from-primary/50 to-secondary/30 border-icon-accent/20'
                  : 'bg-white border-foreground/5 hover:border-foreground/10'
              )}
            >
              <button
                className='w-full flex items-center justify-between p-4 text-left'
                onClick={() => toggleExpand(i)}
              >
                <div className='flex-1 min-w-0'>
                  <h3 className='font-semibold text-foreground'>{item.title}</h3>
                  <div className='flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm text-foreground/50'>
                    <span className='flex items-center gap-1'>
                      <Building2 className='w-3.5 h-3.5' />
                      {item.company}
                    </span>
                    <span className='flex items-center gap-1'>
                      <Calendar className='w-3.5 h-3.5' />
                      {item.period}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-foreground/30 transition-transform duration-300 flex-shrink-0',
                    isExpanded && 'rotate-180 text-icon-accent'
                  )}
                />
              </button>

              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <div className='px-4 pb-4 pt-1 border-t border-foreground/5'>
                  <ul className='space-y-2'>
                    {item.points.map((text, j) => (
                      <li key={j} className='flex items-start gap-2 text-sm text-foreground/70'>
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
