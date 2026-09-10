import { HeroSection } from '@/components';

// The hero is 464px tall on md and up and paints the colored background band
// edge to edge, so the card frames it at a desktop-width viewport box.
export const Canonical = () => (
  <div className='relative overflow-hidden' style={{ width: 1100, maxWidth: '100%', height: 520 }}>
    <HeroSection />
  </div>
);
