import { AiMiniChat, getPalette } from '@/components/terminal';

// AiMiniChat is styled by TerminalShell's `.term-card` rule; outside the shell
// the preview supplies the same rule so the card reads as it does in the app.
// The chat posts to NEXT_PUBLIC_BACKEND_URL, which is not reachable here — the
// cells show the empty and the pre-seeded transcript states instead.
const Frame = ({ theme, children }: { theme: 'dark' | 'light'; children: React.ReactNode }) => {
  const p = getPalette(theme);
  const scope = `ds-aichat-${theme}`;
  return (
    <div
      className={scope}
      style={{
        width: 420,
        maxWidth: '100%',
        padding: 16,
        background: p.bg,
        fontFamily: "ui-monospace, 'Geist Mono', monospace",
      }}
    >
      <style>{`.${scope} .term-card { border: 1px solid ${p.line}; background: ${p.panel}; padding: 16px; position: relative; }`}</style>
      {children}
    </div>
  );
};

export const Dark = () => (
  <Frame theme='dark'>
    <AiMiniChat palette={getPalette('dark')} onContinue={() => {}} />
  </Frame>
);

export const Light = () => (
  <Frame theme='light'>
    <AiMiniChat palette={getPalette('light')} onContinue={() => {}} />
  </Frame>
);
