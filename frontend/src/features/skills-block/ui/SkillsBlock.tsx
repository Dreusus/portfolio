'use client';

import { BlockContainer, BlockTitle } from '../../../shared/ui';
import { SKILLS } from '../model/data';
import { BlockIds } from '../../../shared/types/blocks';
import { useTranslation } from '../../../shared/i18n';
import { SkillCard } from './SkillCard';

export const SkillsBlock = () => {
  const { t } = useTranslation();

  return (
    <BlockContainer id={BlockIds.Skills}>
      <BlockTitle title={t.skills.title} id={BlockIds.Skills} />
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-4 grid-cols-3 gap-4 w-full'>
        {SKILLS.map(({ title, icon, url, defaultColor, hoverColor }) => (
          <SkillCard
            key={title}
            title={title}
            icon={icon}
            url={url}
            defaultColor={defaultColor}
            hoverColor={hoverColor}
          />
        ))}
      </div>
    </BlockContainer>
  );
};
