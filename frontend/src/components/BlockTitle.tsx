'use client';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/utils/utils';

interface BlockTitleProps {
  title: string;
  id: string;
}

export const BlockTitle = ({ title, id }: Readonly<BlockTitleProps>) => {
  const [active, setActive] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const activateTitle = () => {
      if (window.location.hash === `#${id}`) {
        setActive(true);
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
          setActive(false);
        }, 850);
      }
    };

    activateTitle();
    window.addEventListener('hashchange', activateTitle);

    return () => {
      window.removeEventListener('hashchange', activateTitle);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [id]);

  return (
    <div className='relative w-fit'>
      <h2 className='text-3xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-4xl'>{title}</h2>
      <span
        className={cn(
          'absolute -bottom-2 left-0 h-[3px] rounded-full bg-primary transition-all duration-300',
          active ? 'w-full opacity-100' : 'w-14 opacity-80'
        )}
      />
    </div>
  );
};
