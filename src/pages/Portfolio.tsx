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
  ChevronRight
} from 'lucide-react';
import HomeCTA from '../components/HomeCTA';
import { portfolioCategories } from '../utils/portfolioData';



const ease = [0.16, 1, 0.3, 1] as const;

export const Portfolio: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'RESORTS' | 'BUSINESS' | 'BOUTIQUE'>('ALL');

  const getFilterType = (id: string) => {
    if (['premium-branded', 'premium-resorts', 'heritage', 'destination'].includes(id)) {
      return 'RESORTS';
    }
    if (['select-service', 'premium-assets', 'executive-apartments', 'airport-business'].includes(id)) {
      return 'BUSINESS';
    }
    if (['extended-stay', 'boutique'].includes(id)) {
      return 'BOUTIQUE';
    }
    return 'ALL';
  };

  const filteredCategories = portfolioCategories.filter(cat => {
    if (activeFilter === 'ALL') return true;
    return getFilterType(cat.id) === activeFilter;
  });

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
          src="/images/dallas-skyline.jpg"
          alt="Dallas skyline at sunset"
          initial={reduceMotion ? { scale: 1 } : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease }}
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

          {/* Filter Pills Navigation */}
          <motion.div 
            className="portfolio-filters-wrap"
            {...fadeUp(0.18)}
          >
            <button 
              onClick={() => setActiveFilter('ALL')}
              className={`portfolio-filter-pill ${activeFilter === 'ALL' ? 'active' : ''}`}
            >
              ALL PROPERTIES
            </button>
            <div className="portfolio-filter-separator" />
            
            <button 
              onClick={() => setActiveFilter('RESORTS')}
              className={`portfolio-filter-pill ${activeFilter === 'RESORTS' ? 'active' : ''}`}
            >
              LUXURY & RESORTS
            </button>
            <div className="portfolio-filter-separator" />
            
            <button 
              onClick={() => setActiveFilter('BUSINESS')}
              className={`portfolio-filter-pill ${activeFilter === 'BUSINESS' ? 'active' : ''}`}
            >
              BUSINESS & URBAN
            </button>
            <div className="portfolio-filter-separator" />
            
            <button 
              onClick={() => setActiveFilter('BOUTIQUE')}
              className={`portfolio-filter-pill ${activeFilter === 'BOUTIQUE' ? 'active' : ''}`}
            >
              BOUTIQUE & LIFESTYLE
            </button>
          </motion.div>

          {/* Properties Grid */}
          <motion.div 
            className="portfolio-properties-grid"
            layout
          >
            {filteredCategories.map((cat) => (
              <motion.div
                key={cat.id}
                className="portfolio-property-card"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <div className="portfolio-card-img-container">
                  <img 
                    src={cat.image} 
                    alt={cat.alt} 
                    className="portfolio-card-img"
                    loading="lazy"
                  />
                </div>
                <div className="portfolio-card-info-wrap">
                  <h3 className="portfolio-card-name">{cat.name}</h3>
                  <div className="portfolio-card-loc-wrap">
                    <MapPin size={12} className="portfolio-card-loc-icon" />
                    <span className="portfolio-card-location">{cat.location}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', lineHeight: '1.55', color: 'rgba(18, 31, 52, 0.72)', marginTop: '0.75rem', marginBottom: '0.25rem' }}>
                    {cat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
      {/* 3. PERFORMANCE STATS SECTION (White background) */}
      <section className="portfolio-stats-section">
        <div className="portfolio-stats-container">
          
          <motion.div 
            className="portfolio-stats-header"
            {...fadeUp(0.1)}
          >
            <span className="portfolio-section-label-gold">DELIVERING RESULTS THAT MATTER</span>
            <h2 className="portfolio-stats-title">Performance That Drives Value</h2>
          </motion.div>

          <div className="portfolio-stats-row">
            
            {/* Stat 1 */}
            <motion.div className="portfolio-stat-item" {...fadeUp(0.15)}>
              <div className="portfolio-stat-icon-wrap">
                <Building size={28} />
              </div>
              <span className="portfolio-stat-num">50+</span>
              <span className="portfolio-stat-label">PROPERTIES MANAGED</span>
            </motion.div>

            {/* Stat 2 */}
            <motion.div className="portfolio-stat-item" {...fadeUp(0.22)}>
              <div className="portfolio-stat-icon-wrap">
                <TrendingUp size={28} />
              </div>
              <span className="portfolio-stat-num">30+</span>
              <span className="portfolio-stat-label">MARKETS NATIONWIDE</span>
            </motion.div>

            {/* Stat 3 */}
            <motion.div className="portfolio-stat-item" {...fadeUp(0.29)}>
              <div className="portfolio-stat-icon-wrap">
                <ShieldCheck size={28} />
              </div>
              <span className="portfolio-stat-num">20+</span>
              <span className="portfolio-stat-label">YEARS OF EXPERIENCE</span>
            </motion.div>

            {/* Stat 4 */}
            <motion.div className="portfolio-stat-item" {...fadeUp(0.36)}>
              <div className="portfolio-stat-icon-wrap">
                <DollarSign size={28} />
              </div>
              <span className="portfolio-stat-num">BY 25%+</span>
              <span className="portfolio-stat-label">INCREASED REVPAR</span>
            </motion.div>

            {/* Stat 5 */}
            <motion.div className="portfolio-stat-item" {...fadeUp(0.43)}>
              <div className="portfolio-stat-icon-wrap">
                <Wallet size={28} />
              </div>
              <span className="portfolio-stat-num">MAXIMIZED</span>
              <span className="portfolio-stat-label">PROFITABILITY</span>
            </motion.div>

            {/* Stat 6 */}
            <motion.div className="portfolio-stat-item" {...fadeUp(0.5)}>
              <div className="portfolio-stat-icon-wrap">
                <Award size={28} />
              </div>
              <span className="portfolio-stat-num">STRONG OWNER</span>
              <span className="portfolio-stat-label">PARTNERSHIPS</span>
            </motion.div>

          </div>

        </div>
      </section>
      

      {/* 4. CALL TO ACTION SECTION (Beige background) */}
      <section className="portfolio-cta-section">
        <div className="portfolio-cta-container">
          
          <motion.div 
            className="portfolio-cta-left"
            {...fadeUp(0.1)}
          >
            
            <span className="portfolio-section-label-gold">LET'S GROW TOGETHER</span>
            <h2 className="portfolio-cta-title">
              Let's Build Something<br />
              <span className="accent-gold">Exceptional Together</span>
            </h2>
            <p className="portfolio-cta-desc">
              Partner with Las Colinas Hospitality Management and experience the difference of true hospitality expertise.
            </p>
            <div className="portfolio-cta-buttons">
              <button 
                onClick={handlePartnerCTA}
                className="portfolio-btn-gold"
              >
                <span>PARTNER WITH US</span>
                <ArrowRight size={15} />
              </button>
              <button 
                onClick={handlePartnerCTA}
                className="portfolio-btn-outline"
              >
                <span>SCHEDULE A CONSULTATION</span>
              </button>
            </div>
          </motion.div>
          

          <motion.div 
            className="portfolio-cta-right"
            initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease }}
          >
            <img 
              src="/images/our-story-hotel.jpg" 
              alt="Luxury hotel lobby lounge sitting area" 
              className="portfolio-cta-img"
            />
          </motion.div>


        </div>
      </section>
      <HomeCTA />

    </div>
  );
};

export default Portfolio;
