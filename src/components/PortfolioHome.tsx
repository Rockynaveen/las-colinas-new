import React, { useRef, useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Loader2 } from 'lucide-react';
import type { PortfolioCategory } from '../utils/portfolioData';
import { portfolioService, type PortfolioResource } from '../services/portfolioService';

const defaultHomePortfolio: PortfolioCategory[] = [
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

export const PortfolioHome: React.FC = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const [categories, setCategories] = useState<PortfolioCategory[]>(defaultHomePortfolio);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchPortfolio = async () => {
      setLoading(true);
      setError(null);
      const res = await portfolioService.getPortfolios();
      if (isMounted) {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setCategories(res.data.map(mapResourceToCategory));
        } else {
          // If API returns empty or fails, use fallback default properties
          setCategories(defaultHomePortfolio);
        }
        setLoading(false);
      }
    };

    fetchPortfolio();
    return () => {
      isMounted = false;
    };
  }, []);

  // Show up to 10 portfolio cards
  const activeCategories = categories.length > 0 ? categories.slice(0, 10) : defaultHomePortfolio;

  // Track viewport width dynamically & update when loading finishes
  useEffect(() => {
    const handleResize = () => {
      if (viewportRef.current) {
        setViewportWidth(viewportRef.current.clientWidth);
      } else if (typeof window !== 'undefined') {
        setViewportWidth(Math.min(window.innerWidth - 32, 1200));
      }
    };

    handleResize();

    let observer: ResizeObserver | null = null;
    if (viewportRef.current) {
      observer = new ResizeObserver((entries) => {
        if (entries[0]) {
          setViewportWidth(entries[0].contentRect.width);
        }
      });
      observer.observe(viewportRef.current);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [loading]);

  // Compute cards in view responsively
  const getCardsPerView = (width: number) => {
    const w = width || (typeof window !== 'undefined' ? window.innerWidth : 1200);
    if (w <= 640) return 1;  // Mobile
    if (w <= 1024) return 2; // Tablet
    return 4;                // Desktop
  };

  const cardsPerView = getCardsPerView(viewportWidth);
  const maxIndex = Math.max(0, activeCategories.length - cardsPerView);

  // Handle slide left/right clicking chevron buttons (with looping)
  const scrollLeft = () => {
    setActiveIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  };

  const scrollRight = () => {
    setActiveIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Scroll directly to card index when clicking dot
  const handleDotClick = (index: number) => {
    setActiveIndex(Math.min(index, maxIndex));
  };

  // Auto-play scroll effect loop
  useEffect(() => {
    if (isHovered || maxIndex <= 0) return;

    const timer = setInterval(() => {
      setActiveIndex(prev => {
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [isHovered, maxIndex]);

  // Helper to format card names
  const getCardDisplayName = (name: string) => {
    return name.toUpperCase();
  };

  // Entrance variants for the main container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // Entrance variants for each category card
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Compute translation X offset based on pixel card width and gap (24px)
  const measuredWidth = viewportWidth > 0 ? viewportWidth : (typeof window !== 'undefined' ? Math.min(window.innerWidth - 32, 1200) : 320);
  const cardWidth = cardsPerView === 1 
    ? Math.max(260, measuredWidth) 
    : Math.max(240, (measuredWidth - 24 * (cardsPerView - 1)) / cardsPerView);
  const translateX = -activeIndex * (cardWidth + 24);

  return (
    <section className="port-filter-section" style={{ borderBottom: '1px solid rgba(176, 140, 72, 0.15)', paddingTop: '4.5rem', paddingBottom: '3.5rem' }}>
      <div className="port-filter-container">

        {/* Clean Center-Aligned Editorial Header */}
        <span className="port-section-label">OUR PORTFOLIO</span>
        <h2 className="port-section-heading">
          Building <span>Exceptional Hospitality Assets</span>
        </h2>
        <p className="port-section-subtitle">
          Our diverse portfolio showcases our ability to manage and elevate hospitality assets across multiple segments and markets.
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem', color: '#121F34' }}>
            <Loader2 size={30} className="animate-spin" style={{ margin: '0 auto 0.75rem auto', color: '#B08C48' }} />
            <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 500 }}>Loading portfolio properties...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1.5rem', background: 'rgba(217, 56, 58, 0.05)', borderRadius: '8px', border: '1px solid rgba(217, 56, 58, 0.2)', margin: '2rem 0' }}>
            <p style={{ color: '#D9383A', margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>{error}</p>
          </div>
        ) : activeCategories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
            <p style={{ fontSize: '1rem', color: 'rgba(18, 31, 52, 0.7)', margin: 0 }}>No portfolio properties available.</p>
          </div>
        ) : (
          <>
            {/* Flanked Interactive Carousel Container */}
            <div
              className="port-slider-container"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >

              {/* Left Navigation Chevron */}
              <button
                className="port-slider-arrow arrow-left"
                onClick={scrollLeft}
                aria-label="Scroll left"
              >
                <ChevronLeft size={22} strokeWidth={2.5} />
              </button>

              {/* Viewport Wrapper */}
              <motion.div
                className="port-slider-viewport"
                ref={viewportRef}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                style={{ width: '100%', overflow: 'hidden', position: 'relative' }}
              >
                {/* Scrollable Track */}
                <motion.div
                  className="port-slider-track"
                  animate={{ x: translateX }}
                  transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
                  style={{ display: 'flex', gap: '24px', width: 'max-content' }}
                >
                  {activeCategories.map((cat) => (
                    <motion.a
                      key={cat.id}
                      href={cat.link || 'https://lascolinasmanagement.com/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="port-card"
                      variants={cardVariants}
                      style={{ width: cardWidth, flex: '0 0 auto', textDecoration: 'none' }}
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

                      {/* Clean Centered Content */}
                      <div className="port-card-content">
                        <h3 className="port-card-name">
                          {getCardDisplayName(cat.name)}
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
              </motion.div>

              {/* Right Navigation Chevron */}
              <button
                className="port-slider-arrow arrow-right"
                onClick={scrollRight}
                aria-label="Scroll right"
              >
                <ChevronRight size={22} strokeWidth={2.5} />
              </button>

            </div>

            {/* Carousel Pagination Dots */}
            <div className="port-slider-dots" aria-hidden="true">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  className={`port-dot ${activeIndex === idx ? 'active' : ''}`}
                  onClick={() => handleDotClick(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Bottom CTA to view full Portfolio */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="#portfolio" className="btn-gold">
            <span>View Full Portfolio</span>
            <ArrowRight size={15} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default PortfolioHome;

