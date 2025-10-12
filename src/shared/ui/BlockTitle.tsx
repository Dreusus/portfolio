'use client';
import { useEffect, useState } from 'react';
import { cn } from '../utils/utils';

interface BlockTitleProps {
  title: string;
  id: string;
}

export const BlockTitle = ({ title, id }: Readonly<BlockTitleProps>) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const updateActiveState = () => {
      setActive(window.location.hash === `#${id}`);
    };

    updateActiveState();

    const onPopState = () => updateActiveState();
    const interval = setInterval(updateActiveState, 200);

    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
      clearInterval(interval);
    };
  }, [id]);

  return (
    <h2 className={cn('text-4xl relative rounded-lg', active && '')}>
      {active && (
        <div className='absolute w-[110%] -right-[5%] h-full bg-primary box-border py-0.5 px-2 -z-10 rounded-lg' />
      )}
      {title}
    </h2>
  );
};
