import Link from 'next/link';
import { SOCIALS } from '@/data/socials';

export const Socials = () => {
  const renderSocials = () => {
    return SOCIALS.map((social) => (
      <Link
        key={social.url}
        href={social.url}
        target='_blank'
        rel='noopener noreferrer'
        className='flex size-11 items-center justify-center border border-border/75 bg-surface/60 text-foreground/80 transition-colors duration-300 hover:border-primary hover:text-primary'
      >
        <social.icon className='h-6 w-6' />
      </Link>
    ));
  };

  return <div className='flex gap-2.5'>{renderSocials()}</div>;
};
