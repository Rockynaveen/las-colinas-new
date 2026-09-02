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

const getNormalizedRoute = (): string => {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();

  // If hash is present (legacy or bookmarks), convert to clean path URL
  if (hash) {
    const cleanPath = '/' + hash;
    window.history.replaceState(null, '', cleanPath);
    return cleanPath;
  }

  return path.toLowerCase();
};

const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(getNormalizedRoute());

  useEffect(() => {
    const isAboutPath = (p: string): boolean => {
      const clean = p.replace(/^\//, '').toLowerCase();
      return (
        clean.startsWith('about') ||
        ['overview', 'story', 'vision', 'values', 'advantage', 'team', 'leadership'].some(k => clean.includes(k))
      );
    };

    const getAboutTargetId = (p: string): string => {
      const clean = p.replace(/^\//, '').toLowerCase();
      if (clean === 'about' || clean === 'aboutus' || clean === 'about-us') return 'about-hero';
      if (clean.includes('overview')) return 'overview';
      if (clean.includes('story')) return 'story';
      if (clean.includes('vision') || clean.includes('mission')) return 'vision';
      if (clean.includes('values')) return 'values';
      if (clean.includes('advantage')) return 'advantage';
      if (clean.includes('team') || clean.includes('leadership')) return 'team';
      return clean;
    };

    const handleLocationChange = () => {
      const route = getNormalizedRoute();
      setCurrentPath(route);

      // Handle scrolling behaviors
      if (route === '/' || route === '/home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (isAboutPath(route)) {
        setTimeout(() => {
          const targetId = getAboutTargetId(route);
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

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Handle internal relative paths starting with / or #
      if (href.startsWith('/') || href.startsWith('#')) {
        e.preventDefault();
        const cleanPath = href.startsWith('#') ? '/' + href.replace(/^#\/?/, '') : href;
        if (window.location.pathname !== cleanPath) {
          window.history.pushState(null, '', cleanPath);
          handleLocationChange();
        } else {
          handleLocationChange();
        }
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    document.addEventListener('click', handleAnchorClick);

    // Check path on mount
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const isHome2Check = currentPath === '/home-2' || currentPath === '/home-page-2';
  const isHome3Check = currentPath === '/home-3' || currentPath === '/home-page-3';
  const isAboutCheck = currentPath.startsWith('/about') || ['/overview', '/story', '/vision', '/values', '/advantage', '/team', '/leadership'].some(k => currentPath.includes(k));
  const isServicesPath = currentPath.startsWith('/services') || currentPath === '/a-la-carte-services' || currentPath === '/a-la-carte';
  const isHomePage = !isAboutCheck && !isServicesPath && !['/portfolio', '/careers', '/contact'].includes(currentPath);

  const renderContent = () => {
    if (isAboutCheck) {
      return <AboutPage />;
    }

    if (isServicesPath) {
      return <ServicesPage currentHash={currentPath} />;
    }

    switch (currentPath) {
      case '/portfolio':
        return <Portfolio />;
      case '/careers':
        return <Careers />;
      case '/contact':
        return <Contact />;
      case '/home-2':
      case '/home-page-2':
        return <Home isHome2={true} />;
      case '/home-3':
      case '/home-page-3':
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
      className={`hero-fallback-image visible ${isHome2Check ? 'home-2-hero-image' : ''} ${isHome3Check ? 'home-3-hero-image' : ''}`}
    />
  ), [heroImageSrc, isHome2Check, isHome3Check]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121F34] relative overflow-hidden font-sans light-theme">
      {/* Header positioned transparently or glassmorphic */}
      <Header />

      {/* Global persistent background video */}
      <div className={`global-hero-video-container ${isHomePage ? 'visible' : 'hidden'} ${isHome2Check ? 'home-2-bg' : ''} ${isHome3Check ? 'home-3-bg' : ''}`}>
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
