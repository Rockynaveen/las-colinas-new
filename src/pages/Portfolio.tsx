import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  MapPin, 
  ChevronDown,
  Loader2
} from 'lucide-react';
import HomeCTA from '../components/HomeCTA';
import { ServicesHero } from '../components/ServicesHero';
import type { PortfolioCategory } from '../utils/portfolioData';
import { portfolioService, type PortfolioResource } from '../services/portfolioService';

const ease = [0.16, 1, 0.3, 1] as const;

const mapResourceToCategory = (res: PortfolioResource): PortfolioCategory => {
  const name = res.heading || res.name || res.title || 'HOSPITALITY PROPERTY';
  const location = res.location_name || res.location || '';
  return {
    id: String(res.id),
    name,
    tagline: res.tagline || '',
    description: res.description || '',
    image: res.image || res.image_url || '/images/portfolio-branded.jpg',
    alt: res.alt || name,
    location,
    link: res.link || undefined
  };
};

const defaultPortfolioItems: PortfolioCategory[] = [
  {
    id: '1',
    name: 'LUXURY RESORTS',
    tagline: 'Premium Hospitality',
    description: 'Building exceptional guest experiences.',
    image: '/images/portfolio-branded.jpg',
    alt: 'LUXURY RESORTS',
    location: 'Dallas, Texas, USA',
    link: '#portfolio'
  },
  {
    id: '2',
    name: 'BUSINESS HOTELS',
    tagline: 'Operational Excellence',
    description: 'Maximizing operating models and yields.',
    image: '/images/portfolio-select.jpg',
    alt: 'BUSINESS HOTELS',
    location: 'Miami, Florida, USA',
    link: '#portfolio'
  },
  {
    id: '3',
    name: 'BOUTIQUE HOTELS',
    tagline: 'Curated Guest Comfort',
    description: 'Residential comfort and premium margins.',
    image: '/images/portfolio-extended.jpg',
    alt: 'BOUTIQUE HOTELS',
    location: 'Austin, Texas, USA',
    link: '#portfolio'
  }
];

export const Portfolio: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [categories, setCategories] = useState<PortfolioCategory[]>(defaultPortfolioItems);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(8); // Initially show 8 items

  useEffect(() => {
    let isMounted = true;
    const fetchPortfolio = async () => {
      setLoading(true);
      setError(null);
      const res = await portfolioService.getPortfolios();
      if (isMounted) {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.map(mapResourceToCategory);
          setCategories(mapped);
        } else {
          setCategories(defaultPortfolioItems);
        }
        setLoading(false);
      }
    };

    fetchPortfolio();
    return () => {
      isMounted = false;
    };
  }, []);

  const displayedCategories = categories.slice(0, visibleCount);

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.8, delay, ease }
  });

  return (
    <div className="portfolio-page-wrap">
      
      {/* 1. HERO SECTION */}
      <ServicesHero
        label="OUR PORTFOLIO"
        heading="Exceptional Properties. Proven Performance."
        subtext="We partner with owners and investors to develop, manage, and elevate hotel assets across leading markets."
      />

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

          {/* Properties Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 1.5rem', color: '#121F34' }}>
              <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 0.75rem auto', color: '#B08C48' }} />
              <p style={{ margin: 0, fontSize: '1rem', fontWeight: 500 }}>Loading portfolio collection...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '3rem 1.5rem', background: 'rgba(217, 56, 58, 0.05)', borderRadius: '8px', border: '1px solid rgba(217, 56, 58, 0.2)', margin: '2rem 0' }}>
              <p style={{ color: '#D9383A', margin: 0, fontSize: '1rem', fontWeight: 600 }}>{error}</p>
            </div>
          ) : categories.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
              <p style={{ fontSize: '1.1rem', color: 'rgba(18, 31, 52, 0.7)', margin: 0 }}>No portfolio properties available.</p>
            </div>
          ) : (
            <motion.div 
              className="portfolio-properties-grid"
              layout
            >
              {displayedCategories.map((cat) => (
                <motion.a
                  key={cat.id}
                  href={cat.link || 'https://lascolinasmanagement.com/'}
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
          )}

          {/* Load More Button */}
          {!loading && !error && visibleCount < categories.length && (
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

