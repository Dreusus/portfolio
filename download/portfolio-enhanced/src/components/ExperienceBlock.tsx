'use client';

import { useState } from 'react';
import { ChevronDown, Calendar, Building2, Briefcase } from 'lucide-react';
import { BlockContainer, BlockTitle } from '@/components';
import { BlockIds } from '@/interfaces/blocks';
import { useTranslation } from '@/data/i18n';
import { cn } from '@/utils/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const ExperienceBlock = () => {
  const { t } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const jobs = t.experience.jobs;

  return (
    <BlockContainer id={BlockIds.Experience}>
      <BlockTitle title={t.experience.title} id={BlockIds.Experience} />

      <div className='flex flex-col gap-6 relative'>
        {/* Timeline line */}
        <div className='absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-icon-accent via-secondary to-primary' />

        {jobs.map((item, i) => {
          const isExpanded = expandedIndex === i;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className='relative'
            >
              {/* Timeline dot */}
              <motion.div
                className={cn(
                  'absolute left-0 top-3 w-6 h-6 rounded-full border-2 border-background',
                  'flex items-center justify-center',
                  'transition-all duration-300',
                  isExpanded
                    ? 'bg-icon-accent scale-110'
                    : 'bg-secondary'
                )}
              >
                <div
                  className={cn(
                    'w-2 h-2 rounded-full transition-colors duration-300',
                    isExpanded ? 'bg-white' : 'bg-icon-accent/50'
                  )}
                />
              </motion.div>

              {/* Card */}
              <div
                className={cn(
                  'ml-10 p-4 rounded-xl cursor-pointer group',
                  'bg-gradient-to-r from-primary/20 to-transparent',
                  'border border-primary/10',
                  'hover:border-icon-accent/30 hover:shadow-md',
                  'transition-all duration-300'
                )}
                onClick={() => toggleExpand(i)}
              >
                {/* Header */}
                <div className='flex items-start justify-between gap-4'>
                  <div className='flex-1'>
                    <div className='flex flex-wrap items-center gap-2 mb-1'>
                      <Briefcase className='w-4 h-4 text-icon-accent' />
                      <h3 className='font-semibold text-lg text-foreground'>
                        {item.title}
                      </h3>
                    </div>

                    <div className='flex flex-wrap items-center gap-3 text-sm text-muted-foreground'>
                      <span className='flex items-center gap-1'>
                        <Building2 className='w-3.5 h-3.5' />
                        {item.company}
                      </span>
                      <span className='flex items-center gap-1'>
                        <Calendar className='w-3.5 h-3.5' />
                        {item.period}
                      </span>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className='p-1'
                  >
                    <ChevronDown className='w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors' />
                  </motion.div>
                </div>

                {/* Expandable content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className='overflow-hidden'
                    >
                      <ul className='mt-4 pt-4 border-t border-primary/10 space-y-2'>
                        {item.points.map((text, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.05 }}
                            className='text-foreground/80 text-sm flex items-start gap-3'
                          >
                            <span className='text-icon-accent mt-1 text-lg leading-none'>•</span>
                            <span className='leading-relaxed'>{text}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </BlockContainer>
  );
};
