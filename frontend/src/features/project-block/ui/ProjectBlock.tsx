'use client';

import { BlockIds } from '../../../shared/types/blocks';
import { BlockContainer, BlockTitle, ProjectCard } from '../../../shared/ui';
import { useTranslation } from '../../../shared/i18n';

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
      <div className='flex gap-4 flex-wrap'>
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
            />
          );
        })}
      </div>
    </BlockContainer>
  );
};
