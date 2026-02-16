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
      className='group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className='w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 bg-gradient-to-br from-secondary/50 to-primary/30'
        style={{
          boxShadow: isHovered ? `0 4px 20px ${hoverColor}20` : 'none',
        }}
      >
        <div
          style={{ color: isHovered ? hoverColor : defaultColor }}
          className='transition-colors duration-300'
        >
          {icon('w-9 h-9')}
        </div>
      </div>
      <span className='text-xs font-medium text-foreground/60 group-hover:text-foreground transition-colors'>
        {title}
      </span>
    </a>
  );
};
