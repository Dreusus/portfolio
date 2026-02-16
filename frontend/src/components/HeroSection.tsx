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
      className='relative overflow-hidden min-h-[520px] md:min-h-[580px] px-4 pt-28 pb-12'
    >
      {/* Фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary/50 to-transparent" />
      
      {/* Декоративные элементы */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-icon-accent/8 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-60 h-60 bg-accent-gold/10 rounded-full blur-2xl" />

      <div className='max-w-content mx-auto relative z-10'>
        <div className='flex flex-col md:flex-row items-center gap-10 md:gap-12'>
          {/* Avatar с красивыми эффектами */}
          <div className='relative flex-shrink-0'>
            {/* Вращающееся кольцо */}
            <div className="absolute -inset-3 rounded-full border-2 border-dashed border-icon-accent/20" style={{ animation: 'spin 25s linear infinite' }} />
            
            {/* Второе кольцо */}
            <div className="absolute -inset-1.5 rounded-full border border-icon-accent/15" />
            
            {/* Свечение */}
            <div className="absolute inset-0 rounded-full bg-icon-accent/10 blur-xl scale-110" />
            
            {/* Сама аватарка */}
            <div className='relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden bg-gradient-to-br from-accent-warm to-secondary'>
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
            
            {/* Точка статуса */}
            <div className="absolute bottom-4 right-4 w-5 h-5 bg-green-500 rounded-full border-4 border-secondary" />
          </div>

          {/* Content */}
          <div className='flex flex-col items-center md:items-start gap-5 text-center md:text-left'>
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
