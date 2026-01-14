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
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-4 grid-cols-3 gap-4 w-full'>
        {renderSkills()}
      </div>
    </BlockContainer>
  );
};
