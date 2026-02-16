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
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map(item => item.link);
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full h-16 px-4 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-foreground/5'
          : 'bg-transparent'
      )}
    >
      <div className='max-w-content flex items-center justify-between w-full h-full mx-auto'>
        <DynamicLogo />

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-1'>
          {NAV_ITEMS.map((item) => (
            <Link
              href={`#${item.link}`}
              key={item.key}
              className={cn(
                'relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg',
                activeSection === item.link
                  ? 'text-icon-accent'
                  : 'text-foreground/60 hover:text-foreground'
              )}
            >
              {t.nav[item.key]}
              {activeSection === item.link && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-icon-accent" />
              )}
            </Link>
          ))}
          <div className="ml-2 pl-2 border-l border-foreground/10">
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <MobileMenu />
      </div>
    </header>
  );
};
