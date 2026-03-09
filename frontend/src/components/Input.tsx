import * as React from 'react';

import { cn } from '@/utils/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-11 w-full min-w-0 rounded-xl border bg-surface px-4 py-2 text-base outline-none transition-all duration-300 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'hover:border-primary/70 hover:bg-surface-2',
        'focus:border-primary focus:ring-2 focus:ring-primary/25',
        className
      )}
      {...props}
    />
  );
}

export { Input };
