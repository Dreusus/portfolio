import { SkillsBlock } from '@/components';

// SkillsBlock maps the full SKILLS list into a responsive icon grid; no props,
// so the only axis is the column width. At the capture viewport (900px) the
// grid resolves to `md:grid-cols-3`, which makes the block ~1000px tall — the
// frame scales it down so all five rows are inside the card.
export const Canonical = () => (
  <div className='relative overflow-hidden' style={{ width: 380, height: 640 }}>
    <div style={{ width: 600, transform: 'scale(0.56)', transformOrigin: 'top left' }}>
      <SkillsBlock />
    </div>
  </div>
);
