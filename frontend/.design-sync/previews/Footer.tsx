import { Footer } from '@/components';

// Footer closes the page: the wordmark on the left, socials and the
// copyright line on the right, on the mint bg-colored-background plate.
export const Canonical = () => (
  <div className='relative w-full overflow-hidden rounded-xl'>
    <Footer />
  </div>
);

export const AtPageEnd = () => (
  <div className='relative w-full overflow-hidden rounded-xl border border-icon-accent/30'>
    <div className='max-w-content mx-auto' style={{ padding: '40px 20px' }}>
      <h2 className='text-4xl'>Contact</h2>
      <p className='text-muted-foreground mt-4'>
        Open to Full Stack QA and SDET roles — apolyakov.tech
      </p>
    </div>
    <Footer />
  </div>
);

// Below sm the row stacks: wordmark above, socials and copyright centred.
export const Narrow = () => (
  <div
    className='relative overflow-hidden rounded-xl border border-icon-accent/30'
    style={{ width: 380, maxWidth: '100%' }}
  >
    <Footer />
  </div>
);
