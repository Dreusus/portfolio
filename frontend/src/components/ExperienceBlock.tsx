'use client';

import { useState, type KeyboardEvent } from 'react';
import { BlockContainer, BlockTitle } from '@/components';
import { BlockIds } from '@/interfaces/blocks';
import { useTranslation } from '@/data/i18n';
import { cn } from '@/utils/utils';

export const ExperienceBlock = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const jobs = t.experience.jobs;
  const activeJob = jobs[activeIndex];

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (jobs.length === 0) return;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index + 1) % jobs.length);
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index - 1 + jobs.length) % jobs.length);
    }
  };

  return (
    <BlockContainer id={BlockIds.Experience}>
      <BlockTitle title={t.experience.title} id={BlockIds.Experience} />
      <div className='space-y-4'>
        <div className='min-w-0'>
          <div role='tablist' aria-label={t.experience.title} className='flex flex-wrap gap-2'>
            {jobs.map((item, i) => {
              const isActive = i === activeIndex;
              const tabId = `experience-tab-${i}`;
              const panelId = `experience-panel-${i}`;
              const jobKey = `${item.company}-${item.period}`;

              return (
                <button
                  key={jobKey}
                  type='button'
                  id={tabId}
                  role='tab'
                  aria-selected={isActive}
                  aria-controls={panelId}
                  tabIndex={isActive ? 0 : -1}
                  className={cn(
                    'max-w-full whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200',
                    isActive
                      ? 'border-primary/55 bg-primary/8 text-primary'
                      : 'border-border/80 bg-surface-2/40 text-foreground/80 hover:border-primary/35 hover:text-primary'
                  )}
                  onClick={() => setActiveIndex(i)}
                  onKeyDown={(event) => handleTabKeyDown(event, i)}
                >
                  {item.company}
                </button>
              );
            })}
          </div>
        </div>

        {activeJob && (
          <section
            id={`experience-panel-${activeIndex}`}
            role='tabpanel'
            aria-labelledby={`experience-tab-${activeIndex}`}
            className='surface-panel-compact rounded-2xl p-4 sm:p-5'
          >
            <div className='border-b border-border/70 pb-3'>
              <h3 className='text-2xl font-semibold leading-tight'>{activeJob.title}</h3>
              <p className='mt-1 text-sm text-muted-foreground'>
                {activeJob.company} · {activeJob.period}
              </p>
            </div>
            <ul className='mt-4 space-y-2'>
              {activeJob.points.map((text, j) => (
                <li key={`${activeJob.company}-${activeJob.period}-${j}`} className='flex items-start gap-2 text-sm text-muted-foreground sm:text-base'>
                  <span className='mt-[7px] h-1.5 w-1.5 rounded-full bg-icon-accent' />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </BlockContainer>
  );
};
