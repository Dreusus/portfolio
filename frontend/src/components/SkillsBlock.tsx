'use client';

import { BlockContainer, BlockTitle } from '@/components';
import { SKILLS } from '@/data/skillsData';
import { BlockIds } from '@/interfaces/blocks';
import { useTranslation } from '@/data/i18n';
import { SkillCard } from './SkillCard';

export const SkillsBlock = () => {
  const { t } = useTranslation();

  return (
    <BlockContainer id={BlockIds.Skills} className='lg:sticky lg:top-28'>
      <BlockTitle title={t.skills.title} id={BlockIds.Skills} />
      <div className='grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
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
