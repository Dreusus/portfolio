'use client';

import { BlockIds } from '@/interfaces/blocks';
import { Button, TypingAnimation } from '@/components';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/data/i18n';
import { motion } from 'framer-motion';


export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section id='hero-section' className='section-shell relative w-full'>
      <div className='section-inner section-paper relative overflow-hidden'>
        <div className='absolute -right-14 -top-10 h-44 w-44 rounded-full bg-primary/15 blur-3xl' />
        <div className='absolute -bottom-10 left-0 h-40 w-40 rounded-full bg-secondary/14 blur-3xl' />

        <div className='relative z-10 grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]'>
          <div className='space-y-6'>
            <p className='font-mono text-xs uppercase tracking-[0.22em] text-primary/85'>
              QA Automation Engineer
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='text-4xl font-bold leading-[0.98] tracking-tight text-foreground sm:text-5xl lg:text-6xl'
            >
              {t.hero.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className='inline-flex w-fit rounded-full border border-primary/35 bg-primary/8 px-4 py-2 text-xl font-semibold text-primary sm:text-2xl'
            >
              <TypingAnimation texts={t.hero.roles} typingSpeed={80} deletingSpeed={40} />
            </motion.div>

            <div className='flex flex-wrap gap-2'>
              {t.hero.roles.slice(0, 3).map((role) => (
                <span
                  key={role}
                  className='rounded-full border border-border/90 bg-surface-2 px-3 py-1 text-xs font-medium text-foreground/75'
                >
                  {role}
                </span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='pt-1'
            >
              <Link href={`#${BlockIds.Contact}`}>
                <Button variant='default' className='h-auto rounded-full px-6 py-3 normal-case tracking-normal'>
                  {t.hero.contactBtn}
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className='mx-auto w-full max-w-[360px] lg:justify-self-end'>
            <div className='avatar-glow relative aspect-[4/5] overflow-hidden rounded-3xl border border-border/85 bg-surface-2 shadow-[0_22px_56px_-38px_rgba(27,45,78,0.45)]'>
              <Image
                src='/images/me.png'
                alt={t.hero.title + ' portfolio photo'}
                fill
                priority
                quality={100}
                className='h-full w-full object-cover object-top'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
