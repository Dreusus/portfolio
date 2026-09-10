import { BugHunterPill } from '@/components/terminal';
import type { BugHunter } from '@/hooks';

// The pill is `position: fixed` — a wrapper with a transform becomes its
// containing block, which keeps it inside the card instead of pinning it to
// the page corner. Inline styles: Tailwind only emits utilities found in `src/`.
const hunter = (foundCount: number, total = 5): BugHunter => ({
  active: true,
  found: new Set(Array.from({ length: foundCount }, (_, i) => `bug-${i}`)),
  total,
  toggle: () => {},
  catchBug: () => {},
  complete: foundCount === total,
});

const Frame = ({ dark, children }: { dark: boolean; children: React.ReactNode }) => (
  <div
    style={{
      position: 'relative',
      transform: 'translateZ(0)',
      width: 320,
      height: 190,
      overflow: 'hidden',
      borderRadius: 8,
      border: `1px solid ${dark ? '#21262d' : '#e1e4e8'}`,
      background: dark ? '#0d1117' : '#fafbfc',
    }}
  >
    {children}
  </div>
);

export const DarkStart = () => (
  <Frame dark>
    <BugHunterPill hunter={hunter(0)} theme='dark' accent='#3fb950' />
  </Frame>
);

export const DarkInProgress = () => (
  <Frame dark>
    <BugHunterPill hunter={hunter(3)} theme='dark' accent='#3fb950' />
  </Frame>
);

export const LightInProgress = () => (
  <Frame dark={false}>
    <BugHunterPill hunter={hunter(2)} theme='light' accent='#28a745' />
  </Frame>
);

export const Complete = () => (
  <Frame dark>
    <BugHunterPill hunter={hunter(5)} theme='dark' accent='#3fb950' />
  </Frame>
);
