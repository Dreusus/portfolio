'use client';

import { BlockIds } from '@/interfaces/blocks';
import { BlockContainer, BlockTitle, ProjectCard } from '@/components';
import { useTranslation } from '@/data/i18n';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const PROJECT_KEYS = ['qaDesktop', 'pytestFramework', 'playwrightTemplate'] as const;

const PROJECT_DATA = {
  qaDesktop: { imageUrl: '/images/desk-project.jpg', url: '#', inProgress: false },
  pytestFramework: { imageUrl: '/images/coming-soon.jpg', url: '#', inProgress: true },
  playwrightTemplate: { imageUrl: '/images/coming-soon.jpg', url: '#', inProgress: true },
};

export const ProjectBlock = () => {
  const { t } = useTranslation();

  return (
    <BlockContainer id={BlockIds.Projects}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <BlockTitle title={t.projects.title} id={BlockIds.Projects} />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="p-1.5 rounded-full bg-icon-accent/10"
        >
          <Sparkles className="w-4 h-4 text-icon-accent" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className='w-full relative'
      >
        {/* Background decoration */}
        <div className="absolute -inset-4 bg-gradient-to-r from-icon-accent/5 via-transparent to-secondary/5 rounded-3xl blur-2xl" />

        {/* Projects carousel */}
        <div
          className='relative flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {PROJECT_KEYS.map((key, index) => {
            const data = PROJECT_DATA[key];
            const item = t.projects.items[key];
            return (
              <ProjectCard
                key={key}
                title={item.title}
                description={item.description}
                imageUrl={data.imageUrl}
                url={data.url}
                inProgress={data.inProgress}
                inProgressLabel={t.projects.inProgress}
                className='snap-start'
                index={index}
              />
            );
          })}
        </div>

        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-colored-background to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-colored-background to-transparent pointer-events-none z-10" />
      </motion.div>
    </BlockContainer>
  );
};
