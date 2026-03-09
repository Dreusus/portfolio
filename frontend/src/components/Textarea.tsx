import * as React from 'react';

import { cn } from '@/utils/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'border-input placeholder:text-muted-foreground flex min-h-24 w-full rounded-xl border bg-surface px-4 py-3 text-base outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'hover:border-primary/70 hover:bg-surface-2',
        'focus:border-primary focus:ring-2 focus:ring-primary/25',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
