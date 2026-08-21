import React from 'react';
import { ServicesHero } from '../components/ServicesHero';
import { Services } from '../components/Services';

export const ServicesPage: React.FC = () => {
  return (
    <div id="services-page" className="svc-page">
      {/* Services Hero Section */}
      <ServicesHero />

      {/* Core Services Section */}
      <Services />
    </div>
  );
};

export default ServicesPage;
