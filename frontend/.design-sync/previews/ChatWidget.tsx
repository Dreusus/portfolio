import { ChatWidget } from '@/components';

// ChatWidget pins itself with `position: fixed`. A transformed wrapper becomes
// its containing block, so the launcher lands inside the card instead of the
// page corner. The panel opens on click, so only the launcher over its page
// context is statically renderable.
const Viewport = ({ children, width }: { children: React.ReactNode; width: number }) => (
  <div
    className='relative overflow-hidden rounded-xl border border-border bg-background'
    style={{ width, height: 320, transform: 'translateZ(0)' }}
  >
    {children}
  </div>
);

const Row = ({ title, body }: { title: string; body: string }) => (
  <div className='bg-secondary rounded-xl p-3' style={{ maxWidth: 340 }}>
    <div className='text-sm font-semibold text-foreground'>{title}</div>
    <div className='text-xs text-muted-foreground'>{body}</div>
  </div>
);

export const Canonical = () => (
  <Viewport width={640}>
    <div className='flex flex-col gap-3 p-6'>
      <h3 className='text-lg font-semibold text-foreground'>Contact</h3>
      <p className='text-sm text-muted-foreground' style={{ maxWidth: 340 }}>
        Tell me about the product and the QA gaps you want covered — or ask the
        assistant in the corner about my stack and experience.
      </p>
      <Row title='Playwright E2E' body='Checkout suite, 42 scenarios, GitLab CI.' />
      <Row title='API contract tests' body='pytest + schemathesis against staging.' />
    </div>
    <ChatWidget />
  </Viewport>
);

export const MobileViewport = () => (
  <Viewport width={390}>
    <div className='flex flex-col gap-3 p-4'>
      <h3 className='text-lg font-semibold text-foreground'>Projects</h3>
      <Row title='ShipFast checkout' body='E2E regression, 3 environments.' />
      <Row title='Allure TestOps' body='Launch reporting and flaky triage.' />
      <Row title='Kafka pipeline QA' body='Contract + consumer-lag checks.' />
    </div>
    <ChatWidget />
  </Viewport>
);
