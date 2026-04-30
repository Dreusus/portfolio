'use client';

import React from 'react';
import { BugHunter } from '@/hooks';

interface BugProps {
  id: string;
  hunter: BugHunter;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

export const Bug: React.FC<BugProps> = ({
  id,
  hunter,
  className = '',
  style = {},
  color = 'currentColor',
}) => {
  if (!hunter.active) return null;
  const caught = hunter.found.has(id);

  return (
    <button
      type='button'
      onClick={(e) => {
        e.stopPropagation();
        hunter.catchBug(id);
      }}
      aria-label='Bug'
      className={`bug-target ${caught ? 'bug-caught' : ''} ${className}`}
      style={{
        position: 'absolute',
        width: 22,
        height: 22,
        background: 'transparent',
        border: 0,
        cursor: caught ? 'default' : 'crosshair',
        padding: 0,
        zIndex: 30,
        opacity: caught ? 0.25 : 1,
        ...style,
      }}
    >
      <svg
        viewBox='0 0 24 24'
        width='22'
        height='22'
        fill='none'
        stroke={color}
        strokeWidth='1.6'
        strokeLinecap='round'
      >
        <ellipse cx='12' cy='13' rx='5' ry='6' fill={caught ? color : 'none'} />
        <path d='M12 7V4 M9 5l3 2 3-2' />
        <path d='M7 10L3 9 M7 13H3 M7 16l-4 1' />
        <path d='M17 10l4-1 M17 13h4 M17 16l4 1' />
        <path d='M12 8v10 M9.5 11h5 M9.5 14h5' />
      </svg>
    </button>
  );
};
