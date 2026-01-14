import { ExperienceBlock } from '../../../features/experience-block';
import { SkillsBlock } from '../../../features/skills-block';
import { MainGrid } from '../../../shared/ui';

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
