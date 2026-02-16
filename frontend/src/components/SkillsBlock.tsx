'use client';

import { BlockContainer, BlockTitle } from '@/components';
import { SKILLS } from '@/data/skillsData';
import { BlockIds } from '@/interfaces/blocks';
import { useTranslation } from '@/data/i18n';
import { SkillCard } from './SkillCard';
import { motion } from 'framer-motion';

export const SkillsBlock = () => {
  const { t } = useTranslation();

  return (
    <BlockContainer id={BlockIds.Skills}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <BlockTitle title={t.skills.title} id={BlockIds.Skills} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative w-full"
      >
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-3xl blur-xl" />

        {/* Skills grid */}
        <div className='relative grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 w-full py-4'>
          {SKILLS.map(({ title, icon, url, defaultColor, hoverColor }, index) => (
            <SkillCard
              key={title}
              title={title}
              icon={icon}
              url={url}
              defaultColor={defaultColor}
              hoverColor={hoverColor}
              index={index}
            />
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-px bg-gradient-to-r from-transparent via-icon-accent/50 to-transparent mt-4"
        />
      </motion.div>
    </BlockContainer>
  );
};
