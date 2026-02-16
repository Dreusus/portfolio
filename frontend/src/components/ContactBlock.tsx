'use client';

import { BlockIds } from '@/interfaces/blocks';
import { BlockContainer, BlockTitle } from '@/components';
import { ContactForm } from './ContactForm';
import { useTranslation } from '@/data/i18n';
import { useState } from 'react';
import { Mail, MapPin, Clock, MessageSquare, ChevronDown } from 'lucide-react';
import { cn } from '@/utils/utils';

const CONTACT_ITEMS = [
  { icon: Mail, title: 'Email', value: 'contact@example.com' },
  { icon: MapPin, title: 'Location', value: 'Remote / Worldwide' },
  { icon: Clock, title: 'Response Time', value: '< 24 hours' },
  { icon: MessageSquare, title: 'Preferred', value: 'Telegram / Email' },
];

export const ContactBlock = () => {
  const { t } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <BlockContainer id={BlockIds.Contact}>
      <BlockTitle title={t.contact.title} id={BlockIds.Contact} />

      <div className='w-full max-w-[500px] mx-auto md:mx-0 space-y-3'>
        {/* Contact Items - динамичные как Experience */}
        <div className='flex flex-col gap-2'>
          {CONTACT_ITEMS.map((item, i) => {
            const isExpanded = expandedIndex === i;

            return (
              <div
                key={i}
                className={cn(
                  'rounded-xl border transition-all duration-300 overflow-hidden',
                  isExpanded
                    ? 'bg-gradient-to-br from-primary/50 to-secondary/30 border-icon-accent/20'
                    : 'bg-white border-foreground/5 hover:border-foreground/10'
                )}
              >
                <button
                  className='w-full flex items-center justify-between p-3 text-left'
                  onClick={() => toggleExpand(i)}
                >
                  <div className='flex items-center gap-3'>
                    <div className='p-2 rounded-lg bg-icon-accent/10 text-icon-accent'>
                      <item.icon className='w-4 h-4' />
                    </div>
                    <div>
                      <span className='text-xs text-foreground/50'>{item.title}</span>
                      <p className='text-sm font-medium text-foreground'>{item.value}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-foreground/30 transition-transform duration-300',
                      isExpanded && 'rotate-180 text-icon-accent'
                    )}
                  />
                </button>

                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className='px-3 pb-3 pt-1 border-t border-foreground/5'>
                    <p className='text-xs text-foreground/60'>
                      {i === 0 && 'Feel free to reach out via email for any inquiries, collaborations, or just to say hi!'}
                      {i === 1 && 'Available for remote work worldwide. Flexible timezone adaptation for team collaboration.'}
                      {i === 2 && 'I typically respond within 24 hours on business days. Urgent matters get priority!'}
                      {i === 3 && 'Telegram is the fastest way to reach me. Email works great for detailed discussions.'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form */}
        <div className='rounded-xl bg-gradient-to-br from-white to-primary/30 border border-foreground/5 p-4'>
          <div className="text-sm font-medium text-foreground/70 mb-3">
            Send a message
          </div>
          <ContactForm />
        </div>
      </div>
    </BlockContainer>
  );
};
