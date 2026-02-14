import { ExperienceBlock } from '@/components/ExperienceBlock';
import { SkillsBlock } from '@/components/SkillsBlock';
import { MainGrid } from '@/components';

export const ExperienceSection = () => {
  return (
    <div className='w-full px-3 sm:px-5'>
      <div className='w-full max-w-content mx-auto'>
        <MainGrid>
          <SkillsBlock />
          <ExperienceBlock />
        </MainGrid>
      </div>
    </div>
  );
};
