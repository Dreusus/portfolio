import { DynamicLogo } from '@/components';

// The wordmark used by both Header and Footer. The surname is revealed only
// from the lg breakpoint up, so narrower hosts show just the first name.
export const Canonical = () => <DynamicLogo />;

export const OnHeaderPlate = () => (
  <div
    className='flex h-[64px] items-center justify-between rounded-xl bg-colored-background'
    style={{ paddingLeft: 20, paddingRight: 20 }}
  >
    <DynamicLogo />
    <span className='text-sm text-muted-foreground'>
      about · projects · skills · contact
    </span>
  </div>
);

export const InFooterRow = () => (
  <div
    className='flex flex-col sm:flex-row items-center sm:justify-between gap-4 rounded-xl bg-colored-background'
    style={{ padding: '16px 20px' }}
  >
    <DynamicLogo />
    <p className='text-xs sm:text-sm text-muted-foreground'>
      © 2026 Andrey Polyakov. All rights reserved.
    </p>
  </div>
);
