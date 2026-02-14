import { AboutBlock } from '@/components/AboutBlock';
import { ProjectBlock } from '@/components/ProjectBlock';
import { MainGrid } from '@/components';

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
