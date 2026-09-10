import { IPhoneMockup } from '@/components';

// The component is a bare <svg> with a 433x882 viewBox and no intrinsic size —
// the wrapper must set a width or the card collapses to nothing. No static
// file server here, so the screen art is an inlined data URI.
const SCREEN =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="390" height="844" viewBox="0 0 390 844">
      <rect width="390" height="844" fill="#0d1117"/>
      <rect x="0" y="0" width="390" height="96" fill="#161b22"/>
      <circle cx="34" cy="62" r="7" fill="#f85149"/>
      <circle cx="56" cy="62" r="7" fill="#d29922"/>
      <circle cx="78" cy="62" r="7" fill="#3fb950"/>
      <text x="150" y="67" font-family="monospace" font-size="17" fill="#8b949e">qa@apolyakov</text>
      <text x="24" y="150" font-family="monospace" font-size="18" fill="#3fb950">$ pytest -m smoke</text>
      <text x="24" y="186" font-family="monospace" font-size="16" fill="#c9d1d9">collected 128 items</text>
      <text x="24" y="222" font-family="monospace" font-size="16" fill="#3fb950">128 passed in 42.7s</text>
      <rect x="24" y="264" width="342" height="150" rx="12" fill="#161b22" stroke="#21262d"/>
      <text x="44" y="304" font-family="monospace" font-size="15" fill="#8b949e">coverage</text>
      <text x="44" y="346" font-family="monospace" font-size="30" fill="#58a6ff">94%</text>
      <rect x="44" y="368" width="302" height="8" rx="4" fill="#21262d"/>
      <rect x="44" y="368" width="284" height="8" rx="4" fill="#3fb950"/>
      <rect x="24" y="440" width="342" height="150" rx="12" fill="#161b22" stroke="#21262d"/>
      <text x="44" y="480" font-family="monospace" font-size="15" fill="#8b949e">flaky</text>
      <text x="44" y="522" font-family="monospace" font-size="30" fill="#d29922">3</text>
      <rect x="24" y="616" width="342" height="150" rx="12" fill="#161b22" stroke="#21262d"/>
      <text x="44" y="656" font-family="monospace" font-size="15" fill="#8b949e">suites</text>
      <text x="44" y="698" font-family="monospace" font-size="30" fill="#c9d1d9">12</text>
    </svg>`
  );

const Phone = ({ width, src }: { width: number; src?: string }) => (
  <div style={{ width }}>
    <IPhoneMockup src={src} style={{ width: '100%', height: 'auto', display: 'block' }} />
  </div>
);

export const Empty = () => <Phone width={180} />;

export const WithScreen = () => <Phone width={180} src={SCREEN} />;

export const Sizes = () => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
    <Phone width={100} src={SCREEN} />
    <Phone width={150} src={SCREEN} />
    <Phone width={200} src={SCREEN} />
  </div>
);
