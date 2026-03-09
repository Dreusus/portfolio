import { WhyChooseMeBlock } from '@/components/WhyChooseMeBlock';
import { ContactBlock } from '@/components/ContactBlock';
import { MainGrid } from '@/components';

export const ContactSection = () => {
  return (
    <div className='section-shell'>
      <div className='section-inner section-paper'>
        <MainGrid className='lg:grid-cols-[1.02fr_0.98fr]'>
          <WhyChooseMeBlock />
          <ContactBlock />
        </MainGrid>
      </div>
    </div>
  );
};
