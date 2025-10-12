import Link from 'next/link';
import { SOCIALS } from '../model/socials';

export const Socials = () => {
  const renderSocials = () => {
    return SOCIALS.map((social) => (
      <Link
        key={social.url}
        href={social.url}
        target='_blank'
        rel='noopener noreferrer'
        className='text-black hover:opacity-60 transition-opacity duration-200'
      >
        <social.icon className='w-7 h-7' />
      </Link>
    ));
  };

  return <div className='flex gap-2'>{renderSocials()}</div>;
};
