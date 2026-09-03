import React from 'react';
import { motion } from 'framer-motion';
import { ServicesHero } from '../components/ServicesHero';
import { DetailedServices } from '../components/DetailedServices';
import { ALaCarteServices } from '../components/ALaCarteServices';
import { HomeCTA } from '../components/HomeCTA';

interface ServicesPageProps {
  currentHash?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ currentHash }) => {
  const fullPath = (currentHash || window.location.pathname || '') + (window.location.hash || '');
  const isALaCarte = fullPath.toLowerCase().includes('a-la-carte') || fullPath.toLowerCase().includes('alacarte');

  return (
    <div id="services-page" className="svc-page">
      {/* Services Hero Section */}
      <ServicesHero
        label=""
        heading=""
        subtext=""
      />

      {/* Header Section below hero image */}
      <section className="services-hero-header-section">
        <motion.div
          className="services-page-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="services-header-label">OUR SERVICES</span>
          <h1 className="services-header-title">
            {isALaCarte ? 'A La Carte Services' : 'Hotel Management Services'}
          </h1>
          <div className="services-header-gold-line" />
          <p className="services-header-subtext">
            {isALaCarte
              ? 'Specialized, modular hospitality solutions tailored for specific property, financial, operational, and strategic needs.'
              : 'We partner with owners and investors to develop, manage, and elevate hotel assets across leading markets.'}
          </p>
        </motion.div>
      </section>

      {/* Render selected service section */}
      {isALaCarte ? <ALaCarteServices /> : <DetailedServices />}

      {/* CTA Section */}
      <HomeCTA />
    </div>
  );
};

export default ServicesPage;
