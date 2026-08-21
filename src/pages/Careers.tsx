import React from 'react';
import { ServicesHero } from '../components/ServicesHero';
import { CareersIntro } from '../components/careers/CareersIntro';
import { CareersBenefits } from '../components/careers/CareersBenefits';
import { CareersPathways } from '../components/careers/CareersPathways';
import { CareersCulture } from '../components/careers/CareersCulture';
import { CareersOpportunities } from '../components/careers/CareersOpportunities';
import { HomeCTA } from '../components/HomeCTA'
export const Careers: React.FC = () => {
  return (
    <div className="careers-page-wrapper">
      {/* 1. Hero Banner Section */}
      <ServicesHero
        label="CAREERS"
        heading="Build Your Hospitality Career"
        subtext="We believe our people are our greatest asset. Join a team dedicated to innovation, collaboration, professional growth, and delivering exceptional hospitality experiences."
      />

      {/* 2. Introduction — Grow With Us */}
      <CareersIntro />

      {/* 3. Benefits Section — 5-Card Grid */}
      <CareersBenefits />

      {/* 4. Career Pathways — Find Your Place */}
      <CareersPathways />

      {/* 5. Culture — People Make the Difference */}
      <CareersCulture />

      {/* 6. Open Positions Section */}
      <CareersOpportunities />

      {/* 7. Bottom Footer CTA Banner */}
      <HomeCTA />
    </div>
  );
};

export default Careers;
