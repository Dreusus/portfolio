'use client';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/utils/utils';

interface BlockTitleProps {
  title: string;
  id: string;
}

export const BlockTitle = ({ title, id }: Readonly<BlockTitleProps>) => {
  const [active, setActive] = useState(false);
  const lastHash = useRef('');
  const activatedAt = useRef(0);

  useEffect(() => {
    const checkHash = () => {
      const currentHash = window.location.hash;
      if (currentHash === `#${id}` && lastHash.current !== currentHash) {
        setActive(true);
        activatedAt.current = Date.now();
      }
      lastHash.current = currentHash;
    };

    const handleScroll = () => {
      if (active && Date.now() - activatedAt.current > 800) {
        setActive(false);
      }
    };

    checkHash();
    const interval = setInterval(checkHash, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [id, active]);

  return (
    <h2 className={cn(
      'text-xl sm:text-2xl font-bold text-foreground text-center md:text-left mb-1 transition-colors duration-300',
      active && 'text-icon-accent'
    )}>
      {title}
    </h2>
  );
};
