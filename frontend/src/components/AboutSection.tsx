import { AboutBlock } from '@/components/AboutBlock';
import { ProjectBlock } from '@/components/ProjectBlock';
import { MainGrid } from '@/components';

export const AboutSection = () => {
  return (
    <div className='section-shell'>
      <div className='section-inner section-paper'>
        <MainGrid className='lg:grid-cols-[0.84fr_1.16fr] lg:gap-8'>
          <AboutBlock />
          <ProjectBlock />
        </MainGrid>
      </div>
    </div>
  );
};
