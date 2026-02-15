'use client';

import { BlockIds } from '@/interfaces/blocks';
import { Button, TypingAnimation } from '@/components';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/data/i18n';
import { motion } from 'framer-motion';
import { Download, Mail, Sparkles } from 'lucide-react';

const FloatingParticle = ({ delay, duration, size, left, top }: {
  delay: number;
  duration: number;
  size: number;
  left: string;
  top: string;
}) => (
  <motion.div
    className="absolute rounded-full bg-icon-accent/20"
    style={{ width: size, height: size, left, top }}
    animate={{
      y: [0, -20, 0],
      opacity: [0.2, 0.5, 0.2],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id='hero-section'
      className='relative overflow-hidden min-h-[85vh] md:min-h-[600px] px-3 sm:px-5 pt-24 pb-12 md:pb-16 bg-gradient-to-b from-colored-background via-primary/20 to-background'
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingParticle delay={0} duration={4} size={6} left="10%" top="20%" />
        <FloatingParticle delay={1} duration={5} size={8} left="85%" top="30%" />
        <FloatingParticle delay={2} duration={4.5} size={4} left="20%" top="70%" />
        <FloatingParticle delay={0.5} duration={5.5} size={10} left="75%" top="80%" />
        <FloatingParticle delay={1.5} duration={3.5} size={5} left="50%" top="15%" />
        <FloatingParticle delay={2.5} duration={4} size={7} left="30%" top="50%" />
        <FloatingParticle delay={3} duration={5} size={6} left="90%" top="60%" />
        <FloatingParticle delay={0.8} duration={4.2} size={8} left="5%" top="85%" />
      </div>

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-icon-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <div className='flex flex-col items-center md:grid md:grid-cols-2 md:items-center gap-8 md:gap-4 min-h-[60vh] justify-between max-w-content mx-auto relative z-10'>
        {/* Avatar with glow effect */}
        <motion.div
          className='order-2 md:order-1 relative'
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className='relative w-52 h-52 sm:w-64 sm:h-64 lg:w-[320px] lg:h-[320px] mx-auto'>
            {/* Glow rings */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-icon-accent/40 to-secondary/40 blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute inset-2 rounded-full bg-gradient-to-r from-secondary/30 to-primary/30 blur-lg"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />
            {/* Avatar container */}
            <div className='relative w-full h-full overflow-hidden bg-secondary rounded-full border-4 border-white/50 shadow-2xl'>
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
            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-2 -right-2 bg-background rounded-full p-2 shadow-lg border border-primary"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
            >
              <Sparkles className="w-6 h-6 text-icon-accent" />
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className='order-1 md:order-2 h-full w-full flex flex-col items-center md:items-start justify-center gap-6 text-center md:text-left'
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='flex flex-col gap-3'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-sm font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {t.hero?.available || 'Открыт к предложениям'}
            </motion.div>

            <motion.h1
              className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t.hero.title}
            </motion.h1>

            <motion.div
              className='text-xl sm:text-2xl lg:text-3xl text-icon-accent font-medium min-h-[2em]'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <TypingAnimation texts={t.hero.roles} typingSpeed={80} deletingSpeed={40} />
            </motion.div>

            <motion.p
              className="text-muted-foreground text-base sm:text-lg max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {t.hero?.subtitle || 'Создаю надёжные автотесты и обеспечиваю качество продукта'}
            </motion.p>
          </div>

          <motion.div
            className='flex flex-wrap gap-3 justify-center md:justify-start'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link href={`#${BlockIds.Contact}`}>
              <Button
                className='px-6 py-3 rounded-xl h-auto bg-icon-accent hover:bg-icon-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group'
                variant='secondary'
              >
                <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                {t.hero.contactBtn}
              </Button>
            </Link>
            <Link href="/cv.pdf" target="_blank" download>
              <Button
                className='px-6 py-3 rounded-xl h-auto border-2 border-icon-accent/30 hover:border-icon-accent hover:bg-icon-accent/5 transition-all duration-300 group'
                variant='outline'
              >
                <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                {t.hero?.downloadCV || 'Скачать CV'}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-wider">{t.hero?.scrollDown || 'Прокрутите вниз'}</span>
          <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-icon-accent"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
