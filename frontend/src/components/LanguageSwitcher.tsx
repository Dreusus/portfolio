'use client';

import { useTranslation } from '@/data/i18n';
import { cn } from '@/utils/utils';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { language, setLanguage } = useTranslation();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
      className={cn(
        'surface-panel-compact flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold',
        'text-foreground/75 hover:border-primary/45 hover:text-primary',
        className
      )}
      aria-label={`Switch to ${language === 'en' ? 'Russian' : 'English'}`}
    >
      <Globe className='w-4 h-4' />
      <span>{language === 'en' ? 'RU' : 'EN'}</span>
    </button>
  );
};
