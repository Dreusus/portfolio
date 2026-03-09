'use client';

import { BlockContainer, BlockTitle } from '@/components';
import { FEATURE_ICONS } from '@/data/chooseData';
import React from 'react';
import { BlockIds } from '@/interfaces/blocks';
import { useTranslation } from '@/data/i18n';

const WORKFLOW_KEYS = ['audit', 'strategy', 'implementation', 'release'] as const;

export const WhyChooseMeBlock = () => {
  const { t } = useTranslation();

  const workflowIcons = [
    FEATURE_ICONS.quality,
    FEATURE_ICONS.automation,
    FEATURE_ICONS.reliable,
    FEATURE_ICONS.teamwork,
  ];

  return (
    <BlockContainer id={BlockIds.WhyChooseMe} className='h-full'>
      <BlockTitle title={t.whyChooseMe.title} id={BlockIds.WhyChooseMe} />
      <div id='why-choose-me' className='flex h-full flex-col gap-4'>
        <div className='rounded-2xl border border-border/80 bg-surface-2/35 p-4 sm:p-5'>
          <p className='font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80'>
            {t.whyChooseMe.workflowTitle}
          </p>
          <ol className='mt-3 space-y-2.5'>
            {WORKFLOW_KEYS.map((key, index) => {
              const step = t.whyChooseMe.workflow[key];
              const icon = workflowIcons[index];
              return (
                <li
                  key={key}
                  className='rounded-xl border border-border/70 bg-surface px-3 py-3 shadow-[0_12px_24px_-30px_rgba(27,45,78,0.48)] sm:px-3.5'
                >
                  <div className='flex items-start gap-3'>
                    <span className='mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-primary/35 bg-primary/10 px-1 font-mono text-[11px] font-semibold text-primary'>
                      {index + 1}
                    </span>
                    <div className='flex-1'>
                      <h3 className='text-base font-semibold leading-tight text-foreground sm:text-lg'>
                        {step.title}
                      </h3>
                      <p className='mt-1 text-sm leading-relaxed text-muted-foreground'>
                        {step.description}
                      </p>
                    </div>
                    {React.cloneElement(icon, {
                      className: 'mt-0.5 h-5 w-5 shrink-0 text-primary/80',
                    })}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </BlockContainer>
  );
};
