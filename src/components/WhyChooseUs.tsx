import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Building2, BarChart3, Calculator, ShieldCheck, Award } from 'lucide-react';

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  angle: string;
}

const features: FeatureItem[] = [
  {
    id: 0,
    title: 'Proven Performance',
    description: 'Our operational systems, brand compliance audits, and experienced staffing programs optimize hotel cash flow and elevate guest satisfaction.',
    icon: TrendingUp,
    angle: '-90deg'
  },
  {
    id: 1,
    title: 'Strategic Development',
    description: 'We guide new builds, PIP negotiations, and capital renovations from initial design concepts to flawless grand openings.',
    icon: Building2,
    angle: '-30deg'
  },
  {
    id: 2,
    title: 'Data-Driven Revenue',
    description: 'We employ sophisticated data underwriting, dynamic pricing strategies, and OTA optimization to consistently outpace market benchmarks.',
    icon: BarChart3,
    angle: '30deg'
  },
  {
    id: 3,
    title: 'Disciplined Finance',
    description: 'Our centralized accounting managers provide clear, audited property financials, capital planning, and KPI reports.',
    icon: Calculator,
    angle: '90deg'
  },
  {
    id: 4,
    title: 'Brand Compliance',
    description: 'We ensure absolute alignment with major franchise standards, preserving asset integrity and maintaining top-tier brand relationships.',
    icon: ShieldCheck,
    angle: '150deg'
  },
  {
    id: 5,
    title: 'Guest Experience',
    description: 'Cultivating exceptional service cultures that drive repeat business, high guest review scores, and elevated brand reputation.',
    icon: Award,
    angle: '210deg'
  }
];

const stats = [
  { value: '25+', label: 'Hotels Managed' },
  { value: '1,800+', label: 'Rooms Managed' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '10+', label: 'Years in Business' }
];

export const WhyChooseUs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Auto-rotate the wheel smoothly every 5 seconds unless user hovers
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section className="why-choose-section">
      {/* Background Image Layer with smooth moving/panning effect */}
      <div className="why-bg-image-wrap">
        <img src="/images/why-choose-us.jpg" alt="" className="why-bg-image" />
        <div className="why-bg-overlay" />
      </div>

      <div className="why-choose-container">
        
        {/* Header Grid */}
        <motion.div 
          className="why-header-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="why-header-left">
            <span className="why-section-label">LCHM ADVANTAGE</span>
            <h2 className="why-section-heading">Why Choose Us</h2>
          </div>
          <div className="why-header-right">
            <p className="why-section-description">
              At Las Colinas Hospitality Management, we combine decades of industry expertise with a tailored, hands-on operational model. We deliver outstanding value, optimize operational efficiency, and elevate performance for premium hotel owners and investors.
            </p>
          </div>
        </motion.div>

        {/* main interactive grid */}
        <div className="why-main-grid">
          
          {/* Interactive circular wheel on the left */}
          <div 
            className="why-wheel-column"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              className="why-wheel-wrapper"
              style={{ '--active-index': activeIndex } as React.CSSProperties}
            >
              {/* Central dashed line connection */}
              <div className="why-circle-outline" />

              {/* 6 Circular Nodes */}
              {features.map((feat, index) => {
                const Icon = feat.icon;
                const isActive = activeIndex === index;
                
                return (
                  <button
                    key={feat.id}
                    type="button"
                    className={`why-circle-node ${isActive ? 'active' : ''}`}
                    style={{ '--angle': feat.angle } as React.CSSProperties}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    aria-label={`Select ${feat.title}`}
                  >
                    <div className="why-node-glow" />
                    <div className="why-node-inner">
                      <Icon size={22} className="why-node-icon" />
                    </div>
                  </button>
                );
              })}

            </div>

            {/* Central text display - Positioned absolutely in the center of the column to stay static */}
            <div className="why-circle-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="why-center-content"
                >
                  <h3 className="why-center-title">{features[activeIndex].title}</h3>
                  <p className="why-center-desc">{features[activeIndex].description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Statistics grid on the right */}
          <div className="why-stats-column">
            <div className="why-stats-grid">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="why-stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="why-stat-value">{stat.value}</span>
                  <span className="why-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
