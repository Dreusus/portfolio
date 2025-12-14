'use client';

import { DynamicLogo, Socials } from '@/shared/ui';
import { useTranslation } from '@/shared/i18n';

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className='flex justify-between items-center px-3 sm:px-5 bg-colored-background'>
      <div className='max-w-[1440px] flex items-center justify-between w-full h-full mx-auto'>
        <DynamicLogo />
        <div className='flex flex-col items-end justify-center gap-4 py-4'>
          <Socials />
          <p className='text-sm'>
            {t.footer.copyright.replace('{year}', String(year))}
          </p>
        </div>
      </div>
    </footer>
  );
};
