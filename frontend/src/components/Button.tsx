import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-icon-accent/50 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          'bg-icon-accent text-white hover:bg-icon-accent-dark shadow-sm hover:shadow-md',
        destructive:
          'bg-red-500 text-white hover:bg-red-600',
        outline:
          'border border-foreground/10 bg-transparent hover:bg-foreground/5 hover:border-foreground/20',
        secondary:
          'bg-secondary text-foreground hover:bg-secondary/80 border border-foreground/5',
        ghost:
          'hover:bg-foreground/5',
        link: 'text-icon-accent hover:text-icon-accent-dark',
      },
      size: {
        default: 'px-4 py-2 h-auto',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-5',
        icon: 'w-9 h-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {props.children}
    </Comp>
  );
}

export { Button, buttonVariants };
