import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Award,
  UserCheck,
  TrendingUp,
  ShieldCheck,
  Coins,
  Handshake,
  BarChart3,
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

const metrics = [
  { title: 'Increase Revenue', icon: TrendingUp },
  { title: 'Improve Profitability', icon: BarChart3 },
  { title: 'Protect Your Investment', icon: ShieldCheck },
  { title: 'Elevate Guest Satisfaction', icon: Award },
  { title: 'Build Long-Term Asset Value', icon: Coins },
];

const ease = [0.16, 1, 0.3, 1] as const;

export const CompetitiveAdvantage: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="advantage" className="lchm-section lchm-section--cream">
      <div className="lchm-inner">
        <div className="lchm-adv-layout">
          <motion.div
            className="lchm-adv-copy"
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease }}
          >
            <SectionLabel number="05" label="OUR COMPETITIVE ADVANTAGE" />
            <h2 className="lchm-heading">
              We Deliver More Than Hotel Management
            </h2>
            <p className="lchm-body">
              At Las Colinas Hospitality Management, we become an extension of your ownership team.
            </p>
            <ul className="lchm-adv-checks">
              {metrics.map((metric) => (
                <li key={metric.title}>
                  <span className="lchm-adv-check">
                    <Check size={12} strokeWidth={2.4} />
                  </span>
                  {metric.title}
                </li>
              ))}
            </ul>
            <p className="lchm-body lchm-adv-caption">
              Every strategy is tailored to your property's unique market, ownership objectives, and long-term vision.
            </p>
          </motion.div>

          <div className="lchm-adv-grid">
            {advantages.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <motion.article
                  key={adv.id}
                  className="lchm-adv-card"
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.06, ease }}
                >
                  <div className="lchm-adv-icon">
                    <Icon size={38} strokeWidth={1.5} />
                  </div>
                  <h3 className="lchm-adv-title">{adv.title}</h3>
                  <p className="lchm-adv-desc">{adv.desc}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveAdvantage;
