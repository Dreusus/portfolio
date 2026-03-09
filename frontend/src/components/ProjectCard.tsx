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
    <div className={cn('group relative w-[82vw] max-w-[252px] shrink-0 sm:w-[248px] sm:max-w-none lg:w-full lg:max-w-none lg:shrink', className)}>
      <Link
        href={url}
        className={cn(
          'block rounded-2xl bg-surface px-3 pb-3 pt-4 transition-transform duration-300',
          !inProgress && 'hover:-translate-y-0.5'
        )}
      >
        <div
          className={cn(
            'relative flex justify-center overflow-hidden rounded-xl py-3',
            inProgress ? 'bg-surface-2/55' : 'bg-transparent'
          )}
        >
          <IPhoneMockup
            src={inProgress ? undefined : imageUrl}
            className={cn(
              'h-auto w-[178px] transition-all duration-500 sm:w-[186px]',
              !inProgress && 'group-hover:scale-[1.02]',
              inProgress && 'opacity-45'
            )}
          />

          {inProgress && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <span className='rounded-full border border-primary/30 bg-background/90 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary/85 backdrop-blur'>
                {inProgressLabel}
              </span>
            </div>
          )}
        </div>

        <div className='space-y-1 pt-3 text-center'>
          <h4 className={cn('text-lg font-semibold text-foreground', inProgress && 'text-muted-foreground')}>
            {title}
          </h4>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
      </Link>
    </div>
  );
};
