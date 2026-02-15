import { AboutSection } from './AboutSection';
import { ContactSection } from './ContactSection';
import { ExperienceSection } from './ExperienceSection';
import { Footer } from './Footer';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { FadeInSection } from './FadeInSection';

export const HomePage = () => {
  return (
    <div className='flex flex-col grow border-x w-full h-full mx-auto '>
      <Header />
      <main className='w-full h-full flex flex-col grow row-start-2 items-center mb-10 md:mb-16'>
        <HeroSection />
        <div className='w-full py-8 md:py-12'>
          <FadeInSection direction='up' delay={0.1}>
            <AboutSection />
          </FadeInSection>
        </div>
        <div className='w-full py-8 md:py-12'>
          <FadeInSection direction='up' delay={0.1}>
            <ExperienceSection />
          </FadeInSection>
        </div>
        <div className='w-full py-8 md:py-12'>
          <FadeInSection direction='up' delay={0.1}>
            <ContactSection />
          </FadeInSection>
        </div>
      </main>
      <Footer />
    </div>
  );
};

