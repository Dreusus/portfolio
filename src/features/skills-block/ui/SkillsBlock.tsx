import { BlockContainer, BlockTitle } from '@/shared/ui';
import { SKILLS } from '../model/data';
import { BlockIds } from '@/shared/types/blocks';

export const SkillsBlock = () => {
  const commonClasses = 'w-full h-full';

  const renderSkills = () => {
    return SKILLS.map(({ title, icon: Icon, url }) => (
      <a
        key={title}
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center justify-center hover:opacity-80 transition-opacity duration-300'
      >
        {Icon(commonClasses)}
      </a>
    ));
  };

  return (
    <BlockContainer id={BlockIds.Skills}>
      <BlockTitle title='Skills' id={BlockIds.Skills} />
      <div className='grid lg:grid-cols-[repeat(4,minmax(0,150))] md:grid-cols-[repeat(3,minmax(0,150))] sm:grid-cols-[repeat(4,minmax(0,200))] grid-cols-[repeat(3,minmax(0,200))] gap-4 w-full h-full items-center justify-start'>
        {renderSkills()}
      </div>
    </BlockContainer>
  );
};
