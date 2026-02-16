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
    <section
      id='hero-section'
      className='relative overflow-hidden md:h-[500px] px-3 sm:px-5 w-full pt-[96px] pb-8 md:pb-0'
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-colored-background via-primary/30 to-secondary/40" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-icon-accent/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-icon-accent/10 to-secondary/10 rounded-full blur-3xl" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className='flex flex-col items-center md:grid md:grid-cols-2 md:items-center gap-6 md:gap-4 h-full justify-between max-w-content mx-auto relative z-10'>
        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          className='order-2 md:order-1 relative'
        >
          <div className='relative w-48 h-48 sm:w-64 sm:h-64 lg:w-[300px] lg:h-[300px]'>
            {/* Animated rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-icon-accent/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border border-secondary/50"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border border-icon-accent/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />

            {/* Glow effect */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-icon-accent/40 via-transparent to-secondary/40 blur-xl" />

            {/* Avatar container */}
            <div className='relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-secondary to-primary p-1'>
              <div className='w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-icon-accent/20 to-secondary/30'>
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
                  className='w-full h-full z-20 rounded-full hover:scale-105 transition-transform duration-500'
                />
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -left-4 top-1/4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg border border-icon-accent/20"
            >
              <span className="text-xs font-medium text-icon-accent">QA Engineer</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -right-4 bottom-1/4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg border border-secondary/40"
            >
              <span className="text-xs font-medium text-foreground/70">Automation</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Text Content */}
        <div className='order-1 md:order-2 h-full w-full flex flex-col items-center md:items-start justify-center gap-6 text-center md:text-left'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='z-20 flex flex-col gap-3'
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-icon-accent/10 border border-icon-accent/20 w-fit mx-auto md:mx-0"
            >
              <span className="w-2 h-2 rounded-full bg-icon-accent animate-pulse" />
              <span className="text-sm font-medium text-icon-accent">
                {t.hero.subtitle || 'Available for work'}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight'
            >
              <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text">
                {t.hero.title}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className='text-2xl sm:text-3xl lg:text-4xl font-semibold'
            >
              <span className='bg-gradient-to-r from-icon-accent via-icon-accent/80 to-secondary bg-clip-text text-transparent'>
                <TypingAnimation texts={t.hero.roles} typingSpeed={80} deletingSpeed={40} />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-foreground/60 text-base sm:text-lg max-w-md"
            >
              {t.hero.description || 'Building quality software through comprehensive testing and automation'}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='z-20 flex flex-wrap gap-4'
          >
            <Link href={`#${BlockIds.Contact}`}>
              <Button
                className='px-6 py-3 rounded-xl md:px-8 md:py-4 h-auto text-base font-medium shadow-lg shadow-icon-accent/20 hover:shadow-xl hover:shadow-icon-accent/30 transition-all duration-300 hover:-translate-y-0.5'
                variant='secondary'
              >
                {t.hero.contactBtn}
              </Button>
            </Link>
            <Link href={`#${BlockIds.Projects}`}>
              <Button
                className='px-6 py-3 rounded-xl md:px-8 md:py-4 h-auto text-base font-medium bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 hover:-translate-y-0.5'
                variant='outline'
              >
                {t.hero.projectsBtn || 'View Projects'}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-foreground/40 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-foreground/20 flex items-start justify-center p-1"
        >
          <motion.div className="w-1 h-2 rounded-full bg-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};
