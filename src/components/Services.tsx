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
  Calendar,
  ArrowRight,
  Briefcase,
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  image: string;
  alt: string;
  bullets?: string[];
}

const servicesData: Service[] = [
  {
    id: 'hotel-management',
    title: 'Hotel Management Services',
    description: 'We provide comprehensive hotel management services designed to maximize profitability, improve operational efficiency, and enhance guest satisfaction.',
    icon: Building2,
    image: '/images/services-hotel-mgmt.jpg',
    alt: 'Luxury hotel lobby representing comprehensive hotel management services',
    bullets: [
      'Front Office Operations',
      'Housekeeping Management',
      'Engineering & Maintenance',
      'Food & Beverage Operations',
      'Brand Compliance',
      'Guest Experience Programs'
    ]
  },
  {
    id: 'hotel-development',
    title: 'Hotel Development',
    description: 'Our development team guides projects from concept to completion, delivering hotels that meet brand standards, operational goals, and owner expectations.',
    icon: Compass,
    image: '/images/services-hotel-dev.jpg',
    alt: 'Modern hotel construction design blueprints representing hotel development',
    bullets: [
      'Site Evaluation',
      'Feasibility Studies',
      'Development Planning',
      'Construction Oversight',
      'Brand Coordination',
      'Opening Strategy'
    ]
  },
  {
    id: 'asset-management',
    title: 'Asset Management',
    description: 'We work alongside owners to maximize long-term investment performance through strategic oversight and disciplined financial management.',
    icon: TrendingUp,
    image: '/images/services-asset-mgmt.jpg',
    alt: 'Strategic asset management discussion at a luxury hotel property',
    bullets: [
      'Asset Performance Analysis',
      'Capital Planning',
      'Investment Strategies',
      'Owner Representation',
      'Operational Audits',
      'ROI Optimization'
    ]
  },
  {
    id: 'revenue-management',
    title: 'Revenue Management',
    description: 'Our revenue specialists utilize data-driven pricing strategies to optimize market share and maximize revenue.',
    icon: BarChart3,
    image: '/images/services-revenue-mgmt.jpg',
    alt: 'Data analytics charts for hotel revenue management display',
    bullets: [
      'Dynamic Pricing',
      'Forecasting',
      'Market Analysis',
      'Distribution Strategy',
      'OTA Optimization',
      'Business Intelligence Reporting'
    ]
  },
  {
    id: 'financial-management',
    title: 'Financial Management',
    description: 'Our accounting professionals deliver accurate financial reporting and strategic guidance.',
    icon: Calculator,
    image: '/images/services-financial-mgmt.jpg',
    alt: 'Financial reports and accounts auditing documents in hotel business office',
    bullets: [
      'Budget Development',
      'Forecasting',
      'Cash Flow Management',
      'Payroll Oversight',
      'KPI Reporting',
      'Expense Management'
    ]
  },
  {
    id: 'hotel-renovation',
    title: 'Hotel Renovation & Project Management',
    description: 'We oversee renovations, capital improvements, and repositioning projects while maintaining budget, schedule, and quality standards.',
    icon: Hammer,
    image: '/images/services-renovation.jpg',
    alt: 'Moodboard and plans for luxury hotel renovation project',
    bullets: [
      'Renovation Planning & Budgeting',
      'Design & Architecture Sourcing',
      'Contractor Procurement',
      'Project Scheduling & Milestones',
      'Quality Control & Brand Alignment',
      'Post-Renovation Inspections'
    ]
  },
  {
    id: 'pre-opening',
    title: 'Pre-Opening Services',
    description: 'We ensure seamless hotel openings by managing timelines, training staff, and setting up operational systems for day-one readiness.',
    icon: Key,
    image: '/images/services-pre-opening.jpg',
    alt: 'Opening keys and launch strategy representing pre-opening services',
    bullets: [
      'Pre-Opening Budget Development',
      'Talent Acquisition & Staff Training',
      'Marketing & PR Campaign Launch',
      'Operational Systems Setup',
      'Vendor & Procurement Management',
      'Soft Opening Coordination'
    ]
  },
  {
    id: 'hospitality-consulting',
    title: 'Hospitality Consulting',
    description: 'We provide specialized strategic consulting services to help owners and developers navigate complex business decisions and optimize hospitality assets.',
    icon: Briefcase,
    image: '/images/about-hotel.jpg',
    alt: 'Business strategy consultation meeting representing hospitality consulting',
    bullets: [
      'Brand Selection & Negotiation',
      'PIP Analysis & Estimate Auditing',
      'Hotel Underwriting Support',
      'Market Feasibility Oversight',
      'Operational Turnaround Planning',
      'Owner Advisory & Representation'
    ]
  }
];

