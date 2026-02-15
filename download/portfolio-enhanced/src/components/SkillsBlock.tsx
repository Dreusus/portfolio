'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BlockContainer, BlockTitle } from '@/components';
import { SKILLS } from '@/data/skillsData';
import { BlockIds } from '@/interfaces/blocks';
import { useTranslation } from '@/data/i18n';
import { SkillCard } from './SkillCard';
import { cn } from '@/utils/utils';

const skillCategories = [
  { key: 'languages', title: 'Языки', filter: (title: string) =>
    ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Bash'].some(s => title.includes(s)) },
  { key: 'frameworks', title: 'Фреймворки', filter: (title: string) =>
    ['Playwright', 'Pytest', 'Selenium', 'Allure', 'Locust'].some(s => title.includes(s)) },
  { key: 'tools', title: 'Инструменты', filter: (title: string) =>
    ['Docker', 'Git', 'CI/CD', 'GitLab', 'GitHub'].some(s => title.includes(s)) },
  { key: 'other', title: 'Другое', filter: () => true },
];

export const SkillsBlock = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <BlockContainer id={BlockIds.Skills}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <BlockTitle title={t.skills.title} id={BlockIds.Skills} />
      </motion.div>

      {/* Skills grid with staggered animation */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-4 grid-cols-3 gap-3 md:gap-4 w-full">
        {SKILLS.map(({ title, icon, url, defaultColor, hoverColor }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
          >
            <SkillCard
              title={title}
              icon={icon}
              url={url}
              defaultColor={defaultColor}
              hoverColor={hoverColor}
            />
          </motion.div>
        ))}
      </div>

      {/* Skill badges at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 flex flex-wrap gap-2 justify-center"
      >
        {['CI/CD', 'Agile', 'Scrum', 'API Testing', 'E2E Testing', 'Performance Testing'].map((badge, index) => (
          <span
            key={badge}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-full',
              'bg-gradient-to-r from-primary/50 to-secondary/30',
              'text-foreground/80 border border-primary/20',
              'hover:border-icon-accent/50 hover:shadow-sm transition-all duration-200'
            )}
          >
            {badge}
          </span>
        ))}
      </motion.div>
    </BlockContainer>
  );
};
