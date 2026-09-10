import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

// Resolve both packages from the app's own node_modules rather than from this
// file's location, so the script works wherever it is run from as long as cwd
// is the package root. postcss is a dependency of @tailwindcss/postcss, so it
// is resolved through that package rather than required to be hoisted.
const require = createRequire(path.join(process.cwd(), 'package.json'));
const tw = require('@tailwindcss/postcss');
const twRequire = createRequire(require.resolve('@tailwindcss/postcss'));
const postcss = twRequire('postcss');
const input = '.design-sync/tailwind-entry.css';
const out = '.design-sync/tailwind.built.css';
const css = fs.readFileSync(input, 'utf8');
const res = await postcss([tw()]).process(css, { from: path.resolve(input), to: path.resolve(out) });

// next/font/google supplies Geist at runtime in the app; the DS bundle has no
// Next runtime, so pull the same families from the font host and bind the
// CSS variables layout.tsx would otherwise set.
const fonts = `@import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap');

:root {
  --font-geist-sans: 'Geist', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-geist-mono: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
}

body {
  font-family: var(--font-geist-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`;
fs.writeFileSync(out, fonts + '\n' + res.css);
console.log('wrote', out, (fonts + res.css).length, 'bytes');
