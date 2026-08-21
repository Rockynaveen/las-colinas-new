import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AboutProps {
  id?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

export const About: React.FC<AboutProps> = ({ id = 'about' }) => {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.8, delay, ease }
  });

  const handleDiscoverStory = () => {
    window.location.hash = '#about';
  };

  return (
    <section id={id} className="about-section">
      <div className="about-container">
        <div className="about-grid-new">
          
          {/* Left Column: Image with rounded corners */}
          <motion.div 
            className="about-image-col-new"
            {...fadeUp(0.1)}
          >
            <div className="about-image-frame-new">
              <img 
                src="/images/about-hotel.jpg" 
                alt="Las Colinas Luxury Hotel" 
                className="about-img-new"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div 
            className="about-content-col-new"
            {...fadeUp(0.25)}
          >
            <span className="about-eyebrow-new">ABOUT LCHM</span>
            
            <h2 className="about-heading-new">
              Elevating Hospitality<br />
              Performance.<br />
              <span className="accent-gold-new">Creating Long-Term Value.</span>
            </h2>
            
            <p className="about-desc-new">
              Founded in 2016, Las Colinas Hospitality Management delivers operational excellence, financial discipline, and strategic hotel management. We focus on maximizing asset profitability and long-term owner value while delivering exceptional guest experiences.
            </p>
            
            <button 
              onClick={handleDiscoverStory}
              className="about-cta-btn-new"
            >
              <span>DISCOVER OUR STORY</span>
              <span className="about-cta-arrow-new">→</span>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
