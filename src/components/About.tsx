import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import '../styles/about.css';

interface AboutProps {
  id?: string;
  isHome2?: boolean;
  isHome3?: boolean;
  isHome4?: boolean;
}

const ease = [0.16, 1, 0.3, 1] as const;

const CountUpNumber: React.FC<{ target: number; suffix?: string; duration?: number }> = ({
  target,
  suffix = '',
  duration = 2
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setCount(target);
      return;
    }

    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutCubic = (x: number): number => {
      return 1 - Math.pow(1 - x, 3);
    };

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = easeOutCubic(progress);

      const currentVal = Math.floor(easedProgress * target);
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, target, duration, reduceMotion]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

export const About: React.FC<AboutProps> = ({ id = 'about', isHome2, isHome3, isHome4 }) => {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.8, delay, ease }
  });

  const handleDiscoverStory = () => {
    window.location.hash = '#about';
    const el = document.getElementById('about-hero') || document.getElementById('story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScheduleConsultation = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '#contact';
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* =========================================================================
     HOME 2: Editorial Split Layout (4 Pillars, Script "Exceptional", Consultation CTA)
     ========================================================================= */
  if (isHome2) {
    return (
      <section id={id} className="about-home2-section">
        {/* Giant Ghost Watermark */}
        <div className="home2-watermark-lchm" aria-hidden="true">
          LCHM
        </div>

        <div className="home2-grid">
          {/* Left Column: Typographic Statement */}
          <motion.div className="home2-left-col" {...fadeUp(0.1)}>
            {/* Typography Stack */}
            <div className="home2-typo-stack">
              <span className="home2-sub-label home2-sub-gold">E L E V A T I N G</span>
              <h2 className="home2-line-heading font-playfair">
                <span className="home2-word-navy">Hospitality </span>
                <span className="home2-word-gold">Assets.</span>
              </h2>

              <span className="home2-sub-label home2-sub-navy">D E L I V E R I N G</span>
              <h2 className="home2-line-heading font-playfair">
                <span className="home2-word-script">Exceptional </span>
                <span className="home2-word-navy">Results.</span>
              </h2>
            </div>
          </motion.div>

          {/* Center Vertical Divider Line */}
          <div className="home2-vertical-divider" aria-hidden="true" />

          {/* Right Column: Narrative, 4 Key Pillars & Consultation Button */}
          <motion.div className="home2-right-col" {...fadeUp(0.25)}>
            {/* Eyebrow */}
            <span className="about-eyebrow-new">ABOUT LCHM</span>

            {/* Introductory Statement with matching font from image */}
            <p className="about-desc-new home2-desc-text">
              Founded in 2016, Las Colinas Hospitality Management delivers operational excellence, financial discipline, and strategic hotel management. We focus on maximizing asset profitability and long-term owner value while delivering exceptional guest experiences.
            </p>

            {/* 4 Key Pillars / Metrics Grid (1 row 2 stats) */}
            <div className="home2-pillars-grid">
              {/* Pillar 1: 2016 */}
              <div className="home2-pillar-item">
                <span className="home2-pillar-num">
                  <CountUpNumber target={2016} duration={1.8} />
                </span>
                <span className="home2-pillar-label">FOUNDED</span>
              </div>

              {/* Pillar 2: 25+ */}
              <div className="home2-pillar-item">
                <span className="home2-pillar-num">
                  <CountUpNumber target={25} suffix="+" duration={1.8} />
                </span>
                <span className="home2-pillar-label">
                  HOTELS IN<br />PORTFOLIO
                </span>
              </div>

              {/* Pillar 3: 1800+ */}
              <div className="home2-pillar-item">
                <span className="home2-pillar-num">
                  <CountUpNumber target={1800} suffix="+" duration={1.8} />
                </span>
                <span className="home2-pillar-label">
                  ROOMS UNDER<br />MANAGEMENT
                </span>
              </div>

              {/* Pillar 4: 98% */}
              <div className="home2-pillar-item">
                <span className="home2-pillar-num">
                  <CountUpNumber target={98} suffix="%" duration={1.8} />
                </span>
                <span className="home2-pillar-label">
                  GUEST<br />SATISFACTION
                </span>
              </div>
            </div>

            {/* Schedule a Consultation CTA */}
            <a
              href="#contact"
              onClick={handleScheduleConsultation}
              className="home2-consultation-btn"
            >
              <span>SCHEDULE A CONSULTATION</span>
              <span className="home2-consultation-arrow">→</span>
            </a>
          </motion.div>
        </div>

        {/* Bottom Right Corner Motto */}
        <div className="home2-corner-motto" aria-hidden="true">
          <span className="home2-motto-text">
            INSPIRE<br />
            OPERATE<br />
            ELEVATE
          </span>
          <span className="home2-motto-line" />
        </div>
      </section>
    );
  }

  /* =========================================================================
     HOME 3: Centered Luxury Editorial Layout (Exact match to Reference Image)
     ========================================================================= */
  if (isHome3) {
    return (
      <section id={id} className="about-editorial-section">
        <div className="about-editorial-container">
          <motion.div className="about-editorial-content" {...fadeUp(0.1)}>

            {/* Eyebrow */}
            <span className="about-editorial-eyebrow">ABOUT LCHM</span>

            {/* 3-Line Luxury Heading */}
            <h2 className="about-editorial-heading font-serif">
              Elevating Hospitality Excellence.<br />
              <span className="editorial-navy-line" style={{ color: '#021630' }}>Elevating Hospitality Assets.</span><br />
              Delivering Exceptional Results.
            </h2>

            {/* Fine Divider Line */}
            <div className="about-editorial-divider" />

            {/* Refined Manifesto Paragraph */}
            <p className="about-editorial-body font-serif">
              Established in 2016, Las Colinas Hospitality Management is dedicated to delivering operational mastery, financial prudence, and strategic asset management. Our focus is on maximizing asset profitability and long-term owner value, all while curating unparalleled guest experiences.
            </p>

            {/* Linen Textured CTA Button */}
            <button
              type="button"
              onClick={handleDiscoverStory}
              className="about-editorial-btn"
            >
              <span>DISCOVER OUR STORY</span>
              <span className="about-editorial-arrow">→</span>
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  /* =========================================================================
     HOME 4: Architectural Gallery Showcase Layout (Distinct from Homes 1, 2, 3)
     ========================================================================= */
  if (isHome4) {
    return (
      <section id={id} className="about-home4-section">
        <div className="home4-grid">
          {/* Left Column: Floating Architectural Statement (No Card, Pure Typography) */}
          <motion.div className="home4-left-col" {...fadeUp(0.1)}>
            <div className="home4-statement-frame">
              {/* Minimalist Architectural Corner Accents */}
              <span className="home4-corner-bracket home4-bracket-tl" aria-hidden="true" />
              <span className="home4-corner-bracket home4-bracket-br" aria-hidden="true" />

              {/* Vertical Gold Guideline Accent */}
              <div className="home4-guideline" aria-hidden="true" />

              <div className="home4-statement-inner">
                {/* Line 1 */}
                <h2 className="home4-heading-line font-playfair">
                  <span className="home4-word-navy">Elevating </span>
                  <span className="home4-word-gold">Hospitality Assets.</span>
                </h2>

                {/* Architectural Geometric Divider */}
                <div className="home4-divider-row" aria-hidden="true">
                  <span className="home4-divider-line" />
                  <span className="home4-divider-diamond">◆</span>
                  <span className="home4-divider-line" />
                </div>

                {/* Line 2 */}
                <h2 className="home4-heading-line font-playfair">
                  <span className="home4-word-italic">Delivering </span>
                  <span className="home4-word-navy">Exceptional Results.</span>
                </h2>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Kept exactly as is */}
          <motion.div className="about-content-col-new" {...fadeUp(0.25)}>
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
      </section>
    );
  }

  /* =========================================================================
     HOME 1 (Default): Editorial Split Layout (Exact match to Reference Image)
     - Left: 4-line typography ("Elevating Hospitality Assets. Delivering Exceptional Results.")
             Divider, Tagline, and "INSPIRE | OPERATE | ELEVATE"
     - Center: Fine vertical divider
     - Right: Eyebrow "BUILT ON EXPERIENCE. DRIVEN BY PERFORMANCE."
              Manifesto statement, "SCHEDULE A CONSULTATION →"
     - Watermark: Giant ghost LCHM across bottom
     - Bottom-Right: "PEOPLE / PLACES / POSSIBILITIES ───"
     ========================================================================= */
  return (
    <section id={id} className="about-home1-section">
      <div className="home1-grid">
        {/* Left Column: Typographic Statement */}
        <motion.div className="home1-left-col" {...fadeUp(0.1)}>
          {/* Typography Stack: 2 Lines */}
          <div className="home1-typo-stack">
            <h2 className="home1-line1 font-playfair">
              <span className="home1-word-navy">Elevating </span>
              <span className="home1-word-gold">Hospitality Assets.</span>
            </h2>
            <h2 className="home1-line2 font-playfair">
              <span className="home1-word-italic-navy">Delivering Exceptional Results.</span>
            </h2>
          </div>
        </motion.div>

        {/* Center Vertical Divider Line */}
        <div className="home1-vertical-divider" aria-hidden="true" />

        {/* Right Column: Text matching Home 4 & Reference Screenshot */}
        <motion.div className="home1-right-col about-content-col-new" {...fadeUp(0.25)}>
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
            type="button"
            onClick={handleDiscoverStory}
            className="about-cta-btn-new"
          >
            <span>DISCOVER OUR STORY</span>
            <span className="about-cta-arrow-new">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
