# design-sync notes — portfolio (frontend/)

Repo shape: a **Next.js 15 App Router application**, not a published component
library. The sync treats `frontend/` as the package.

## Build inputs this sync had to create

- **No `dist/`.** Component discovery and prop contracts come from
  declarations emitted by `tsconfig.dts.json` (`pnpm build:types` →
  `dist/types/`), wired through the `types` field added to `package.json`.
  Without them the converter finds zero components (`[ZERO_MATCH]`).
  `.design-sync/svg-shim.d.ts` is in that tsconfig's `include` — `*.svg`
  imports (svgr) have no types otherwise and `tsc` errors on every icon.
- **No compiled stylesheet.** `src/app/globals.css` is Tailwind v4 *source*
  (`@import 'tailwindcss'`). `node .design-sync/scripts/build-css.mjs` compiles it through
  the repo's own `@tailwindcss/postcss` into `.design-sync/tailwind.built.css`
  (that file is `cfg.cssEntry`). `.design-sync/tailwind-entry.css` adds the
  `@source` glob so the whole `src/` tree is scanned for utilities.
- **Fonts.** The app loads Geist / Geist Mono via `next/font/google`, which does
  not exist outside Next. `build-css.mjs` prepends a font-host `@import` plus
  the `--font-geist-sans` / `--font-geist-mono` bindings that `layout.tsx`
  would otherwise set. Validate reports `[FONT_REMOTE]` — expected, not a miss.
- **`process` is not defined in a browser.** `ChatWidget`, `ContactForm`,
  `AiMiniChat` and `TerminalShell` read `process.env.NEXT_PUBLIC_*` at module
  scope, which took the whole IIFE down before it could assign
  `window.PortfolioDS`. Fixed by `.design-sync/ds-entry.ts` (the `--entry`),
  whose first statement imports `.design-sync/process-shim.ts`. **Import order
  is the mechanism** — ES module evaluation runs the shim before any component
  body. Don't reorder those imports.

Build command:

```sh
pnpm build:types && node .design-sync/scripts/build-css.mjs
node .ds-sync/package-build.mjs --config .design-sync/config.json \
  --node-modules ./node_modules --entry ./.design-sync/ds-entry.ts --out ./ds-bundle
node .ds-sync/package-validate.mjs ./ds-bundle
```

## Component scope

`src/components/index.ts` exports 35; the six `src/components/terminal/*`
components are not in that barrel and are pinned via `cfg.componentSrcMap`.
**A component added to the terminal barrel needs a `componentSrcMap` entry too**
— it will otherwise be in the JS bundle but absent from the component list.

## Preview conventions (learned in the solo pass)

- Import from `@/components`; terminal components from `@/components/terminal`.
- `LanguageProvider` is applied by `cfg.provider` — previews must NOT wrap in it.
- Components that fill a page section (TerminalShell, HeroSection, sections)
  render into a fixed-height wrapper, else the card collapses.
- No static server in the preview environment: `/images/*` and `/public` are
  unavailable. Inline artwork as a `data:image/svg+xml` URI.

## Design-system findings (product-level, worth the owner's attention)

- **`Button variant="default"` is effectively unlabelled**: `--primary` is a
  light mint (`#e5efe6`) and `--primary-foreground` is near-white
  (`oklch(0.985 0 0)`). `variant="link"` has the same problem (`text-primary`
  on a light ground). Every call site in the app uses `variant="secondary"`,
  so the default is untested in practice.

## Known render warns

- `[FONT_REMOTE] "Geist", "Geist Mono"` — deliberate; fonts come from the font
  host, see above.
- `[RENDER_THIN] IPhoneMockup` — benign. The component is a wordless device
  chassis; the heuristic counts text nodes. The sheet shows a full bezel,
  notch and side buttons in all three cells, and two of them carry a legible
  terminal screen. The only textless cell is `Empty`, which is textless on
  purpose. No preview change clears this without inventing content the
  component does not own.

## Preview harness gotchas (folded from the four authoring batches)

