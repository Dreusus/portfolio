'use client';

import Link from 'next/link';
import { useTranslation } from '@/data/i18n';

export const DynamicLogo = () => {
  const { t } = useTranslation();

  return (
    <Link href={'/'} className='hover:opacity-70 transition-opacity'>
      <h1 className='text-xl font-bold text-foreground'>
        {t.name.first} <span className='text-icon-accent hidden sm:inline'>{t.name.last}</span>
      </h1>
    </Link>
  );
};