export const Services: React.FC = () => {
  // Staggered Container Variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  // Individual Card Variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        
        {/* Section Header with Watermark & Flanked Crest */}
        <motion.div 
          className="editorial-header"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Central flanked crest */}
          <div className="header-crest-wrapper">
            <div className="header-crest-line" />
            <div className="header-crest-icon">
              <svg viewBox="0 0 100 100" className="header-crest-svg-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,10 90,50 50,90 10,50" stroke="#B08C48" strokeWidth="5" />
                <polygon points="50,18 82,50 50,82 18,50" stroke="#B08C48" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                <path d="M50 24 L52.5 30 L58 30 L53.5 34.5 L55 40 L50 36.5 L45 40 L46.5 34.5 L42 30 L47.5 30 Z" fill="#B08C48" />
                <text x="50" y="66" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="28" fontWeight="700" fill="#B08C48" textAnchor="middle">LC</text>
                <path d="M 36 74 Q 50 80 64 74" stroke="#B08C48" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div className="header-crest-line" />
          </div>

          {/* Heading with large watermark background */}
          <div className="header-title-wrapper">
            <h2 className="editorial-heading">SERVICES</h2>
            <div className="header-watermark">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,6 94,50 50,94 6,50" stroke="#B08C48" strokeWidth="2" opacity="0.14" />
                <polygon points="50,14 86,50 50,86 14,50" stroke="#B08C48" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.08" />
                <path d="M50 20 L53 27 L60 27 L54 32 L56 39 L50 35 L44 39 L46 32 L40 27 L47 27 Z" fill="#B08C48" opacity="0.12" />
                <text x="50" y="66" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="30" fontWeight="700" fill="#B08C48" textAnchor="middle" opacity="0.12">LC</text>
                <path d="M 34 76 Q 50 83 66 76" stroke="#B08C48" strokeWidth="1.5" fill="none" opacity="0.12" />
              </svg>
            </div>
          </div>

          <p className="editorial-subtext">
            Operational integrity, disciplined development, and targeted asset optimization. Delivering exceptional performance and cultivating long-term appreciation for hotel owners and investors.
          </p>
        </motion.div>
 
        {/* Services Grid */}
        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {servicesData.map((service) => {
            const ServiceIcon = service.icon;

            return (
              <motion.a
                href="#services"
                key={service.id}
                className="service-card"
                variants={cardVariants}
              >
                {/* Background Image Wrap (Fades in on hover) */}
                <div className="service-card-image-wrap">
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="service-card-image"
                    loading="lazy"
                  />
                  <div className="service-card-overlay" />
                </div>

                {/* Card Content Overlay */}
                <div className="service-card-content">
                  {/* Large Center Icon */}
                  <div className="service-card-icon-center">
                    <ServiceIcon size={60} className="service-card-lucide-icon" />
                  </div>

                  {/* Title at the Bottom */}
                  <h3 className="service-card-title-bottom">{service.title}</h3>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* CTA After Services */}
        <motion.div 
          className="services-cta-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#partner" className="btn-gold">
            <span>Partner With Us</span>
            <ArrowRight size={15} />
          </a>
          <a href="#consultation" className="btn-secondary">
            <Calendar size={15} />
            <span>Schedule a Consultation</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Services;




