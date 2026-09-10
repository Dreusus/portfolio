import { SkillCard } from '@/components';

// The real cards get their glyphs from svgr-imported assets in
// src/data/skillsData.tsx. Those assets are filled rounded-square tiles with
// the logo knocked out in white, and SkillCard tints the whole glyph with
// `defaultColor` — so the visible artefact is a pastel tile, not an outline.
// The preview marks below reproduce that shape so the card reads the way it
// does inside SkillsBlock. Titles, urls and colour pairs are the real entries.
const mark = (glyph: React.ReactNode) => (className: string) => (
  <svg className={className} viewBox='0 0 48 48'>
    <rect x='0' y='0' width='48' height='48' rx='10' fill='currentColor' />
    <g fill='none' stroke='#fff' strokeWidth='2.6' strokeLinecap='round' strokeLinejoin='round'>
      {glyph}
    </g>
  </svg>
);

const pythonMark = mark(
  <>
    <path d='M24 10c-6 0-7.5 2.5-7.5 5.5V19H24' />
    <path d='M24 38c6 0 7.5-2.5 7.5-5.5V29H24' />
    <path d='M11 19h22a5 5 0 0 1 5 5v4' />
    <path d='M37 29H15a5 5 0 0 1-5-5v-4' />
  </>
);

const playwrightMark = mark(
  <>
    <circle cx='24' cy='24' r='13' />
    <path d='M20 18l11 6-11 6z' />
  </>
);

const dockerMark = mark(
  <>
    <rect x='13' y='23' width='7' height='7' />
    <rect x='22' y='23' width='7' height='7' />
    <rect x='22' y='15' width='7' height='7' />
    <path d='M10 32c5 5 20 5 27-2 2.6.9 5 0 7-1.6' />
  </>
);

const postgresMark = mark(
  <>
    <ellipse cx='24' cy='15' rx='11' ry='4.5' />
    <path d='M13 15v18c0 2.5 4.9 4.5 11 4.5s11-2 11-4.5V15' />
    <path d='M13 24c0 2.5 4.9 4.5 11 4.5S35 26.5 35 24' />
  </>
);

const cell = (
  title: string,
  icon: (c: string) => React.ReactNode,
  url: string,
  defaultColor: string,
  hoverColor: string
) => (
  <div className='flex flex-col items-center gap-2' style={{ width: 96 }}>
    <div style={{ width: 64, height: 64 }}>
      <SkillCard
        title={title}
        icon={icon}
        url={url}
        defaultColor={defaultColor}
        hoverColor={hoverColor}
      />
    </div>
    <span className='text-xs text-muted-foreground'>{title}</span>
  </div>
);

// One card at the box SkillsBlock's grid cell gives it.
export const Canonical = () => (
  <div className='flex items-center gap-5' style={{ width: 460 }}>
    <div style={{ width: 64, height: 64 }}>
      <SkillCard
        title='Python'
        icon={pythonMark}
        url='https://www.python.org/'
        defaultColor='#f6e8d2'
        hoverColor='#3776ab'
      />
    </div>
    <div className='flex flex-col'>
      <span className='text-sm font-medium'>Python</span>
      <span className='text-xs text-muted-foreground'>default #f6e8d2 · hover #3776ab</span>
    </div>
  </div>
);

// The real colour axis: cards alternate between the sand and mint default
// tokens and each carries its own brand hover colour.
export const ColorPairs = () => (
  <div style={{ width: 460, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
    {cell('Python', pythonMark, 'https://www.python.org/', '#f6e8d2', '#3776ab')}
    {cell('Playwright', playwrightMark, 'https://playwright.dev/', '#f6e8d2', '#2ead33')}
    {cell('Docker', dockerMark, 'https://www.docker.com/', '#e5efe6', '#2496ed')}
    {cell('PostgreSQL', postgresMark, 'https://www.postgresql.org/', '#e5efe6', '#336791')}
  </div>
);
