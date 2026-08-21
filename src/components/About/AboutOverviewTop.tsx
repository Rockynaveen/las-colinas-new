import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

export const AboutOverviewTop: React.FC = () => {
  const reduceMotion = useReducedMotion();

  const handleLearnMore = () => {
    const el = document.getElementById('overview');
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      window.location.hash = '#overview';
    }
  };

  return (
    <section id="about-overview" className="lchm-section lchm-section--white lchm-overview-top scroll-mt-24">
      <div className="lchm-inner">
        <div className="lchm-overview-top-grid">
          
          {/* Copy Column */}
          <motion.div
            className="lchm-overview-top-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease }}
          >
            <div className="lchm-overview-top-label-wrap">
              <span className="lchm-overview-top-label">ABOUT US</span>
              <div className="lchm-overview-top-label-line" />
            </div>
            
            <h2 className="lchm-overview-top-heading">
              Elevating Hospitality.<br />
              Creating Long-Term Value.
            </h2>
            
            <p className="lchm-overview-top-desc">
              Las Colinas Hospitality Management is a full-service hotel management, development, and asset management company dedicated to maximizing hotel performance, enhancing guest experiences, and creating long-term value for owners and investors.
            </p>
            
            <p className="lchm-overview-top-desc">
              Founded in 2016, our experienced leadership team combines hospitality expertise with a hands-on approach to operational excellence, financial discipline, and strategic growth.
            </p>
            
            <button 
              onClick={handleLearnMore}
              className="lchm-overview-top-cta"
            >
              <span>LEARN MORE ABOUT US</span>
              <span className="lchm-overview-top-arrow">→</span>
            </button>
          </motion.div>

          {/* Photo Column with curved decorative gold element */}
          <motion.div
            className="lchm-overview-top-photo-col"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: 0.06, ease }}
          >
            <div className="lchm-overview-top-frame">
              <img
                src="/images/why-choose-us.jpg"
                alt="Luxury hotel dining setup hospitality"
                className="lchm-overview-top-photo"
              />
              <div className="lchm-overview-top-curve" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutOverviewTop;
