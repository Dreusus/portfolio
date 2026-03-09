'use client';

import Link from 'next/link';
import { useTranslation } from '@/data/i18n';

export const DynamicLogo = () => {
  const { t } = useTranslation();

  return (
    <div className='flex items-center gap-3'>
      <Link
        href={'/'}
        className='transition-colors duration-300 hover:text-primary'
      >
        <h1 className='z-20 text-2xl font-bold leading-none tracking-tight sm:text-3xl'>
          {t.name.first}{' '}
          <span className='text-primary'>
            {t.name.last}
          </span>
        </h1>
      </Link>
    </div>
  );
};
