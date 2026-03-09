'use client';

import { useState } from 'react';
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

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className='md:hidden'>
      <button
        onClick={toggleMenu}
        className='surface-panel-compact p-2 text-foreground/75 transition-colors hover:border-primary/45 hover:text-primary'
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
              className='fixed inset-0 z-40 bg-black/35 backdrop-blur-[2px]'
              onClick={closeMenu}
            />

            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className='fixed top-0 right-0 z-50 h-full w-[300px] max-w-[88vw] border-l border-border/80 bg-surface shadow-2xl'
            >
              <div className='flex justify-end p-4'>
                <button
                  onClick={closeMenu}
                  className='surface-panel-compact p-2 text-foreground/75 transition-colors hover:border-primary/45 hover:text-primary'
                  aria-label='Close menu'
                >
                  <X className='w-5 h-5' />
                </button>
              </div>

              <div className='flex flex-col gap-2 px-6 py-4'>
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
                      className='block border-b border-border/70 px-0 py-3 text-base font-semibold text-foreground/85 transition-colors hover:text-primary'
                    >
                      {t.nav[item.key]}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className='mt-auto border-t border-border/70 px-6 py-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    {language === 'en' ? 'Language' : 'Язык'}
                  </span>
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
