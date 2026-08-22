import React from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Building2,
  Compass,
  TrendingUp,
  BarChart3,
  Calculator,
  Hammer,
  Key,
  Check,
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  icon: React.ComponentType<{ className?: string; size?: number }>;
  image: string;
  alt: string;
  isFeatured?: boolean;
}

const detailedServicesData: ServiceItem[] = [
  {
    id: 'hotel-management',
    title: 'Hotel Management Services',
    description: 'We provide comprehensive hotel management services designed to maximize profitability, improve operational efficiency, and enhance guest satisfaction.',
    bullets: [
      'Day-to-day hotel operations management',
      'Staff recruitment, training, and leadership',
      'Guest experience & quality assurance',
      'Cost control & profitability enhancement',
    ],
    icon: Building2,
    image: '/images/services-hotel-mgmt.jpg',
    alt: 'Luxury hotel management',
  },
  {
    id: 'hotel-development',
    title: 'Hotel Development',
    description: 'Our development team guides projects from concept to completion, delivering hotels that meet brand standards, operational goals, and owner expectations.',
    bullets: [
      'Site selection & feasibility analysis',
      'Brand selection & PIP negotiation',
      'Architectural & design coordination',
      'Construction & timeline oversight',
    ],
    icon: Compass,
    image: '/images/services-hotel-dev.jpg',
    alt: 'Hotel development',
  },
  {
    id: 'asset-management',
    title: 'Asset Management',
    description: 'We work alongside owners to maximize long-term investment performance through strategic oversight and disciplined financial management.',
    bullets: [
      'Portfolio performance evaluation',
      'Capital expenditure planning',
      'Financial auditing & benchmarking',
      'Owner representation & advisory',
    ],
    icon: TrendingUp,
    image: '/images/services-asset-mgmt.jpg',
    alt: 'Asset management',
  },
  {
    id: 'revenue-management',
    title: 'Revenue Management',
    description: 'Our revenue specialists utilize data-driven pricing strategies to optimize market share and maximize revenue.',
    bullets: [
      'Dynamic pricing & yield management',
      'Channel & OTA optimization',
      'Competitive market analysis',
      'Demand forecasting & inventory control',
    ],
    icon: BarChart3,
    image: '/images/services-revenue-mgmt.jpg',
    alt: 'Revenue management',
  },
  {
    id: 'financial-management',
    title: 'Financial Management',
    description: 'Our accounting professionals deliver accurate financial reporting and strategic guidance.',
    bullets: [
      'Comprehensive monthly reporting',
      'Budgeting & cash flow forecasting',
      'Payroll & accounts payable management',
      'Internal controls & compliance',
    ],
    icon: Calculator,
    image: '/images/services-financial-mgmt.jpg',
    alt: 'Financial management',
  },
  {
    id: 'hotel-renovation',
    title: 'Hotel Renovation & Project Management',
    description: 'We oversee renovations, capital improvements, and repositioning projects while maintaining budget, schedule, and quality standards.',
    bullets: [
      'PIP compliance & execution',
      'Vendor & contractor management',
      'Procurement & FF&E installation',
      'Budget & timeline control',
    ],
    icon: Hammer,
    image: '/images/services-renovation.jpg',
    alt: 'Hotel renovation',
  },
  {
    id: 'pre-opening',
    title: 'Pre-Opening Services',
    description: 'We ensure seamless hotel openings by managing timelines, training staff, and setting up operational systems for day-one readiness.',
    bullets: [
      'Operational setup & SOP implementation',
      'Staff hiring & brand training',
      'Sales & marketing launch strategy',
      'Systems integration & test opening',
    ],
    icon: Key,
    image: '/images/services-pre-opening.jpg',
    alt: 'Pre-opening services',
    isFeatured: true,
  },
];

export const DetailedServices: React.FC = () => {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        {/* Section Header */}
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="services-badge">
            <span className="services-badge-text">OUR SERVICES</span>
            <span className="services-badge-diamond">✧</span>
          </div>

          <h2 className="services-main-heading">
            End-to-End Hospitality Expertise
          </h2>

          <p className="services-main-description">
            We offer a complete range of services designed to maximize the value and performance of your hotel. Our 360° approach ensures every aspect of your property is managed with precision, care, and a focus on growth.
          </p>
        </motion.div>

        {/* Services Grid Cards */}
        <motion.div
          className="services-grid-cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {detailedServicesData.map((service) => {
            const ServiceIcon = service.icon;

            return (
              <motion.div
                key={service.id}
                className={`service-card-item ${service.isFeatured ? 'service-card-featured' : ''}`}
                variants={cardVariants}
              >
                {service.isFeatured ? (
                  <>
                    <div className="service-featured-left-image">
                      <img
                        src={service.image}
                        alt={service.alt}
                        className="service-featured-photo"
                        loading="lazy"
                      />
                    </div>

                    <div className="service-featured-right-content">
                      <div className="service-icon-circle">
                        <ServiceIcon size={24} className="service-lucide-icon" />
                      </div>

                      <h3 className="service-card-heading">{service.title}</h3>
                      <p className="service-card-text">{service.description}</p>

                      <ul className="service-bullets-list service-bullets-2col">
                        {service.bullets.map((bullet, idx) => (
                          <li key={idx} className="service-bullet-item">
                            <span className="service-bullet-icon">
                              <Check size={13} strokeWidth={2.8} />
                            </span>
                            <span className="service-bullet-text">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="service-card-left">
                      <div className="service-icon-circle">
                        <ServiceIcon size={24} className="service-lucide-icon" />
                      </div>

                      <h3 className="service-card-heading">{service.title}</h3>
                      <p className="service-card-text">{service.description}</p>

                      <ul className="service-bullets-list">
                        {service.bullets.map((bullet, idx) => (
                          <li key={idx} className="service-bullet-item">
                            <span className="service-bullet-icon">
                              <Check size={13} strokeWidth={2.8} />
                            </span>
                            <span className="service-bullet-text">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="service-card-right-image">
                      <img
                        src={service.image}
                        alt={service.alt}
                        className="service-vertical-photo"
                        loading="lazy"
                      />
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default DetailedServices;
