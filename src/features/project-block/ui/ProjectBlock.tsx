'use client';

import { BlockIds } from '@/shared/types/blocks';
import { BlockContainer, BlockTitle, ProjectCard } from '@/shared/ui';
import { useTranslation } from '@/shared/i18n';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PROJECT_KEYS = ['qaDesktop', 'pytestFramework', 'playwrightTemplate'] as const;

const PROJECT_DATA = {
  qaDesktop: { imageUrl: '/images/desk-project.jpg', url: '#', inProgress: false },
  pytestFramework: { imageUrl: '/images/coming-soon.jpg', url: '#', inProgress: true },
  playwrightTemplate: { imageUrl: '/images/coming-soon.jpg', url: '#', inProgress: true },
};

export const ProjectBlock = () => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [needsScroll, setNeedsScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        setNeedsScroll(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
      }
    };

    checkScroll();

    const resizeObserver = new ResizeObserver(checkScroll);
    if (scrollRef.current) {
      resizeObserver.observe(scrollRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <BlockContainer id={BlockIds.Projects}>
      <BlockTitle title={t.projects.title} id={BlockIds.Projects} />

      <div className='relative w-full'>
        {/* Scroll Buttons - only show when content overflows */}
        {needsScroll && (
          <>
            <button
              onClick={() => scroll('left')}
              className='hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors'
              aria-label='Scroll left'
            >
              <ChevronLeft className='w-5 h-5' />
            </button>

            <button
              onClick={() => scroll('right')}
              className='hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors'
              aria-label='Scroll right'
            >
              <ChevronRight className='w-5 h-5' />
            </button>
          </>
        )}

        {/* Slider */}
        <div
          ref={scrollRef}
          className='flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {PROJECT_KEYS.map((key) => {
            const data = PROJECT_DATA[key];
            const item = t.projects.items[key];
            return (
              <ProjectCard
                key={key}
                title={item.title}
                description={item.description}
                imageUrl={data.imageUrl}
                url={data.url}
                inProgress={data.inProgress}
                inProgressLabel={t.projects.inProgress}
                className='snap-start'
              />
            );
          })}
        </div>
      </div>
    </BlockContainer>
  );
};
