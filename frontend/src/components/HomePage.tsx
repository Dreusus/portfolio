import { TerminalShell, darkPalette } from './terminal';

export const HomePage = () => {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: darkPalette.bg,
      }}
    >
      <TerminalShell theme='dark' />
    </div>
  );
};
