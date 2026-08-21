import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
  description?: string; // fallback
  expertise?: string[];
  initials?: string;
}

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
}

export const TeamModal: React.FC<TeamModalProps> = ({ isOpen, onClose, member }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!member) return null;

  const fullBio = member.bio || member.description || '';
  const areasOfExpertise = member.expertise || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          {/* Backdrop Blur Overlay */}
          <motion.div
            className="tm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="tm-container"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="tm-close-btn"
              aria-label="Close profile modal"
              type="button"
            >
              <X size={22} />
            </button>

            {/* Scrollable Content */}
            <div className="tm-content-scroll">
              <div className="tm-layout">
                
                {/* Photo & Design Element */}
                <div className="tm-photo-col">
                  <div className="tm-photo-frame">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="tm-photo"
                        loading="lazy"
                      />
                    ) : (
                      <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#F5F2EA', fontSize: '1.5rem', fontFamily: 'var(--font-serif)' }}>
                        {member.initials}
                      </div>
                    )}
                  </div>
                  {/* Premium gold underline */}
                  <div className="tm-photo-line" />
                </div>

                {/* Info & Content */}
                <div className="tm-info-col">
                  <div className="tm-header-block">
                    <h2 className="tm-name">
                      {member.name}
                    </h2>
                    <span className="tm-role">
                      {member.role}
                    </span>
                  </div>

                  {/* Bio */}
                  <div className="tm-section">
                    <h4 className="tm-section-title">
                      <Sparkles size={11} /> Biography
                    </h4>
                    <p className="tm-bio-text">
                      {fullBio}
                    </p>
                  </div>

                  {/* Areas of Expertise */}
                  {areasOfExpertise.length > 0 && (
                    <div className="tm-section">
                      <h4 className="tm-section-title">
                        <Sparkles size={11} /> Areas of Expertise
                      </h4>
                      <div className="tm-expertise-list">
                        {areasOfExpertise.map((exp, idx) => (
                          <span
                            key={idx}
                            className="tm-expertise-tag"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TeamModal;
