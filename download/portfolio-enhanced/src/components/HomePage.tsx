'use client';

import { AboutSection } from './AboutSection';
import { ContactSection } from './ContactSection';
import { ExperienceSection } from './ExperienceSection';
import { Footer } from './Footer';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { FadeInSection } from './FadeInSection';
import { StatsSection } from './StatsSection';
import { TestimonialsSection } from './TestimonialsSection';
import { ScrollToTop } from './ScrollToTop';

export const HomePage = () => {
  return (
    <div className='flex flex-col grow border-x w-full h-full mx-auto'>
      <Header />
      <main className='w-full h-full flex flex-col grow items-center'>
        <HeroSection />

        <FadeInSection direction='up' delay={0.1}>
          <AboutSection />
        </FadeInSection>

        <StatsSection />

        <FadeInSection direction='up' delay={0.1}>
          <ExperienceSection />
        </FadeInSection>

        <TestimonialsSection />

        <FadeInSection direction='up' delay={0.1}>
          <ContactSection />
        </FadeInSection>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};
