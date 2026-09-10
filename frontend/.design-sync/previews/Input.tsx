import { Input, Label } from '@/components';

// Only utilities the app itself uses are compiled into the design-system
// stylesheet, so preview-only sizing is set inline.
const Col = ({ children, width = 320 }: { children: React.ReactNode; width?: number }) => (
  <div className='flex flex-col gap-2' style={{ width }}>
    {children}
  </div>
);

// The app only ever uses Input inside ContactForm: a Label above, the error
// text on the label row, and `border-destructive` on the control.
export const Canonical = () => (
  <Col>
    <Label htmlFor='preview-name'>Name</Label>
    <Input id='preview-name' name='name' type='text' />
  </Col>
);

export const Types = () => (
  <Col>
    <Input type='text' placeholder='Andrey Polyakov' />
    <Input type='email' placeholder='hello@apolyakov.tech' />
    <Input type='url' placeholder='https://github.com/Dreusus' />
    <Input type='search' placeholder='Search test runs' />
  </Col>
);

export const Filled = () => (
  <Col>
    <Input type='text' defaultValue='Andrey Polyakov' />
    <Input type='email' defaultValue='hello@apolyakov.tech' />
  </Col>
);

export const Invalid = () => (
  <Col>
    <div className='flex items-center justify-between'>
      <Label htmlFor='preview-email'>Email</Label>
      <span role='alert' className='text-destructive text-xs'>
        Invalid email
      </span>
    </div>
    <Input
      id='preview-email'
      type='email'
      defaultValue='andrey@'
      aria-invalid
      className='border-destructive'
    />
  </Col>
);

export const Disabled = () => (
  <Col>
    <Label htmlFor='preview-disabled'>Email</Label>
    <Input id='preview-disabled' type='email' defaultValue='hello@apolyakov.tech' disabled />
  </Col>
);
