import { ExperienceBlock } from '@/components';

// The timeline reads its jobs from the i18n bundle and keeps the first entry
// expanded by default — that is the state the page loads in.
export const Canonical = () => (
  <div style={{ width: 560, maxWidth: '100%' }}>
    <ExperienceBlock />
  </div>
);
