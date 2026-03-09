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
    <div className={cn('group relative w-[220px] shrink-0 sm:w-[238px]', className)}>
      <Link
        href={url}
        className={cn(
          'block rounded-2xl border border-border/85 bg-surface px-3 pb-3 pt-4 transition-all duration-300',
          !inProgress && 'hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_18px_38px_-26px_rgba(27,45,78,0.35)]'
        )}
      >
        <div className='relative flex justify-center overflow-hidden rounded-xl bg-surface-2/70 py-3'>
          <IPhoneMockup
            src={inProgress ? undefined : imageUrl}
            className={cn(
              'h-auto w-[178px] transition-all duration-500 sm:w-[186px]',
              !inProgress && 'group-hover:scale-[1.03] group-hover:drop-shadow-[0_20px_26px_rgba(24,40,72,0.2)]',
              inProgress && 'opacity-45'
            )}
          />

          {inProgress && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <span className='rounded-full border border-secondary/65 bg-background/90 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-secondary backdrop-blur'>
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
