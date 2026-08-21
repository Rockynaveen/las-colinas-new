import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <a 
      href="#home" 
      className={`logo-brand-link ${className}`}
      aria-label="Las Colinas Hospitality Management"
    >
      <div className="logo-brand-container">
        <img 
          src="/images/las-colinas-logo-white.png" 
          alt="Las Colinas Hospitality Management Logo" 
          className="logo-brand-image"
        />
      </div>
    </a>
  );
};

export default Logo;
