import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { TeamModal } from './TeamModal';
import { teamMembers, type TeamMember } from '../../utils/teamData';

export const OurTeam: React.FC = () => {
  const N = teamMembers.length;
  const tripledMembers = [...teamMembers, ...teamMembers, ...teamMembers];
  
  const [currentIndex, setCurrentIndex] = useState(N);
  const [transitionDuration, setTransitionDuration] = useState(0.6);
  const [isHovered, setIsHovered] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const autoplayTimer = useRef<any>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (isHovered || isMoving || selectedMember) {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
      return;
    }

    autoplayTimer.current = setInterval(() => {
      handleNext();
    }, 4000);

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

  const handleAnimationComplete = () => {
    setIsMoving(false);
    
    if (currentIndex >= 2 * N) {
      setTransitionDuration(0);
      setCurrentIndex(currentIndex - N);
    } else if (currentIndex < N) {
      setTransitionDuration(0);
      setCurrentIndex(currentIndex + N);
    }
  };

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

  const displayIndex = ((currentIndex - N) % N + N) % N + 1;

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
          <h2 className="lchm-heading lchm-team-heading">
            OUR TEAM
          </h2>
          <p className="lchm-body" style={{ textAlign: 'center', maxWidth: '620px', color: '#3d4658' }}>
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
                    {/* Portrait Frame with gold ring */}
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