- **Tailwind must scan the previews.** `.design-sync/tailwind-entry.css` now
  carries `@source "./previews/**/*.tsx"` (plus `svgr/` and `shims/`). Before
  that glob existed, any utility a preview used that the app did not already
  use was silently absent from the compiled sheet — `h-[560px]`, `p-4`,
  `grid-cols-2`, `bg-[#0d1117]` all no-oped, collapsing frames and stacking
  grids, with no error anywhere. **All four batches hit this**, and their
  previews still express frame geometry as inline `style={{}}` as a result.
  That is belt-and-braces now, not a bug; leave it.
- **`*.svg` needed an svgr equivalent.** The app compiles `src/assets/*.svg`
  through `@svgr/webpack`, so every import is a React component. esbuild — in
  both the DS bundle and the preview bundler — used a `dataurl` loader, so
  `social.icon` was a *string*, `<social.icon />` an invalid element type, and
  React threw, blanking every cell that touched `Socials`, `Footer`,
  `AboutBlock`, `SkillsBlock`. Fixed by `.design-sync/scripts/gen-svgr.mjs`, which
  generates `.design-sync/svgr/<name>.tsx` wrappers and writes
  `.design-sync/tsconfig.sync.json` aliasing each import onto one.
  **Re-run `node .design-sync/scripts/gen-svgr.mjs` whenever an asset is added or changed.**
- **`cfg.tsconfig` points at `.design-sync/tsconfig.sync.json`, not the repo's.**
  Two reasons. It carries the svgr and `next/image` aliases; and the repo's own
  `tsconfig.json` cannot be parsed by the converter's paths plugin at all — its
  `include` globs contain `**/*.ts`, whose `/*` … `*/` looks like a block
  comment to the plugin's comment stripper, so it silently returns no plugin.
  The sync config also pins every barrel import (`@/components`, `@/hooks`, …)
  to its `index.ts`: the plugin probes the bare stem first and `existsSync` is
  true for a directory, so `@/components` would otherwise resolve to the
  directory and esbuild fails with "is a directory".
- **Animations were frozen, not slow.** `package-capture.mjs` pins the browser
  clock (`page.clock.setFixedTime`), so framer-motion's timeline never advances
  and every `initial={{ opacity: 0 }}` component screenshotted blank. The
  provider `.design-sync/preview-root.tsx` (`cfg.provider` →
  `DesignPreviewRoot`) sets `MotionGlobalConfig.skipAnimations = true`, which
  jumps motion to its target values. It also still supplies `LanguageProvider`.
  This wrapper is preview-only — designs built with the DS render the real
  components with animations intact.
- **`next/image` is shimmed** (`.design-sync/shims/next-image.tsx`, aliased in
  the sync tsconfig). The real component needs Next's `/_next/image` optimizer
  route, which exists in no design environment. The shim renders a plain `<img>`
  and falls back to a neutral placeholder — the app's `/public` assets are not
  part of the DS bundle, so `/images/me.png` cannot resolve.
- **Framing `position: fixed` components.** A wrapper with its own
  `transform: translateZ(0)` becomes the containing block, keeping Header,
  ScrollProgress, ChatWidget and BugHunterPill inside their card.
- **Scroll-reveal components never fire.** Cards are captured off-screen, so
  `useInView` (FadeInSection) never triggers. Its preview pins the settled
  state with a scoped `opacity: 1 !important` rule. Any future scroll-reveal
  component needs the same.
- **Pointer-driven effects need a synthetic event.** Spotlight parks its blobs
  until a `mousemove` arrives; its preview dispatches one repeatedly past the
  component's own 300ms delay. It also renders nothing below a 768px viewport.
- **`md:` breakpoints resolve against the capture viewport, not the wrapper.**
  A "mobile" cell made by narrowing a div is a pixel-identical duplicate.
  `MobileMenu` is gated by `md:hidden` and renders nothing at the default
  900x700 — hence `cfg.overrides.MobileMenu.viewport = "420x760"`.
- **`.term-card` lives inside TerminalShell's style block.** `AiMiniChat`
  depends on it; its preview re-declares the rule namespaced per cell.

## Second-pass preview rules (learned re-grading the whole set)

