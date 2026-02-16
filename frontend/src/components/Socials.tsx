import Link from 'next/link';
import { SOCIALS } from '@/data/socials';

export const Socials = () => {
  return (
    <div className='flex items-center gap-3'>
      {SOCIALS.map((social) => (
        <Link
          key={social.url}
          href={social.url}
          target='_blank'
          rel='noopener noreferrer'
          className='p-2 rounded-lg text-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-colors duration-200'
        >
          <social.icon className='w-5 h-5' />
        </Link>
      ))}
    </div>
  );
};
