import Link from 'next/link';
import { SOCIALS } from '@/data/socials';

export const Socials = () => {
  return (
    <div className='flex items-center gap-2'>
      {SOCIALS.map((social) => (
        <Link
          key={social.url}
          href={social.url}
          target='_blank'
          rel='noopener noreferrer'
          className='p-2.5 rounded-xl text-foreground/50 hover:text-white hover:bg-gradient-to-r hover:from-icon-accent hover:to-accent-orange transition-all duration-300 shadow-sm'
        >
          <social.icon className='w-5 h-5' />
        </Link>
      ))}
    </div>
  );
};
