'use client';

import { DynamicLogo, LanguageSwitcher } from '@/components';
import Link from 'next/link';
import { useTranslation } from '@/data/i18n';
import { BlockIds } from '@/interfaces/blocks';
import { MobileMenu } from './MobileMenu';

const NAV_ITEMS = [
  { key: 'about' as const, link: BlockIds.AboutMe },
  { key: 'projects' as const, link: BlockIds.Projects },
  { key: 'skills' as const, link: BlockIds.Skills },
  { key: 'experience' as const, link: BlockIds.Experience },
  { key: 'whyChooseMe' as const, link: BlockIds.WhyChooseMe },
  { key: 'contact' as const, link: BlockIds.Contact },
];

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className='relative z-40 w-full px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto mt-3 flex h-16 w-full max-w-content items-center justify-between rounded-2xl border border-border/90 bg-surface/92 px-4 backdrop-blur-md transition-all duration-300 sm:px-5'>
        <DynamicLogo />

        <nav className='hidden items-center gap-7 md:flex'>
          {NAV_ITEMS.map((item) => (
            <Link
              href={`#${item.link}`}
              key={item.key}
              className='nav-link text-sm font-semibold text-foreground/75 hover:text-primary'
            >
              {t.nav[item.key]}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
};
