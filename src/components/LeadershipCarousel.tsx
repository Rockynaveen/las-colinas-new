import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

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
    image: '/images/team/nandini_tiwari.jpg',
    description: 'Nandini has over 20 years of hospitality experience, beginning her career in guest relations and advancing to General Manager. She oversees hotel development under LCHM, negotiating Property Improvement Plans (PIPs) and directing design, construction, and property openings.',
    expertise: ['Property Development', 'PIP Negotiation', 'Construction Management', 'Hotel Openings', 'Brand Compliance']
  },
  {
    id: 'nitin-tiwari',
    name: 'Nitin Tiwari',
    role: 'Chief Executive Officer',
    image: '/images/team/nitin_tiwari.jpg',
    description: 'Nitin possesses over 20 years of hospitality experience as a Sales Manager, GM, Regional Manager, and owner of multiple hotels. He holds an M.B.A. from the University of Sydney, Australia, with deep brand expertise across Hilton, IHG, Choice Hotels, Wyndham, and La Quinta.',
    expertise: ['Executive Leadership', 'Strategic Planning', 'Brand Partnerships', 'Regional Management', 'Asset Portfolio Growth']
  },
  {
    id: 'jignesh-patel',
    name: 'Jignesh Patel',
    role: 'Accounting Manager',
    image: '/images/team/jignesh_patel.jpg',
    description: "Jignesh manages LCHM's corporate accounting operations, auditing property financials, running accounts payable, and enforcing accounting standards.",
    expertise: ['Accounting Operations', 'Financial Auditing', 'Accounts Payable', 'Regulatory Compliance', 'Standard Enforcement']
  },
  {
    id: 'manasa-sharma',
    name: 'Manasa Sharma',
    role: 'Chief Financial Officer',
    image: '/images/team/manasa_sharma.jpg',
    description: 'Manasa directs corporate financial planning, capital allocation, and underwriting strategies, aligning investor expectations with asset performance.',
    expertise: ['Corporate Finance', 'Underwriting Strategies', 'Capital Allocation', 'Asset Performance', 'Investor Relations']
  },
  {
    id: 'jimmy-munoz',
    name: 'Jimmy Munoz',
    role: 'Regional Operations Manager',
    image: '/images/team/jimmy_munoz.jpg',
    description: 'Jimmy oversees property operations, ensuring brand compliance, preventative maintenance execution, and high guest satisfaction scores.',
    expertise: ['Operations Management', 'Brand Compliance', 'Preventative Maintenance', 'Guest Satisfaction', 'Property Audits']
  },
  {
    id: 'christa-wijendran',
    name: 'Christa Wijendran',
    role: 'Regional Accounting & HR Manager',
    image: '/images/team/christa_wijendran.jpg',
    description: 'Christa has 16+ years of finance and HR experience. She holds a BBA from Heriot-Watt University and a PG Business Analysis degree from Purdue.',
    expertise: ['Human Resources', 'Finance Management', 'Business Analysis', 'Staffing & Recruitment', 'Employee Relations']
  },
  {
    id: 'tanmay-patel',
    name: 'Tanmay Patel',
    role: 'Acquisition Manager',
    image: '/images/team/tanmay_patel.jpg',
    description: 'Tanmay serves as Chief Hospitality Officer and Acquisition Manager, directing new property underwriting and serving on the AAHOA Board of Directors.',
    expertise: ['Property Acquisition', 'Asset Underwriting', 'AAHOA Relations', 'Hospitality Management', 'Market Expansion']
  },
  {
    id: 'shawn-patel',
    name: 'Shawn Patel',
    role: 'Regional Operational Manager of Hotel Operations',
    image: '/images/team/shawn_patel.jpg',
    description: 'Shawn leads operational execution across properties, drawing on years as a GM to implement practical staff training and guest-centered programs.',
    expertise: ['Hotel Operations', 'Staff Training', 'Guest-Centered Programs', 'Operational Execution', 'On-Property Leadership']
  },
  {
    id: 'laura-lewis',
    name: 'Laura Lewis',
    role: 'Regional Sales & Marketing',
    image: '/images/team/laura_lewis.jpg',
    description: 'Laura leads sales and marketing initiatives, holding over 20 years of history in group sales, revenue planning, and digital channels.',
    expertise: ['Sales & Marketing', 'Group Bookings', 'Revenue Planning', 'Digital Channels', 'Brand Positioning']
  },
  {
    id: 'diana-ortiz',
    name: 'Diana Ortiz',
    role: 'Director of Sales',
    image: '/images/team/diana_ortiz.jpg',
    description: 'Diana brings 38 years of hospitality sales experience and an MBA, directing corporate accounts and group bookings to capture market share.',
    expertise: ['Corporate Accounts', 'Group Sales', 'Market Share Capture', 'Strategic Sales', 'MBA Leadership']
  }
];

