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
      <div className='flex flex-col gap-3 w-full'>
        {jobs.map((item, i) => {
          const isExpanded = expandedIndex === i;

          return (
            <div
              key={i}
              className='bg-white rounded-xl border border-foreground/5 overflow-hidden'
            >
              <button
                className='w-full flex items-center justify-between p-4 text-left hover:bg-foreground/[0.02] transition-colors'
                onClick={() => toggleExpand(i)}
              >
                <div>
                  <h3 className='font-semibold text-foreground'>{item.title}</h3>
                  <p className='text-sm text-foreground/50 mt-0.5'>
                    {item.company} · {item.period}
                  </p>
                </div>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-foreground/30 transition-transform duration-200',
                    isExpanded && 'rotate-180'
                  )}
                />
              </button>

              {isExpanded && (
                <div className='px-4 pb-4 pt-1 border-t border-foreground/5'>
                  <ul className='space-y-2'>
                    {item.points.map((text, j) => (
                      <li key={j} className='flex items-start gap-2 text-sm text-foreground/70'>
                        <span className='text-icon-accent mt-1'>•</span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </BlockContainer>
  );
};
