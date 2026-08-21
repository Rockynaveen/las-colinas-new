import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Award,
  UserCheck,
  TrendingUp,
  ShieldCheck,
  Coins,
  Handshake,
  Check,
} from 'lucide-react';
import { SectionLabel } from '../components/About/SectionLabel';

interface AdvantageItem {
  id: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
}

const advantages: AdvantageItem[] = [
  {
    id: 'expertise',
    title: 'Proven Hospitality Expertise',
    desc: 'Our leadership team brings decades of experience managing premium branded and independent hotels across multiple markets.',
    icon: Award,
  },
  {
    id: 'owner-focused',
    title: 'Owner-Focused Management',
    desc: 'Every decision is guided by one objective: maximizing owner value through disciplined operations, financial transparency, and strategic planning.',
    icon: UserCheck,
  },
  {
    id: 'revenue-growth',
    title: 'Revenue Growth',
    desc: 'We leverage advanced revenue management strategies, digital marketing, sales initiatives, and market intelligence to increase occupancy, ADR, and RevPAR.',
    icon: TrendingUp,
  },
  {
    id: 'operational-excellence',
    title: 'Operational Excellence',
    desc: 'We implement best practices across hotel operations, quality assurance, staffing, and guest service to improve efficiency and profitability.',
    icon: ShieldCheck,
  },
  {
    id: 'financial-stewardship',
    title: 'Financial Stewardship',
    desc: 'Our comprehensive financial reporting, forecasting, budgeting, and cost-control strategies provide owners with complete visibility into asset performance.',
    icon: Coins,
  },
  {
    id: 'partnership',
    title: 'Personalized Partnership',
    desc: 'Unlike large corporate management companies, we provide responsive leadership, customized strategies, and direct access to our executive team.',
    icon: Handshake,
  },
];

const checkPillsRow1 = [
  'Increase Revenue',
  'Improve Profitability',
  'Protect Your Investment',
];

const checkPillsRow2 = [
  'Elevate Guest Satisfaction',
  'Build Long-Term Asset Value',
];

const ease = [0.16, 1, 0.3, 1] as const;

export const CompetitiveAdvantage: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="advantage" className="lchm-section lchm-section--cream lchm-adv-exact-section">
      <div className="lchm-inner">
        {/* Centered Section Header */}
        <motion.div
          className="lchm-adv-exact-header"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease }}
        >
          {/* Badge */}
          <SectionLabel number="05" label="OUR COMPETITIVE ADVANTAGE" tone="light" />

          {/* Two-Tone Title */}
          <h2 className="lchm-adv-exact-heading">
            <span className="heading-line-navy">We Deliver More Than</span>
            <span className="heading-line-gold">Hotel Management</span>
          </h2>

          {/* Subtext 1 */}
          <p className="lchm-adv-exact-subtext">
            At Las Colinas Hospitality Management, we become an extension of your ownership team.
          </p>

          {/* Checkmark Pills */}
          <div className="lchm-adv-pills-container">
            <div className="lchm-adv-pills-row">
              {checkPillsRow1.map((title) => (
                <div key={title} className="lchm-adv-pill-item">
                  <span className="pill-check-icon">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span className="pill-check-text">{title}</span>
                </div>
              ))}
            </div>
            <div className="lchm-adv-pills-row">
              {checkPillsRow2.map((title) => (
                <div key={title} className="lchm-adv-pill-item">
                  <span className="pill-check-icon">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span className="pill-check-text">{title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subtext 2 */}
          <p className="lchm-adv-exact-caption">
            Every strategy is tailored to your property's unique market, ownership objectives, and long-term vision.
          </p>
        </motion.div>

        {/* 6 Cards Grid (3 Columns x 2 Rows) */}
        <div className="lchm-adv-exact-grid">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <motion.article
                key={adv.id}
                className="lchm-adv-exact-card"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease }}
              >
                {/* Dark Navy Circle at Top Center */}
                <div className="lchm-adv-exact-icon-circle">
                  <Icon size={38} strokeWidth={1.5} />
                </div>
                <h3 className="lchm-adv-exact-title">{adv.title}</h3>
                <p className="lchm-adv-exact-desc">{adv.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CompetitiveAdvantage;
