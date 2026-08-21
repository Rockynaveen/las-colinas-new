import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { 
  TrendingUp, 
  Trophy, 
  GraduationCap, 
  DollarSign, 
  Users 
} from 'lucide-react';

interface CareerBenefitCard {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const careerBenefitsData: CareerBenefitCard[] = [
  {
    number: '01',
    title: 'Career Development',
    description: 'Build your expertise through meaningful responsibilities and opportunities for advancement.',
    icon: TrendingUp,
  },
  {
    number: '02',
    title: 'Leadership Opportunities',
    description: 'Take initiative, lead teams, and grow into leadership roles.',
    icon: Trophy,
  },
  {
    number: '03',
    title: 'Professional Training',
    description: 'Develop your hospitality skills through continuous learning and training.',
    icon: GraduationCap,
  },
  {
    number: '04',
    title: 'Competitive Compensation',
    description: 'Be recognized and rewarded for your contribution and performance.',
    icon: DollarSign,
  },
  {
    number: '05',
    title: 'Collaborative Culture',
    description: 'Work alongside passionate professionals who value teamwork and shared success.',
    icon: Users,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const CareersBenefits: React.FC = () => {
  return (
    <section className="careers-benefits-grid-section">
      <div className="careers-inner-container">
        
        <div className="careers-benefits-header">
          <div className="careers-intro-eyebrow">
            <span>WHY JOIN US</span>
          </div>
          
          <h2 className="careers-benefits-main-title">
            More Than a Job. A Career in Hospitality.
          </h2>
        </div>

        <motion.div 
          className="careers-benefits-5card-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {careerBenefitsData.map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.number}
                className="benefit-grid-card"
                variants={itemVariants}
              >
                <div className="benefit-card-top-row">
                  <span className="benefit-card-number">{item.number}</span>
                  <div className="benefit-card-icon-wrap">
                    <IconComponent size={20} className="benefit-card-icon" />
                  </div>
                </div>

                <h3 className="benefit-card-title">{item.title}</h3>
                <p className="benefit-card-desc">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default CareersBenefits;
