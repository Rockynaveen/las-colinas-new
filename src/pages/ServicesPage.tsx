import React from 'react';
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
        label="OUR SERVICES"
        heading={isALaCarte ? 'A La Carte Services' : 'Hotel Management Services'}
        subtext={
          isALaCarte
            ? 'Specialized, modular hospitality solutions tailored for specific property, financial, operational, and strategic needs.'
            : 'We partner with owners and investors to develop, manage, and elevate hotel assets across leading markets.'
        }
      />

      {/* Render selected service section */}
      {isALaCarte ? <ALaCarteServices /> : <DetailedServices />}

      {/* CTA Section */}
      <HomeCTA />
    </div>
  );
};

export default ServicesPage;