export const LeadershipCarousel: React.FC = () => {
  const N = teamMembers.length;
  // Duplicate array 3 times for infinite looping
  const tripledMembers = [...teamMembers, ...teamMembers, ...teamMembers];
  
  // Start index in the middle set
  const [currentIndex, setCurrentIndex] = useState(N);
  const [transitionDuration, setTransitionDuration] = useState(0.6);
  const [isHovered, setIsHovered] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  
  // Touch / Swipe states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const autoplayTimer = useRef<any>(null);

  // Selected member state for Modal
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedMember]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMember(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-play effect (paused when hover, moving, or modal is open)
  useEffect(() => {
    if (isHovered || isMoving || selectedMember) {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
      return;
    }

    autoplayTimer.current = setInterval(() => {
      handleNext();
    }, 4000); // Auto-play every 4 seconds

    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [isHovered, isMoving, currentIndex, selectedMember]);

  const handleNext = () => {
    if (isMoving) return;
    setIsMoving(true);
    setTransitionDuration(0.6);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isMoving) return;
    setIsMoving(true);
    setTransitionDuration(0.6);
    setCurrentIndex((prev) => prev - 1);
  };

  // On animation completion, handle bounds snap back to middle set
  const handleAnimationComplete = () => {
    setIsMoving(false);
    
    if (currentIndex >= 2 * N) {
      // Snap back to middle set (index N)
      setTransitionDuration(0);
      setCurrentIndex(currentIndex - N);
    } else if (currentIndex < N) {
      // Snap forward to middle set (index 2N - 1)
      setTransitionDuration(0);
      setCurrentIndex(currentIndex + N);
    }
  };

  // Touch handlers for swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  // Display page number (1-based index mapped to original N members)
  const displayIndex = ((currentIndex - N) % N + N) % N + 1;

  return (
    <section className="home-leadership-section">
      <div className="home-leadership-container">
        
        {/* Section Header */}
        <motion.div 
          className="editorial-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Centered Crest */}
          <div className="header-crest-wrapper">
            <div className="header-crest-line" />
            <div className="header-crest-icon">
              <svg viewBox="0 0 100 100" className="header-crest-svg-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,10 90,50 50,90 10,50" stroke="#B08C48" strokeWidth="5" />
                <polygon points="50,18 82,50 50,82 18,50" stroke="#B08C48" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                <path d="M50 24 L52.5 30 L58 30 L53.5 34.5 L55 40 L50 36.5 L45 40 L46.5 34.5 L42 30 L47.5 30 Z" fill="#B08C48" />
                <text x="50" y="66" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="28" fontWeight="700" fill="#B08C48" textAnchor="middle">LC</text>
                <path d="M 36 74 Q 50 80 64 74" stroke="#B08C48" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div className="header-crest-line" />
          </div>
 
          {/* Heading with large watermark background */}
          <div className="header-title-wrapper">
            <span className="section-small-label">OUR TEAM</span>
            <h2 className="editorial-heading">OUR TEAM</h2>
            <div className="header-watermark">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,6 94,50 50,94 6,50" stroke="#B08C48" strokeWidth="2" opacity="0.14" />
                <polygon points="50,14 86,50 50,86 14,50" stroke="#B08C48" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.08" />
                <path d="M50 20 L53 27 L60 27 L54 32 L56 39 L50 35 L44 39 L46 32 L40 27 L47 27 Z" fill="#B08C48" opacity="0.12" />
                <text x="50" y="66" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="30" fontWeight="700" fill="#B08C48" textAnchor="middle" opacity="0.12">LC</text>
                <path d="M 34 76 Q 50 83 66 76" stroke="#B08C48" strokeWidth="1.5" fill="none" opacity="0.12" />
              </svg>
            </div>
          </div>
 
          <p className="editorial-subtext">
            Our experienced professionals are dedicated to delivering excellence, innovation, and outstanding results for our clients.
          </p>
        </motion.div>
 
        {/* Carousel Component */}
        <div 
          className="team-carousel-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Carousel Track Area */}
          <div className="carousel-clip-area">
            <motion.div 
              className="carousel-cards-track"
              animate={{ 
                x: `calc(-${currentIndex} * (var(--card-width) + var(--card-gap)))` 
              }}
              transition={transitionDuration > 0 ? {
                type: "spring",
                stiffness: 140,
                damping: 24,
                restDelta: 0.01
              } : { duration: 0 }}
              onAnimationComplete={handleAnimationComplete}
            >
              {tripledMembers.map((member, idx) => (
                <div 
                  className={`team-card-container ${idx === currentIndex ? 'active-slide' : ''}`}
                  key={`${member.id}-${idx}`}
                >
                  <div 
                    className="team-pill-card"
                    onClick={() => setSelectedMember(member)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Portrait Frame with subtle border */}
                    <div className="portrait-frame">
                      <div className="portrait-image-wrapper">
                        <img 
                          src={member.image} 
                          alt={`${member.name} - ${member.role}`} 
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
                </div>
              ))}
            </motion.div>
          </div>
 
          {/* Navigation Controls (Centered at bottom) */}
          <div className="carousel-nav-controls">
            <button 
              className="carousel-nav-btn prev-btn" 
              onClick={handlePrev}
              aria-label="Previous Team Member"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            
            <div className="carousel-page-indicator">
              <span className="current-page">{displayIndex}</span>
              <span className="page-divider">/</span>
              <span className="total-pages">{N}</span>
            </div>
 
            <button 
              className="carousel-nav-btn next-btn" 
              onClick={handleNext}
              aria-label="Next Team Member"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
 
        </div>
 
        {/* CTA Button below Carousel */}
        <motion.div 
          className="leadership-cta-wrap"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a href="#leadership" className="btn-gold-subtle">
            <span>Meet Our Full Team</span>
            <ArrowRight size={15} />
          </a>
        </motion.div>
 
      </div>

      {/* Team Member Details Modal Overlay */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedMember && (
            <div className="team-modal-backdrop" onClick={() => setSelectedMember(null)}>
              <motion.div
                className="team-modal-content"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {/* Close Button */}
                <button 
                  className="team-modal-close" 
                  onClick={() => setSelectedMember(null)}
                  aria-label="Close details"
                >
                  &times;
                </button>

                <div className="team-modal-inner">
                  {/* Image Section */}
                  <div className="team-modal-image-wrap">
                    <img 
                      src={selectedMember.image} 
                      alt={selectedMember.name} 
                      className="team-modal-img" 
                    />
                  </div>

                  {/* Info Section */}
                  <div className="team-modal-info">
                    <div>
                      <h2 className="team-modal-name">{selectedMember.name}</h2>
                      <span className="team-modal-role">{selectedMember.role}</span>
                    </div>
                    
                    <div className="team-modal-section">
                      <h4 className="team-modal-section-title">Professional Overview</h4>
                      <p className="team-modal-desc">{selectedMember.description}</p>
                    </div>

                    <div className="team-modal-section">
                      <h4 className="team-modal-section-title">Key Expertise</h4>
                      <ul className="team-modal-expertise-list">
                        {selectedMember.expertise.map((exp, index) => (
                          <li key={index} className="team-modal-expertise-item">
                            • {exp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default LeadershipCarousel;
