import { ExperienceBlock } from '@/components/ExperienceBlock';
import { SkillsBlock } from '@/components/SkillsBlock';
import { MainGrid } from '@/components';

export const ExperienceSection = () => {
  return (
    <div className='section-shell'>
      <div className='section-inner section-paper'>
        <MainGrid className='lg:grid-cols-[0.9fr_1.1fr]'>
          <SkillsBlock />
          <ExperienceBlock />
        </MainGrid>
      </div>
    </div>
  );
};
