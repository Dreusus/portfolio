'use client';

import { DynamicLogo, Socials } from '../../../shared/ui';
import { useTranslation } from '../../../shared/i18n';

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className='relative flex justify-between items-center px-3 sm:px-5 bg-colored-background overflow-hidden'>
      <div className='max-w-content flex flex-col sm:flex-row items-center sm:justify-between gap-4 w-full h-full mx-auto py-4 relative z-10'>
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
