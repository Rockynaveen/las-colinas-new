import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Hotel,
  Landmark,
  ShieldCheck,
  FileText,
  BarChart3,
  DollarSign,
  Construction,
  Key,
  Briefcase,
  ArrowRight,
  Check,
} from 'lucide-react';

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}

const coreServices: ServiceCard[] = [
  {
    id: 'hotel-management',
    title: 'Hotel Management',
    description: 'Complete operational management focused on maximizing performance and guest satisfaction.',
    icon: Hotel,
  },
  {
    id: 'hotel-development',
    title: 'Hotel Development',
    description: 'From concept to opening, we develop hotels that are designed for success and long-term value.',
    icon: Landmark,
  },
  {
    id: 'asset-management',
    title: 'Asset Management',
    description: 'Strategic oversight to protect your investment and enhance asset value over time.',
    icon: ShieldCheck,
  },
  {
    id: 'hotel-investments',
    title: 'Hotel Investments',
    description: 'Selective investments in high-potential hospitality assets with strong risk-adjusted returns.',
    icon: FileText,
  },
  {
    id: 'revenue-management',
    title: 'Revenue Management',
    description: 'Data-driven strategies to optimize pricing, distribution, and revenue performance.',
    icon: BarChart3,
  },
  {
    id: 'financial-accounting',
    title: 'Financial & Accounting',
    description: 'Accurate reporting, budgeting, and financial analysis for informed decision-making.',
    icon: DollarSign,
  },
  {
    id: 'hotel-renovations',
    title: 'Hotel Renovations',
    description: 'Enhancing guest experience and property value through strategic renovations.',
    icon: Construction,
  },
  {
    id: 'pre-opening',
    title: 'Pre-Opening Services',
    description: 'Comprehensive planning and execution to ensure a smooth and successful hotel opening.',
    icon: Key,
  },
  {
    id: 'hospitality-consulting',
    title: 'Hospitality Consulting',
    description: 'Expert advisory services to solve challenges and unlock new opportunities.',
    icon: Briefcase,
  },
];

const benefits = [
  'Increase Revenue',
  'Improve Profitability',
  'Protect Your Investment',
  'Elevate Guest Satisfaction',
];

const ease = [0.16, 1, 0.3, 1] as const;

export const ServicesPage: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div id="services-page" className="svc-page">
      <section className="svc-hero" aria-labelledby="svc-hero-heading">
        <div className="svc-inner svc-hero-grid">
          <motion.div
            className="svc-hero-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="svc-eyebrow">
              <span className="svc-diamond" aria-hidden="true" />
              <span>OUR SERVICES</span>
            </div>
            <h1 id="svc-hero-heading" className="svc-hero-title">
              Comprehensive Hospitality Solutions That Deliver Results
            </h1>
            <p className="svc-hero-desc">
              From hotel operations and development to asset management and advisory services, we provide end-to-end solutions designed to maximize performance, profitability, and long-term value.
            </p>
            <a href="#contact" className="svc-btn svc-btn--navy">
              SCHEDULE A CONSULTATION
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </motion.div>

          <div className="svc-hero-visual">
            <svg className="svc-hero-curve" viewBox="0 0 90 520" preserveAspectRatio="none" aria-hidden="true">
              <path d="M90 0C28 90 18 250 90 520V0Z" fill="#c5a059" />
            </svg>
            <div className="svc-hero-photo">
              <img
                src="/images/about-hotel.jpg"
                alt="Luxury boutique hotel at dusk"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="svc-core" aria-labelledby="svc-core-heading">
        <div className="svc-inner">
          <div className="svc-core-header">
            <div className="svc-kicker">
              <span className="svc-kicker-line" aria-hidden="true" />
              <span className="svc-diamond" aria-hidden="true" />
              <span>WHAT WE DO</span>
              <span className="svc-diamond" aria-hidden="true" />
              <span className="svc-kicker-line" aria-hidden="true" />
            </div>
            <h2 id="svc-core-heading" className="svc-section-title">
              Our Core Services
            </h2>
            <p className="svc-section-sub">
              Tailored solutions across every stage of the hospitality lifecycle.
            </p>
          </div>

          <div className="svc-grid">
            {coreServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.id}
                  id={service.id}
                  className="svc-card"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.04, ease }}
                >
                  <div className="svc-card-icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="svc-card-title">{service.title}</h3>
                  <p className="svc-card-desc">{service.description}</p>
                  <a href="#contact" className="svc-card-link" aria-label={`Learn more about ${service.title}`}>
                    Learn More <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="svc-why" aria-labelledby="svc-why-heading">
        <div className="svc-inner svc-why-grid">
          <motion.div
            className="svc-why-photo"
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
          >
            <img
              src="/images/our-story-hotel.jpg"
              alt="Luxury hotel entrance at twilight"
            />
          </motion.div>

          <motion.div
            className="svc-why-copy"
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
          >
            <div className="svc-eyebrow">
              <span className="svc-diamond" aria-hidden="true" />
              <span>WHY CHOOSE US</span>
            </div>
            <h2 id="svc-why-heading" className="svc-section-title svc-section-title--left">
              More Than Hotel Management
            </h2>
            <p className="svc-why-text">
              At Las Colinas Hospitality Management, we become an extension of your ownership team.
            </p>
            <ul className="svc-benefits">
              {benefits.map((item) => (
                <li key={item}>
                  <span className="svc-benefit-check" aria-hidden="true">
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="#contact" className="svc-btn svc-btn--navy">
              PARTNER WITH US
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>

      <section className="svc-cta" aria-labelledby="svc-cta-heading">
        <div className="svc-inner svc-cta-row">
          <div className="svc-cta-copy">
            <div className="svc-eyebrow">
              <span className="svc-diamond" aria-hidden="true" />
            </div>
            <h2 id="svc-cta-heading" className="svc-section-title svc-section-title--left">
              Let's Build Success Together
            </h2>
            <p className="svc-cta-desc">
              Partner with Las Colinas Hospitality Management and unlock the full potential of your hospitality asset.
            </p>
          </div>
          <div className="svc-cta-actions">
            <a href="#contact" className="svc-btn svc-btn--navy">
              SCHEDULE A CONSULTATION
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#contact" className="svc-btn svc-btn--ghost">
              PARTNER WITH US
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
