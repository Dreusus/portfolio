'use client';

import { cn } from '@/utils/utils';
import Link from 'next/link';
import { IPhoneMockup } from './IPhoneMockup';
import { motion } from 'framer-motion';
import { ArrowUpRight, Lock } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  inProgress?: boolean;
  inProgressLabel?: string;
  className?: string;
  index?: number;
}

export const ProjectCard = ({
  title,
  description,
  imageUrl,
  url,
  inProgress = false,
  inProgressLabel = 'Coming Soon',
  className = '',
  index = 0,
}: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={cn(
        'group relative flex-shrink-0 w-[220px] sm:w-[240px] snap-start',
        className
      )}
    >
      <Link href={url} className='block'>
        {/* Card container */}
        <motion.div
          className={cn(
            'relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-secondary/20 p-3 border border-white/50',
            'shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-icon-accent/20',
            'transition-all duration-500'
          )}
        >
          {/* iPhone Mockup */}
          <div className='relative'>
            <motion.div
              animate={!inProgress ? { y: [0, -5, 0] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <IPhoneMockup
                src={inProgress ? undefined : imageUrl}
                className={cn(
                  'w-full h-auto transition-all duration-500',
                  !inProgress && 'group-hover:scale-[1.02]',
                  inProgress && 'opacity-50 grayscale'
                )}
              />
            </motion.div>

            {/* Locked overlay */}
            {inProgress && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='absolute inset-0 flex items-center justify-center'
              >
                <div className='flex flex-col items-center gap-3'>
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className='p-3 rounded-full bg-gray-800/90 backdrop-blur-sm'
                  >
                    <Lock className='w-6 h-6 text-gray-300' />
                  </motion.div>
                  <span className='bg-gray-800/90 backdrop-blur-sm text-gray-300 text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full border border-gray-600/50'>
                    {inProgressLabel}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Hover overlay */}
            {!inProgress && (
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className='absolute inset-0 bg-gradient-to-t from-icon-accent/90 via-icon-accent/50 to-transparent flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl'
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  className='flex items-center gap-2 text-white font-medium'
                >
                  <span>View Project</span>
                  <ArrowUpRight className='w-4 h-4' />
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className='text-center mt-5 px-2 pb-2'>
            <h4 className={cn(
              'font-bold text-base mb-1.5 transition-colors duration-300',
              inProgress ? 'text-foreground/40' : 'text-foreground group-hover:text-icon-accent'
            )}>
              {title}
            </h4>
            <p className='text-sm text-foreground/50 line-clamp-2'>{description}</p>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-icon-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-20 left-4 w-4 h-4 rounded-full bg-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      </Link>

      {/* External glow on hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-icon-accent/20 to-secondary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
    </motion.div>
  );
};
