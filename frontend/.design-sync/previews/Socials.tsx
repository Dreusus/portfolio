import { Socials } from '@/components';

// Footer and the hero both render Socials as a bare icon row.
export const Canonical = () => (
  <div className='p-2'>
    <Socials />
  </div>
);

export const InFooterRow = () => (
  <div
    className='flex items-center justify-between border border-border rounded-xl px-4 py-3'
    style={{ width: 420 }}
  >
    <span className='text-sm text-muted-foreground'>Andrey Polyakov · QA Engineer</span>
    <Socials />
  </div>
);
