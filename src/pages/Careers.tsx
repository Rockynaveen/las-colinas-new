import React from 'react';
import { motion } from 'framer-motion';
import { ServicesHero } from '../components/ServicesHero';
import { CareersIntro } from '../components/careers/CareersIntro';
import { CareersBenefits } from '../components/careers/CareersBenefits';
import { CareersPathways } from '../components/careers/CareersPathways';
import { CareersCulture } from '../components/careers/CareersCulture';
import { CareersOpportunities } from '../components/careers/CareersOpportunities';
import { HomeCTA } from '../components/HomeCTA';

export const Careers: React.FC = () => {
  return (
    <div className="careers-page-wrapper">
      {/* 1. Hero Banner Section */}
      <ServicesHero
        label=""
        heading=""
        subtext=""
      />

      {/* Header Section below hero image */}
      <section className="careers-hero-header-section">
        <motion.div
          className="careers-page-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="careers-header-label">CAREERS</span>
          <h1 className="careers-header-title">Build Your Hospitality Career</h1>
          <div className="careers-header-gold-line" />
          <p className="careers-header-subtext">
            We believe our people are our greatest asset. Join a team dedicated to innovation, collaboration, professional growth, and delivering exceptional hospitality experiences.
          </p>
        </motion.div>
      </section>

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
