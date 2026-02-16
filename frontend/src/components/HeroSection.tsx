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
      className='relative overflow-hidden min-h-[500px] md:min-h-[560px] px-4 pt-28 pb-12'
    >
      {/* Мягкий градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-secondary/40 to-transparent" />
      
      {/* Декоративные элементы */}
      <div className="absolute top-24 right-1/4 w-72 h-72 bg-icon-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-accent-yellow/10 rounded-full blur-2xl" />

      <div className='max-w-content mx-auto relative z-10'>
        <div className='flex flex-col md:flex-row items-center gap-8 md:gap-10'>
          {/* Avatar */}
          <div className='relative flex-shrink-0'>
            <div className='w-52 h-52 md:w-72 md:h-72 rounded-full overflow-hidden bg-gradient-to-br from-secondary to-primary p-1.5'>
              <div className='w-full h-full rounded-full overflow-hidden bg-white/50'>
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
            {/* Тонкое декоративное кольцо */}
            <div className="absolute -inset-1 rounded-full border border-icon-accent/20" />
          </div>

          {/* Content */}
          <div className='flex flex-col items-center md:items-start gap-4 text-center md:text-left'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-foreground'>
              {t.hero.title}
            </h1>
            <div className='text-xl sm:text-2xl md:text-3xl font-semibold text-icon-accent'>
              <TypingAnimation texts={t.hero.roles} typingSpeed={80} deletingSpeed={40} />
            </div>
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
