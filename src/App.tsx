import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { VideoProvider } from './context/VideoContext';

// Pages
import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { Portfolio } from './pages/Portfolio';
import { Careers } from './pages/Careers';
import { Contact } from './pages/Contact';

// Styles
import './styles/index.css';
import './styles/header.css';
import './styles/hero.css';
import './styles/about.css';
import './styles/about-hero.css';
import './styles/our-story.css';
import './styles/vision-mission.css';
import './styles/services.css';
import './styles/core-values.css';
import './styles/competitive-advantage.css';
import './styles/leadership.css';
import './styles/leadership-carousel.css';
import './styles/home-cta.css';
import './styles/why-choose-us.css';
import './styles/services-page.css';
import './styles/portfolio.css';
import './styles/careers.css';
import './styles/contact.css';
import './styles/brand-marquee.css';
import './styles/footer.css';
import './styles/about-page.css';
import './styles/about-lchm.css';

const AppContent: React.FC = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');

  useEffect(() => {
    const isAboutHash = (h: string): boolean => {
      const clean = h.replace('#', '').toLowerCase();
      return (
        clean.startsWith('about') ||
        ['overview', 'story', 'vision', 'values', 'advantage', 'team', 'leadership'].some(k => clean.includes(k))
      );
    };

    const getAboutTargetId = (h: string): string => {
      const clean = h.replace('#', '').toLowerCase();
      if (clean === 'about' || clean === 'aboutus' || clean === 'about-us') return 'about-hero';
      if (clean.includes('overview')) return 'overview';
      if (clean.includes('story')) return 'story';
      if (clean.includes('vision') || clean.includes('mission')) return 'vision';
      if (clean.includes('values')) return 'values';
      if (clean.includes('advantage')) return 'advantage';
      if (clean.includes('team') || clean.includes('leadership')) return 'team';
      return clean;
    };

    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      setCurrentHash(hash);

      // Handle scrolling behaviors
      if (hash === '#home' || hash === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (isAboutHash(hash)) {
        // Allow time for the AboutPage component to mount/render before scrolling
        setTimeout(() => {
          const targetId = getAboutTargetId(hash);
          const el = document.getElementById(targetId) || (targetId === 'overview' ? document.getElementById('about-overview') : null);
          if (el) {
            const offset = 90; // Header height + 10px breathing room
            const targetPosition = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' });
          }
        }, 150);
      } else {
        window.scrollTo({ top: 0 });
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    // Check hash on mount
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isHome2Check = currentHash === '#home-2' || currentHash === '#home-page-2';
  const isHome3Check = currentHash === '#home-3' || currentHash === '#home-page-3';
  const isAboutCheck = currentHash.startsWith('#about') || ['#overview', '#story', '#vision', '#values', '#advantage', '#team', '#leadership'].some(k => currentHash.toLowerCase().includes(k));
  const isServicesHash = currentHash.startsWith('#services') || currentHash === '#a-la-carte-services';
  const isHomePage = !isAboutCheck && !isServicesHash && !['#portfolio', '#careers', '#contact'].includes(currentHash);

  const renderContent = () => {
    if (isAboutCheck) {
      return <AboutPage />;
    }

    if (isServicesHash) {
      return <ServicesPage currentHash={currentHash} />;
    }

    switch (currentHash) {
      case '#portfolio':
        return <Portfolio />;
      case '#careers':
        return <Careers />;
      case '#contact':
        return <Contact />;
      case '#home-2':
      case '#home-page-2':
        return <Home isHome2={true} />;
      case '#home-3':
      case '#home-page-3':
        return <Home isHome3={true} />;
      default:
        return <Home isHome2={false} />;
    }
  };

  // Dynamic Hero Background Image: Home 01 (/hero img.png) vs Home 02 (/hero dark  theme.png) vs Home 03 (/hero white theme.png)
  const heroImageSrc = isHome3Check
    ? '/hero white theme.png'
    : isHome2Check
      ? '/hero dark  theme.png'
      : '/hero img.png';

  const memoizedHeroImage = useMemo(() => (
    <img
      key={heroImageSrc}
      src={heroImageSrc}
      alt="Las Colinas Hospitality Hero Background"
      className="hero-fallback-image visible"
    />
  ), [heroImageSrc]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121F34] relative overflow-hidden font-sans light-theme">
      {/* Header positioned transparently or glassmorphic */}
      <Header />

      {/* Global persistent background video */}
      <div className={`global-hero-video-container ${isHomePage ? 'visible' : 'hidden'}`}>
        {memoizedHeroImage}
      </div>

      <main>
        {renderContent()}
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <VideoProvider>
      <AppContent />
    </VideoProvider>
  );
};

export default App;
