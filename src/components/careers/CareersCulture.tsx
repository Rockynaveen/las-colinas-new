import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const CareersCulture: React.FC = () => {
  return (
    <section className="careers-culture-section">
      <div className="careers-inner-container">
        <div className="careers-culture-grid">
          
          {/* Left Column: Full-height photograph of hotel employees/team */}
          <motion.div
            className="careers-culture-visual"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="careers-culture-photo-frame">
              <img
                src="/images/careers-culture-team.jpg"
                alt="Las Colinas hotel team members and management staff"
                className="careers-culture-img"
                loading="lazy"
              />
              <div className="culture-photo-overlay-accent" />
            </div>
          </motion.div>

          {/* Right Column: Copy + Meet Our Team CTA */}
          <motion.div
            className="careers-culture-content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="careers-intro-eyebrow">
              <span>OUR CULTURE</span>
            </div>

            <h2 className="careers-culture-heading">
              People Make the Difference
            </h2>

            <p className="careers-culture-lead-para">
              Our success is driven by people who bring energy, expertise, and a genuine passion for hospitality to everything they do.
            </p>

            <p className="careers-culture-body-para">
              We encourage collaboration, recognize initiative, and create opportunities for our team members to grow alongside the properties they help manage.
            </p>

            <a href="#about" className="btn-navy-careers" style={{ marginTop: '0.5rem' }}>
              <span>MEET OUR TEAM</span>
              <ArrowRight size={15} />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CareersCulture;
