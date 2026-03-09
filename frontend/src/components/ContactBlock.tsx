'use client';

import { BlockIds } from '@/interfaces/blocks';
import { BlockContainer, BlockTitle } from '@/components';
import { ContactForm } from './ContactForm';
import { useTranslation } from '@/data/i18n';

export const ContactBlock = () => {
  const { t } = useTranslation();

  return (
    <BlockContainer id={BlockIds.Contact} className='h-full'>
      <BlockTitle title={t.contact.title} id={BlockIds.Contact} />
      <div className='flex h-full w-full flex-col gap-4'>
        <div className='rounded-2xl border border-border/80 bg-surface-2/35 p-4 sm:h-full sm:p-5'>
          <ContactForm className='sm:h-full' />
        </div>
      </div>
    </BlockContainer>
  );
};
