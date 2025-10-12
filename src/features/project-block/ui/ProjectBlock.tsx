import { BlockIds } from '@/shared/types/blocks';
import { BlockContainer, BlockTitle, ProjectCard } from '@/shared/ui';
import { PROJECTS } from '../model/data';

export const ProjectBlock = () => {
  const projects = PROJECTS.map((project, index) => (
    <ProjectCard
      key={`${project.title}-${index}`}
      title={project.title}
      description={project.description}
      imageUrl={project.imageUrl}
      url={project.url}
      inProgress={project.inProgress}
      className='shrink-0'
    />
  ));

  return (
    <BlockContainer id={BlockIds.Projects}>
      <BlockTitle title='My Projects' id={BlockIds.Projects} />
      <div className='flex gap-4 overflow-x-scroll p-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300'>
        {projects}
      </div>
    </BlockContainer>
  );
};
