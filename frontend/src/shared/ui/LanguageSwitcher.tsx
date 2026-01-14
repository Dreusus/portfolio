'use client';

import { useTranslation } from '../i18n';
import { cn } from '../utils/utils';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { language, setLanguage } = useTranslation();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
      className={cn(
        'flex items-center gap-1.5 px-2 py-1.5 sm:px-3 rounded-lg border border-transparent bg-white/10 transition-all text-sm font-medium',
        'hover:border-icon-accent hover:shadow-sm',
        className
      )}
      aria-label={`Switch to ${language === 'en' ? 'Russian' : 'English'}`}
    >
      <Globe className='w-4 h-4' />
      <span className='hidden sm:inline'>{language === 'en' ? 'RU' : 'EN'}</span>
    </button>
  );
};
