import React from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Users,
  Building,
  TrendingUp,
  Megaphone,
  Share2,
  Home as HomeIcon,
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  bullets: string[];
}

const homeServicesData: Service[] = [
  {
    id: 'hotel-management',
    title: 'Hotel Management Services',
    description:
      'Comprehensive management solutions covering daily operations, guest experience, and strategic oversight to ensure smooth and efficient hotel performance.',
    icon: Users,
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
    bullets: [
      'Interior Design',
      'Renovation',
      'Space Planning',
      'Construction Management',
      'Quality Assurance',
    ],
  },
];

export const HomeServices: React.FC = () => {
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

        {/* Original Clean 3-Column Services Card Grid */}
        <motion.div
          className="home-orig-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {homeServicesData.map((service) => {
            const ServiceIcon = service.icon;

            return (
              <motion.div
                key={service.id}
                className="home-orig-card"
                variants={cardVariants}
              >
                <div className="service-icon-circle">
                  <ServiceIcon size={24} className="service-lucide-icon" />
                </div>

                <h3 className="home-orig-card-title">{service.title}</h3>

                <p className="home-orig-card-text">{service.description}</p>

                <ul className="home-orig-bullets">
                  {service.bullets.map((bullet, idx) => (
                    <li key={idx} className="home-orig-bullet-item">
                      <span className="service-bullet-dot">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeServices;
