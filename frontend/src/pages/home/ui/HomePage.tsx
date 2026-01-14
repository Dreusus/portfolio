import { AboutSection } from '../../../widgets/about-section';
import { ContactSection } from '../../../widgets/contact-section';
import { ExperienceSection } from '../../../widgets/experience-section';
import { Footer } from '../../../widgets/footer';
import { Header } from '../../../widgets/header';
import { HeroSection } from '../../../widgets/hero-section';
import { FadeInSection } from '../../../shared/ui';

const HomePage = () => {
  return (
    <div className='flex flex-col grow border-x w-full h-full mx-auto '>
      <Header />
      <main className='w-full h-full flex flex-col grow gap-10 md:gap-16 row-start-2 items-center mb-10 md:mb-16'>
        <HeroSection />
        <FadeInSection direction='up' delay={0.1}>
          <AboutSection />
        </FadeInSection>
        <FadeInSection direction='up' delay={0.1}>
          <ExperienceSection />
        </FadeInSection>
        <FadeInSection direction='up' delay={0.1}>
          <ContactSection />
        </FadeInSection>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
