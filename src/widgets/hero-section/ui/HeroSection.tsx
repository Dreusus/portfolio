'use client';

import { BlockIds } from '@/shared/types/blocks';
import { Button, Spotlight } from '@/shared/ui';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/shared/i18n';

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id='hero-section'
      className='relative overflow-x-hidden overflow-hidden bg-colored-background md:h-[464px] px-3 sm:px-5 w-full pt-[96px]'
    >
      <Spotlight containerId='hero-section' />
      <div className='flex md:grid md:grid-cols-2 flex-col-reverse md:flex-row gap-4 align-bottom items-end h-full justify-between max-w-[1440px] mx-auto'>
        <div className='relative w-64 h-60 lg:w-[300px] lg:h-[311px] transition-all overflow-hidden bg-secondary rounded-t-[150px]'>
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
        <div className='h-full w-full md:w-auto flex flex-col items-start justify-center gap-5'>
          <h1 className='text-5xl lg:text-6xl z-20'>{t.hero.title}</h1>
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
