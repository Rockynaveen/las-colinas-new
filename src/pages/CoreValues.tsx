import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  Lightbulb,
  Coins,
  Heart,
  Handshake,
  TrendingUp,
  Globe,
} from 'lucide-react';
import { SectionLabel } from '../components/About/SectionLabel';

interface ValueItem {
  id: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
}

const coreValues: ValueItem[] = [
  {
    id: 'excellence',
    title: 'Excellence',
    desc: 'We pursue excellence in every aspect of our business.',
    icon: Award,
  },
  {
    id: 'integrity',
    title: 'Integrity',
    desc: 'We build relationships through honesty, transparency, and accountability.',
    icon: ShieldCheck,
  },
  {
    id: 'innovation',
    title: 'Innovation',
    desc: 'We embrace forward-thinking strategies and continuous improvement.',
    icon: Lightbulb,
  },
  {
    id: 'stewardship',
    title: 'Stewardship',
    desc: 'We protect and enhance every asset entrusted to us.',
    icon: Coins,
  },
  {
    id: 'guest-service',
    title: 'Guest-Centered Service',
    desc: 'Exceptional hospitality begins with exceeding guest expectations.',
    icon: Heart,
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    desc: 'Strong partnerships drive long-term success.',
    icon: Handshake,
  },
  {
    id: 'growth-performance',
    title: 'Growth & Performance',
    desc: 'We create sustainable growth through disciplined execution.',
    icon: TrendingUp,
  },
  {
    id: 'community-impact',
    title: 'Community Impact',
    desc: 'We operate responsibly and contribute positively to the communities we serve.',
    icon: Globe,
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export const CoreValues: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="values" className="lchm-section lchm-section--navy">
      <div className="lchm-inner">
        <motion.div
          className="lchm-section-header-centered lchm-values-header"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
        >
          <SectionLabel number="04" label="CORE VALUES" tone="dark" />
        </motion.div>

        <div className="lchm-values-grid">
          {coreValues.map((value, idx) => {
            const Icon = value.icon;
            return (
              <motion.article
                key={value.id}
                className="lchm-value-card"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease }}
              >
                <div className="lchm-value-icon">
                  <Icon size={68} strokeWidth={1.4} />
                </div>
                <h3 className="lchm-value-title" style={{ color: '#B08C48' }}>{value.title}</h3>
                <p className="lchm-value-desc">{value.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
