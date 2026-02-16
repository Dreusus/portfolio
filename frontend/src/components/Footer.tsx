'use client';

import { DynamicLogo, Socials } from '@/components';
import { useTranslation } from '@/data/i18n';

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className='w-full px-4 py-8 border-t border-foreground/5 bg-colored-background'>
      <div className='max-w-content mx-auto flex flex-col sm:flex-row items-center sm:justify-between gap-4'>
        <DynamicLogo />
        <div className='flex flex-col items-center sm:items-end gap-3'>
          <Socials />
          <p className='text-xs text-foreground/40'>
            {t.footer.copyright.replace('{year}', String(year))}
          </p>
        </div>
      </div>
    </footer>
  );
};