- **The capture viewport is 900x700 and frames are cropped, not fitted.** A
  preview wrapper wider or taller than that silently loses its right/bottom
  edge. For a component authored for a wider canvas, put an inner div at the
  real content width inside an `overflow: hidden` outer div sized under
  900x700, and `transform: scale(k); transformOrigin: 'top left'`. Breakpoints
  still resolve against the 900px viewport (the scale does not change that),
  so `md:` applies and `lg:` does not — exactly a 900px browser.
- **Never use an empty coloured box as page-context filler.** On a sheet it is
  indistinguishable from a collapsed or failed render and grades as blank. Put
  real text in it.
- **Caption a variant axis that contains an invisible variant.** `Button`'s
  `Variants` cell labels each button, so `default` and `link` read as
  identifiable variants rather than as gaps.
- `SkillsBlock` is ~1000px tall at the capture viewport (`md:grid-cols-3` over
  14 skills is five rows) and can only be shown whole by scaling; `lg:`
  (4 columns) needs a 1024px viewport no default cell has.
- `SkillCard` contributes no tile of its own — it renders `icon('w-full h-full')`
  tinted with `defaultColor`. Preview marks must be **filled** shapes; a
  stroke-only outline in a pastel token is invisible on white.
- `ProjectBlock` is a horizontal snap-scroller and needs ~860px or the third
  card truncates mid-frame.
- `MobileMenu`'s drawer is opened by clicking the real burger from a mount
  `useEffect`; with `skipAnimations` it settles in the same frame.
- `ScrollProgress` computes its fill from `window.scrollY`, which is always 0
  in a capture — the preview forces a partial fill so the rail reads at all.

## Further design-system findings (product-level, for the owner)

- **The `Form` field primitives are not published.** `src/components/Form.tsx`
  exports `FormItem`, `FormField`, `FormLabel`, `FormControl`,
  `FormDescription` and `FormMessage`, but `src/components/index.ts` re-exports
  only `Form`. They are therefore absent from `window.PortfolioDS` and the
  design agent cannot use them. The app itself never uses them either —
  `ContactForm` composes `Label` / `Input` / `Textarea` directly. Add them to
  the barrel if they are meant to be API.
- **`ScrollProgress`'s track is invisible on white.** `--muted` is
  `oklch(0.97 0 0)` and the rail is 2px, so the unfilled track effectively
  does not render on the app's background.
- **`Header`'s `useState(true)` for `isScrolled` is dead code.** The effect
  immediately resets it at `scrollY === 0`, so the initial `true` only causes a
  one-frame flash of the background plate on mount.
- **Six of fourteen `SKILLS` entries have no icon.** GitLab CI, PostgreSQL,
  TypeScript, Locust, JMeter and Postman fall through to `fallbackIcon` and
  render as empty pastel rings, so nearly half the skills grid is a
  placeholder. Real product behaviour, not a sync artefact.
- **`ChatWidget`'s open panel is statically unreachable.** It opens only on
  click and has no `defaultOpen`-style prop, so no preview can show the
  conversation state. A source-level prop would make it documentable.

## Re-sync risks

- `dist/types/` and `.design-sync/tailwind.built.css` are generated and
  gitignored — both must be rebuilt before the converter or the run silently
  uses stale contracts/styles.
- The font `@import` is a network fetch at design-render time. If the font host
  is unreachable, designs fall back to system sans.
- `.design-sync/ds-entry.ts` hardcodes the three barrels it re-exports. A new
  top-level barrel in `src/` needs adding there.
- Preview artwork is inlined SVG authored for this sync; it does not track the
  real screenshots in `public/images/`.
- `.design-sync/svgr/` is generated from `src/assets/`. New or edited assets
  need `node .design-sync/scripts/gen-svgr.mjs` re-run, or their icons silently revert to
  the data-URI failure mode.
- `.design-sync/tsconfig.sync.json` duplicates the repo's `@/*` mapping. If
  `tsconfig.json`'s `paths` ever change, that copy must follow.
- The `DesignPreviewRoot` provider disables framer-motion animations. If a
  future component's *correct* static appearance depends on an animation
  having run, it will screenshot at its target values, not its resting ones.
