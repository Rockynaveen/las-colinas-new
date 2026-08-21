import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
  shortBio?: string;
  description?: string;
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

  if (typeof document === 'undefined') return null;

  const fullBio = member?.bio || member?.description || member?.shortBio || '';
  const areasOfExpertise = member?.expertise || [];

  return createPortal(
    <AnimatePresence>
      {isOpen && member && (
        <div className="team-modal-backdrop" onClick={onClose}>
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
              onClick={onClose}
              aria-label="Close details"
              type="button"
            >
              &times;
            </button>

            <div className="team-modal-inner">
              {/* Image Section */}
              <div className="team-modal-image-wrap">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-modal-img"
                  loading="lazy"
                />
              </div>

              {/* Info Section */}
              <div className="team-modal-info">
                <div>
                  <h2 className="team-modal-name">{member.name}</h2>
                  <span className="team-modal-role">{member.role}</span>
                </div>

                <div className="team-modal-section">
                  <h4 className="team-modal-section-title">Professional Overview</h4>
                  <p className="team-modal-desc">{fullBio}</p>
                </div>

                {areasOfExpertise.length > 0 && (
                  <div className="team-modal-section">
                    <h4 className="team-modal-section-title">Key Expertise</h4>
                    <ul className="team-modal-expertise-list">
                      {areasOfExpertise.map((exp, index) => (
                        <li key={index} className="team-modal-expertise-item">
                          <span className="expertise-gold-bullet" aria-hidden="true" />
                          <span>{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default TeamModal;
