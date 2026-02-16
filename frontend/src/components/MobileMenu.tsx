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
      {/* Burger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMenu}
        className='relative p-2.5 rounded-xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm border border-white/50 shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300'
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <AnimatePresence mode='wait'>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className='w-5 h-5 text-foreground' />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className='w-5 h-5 text-foreground' />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Overlay + Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40'
              onClick={closeMenu}
            />

            {/* Drawer */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className='fixed top-0 right-0 h-full w-[300px] max-w-[85vw] z-50 shadow-2xl overflow-hidden'
              style={{
                background: 'linear-gradient(135deg, var(--colored-background) 0%, var(--primary) 100%)',
              }}
            >
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-icon-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

              {/* Close button */}
              <div className='flex justify-end p-5 relative z-10'>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeMenu}
                  className='p-2.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-foreground hover:bg-white/30 transition-colors'
                  aria-label='Close menu'
                >
                  <X className='w-5 h-5' />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <div className='flex flex-col gap-2 px-6 py-4 relative z-10'>
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    <Link
                      href={`#${item.link}`}
                      onClick={closeMenu}
                      className='group flex items-center gap-3 py-3 px-4 text-lg font-medium rounded-xl hover:bg-white/20 transition-all duration-300'
                    >
                      <span className="w-2 h-2 rounded-full bg-icon-accent/50 group-hover:bg-icon-accent group-hover:scale-150 transition-all duration-300" />
                      <span className='group-hover:translate-x-1 transition-transform duration-300'>
                        {t.nav[item.key]}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Language Switcher */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className='absolute bottom-0 left-0 right-0 px-6 py-6 border-t border-white/20 bg-white/5 backdrop-blur-sm'
              >
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-foreground/50 font-medium'>
                    {language === 'en' ? 'Language' : 'Язык'}
                  </span>
                  <LanguageSwitcher />
                </div>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
