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
                  ? 'bg-gradient-to-br from-secondary/60 to-primary/40 border-icon-accent/20 shadow-lg shadow-icon-accent/5'
                  : 'bg-white/80 border-icon-accent/10 hover:border-icon-accent/20'
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
                      <Building2 className='w-3.5 h-3.5 text-icon-accent' />
                      {item.company}
                    </span>
                    <span className='flex items-center gap-1'>
                      <Calendar className='w-3.5 h-3.5 text-icon-accent' />
                      {item.period}
                    </span>
                  </div>
                </div>
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
                  isExpanded ? 'bg-icon-accent text-white' : 'bg-icon-accent/10 text-icon-accent'
                )}>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 transition-transform duration-300',
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
                <div className='px-4 pb-4 pt-2 border-t border-icon-accent/10'>
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
