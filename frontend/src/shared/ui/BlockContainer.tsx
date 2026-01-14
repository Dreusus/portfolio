import { cn } from '../utils/utils';

interface BlockContainerProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export const BlockContainer = ({
  children,
  id,
  className = '',
}: Readonly<BlockContainerProps>) => {
  return (
    <section
      id={id}
      className={cn(
        'flex flex-col items-center md:items-start gap-2.5 md:gap-4 w-full overflow-hidden',
        className
      )}
    >
      {children}
    </section>
  );
};
