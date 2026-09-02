import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({ isOpen, onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(prev => (prev === menu ? null : menu));
  };

  const navItems = [
    {
      label: 'HOME',
      href: '/',
      submenu: [
        { label: 'Home 01', href: '/' },
        { label: 'Home 02', href: '/home-2' },
        { label: 'Home 03', href: '/home-3' }
      ]
    },
    {
      label: 'ABOUT US',
      href: '/aboutus',
      submenu: [
        { label: 'Overview', href: '/aboutus/overview' },
        { label: 'Our Story', href: '/aboutus/our-story' },
        { label: 'Vision & Mission', href: '/aboutus/vision-mission' },
        { label: 'Core Values', href: '/aboutus/core-values' },
        { label: 'Our Competitive Advantage', href: '/aboutus/competitive-advantage' },
        { label: 'Our Team', href: '/aboutus/our-team' }
      ]
    },
    {
      label: 'SERVICES',
      href: '/services',
      submenu: [
        { label: 'Hotel Management Services', href: '/services/hotel-management' },
        { label: 'A La Carte Services', href: '/services/a-la-carte' }
      ]
    },
    { label: 'PORTFOLIO', href: '/portfolio' },
    { label: 'CAREERS', href: '/careers' },
    { label: 'CONTACT US', href: '/contact' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="mobile-drawer-overlay"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="mobile-drawer"
          >
            {/* Drawer Header */}
            <div className="mobile-drawer-header">
              <Logo />
              <button
                onClick={onClose}
                className="mobile-menu-btn"
                aria-label="Close navigation menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Menu Links */}
            <ul className="mobile-nav-list">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(item.label)}
                        className={`mobile-nav-link ${openSubmenu === item.label ? 'active' : ''}`}
                        style={{ width: '100%', cursor: 'pointer', background: 'none', border: 'none', textAlign: 'left' }}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={15}
                          style={{
                            transform: openSubmenu === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.25s ease'
                          }}
                        />
                      </button>
                      {openSubmenu === item.label && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mobile-sub-list"
                        >
                          {item.submenu.map((sub) => (
                            <li key={sub.label}>
                              <a href={sub.href} className="mobile-sub-link" onClick={onClose}>
                                {sub.label}
                              </a>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="mobile-nav-link"
                      onClick={onClose}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* Drawer CTAs */}
            <div className="mobile-cta-wrap">
              <a href="#contact" className="btn-gold" style={{ width: '100%' }} onClick={onClose}>
                <span>Partner With Us</span>
                <ArrowRight size={15} />
              </a>
              <a href="#contact" className="btn-secondary" style={{ width: '100%' }} onClick={onClose}>
                <span>Schedule Consultation</span>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNavDrawer;
