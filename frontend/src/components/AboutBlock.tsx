'use client';

import { BlockIds } from '@/interfaces/blocks';
import { BlockContainer, BlockTitle } from '@/components';
import { Socials } from '@/components';
import { useTranslation } from '@/data/i18n';
import { motion } from 'framer-motion';
import { Code2, TestTube, Bug, Sparkles } from 'lucide-react';

const STATS = [
  { icon: Code2, value: '5+', label: 'Years Experience' },
  { icon: TestTube, value: '100+', label: 'Tests Written' },
  { icon: Bug, value: '500+', label: 'Bugs Found' },
  { icon: Sparkles, value: '99%', label: 'Quality Rate' },
];

export const AboutBlock = () => {
  const { t } = useTranslation();

  return (
    <BlockContainer id={BlockIds.AboutMe}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <BlockTitle title={t.about.title} id={BlockIds.AboutMe} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className='md:w-2/3 space-y-6'
      >
        {/* Description */}
        <div className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-icon-accent via-secondary to-transparent rounded-full" />
          <p className="text-foreground/80 leading-relaxed text-base sm:text-lg">
            {t.about.description}
          </p>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6"
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative bg-gradient-to-br from-white to-secondary/30 rounded-2xl p-4 border border-white/50 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-icon-accent/10 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-2 rounded-xl bg-icon-accent/10 group-hover:bg-icon-accent/20 transition-colors">
                  <stat.icon className="w-5 h-5 text-icon-accent" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-xs text-foreground/50 font-medium">
                  {stat.label}
                </span>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-icon-accent/20 group-hover:bg-icon-accent/40 transition-colors" />
            </motion.div>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='flex flex-col items-start gap-3'
        >
          <span className="text-sm font-medium text-foreground/50 flex items-center gap-2">
            <span className="w-8 h-px bg-gradient-to-r from-icon-accent to-transparent" />
            {t.about.socialLinks}
          </span>
          <Socials />
        </motion.div>
      </motion.div>
    </BlockContainer>
  );
};
