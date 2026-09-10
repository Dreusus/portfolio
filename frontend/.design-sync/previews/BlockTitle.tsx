import { BlockContainer, BlockTitle } from '@/components';

// BlockTitle is the h2 that opens every page section. Its only state — the
// mint highlight plate — is driven by window.location.hash matching the id
// and clears itself on the next scroll, so previews show the resting title.
export const Canonical = () => <BlockTitle title='About me' id='about-me' />;

export const SectionTitles = () => (
  <div className='flex flex-col gap-6'>
    <BlockTitle title='Projects' id='projects' />
    <BlockTitle title='Skills' id='skills' />
    <BlockTitle title='Experience' id='experience' />
    <BlockTitle title='Why choose me' id='why-choose-me' />
  </div>
);

export const InBlock = () => (
  <BlockContainer id='experience'>
    <BlockTitle title='Experience' id='experience' />
    <p className='md:w-2/3'>
      Six years across manual and automated QA — from a two-person startup
      squad to a fintech platform team owning the regression suite.
    </p>
  </BlockContainer>
);

export const LongTitle = () => (
  <BlockTitle title='Why choose me as your QA engineer' id='why-choose-me' />
);
