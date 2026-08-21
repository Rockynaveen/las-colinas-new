import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from './SectionLabel';
import { TeamModal } from './TeamModal';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  expertise: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: 'nandini-tiwari',
    name: 'Nandini Tiwari',
    role: 'President',
    image: '/images/portfolio/christa-wijendran–regiona-accounting-HR-manager-lchm.webp',
    description: 'Nandini has over 20 years of hospitality experience, beginning her career in guest relations and advancing to General Manager. She oversees hotel development under LCHM, negotiating Property Improvement Plans (PIPs) and directing design, construction, and property openings.',
    expertise: ['Property Development', 'PIP Negotiation', 'Construction Management', 'Hotel Openings', 'Brand Compliance']
  },
  {
    id: 'nitin-tiwari',
    name: 'Nitin Tiwari',
    role: 'Chief Executive Officer',
    image: '/images/portfolio/diana-ortiz-director-of-sales-lchm.webp',
    description: 'Nitin possesses over 20 years of hospitality experience as a Sales Manager, GM, Regional Manager, and owner of multiple hotels. He holds an M.B.A. from the University of Sydney, Australia, with deep brand expertise across Hilton, IHG, Choice Hotels, Wyndham, and La Quinta.',
    expertise: ['Executive Leadership', 'Strategic Planning', 'Brand Partnerships', 'Regional Management', 'Asset Portfolio Growth']
  },
  {
    id: 'manasa-sharma',
    name: 'Manasa Sharma',
    role: 'Chief Financial Officer',
    image: '/images/portfolio/image.png',
    description: 'Manasa directs corporate financial planning, capital allocation, and underwriting strategies, aligning investor expectations with asset performance.',
    expertise: ['Corporate Finance', 'Underwriting Strategies', 'Capital Allocation', 'Asset Performance', 'Investor Relations']
  },
  {
    id: 'jignesh-patel',
    name: 'Jignesh Patel',
    role: 'Accounting Manager',
    image: '/images/portfolio/image1.png',
    description: "Jignesh manages LCHM's corporate accounting operations, auditing property financials, running accounts payable, and enforcing accounting standards.",
    expertise: ['Accounting Operations', 'Financial Auditing', 'Accounts Payable', 'Regulatory Compliance', 'Standard Enforcement']
  },
  {
    id: 'jimmy-munoz',
    name: 'Jimmy Munoz',
    role: 'Regional Operations Manager',
    image: '/images/portfolio/image2.png',
    description: 'Jimmy oversees property operations, ensuring brand compliance, preventative maintenance execution, and high guest satisfaction scores.',
    expertise: ['Operations Management', 'Brand Compliance', 'Preventative Maintenance', 'Guest Satisfaction', 'Property Audits']
  },
  {
    id: 'christa-wijendran',
    name: 'Christa Wijendran',
    role: 'Regional Accounting & HR Manager',
    image: '/images/portfolio/image3.png',
    description: 'Christa has 16+ years of finance and HR experience. She holds a BBA from Heriot-Watt University and a PG Business Analysis degree from Purdue.',
    expertise: ['Human Resources', 'Finance Management', 'Business Analysis', 'Staffing & Recruitment', 'Employee Relations']
  }
];

export const OurTeam: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section id="team" className="lchm-section lchm-section--cream lchm-team">
      <div className="lchm-inner lchm-team-inner">
        {/* Header Block */}
        <motion.div
          className="lchm-team-header-wrapper"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <SectionLabel number="06" label="OUR TEAM" tone="light" />
          <h2 className="lchm-heading" style={{ color: '#0b132b', fontSize: '2.5rem', letterSpacing: '0.15em', marginTop: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
            O U R &nbsp; T E A M
          </h2>
          <p className="lchm-body" style={{ textAlign: 'center', maxWidth: '620px', color: '#3d4658' }}>
            Our experienced professionals are dedicated to delivering excellence, innovation, and outstanding results for our clients.
          </p>
        </motion.div>

        {/* Static Grid of Home-Page Style Team Cards (NO Carousel) */}
        <div className="about-team-static-grid">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="team-card-grid-item"
            >
              <div
                className="team-pill-card"
                onClick={() => setSelectedMember(member)}
                style={{ cursor: 'pointer', margin: 0, width: '100%' }}
              >
                {/* Portrait Frame with gold ring */}
                <div className="portrait-frame">
                  <div className="portrait-image-wrapper">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="portrait-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="gold-accent-ring" />
                </div>

                {/* Member Details */}
                <div className="member-info">
                  <h3 className="member-name-text">{member.name}</h3>
                  <p className="member-role-text">{member.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Member Details Modal */}
      <TeamModal
        isOpen={Boolean(selectedMember)}
        onClose={() => setSelectedMember(null)}
        member={selectedMember}
      />
    </section>
  );
};

export default OurTeam;
