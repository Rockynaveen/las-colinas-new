import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TeamModal } from './TeamModal';
import { LotusDeco } from './LotusDeco';
import { SectionLabel } from './SectionLabel';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  shortBio: string;
  expertise: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: 'nandini-tiwari',
    name: 'Nandini Tiwari',
    role: 'President',
    image: '/images/portfolio/christa-wijendran–regiona-accounting-HR-manager-lchm.webp',
    bio: 'Nandini has over 20 years of hospitality experience, beginning her career in guest relations and advancing to General Manager. She oversees hotel development under LCHM, negotiating Property Improvement Plans (PIPs) and directing design, construction, and property openings.',
    shortBio: 'Over 20 years of hospitality industry experience; brings visionary leadership and extensive expertise in hotel operations, development, and organizational growth.',
    expertise: ['Property Development', 'PIP Negotiation', 'Construction Management', 'Hotel Openings', 'Brand Compliance'],
  },
  {
    id: 'nitin-tiwari',
    name: 'Nitin Tiwari',
    role: 'Chief Executive Officer',
    image: '/images/portfolio/diana-ortiz-director-of-sales-lchm.webp',
    bio: 'Nitin possesses over 20 years of hospitality experience as a Sales Manager, GM, Regional Manager, and owner of multiple hotels. He holds an M.B.A. from the University of Sydney, Australia, with deep brand expertise across Hilton, IHG, Choice Hotels, Wyndham, and La Quinta.',
    shortBio: 'Provides strategic direction across hotel development, operations, asset management, and business growth, driving long-term value for owners and investors.',
    expertise: ['Executive Leadership', 'Strategic Planning', 'Brand Partnerships', 'Regional Management', 'Asset Portfolio Growth'],
  },
  {
    id: 'manasa-sharma',
    name: 'Manasa Sharma',
    role: 'Chief Financial Officer',
    image: '/images/portfolio/image.png',
    bio: 'Manasa directs corporate financial planning, capital allocation, and underwriting strategies, aligning investor expectations with asset performance.',
    shortBio: 'Leads financial strategy, budgeting, forecasting, and reporting to ensure sound financial performance and support long-term growth.',
    expertise: ['Corporate Finance', 'Underwriting Strategies', 'Capital Allocation', 'Asset Performance', 'Investor Relations'],
  },
  {
    id: 'jignesh-patel',
    name: 'Jignesh Patel',
    role: 'Accounting Manager',
    image: '/images/portfolio/image1.png',
    bio: "Jignesh manages LCHM's corporate accounting operations, auditing property financials, running accounts payable, and enforcing accounting standards.",
    shortBio: 'Manages corporate accounting operations, audits property financials, and enforces internal compliance and accounting standards.',
    expertise: ['Accounting Operations', 'Financial Auditing', 'Accounts Payable', 'Regulatory Compliance', 'Standard Enforcement'],
  },
  {
    id: 'jimmy-munoz',
    name: 'Jimmy Munoz',
    role: 'Regional Operations Manager',
    image: '/images/portfolio/image2.png',
    bio: 'Jimmy oversees property operations, ensuring brand compliance, preventative maintenance execution, and high guest satisfaction scores.',
    shortBio: 'Drives hotel performance, enhances guest satisfaction, and builds high-performing teams across multiple nationally recognized hotel brands.',
    expertise: ['Operations Management', 'Brand Compliance', 'Preventative Maintenance', 'Guest Satisfaction', 'Property Audits'],
  },
  {
    id: 'christa-wijendran',
    name: 'Christa Wijendran',
    role: 'Regional Accounting & HR Manager',
    image: '/images/portfolio/image3.png',
    bio: 'Christa has 16+ years of finance and HR experience. She holds a BBA from Heriot-Watt University and a PG Business Analysis degree from Purdue.',
    shortBio: 'Christa has 16+ years of finance and HR experience. She holds a BBA from Heriot-Watt University and a PG Business Analysis degree from Purdue.',
    expertise: ['Human Resources', 'Finance Management', 'Business Analysis', 'Staffing & Recruitment', 'Employee Relations'],
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export const OurTeam: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleOpenModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <section id="team" className="lchm-section lchm-section--navy lchm-team">
      <div className="lchm-inner lchm-team-inner">
        <motion.div
          className="lchm-team-header-wrapper"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <SectionLabel number="06" label="OUR TEAM" tone="dark" />
          <h2 className="lchm-heading" style={{ color: '#ffffff', marginTop: '0.75rem', marginBottom: '1.25rem' }}>
            Leadership & Management
          </h2>
          <img
            src="/images/team-header-ornament.png"
            alt="Divider Ornament"
            className="lchm-team-header-img"
            style={{ maxWidth: '360px', marginTop: '0.25rem' }}
          />
        </motion.div>

        <div className="lchm-team-grid">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              className="lchm-team-grid-item"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease }}
            >
              <button
                type="button"
                className="team-static-card-inner lchm-team-card"
                onClick={() => handleOpenModal(member)}
              >
                <div className="team-static-photo-wrap">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-static-photo"
                    loading="lazy"
                  />
                </div>
                <div className="team-static-card-details">
                  <h3 className="team-static-card-name">{member.name}</h3>
                  <p className="team-static-card-role">{member.role}</p>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <LotusDeco className="lchm-lotus lchm-lotus--team" />
      </div>

      <TeamModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        member={selectedMember}
      />
    </section>
  );
};

export default OurTeam;
