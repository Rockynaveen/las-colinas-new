import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

export const AboutCounter: React.FC = () => {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.8, delay, ease }
  });

  const stats = [
    { value: '2016', label: 'FOUNDED' },
    { value: '25+', label: 'HOTELS IN PORTFOLIO' },
    { value: '1800+', label: 'ROOMS UNDER MANAGEMENT' },
    { value: '98%', label: 'GUEST SATISFACTION' }
  ];

  return (
    <section className="about-counter-section">
      <div className="about-counter-container">
        <div className="about-counter-grid">
          {stats.map((stat, idx) => (
            <React.Fragment key={stat.label}>
              <motion.div 
                className="about-counter-item"
                {...fadeUp(idx * 0.1)}
              >
                <span className="about-counter-val">{stat.value}</span>
                <span className="about-counter-label">{stat.label}</span>
              </motion.div>
              {idx < stats.length - 1 && (
                <div className="about-counter-divider" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutCounter;
