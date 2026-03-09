'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/data/i18n';
import { LanguageSwitcher } from '@/components';
import { BlockIds } from '@/interfaces/blocks';

const NAV_ITEMS = [
  { key: 'about' as const, link: BlockIds.AboutMe },
  { key: 'projects' as const, link: BlockIds.Projects },
  { key: 'skills' as const, link: BlockIds.Skills },
  { key: 'experience' as const, link: BlockIds.Experience },
  { key: 'whyChooseMe' as const, link: BlockIds.WhyChooseMe },
  { key: 'contact' as const, link: BlockIds.Contact },
];

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language } = useTranslation();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <div className='md:hidden'>
      <button
        onClick={toggleMenu}
        className='inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-surface text-foreground/75 shadow-[0_8px_22px_-18px_rgba(27,45,78,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary active:translate-y-0'
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='fixed inset-0 z-[72] bg-foreground/18 backdrop-blur-[3px]'
              onClick={closeMenu}
            />

            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className='fixed inset-y-0 right-0 z-[80] flex h-dvh w-[320px] max-w-[88vw] flex-col border-l border-border/85 bg-surface/98 shadow-[0_20px_60px_-30px_rgba(9,18,34,0.55)] backdrop-blur-md'
            >
              <div className='flex items-center justify-between border-b border-border/75 px-5 py-4'>
                <p className='font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/75'>
                  {language === 'en' ? 'Navigation' : 'Навигация'}
                </p>
                <button
                  onClick={closeMenu}
                  className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-surface text-foreground/75 transition-colors hover:border-primary/45 hover:text-primary'
                  aria-label='Close menu'
                >
                  <X className='w-[18px] h-[18px]' />
                </button>
              </div>

              <div className='flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-4'>
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={`#${item.link}`}
                      onClick={closeMenu}
                      className='rounded-xl border border-border/75 bg-surface-2/45 px-4 py-3.5 text-base font-semibold text-foreground/85 transition-all duration-200 hover:border-primary/40 hover:bg-primary/6 hover:text-primary'
                    >
                      {t.nav[item.key]}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className='border-t border-border/75 px-4 py-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    {language === 'en' ? 'Language' : 'Язык'}
                  </span>
                  <LanguageSwitcher className='h-9 px-3.5 text-sm' />
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
