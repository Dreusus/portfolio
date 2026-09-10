import { TerminalShell } from '@/components/terminal';

// TerminalShell fills its host section; the card gives it a viewport-sized box
// so the window chrome, tab bar and command pane all land inside the frame.
const Frame = ({ children }: { children: React.ReactNode }) => (
  <div className='relative w-full h-[560px] overflow-hidden rounded-xl'>{children}</div>
);

export const Dark = () => (
  <Frame>
    <TerminalShell theme='dark' />
  </Frame>
);

export const Light = () => (
  <Frame>
    <TerminalShell theme='light' />
  </Frame>
);
