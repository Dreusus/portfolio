'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BlockIds } from '@/interfaces/blocks';
import { BlockContainer, BlockTitle } from '@/components';
import { ContactForm } from './ContactForm';
import { useTranslation } from '@/data/i18n';
import { Mail, MapPin, Clock, Send } from 'lucide-react';

export const ContactBlock = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <BlockContainer id={BlockIds.Contact}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <BlockTitle title={t.contact.title} id={BlockIds.Contact} />
      </motion.div>

      <div className='flex flex-col gap-6 w-full max-w-[500px] mx-auto md:mx-0'>
        {/* Contact info cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2'
        >
          <a
            href='mailto:your.email@example.com'
            className='flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/30 to-transparent border border-primary/10 hover:border-icon-accent/30 transition-all duration-300 group'
          >
            <div className='p-2 rounded-lg bg-icon-accent/10 text-icon-accent group-hover:bg-icon-accent group-hover:text-white transition-all duration-300'>
              <Mail className='w-4 h-4' />
            </div>
            <div className='flex-1 min-w-0'>
              <div className='text-xs text-muted-foreground'>Email</div>
              <div className='text-sm font-medium text-foreground truncate'>your.email@example.com</div>
            </div>
          </a>

          <div className='flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/30 to-transparent border border-primary/10'>
            <div className='p-2 rounded-lg bg-icon-accent/10 text-icon-accent'>
              <MapPin className='w-4 h-4' />
            </div>
            <div className='flex-1'>
              <div className='text-xs text-muted-foreground'>{t.contact?.location || 'Локация'}</div>
              <div className='text-sm font-medium text-foreground'>{t.contact?.remote || 'Удалённо'}</div>
            </div>
          </div>

          <div className='flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/30 to-transparent border border-primary/10'>
            <div className='p-2 rounded-lg bg-icon-accent/10 text-icon-accent'>
              <Clock className='w-4 h-4' />
            </div>
            <div className='flex-1'>
              <div className='text-xs text-muted-foreground'>{t.contact?.timezone || 'Часовой пояс'}</div>
              <div className='text-sm font-medium text-foreground'>UTC+3</div>
            </div>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </BlockContainer>
  );
};
