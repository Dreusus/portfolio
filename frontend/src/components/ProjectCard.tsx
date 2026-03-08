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
  inProgressLabel = 'Soon',
  className = '',
}: ProjectCardProps) => {
  return (
    <div
      className={cn(
        'group relative flex-shrink-0 w-[200px] p-2 hover:z-10 snap-start',
        className
      )}
    >
      <Link href={url} className='block'>
        {/* iPhone */}
        <div className='relative'>
          <IPhoneMockup
            src={inProgress ? undefined : imageUrl}
            className={cn(
              'w-full h-auto transition-all duration-300',
              !inProgress && 'group-hover:scale-105 group-hover:drop-shadow-lg',
              inProgress && 'opacity-40'
            )}
          />

          {/* Locked overlay */}
          {inProgress && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <span className='bg-foreground/80 text-background text-xs font-medium tracking-wider uppercase px-4 py-2 rounded-full border border-muted-foreground/30 backdrop-blur-sm'>
                {inProgressLabel}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className='text-center mt-4'>
          <h4 className={cn('text-sm font-semibold', inProgress && 'text-muted-foreground')}>
            {title}
          </h4>
          <p className='text-xs text-muted-foreground'>{description}</p>
        </div>
      </Link>
    </div>
  );
};
