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

      <div className='w-full max-w-[450px] mx-auto md:mx-0'>
        <div className='rounded-xl bg-gradient-to-br from-white/80 to-secondary/30 border border-foreground/5 p-5 shadow-sm'>
          <ContactForm />
        </div>
      </div>
    </BlockContainer>
  );
};
