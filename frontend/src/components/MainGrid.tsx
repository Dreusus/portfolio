import { cn } from '@/utils/utils';

export const MainGrid = ({
  children,
  className = '',
}: Readonly<{
  children?: React.ReactNode;
  className?: string;
}>) => {
  return (
    <div
      className={cn(
        'grid h-full w-full grid-cols-1 items-start gap-8 overflow-hidden lg:grid-cols-2 lg:gap-10',
        className
      )}
    >
      {children}
    </div>
  );
};
