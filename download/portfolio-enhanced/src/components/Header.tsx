'use client';

import { DynamicLogo, LanguageSwitcher } from '@/components';
import { cn } from '@/utils/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/data/i18n';
import { BlockIds } from '@/interfaces/blocks';
import { MobileMenu } from './MobileMenu';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [activeSection, setActiveSection] = useState<string>('');
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section
      const sections = NAV_ITEMS.map((item) => item.link);
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 z-50 w-full h-[64px] px-3 sm:px-5 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg shadow-md border-b border-primary/10'
          : 'bg-transparent'
      )}
    >
      <div className='max-w-content flex items-center justify-between w-full h-full mx-auto'>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <DynamicLogo />
        </motion.div>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-1'>
          {NAV_ITEMS.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`#${item.link}`}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                  activeSection === item.link
                    ? 'text-icon-accent'
                    : 'text-foreground/70 hover:text-foreground'
                )}
              >
                {t.nav[item.key]}
                <AnimatePresence>
                  {activeSection === item.link && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-icon-accent/10 rounded-lg -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="ml-2 pl-2 border-l border-primary/30"
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
