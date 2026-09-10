// The DS bundle runs in a plain browser, with no Next.js runtime and no
// bundler-time `process.env` substitution. Several components read
// `process.env.NEXT_PUBLIC_*` at module scope, so without this the whole IIFE
// throws before it can assign anything to window.PortfolioDS.
const g = globalThis as unknown as { process?: { env: Record<string, string | undefined>; platform: string } };
g.process ??= { env: {}, platform: 'browser' };
g.process.env ??= {};
export {};
