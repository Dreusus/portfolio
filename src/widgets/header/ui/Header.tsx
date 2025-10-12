'use client';

import {
  CONTENT_NAVIGATION_MENU,
  MOBILE_CONTENT_NAVIGATION_MENU,
} from '@/shared/consts';
import { DynamicLogo } from '@/shared/ui';
import { cn } from '@/shared/utils/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationContent = CONTENT_NAVIGATION_MENU.map((item) => (
    <Link
      href={`#${item.link}`}
      key={item.title}
      className={cn(
        'text-sm md:text-base md:block z-20 font-medium hover:opacity-60 transition-opacity duration-200',
        {
          hidden: MOBILE_CONTENT_NAVIGATION_MENU.includes(item.title),
        }
      )}
    >
      {item.title}
    </Link>
  ));

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
        </nav>
      </div>
    </header>
  );
};
