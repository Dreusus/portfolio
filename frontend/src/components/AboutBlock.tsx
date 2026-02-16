'use client';

import { BlockIds } from '@/interfaces/blocks';
import { BlockContainer, BlockTitle } from '@/components';
import { Socials } from '@/components';
import { useTranslation } from '@/data/i18n';
import { Code2, TestTube, Bug, Sparkles } from 'lucide-react';

const STATS = [
  { icon: Code2, value: '5+', label: 'Years' },
  { icon: TestTube, value: '100+', label: 'Projects' },
  { icon: Bug, value: '500+', label: 'Bugs Found' },
  { icon: Sparkles, value: '99%', label: 'Quality' },
];

export const AboutBlock = () => {
  const { t } = useTranslation();

  return (
    <BlockContainer id={BlockIds.AboutMe}>
      <BlockTitle title={t.about.title} id={BlockIds.AboutMe} />

      <div className='md:w-2/3 space-y-6'>
        {/* Description */}
        <p className='text-foreground/70 leading-relaxed'>
          {t.about.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-primary/80 to-secondary/50 border border-foreground/5"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <stat.icon className="w-5 h-5 text-icon-accent" />
              <span className="text-xl font-bold text-foreground">{stat.value}</span>
              <span className="text-xs text-foreground/50">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Socials */}
        <div className='flex flex-col items-start gap-2 pt-2'>
          <span className='text-sm font-medium text-foreground/50'>
            {t.about.socialLinks}
          </span>
          <Socials />
        </div>
      </div>
    </BlockContainer>
  );
};
