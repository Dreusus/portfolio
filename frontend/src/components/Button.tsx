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
          'bg-icon-accent text-white hover:bg-icon-accent-dark hover:shadow-lg hover:shadow-icon-accent/20',
        destructive:
          'bg-red-500 text-white hover:bg-red-600',
        outline:
          'border border-icon-accent/30 bg-transparent hover:bg-icon-accent/5 hover:border-icon-accent/50',
        secondary:
          'bg-secondary text-foreground hover:bg-secondary/80 border border-foreground/5',
        ghost:
          'hover:bg-foreground/5',
        link: 'text-icon-accent hover:text-icon-accent-dark',
      },
      size: {
        default: 'px-5 py-2.5 h-auto',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-11 px-6',
        icon: 'w-10 h-10',
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
