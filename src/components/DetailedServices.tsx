import React from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Building2,
  GraduationCap,
  UserCheck,
  ShieldCheck,
  DollarSign,
  ClipboardList,
  Truck,
  Award,
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
  isCentered?: boolean;
}

const detailedServicesData: ServiceItem[] = [
  /* Featured Hotel Management Operations Card at Top */
  {
    id: 'hotel-operations-management',
    title: 'Hotel Operations Management',
    description: 'We provide hands-on operational support across all departments, including front office, housekeeping, food and beverage, maintenance, and guest services.',
    bullets: [
      'Staff training',
      'Recruitment support',
      'Financial controls',
      'Budgeting',
      'SOP implementation',
      'Vendor management',
      'Quality audits',
    ],
    icon: Building2,
    image: '/services imgs/hotel-operations-management.webp',
    alt: 'Hotel operations management',
    isFeatured: true,
  },
  /* Core Hotel Management Services Cards */
  {
    id: 'staff-training',
    title: 'Staff Training',
    description: 'Building high-performing teams through continuous skills development, service standard training, and leadership coaching across operational departments.',
    bullets: [
      'Comprehensive service standard orientation',
      'Departmental skill certification',
      'Leadership & supervisory coaching',
      'Guest satisfaction & service recovery training',
    ],
    icon: GraduationCap,
    image: '/services imgs/staff-training.webp',
    alt: 'Staff training',
  },
  {
    id: 'recruitment-support',
    title: 'Recruitment Support',
    description: 'Streamlined recruitment support ensuring key operational roles are filled with qualified, passionate hospitality professionals.',
    bullets: [
      'Executive & key position recruitment',
      'Staff vetting & background screening',
      'Onboarding & orientation frameworks',
      'Retention & team engagement strategies',
    ],
    icon: UserCheck,
    image: '/services imgs/recruitment-support.webp',
    alt: 'Recruitment support',
  },
  {
    id: 'financial-controls',
    title: 'Financial Controls',
    description: 'Implementing strict financial governance, daily revenue reconciliation, and expense controls to safeguard asset value and boost net profitability.',
    bullets: [
      'Daily revenue & cashiering reconciliation',
      'Labor cost control & scheduling audits',
      'Inventory & purchasing audit systems',
      'Internal fraud prevention controls',
    ],
    icon: ShieldCheck,
    image: '/services imgs/financial-controls.webp',
    alt: 'Financial controls',
  },
  {
    id: 'budgeting',
    title: 'Budgeting',
    description: 'Developing precise annual operating budgets and monthly forecasts that align operational expenditure with ownership financial goals.',
    bullets: [
      'Annual operating budget creation',
      'Monthly P&L forecasting & variance analysis',
      'CapEx planning & reserve oversight',
      'Owner financial reporting',
    ],
    icon: DollarSign,
    image: '/services imgs/budgeting.webp',
    alt: 'Budgeting',
  },
  {
    id: 'sop-implementation',
    title: 'SOP Implementation',
    description: 'Customizing and deploying standardized operating procedures (SOPs) across departments to maintain brand integrity and service consistency.',
    bullets: [
      'Custom SOP manual development',
      'Departmental execution checklists',
      'Compliance monitoring & audits',
      'Continuous operational refinement',
    ],
    icon: ClipboardList,
    image: '/services imgs/SOP-Implementation.webp',
    alt: 'SOP implementation',
  },
  {
    id: 'vendor-management',
    title: 'Vendor Management',
    description: 'Leveraging group purchasing relationships and vendor oversight to secure optimal pricing on operational supplies, food, and contracted services.',
    bullets: [
      'Group purchasing power leverage',
      'Supplier contract negotiations',
      'Quality assurance on deliverables',
      'Cost-efficient supply chain management',
    ],
    icon: Truck,
    image: '/services imgs/vendor-management.webp',
    alt: 'Vendor management',
  },
  /* Quality Audits Card Centered in the Middle without altering internal layout */
  {
    id: 'quality-audits',
    title: 'Quality Audits',
    description: 'Conducting thorough unannounced quality audits and inspection readiness evaluations to maintain high brand standards and guest review scores.',
    bullets: [
      'Mystery shopper & quality evaluations',
      'Brand standards compliance verification',
      'Actionable corrective performance plans',
      'Cleanliness & maintenance scoring',
    ],
    icon: Award,
    image: '/services imgs/quality-audits.webp',
    alt: 'Quality audits',
    isCentered: true,
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
            <span className="services-badge-text">
              <span style={{ color: '#041831', fontWeight: 800 }}>01</span> SERVICE
            </span>
            <span className="services-badge-diamond">✧</span>
          </div>

          <h2 className="services-main-heading">
            Hotel Management Services
          </h2>

          <p className="services-main-description">
            We provide hands-on operational support across all departments, including front office, housekeeping, food and beverage, maintenance, and guest services, ensuring efficient and seamless hotel operations.
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
            const itemClassName = `service-card-item ${service.isFeatured ? 'service-card-featured' : ''} ${service.isCentered ? 'service-card-centered-middle' : ''}`;

            return (
              <motion.div
                key={service.id}
                id={service.id}
                className={itemClassName}
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
