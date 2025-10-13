import { BlockIds } from '@/shared/types/blocks';
import { BlockContainer, BlockTitle } from '@/shared/ui';
import { Socials } from '@/shared/ui';

export const AboutBlock = () => {
  return (
    <BlockContainer id={BlockIds.AboutMe}>
      <BlockTitle title='About Me' id={BlockIds.AboutMe} />
      <div className='md:w-2/3'>
        Hi, I’m Andrey — a Fullstack QA Engineer with 3+ years of experience ensuring the quality and reliability
        of modern web applications. I specialize in Python, Playwright, and Pytest, focusing on building
        robust automated test frameworks and delivering seamless user experiences.
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
