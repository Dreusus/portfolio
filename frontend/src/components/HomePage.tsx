import { AboutSection } from './AboutSection';
import { ContactSection } from './ContactSection';
import { ExperienceSection } from './ExperienceSection';
import { Footer } from './Footer';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { FadeInSection } from './FadeInSection';
import { ScrollProgress } from './ScrollProgress';
import { ChatWidget } from './ChatWidget';

export const HomePage = () => {
  return (
    <div className='relative flex flex-col grow border-x border-white/20 w-full h-full mx-auto'>
      <ScrollProgress />
      <Header />
      <main className='relative w-full h-full flex flex-col grow gap-12 md:gap-20 row-start-2 items-center mb-10 md:mb-16'>
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
      <ChatWidget />
    </div>
  );
};
