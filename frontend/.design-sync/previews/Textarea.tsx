import { Label, Textarea } from '@/components';

const Col = ({ children }: { children: React.ReactNode }) => (
  <div className='flex flex-col gap-2' style={{ width: 360 }}>
    {children}
  </div>
);

// ContactForm renders the message field with `resize-none`; the other cells
// are the same control in its statically visible states.
export const Canonical = () => (
  <Col>
    <Label htmlFor='preview-message'>Message</Label>
    <Textarea
      id='preview-message'
      name='message'
      className='resize-none'
      placeholder='Tell me about the project and the QA gaps you want covered…'
    />
  </Col>
);

export const Filled = () => (
  <Col>
    <Textarea
      className='resize-none'
      defaultValue={
        'Hi Andrey — we need an E2E suite for our checkout flow. Playwright, ~40 scenarios, Allure reporting in GitLab CI. Are you available from March?'
      }
    />
  </Col>
);

export const Invalid = () => (
  <Col>
    <div className='flex items-center justify-between'>
      <Label htmlFor='preview-message-error'>Message</Label>
      <span role='alert' className='text-destructive text-xs'>
        Message is too short
      </span>
    </div>
    <Textarea
      id='preview-message-error'
      defaultValue='hi'
      aria-invalid
      className='resize-none border-destructive'
    />
  </Col>
);

export const Disabled = () => (
  <Col>
    <Label htmlFor='preview-message-disabled'>Message</Label>
    <Textarea
      id='preview-message-disabled'
      className='resize-none'
      defaultValue='We need a Playwright suite for checkout, ~40 scenarios.'
      disabled
    />
  </Col>
);
