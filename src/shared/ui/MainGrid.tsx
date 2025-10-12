import { cn } from '../utils/utils';

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
        'w-full h-full grid grid-cols-1 gap-10 md:gap-16 md:grid-cols-2',
        className
      )}
    >
      {children}
    </div>
  );
};
