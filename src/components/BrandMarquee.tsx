import React from 'react';

const MarriottLogo = () => (
  <svg viewBox="0 0 140 40" width="140" height="40" className="brand-logo-svg" fill="currentColor">
    <path d="M10,30 L10,10 L18,10 L25,22 L32,10 L40,10 L40,30 L34,30 L34,16 L28,26 L22,26 L16,16 L16,30 Z" />
    <text x="48" y="24" fontFamily="var(--font-sans)" fontSize="10.5" fontWeight="800" letterSpacing="0.22em">MARRIOTT</text>
  </svg>
);

const HiltonLogo = () => (
  <svg viewBox="0 0 115 40" width="115" height="40" className="brand-logo-svg" fill="currentColor">
    <path d="M10,10 L16,10 L16,18 L24,18 L24,10 L30,10 L30,30 L24,30 L24,23 L16,23 L16,30 L10,30 Z" />
    <path d="M20,6 A 12,12 0 0,0 8,18 A 12,12 0 0,0 20,30 A 12,12 0 0,0 32,18 A 12,12 0 0,0 20,6" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <text x="38" y="24" fontFamily="var(--font-sans)" fontSize="11" fontWeight="800" letterSpacing="0.22em">HILTON</text>
  </svg>
);

const HyattLogo = () => (
  <svg viewBox="0 0 100 40" width="100" height="40" className="brand-logo-svg" fill="currentColor">
    <path d="M10,8 L16,8 L16,18 L22,18 L22,8 L28,8 L28,32 L22,32 L22,23 L16,23 L16,32 L10,32 Z" />
    <text x="36" y="24" fontFamily="var(--font-sans)" fontSize="11" fontWeight="800" letterSpacing="0.22em">HYATT</text>
  </svg>
);

const SheratonLogo = () => (
  <svg viewBox="0 0 140 40" width="140" height="40" className="brand-logo-svg" fill="currentColor">
    <circle cx="18" cy="20" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" fill="none" />
    <path d="M15,22 Q16.5,23.5 18.5,23.5 L18.5,21 Q16.5,20.5 16.5,18 Q16.5,16 18,16 Q19.5,16 20,17.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <text x="34" y="24" fontFamily="var(--font-sans)" fontSize="11" fontWeight="800" letterSpacing="0.22em">SHERATON</text>
  </svg>
);

const WyndhamLogo = () => (
  <svg viewBox="0 0 135 40" width="135" height="40" className="brand-logo-svg" fill="currentColor">
    <path d="M10,10 L15,28 L20,18 L25,28 L30,10 L25,10 L21,22 L18,13 L16,13 L13,22 Z" />
    <text x="36" y="24" fontFamily="var(--font-sans)" fontSize="11" fontWeight="800" letterSpacing="0.22em">WYNDHAM</text>
  </svg>
);

const IhgLogo = () => (
  <svg viewBox="0 0 95 40" width="95" height="40" className="brand-logo-svg" fill="currentColor">
    <text x="5" y="26" fontFamily="var(--font-serif)" fontSize="20" fontWeight="700" letterSpacing="0.05em">IHG</text>
    <rect x="52" y="13" width="7" height="12" fill="currentColor" opacity="0.8" />
    <circle cx="55.5" cy="9" r="2" fill="#B08C48" />
    <text x="66" y="24" fontFamily="var(--font-sans)" fontSize="10" fontWeight="800" letterSpacing="0.1em">HOTELS</text>
  </svg>
);

const WestinLogo = () => (
  <svg viewBox="0 0 100 40" width="100" height="40" className="brand-logo-svg" fill="currentColor">
    <text x="5" y="24" fontFamily="var(--font-serif)" fontSize="14" fontWeight="600" letterSpacing="0.2em">WESTIN</text>
  </svg>
);

const RitzLogo = () => (
  <svg viewBox="0 0 160 40" width="160" height="40" className="brand-logo-svg" fill="currentColor">
    <path d="M10,26 L10,14 L16,11 L22,14 L22,26 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    <path d="M16,7 L17.5,10.5 L14.5,10.5 Z" fill="currentColor" />
    <text x="30" y="23" fontFamily="var(--font-serif)" fontSize="9" fontWeight="600" letterSpacing="0.18em">RITZ-CARLTON</text>
  </svg>
);

const brands = [
  { name: 'Marriott', logo: <MarriottLogo /> },
  { name: 'Hilton', logo: <HiltonLogo /> },
  { name: 'IHG', logo: <IhgLogo /> },
  { name: 'Hyatt', logo: <HyattLogo /> },
  { name: 'Wyndham', logo: <WyndhamLogo /> },
  { name: 'Westin', logo: <WestinLogo /> },
  { name: 'Ritz-Carlton', logo: <RitzLogo /> },
  { name: 'Sheraton', logo: <SheratonLogo /> }
];

export const BrandMarquee: React.FC = () => {
  // Duplicate the brands array to create a seamless infinite loop
  const displayBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="brand-marquee-section">
      <div className="brand-marquee-container">
        <div className="brand-marquee-track">
          {displayBrands.map((brand, index) => (
            <div key={`${brand.name}-${index}`} className="brand-logo-item">
              {brand.logo}
              <svg 
                viewBox="0 0 100 100" 
                className="brand-mini-crest" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon 
                  points="50,12 88,50 50,88 12,50" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                />
                <polygon 
                  points="50,28 72,50 50,72 28,50" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeDasharray="4 4" 
                  opacity="0.6"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandMarquee;
