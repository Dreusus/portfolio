import { ContribGraph, getPalette } from '@/components/terminal';

// ContribGraph picks its cell ramp from the palette it is given (it sniffs
// `palette.bg`), so the dark / light axis is the whole variant story. It is a
// full-width grid, so the wrapper has to bound it — inline-styled because
// Tailwind only emits utilities it finds in `src/`.
const Frame = ({
  theme,
  width = 460,
  children,
}: {
  theme: 'dark' | 'light';
  width?: number;
  children: React.ReactNode;
}) => {
  const p = getPalette(theme);
  return (
    <div
      style={{
        width,
        maxWidth: '100%',
        background: p.panel,
        border: `1px solid ${p.line}`,
        borderRadius: 8,
        padding: 20,
        color: p.dim,
        fontFamily: "ui-monospace, 'Geist Mono', monospace",
        fontSize: 12,
      }}
    >
      {children}
    </div>
  );
};

export const Dark = () => (
  <Frame theme='dark'>
    <div>commits — last 26 weeks</div>
    <ContribGraph palette={getPalette('dark')} />
  </Frame>
);

export const Light = () => (
  <Frame theme='light'>
    <div>commits — last 26 weeks</div>
    <ContribGraph palette={getPalette('light')} />
  </Frame>
);

export const WithCaption = () => (
  <Frame theme='dark'>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <span>apolyakov · contribution activity</span>
      <span style={{ color: getPalette('dark').accent }}>1,240 commits</span>
    </div>
    <ContribGraph palette={getPalette('dark')} />
    <div style={{ marginTop: 10, fontSize: 11 }}>less → more</div>
  </Frame>
);

export const Narrow = () => (
  <Frame theme='dark' width={260}>
    <div style={{ fontSize: 11 }}>sidebar width</div>
    <ContribGraph palette={getPalette('dark')} />
  </Frame>
);
