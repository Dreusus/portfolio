import { cn } from '@/utils/utils';
import { motion } from 'framer-motion';

export const MainGrid = ({
  children,
  className = '',
}: Readonly<{
  children?: React.ReactNode;
  className?: string;
}>) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={cn(
        'relative w-full h-full grid grid-cols-1 gap-12 md:gap-16 lg:gap-20 md:grid-cols-2 overflow-hidden',
        className
      )}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-icon-accent/[0.02] via-transparent to-secondary/[0.02] rounded-3xl pointer-events-none" />
      {children}
    </motion.div>
  );
};
