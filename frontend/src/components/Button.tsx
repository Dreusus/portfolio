import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';

import { cn } from '@/utils/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-icon-accent/50 focus-visible:ring-offset-2 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-foreground to-foreground/90 text-primary shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 hover:from-foreground hover:to-foreground/80',
        destructive:
          'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30',
        outline:
          'border-2 border-foreground/10 bg-white/50 backdrop-blur-sm text-foreground shadow-sm hover:bg-white hover:border-icon-accent/30 hover:shadow-lg hover:shadow-icon-accent/10',
        secondary:
          'bg-gradient-to-r from-secondary via-secondary to-primary text-foreground shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/50 hover:scale-[1.02]',
        ghost:
          'hover:bg-icon-accent/10 hover:text-icon-accent',
        link: 'text-icon-accent underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-6 py-3 h-auto rounded-xl has-[>svg]:px-4',
        sm: 'h-9 rounded-lg gap-1.5 px-4 has-[>svg]:px-3 text-xs',
        lg: 'h-12 rounded-xl px-8 has-[>svg]:px-6 text-base',
        icon: 'w-10 h-10 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  onClick,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 800);

    onClick?.(e);
  };

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={handleClick}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {props.children}
      </span>

      {/* Ripple effects */}
      {!asChild && ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/40 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 30, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}

      {/* Shine effect on hover */}
      {!asChild && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"
        />
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
