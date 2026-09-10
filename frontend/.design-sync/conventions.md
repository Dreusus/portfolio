## Building with this design system

This is the component library behind a personal portfolio site (Next.js 15 App
Router, React 19, Tailwind CSS v4). Everything is exported on
`window.PortfolioDS`. Components come in two groups: `general` — the page
building blocks — and `terminal` — a self-contained terminal-emulator UI with
its own dark/light palette.

### Wrap every design in `LanguageProvider`

Almost every component calls `useTranslation()` for its copy. Outside a
`LanguageProvider` those calls fall back to a default context, and any
component that destructures deeper translation objects renders empty. Wrap
once, at the root:

```jsx
const { LanguageProvider, MainGrid, BlockContainer, BlockTitle } = window.PortfolioDS;

<LanguageProvider>
  {/* your design */}
</LanguageProvider>
```

`LanguageProvider` reads `localStorage.language` (`'en'` or `'ru'`, default
`'en'`) and takes no props. `useTranslation()` returns `{ t, language,
setLanguage }`.

Most components take **no props at all** — they pull their content from the
translation bundle and from data modules. `AboutBlock`, `SkillsBlock`,
`ExperienceBlock`, `WhyChooseMeBlock`, `ProjectBlock`, `Footer`, `Header`,
`HeroSection` and the `*Section` wrappers are all in this category. Compose
them; do not try to feed them content.

### The styling idiom: Tailwind v4 utilities over CSS custom properties

There are no CSS modules and no style props. Layout and one-off styling are
written as **Tailwind utility classes**, and every colour resolves through a
CSS custom property defined in the stylesheet. Use the semantic colour tokens,
never raw hex:

| Family | Tokens |
|---|---|
| Surfaces | `background`, `card`, `popover`, `muted`, `colored-background` |
| Text | `foreground`, `card-foreground`, `muted-foreground`, `primary-foreground`, `secondary-foreground`, `accent-foreground` |
| Brand | `primary` (light mint `#e5efe6`), `secondary` (warm sand `#f6e8d2`), `icon-accent` (sage `#93b18b`) |
| State | `destructive`, `accent`, `ring`, `border`, `input` |
| Charts | `chart-1` … `chart-5` |

Each token works across the colour utilities: `bg-secondary`,
`text-muted-foreground`, `border-border`, `ring-ring`, `fill-icon-accent`, and
with variants — `hover:bg-accent`, `focus-visible:ring-ring`, `md:bg-card`.
Opacity modifiers work too (`bg-icon-accent/20`, `border-icon-accent/30`).

Two more tokens worth knowing: `--radius` (`0.625rem`, the basis of the
`rounded-*` scale) and `max-w-content` (`1440px`, the page content width the
layout is built around). Fonts are bound to `--font-geist-sans` and
`--font-geist-mono`.

**One trap: `variant="default"` on `Button` is unreadable.** It pairs
`--primary` (light mint) with `--primary-foreground` (near-white), so the label
disappears. The site itself never uses it. Use `variant="secondary"` for the
primary action, `variant="outline"` for the secondary one. `variant="link"` has
the same contrast problem.

### Where the truth lives

- `_ds/<folder>/styles.css` and the files it `@import`s — the real token
  definitions and the compiled utility set. **The stylesheet is compiled, not
  the full Tailwind library**: it carries the DS palette across the colour
  utilities plus the common spacing, sizing, typography, flex/grid and border
  scales. Stay inside that vocabulary; an exotic arbitrary value such as
  `p-[13px]` will not resolve. Read the stylesheet when unsure.
- `components/<group>/<Name>/<Name>.prompt.md` — per-component usage notes.
- `components/<group>/<Name>/<Name>.d.ts` — the prop contract.

### An idiomatic composition

```jsx
const {
  LanguageProvider, BlockContainer, BlockTitle, ProjectCard, Button,
} = window.PortfolioDS;

<LanguageProvider>
  <main className='mx-auto w-full max-w-content px-6 py-16'>
    <BlockContainer id='projects' className='gap-8'>
      <BlockTitle title='Selected work' id='projects' />

      <div className='flex gap-4 overflow-x-auto pb-4'>
        <ProjectCard
          title='QA Desktop'
          description='Test-run dashboard for distributed QA teams'
          imageUrl='/images/desk-project.jpg'
          url='#'
        />
        <ProjectCard
          title='API Template'
          description='Pytest + httpx starter for API suites'
          imageUrl='/images/coming-soon.jpg'
          url='#'
          inProgress
          inProgressLabel='Soon'
        />
      </div>

      <div className='rounded-2xl border border-border bg-colored-background p-6'>
        <p className='text-sm text-muted-foreground'>
          Interested in the full case studies?
        </p>
        <Button variant='secondary' className='mt-4'>Get in touch</Button>
      </div>
    </BlockContainer>
  </main>
</LanguageProvider>
```

The pattern to copy: library components carry the content, and the layout glue
around them is Tailwind utilities over the semantic tokens.

### Terminal components

`TerminalShell` is a full-page terminal UI (`theme='dark' | 'light'`) that
fills its container — give it a sized box. `Bug`, `BugHunterPill`, `StatBlock`,
`ContribGraph` and `AiMiniChat` are its parts and take a palette from
`getPalette('dark' | 'light')` (also exported as `darkPalette` /
`lightPalette`). They are styled for a dark ground; place them on one.
