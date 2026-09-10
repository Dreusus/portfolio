import { StatBlock, getPalette } from '@/components/terminal';

// StatBlock takes its two colours straight from the terminal palette, so the
// cells sweep the dark / light axis with `getPalette`.
// Layout here is inline-styled on purpose: Tailwind only emits the utilities
// it finds in `src/`, so classes authored only in a preview never ship.
const Frame = ({ theme, children }: { theme: 'dark' | 'light'; children: React.ReactNode }) => {
  const p = getPalette(theme);
  return (
    <div
      style={{
        background: p.panel,
        border: `1px solid ${p.line}`,
        borderRadius: 8,
        padding: 24,
        fontFamily: "ui-monospace, 'Geist Mono', monospace",
        display: 'inline-block',
      }}
    >
      {children}
    </div>
  );
};

const Row = ({ theme }: { theme: 'dark' | 'light' }) => {
  const p = getPalette(theme);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
      <StatBlock value={1240} label='tests automated' accent={p.accent} dim={p.dim} />
      <StatBlock value={94} label='% coverage' accent={p.accent2} dim={p.dim} />
      <StatBlock value={37} label='bugs found' accent={p.red} dim={p.dim} />
    </div>
  );
};

export const Dark = () => (
  <Frame theme='dark'>
    <Row theme='dark' />
  </Frame>
);

export const Light = () => (
  <Frame theme='light'>
    <Row theme='light' />
  </Frame>
);

export const Single = () => (
  <Frame theme='dark'>
    <StatBlock
      value={1240}
      label='tests automated'
      accent={getPalette('dark').accent}
      dim={getPalette('dark').dim}
    />
  </Frame>
);

export const LargeNumber = () => (
  <Frame theme='dark'>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
      <StatBlock
        value={1284350}
        label='assertions executed'
        accent={getPalette('dark').accent2}
        dim={getPalette('dark').dim}
      />
      <StatBlock
        value={0}
        label='open blockers'
        accent={getPalette('dark').warn}
        dim={getPalette('dark').dim}
      />
    </div>
  </Frame>
);
