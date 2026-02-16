'use client';

import { DynamicLogo, Socials } from '@/components';
import { useTranslation } from '@/data/i18n';
import { Heart } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className='w-full px-4 py-8 border-t border-foreground/5 bg-gradient-to-t from-primary/30 to-transparent'>
      <div className='max-w-content mx-auto flex flex-col sm:flex-row items-center sm:justify-between gap-6'>
        <div className='flex flex-col items-center sm:items-start gap-3'>
          <DynamicLogo />
          <p className='text-xs text-foreground/40'>
            {t.footer.copyright.replace('{year}', String(year))}
          </p>
        </div>

        <div className='flex items-center gap-2 text-xs text-foreground/30'>
          <span>Made with</span>
          <Heart className='w-3 h-3 text-red-400 fill-red-400' />
          <span>Next.js</span>
        </div>

        <div className='flex flex-col items-center sm:items-end gap-3'>
          <Socials />
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className='text-xs text-foreground/40'>{t.footer.available || 'Available'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
