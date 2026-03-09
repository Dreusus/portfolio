import { AboutSection } from './AboutSection';
import { ContactSection } from './ContactSection';
import { ExperienceSection } from './ExperienceSection';
import { Footer } from './Footer';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { FadeInSection } from './FadeInSection';

export const HomePage = () => {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <main className='relative z-10 flex w-full flex-1 flex-col items-center gap-3 pb-8 pt-2 md:gap-5 md:pb-10 md:pt-3'>
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
