import { AboutBlock } from '@/components';

// AboutBlock takes no props — copy comes from the i18n bundle and the social
// links from src/data/socials.ts. One story: the block at the column width it
// occupies inside MainGrid.
export const Canonical = () => (
  <div style={{ width: 560, maxWidth: '100%' }}>
    <AboutBlock />
  </div>
);
