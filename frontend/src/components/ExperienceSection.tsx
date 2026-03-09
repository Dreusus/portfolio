import { ExperienceBlock } from '@/components/ExperienceBlock';
import { SkillsBlock } from '@/components/SkillsBlock';
import { MainGrid } from '@/components';

export const ExperienceSection = () => {
  return (
    <div className='section-shell'>
      <div className='section-inner section-paper'>
        <MainGrid className='overflow-visible lg:[grid-template-columns:560px_minmax(0,1fr)] lg:justify-center lg:gap-10'>
          <SkillsBlock />
          <ExperienceBlock />
        </MainGrid>
      </div>
    </div>
  );
};
