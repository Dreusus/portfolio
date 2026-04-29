'use client';

import { BlockIds } from '@/interfaces/blocks';
import { BlockContainer, BlockTitle, ProjectCard } from '@/components';
import { useTranslation } from '@/data/i18n';

const PROJECT_DATA: Record<string, { imageUrl: string; url: string; inProgress: boolean }> = {
  'qa-desktop': { imageUrl: '/images/desk-project.jpg', url: '#', inProgress: false },
  'api-template': { imageUrl: '/images/coming-soon.jpg', url: '#', inProgress: true },
  'playwright-template': { imageUrl: '/images/coming-soon.jpg', url: '#', inProgress: true },
};

export const ProjectBlock = () => {
  const { t } = useTranslation();

  return (
    <BlockContainer id={BlockIds.Projects}>
      <BlockTitle title={t.projects.title} id={BlockIds.Projects} />

      <div className='w-full'>
        <div
          className='flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {t.projects.items
            .filter((item) => PROJECT_DATA[item.id])
            .map((item) => {
              const data = PROJECT_DATA[item.id];
              return (
                <ProjectCard
                  key={item.id}
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
