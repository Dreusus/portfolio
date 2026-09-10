import { LanguageSwitcher } from '@/components';

// The EN/RU toggle. It reads the current language from LanguageProvider and
// labels itself with the language it will switch TO, so at the default `en`
// it reads "RU".
export const Canonical = () => <LanguageSwitcher />;

export const OnHeaderPlate = () => (
  <div
    className='flex h-[64px] items-center justify-end gap-6 rounded-xl bg-colored-background'
    style={{ paddingLeft: 20, paddingRight: 20 }}
  >
    <span className='text-base font-medium'>Experience</span>
    <span className='text-base font-medium'>Contact</span>
    <LanguageSwitcher />
  </div>
);

export const CustomClassName = () => (
  <div className='flex items-center gap-4'>
    <LanguageSwitcher className='border-icon-accent/30 bg-white/30' />
    <LanguageSwitcher className='rounded-full border-secondary bg-secondary px-4 py-2 text-secondary-foreground' />
  </div>
);

// The row the mobile drawer puts it in, under a hairline divider.
export const InMenuRow = () => (
  <div className='rounded-xl bg-colored-background p-4' style={{ width: 280 }}>
    <div
      className='flex items-center justify-between border-t border-white/10'
      style={{ paddingTop: 16 }}
    >
      <span className='text-sm text-muted-foreground'>Language</span>
      <LanguageSwitcher />
    </div>
  </div>
);
