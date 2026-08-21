import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CareersFooterCTA: React.FC = () => {
  const scrollToPositions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.getElementById('open-positions');
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="careers-footer-cta-strip">
      <div className="careers-inner-container">
        <div className="careers-cta-strip-layout">
          
          <div className="cta-strip-text">
            <h2 className="cta-strip-heading">Ready to Make a Difference?</h2>
            <p className="cta-strip-subheading">Join our team and be part of something extraordinary.</p>
          </div>
          
          <div className="cta-strip-actions">
            <button 
              type="button" 
              onClick={scrollToPositions} 
              className="btn-navy-careers"
            >
              <span>VIEW OPEN POSITIONS</span>
              <ArrowRight size={15} />
            </button>
            
            <a href="#contact" className="btn-gold-outline-careers-light">
              <span>SEND YOUR RESUME</span>
              <ArrowRight size={15} />
            </a>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default CareersFooterCTA;
