'use client';

import { BlockIds } from '@/interfaces/blocks';
import { BlockContainer, BlockTitle, ProjectCard } from '@/components';
import { useTranslation } from '@/data/i18n';

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
      <BlockTitle title={t.projects.title} id={BlockIds.Projects} />

      <div className='relative w-full'>
        <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-surface to-transparent' />
        <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-surface to-transparent' />
        <div className='scrollbar-hide -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 pt-1'>
          {PROJECT_KEYS.map((key) => {
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
              />
            );
          })}
        </div>
      </div>
    </BlockContainer>
  );
};
