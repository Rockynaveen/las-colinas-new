import { type FC } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

export const AboutHero: FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about-hero" className="about-hero">
      <motion.img
        className="about-hero-image"
        src="/images/orlando-skyline.png"
        alt="Orlando skyline"
        initial={reduceMotion ? { scale: 1 } : { scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease }}
        style={{ objectPosition: 'center 42%' }}
      />

      <div className="about-overlay" />
    </section>
  );
};

export default AboutHero;
