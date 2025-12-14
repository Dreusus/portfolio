import Image from 'next/image';
import { cn } from '../utils/utils';
import Link from 'next/link';

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
  inProgressLabel = 'In Progress',
  className = '',
}: ProjectCardProps) => {
  return (
    <Link
      href={url}
      className={cn(
        'group relative block w-[200px] flex-shrink-0 rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition-all duration-300',
        className
      )}
    >
      {/* Image */}
      <div className='relative w-full aspect-[4/5] overflow-hidden'>
        <Image
          src={imageUrl}
          fill
          alt={title}
          className='object-cover group-hover:scale-105 transition-transform duration-300'
        />

        {/* In Progress Badge */}
        {inProgress && (
          <span className='absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-black text-xs font-medium px-2 py-1 rounded-full'>
            {inProgressLabel}
          </span>
        )}
      </div>

      {/* Content */}
      <div className='p-4'>
        <h4 className='text-base font-semibold mb-1 truncate'>{title}</h4>
        <p className='text-sm text-gray-400 truncate'>{description}</p>
      </div>
    </Link>
  );
};
