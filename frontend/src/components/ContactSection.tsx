import { WhyChooseMeBlock } from '@/components/WhyChooseMeBlock';
import { ContactBlock } from '@/components/ContactBlock';
import { MainGrid } from '@/components';

export const ContactSection = () => {
  return (
    <div className='section-shell'>
      <div className='section-inner section-paper'>
        <MainGrid className='gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8 lg:items-stretch'>
          <WhyChooseMeBlock />
          <ContactBlock />
        </MainGrid>
      </div>
    </div>
  );
};
