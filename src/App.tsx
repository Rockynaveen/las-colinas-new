import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { VideoProvider, useVideo } from './context/VideoContext';

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
import './styles/services-hero.css';
import './styles/portfolio.css';
import './styles/careers.css';
import './styles/contact.css';
import './styles/brand-marquee.css';
import './styles/footer.css';
import './styles/about-page.css';
import './styles/about-lchm.css';

const AppContent: React.FC = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');
  const { videoRef } = useVideo();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      setCurrentHash(hash);

      const aboutHashes = ['#about', '#overview', '#story', '#vision', '#values', '#advantage', '#team', '#leadership'];

      // Handle scrolling behaviors
      if (hash === '#home' || hash === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (aboutHashes.includes(hash)) {
        // Allow time for the AboutPage component to mount/render before scrolling
        setTimeout(() => {
          let targetId = hash.replace('#', '');
          if (hash === '#about') targetId = 'about-hero';
          if (hash === '#leadership') targetId = 'team';
          const el = document.getElementById(targetId);
          if (el) {
            const targetPosition = el.getBoundingClientRect().top + window.scrollY - 80;
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            const duration = 2000; // Slower speed (2.0 seconds) for elegant feel
            let startTime: number | null = null;

            const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
              t /= d / 2;
              if (t < 1) return (c / 2) * t * t * t + b;
              t -= 2;
              return (c / 2) * (t * t * t + 2) + b;
            };

            const animation = (currentTime: number) => {
              if (startTime === null) startTime = currentTime;
              const timeElapsed = currentTime - startTime;
              const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
              window.scrollTo(0, run);
              if (timeElapsed < duration) {
                requestAnimationFrame(animation);
              } else {
                window.scrollTo(0, targetPosition);
              }
            };

            requestAnimationFrame(animation);
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

  const renderContent = () => {
    switch (currentHash) {
      case '#about':
      case '#overview':
      case '#story':
      case '#vision':
      case '#values':
      case '#advantage':
      case '#team':
      case '#leadership':
        return <AboutPage />;
      case '#services':
        return <ServicesPage />;
      case '#portfolio':
        return <Portfolio />;
      case '#careers':
        return <Careers />;
      case '#contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  const isHomePage = !['#about', '#overview', '#story', '#vision', '#values', '#advantage', '#leadership', '#team', '#services', '#portfolio', '#careers', '#contact'].includes(currentHash);

  // Memoize the video tag so React never diffs it on state changes / re-renders
  const memoizedVideo = useMemo(() => (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className="hero-video"
    >
      Your browser does not support HTML5 video.
    </video>
  ), [videoRef]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121F34] relative overflow-hidden font-sans light-theme">
      {/* Header positioned transparently or glassmorphic */}
      <Header />

      {/* Global persistent background video */}
      <div className={`global-hero-video-container ${isHomePage ? 'visible' : 'hidden'}`}>
        {memoizedVideo}
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
