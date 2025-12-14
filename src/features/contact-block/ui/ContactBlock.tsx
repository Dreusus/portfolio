'use client';

import { BlockIds } from '@/shared/types/blocks';
import { BlockContainer, BlockTitle } from '@/shared/ui';
import { ContactForm } from './ContactForm';
import { useTranslation } from '@/shared/i18n';

export const ContactBlock = () => {
  const { t } = useTranslation();

  return (
    <BlockContainer id={BlockIds.Contact}>
      <BlockTitle title={t.contact.title} id={BlockIds.Contact} />
      <div className='flex flex-col gap-4 w-full max-w-[400px] mx-auto md:mx-0'>
        <ContactForm />
      </div>
    </BlockContainer>
  );
};
