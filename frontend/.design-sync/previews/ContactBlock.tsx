import { ContactBlock } from '@/components';

// ContactSection places ContactBlock in one column of a two-column grid.
export const Canonical = () => (
  <div style={{ width: 480, minHeight: 460 }}>
    <ContactBlock />
  </div>
);

// How the block sits on a page band, with a neighbouring column beside it.
export const InPageColumn = () => (
  <div style={{ width: 860, minHeight: 460, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
    <div className='flex flex-col gap-4'>
      <h2 className='text-2xl font-semibold text-foreground'>Available from March</h2>
      <p className='text-sm text-muted-foreground'>
        Manual and automated QA — Playwright, pytest, API contract testing and
        CI reporting. Send a short brief and I will reply within a day.
      </p>
      <ul className='bg-muted rounded-xl p-4 flex flex-col gap-2 text-sm text-foreground'>
        <li>Playwright / pytest end-to-end suites</li>
        <li>API contract testing and CI reporting</li>
        <li>Allure TestOps launch triage</li>
        <li>Release regression and smoke plans</li>
      </ul>
    </div>
    <ContactBlock />
  </div>
);
