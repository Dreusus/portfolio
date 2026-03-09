import { cn } from '@/utils/utils';

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
        'flex min-w-0 w-full flex-col gap-5',
        className
      )}
    >
      {children}
    </section>
  );
};
