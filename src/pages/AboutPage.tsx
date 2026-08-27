import React, { useEffect } from 'react';
import AboutHero from '../components/AboutHero';
import { AboutOverview } from '../components/About/AboutOverview';
import { OurStory } from './OurStory';
import { VisionMission } from './VisionMission';
import { CoreValues } from './CoreValues';
import { CompetitiveAdvantage } from './CompetitiveAdvantage';
import '../styles/about-page.css';
import '../styles/about-hero.css';
import '../styles/about-lchm.css';
import OurTeam from '../components/About/OurTeam';
import HomeCTA from '../components/HomeCTA';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    // Handle scrolling to internal hashes when mounting/navigating
    const hash = window.location.hash;
    if (hash && !['#about', '#aboutus', '#about-us'].includes(hash.toLowerCase())) {
      const getTargetId = (h: string) => {
        const clean = h.replace('#', '').toLowerCase();
        if (clean.includes('overview')) return 'overview';
        if (clean.includes('story')) return 'story';
        if (clean.includes('vision') || clean.includes('mission')) return 'vision';
        if (clean.includes('values')) return 'values';
        if (clean.includes('advantage')) return 'advantage';
        if (clean.includes('team') || clean.includes('leadership')) return 'team';
        return clean;
      };
      const targetId = getTargetId(hash);
      const element = document.getElementById(targetId) || (targetId === 'overview' ? document.getElementById('about-overview') : null);
      if (element) {
        setTimeout(() => {
          const offset = 90;
          const top = Math.max(0, element.getBoundingClientRect().top + window.scrollY - offset);
          window.scrollTo({ top, behavior: 'smooth' });
        }, 150);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="about-page-wrap">
      {/* Hero Header Banner */}
      <AboutHero />

      {/* <SectionNavigation /> */}

      {/* Section 01: About Las Colinas */}
      <AboutOverview />

      {/* Section 02: Our Story */}
      <OurStory />

      {/* Section 03: Vision & Mission */}
      <VisionMission />

      {/* Section 04: Core Values */}
      <CoreValues />

      {/* Section 05: Competitive Advantage */}
      <CompetitiveAdvantage />

      {/* Section 06: Our Team */}
       <OurTeam />
        <HomeCTA />

      
    </div>
  );
};

export default AboutPage;
