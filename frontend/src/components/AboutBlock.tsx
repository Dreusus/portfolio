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
      <div className='max-w-2xl text-base leading-relaxed text-foreground/82'>
        <p>{t.about.description}</p>
        <div className='mt-6 flex flex-col items-start gap-3'>
          {t.about.socialLinks}
          <Socials />
        </div>
      </div>
    </BlockContainer>
  );
};
