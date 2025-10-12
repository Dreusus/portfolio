import { BlockIds } from '@/shared/types/blocks';
import { BlockContainer, BlockTitle } from '@/shared/ui';
import { Socials } from '@/shared/ui';

export const AboutBlock = () => {
  return (
    <BlockContainer id={BlockIds.AboutMe}>
      <BlockTitle title='About Me' id={BlockIds.AboutMe} />
      <div className='md:w-2/3'>
        Hi, I’m Mike — a Fullstack Developer with 5+ years of experience
        building modern, fast, and scalable web applications. I specialize in
        React, TypeScript, and Node.js, and enjoy solving complex problems with
        clean, maintainable code.
        <br />
        <br />
        <div className='flex flex-col items-start gap-2'>
          Here you can find my social links:
          <Socials />
        </div>
      </div>
    </BlockContainer>
  );
};
