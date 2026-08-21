import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Hotel, UtensilsCrossed, Briefcase } from 'lucide-react';

interface CareerCategoryCard {
  title: string;
  subroles: string[];
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const careerCategoriesData: CareerCategoryCard[] = [
  {
    title: 'Hotel Operations',
    subroles: ['Front Office', 'Housekeeping', 'Engineering'],
    description: 'Lead daily guest experiences, front desk operations, housekeeping excellence, and facilities management.',
    icon: Hotel,
  },
  {
    title: 'Food & Beverage',
    subroles: ['Restaurants', 'Events', 'Guest Dining'],
    description: 'Deliver exceptional culinary experiences, restaurant operations, banquet events, and in-room dining.',
    icon: UtensilsCrossed,
  },
  {
    title: 'Corporate & Leadership',
    subroles: ['Management', 'Development', 'Finance', 'Administration'],
    description: 'Drive strategic growth, asset management, financial oversight, business development, and executive leadership.',
    icon: Briefcase,
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

export const CareersPathways: React.FC = () => {
  return (
    <section className="careers-categories-section">
      <div className="careers-inner-container">
        
        <div className="careers-categories-header">
          <div className="careers-intro-eyebrow">
            <span>CAREER PATHWAYS</span>
          </div>

          <h2 className="careers-categories-heading">
            Find Your Place in Hospitality
          </h2>

          <p className="careers-categories-subtext">
            From guest-facing roles to operational leadership, our teams work together to create successful hotels and exceptional guest experiences.
          </p>
        </div>

        <motion.div 
          className="careers-categories-3card-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {careerCategoriesData.map((cat, idx) => {
            const CategoryIcon = cat.icon;
            return (
              <motion.div
                key={idx}
                className="career-category-card"
                variants={itemVariants}
              >
                <div className="category-card-icon-badge">
                  <CategoryIcon size={26} />
                </div>

                <h3 className="category-card-title">{cat.title}</h3>

                <div className="category-card-subroles-wrap">
                  <span className="subroles-label">Key Areas:</span>
                  <div className="subroles-tags-row">
                    {cat.subroles.map((role, rIdx) => (
                      <span key={rIdx} className="subrole-tag">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default CareersPathways;
