import { HomePage } from '@/components';

// HomePage is the whole route: the dark terminal shell on a full-bleed dark
// ground. Laid out at a desktop width and scaled to fit the capture viewport
// so the shell's chrome, tabs and body are all inside the card.
export const Canonical = () => (
  <div className='relative overflow-hidden' style={{ width: 880, height: 680 }}>
    <div
      style={{
        width: 1280,
        height: 1000,
        transform: 'scale(0.68)',
        transformOrigin: 'top left',
      }}
    >
      <HomePage />
    </div>
  </div>
);
