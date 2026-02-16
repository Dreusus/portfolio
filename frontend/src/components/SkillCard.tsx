'use client';

import { useState } from 'react';

interface SkillCardProps {
  title: string;
  icon: (className: string) => React.ReactNode;
  url: string;
  defaultColor: string;
  hoverColor: string;
}

export const SkillCard = ({ title, icon, url, defaultColor, hoverColor }: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
      className='group flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-300'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className='w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 card-base'
        style={{
          boxShadow: isHovered ? `0 8px 32px ${hoverColor}25, inset 0 0 0 1px ${hoverColor}20` : 'none',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        <div
          style={{ color: isHovered ? hoverColor : defaultColor }}
          className='transition-all duration-300'
        >
          {icon('w-10 h-10')}
        </div>
      </div>
      <span className='text-sm font-medium text-foreground/60 group-hover:text-foreground transition-colors duration-300'>
        {title}
      </span>
    </a>
  );
};
