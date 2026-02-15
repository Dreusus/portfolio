'use client';

import { DynamicLogo, Socials } from '@/components';
import { useTranslation } from '@/data/i18n';
import { BlockIds } from '@/interfaces/blocks';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';

const FOOTER_LINKS = [
  { key: 'about', link: BlockIds.AboutMe },
  { key: 'projects', link: BlockIds.Projects },
  { key: 'skills', link: BlockIds.Skills },
  { key: 'experience', link: BlockIds.Experience },
  { key: 'contact', link: BlockIds.Contact },
];

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-gradient-to-t from-foreground/5 to-background border-t border-primary/10">
      <div className="max-w-content mx-auto px-3 sm:px-5 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <DynamicLogo />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {t.footer?.description ||
                'Full Stack QA Инженер, создающий надёжные автотесты и обеспечивающий качество продукта.'}
            </p>
            <Socials className="mt-2" />
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <h3 className="font-semibold text-foreground">
              {t.footer?.quickLinks || 'Навигация'}
            </h3>
            <nav className="flex flex-col gap-2">
              {FOOTER_LINKS.map((item) => (
                <Link
                  key={item.key}
                  href={`#${item.link}`}
                  className="text-muted-foreground hover:text-icon-accent transition-colors duration-200 text-sm"
                >
                  {t.nav[item.key]}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <h3 className="font-semibold text-foreground">
              {t.footer?.contact || 'Контакты'}
            </h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a
                href="mailto:your.email@example.com"
                className="hover:text-icon-accent transition-colors duration-200"
              >
                your.email@example.com
              </a>
              <a
                href="https://t.me/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-icon-accent transition-colors duration-200"
              >
                @yourusername
              </a>
            </div>

            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-icon-accent transition-colors duration-200 mt-2"
            >
              <ArrowUp className="w-4 h-4" />
              {t.footer?.backToTop || 'Наверх'}
            </motion.button>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-muted-foreground text-sm">
            {t.footer.copyright.replace('{year}', currentYear.toString())}
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            {t.footer?.madeWith || 'Сделано с'}{' '}
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />{' '}
            {t.footer?.using || 'на Next.js & Tailwind CSS'}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
