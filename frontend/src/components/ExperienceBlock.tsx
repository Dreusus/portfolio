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
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const jobs = t.experience.jobs;

  return (
    <BlockContainer id={BlockIds.Experience}>
      <BlockTitle title={t.experience.title} id={BlockIds.Experience} />
      <div className='relative ml-2 flex flex-col gap-3 md:gap-4'>
        <div className='absolute bottom-4 left-0 top-4 w-[2px] timeline-line rounded-full' />
        {jobs.map((item, i) => {
          const isExpanded = expandedIndex === i;

          return (
            <article key={i} className='relative pl-7'>
              <div
                className={cn(
                  'absolute left-[-10px] top-6 h-5 w-5 rounded-full border-2 border-secondary transition-colors duration-300',
                  isExpanded ? 'bg-secondary' : 'bg-surface'
                )}
              />
              <button
                type='button'
                className='group w-full rounded-2xl border border-border/80 bg-surface-2/45 p-4 text-left transition-colors duration-300 hover:border-primary/40'
                onClick={() => toggleExpand(i)}
                aria-expanded={isExpanded}
              >
                <div className='flex items-start justify-between gap-3'>
                  <div className='min-w-0'>
                    <h3 className='text-xl font-semibold leading-tight sm:text-2xl'>{item.title}</h3>
                    <p className='text-muted-foreground text-sm'>{item.company} · {item.period}</p>
                  </div>
                  <ChevronDown
                    className={cn(
                      'mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-foreground',
                      isExpanded && 'rotate-180 text-foreground'
                    )}
                    aria-hidden
                  />
                </div>

                <div
                  className={cn(
                    'grid overflow-hidden transition-all duration-300 ease-out',
                    isExpanded ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  )}
                >
                  <ul className='min-h-0 space-y-1'>
                    {item.points.map((text, j) => (
                      <li key={j} className='text-muted-foreground text-sm flex items-start gap-2'>
                        <span className='text-icon-accent mt-0.5'>•</span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            </article>
          );
        })}
      </div>
    </BlockContainer>
  );
};
