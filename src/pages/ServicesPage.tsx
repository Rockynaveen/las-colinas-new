import React from 'react';
import { ServicesHero } from '../components/ServicesHero';
import { DetailedServices } from '../components/DetailedServices';

export const ServicesPage: React.FC = () => {
  return (
    <div id="services-page" className="svc-page">
      {/* Services Hero Section */}
      <ServicesHero
        label="OUR SERVICES"
        heading="Comprehensive Hospitality Solutions."
        subtext="We partner with owners and investors to develop, manage, and elevate hotel assets across leading markets."
      />

      {/* Core Services Detailed Section */}
      <DetailedServices />
    </div>
  );
};

export default ServicesPage;
