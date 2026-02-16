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

      <div className='w-full max-w-[460px] mx-auto md:mx-0'>
        <div className='rounded-2xl p-6 card-base shadow-lg shadow-icon-accent/5'>
          <ContactForm />
        </div>
      </div>
    </BlockContainer>
  );
};
