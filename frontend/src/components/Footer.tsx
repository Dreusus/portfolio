'use client';

import { DynamicLogo, Socials } from '@/components';
import { useTranslation } from '@/data/i18n';

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className='section-shell relative w-full border-t border-border/80 py-8'>
      <div className='section-inner relative z-10 flex h-full w-full flex-col items-center gap-4 sm:flex-row sm:justify-between'>
        <DynamicLogo />
        <div className='flex flex-col items-center sm:items-end justify-center gap-2 sm:gap-4'>
          <Socials />
          <p className='text-xs sm:text-sm text-center sm:text-right'>
            {t.footer.copyright.replace('{year}', String(year))}
          </p>
        </div>
      </div>
    </footer>
  );
};
