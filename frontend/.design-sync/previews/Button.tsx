import { Button } from '@/components';

// Token reality worth knowing: `default` pairs --primary (light mint #e5efe6)
// with --primary-foreground (near-white) and `link` uses text-primary on a
// light ground — both read as unlabelled. Every call site in the app
// (HeroSection, ContactForm) uses variant="secondary", so the stories that
// stand in for real usage do too; Variants keeps the honest full axis.
export const Canonical = () => (
  <div className='flex flex-wrap items-center gap-3'>
    <Button variant='secondary' className='px-4 py-2 rounded-md md:px-6 md:py-4 h-auto md:rounded-2xl'>
      Contact me
    </Button>
    <Button variant='outline'>View projects</Button>
    <Button variant='ghost'>Skip</Button>
  </div>
);

export const Variants = () => {
  const items = [
    { name: 'default', node: <Button>Download CV</Button> },
    { name: 'secondary', node: <Button variant='secondary'>View projects</Button> },
    { name: 'outline', node: <Button variant='outline'>Read more</Button> },
    { name: 'ghost', node: <Button variant='ghost'>Skip</Button> },
    { name: 'link', node: <Button variant='link'>apolyakov.tech</Button> },
    { name: 'destructive', node: <Button variant='destructive'>Delete report</Button> },
  ];
  return (
    <div className='flex flex-wrap items-start gap-3'>
      {items.map(({ name, node }) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
          <div style={{ minHeight: 36, display: 'flex', alignItems: 'center' }}>{node}</div>
          <span style={{ fontSize: 11, lineHeight: '14px', color: '#71717a', fontFamily: 'var(--font-geist-mono, monospace)' }}>
            {name}
          </span>
        </div>
      ))}
    </div>
  );
};

export const Sizes = () => (
  <div className='flex flex-wrap items-center gap-3'>
    <Button variant='secondary' size='sm'>
      Small
    </Button>
    <Button variant='secondary'>Default</Button>
    <Button variant='secondary' size='lg'>
      Large
    </Button>
    <Button variant='outline' size='icon' aria-label='Open menu'>
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <path d='M4 6h16M4 12h16M4 18h16' strokeLinecap='round' />
      </svg>
    </Button>
  </div>
);

export const WithIcon = () => (
  <div className='flex flex-wrap items-center gap-3'>
    <Button variant='secondary'>
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <path d='M12 3v12m0 0 4-4m-4 4-4-4M4 19h16' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
      Download CV
    </Button>
    <Button variant='outline'>
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <path d='M5 12h14m0 0-5-5m5 5-5 5' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
      Get in touch
    </Button>
  </div>
);

export const Disabled = () => (
  <div className='flex flex-wrap items-center gap-3'>
    <Button variant='secondary' disabled>
      Submitting…
    </Button>
    <Button variant='outline' disabled>
      Unavailable
    </Button>
  </div>
);
