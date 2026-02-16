'use client';

import { BlockIds } from '@/interfaces/blocks';
import { BlockContainer, BlockTitle } from '@/components';
import { ContactForm } from './ContactForm';
import { useTranslation } from '@/data/i18n';
import { Mail, MapPin, Clock } from 'lucide-react';

export const ContactBlock = () => {
  const { t } = useTranslation();

  return (
    <BlockContainer id={BlockIds.Contact}>
      <BlockTitle title={t.contact.title} id={BlockIds.Contact} />

      <div className='w-full max-w-[400px] mx-auto md:mx-0 space-y-4'>
        {/* Contact Info */}
        <div className="flex gap-2">
          {[
            { icon: Mail, value: 'Email' },
            { icon: MapPin, value: 'Remote' },
            { icon: Clock, value: '< 24h' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-primary/50 to-secondary/30 border border-foreground/5"
            >
              <item.icon className="w-4 h-4 text-icon-accent" />
              <span className="text-xs font-medium text-foreground/70">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className='rounded-xl bg-gradient-to-br from-white to-primary/20 border border-foreground/5 p-4'>
          <ContactForm />
        </div>
      </div>
    </BlockContainer>
  );
};
