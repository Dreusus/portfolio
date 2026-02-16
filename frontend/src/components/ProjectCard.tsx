'use client';

import { cn } from '@/utils/utils';
import Link from 'next/link';
import { IPhoneMockup } from './IPhoneMockup';
import { ArrowUpRight, Lock } from 'lucide-react';

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
    <div className={cn('flex-shrink-0 w-[210px]', className)}>
      <Link href={url} className='block group'>
        <div className='relative rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/60 to-primary/40 p-3 border border-icon-accent/10 transition-all duration-300 group-hover:border-icon-accent/30 group-hover:shadow-xl group-hover:shadow-icon-accent/10'>
          {/* iPhone */}
          <div className='relative'>
            <IPhoneMockup
              src={inProgress ? undefined : imageUrl}
              className={cn(
                'w-full h-auto transition-opacity duration-300',
                inProgress && 'opacity-50'
              )}
            />

            {/* In Progress Overlay */}
            {inProgress && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='flex items-center gap-2 bg-foreground/80 backdrop-blur-sm text-white text-xs font-medium px-4 py-2 rounded-full'>
                  <Lock className='w-3.5 h-3.5' />
                  {inProgressLabel}
                </div>
              </div>
            )}

            {/* Hover overlay for active projects */}
            {!inProgress && (
              <div className='absolute inset-0 bg-gradient-to-t from-icon-accent via-icon-accent/50 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-end justify-center pb-6 rounded-2xl'>
                <span className='flex items-center gap-2 text-white text-sm font-semibold'>
                  View Project <ArrowUpRight className='w-4 h-4' />
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className='text-center mt-3'>
            <h4 className={cn(
              'text-sm font-semibold transition-colors duration-300',
              inProgress ? 'text-foreground/40' : 'text-foreground group-hover:text-icon-accent'
            )}>
              {title}
            </h4>
            <p className='text-xs text-foreground/50 mt-1 line-clamp-2'>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
