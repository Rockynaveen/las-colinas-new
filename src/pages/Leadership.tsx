import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

const featuredExecs: TeamMember[] = [
  {
    name: 'Nitin Tiwari',
    role: 'Chief Executive Officer',
    bio: 'Nitin possesses over 20 years of hospitality experience as a Sales Manager, GM, Regional Manager, and owner of multiple hotels. He holds an M.B.A. from the University of Sydney, Australia, with deep brand expertise across Hilton, IHG, Choice Hotels, Wyndham, and La Quinta.',
    initials: 'NT'
  },
  {
    name: 'Nandini Tiwari',
    role: 'President',
    bio: 'Nandini has over 20 years of hospitality experience, beginning her career in guest relations and advancing to General Manager. She oversees hotel development under LCHM, negotiating Property Improvement Plans (PIPs) and directing design, construction, and property openings.',
    initials: 'NT'
  }
];

const teamGrid: TeamMember[] = [
  {
    name: 'Manasa Sharma',
    role: 'Chief Financial Officer',
    bio: 'Manasa directs corporate financial planning, capital allocation, and underwriting strategies, aligning investor expectations with asset performance.',
    initials: 'MS'
  },
  {
    name: 'Jignesh Patel',
    role: 'Accounting Manager',
    bio: 'Jignesh manages LCHM\'s corporate accounting operations, auditing property financials, running accounts payable, and enforcing accounting standards.',
    initials: 'JP'
  },
  {
    name: 'Jimmy Munoz',
    role: 'Regional Operations Manager',
    bio: 'Jimmy oversees property operations, ensuring brand compliance, preventative maintenance execution, and high guest satisfaction scores.',
    initials: 'JM'
  },
  {
    name: 'Christa Wijendran',
    role: 'Regional Accounting & HR Manager',
    bio: 'Christa has 16+ years of finance and HR experience. She holds a BBA from Heriot-Watt University and a PG Business Analysis degree from Purdue.',
    initials: 'CW'
  }
];

export const Leadership: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="leadership" className="team-section">
      <div className="team-container">
        
        {/* Header */}
        <motion.div 
          className="team-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="team-heading">OUR TEAM</h2>
          <div className="team-heading-divider" />
        </motion.div>

        {/* Featured Executives */}
        <div className="team-executives">
          {featuredExecs.map((exec) => (
            <motion.div
              key={exec.name}
              className="exec-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Profile area crest placeholder */}
              <div className="profile-image-area">
                <span className="profile-avatar-crest">{exec.initials}</span>
                <div className="profile-overlay" />
                <svg viewBox="0 0 100 100" className="profile-crest-svg">
                  <polygon points="50,10 90,50 50,90 10,50" fill="none" />
                </svg>
              </div>
              <div className="exec-content">
                <h3 className="exec-name">{exec.name}</h3>
                <span className="exec-title">{exec.role}</span>
                <p className="exec-bio">{exec.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Standard Directors/Managers Grid */}
        <motion.div 
          className="team-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {teamGrid.map((member) => (
            <motion.div 
              key={member.name} 
              className="member-card"
              variants={cardVariants}
            >
              <div className="member-image-area">
                <span className="member-avatar-crest">{member.initials}</span>
                <svg viewBox="0 0 100 100" className="profile-crest-svg">
                  <polygon points="50,15 85,50 50,85 15,50" fill="none" />
                </svg>
              </div>
              <div className="member-content">
                <h4 className="member-name">{member.name}</h4>
                <span className="member-title">{member.role}</span>
                <p className="member-bio">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Leadership;
