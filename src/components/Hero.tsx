import React from 'react';
import { VideoBackground } from './VideoBackground';

interface HeroProps {
  isHome2?: boolean;
  isHome3?: boolean;
  isHome4?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isHome2, isHome3, isHome4 }) => {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const updateHeight = () => {
      if (sectionRef.current) {
        const height = sectionRef.current.offsetHeight;
        document.documentElement.style.setProperty('--hero-height', `${height}px`);
      }
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScrollClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Scroll down to the next section immediately below the hero (BrandMarquee, etc.)
    if (sectionRef.current) {
      const nextSection = sectionRef.current.nextElementSibling as HTMLElement | null;
      if (nextSection) {
        const offset = 70; // Header height
        const targetTop = nextSection.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: 'smooth'
        });
        return;
      }
      window.scrollTo({
        top: sectionRef.current.offsetHeight,
        behavior: 'smooth'
      });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className={`hero-section ${!isHome2 && !isHome3 && !isHome4 ? 'home-1-hero' : ''} ${isHome2 ? 'home-2-hero' : ''} ${isHome3 ? 'home-3-hero' : ''} ${isHome4 ? 'home-4-hero' : ''}`}>
      {/* Full-bleed Background Video + Subtle Overlay */}
      <VideoBackground isHome3={isHome3} />

      {/* Hero Bottom Mouse Scroll Indicator (Different per Home Page) */}
      {isHome4 ? (
        /* HOME 4: Metropolitan Skyline Glow Mouse Indicator */
        <button
          type="button"
          onClick={handleScrollClick}
          className="hero-mouse-indicator mouse-style-skyline"
          aria-label="Scroll down to explore Dallas-Fort Worth"
        >
          <div className="mouse-body-skyline">
            <div className="mouse-glow-orb" />
          </div>
          <div className="skyline-arrow-wrapper">
            <span className="skyline-chevron chevron-top" />
            <span className="skyline-chevron chevron-bot" />
          </div>
          <span className="mouse-scroll-text font-outfit">EXPLORE DFW</span>
        </button>
      ) : isHome2 ? (
        /* HOME 2: Executive Falling Arrow & Geometric Mouse (Inspired by Pullagantiramachandra XxPZZE) */
        <button
          type="button"
          onClick={handleScrollClick}
          className="hero-mouse-indicator mouse-style-falling"
          aria-label="Scroll down to explore"
        >
          <div className="mouse-body-falling">
            <div className="mouse-drop-line" />
          </div>
          <div className="falling-arrow-container">
            <span className="falling-arrow arrow-item-1" />
            <span className="falling-arrow arrow-item-2" />
          </div>
          <span className="mouse-scroll-text font-outfit">EXPLORE</span>
        </button>
      ) : isHome3 ? (
        /* HOME 3: Haute Editorial Floating Minimalist Mouse & Bouncing Arrow (Inspired by Jurbank WZovGE) */
        <button
          type="button"
          onClick={handleScrollClick}
          className="hero-mouse-indicator mouse-style-jurbank"
          aria-label="Scroll down to discover"
        >
          <div className="mouse-body-jurbank">
            <div className="mouse-track-dot" />
          </div>
          <div className="jurbank-arrow-wrapper">
            <span className="jurbank-chevron" />
          </div>
          <span className="mouse-scroll-text font-editorial">DISCOVER</span>
        </button>
      ) : (
        /* HOME 1: Classic Luxury Mouse & Cascading Chevrons (Inspired by Rightblog EagNMN) */
        <button
          type="button"
          onClick={handleScrollClick}
          className="hero-mouse-indicator mouse-style-rightblog"
          aria-label="Scroll down"
        >
          <div className="mouse-body-rightblog">
            <div className="mouse-wheel-rightblog" />
          </div>
          <div className="mouse-arrows-cascade">
            <span className="cascade-arrow arrow-unu" />
            <span className="cascade-arrow arrow-doi" />
            <span className="cascade-arrow arrow-trei" />
          </div>
          <span className="mouse-scroll-text font-sans">SCROLL DOWN</span>
        </button>
      )}
    </section>
  );
};


