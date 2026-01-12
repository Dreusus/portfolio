'use client';
import { cn } from '../utils/utils';
import Link from 'next/link';
import { IPhoneMockup } from './IPhoneMockup';
import { motion } from 'framer-motion';
import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  inProgress?: boolean;
  inProgressLabel?: string;
  className?: string;
}

export const ProjectCard = ({
  title,
  description,
  imageUrl,
  url,
  inProgress = false,
  inProgressLabel = 'Soon',
  className = '',
}: ProjectCardProps) => {
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={cn(
        'group relative flex-shrink-0 w-[200px] p-2 hover:z-10',
        className
      )}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link href={url} className='block'>
        {/* iPhone */}
        <div className='relative'>
          <IPhoneMockup
            src={inProgress ? undefined : imageUrl}
            className={cn(
              'w-full h-auto transition-transform duration-300',
              !inProgress && 'group-hover:scale-105',
              inProgress && 'opacity-40'
            )}
          />

          {/* Locked overlay */}
          {inProgress && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <span className='bg-gray-800/90 text-gray-300 text-xs font-medium tracking-wider uppercase px-4 py-2 rounded-full border border-gray-600'>
                {inProgressLabel}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className='text-center mt-4'>
          <h4 className={cn('text-sm font-semibold', inProgress && 'text-gray-400')}>
            {title}
          </h4>
          <p className='text-xs text-gray-500'>{description}</p>
        </div>
      </Link>
    </motion.div>
  );
};
