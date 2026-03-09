import { AboutBlock } from '@/components/AboutBlock';
import { ProjectBlock } from '@/components/ProjectBlock';
import { MainGrid } from '@/components';

export const AboutSection = () => {
  return (
    <div className='section-shell'>
      <div className='section-inner section-paper'>
        <MainGrid className='lg:grid-cols-[1.05fr_0.95fr]'>
          <AboutBlock />
          <ProjectBlock />
        </MainGrid>
      </div>
    </div>
  );
};
