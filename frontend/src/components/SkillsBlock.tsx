'use client';

import { BlockContainer, BlockTitle } from '@/components';
import { SKILLS } from '@/data/skillsData';
import { BlockIds } from '@/interfaces/blocks';
import { useTranslation } from '@/data/i18n';
import { SkillCard } from './SkillCard';

export const SkillsBlock = () => {
  const { t } = useTranslation();

  return (
    <BlockContainer id={BlockIds.Skills}>
      <BlockTitle title={t.skills.title} id={BlockIds.Skills} />
      <div className='w-full p-5 rounded-2xl card-base'>
        <div className='grid grid-cols-4 gap-2'>
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
      </div>
    </BlockContainer>
  );
};
