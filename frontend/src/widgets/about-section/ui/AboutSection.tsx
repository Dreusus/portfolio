import { AboutBlock } from '../../../features/about-block';
import { ProjectBlock } from '../../../features/project-block';
import { MainGrid } from '../../../shared/ui';

export const AboutSection = () => {
  return (
    <div className='w-full px-3 sm:px-5'>
      <div className='flex flex-col-reverse md:flex-row gap-4 align-bottom items-end w-full h-full justify-between max-w-content mx-auto'>
        <MainGrid>
          <AboutBlock />
          <ProjectBlock />
        </MainGrid>
      </div>
    </div>
  );
};
