import React from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Users,
  Building,
  TrendingUp,
  Megaphone,
  Share2,
  Home as HomeIcon,
  Check,
  Key,
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  image: string;
  alt: string;
  bullets: string[];
  isFeatured?: boolean;
}

const servicesData: Service[] = [
  {
    id: 'hotel-management',
    title: 'Hotel Management Services',
    description:
      'Comprehensive management solutions covering daily operations, guest experience, and strategic oversight to ensure smooth and efficient hotel performance.',
    icon: Users,
    image: '/images/services-hotel-mgmt.jpg',
    alt: 'Hotel Management Services',
    bullets: [
      'Operations Management',
      'Guest Experience Excellence',
      'Staff Training & Development',
      'Quality Assurance',
      'Performance Monitoring',
    ],
  },
  {
    id: 'hotel-project-management',
    title: 'Hotel Project Management',
    description:
      'End-to-end project management services for new hotel constructions, renovations, and rebranding projects delivered on time and within budget.',
    icon: Building,
    image: '/images/services-hotel-dev.jpg',
    alt: 'Hotel Project Management',
    bullets: [
      'Project Planning',
      'Vendor Management',
      'Construction Oversight',
      'Timeline Management',
      'Cost Control',
    ],
  },
  {
    id: 'asset-management',
    title: 'Asset Management',
    description:
      'Maximizing the value of your hotel assets through strategic planning, performance optimization, and long-term asset growth.',
    icon: TrendingUp,
    image: '/images/services-asset-mgmt.jpg',
    alt: 'Asset Management',
    bullets: [
      'Asset Performance Analysis',
      'Financial Optimization',
      'Revenue Enhancement',
      'Risk Management',
      'ROI Improvement',
    ],
  },
  {
    id: 'revenue-management',
    title: 'Revenue Management',
    description:
      'Data-driven pricing strategies to optimize occupancy, maximize revenue, and enhance overall profitability.',
    icon: Megaphone,
    image: '/images/services-revenue-mgmt.jpg',
    alt: 'Revenue Management',
    bullets: [
      'Rate Strategy',
      'Market Analysis',
      'Demand Forecasting',
      'Competitor Benchmarking',
      'Revenue Optimization',
    ],
  },
  {
    id: 'sales-marketing',
    title: 'Sales & Marketing',
    description:
      'Targeted marketing and sales strategies to increase brand visibility, drive direct bookings, and build strong guest loyalty.',
    icon: Share2,
    image: '/images/services-financial-mgmt.jpg',
    alt: 'Sales & Marketing',
    bullets: [
      'Digital Marketing',
      'Social Media Management',
      'Brand Positioning',
      'Campaign Management',
      'Booking Engine Optimization',
    ],
  },
  {
    id: 'hotel-renovation',
    title: 'Hotel Renovation & Interior Construction',
    description:
      'Transforming spaces with modern design and quality construction to enhance guest experience and property value.',
    icon: HomeIcon,
    image: '/images/services-renovation.jpg',
    alt: 'Hotel Renovation & Interior Construction',
    bullets: [
      'Interior Design',
      'Renovation',
      'Space Planning',
      'Construction Management',
      'Quality Assurance',
    ],
  },
  {
    id: 'pre-opening-services',
    title: 'Pre-Opening Services',
    description:
      'We prepare hotels for successful openings through comprehensive operational planning, staff training, and launch support.',
    icon: Key,
    image: '/images/services-pre-opening.jpg',
    alt: 'Pre-Opening Services',
    isFeatured: true,
    bullets: [
      'Recruitment',
      'Procurement',
      'Staff Training',
      'Brand Readiness',
      'Budget Development',
      'Grand Opening Support',
      'SOP Implementation',
    ],
  },
];

export const Services: React.FC = () => {
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
    hidden: { opacity: 0, y: 25 },
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
          className="services-header-top"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="services-badge">
            <span className="services-badge-diamond">✧</span>
            <span>SERVICES</span>
            <span className="services-badge-diamond">✧</span>
          </div>

          <h2 className="services-main-heading">
            End-to-End Hospitality Expertise
          </h2>

          <p className="services-main-description">
            We offer a complete range of services designed to maximize the value and performance of your hotel. Our 360° approach ensures every aspect of your property is managed with precision, care, and a focus on growth.
          </p>
        </motion.div>

        {/* Services Grid (3 Columns x 2 Rows) */}
        <motion.div
          className="services-grid-cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {servicesData.map((service) => {
            const ServiceIcon = service.icon;

            return (
              <motion.div
                key={service.id}
                className={`service-card-item ${service.isFeatured ? 'service-card-featured' : ''}`}
                variants={cardVariants}
              >
                {service.isFeatured ? (
                  <>
                    {/* Left Wide Image for Pre-Opening Services */}
                    <div className="service-featured-left-image">
                      <img
                        src={service.image}
                        alt={service.alt}
                        className="service-featured-photo"
                        loading="lazy"
                      />
                    </div>

                    {/* Right Content Side for Pre-Opening Services */}
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
                    {/* Left Content Side */}
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

                    {/* Right Vertical Image Tile */}
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

export default Services;




