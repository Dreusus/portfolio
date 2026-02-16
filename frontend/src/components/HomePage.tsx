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
    <div className='flex flex-col min-h-screen w-full mx-auto'>
      <ScrollProgress />
      <Header />
      <main className='flex-1 w-full flex flex-col gap-10 md:gap-14 pt-4 mb-8'>
        <HeroSection />
        <FadeInSection direction='up'>
          <AboutSection />
        </FadeInSection>
        <FadeInSection direction='up'>
          <ExperienceSection />
        </FadeInSection>
        <FadeInSection direction='up'>
          <ContactSection />
        </FadeInSection>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};
