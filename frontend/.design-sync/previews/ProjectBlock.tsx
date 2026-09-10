import { ProjectBlock } from '@/components';

// The block reads its three projects from the i18n bundle and pairs them with
// /images shots, which the preview environment cannot serve — the cards render
// with their frame and copy over the shim's neutral placeholder. The row is a
// horizontal snap-scroller, so the frame is wide enough for all three cards.
export const Canonical = () => (
  <div style={{ width: 860, maxWidth: '100%' }}>
    <ProjectBlock />
  </div>
);
