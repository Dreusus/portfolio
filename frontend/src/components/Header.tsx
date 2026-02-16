'use client';

import { DynamicLogo, LanguageSwitcher } from '@/components';
import { cn } from '@/utils/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/data/i18n';
import { BlockIds } from '@/interfaces/blocks';
import { MobileMenu } from './MobileMenu';
import { motion } from 'framer-motion';

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
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);

      // Update active section based on scroll position
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

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 z-30 w-full h-[64px] px-3 sm:px-5 transition-all duration-500',
        {
          'bg-colored-background/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-white/20': isScrolled,
          'bg-transparent': !isScrolled,
        }
      )}
    >
      <div className='max-w-content flex items-center justify-between w-full h-full mx-auto'>
        <DynamicLogo />

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-1'>
          {NAV_ITEMS.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.3 }}
            >
              <Link
                href={`#${item.link}`}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full',
                  activeSection === item.link
                    ? 'text-icon-accent'
                    : 'text-foreground/70 hover:text-foreground'
                )}
              >
                {activeSection === item.link && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-icon-accent/10 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{t.nav[item.key]}</span>
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="ml-2"
          >
            <LanguageSwitcher />
          </motion.div>
        </nav>

        {/* Mobile Navigation */}
        <MobileMenu />
      </div>
    </motion.header>
  );
};
