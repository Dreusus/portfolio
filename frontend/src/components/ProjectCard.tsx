'use client';

import { cn } from '@/utils/utils';
import Link from 'next/link';
import { IPhoneMockup } from './IPhoneMockup';
import { Lock } from 'lucide-react';

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
    <div className={cn('flex-shrink-0 w-[220px]', className)}>
      <Link href={url} className='block group'>
        <div className='relative rounded-2xl overflow-hidden p-4 card-base transition-all duration-300 group-hover:shadow-xl group-hover:shadow-icon-accent/10 group-hover:scale-[1.02]'>
          {/* iPhone */}
          <div className='relative'>
            <IPhoneMockup
              src={inProgress ? undefined : imageUrl}
              className={cn(
                'w-full h-auto transition-all duration-300',
                inProgress && 'opacity-40'
              )}
            />

            {/* In Progress Overlay */}
            {inProgress && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='flex items-center gap-2 bg-foreground/75 text-foreground/90 text-xs font-medium px-4 py-2 rounded-full backdrop-blur-sm'>
                  <Lock className='w-3.5 h-3.5' />
                  {inProgressLabel}
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className='text-center mt-4'>
            <h4 className={cn(
              'text-sm font-semibold transition-colors duration-300',
              inProgress ? 'text-foreground/40' : 'text-foreground group-hover:text-icon-accent'
            )}>
              {title}
            </h4>
            <p className='text-xs text-foreground/50 mt-1.5 line-clamp-2'>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
