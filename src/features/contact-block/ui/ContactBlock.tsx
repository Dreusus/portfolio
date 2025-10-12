import { BlockIds } from '@/shared/types/blocks';
import { BlockContainer, BlockTitle } from '@/shared/ui';
import { ContactForm } from './ContactForm';

export const ContactBlock = () => {
  return (
    <BlockContainer id={BlockIds.Contact}>
      <BlockTitle title='Contact Me' id={BlockIds.Contact} />
      <div className='flex flex-col gap-4 w-full max-w-[400px]'>
        <ContactForm />
      </div>
    </BlockContainer>
  );
};
