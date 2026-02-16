'use client';

import { useTranslation } from '@/data/i18n';
import { cn } from '@/utils/utils';
import { Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en' as const, label: 'English', flag: '🇺🇸' },
    { code: 'ru' as const, label: 'Русский', flag: '🇷🇺' },
  ];

  const currentLang = languages.find(l => l.code === language);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-xl',
          'bg-gradient-to-r from-white/80 to-white/40 backdrop-blur-sm',
          'border border-white/50 shadow-sm',
          'hover:border-icon-accent/30 hover:shadow-md hover:shadow-icon-accent/10',
          'transition-all duration-300',
          className
        )}
        aria-label={`Switch to ${language === 'en' ? 'Russian' : 'English'}`}
      >
        <Globe className='w-4 h-4 text-icon-accent' />
        <span className='text-sm font-medium'>{currentLang?.flag} {currentLang?.code.toUpperCase()}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 z-50 min-w-[140px] py-1 rounded-xl bg-white/95 backdrop-blur-xl border border-white/50 shadow-xl shadow-black/10 overflow-hidden"
            >
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileHover={{ backgroundColor: 'rgba(147, 177, 139, 0.1)' }}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors',
                    language === lang.code ? 'text-icon-accent' : 'text-foreground/70'
                  )}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="flex-1 text-left">{lang.label}</span>
                  {language === lang.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                    >
                      <Check className='w-4 h-4 text-icon-accent' />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
