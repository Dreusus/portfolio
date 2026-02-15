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
        'w-full h-full grid grid-cols-1 gap-12 md:gap-8 md:grid-cols-2 overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
};
