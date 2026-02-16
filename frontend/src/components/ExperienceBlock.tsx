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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <BlockTitle title={t.experience.title} id={BlockIds.Experience} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className='flex flex-col gap-6 relative'
      >
        {/* Timeline line */}
        <div className='absolute left-[11px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-icon-accent via-secondary to-transparent' />

        {jobs.map((item, i) => {
          const isExpanded = expandedIndex === i;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className='relative'
            >
              {/* Timeline dot */}
              <motion.div
                className='absolute left-0 top-3 w-6 h-6 rounded-full bg-gradient-to-br from-icon-accent to-secondary flex items-center justify-center shadow-lg shadow-icon-accent/30'
                animate={isExpanded ? { scale: 1.2 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className='w-2 h-2 rounded-full bg-white' />
              </motion.div>

              {/* Card */}
              <motion.div
                className='pl-10 cursor-pointer group'
                onClick={() => toggleExpand(i)}
                whileHover={{ x: 4 }}
              >
                <motion.div
                  className={cn(
                    'relative overflow-hidden rounded-2xl border transition-all duration-300',
                    isExpanded
                      ? 'bg-white shadow-xl shadow-icon-accent/10 border-icon-accent/30'
                      : 'bg-white/50 hover:bg-white/80 border-transparent hover:border-white/50'
                  )}
                >
                  {/* Gradient overlay on hover */}
                  <div className={cn(
                    'absolute inset-0 bg-gradient-to-r from-icon-accent/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                    isExpanded && 'opacity-100'
                  )} />

                  {/* Content */}
                  <div className='relative p-4 sm:p-5'>
                    {/* Header */}
                    <div className='flex items-start justify-between gap-4'>
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center gap-2 mb-1'>
                          <Briefcase className='w-4 h-4 text-icon-accent flex-shrink-0' />
                          <h3 className='font-bold text-lg text-foreground truncate'>{item.title}</h3>
                        </div>

                        <div className='flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground/60'>
                          <span className='flex items-center gap-1.5'>
                            <Building2 className='w-3.5 h-3.5' />
                            {item.company}
                          </span>
                          <span className='flex items-center gap-1.5'>
                            <Calendar className='w-3.5 h-3.5' />
                            {item.period}
                          </span>
                        </div>
                      </div>

                      <motion.div
                        animate={isExpanded ? { rotate: 180 } : { rotate: 0 }}
                        transition={{ duration: 0.3 }}
                        className='flex-shrink-0 p-1.5 rounded-full bg-icon-accent/10 text-icon-accent'
                      >
                        <ChevronDown className='w-4 h-4' />
                      </motion.div>
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className='overflow-hidden'
                        >
                          <motion.ul
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            className='mt-4 space-y-2'
                          >
                            {item.points.map((text, j) => (
                              <motion.li
                                key={j}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: j * 0.05 }}
                                className='flex items-start gap-3 text-sm text-foreground/70'
                              >
                                <span className='mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-icon-accent to-secondary flex-shrink-0' />
                                <span>{text}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </BlockContainer>
  );
};
