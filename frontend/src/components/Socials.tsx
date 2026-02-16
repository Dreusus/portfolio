import Link from 'next/link';
import { SOCIALS } from '@/data/socials';
import { motion } from 'framer-motion';

export const Socials = () => {
  const renderSocials = () => {
    return SOCIALS.map((social, index) => (
      <motion.div
        key={social.url}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <Link
          href={social.url}
          target='_blank'
          rel='noopener noreferrer'
          className='group relative flex items-center justify-center'
        >
          <motion.div
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className='p-2.5 rounded-xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm border border-white/50 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-icon-accent/20 transition-all duration-300'
          >
            <social.icon className='w-5 h-5 text-foreground/70 group-hover:text-icon-accent transition-colors duration-300' />

            {/* Shine effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          {/* Tooltip */}
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium text-foreground/50 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            {social.name || social.url.split('/').pop()}
          </motion.span>
        </Link>
      </motion.div>
    ));
  };

  return (
    <div className='flex items-center gap-2'>
      {renderSocials()}
    </div>
  );
};
