'use client';

import { BlockIds } from '@/interfaces/blocks';
import { BlockContainer, BlockTitle } from '@/components';
import { Socials } from '@/components';
import { useTranslation } from '@/data/i18n';

export const AboutBlock = () => {
  const { t } = useTranslation();

  return (
    <BlockContainer id={BlockIds.AboutMe}>
      <BlockTitle title={t.about.title} id={BlockIds.AboutMe} />
      <div className='md:w-2/3 space-y-4'>
        <p className='text-foreground/70 leading-relaxed'>
          {t.about.description}
        </p>
        <div className='flex flex-col items-start gap-3 pt-2'>
          <span className='text-sm font-medium text-foreground/50'>
            {t.about.socialLinks}
          </span>
          <Socials />
        </div>
      </div>
    </BlockContainer>
  );
};
