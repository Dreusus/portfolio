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

  const closeMenu = () => setIsOpen(false);

  return (
    <div className='md:hidden'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='p-2 rounded-lg hover:bg-foreground/5 transition-colors'
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
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
              className='fixed inset-0 bg-black/30 z-40'
              onClick={closeMenu}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.2 }}
              className='fixed top-0 right-0 h-full w-[280px] bg-white z-50 shadow-xl'
            >
              <div className='flex justify-end p-4'>
                <button
                  onClick={closeMenu}
                  className='p-2 rounded-lg hover:bg-foreground/5 transition-colors'
                  aria-label='Close menu'
                >
                  <X className='w-5 h-5' />
                </button>
              </div>
              <div className='flex flex-col gap-1 px-4'>
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.key}
                    href={`#${item.link}`}
                    onClick={closeMenu}
                    className='py-3 px-4 text-sm font-medium rounded-lg hover:bg-foreground/5 transition-colors'
                  >
                    {t.nav[item.key]}
                  </Link>
                ))}
              </div>
              <div className='px-4 py-4 mt-auto border-t border-foreground/5'>
                <div className='flex items-center justify-between'>
                  <span className='text-xs text-foreground/50'>
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
