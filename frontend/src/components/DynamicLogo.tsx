'use client';

import Link from 'next/link';
import { useTranslation } from '@/data/i18n';

export const DynamicLogo = () => {
  const { t } = useTranslation();

  return (
    <div className='flex items-center gap-4'>
      <Link
        href={'/'}
        className='hover:text-icon-accent transition-colors duration-300'
      >
        <h1 className='text-2xl md:text-3xl z-20 font-medium'>
          {t.name.first}{' '}
          <span className='inline-block transition-all duration-500 ease-out w-0 opacity-0 translate-x-[-10px] lg:w-auto lg:opacity-100 lg:translate-x-0'>
            {t.name.last}
          </span>
        </h1>
      </Link>
    </div>
  );
};
