'use client';

import { BlockIds } from '@/interfaces/blocks';
import { Button, TypingAnimation } from '@/components';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/data/i18n';

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id='hero-section'
      className='relative overflow-hidden md:min-h-[500px] px-4 pt-24 pb-12 md:py-0 md:pt-32'
    >
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-transparent pointer-events-none" />

      <div className='max-w-content mx-auto relative z-10'>
        <div className='flex flex-col md:flex-row items-center gap-8 md:gap-12'>
          {/* Avatar */}
          <div className='relative w-40 h-40 md:w-64 md:h-64 flex-shrink-0'>
            <div className='w-full h-full rounded-full overflow-hidden bg-secondary'>
              <Image
                src='/images/me.png'
                alt='Profile'
                fill
                priority
                quality={100}
                style={{
                  objectPosition: 'center top',
                  objectFit: 'cover',
                }}
                className='w-full h-full rounded-full'
              />
            </div>
          </div>

          {/* Content */}
          <div className='flex flex-col items-center md:items-start gap-4 text-center md:text-left'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-foreground'>
              {t.hero.title}
            </h1>
            <div className='text-xl sm:text-2xl md:text-3xl font-medium text-icon-accent'>
              <TypingAnimation texts={t.hero.roles} typingSpeed={80} deletingSpeed={40} />
            </div>
            <p className='text-foreground/60 max-w-md'>
              {t.hero.description || 'Building quality software through comprehensive testing'}
            </p>
            <Link href={`#${BlockIds.Contact}`} className='mt-2'>
              <Button variant='secondary' size='lg'>
                {t.hero.contactBtn}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
