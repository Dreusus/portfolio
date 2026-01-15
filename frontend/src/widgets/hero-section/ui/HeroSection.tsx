'use client';

import { BlockIds } from '../../../shared/types/blocks';
import { Button, TypingAnimation } from '../../../shared/ui';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '../../../shared/i18n';

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id='hero-section'
      className='relative overflow-x-hidden overflow-hidden md:h-[464px] px-3 sm:px-5 w-full pt-[96px] pb-8 md:pb-0 bg-colored-background'
    >
      <div className='flex flex-col items-center md:grid md:grid-cols-2 md:items-center gap-6 md:gap-4 h-full justify-between max-w-content mx-auto relative z-10'>
        <div className='order-2 md:order-1 relative w-48 h-48 sm:w-64 sm:h-64 lg:w-[300px] lg:h-[300px] transition-all overflow-hidden bg-secondary rounded-full'>
          <Image
            src='/images/me.png'
            alt='Hero Image'
            fill
            priority
            quality={100}
            style={{
              objectPosition: 'center top',
              objectFit: 'cover',
            }}
            className='w-full h-full z-20 rounded-full'
          />
        </div>
        <div className='order-1 md:order-2 h-full w-full flex flex-col items-center md:items-start justify-center gap-5 text-center md:text-left'>
          <div className='z-20 flex flex-col gap-2'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl'>{t.hero.title}</h1>
            <div className='text-2xl sm:text-3xl lg:text-4xl text-icon-accent font-medium'>
              <TypingAnimation texts={t.hero.roles} typingSpeed={80} deletingSpeed={40} />
            </div>
          </div>
          <Link className='z-20' href={`#${BlockIds.Contact}`}>
            <Button
              className='px-4 py-2 rounded-md md:px-6 md:py-4 h-auto md:rounded-2xl'
              variant='secondary'
            >
              {t.hero.contactBtn}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
