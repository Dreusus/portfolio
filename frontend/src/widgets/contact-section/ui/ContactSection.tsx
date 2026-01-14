import { WhyChooseMeBlock } from '../../../features/choose-me-block';
import { ContactBlock } from '../../../features/contact-block';
import { MainGrid } from '../../../shared/ui';

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
