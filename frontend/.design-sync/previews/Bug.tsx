import { Bug } from '@/components/terminal';
import type { BugHunter } from '@/hooks';

// Bug is an absolutely positioned hit target driven by the useBugHunter state
// machine; it renders nothing unless `hunter.active`. Previews pass a frozen
// hunter so both the un-caught and the caught (filled, dimmed) states are
// visible, and a positioned dark pane stands in for the terminal.
// Inline styles throughout: Tailwind only emits utilities found in `src/`.
const hunter = (found: string[] = []): BugHunter => ({
  active: true,
  found: new Set(found),
  total: 5,
  toggle: () => {},
  catchBug: () => {},
  complete: found.length === 5,
});

const Pane = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      position: 'relative',
      width: 460,
      maxWidth: '100%',
      height: 170,
      overflow: 'hidden',
      borderRadius: 8,
      border: '1px solid #21262d',
      background: '#0d1117',
      color: '#8b949e',
      fontFamily: "ui-monospace, 'Geist Mono', monospace",
      fontSize: 12,
      padding: 16,
      lineHeight: 1.7,
      boxSizing: 'border-box',
    }}
  >
    {children}
  </div>
);

export const Uncaught = () => (
  <Pane>
    <div style={{ color: '#3fb950' }}>$ pytest tests/api -m regression</div>
    <div>collected 84 items</div>
    <div style={{ color: '#d29922' }}>2 flaky, 82 passed</div>
    <Bug id='bug-api-1' hunter={hunter()} color='#f85149' style={{ top: 24, right: 32 }} />
    <Bug id='bug-api-2' hunter={hunter()} color='#d29922' style={{ bottom: 28, right: 96 }} />
  </Pane>
);

export const Caught = () => (
  <Pane>
    <div style={{ color: '#3fb950' }}>$ pytest tests/ui -m smoke</div>
    <div>right: caught (filled, dimmed) · left: still open</div>
    <Bug
      id='bug-ui-1'
      hunter={hunter(['bug-ui-1'])}
      color='#f85149'
      style={{ top: 24, right: 32 }}
    />
    <Bug
      id='bug-ui-2'
      hunter={hunter(['bug-ui-1'])}
      color='#f85149'
      style={{ top: 24, right: 96 }}
    />
  </Pane>
);

export const Colors = () => (
  <Pane>
    <div style={{ color: '#c9d1d9' }}>defect severity markers</div>
    <div style={{ marginTop: 44, display: 'flex', gap: 34, fontSize: 11 }}>
      <span>blocker</span>
      <span>major</span>
      <span>minor</span>
      <span>trivial</span>
    </div>
    {['#f85149', '#d29922', '#3fb950', '#8b949e'].map((c, i) => (
      <Bug
        key={c}
        id={`bug-color-${i}`}
        hunter={hunter()}
        color={c}
        style={{ top: 52, left: 18 + i * 70 }}
      />
    ))}
  </Pane>
);

export const Inactive = () => (
  <Pane>
    <div>hunter.active === false — the target renders nothing</div>
    <Bug
      id='bug-hidden'
      hunter={{ ...hunter(), active: false }}
      color='#f85149'
      style={{ top: 24, right: 32 }}
    />
  </Pane>
);
