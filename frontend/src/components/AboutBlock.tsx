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
      <div className='md:w-2/3'>
        {t.about.description}
        <br />
        <br />
        <div className='flex flex-col items-start gap-2'>
          {t.about.socialLinks}
          <Socials />
        </div>
      </div>
    </BlockContainer>
  );
};
