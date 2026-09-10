import { Header } from '@/components';

// Header is position:fixed. A wrapper with its own transform becomes the
// containing block for it, so the bar lands inside the card instead of
// escaping to the top of the sheet. Heights are inline styles: the sync's
// Tailwind build only compiles classes that appear in src/.
const Viewport = ({ children }: { children: React.ReactNode }) => (
  <div
    className='relative w-full overflow-hidden rounded-xl border border-icon-accent/30'
    style={{ height: 300, transform: 'translateZ(0)' }}
  >
    {children}
  </div>
);

// The bar as layout.tsx mounts it, pinned over the top of the page.
export const Canonical = () => (
  <Viewport>
    <Header />
    <div style={{ paddingTop: 64, paddingLeft: 20, paddingRight: 20 }}>
      <div className='max-w-content mx-auto' style={{ paddingTop: 32 }}>
        <h2 className='text-4xl'>Andrey Polyakov</h2>
        <p className='text-muted-foreground mt-4'>
          Full Stack QA Engineer — automation, pipelines and the reporting
          that makes a run readable.
        </p>
      </div>
    </div>
  </Viewport>
);

// At scrollY 0 the bar is transparent — `bg-colored-background` is added
// only once the page has scrolled — so it reads straight over the section
// beneath it.
export const OverContent = () => (
  <Viewport>
    <Header />
    <div style={{ paddingTop: 64 }}>
      <div className='bg-colored-background' style={{ height: 72 }} />
      <div
        className='max-w-content mx-auto'
        style={{ padding: '24px 20px' }}
      >
        <p className='text-lg font-medium'>Projects</p>
        <p className='text-sm text-muted-foreground mt-2'>
          Nav anchors scroll to #about-me, #projects, #skills, #experience,
          #why-choose-me and #contact.
        </p>
      </div>
    </div>
  </Viewport>
);
