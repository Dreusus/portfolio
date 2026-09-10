import { WhyChooseMeBlock } from '@/components';

// Six fixed features, icons from src/data/chooseData.tsx and copy from i18n.
// The grid follows the viewport breakpoint, not the container, so the block
// has a single canonical story.
export const Canonical = () => (
  <div style={{ width: 720, maxWidth: '100%' }}>
    <WhyChooseMeBlock />
  </div>
);
