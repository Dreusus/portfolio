'use client';

import { BlockIds } from '@/interfaces/blocks';
import { BlockContainer, BlockTitle } from '@/components';
import { ContactForm } from './ContactForm';
import { useTranslation } from '@/data/i18n';

export const ContactBlock = () => {
  const { t } = useTranslation();

  return (
    <BlockContainer id={BlockIds.Contact}>
      <BlockTitle title={t.contact.title} id={BlockIds.Contact} />
      <div className='mx-auto flex w-full max-w-[460px] flex-col gap-4 md:mx-0'>
        <ContactForm />
      </div>
    </BlockContainer>
  );
};
