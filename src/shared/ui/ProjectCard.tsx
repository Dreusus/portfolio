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
        'relative flex flex-col items-start gap-2.5 hover:scale-105 transition-transform duration-300 ease-in-out',
        className
      )}
    >
      <div className='relative w-[181px] h-[223px] overflow-hidden rounded-2xl'>
        <Image
          src={imageUrl}
          fill
          alt={title}
          className='object-cover'
        />
      </div>
      <div className='flex flex-col items-start gap-1'>
        <h4 className='text-lg bold font-semibold'>{title}</h4>
        <div className='text-base'>{description}</div>
      </div>

      {inProgress && (
        <span className='absolute top-2 right-2 bg-white opacity-95 text-black text-sm px-2 py-1 rounded-md'>
          🛠 {inProgressLabel}
        </span>
      )}
    </Link>
  );
};
