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
      className='relative overflow-hidden min-h-[420px] md:min-h-[480px] px-4 pt-24 pb-8'
    >
      {/* Мягкий градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-secondary/30 to-transparent" />

      {/* Декоративные круги */}
      <div className="absolute top-20 right-1/4 w-64 h-64 bg-icon-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-accent-yellow/10 rounded-full blur-2xl" />

      <div className='max-w-content mx-auto relative z-10'>
        <div className='flex flex-col md:flex-row items-center gap-8 md:gap-12'>
          {/* Avatar */}
          <div className='relative flex-shrink-0'>
            <div className='w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden bg-gradient-to-br from-secondary to-primary p-1'>
              <div className='w-full h-full rounded-full overflow-hidden bg-white'>
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
                  className='rounded-full'
                />
              </div>
            </div>
            {/* Статус онлайн */}
            <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-white rounded-full px-2.5 py-1 shadow-sm border border-foreground/5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-foreground/70">Open to work</span>
            </div>
          </div>

          {/* Content */}
          <div className='flex flex-col items-center md:items-start gap-4 text-center md:text-left'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-foreground'>
              {t.hero.title}
            </h1>
            <div className='text-xl sm:text-2xl md:text-3xl font-semibold text-icon-accent'>
              <TypingAnimation texts={t.hero.roles} typingSpeed={80} deletingSpeed={40} />
            </div>
            <p className='text-foreground/60 max-w-md text-sm md:text-base'>
              {t.hero.description || 'Building quality software through comprehensive testing'}
            </p>
            <div className='flex gap-3 mt-2'>
              <Link href={`#${BlockIds.Contact}`}>
                <Button variant='primary' size='lg'>
                  {t.hero.contactBtn}
                </Button>
              </Link>
              <Link href={`#${BlockIds.Projects}`}>
                <Button variant='outline' size='lg'>
                  {t.hero.projectsBtn || 'Projects'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
