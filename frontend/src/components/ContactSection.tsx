import { WhyChooseMeBlock } from '@/components/WhyChooseMeBlock';
import { ContactBlock } from '@/components/ContactBlock';
import { MainGrid } from '@/components';

export const ContactSection = () => {
  return (
    <div className='w-full px-3 sm:px-5'>
      <div className='w-full max-w-content mx-auto'>
        <MainGrid>
          <WhyChooseMeBlock />
          <ContactBlock />
        </MainGrid>
      </div>
    </div>
  );
};
