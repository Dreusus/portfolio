import { ContactSection } from '@/components';

// The section fills a page band, so it needs a sized frame.
export const Canonical = () => (
  <div className='w-full' style={{ minHeight: 520 }}>
    <ContactSection />
  </div>
);

// The same band in the page flow: the app background and the eyebrow of the
// preceding section above it.
export const InPageFlow = () => (
  <div className='w-full bg-background' style={{ minHeight: 600, paddingTop: 40, paddingBottom: 40 }}>
    <div className='w-full max-w-content mx-auto px-3 pb-8'>
      <p className='text-sm uppercase tracking-wider text-muted-foreground'>Get in touch</p>
    </div>
    <ContactSection />
  </div>
);
