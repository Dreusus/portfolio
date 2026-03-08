'use client';

import { DynamicLogo, LanguageSwitcher } from '@/components';
import { cn } from '@/utils/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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

  return (
    <header
      className={cn(
        'fixed top-0 z-30 w-full h-[64px] px-3 sm:px-5 transition-colors duration-300',
        {
          'bg-colored-background': isScrolled,
        }
      )}
    >
      <div className='max-w-content flex items-center justify-between w-full h-full mx-auto'>
        <DynamicLogo />

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-6'>
          {NAV_ITEMS.map((item) => (
            <Link
              href={`#${item.link}`}
              key={item.key}
              className='nav-link text-base font-medium hover:text-icon-accent transition-colors duration-300'
            >
              {t.nav[item.key]}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>

        {/* Mobile Navigation */}
        <MobileMenu />
      </div>
    </header>
  );
};
