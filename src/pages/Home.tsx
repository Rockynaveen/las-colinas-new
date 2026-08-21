import React from 'react';
import { Hero } from '../components/Hero';
import { BrandMarquee } from '../components/BrandMarquee';
import { About } from '../components/About';
import { AboutCounter } from '../components/AboutCounter';
import { Services } from '../components/Services';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { PortfolioHome } from '../components/PortfolioHome';
import { LeadershipCarousel } from '../components/LeadershipCarousel';
import { HomeCTA } from '../components/HomeCTA';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <About />
      <AboutCounter />
      <Services />
      <WhyChooseUs />
      <PortfolioHome />
      <LeadershipCarousel />
      <HomeCTA />
    </>
  );
};

export default Home;
