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
                'rounded-2xl border transition-all duration-300 overflow-hidden',
                isExpanded
                  ? 'bg-gradient-to-br from-primary to-secondary/70 border-icon-accent/25 shadow-lg shadow-icon-accent/10'
                  : 'card-base hover:border-icon-accent/15'
              )}
            >
              <button
                className='w-full flex items-center justify-between p-5 text-left'
                onClick={() => toggleExpand(i)}
              >
                <div className='flex-1 min-w-0'>
                  <h3 className='font-semibold text-foreground text-base'>{item.title}</h3>
                  <div className='flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-foreground/55'>
                    <span className='flex items-center gap-1.5'>
                      <Building2 className='w-4 h-4 text-icon-accent' />
                      {item.company}
                    </span>
                    <span className='flex items-center gap-1.5'>
                      <Calendar className='w-4 h-4 text-icon-accent' />
                      {item.period}
                    </span>
                  </div>
                </div>
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ml-4',
                  isExpanded 
                    ? 'bg-icon-accent text-white' 
                    : 'bg-accent-warm text-icon-accent'
                )}>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 transition-transform duration-300',
                      isExpanded && 'rotate-180'
                    )}
                  />
                </div>
              </button>

              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <div className='px-5 pb-5 pt-3 border-t border-border'>
                  <ul className='space-y-3'>
                    {item.points.map((text, j) => (
                      <li key={j} className='flex items-start gap-3 text-sm text-foreground/70'>
                        <span className='w-1.5 h-1.5 rounded-full bg-icon-accent mt-2 flex-shrink-0' />
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
