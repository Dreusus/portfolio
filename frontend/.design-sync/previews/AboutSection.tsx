import { AboutSection } from '@/components';

// A full page section: AboutBlock and ProjectBlock side by side in MainGrid.
// It needs a fixed-height frame or the card collapses, and it is authored for
// a ~1500px content width — wider than the 900px capture viewport — so the
// frame renders it at that width and scales the result down to fit.
export const Canonical = () => (
  <div className='relative overflow-hidden' style={{ width: 880, height: 620 }}>
    <div style={{ width: 1500, transform: 'scale(0.585)', transformOrigin: 'top left' }}>
      <AboutSection />
    </div>
  </div>
);
