'use client';

import Link from 'next/link';
import { useTranslation } from '@/data/i18n';

export const DynamicLogo = () => {
  const { t } = useTranslation();

  return (
    <Link href={'/'} className='flex items-center gap-2 hover:opacity-70 transition-opacity'>
      <div className='w-9 h-9 rounded-xl bg-icon-accent flex items-center justify-center'>
        <span className="text-white font-bold text-sm">
          {t.name.first?.[0] || 'A'}
        </span>
      </div>
      <h1 className='text-lg font-bold text-foreground'>
        {t.name.first}
        <span className='text-icon-accent hidden sm:inline ml-1'>{t.name.last}</span>
      </h1>
    </Link>
  );
};
