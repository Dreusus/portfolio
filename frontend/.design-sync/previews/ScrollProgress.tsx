import { ScrollProgress } from '@/components';

// ScrollProgress is a position:fixed 2px rail at the very top of the window.
// A wrapper with its own transform becomes the containing block, so the rail
// renders inside the card. Its filled width comes from window.scrollY, which
// is 0 in a static capture, so the live cells show the resting rail: the
// full-width bg-muted track (near-white — it needs a tinted ground to read)
// with the gradient fill at zero.
const Viewport = ({ children }: { children: React.ReactNode }) => (
  <div
    className='relative w-full overflow-hidden rounded-xl border border-icon-accent/30'
    style={{ height: 200, transform: 'translateZ(0)', background: '#dfe7dc' }}
  >
    {children}
  </div>
);

export const Canonical = () => (
  <Viewport>
    {/* scrollY is 0 in a static capture, so the live rail would sit at 0% and
        the card would show nothing of the component. This scoped rule pins the
        real component's fill at the width it computes mid-page. */}
    <style>{`[data-sp-canonical] .fixed > div { width: 45% !important; }`}</style>
    <div data-sp-canonical>
      <ScrollProgress />
    </div>
    <div className='max-w-content mx-auto' style={{ padding: '32px 20px' }}>
      <h2 className='text-4xl'>Projects</h2>
      <p className='text-muted-foreground mt-4'>
        The rail is pinned above every section and tracks reading position
        through the page — shown here at 45%, mid-portfolio.
      </p>
    </div>
  </Viewport>
);

// The rail's geometry on a tinted ground: the live component at rest, next to
// the same track and gradient at the width it computes mid-page.
export const RailAnatomy = () => (
  <div className='flex flex-col gap-6'>
    <div>
      <p className='text-sm text-muted-foreground'>
        Live component — scrollY 0, fill at 0%
      </p>
      <div
        className='relative w-full overflow-hidden rounded-md border border-icon-accent/30'
        style={{
          height: 14,
          marginTop: 8,
          background: '#dfe7dc',
          transform: 'translateZ(0)',
        }}
      >
        <ScrollProgress />
      </div>
    </div>
    <div>
      <p className='text-sm text-muted-foreground'>
        Same track and gradient at 45% — mid-page
      </p>
      <div
        className='relative w-full overflow-hidden rounded-md border border-icon-accent/30'
        style={{ height: 14, marginTop: 8, background: '#dfe7dc' }}
      >
        <div className='absolute top-0 left-0 w-full h-0.5 bg-muted'>
          <div
            className='h-full rounded-r-full bg-gradient-to-r from-icon-accent via-primary to-secondary'
            style={{ width: '45%' }}
          />
        </div>
      </div>
    </div>
    <div>
      <p className='text-sm text-muted-foreground'>
        The same 45% rail magnified ×6 — track, gradient stops and the
        rounded right cap
      </p>
      <div
        className='relative w-full overflow-hidden rounded-md border border-icon-accent/30'
        style={{ height: 12, marginTop: 8 }}
      >
        <div className='absolute top-0 left-0 w-full h-full bg-muted'>
          <div
            className='h-full rounded-r-full bg-gradient-to-r from-icon-accent via-primary to-secondary'
            style={{ width: '45%' }}
          />
        </div>
      </div>
    </div>
  </div>
);
