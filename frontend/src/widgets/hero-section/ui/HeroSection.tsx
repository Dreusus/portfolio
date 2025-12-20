'use client';

import { BlockIds } from '../../../shared/types/blocks';
import { Button, Spotlight } from '../../../shared/ui';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '../../../shared/i18n';

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id='hero-section'
      className='relative overflow-x-hidden overflow-hidden bg-colored-background md:h-[464px] px-3 sm:px-5 w-full pt-[96px]'
    >
      <Spotlight containerId='hero-section' />
      <div className='flex flex-col items-center md:grid md:grid-cols-2 md:items-end gap-6 md:gap-4 h-full justify-between max-w-[1440px] mx-auto'>
        <div className='order-2 md:order-1 relative w-48 h-48 sm:w-64 sm:h-60 lg:w-[300px] lg:h-[311px] transition-all overflow-hidden bg-secondary rounded-t-[150px]'>
          <Image
            src='/images/me.png'
            alt='Hero Image'
            fill
            priority
            quality={100}
            objectFit='cover'
            style={{
              objectPosition: 'center',
              objectFit: 'cover',
            }}
            className='w-full h-full z-20 rounded-t-[150px] md:rounded-t-[200px] lg:rounded-t-[250px]'
          />
        </div>
        <div className='order-1 md:order-2 h-full w-full flex flex-col items-center md:items-start justify-center gap-5 text-center md:text-left'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl z-20'>{t.hero.title}</h1>
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
