'use client';

import { cn } from '@/utils/utils';
import Link from 'next/link';
import { IPhoneMockup } from './IPhoneMockup';

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
  inProgressLabel = 'Coming Soon',
  className = '',
}: ProjectCardProps) => {
  return (
    <div className={cn('flex-shrink-0 w-[200px]', className)}>
      <Link href={url} className='block group'>
        <div className='relative'>
          <IPhoneMockup
            src={inProgress ? undefined : imageUrl}
            className={cn(
              'w-full h-auto transition-opacity duration-300',
              inProgress && 'opacity-50'
            )}
          />
          {inProgress && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <span className='bg-foreground/80 text-white text-xs font-medium px-3 py-1.5 rounded-full'>
                {inProgressLabel}
              </span>
            </div>
          )}
        </div>
        <div className='text-center mt-3'>
          <h4 className={cn(
            'text-sm font-semibold',
            inProgress ? 'text-foreground/40' : 'text-foreground'
          )}>
            {title}
          </h4>
          <p className='text-xs text-foreground/50 mt-1'>{description}</p>
        </div>
      </Link>
    </div>
  );
};
