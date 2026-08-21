import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Sparkles } from 'lucide-react';

export const CareersIntro: React.FC = () => {
  return (
    <section className="careers-intro-section">
      <div className="careers-inner-container">
        <div className="careers-intro-grid">
          
          {/* Left Column: Large Editorial Hotel/Team Image */}
          <motion.div
            className="careers-intro-visual"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="careers-intro-image-wrapper">
              <img
                src="/images/careers-hero-staff.jpg"
                alt="Las Colinas Hospitality Team"
                className="careers-intro-img"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right Column: Copy + Subtle Feature / Statistic Blocks */}
          <motion.div
            className="careers-intro-content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="careers-intro-eyebrow">
              <span>LIFE AT LAS COLINAS</span>
            </div>

            <h2 className="careers-intro-heading">
              Where Hospitality Meets Opportunity
            </h2>

            <p className="careers-intro-text">
              At Las Colinas Hospitality Management, we believe exceptional guest experiences begin with exceptional people.
            </p>

            <p className="careers-intro-subtext">
              We create an environment where talented hospitality professionals can grow their careers, develop new skills, take on leadership opportunities, and make a meaningful impact across our properties.
            </p>

            {/* 2-Column Grid Feature Blocks */}
            <div className="careers-intro-blocks">
              <div className="intro-block-item">
                <div className="intro-block-icon-circle">
                  <Users size={20} className="intro-block-icon" />
                </div>
                <div className="intro-block-info">
                  <h3 className="intro-block-title">People First</h3>
                  <p className="intro-block-desc">A culture built around collaboration and respect.</p>
                </div>
              </div>

              <div className="intro-block-item">
                <div className="intro-block-icon-circle">
                  <TrendingUp size={20} className="intro-block-icon" />
                </div>
                <div className="intro-block-info">
                  <h3 className="intro-block-title">Growth Focused</h3>
                  <p className="intro-block-desc">Opportunities to learn, lead, and advance.</p>
                </div>
              </div>

              <div className="intro-block-item">
                <div className="intro-block-icon-circle">
                  <Sparkles size={20} className="intro-block-icon" />
                </div>
                <div className="intro-block-info">
                  <h3 className="intro-block-title">Hospitality Driven</h3>
                  <p className="intro-block-desc">Work that directly shapes guest experiences.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CareersIntro;
