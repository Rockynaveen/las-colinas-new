import React, { useState, useEffect } from 'react';

interface Section {
  id: string;
  num: string;
  name: string;
}

const sections: Section[] = [
  { id: 'about-overview', num: '01', name: 'OVERVIEW' },
  { id: 'story', num: '02', name: 'OUR STORY' },
  { id: 'vision', num: '03', name: 'VISION & MISSION' },
  { id: 'values', num: '04', name: 'CORE VALUES' },
  { id: 'advantage', num: '05', name: 'COMPETITIVE ADVANTAGE' },
  { id: 'team', num: '06', name: 'OUR TEAM' },
];

export const SectionNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('about-overview');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of header
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      window.history.pushState(null, '', `#${id === 'about-overview' ? 'about' : id}`);
    }
  };

  return (
    <>
      {/* Desktop Sticky Vertical Navigation */}
      <div className="sec-nav-vertical" aria-label="Table of Contents">
        <div className="sec-nav-vertical-inner">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={(e) => handleSectionClick(sec.id, e)}
                className={`sec-nav-item ${isActive ? 'active' : ''}`}
              >
                {/* Active Indicator dot */}
                <span className="sec-nav-item-dot" />
                
                {/* Text Label */}
                <span style={{ fontWeight: 650 }}>{sec.num}</span>
                <span>{sec.name}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Tablet/Mobile Sticky Horizontal Navigation */}
      <div className="sec-nav-horizontal">
        <div className="sec-nav-horizontal-inner">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={(e) => handleSectionClick(sec.id, e)}
                className={`sec-nav-horizontal-link ${isActive ? 'active' : ''}`}
              >
                {sec.num} {sec.name.split(' ')[0]}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SectionNavigation;
