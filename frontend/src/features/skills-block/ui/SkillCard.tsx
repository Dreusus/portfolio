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
      className="flex items-center justify-center"
      style={{
        color: isHovered ? hoverColor : defaultColor,
        transition: 'color 0.6s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon('w-full h-full')}
    </a>
  );
};
