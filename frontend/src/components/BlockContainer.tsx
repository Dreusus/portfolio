import { cn } from '@/utils/utils';
import { motion } from 'framer-motion';

interface BlockContainerProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export const BlockContainer = ({
  children,
  id,
  className = '',
}: Readonly<BlockContainerProps>) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative flex flex-col items-center md:items-start gap-3 md:gap-4 w-full overflow-hidden py-6',
        className
      )}
    >
      {/* Decorative background gradient */}
      <div className="absolute -inset-4 bg-gradient-to-br from-icon-accent/[0.02] via-transparent to-secondary/[0.02] rounded-3xl pointer-events-none" />
      {children}
    </motion.section>
  );
};
