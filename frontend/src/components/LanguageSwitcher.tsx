'use client';

import { useTranslation } from '@/data/i18n';
import { cn } from '@/utils/utils';
import { Globe } from 'lucide-react';

/** Language toggle styled like the other HUD pills (same height, border and type size as the Bug hunt button). */
export const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { language, setLanguage } = useTranslation();

  return (
    <button
      type='button'
      onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
      className={cn(
        'flex items-center gap-2 rounded-full border border-line-strong px-3 py-1.5 text-xs text-fg-muted transition-colors',
        'hover:border-brand hover:text-brand',
        className,
      )}
      aria-label={`Switch to ${language === 'en' ? 'Russian' : 'English'}`}
    >
      <Globe className='h-3.5 w-3.5' />
      <span>{language === 'en' ? 'RU' : 'EN'}</span>
    </button>
  );
};
