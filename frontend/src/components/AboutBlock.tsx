'use client';

import { BlockIds } from '@/interfaces/blocks';
import { BlockContainer, BlockTitle } from '@/components';
import { useTranslation } from '@/data/i18n';

export const AboutBlock = () => {
  const { t } = useTranslation();
  const paragraphs = t.about.description
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);

  return (
    <BlockContainer id={BlockIds.AboutMe} className='h-full'>
      <BlockTitle title={t.about.title} id={BlockIds.AboutMe} />
      <div className='space-y-4 text-base leading-relaxed text-foreground/82 lg:max-w-[52ch] lg:pr-2 lg:text-[1.01rem] lg:leading-8'>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </BlockContainer>
  );
};
