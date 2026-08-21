import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Building,
  TrendingUp,
  ShieldCheck,
  DollarSign,
  Wallet,
  Award,
  ArrowRight,
  MapPin,
  ChevronDown
} from 'lucide-react';
import HomeCTA from '../components/HomeCTA';
import { portfolioCategories } from '../utils/portfolioData';

const ease = [0.16, 1, 0.3, 1] as const;

export const Portfolio: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState<number>(8); // Initially show 8 items (2 rows of 4)

  const displayedCategories = portfolioCategories.slice(0, visibleCount);

  const handlePartnerCTA = () => {
    window.location.hash = '#contact';
  };

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.8, delay, ease }
  });

  const heroFadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <div className="portfolio-page-wrap">
      
      {/* 1. HERO SECTION (Dallas Skyline Banner) */}
      <section id="portfolio-hero" className="about-hero portfolio-hero">
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

        <div className="about-content">
          <motion.span className="about-label" {...heroFadeUp(0.15)}>
            OUR PORTFOLIO
          </motion.span>

          <motion.h1 {...heroFadeUp(0.28)}>
            Exceptional Properties.<br />
            Proven Performance.
          </motion.h1>

          <motion.div className="gold-line" {...heroFadeUp(0.38)} />

          <motion.p {...heroFadeUp(0.46)}>
            We partner with owners and investors to develop, manage, and elevate hotel assets across leading markets.
          </motion.p>
        </div>
      </section>

      {/* 2. PROPERTIES GRID SECTION (White/cream background) */}
      <section id="portfolio" className="portfolio-grid-section">
        <div className="portfolio-grid-container">
          
          <motion.div 
            className="portfolio-grid-header"
            {...fadeUp(0.1)}
          >
            <span className="portfolio-section-label-gold">OUR PORTFOLIO</span>
            <h2 className="portfolio-grid-title">Our Diverse Collection</h2>
            <div className="portfolio-grid-divider" />
          </motion.div>

          {/* Properties Grid — 4 Columns per row using Home Page Card Design */}
          <motion.div 
            className="portfolio-properties-grid"
            layout
          >
            {displayedCategories.map((cat) => (
              <motion.a
                key={cat.id}
                href="https://lascolinasmanagement.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="port-card"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                style={{ textDecoration: 'none' }}
              >
                <div className="port-card-img-wrap">
                  <img 
                    src={cat.image} 
                    alt={cat.alt} 
                    className="port-card-img"
                    loading="lazy"
                  />
                  <div className="port-card-overlay" />
                </div>

                <div className="port-card-content">
                  <h3 className="port-card-name">
                    {cat.name.toUpperCase()}
                  </h3>

                  {cat.location && (
                    <div className="port-card-location">
                      <MapPin size={13} className="port-location-icon" />
                      <span className="port-location-text">{cat.location}</span>
                    </div>
                  )}

                  <div className="port-card-interaction">
                    <span>VIEW &rarr;</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Load More Button */}
          {visibleCount < portfolioCategories.length && (
            <div className="portfolio-load-more-wrap" style={{ textAlign: 'center', marginTop: '3.5rem' }}>
              <button 
                onClick={() => setVisibleCount(prev => prev + 8)}
                className="btn-gold"
                style={{ cursor: 'pointer' }}
              >
                <span>LOAD MORE</span>
                <ChevronDown size={16} />
              </button>
            </div>
          )}

        </div>
      </section>

      <HomeCTA />

    </div>
  );
};

export default Portfolio;
