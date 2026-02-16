'use client';

import { useTranslation } from '@/data/i18n';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { language, setLanguage } = useTranslation();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium hover:bg-foreground/5 transition-colors ${className || ''}`}
      aria-label={`Switch to ${language === 'en' ? 'Russian' : 'English'}`}
    >
      <Globe className='w-4 h-4 text-foreground/50' />
      <span>{language === 'en' ? 'RU' : 'EN'}</span>
    </button>
  );
};
