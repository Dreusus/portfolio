import { AboutBlock } from '../../../features/about-block';
import { ProjectBlock } from '../../../features/project-block';
import { MainGrid } from '../../../shared/ui';

export const AboutSection = () => {
  return (
    <div className='w-full px-3 sm:px-5'>
      <div className='w-full max-w-content mx-auto'>
        <MainGrid>
          <AboutBlock />
          <ProjectBlock />
        </MainGrid>
      </div>
    </div>
  );
};
