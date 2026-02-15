'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BlockIds } from '@/interfaces/blocks';
import { BlockContainer, BlockTitle, ProjectCard } from '@/components';
import { useTranslation } from '@/data/i18n';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const PROJECT_KEYS = ['qaDesktop', 'pytestFramework', 'playwrightTemplate'] as const;

const PROJECT_DATA = {
  qaDesktop: { imageUrl: '/images/desk-project.jpg', url: '#', inProgress: false },
  pytestFramework: { imageUrl: '/images/coming-soon.jpg', url: '#', inProgress: true },
  playwrightTemplate: { imageUrl: '/images/coming-soon.jpg', url: '#', inProgress: true },
};

export const ProjectBlock = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 220;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <BlockContainer id={BlockIds.Projects}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <BlockTitle title={t.projects.title} id={BlockIds.Projects} />
      </motion.div>

      <div className='w-full relative group'>
        {/* Scroll buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className='absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/90 shadow-lg border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-primary'
            aria-label='Scroll left'
          >
            <ChevronLeft className='w-5 h-5' />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className='absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/90 shadow-lg border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-primary'
            aria-label='Scroll right'
          >
            <ChevronRight className='w-5 h-5' />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScrollButtons}
          className='flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {PROJECT_KEYS.map((key, index) => {
            const data = PROJECT_DATA[key];
            const item = t.projects.items[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProjectCard
                  title={item.title}
                  description={item.description}
                  imageUrl={data.imageUrl}
                  url={data.url}
                  inProgress={data.inProgress}
                  inProgressLabel={t.projects.inProgress}
                  className='snap-start'
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </BlockContainer>
  );
};
