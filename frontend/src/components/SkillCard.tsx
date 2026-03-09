'use client';

import type { CSSProperties } from 'react';

interface SkillCardProps {
  title: string;
  icon: (className: string) => React.ReactNode;
  url: string;
  defaultColor: string;
  hoverColor: string;
}

export const SkillCard = ({ title, icon, url, defaultColor, hoverColor }: SkillCardProps) => {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={title}
      className='group flex min-h-[122px] flex-col items-center justify-center gap-3 rounded-2xl border border-border/85 bg-surface-2/55 p-4 text-[var(--skill-base)] transition-all duration-300 hover:border-primary/50 hover:bg-surface-2 hover:text-[var(--skill-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35'
      style={{
        '--skill-base': defaultColor,
        '--skill-hover': hoverColor,
      } as CSSProperties}
    >
      {icon('h-12 w-12 sm:h-14 sm:w-14 transition-transform duration-300 group-hover:scale-105')}
      <span className='font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground/90'>
        {title}
      </span>
    </a>
  );
};
