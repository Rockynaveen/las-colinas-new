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
      const p = window.location.pathname.replace(/\/$/, '') || '/';
      const h = window.location.hash.replace(/^#\/?/, '');
      setCurrentHash(h ? '/' + h : p);
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
    window.addEventListener('popstate', handleHashChange);
    window.addEventListener('hashchange', handleHashChange);
    document.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleHashChange);
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const aboutList = [
    { name: 'Overview', hash: '/aboutus/overview' },
    { name: 'Our Story', hash: '/aboutus/our-story' },
    { name: 'Vision & Mission', hash: '/aboutus/vision-mission' },
    { name: 'Core Values', hash: '/aboutus/core-values' },
    { name: 'Our Competitive Advantage', hash: '/aboutus/competitive-advantage' },
    { name: 'Our Team', hash: '/aboutus/our-team' }
  ];

  const homeList = [
    { name: 'Home 01', hash: '/' },
    { name: 'Home 02', hash: '/home-2' },
    { name: 'Home 03', hash: '/home-3' },
    { name: 'Home 04', hash: '/home-4' }
  ];

  const isHomeActive = ['/', '/home', '/home-1', '/home-2', '/home-page-2', '/home-3', '/home-page-3', '/home-4', '/home-page-4', '#home', '#'].includes(currentHash);
  const isAboutHash = currentHash.includes('about') || ['overview', 'story', 'vision', 'values', 'advantage', 'team', 'leadership'].some(k => currentHash.toLowerCase().includes(k));
  const isServicesHash = currentHash.includes('services') || ['services', 'services-page', 'a-la-carte-services', 'a-la-carte'].some(k => currentHash.toLowerCase().includes(k));
  const hasHero = isAboutHash || isServicesHash || ['/', '/home', '/home-1', '/home-2', '/home-page-2', '/home-3', '/home-page-3', '/home-4', '/home-page-4', '/careers', '/contact', '/portfolio', '#home', '#'].includes(currentHash);

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
            {/* HOME Dropdown */}
            <div className="nav-dropdown-wrapper">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === 'home' ? null : 'home');
                }}
                className={`nav-item-link ${isHomeActive ? 'active' : ''}`}
              >
                HOME
                <ChevronDown size={12} style={{ opacity: 0.7 }} />
              </button>
              {activeDropdown === 'home' && (
                <div className="dropdown-panel">
                  {homeList.map((item) => (
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

            {/* ABOUT US Dropdown */}
            <div className="nav-dropdown-wrapper">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === 'about' ? null : 'about');
                }}
                className={`nav-item-link ${isAboutHash ? 'active' : ''}`}
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
                className={`nav-item-link ${isServicesHash ? 'active' : ''}`}
              >
                SERVICES
                <ChevronDown size={12} style={{ opacity: 0.7 }} />
              </button>
              {activeDropdown === 'services' && (
                <div className="dropdown-panel">
                  <a
                    href="/services/hotel-management"
                    onClick={() => setActiveDropdown(null)}
                    className="dropdown-panel-link"
                  >
                    Hotel Management Services
                  </a>
                  <a
                    href="/services/a-la-carte"
                    onClick={() => setActiveDropdown(null)}
                    className="dropdown-panel-link"
                  >
                    A La Carte Services
                  </a>
                </div>
              )}
            </div>

            <a
              href="/portfolio"
              className={`nav-item-link ${currentHash.includes('portfolio') ? 'active' : ''}`}
            >
              PORTFOLIO
            </a>

            <a
              href="/careers"
              className={`nav-item-link ${currentHash.includes('careers') ? 'active' : ''}`}
            >
              CAREERS
            </a>

            <a
              href="/contact"
              className={`nav-item-link ${currentHash.includes('contact') ? 'active' : ''}`}
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
