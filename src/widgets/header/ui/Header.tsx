'use client';

import { MOBILE_CONTENT_NAVIGATION_MENU } from '@/shared/consts';
import { DynamicLogo, LanguageSwitcher } from '@/shared/ui';
import { cn } from '@/shared/utils/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/shared/i18n';
import { BlockIds } from '@/shared/types/blocks';

const NAV_ITEMS = [
  { key: 'about' as const, link: BlockIds.AboutMe },
  { key: 'projects' as const, link: BlockIds.Projects },
  { key: 'skills' as const, link: BlockIds.Skills },
  { key: 'experience' as const, link: BlockIds.Experience },
  { key: 'whyChooseMe' as const, link: BlockIds.WhyChooseMe },
  { key: 'contact' as const, link: BlockIds.Contact },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationContent = NAV_ITEMS.map((item) => {
    const title = t.nav[item.key];
    return (
      <Link
        href={`#${item.link}`}
        key={item.key}
        className={cn(
          'text-sm md:text-base md:block z-20 font-medium hover:opacity-60 transition-opacity duration-200',
          {
            hidden: MOBILE_CONTENT_NAVIGATION_MENU.includes(item.key),
          }
        )}
      >
        {title}
      </Link>
    );
  });

  return (
    <header
      className={cn(
        'fixed top-0 z-30 w-full h-[64px] px-3 sm:px-5 transition-colors duration-300',
        {
          'bg-colored-background': isScrolled,
        }
      )}
    >
      <div className='max-w-[1440px] flex items-center justify-between w-full h-full mx-auto'>
        <DynamicLogo />
        <nav className='flex items-center gap-4 md:gap-6'>
          {navigationContent}
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
};
