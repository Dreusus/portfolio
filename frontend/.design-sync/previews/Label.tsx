import { Input, Label, Textarea } from '@/components';

const Col = ({ children }: { children: React.ReactNode }) => (
  <div className='flex flex-col gap-2' style={{ width: 320 }}>
    {children}
  </div>
);

export const Canonical = () => (
  <Col>
    <Label htmlFor='label-name'>Name</Label>
    <Input id='label-name' type='text' defaultValue='Andrey Polyakov' />
  </Col>
);

// ContactForm puts the field error on the same row as the label.
export const WithFieldError = () => (
  <Col>
    <div className='flex items-center justify-between'>
      <Label htmlFor='label-email' className='text-destructive'>
        Email
      </Label>
      <span role='alert' className='text-destructive text-xs'>
        Email is required
      </span>
    </div>
    <Input id='label-email' type='email' className='border-destructive' />
  </Col>
);

// The label dims itself for a disabled peer control.
export const PeerDisabled = () => (
  <Col>
    <Input
      id='label-peer'
      type='email'
      className='peer order-2'
      disabled
      defaultValue='hello@apolyakov.tech'
    />
    <Label htmlFor='label-peer' className='order-1'>
      Email
    </Label>
  </Col>
);

export const Stack = () => (
  <div className='flex flex-col gap-4' style={{ width: 320 }}>
    <div className='flex flex-col gap-2'>
      <Label htmlFor='label-stack-name'>Name</Label>
      <Input id='label-stack-name' type='text' />
    </div>
    <div className='flex flex-col gap-2'>
      <Label htmlFor='label-stack-message'>Message</Label>
      <Textarea id='label-stack-message' className='resize-none' />
    </div>
  </div>
);
