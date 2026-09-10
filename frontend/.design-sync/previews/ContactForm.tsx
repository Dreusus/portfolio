import { ContactForm } from '@/components';

// ContactBlock renders exactly one ContactForm in a 400px column.
export const Canonical = () => (
  <div style={{ width: 400 }}>
    <ContactForm />
  </div>
);

// The same form in the narrow mobile column.
export const Narrow = () => (
  <div style={{ width: 260 }}>
    <ContactForm />
  </div>
);
