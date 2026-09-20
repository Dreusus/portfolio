'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from '@/data/i18n';
import { ContactForm } from '@/components/ContactForm';
import { SOCIALS } from '@/data/socials';
import { useMission } from './MissionContext';

const NAMES = ['github', 'linkedin', 'instagram', 'telegram'];

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const { release, reduced } = useMission();

  return (
    <section id='contact' className='relative mx-auto w-full max-w-content px-4 pb-32 pt-20 sm:px-6 lg:pt-28'>
      <p className='hud-label mb-4'>{t.mc.contact.label}</p>
      <motion.h2
        className='font-display text-3xl font-bold text-fg sm:text-5xl'
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ type: 'spring', stiffness: 100, damping: 22 }}
      >
        {t.contact.title}
      </motion.h2>

      <div className='mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]'>
        <div className='font-[family-name:var(--font-jetbrains)] text-sm'>
          <p className='hud-label mb-4'>{t.mc.contact.socials}</p>
          <ul className='flex flex-col gap-2'>
            {SOCIALS.map((s, i) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-fg-muted transition-colors hover:border-line hover:text-fg'
                >
                  <span className='text-brand'>$</span>
                  <span>open {NAMES[i]}</span>
                  <s.icon className='ml-auto h-5 w-5 opacity-60 transition-opacity group-hover:opacity-100' />
                  <ArrowUpRight className='h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100' />
                </a>
              </li>
            ))}
          </ul>
          <p className='mt-8 text-xs text-fg-faint'>{t.mc.footer.built}</p>
        </div>

        <div className='glass rounded-3xl p-6 sm:p-8'>
          <p className='hud-label mb-5'>{t.mc.contact.form}</p>
          <ContactForm onSuccess={release} />
        </div>
      </div>
    </section>
  );
};
