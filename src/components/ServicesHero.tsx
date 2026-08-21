import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

interface ServicesHeroProps {
  label?: string;
  heading?: string;
  subtext?: string;
  primaryCtaText?: string;
  primaryCtaOnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  secondaryCtaText?: string;
  secondaryCtaOnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ServicesHero: React.FC<ServicesHeroProps> = ({
  label = 'OUR SERVICES',
  heading = 'Comprehensive Hospitality Solutions.',
  subtext = 'We partner with owners and investors to develop, manage, and elevate hotel assets across leading markets.',
  primaryCtaText,
  primaryCtaOnClick,
  secondaryCtaText,
  secondaryCtaOnClick,
}) => {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section id="services-hero" className="services-hero">
      {/* Dallas Skyline Background Image */}
      <motion.img
        className="services-hero-bg"
        src="/images/dallas-skyline.jpg"
        alt="Dallas skyline"
        initial={reduceMotion ? { scale: 1 } : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease }}
      />

      {/* Dark Transparent Gradient Overlay */}
      <div className="services-hero-overlay" />

      <div className="services-hero-content">
        <motion.span className="services-hero-label" {...fadeUp(0.15)}>
          {label}
        </motion.span>

        <motion.h1 className="services-hero-heading" {...fadeUp(0.28)}>
          {heading}
        </motion.h1>

        <motion.div className="services-hero-gold-line" {...fadeUp(0.38)} />

        <motion.p className="services-hero-subtext" {...fadeUp(0.46)}>
          {subtext}
        </motion.p>

        {(primaryCtaText || secondaryCtaText) && (
          <motion.div className="services-hero-ctas" {...fadeUp(0.54)}>
            {primaryCtaText && (
              <button
                type="button"
                onClick={primaryCtaOnClick}
                className="services-hero-btn services-hero-btn--gold"
              >
                <span>{primaryCtaText}</span>
              </button>
            )}

            {secondaryCtaText && (
              <button
                type="button"
                onClick={secondaryCtaOnClick}
                className="services-hero-btn services-hero-btn--ghost"
              >
                <span>{secondaryCtaText}</span>
              </button>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServicesHero;
