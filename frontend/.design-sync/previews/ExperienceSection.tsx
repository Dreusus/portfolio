import { ExperienceSection } from '@/components';

// SkillsBlock and ExperienceBlock paired in MainGrid. Same treatment as
// AboutSection: laid out at the real ~1240px content width and scaled down,
// which also gives the five-row skills grid room to finish inside the card.
export const Canonical = () => (
  <div className='relative overflow-hidden' style={{ width: 880, height: 680 }}>
    <div style={{ width: 1240, transform: 'scale(0.66)', transformOrigin: 'top left' }}>
      <ExperienceSection />
    </div>
  </div>
);
