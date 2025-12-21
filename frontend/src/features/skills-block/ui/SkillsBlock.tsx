'use client';

import { BlockContainer, BlockTitle } from '../../../shared/ui';
import { SKILLS } from '../model/data';
import { BlockIds } from '../../../shared/types/blocks';
import { useTranslation } from '../../../shared/i18n';

export const SkillsBlock = () => {
  const { t } = useTranslation();
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
      <BlockTitle title={t.skills.title} id={BlockIds.Skills} />
      <div className='grid lg:grid-cols-[repeat(4,minmax(0,150px))] md:grid-cols-[repeat(3,minmax(0,150px))] sm:grid-cols-[repeat(4,minmax(0,200px))] grid-cols-[repeat(3,minmax(0,200px))] gap-4 w-full h-full items-center justify-start'>
        {renderSkills()}
      </div>
    </BlockContainer>
  );
};
