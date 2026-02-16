'use client';

import { BlockIds } from '@/interfaces/blocks';
import { BlockContainer, BlockTitle } from '@/components';
import { ContactForm } from './ContactForm';
import { useTranslation } from '@/data/i18n';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock } from 'lucide-react';

export const ContactBlock = () => {
  const { t } = useTranslation();

  return (
    <BlockContainer id={BlockIds.Contact}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <BlockTitle title={t.contact.title} id={BlockIds.Contact} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className='relative w-full max-w-[450px] mx-auto md:mx-0'
      >
        {/* Background decoration */}
        <div className="absolute -inset-4 bg-gradient-to-br from-icon-accent/10 via-transparent to-secondary/10 rounded-3xl blur-2xl" />

        {/* Contact info cards */}
        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {[
            { icon: Mail, label: 'Email', value: 'contact@example.com' },
            { icon: MapPin, label: 'Location', value: 'Remote' },
            { icon: Clock, label: 'Response', value: '< 24h' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/50 hover:border-icon-accent/30 transition-all duration-300"
            >
              <div className="p-2 rounded-lg bg-icon-accent/10">
                <item.icon className="w-4 h-4 text-icon-accent" />
              </div>
              <div className="text-center">
                <p className="text-xs text-foreground/50">{item.label}</p>
                <p className="text-sm font-medium text-foreground/80">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form container */}
        <div className='relative flex flex-col gap-4 w-full rounded-2xl bg-white/50 backdrop-blur-sm border border-white/50 p-4 sm:p-6 shadow-xl shadow-black/5'>
          <ContactForm />
        </div>
      </motion.div>
    </BlockContainer>
  );
};
