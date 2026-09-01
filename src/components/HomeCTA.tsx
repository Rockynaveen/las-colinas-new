import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

export const HomeCTA: React.FC = () => {
  return (
    <section className="home-cta-section">
      <div className="home-cta-container">
        <motion.div 
          className="cta-banner-panel"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Inner Gold Frame Border */}
          <div className="cta-inner-frame" />

          <div className="cta-banner-grid">
            {/* Left Column: Text & Buttons */}
            <div className="cta-left-column">
              <h2 className="cta-banner-heading">
                Your Property. Our Expertise. <span className="gold-text">Shared Success.</span>
              </h2>
              <div className="cta-heading-divider" />
              
              <p className="cta-banner-subtext">
                Partner with Las Colinas Hospitality Management to elevate performance, maximize value, and create exceptional guest experiences.
              </p>

              <div className="cta-banner-buttons">
                <a href="#contact" className="cta-btn-gold-rect">
                  <span>Partner With Us</span>
                  <ArrowRight size={16} />
                </a>

                <a href="#contact" className="cta-btn-outline-rect">
                  <span>Schedule a Consultation</span>
                  <Calendar size={16} className="gold-icon" />
                </a>
              </div>
            </div>

            {/* Right Column: Masked Image & Logo Overlay */}
            <div className="cta-right-column">
              <div className="cta-image-wrapper">
                <img 
                  src="/cta-bg.webp" 
                  alt="Luxury Modern Hotel at Night" 
                  className="cta-hotel-img"
                  loading="lazy"
                />
                {/* Horizontal Gradient Mask */}
                <div className="cta-image-mask" />
              </div>

              {/* Logo Overlay bottom-right */}
              <div className="cta-logo-overlay">
                <div className="cta-logo-crest">
                  <svg viewBox="0 0 100 40" className="cta-logo-crest-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10,20 Q30,5 50,20 T90,20" stroke="#B08C48" strokeWidth="4" strokeLinecap="round" fill="none" />
                    <path d="M10,27 Q30,12 50,27 T90,27" stroke="#B08C48" strokeWidth="2" strokeLinecap="round" opacity="0.6" fill="none" />
                  </svg>
                </div>
                <div className="cta-logo-text-wrap">
                  <span className="cta-logo-primary">LAS COLINAS</span>
                  <span className="cta-logo-secondary">HOSPITALITY MANAGEMENT</span>
                  <span className="cta-logo-tagline">INSPIRE &nbsp;|&nbsp; OPERATE &nbsp;|&nbsp; ELEVATE</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeCTA;
