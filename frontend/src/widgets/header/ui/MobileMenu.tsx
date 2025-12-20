'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '../../../shared/i18n';
import { LanguageSwitcher } from '../../../shared/ui';
import { BlockIds } from '../../../shared/types/blocks';

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
      {/* Burger Button */}
      <button
        onClick={toggleMenu}
        className='p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors'
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
      </button>

      {/* Overlay + Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='fixed inset-0 bg-black/50 z-40'
              onClick={closeMenu}
            />

            {/* Drawer */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className='fixed top-0 right-0 h-full w-[280px] max-w-[85vw] bg-colored-background z-50 shadow-2xl'
            >
              {/* Close button */}
              <div className='flex justify-end p-4'>
                <button
                  onClick={closeMenu}
                  className='p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors'
                  aria-label='Close menu'
                >
                  <X className='w-5 h-5' />
                </button>
              </div>

              {/* Navigation Links */}
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
                      className='block py-3 px-4 text-lg font-medium rounded-lg hover:bg-white/10 transition-colors'
                    >
                      {t.nav[item.key]}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Language Switcher */}
              <div className='px-6 py-4 mt-auto border-t border-white/10'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-400'>
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
