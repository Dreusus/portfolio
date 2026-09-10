import { FadeInSection } from '@/components';

// FadeInSection starts at opacity 0 and reveals when framer-motion's
// `useInView` fires. A capture card is rendered off-screen, so the observer
// never fires and the cell would screenshot blank — the scoped rule below
// pins the wrapper at its settled state (opacity 1, no offset), which is the
// state the component holds in the app once the section has scrolled in.
// Everything else is inline-styled: Tailwind only emits the utilities it
// finds in `src/`, so classes authored in a preview never ship.
const SETTLED = `
.ds-fade, .ds-fade * { opacity: 1 !important; transform: none !important; }
`;

const Panel = ({ title, sub }: { title: string; sub: string }) => (
  <div
    style={{
      border: '1px solid #e2e8e0',
      background: '#ffffff',
      borderRadius: 10,
      padding: '12px 16px',
      fontSize: 14,
    }}
  >
    <div style={{ fontWeight: 600 }}>{title}</div>
    <div style={{ color: '#6b7280' }}>{sub}</div>
  </div>
);

const Settled = ({ children }: { children: React.ReactNode }) => (
  <div className='ds-fade' style={{ width: '100%' }}>
    <style>{SETTLED}</style>
    {children}
  </div>
);

export const Default = () => (
  <Settled>
    <div style={{ width: 420, maxWidth: '100%' }}>
      <FadeInSection>
        <Panel
          title='Test automation'
          sub='Playwright + pytest suites wired into GitLab CI with Allure reporting.'
        />
      </FadeInSection>
    </div>
  </Settled>
);

export const Directions = () => (
  <Settled>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
        width: 560,
        maxWidth: '100%',
      }}
    >
      {(['up', 'down', 'left', 'right'] as const).map((d) => (
        <FadeInSection key={d} direction={d}>
          <Panel title={`direction="${d}"`} sub={`Enters from ${d}`} />
        </FadeInSection>
      ))}
    </div>
  </Settled>
);

export const StaggeredList = () => (
  <Settled>
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 420, maxWidth: '100%' }}
    >
      {[
        ['API testing', 'pytest, httpx, schemathesis'],
        ['UI testing', 'Playwright, Selenium, Allure'],
        ['Backend', 'FastAPI, PostgreSQL, Docker'],
      ].map(([title, sub], i) => (
        <FadeInSection key={title} delay={i * 0.12}>
          <Panel title={title} sub={sub} />
        </FadeInSection>
      ))}
    </div>
  </Settled>
);
