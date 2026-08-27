import React from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Hammer,
  Globe,
  TrendingUp,
  Users,
  Calculator,
  BarChart3,
  ShieldCheck,
  Package,
  Star,
  Key,
  Briefcase,
  Target,
  Percent,
  Activity,
  Megaphone,
  UserPlus,
  Search,
  Check,
  Sparkles,
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

const aLaCarteServicesData: ServiceItem[] = [
  /* Featured Overview Card for A La Carte Services */
  {
    id: 'a-la-carte-overview',
    title: 'A La Carte Services Overview',
    description: 'Targeted, highly specialized solutions designed to solve specific operational, financial, pricing, and strategic challenges. Select individual modular services tailored to your exact property and ownership objectives.',
    bullets: [
      'Hotel Renovation & Development',
      'OTA Management & Distribution Strategy',
      'Hospitality Investment & Asset Management',
      'Staff Training & Leadership Development',
      'Financial & Accounting Management',
      'Revenue Management & Optimization',
      'Quality Assurance (QA) Readiness',
      'FF&E Procurement & Asset Planning',
    ],
    icon: Sparkles,
    image: '/images/services-renovation.jpg',
    alt: 'A La Carte Services Overview',
    isFeatured: true,
  },
  /* 17 Specialized A La Carte Service Cards */
  {
    id: 'hotel-renovation-development',
    title: 'Hotel Renovation & Development',
    description: 'Leading renovation projects, property enhancements, and development initiatives to improve asset value and guest experience.',
    bullets: [
      'PIP compliance & execution management',
      'Architectural & design vendor oversight',
      'Capex budget & timeline control',
      'Property repositioning & modernization',
    ],
    icon: Hammer,
    image: '/images/services-renovation.jpg',
    alt: 'Hotel Renovation & Development',
  },
  {
    id: 'ota-management-distribution',
    title: 'OTA Management & Distribution Strategy',
    description: 'Managing online travel agency performance, channel optimization, and digital distribution strategies to maximize visibility and revenue.',
    bullets: [
      'Third-party OTA channel optimization',
      'Rate parity & margin protection',
      'Content & photography positioning',
      'Direct booking conversion enhancement',
    ],
    icon: Globe,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    alt: 'OTA Management & Distribution Strategy',
  },
  {
    id: 'hospitality-investment-asset-management',
    title: 'Hospitality Investment & Asset Management',
    description: 'Supporting investment strategies, ownership objectives, ROI improvement, and long-term asset performance.',
    bullets: [
      'Portfolio asset performance reviews',
      'Capital allocation & reserve oversight',
      'Operator & management accountability',
      'Valuation & disposition support',
    ],
    icon: TrendingUp,
    image: '/images/services-asset-mgmt.jpg',
    alt: 'Hospitality Investment & Asset Management',
  },
  {
    id: 'staff-training-leadership-development',
    title: 'Staff Training & Leadership Development',
    description: 'Building high-performing teams through structured training programs, coaching, succession planning, and employee engagement initiatives.',
    bullets: [
      'Executive coaching & management workshops',
      'Departmental cross-training frameworks',
      'Team retention & incentive programs',
      'Service culture transformation',
    ],
    icon: Users,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    alt: 'Staff Training & Leadership Development',
  },
  {
    id: 'financial-accounting-management',
    title: 'Financial & Accounting Management',
    description: 'Overseeing budgeting, forecasting, P&L management, cost controls, payroll optimization, and financial performance analysis.',
    bullets: [
      'Monthly P&L accounting & reporting',
      'Payroll ratio optimization',
      'Cost center variance analysis',
      'Cash flow management & forecasting',
    ],
    icon: Calculator,
    image: '/images/services-financial-mgmt.jpg',
    alt: 'Financial & Accounting Management',
  },
  {
    id: 'revenue-management-optimization',
    title: 'Revenue Management & Optimization',
    description: 'Developing revenue strategies through demand forecasting, market analysis, rate positioning, and inventory management.',
    bullets: [
      'Dynamic rate positioning & strategies',
      'Market share & RevPAR optimization',
      'Demand calendar forecasting',
      'Competitive set monitoring',
    ],
    icon: BarChart3,
    image: '/images/services-revenue-mgmt.jpg',
    alt: 'Revenue Management & Optimization',
  },
  {
    id: 'quality-assurance-readiness',
    title: 'Quality Assurance (QA) Readiness',
    description: 'Ensuring brand compliance, operational excellence, inspection readiness, and continuous improvement across hotel departments.',
    bullets: [
      'Brand standard QA audit preparation',
      'Physical plant & guest room audits',
      'Staff standard protocol testing',
      'Post-inspection corrective action plans',
    ],
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    alt: 'Quality Assurance Readiness',
  },
  {
    id: 'ffe-procurement-asset-planning',
    title: 'FF&E Procurement & Asset Planning',
    description: 'Managing furniture, fixtures, and equipment selection, purchasing, budgeting, and installation coordination.',
    bullets: [
      'FF&E budget & spec development',
      'Vendor negotiation & order logistics',
      'Freight & warehousing coordination',
      'On-site installation supervision',
    ],
    icon: Package,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800',
    alt: 'FF&E Procurement & Asset Planning',
  },
  {
    id: 'brand-selection-planning-review',
    title: 'Brand Selection, Planning & Review',
    description: 'Evaluating brand opportunities, conducting feasibility reviews, and aligning hotel concepts with market and ownership goals.',
    bullets: [
      'Franchise agreement evaluation',
      'Market demand & brand match analysis',
      'PIP negotiation & feasibility studies',
      'Independent vs brand conversion strategy',
    ],
    icon: Star,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
    alt: 'Brand Selection, Planning & Review',
  },
  {
    id: 'hotel-pre-opening-services',
    title: 'Hotel Pre-Opening Services',
    description: 'Managing opening processes including staffing, systems implementation, SOP development, training, vendor coordination, and operational readiness.',
    bullets: [
      'Pre-opening critical path countdown',
      'PMS & tech stack implementation',
      'Pre-opening sales & marketing launch',
      'Dry-run testing & grand opening readiness',
    ],
    icon: Key,
    image: '/images/services-pre-opening.jpg',
    alt: 'Hotel Pre-Opening Services',
  },
  {
    id: 'hospitality-project-management',
    title: 'Hospitality Project Management',
    description: 'Leading multi-disciplinary projects involving renovations, conversions, operational improvements, and property transitions.',
    bullets: [
      'Project timeline & budget oversight',
      'Cross-functional team coordination',
      'Contractor & consultant management',
      'Risk mitigation & milestone tracking',
    ],
    icon: Briefcase,
    image: '/images/services-hotel-dev.jpg',
    alt: 'Hospitality Project Management',
  },
  {
    id: 'daily-rate-strategy-yield-management',
    title: 'Daily Rate Strategy & Yield Management',
    description: 'Executing dynamic pricing strategies based on demand, market conditions, occupancy trends, and competitive positioning.',
    bullets: [
      'Intraday rate adjustments & yield rules',
      'Length of stay (LOS) restrictions',
      'Special event rate maximization',
      'Cancellation & deposit policy strategy',
    ],
    icon: Target,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
    alt: 'Daily Rate Strategy & Yield Management',
  },
  {
    id: 'price-optimization',
    title: 'Price Optimization',
    description: 'Analyzing market data and performance metrics to maximize ADR, RevPAR, and overall revenue performance.',
    bullets: [
      'Price elasticity & demand curve modeling',
      'Comp set rate index (RGI) tracking',
      'Segment-level pricing strategies',
      'Total revenue per room (TRevPAR) focus',
    ],
    icon: Percent,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    alt: 'Price Optimization',
  },
  {
    id: 'daily-sales-performance-monitoring',
    title: 'Daily Sales Performance Monitoring',
    description: 'Tracking sales activities, pace reports, production goals, and revenue opportunities to drive business growth.',
    bullets: [
      'Daily pace & pickup reporting',
      'Sales team activity accountability',
      'Group & corporate lead conversion tracking',
      'Revenue strategy alignment checks',
    ],
    icon: Activity,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800',
    alt: 'Daily Sales Performance Monitoring',
  },
  {
    id: 'sales-marketing-strategy',
    title: 'Sales & Marketing Strategy',
    description: 'Developing corporate, group, leisure, and local market strategies to increase market share and strengthen brand presence.',
    bullets: [
      'Target segment sales plan creation',
      'Digital marketing & campaign oversight',
      'Local corporate account production',
      'Group & event sales strategy',
    ],
    icon: Megaphone,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    alt: 'Sales & Marketing Strategy',
  },
  {
    id: 'task-force-management',
    title: 'Task Force Management',
    description: 'Providing operational support, leadership, and turnaround solutions during transitions, openings, and performance improvement initiatives.',
    bullets: [
      'Interim General Manager & DOS placement',
      'Turnaround operational intervention',
      'Management transition stabilization',
      'Crisis leadership & rapid deployment',
    ],
    icon: UserPlus,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    alt: 'Task Force Management',
  },
  {
    id: 'competitive-benchmarking-market-analysis',
    title: 'Competitive Benchmarking & Market Analysis',
    description: 'Evaluating competitor performance, market trends, pricing strategies, and opportunities for revenue growth.',
    bullets: [
      'STR report deep-dive analysis',
      'Competitive set feature & rate audit',
      'Market supply & demand trends forecast',
      'Opportunity gap identification',
    ],
    icon: Search,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    alt: 'Competitive Benchmarking & Market Analysis',
    isCentered: true,
  },
];

export const ALaCarteServices: React.FC = () => {
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
    <section id="a-la-carte-services" className="services-section ala-carte-section">
      <div className="services-container">
        {/* Section Header for 02 A La Carte Services */}
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="services-badge">
            <span className="services-badge-text">
              <span style={{ color: '#041831', fontWeight: 800 }}>02</span> SERVICE
            </span>
            <span className="services-badge-diamond">✧</span>
          </div>

          <h2 className="services-main-heading">
            A La Carte Services
          </h2>

          <p className="services-main-description">
            Specialized, targeted hospitality solutions tailored for specific property, financial, operational, and strategic needs across 17 distinct service disciplines.
          </p>
        </motion.div>

        {/* Services Grid Cards */}
        <motion.div
          className="services-grid-cards ala-carte-grid-cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {aLaCarteServicesData.map((service) => {
            const ServiceIcon = service.icon;

            return (
              <motion.div
                key={service.id}
                id={service.id}
                className={`service-card-item ${service.isFeatured ? 'service-card-featured' : ''} ${service.isCentered ? 'service-card-centered-middle' : ''}`}
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

export default ALaCarteServices;
