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
        className='text-foreground hover:text-icon-accent transition-colors duration-300'
      >
        <social.icon className='w-7 h-7' />
      </Link>
    ));
  };

  return <div className='flex gap-2'>{renderSocials()}</div>;
};
