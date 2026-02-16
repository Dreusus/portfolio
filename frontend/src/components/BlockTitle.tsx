'use client';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/utils/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface BlockTitleProps {
  title: string;
  id: string;
}

export const BlockTitle = ({ title, id }: Readonly<BlockTitleProps>) => {
  const [active, setActive] = useState(false);
  const lastHash = useRef('');
  const activatedAt = useRef(0);

  useEffect(() => {
    const checkHash = () => {
      const currentHash = window.location.hash;
      if (currentHash === `#${id}` && lastHash.current !== currentHash) {
        setActive(true);
        activatedAt.current = Date.now();
      }
      lastHash.current = currentHash;
    };

    const handleScroll = () => {
      if (active && Date.now() - activatedAt.current > 800) {
        setActive(false);
      }
    };

    checkHash();
    const interval = setInterval(checkHash, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [id, active]);

  return (
    <motion.h2
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className='relative text-3xl sm:text-4xl font-bold text-center md:text-left mb-2'
    >
      {/* Active highlight background */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className='absolute -inset-x-4 -inset-y-1 bg-gradient-to-r from-icon-accent/20 via-primary/30 to-secondary/20 rounded-xl -z-10'
          />
        )}
      </AnimatePresence>

      {/* Gradient text */}
      <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
        {title}
      </span>

      {/* Underline decoration */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='absolute -bottom-2 left-0 right-0 md:left-0 md:right-auto h-1 bg-gradient-to-r from-icon-accent via-secondary to-transparent rounded-full origin-left'
        style={{ width: '60%' }}
      />

      {/* Decorative dot */}
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3, type: 'spring' }}
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-icon-accent/50 hidden md:block"
      />
    </motion.h2>
  );
};
