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
        'w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12',
        className
      )}
    >
      {children}
    </div>
  );
};
