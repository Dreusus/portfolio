import { useEffect, useRef } from 'react';
import { MobileMenu } from '@/components';

// MobileMenu is gated by `md:hidden` — a VIEWPORT media query — so it only
// exists below 768px. The drawer it opens is position:fixed, hence the
// transform wrapper acting as containing block.
const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
  <div
    className='relative overflow-hidden rounded-2xl border border-icon-accent/30'
    style={{
      width: 360,
      maxWidth: '100%',
      height: 560,
      background: '#fff',
      transform: 'translateZ(0)',
    }}
  >
    {children}
  </div>
);

export const Canonical = () => (
  <PhoneFrame>
    <div className='flex h-[64px] items-center justify-between bg-colored-background px-3'>
      <span className='text-2xl font-medium'>Andrey</span>
      <MobileMenu />
    </div>
    <div style={{ padding: '24px 16px' }}>
      <h2 className='text-4xl'>About me</h2>
      <p className='text-sm text-muted-foreground mt-4'>
        Full Stack QA Engineer. The burger opens the drawer with the six
        section anchors and the language toggle.
      </p>
    </div>
  </PhoneFrame>
);

// The drawer state is internal (`useState`), so the open story is produced by
// clicking the real burger once on mount. framer-motion is skipped in the
// preview provider, so the drawer is already at its target x = 0.
export const OpenDrawer = () => {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const btn = host.current?.querySelector('button');
    if (btn && btn.getAttribute('aria-expanded') === 'false') btn.click();
  }, []);

  return (
    <PhoneFrame>
      <div ref={host}>
        <div className='flex h-[64px] items-center justify-between bg-colored-background px-3'>
          <span className='text-2xl font-medium'>Andrey</span>
          <MobileMenu />
        </div>
      </div>
    </PhoneFrame>
  );
};
