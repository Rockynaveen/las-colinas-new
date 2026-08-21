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
} from 'lucide-react';
import { SectionLabel } from './SectionLabel';

const coreServices = [
  { name: 'Hotel Management', icon: Hotel },
  { name: 'Hotel Development', icon: Landmark },
  { name: 'Asset Management', icon: ShieldCheck },
  { name: 'Hotel Investments', icon: FileText },
  { name: 'Revenue Management', icon: BarChart3 },
  { name: 'Financial & Accounting Services', icon: DollarSign },
  { name: 'Hotel Renovations', icon: Construction },
  { name: 'Pre-Opening Services', icon: Key },
  { name: 'Hospitality Consulting', icon: Briefcase },
];

const ease = [0.16, 1, 0.3, 1] as const;

export const AboutOverview: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="overview" className="lchm-section lchm-section--cream lchm-overview">
      <div className="lchm-inner">
        <div className="lchm-overview-grid">
          <motion.div
            className="lchm-overview-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease }}
          >
            <SectionLabel number="01" label="OVERVIEW" />
            <h2 className="lchm-heading lchm-overview-heading">
              About Las Colinas
              <br />
              Hospitality Management
            </h2>
            <p className="lchm-body">
              Founded in 2016, Las Colinas Hospitality Management has earned a reputation for operational excellence, financial discipline, and strategic hotel management. Our experienced leadership team combines deep hospitality expertise with a hands-on approach to delivering measurable results for owners and investors.
            </p>
            <p className="lchm-body">
              Whether developing a new hotel, repositioning an existing asset, or managing daily operations, we focus on maximizing profitability while delivering exceptional guest experiences.
            </p>
          </motion.div>

          <motion.div
            className="lchm-overview-photo"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: 0.06, ease }}
          >
            <div className="lchm-photo-frame lchm-overview-frame">
              <img
                src="/images/orlando-skyline.png"
                alt="Orlando skyline and Lake Eola fountain"
                className="lchm-photo"
              />
            </div>
          </motion.div>

          <motion.div
            className="lchm-services-col"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.12, ease }}
          >
            <h3 className="lchm-services-heading">OUR CORE SERVICES</h3>
            <ul className="lchm-services-list">
              {coreServices.map((service) => {
                const Icon = service.icon;
                return (
                  <li key={service.name} className="lchm-services-item">
                    <Icon size={32} strokeWidth={1.5} className="lchm-service-icon" />
                    <span>{service.name}</span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutOverview;
