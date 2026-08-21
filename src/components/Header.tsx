import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Menu } from 'lucide-react';
import { Logo } from './Logo';
import { MobileNavDrawer } from './MobileNavDrawer';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20 || document.documentElement.scrollTop > 20 || document.body.scrollTop > 20;
      setIsScrolled(scrolled);
    };

    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#home');
    };

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.nav-dropdown-wrapper')) {
        setActiveDropdown(null);
      }
    };

    // Check initial scroll on load
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    document.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const servicesList = [
    { name: 'Hotel Management', hash: '#services' },
    { name: 'Asset Management', hash: '#services' },
    { name: 'Development & Acquisition', hash: '#services' },
    { name: 'Revenue Optimization', hash: '#services' }
  ];


  const aboutList = [
    { name: 'Overview', hash: '#overview' },
    { name: 'Our Story', hash: '#story' },
    { name: 'Vision & Mission', hash: '#vision' },
    { name: 'Core Values', hash: '#values' },
    { name: 'Our Competitive Advantage', hash: '#advantage' },
    { name: 'Our Team', hash: '#team' }
  ];

  const isHomeActive = ['#home', '#'].includes(currentHash);
  const hasHero = ['#home', '#', '#about', '#overview', '#story', '#vision', '#values', '#advantage', '#contact', '#portfolio'].includes(currentHash);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`site-header ${isScrolled || !hasHero ? 'scrolled' : ''}`}
      >
        <div className="header-inner">
          {/* Small Luxury Logo Left */}
          <Logo />

          {/* Minimal Navigation Center */}
          <nav className="desktop-nav-menu" aria-label="Main Navigation">
            <a 
              href="#home" 
              className={`nav-item-link ${isHomeActive && currentHash !== '#about' ? 'active' : ''}`}
            >
              HOME
            </a>

            {/* ABOUT US Dropdown */}
            <div className="nav-dropdown-wrapper">
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === 'about' ? null : 'about');
                }}
                className={`nav-item-link ${['#about', '#about-overview', '#overview', '#story', '#vision', '#values', '#advantage', '#team', '#leadership'].includes(currentHash) ? 'active' : ''}`}
              >
                ABOUT US
                <ChevronDown size={12} style={{ opacity: 0.7 }} />
              </button>
              {activeDropdown === 'about' && (
                <div className="dropdown-panel">
                  {aboutList.map((item) => (
                    <a 
                      key={item.name} 
                      href={item.hash} 
                      onClick={() => setActiveDropdown(null)}
                      className="dropdown-panel-link"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* SERVICES Dropdown */}
            <div className="nav-dropdown-wrapper">
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === 'services' ? null : 'services');
                }}
                className={`nav-item-link ${currentHash === '#services' ? 'active' : ''}`}
              >
                SERVICES
                <ChevronDown size={12} style={{ opacity: 0.7 }} />
              </button>
              {activeDropdown === 'services' && (
                <div className="dropdown-panel">
                  {servicesList.map((item) => (
                    <a 
                      key={item.name} 
                      href={item.hash} 
                      onClick={() => setActiveDropdown(null)}
                      className="dropdown-panel-link"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a 
              href="#portfolio" 
              className={`nav-item-link ${currentHash === '#portfolio' ? 'active' : ''}`}
            >
              PORTFOLIO
            </a>

            <a 
              href="#careers" 
              className={`nav-item-link ${currentHash === '#careers' ? 'active' : ''}`}
            >
              CAREERS
            </a>

            <a 
              href="#contact" 
              className={`nav-item-link ${currentHash === '#contact' ? 'active' : ''}`}
            >
              CONTACT US
            </a>
          </nav>



          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="mobile-menu-btn"
            aria-label="Open Navigation Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Navigation */}
      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;
