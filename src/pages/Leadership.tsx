import React from 'react';
import { motion, type Variants } from 'framer-motion';

import { teamMembers } from '../utils/teamData';

const featuredExecs = teamMembers.filter(m => m.id === 'nandini-tiwari' || m.id === 'nitin-tiwari');
const teamGrid = teamMembers.filter(m => m.id !== 'nandini-tiwari' && m.id !== 'nitin-tiwari');

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
              <div className="profile-image-area" style={{ overflow: 'hidden', borderRadius: '50%' }}>
                <img src={exec.image} alt={exec.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="exec-content">
                <h3 className="exec-name">{exec.name}</h3>
                <span className="exec-title">{exec.role}</span>
                <p className="exec-bio">{exec.description}</p>
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
              <div className="member-image-area" style={{ overflow: 'hidden', borderRadius: '50%' }}>
                <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="member-content">
                <h4 className="member-name">{member.name}</h4>
                <span className="member-title">{member.role}</span>
                <p className="member-bio">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Leadership;
