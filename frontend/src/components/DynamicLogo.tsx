'use client';

import Link from 'next/link';
import { useTranslation } from '@/data/i18n';

export const DynamicLogo = () => {
  const { t } = useTranslation();

  return (
    <Link href={'/'} className='flex items-center gap-2 hover:opacity-70 transition-opacity'>
      <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-icon-accent to-accent-orange flex items-center justify-center shadow-md shadow-icon-accent/20'>
        <span className="text-white font-bold text-sm">
          {t.name.first?.[0] || 'A'}
        </span>
      </div>
      <h1 className='text-lg font-bold text-foreground'>
        {t.name.first}
        <span className='gradient-text hidden sm:inline ml-1'>{t.name.last}</span>
      </h1>
    </Link>
  );
};
