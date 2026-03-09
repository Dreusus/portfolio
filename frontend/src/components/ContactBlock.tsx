'use client';

import Link from 'next/link';
import { Github, Linkedin, Send } from 'lucide-react';
import { BlockIds } from '@/interfaces/blocks';
import { BlockContainer, BlockTitle } from '@/components';
import { ContactForm } from './ContactForm';
import { useTranslation } from '@/data/i18n';

const CONTACT_CHANNELS = [
  { key: 'telegram' as const, href: 'https://t.me/dreusus', icon: Send },
  { key: 'linkedin' as const, href: 'https://www.linkedin.com/in/dreusus/', icon: Linkedin },
  { key: 'github' as const, href: 'https://github.com/Dreusus', icon: Github },
];

export const ContactBlock = () => {
  const { t } = useTranslation();

  return (
    <BlockContainer id={BlockIds.Contact} className='h-full'>
      <BlockTitle title={t.contact.title} id={BlockIds.Contact} />
      <div className='mx-auto flex h-full w-full max-w-[560px] flex-col gap-4 lg:ml-auto lg:mr-0'>
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
          {CONTACT_CHANNELS.map((channel) => {
            const Icon = channel.icon;
            return (
              <Link
                key={channel.key}
                href={channel.href}
                target='_blank'
                rel='noopener noreferrer'
                className='group inline-flex items-center justify-center gap-2 rounded-xl border border-border/75 bg-surface-2/30 px-3 py-2 text-sm font-semibold text-foreground/80 transition-all duration-300 hover:border-primary/35 hover:bg-surface-2/70 hover:text-primary'
              >
                <Icon className='h-4 w-4 text-primary/80 transition-colors duration-300 group-hover:text-primary' />
                <span>{t.contact.channels[channel.key]}</span>
              </Link>
            );
          })}
        </div>

        <div className='rounded-2xl border border-border/80 bg-surface px-4 py-4 shadow-[0_18px_36px_-30px_rgba(27,45,78,0.42)] sm:px-5 sm:py-5'>
          <ContactForm />
        </div>
      </div>
    </BlockContainer>
  );
};
