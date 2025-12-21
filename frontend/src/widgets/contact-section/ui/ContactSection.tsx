import { WhyChooseMeBlock } from '../../../features/choose-me-block';
import { ContactBlock } from '../../../features/contact-block';
import { MainGrid } from '../../../shared/ui';

export const ContactSection = () => {
  return (
    <div className='w-full px-3 sm:px-5'>
      <div className='flex flex-col-reverse md:flex-row gap-4 align-bottom items-end w-full h-full justify-between max-w-[1440px] mx-auto'>
        <MainGrid>
          <WhyChooseMeBlock />
          <ContactBlock />
        </MainGrid>
      </div>
    </div>
  );
};
