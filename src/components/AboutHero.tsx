import { type FC } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

export const AboutHero: FC = () => {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section id="about-hero" className="about-hero">
      <motion.img
        className="about-hero-image"
        src="/images/dallas-skyline.jpg"
        alt="Dallas skyline at sunset"
        initial={reduceMotion ? { scale: 1 } : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease }}
      />

      <div className="about-overlay" />

      <div className="about-content">
        <motion.span className="about-label" {...fadeUp(0.15)}>
          ABOUT US
        </motion.span>

        <motion.h1 {...fadeUp(0.28)}>
          Elevating Hospitality.
        </motion.h1>

        <motion.div className="gold-line" {...fadeUp(0.38)} />

        <motion.p {...fadeUp(0.46)}>
          Full-service hotel management, focused on performance and exceptional guest experiences.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutHero;
