import React from 'react';
import { ServicesHero } from '../components/ServicesHero';
import { DetailedServices } from '../components/DetailedServices';
import { ALaCarteServices } from '../components/ALaCarteServices';
import { HomeCTA } from '../components/HomeCTA';

interface ServicesPageProps {
  currentHash?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ currentHash = window.location.pathname }) => {
  const isALaCarte = currentHash.includes('a-la-carte');

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

      {/* Services Sub-Header Navigation Tabs */}
      <div className="svc-tabs-bar">
        <div className="svc-tabs-container">
          <a
            href="/services/hotel-management"
            className={`svc-tab-item ${!isALaCarte ? 'active' : ''}`}
          >
            <span>HOTEL MANAGEMENT SERVICES</span>
          </a>
          <a
            href="/services/a-la-carte"
            className={`svc-tab-item ${isALaCarte ? 'active' : ''}`}
          >
            <span>A LA CARTE SERVICES</span>
          </a>
        </div>
      </div>

      {/* Render selected service section */}
      {isALaCarte ? <ALaCarteServices /> : <DetailedServices />}

      {/* CTA Section */}
      <HomeCTA />
    </div>
  );
};

export default ServicesPage;
