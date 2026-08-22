import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

interface ServicesHeroProps {
  label?: string;
  heading?: string;
  subtext?: string;
  imageSrc?: string;
}

export const ServicesHero: React.FC<ServicesHeroProps> = ({
  label = 'OUR SERVICES',
  heading = 'Comprehensive Hospitality Solutions.',
  subtext = 'We partner with owners and investors to develop, manage, and elevate hotel assets across leading markets.',
  imageSrc = '/images/orlando-skyline.png',
}) => {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section className="about-hero">
      <motion.img
        className="about-hero-image"
        src={imageSrc}
        alt="Skyline background"
        initial={reduceMotion ? { scale: 1 } : { scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease }}
        style={{ objectPosition: 'center 42%' }}
      />

      <div className="about-overlay" />

      <div className="about-content">
        <motion.span className="about-label" {...fadeUp(0.15)}>
          {label}
        </motion.span>

        <motion.h1 className="about-title" {...fadeUp(0.28)}>
          {heading}
        </motion.h1>

        <motion.div className="gold-line" {...fadeUp(0.38)} />

        <motion.p className="about-desc" {...fadeUp(0.46)}>
          {subtext}
        </motion.p>
      </div>
    </section>
  );
};

export default ServicesHero;
