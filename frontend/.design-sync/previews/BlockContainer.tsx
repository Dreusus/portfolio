import { BlockContainer, BlockTitle, Button } from '@/components';

// BlockContainer is the section wrapper every content block sits in
// (AboutBlock, ProjectBlock, SkillsBlock…): a full-width column, centred on
// mobile and left-aligned from md up.
export const Canonical = () => (
  <BlockContainer id='about-me'>
    <BlockTitle title='About me' id='about-me' />
    <div className='md:w-2/3'>
      I&apos;m Andrey Polyakov, a Full Stack QA Engineer. I build test
      automation that developers actually keep — Playwright and pytest suites
      wired straight into CI, with reporting people read.
    </div>
  </BlockContainer>
);

export const WithActions = () => (
  <BlockContainer id='contact'>
    <BlockTitle title='Contact' id='contact' />
    <p className='md:w-2/3'>
      Open to Full Stack QA and SDET roles. The fastest route is email; the CV
      covers the last six years in detail.
    </p>
    <div className='flex items-center gap-3'>
      <Button variant='secondary'>Write to me</Button>
      <Button variant='outline'>Download CV</Button>
    </div>
  </BlockContainer>
);

export const CustomClassName = () => (
  <BlockContainer id='skills' className='rounded-2xl bg-colored-background p-6'>
    <BlockTitle title='Skills' id='skills' />
    <div className='flex items-center gap-2' style={{ flexWrap: 'wrap' }}>
      {['Playwright', 'pytest', 'TypeScript', 'PostgreSQL', 'GitLab CI'].map(
        (skill) => (
          <span
            key={skill}
            className='rounded-lg border border-icon-accent/30 px-3 py-1 text-sm'
            style={{ background: '#fff' }}
          >
            {skill}
          </span>
        )
      )}
    </div>
  </BlockContainer>
);
