import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-icon-accent/50 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          'bg-icon-accent text-white hover:bg-icon-accent-dark hover:shadow-lg hover:shadow-icon-accent/25 active:scale-[0.98]',
        destructive:
          'bg-red-500 text-white hover:bg-red-600',
        outline:
          'border-2 border-icon-accent/40 bg-transparent hover:bg-icon-accent/5 hover:border-icon-accent/60',
        secondary:
          'bg-secondary text-foreground hover:bg-secondary/80 border border-border',
        ghost:
          'hover:bg-accent-warm',
        link: 'text-icon-accent hover:text-icon-accent-dark',
      },
      size: {
        default: 'px-5 py-3 h-auto',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-7 text-base',
        icon: 'w-11 h-11',
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
