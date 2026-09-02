import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { VideoBackground } from './VideoBackground';

interface HeroProps {
  isHome2?: boolean;
  isHome3?: boolean;
  isHome4?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isHome2: _isHome2, isHome3: _isHome3, isHome4: _isHome4 }) => {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const updateHeight = () => {
      if (sectionRef.current) {
        const height = sectionRef.current.offsetHeight;
        document.documentElement.style.setProperty('--hero-height', `${height}px`);
      }
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7 }
    }
  };

  return (
    <section ref={sectionRef} className="hero-section">
      {/* Full-bleed Background Video + Subtle Navy Tint */}
      <VideoBackground />

      {/* Hero Content Area */}
      <div className="hero-content-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-content-box"
        >
          {/* Main Heading */}
          <motion.h1 variants={itemVariants} className="hero-title">
            Elevating Hospitality Assets.<br className="hidden md:inline" />
            <span className="hero-title-accent"> Delivering Exceptional Results.</span>
          </motion.h1>

          {/* Short Description */}
          <motion.p variants={itemVariants} className="hero-short-desc">
            Strategic hotel management, development, and asset management focused on performance, exceptional guest experiences, and long-term value.
          </motion.p>

          {/* Highlight Statement */}
          <motion.div variants={itemVariants} className="hero-highlight">
            <span className="hero-highlight-line" />
            <p className="hero-highlight-text">
              Your Property. Our Expertise. Shared Success.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="hero-cta-group">
            <a href="#contact" className="btn-gold">
              <span>Partner With Us</span>
              <ArrowRight size={15} />
            </a>
            <a href="#contact" className="btn-secondary">
              <Calendar size={15} />
              <span>Schedule a Consultation</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};
