import { BlockContainer, BlockTitle, MainGrid } from '@/components';

const Panel = ({ id, title, body }: { id: string; title: string; body: string }) => (
  <BlockContainer id={id}>
    <BlockTitle title={title} id={id} />
    <p className='md:w-2/3 text-center md:text-left'>{body}</p>
  </BlockContainer>
);

// MainGrid is the two-column page grid used by AboutSection, ExperienceSection
// and ContactSection: one column on mobile, two from md up.
export const Canonical = () => (
  <MainGrid>
    <Panel
      id='about-me'
      title='About me'
      body='Andrey Polyakov — Full Stack QA Engineer. I write the tests, the harness around them and the pipeline that runs them.'
    />
    <Panel
      id='projects'
      title='Projects'
      body='Playwright component suites, a pytest API template and a TestOps reporting bridge — all in production use.'
    />
  </MainGrid>
);

export const SingleChild = () => (
  <MainGrid>
    <Panel
      id='contact'
      title='Contact'
      body='apolyakov.tech — open to Full Stack QA and SDET roles.'
    />
  </MainGrid>
);

export const FourCells = () => (
  <MainGrid>
    {['Playwright', 'pytest', 'GitLab CI', 'Allure TestOps'].map((name) => (
      <div key={name} className='rounded-xl bg-colored-background p-4'>
        <p className='text-lg font-medium'>{name}</p>
        <p className='text-sm text-muted-foreground mt-2'>
          Daily driver in the current regression suite.
        </p>
      </div>
    ))}
  </MainGrid>
);

export const CustomClassName = () => (
  <MainGrid className='md:grid-cols-3'>
    {['Unit', 'Integration', 'End-to-end'].map((layer) => (
      <div key={layer} className='rounded-xl border border-icon-accent/30 p-4'>
        <p className='text-lg font-medium'>{layer}</p>
        <p className='text-sm text-muted-foreground mt-2'>Coverage layer</p>
      </div>
    ))}
  </MainGrid>
);
