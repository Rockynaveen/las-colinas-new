import React, { useState, useEffect } from 'react';

interface Section {
  id: string;
  hash: string;
  num: string;
  name: string;
}

const sections: Section[] = [
  { id: 'overview', hash: 'aboutus/overview', num: '01', name: 'OVERVIEW' },
  { id: 'story', hash: 'aboutus/our-story', num: '02', name: 'OUR STORY' },
  { id: 'vision', hash: 'aboutus/vision-mission', num: '03', name: 'VISION & MISSION' },
  { id: 'values', hash: 'aboutus/core-values', num: '04', name: 'CORE VALUES' },
  { id: 'advantage', hash: 'aboutus/competitive-advantage', num: '05', name: 'COMPETITIVE ADVANTAGE' },
  { id: 'team', hash: 'aboutus/our-team', num: '06', name: 'OUR TEAM' },
];

export const SectionNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section.id) || (section.id === 'overview' ? document.getElementById('about-overview') : null);
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

  const handleSectionClick = (sec: Section, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(sec.id) || (sec.id === 'overview' ? document.getElementById('about-overview') : null);
    if (el) {
      const offset = 90; // height of header + 10px breathing room
      const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
      window.scrollTo({ top, behavior: 'smooth' });
      window.history.pushState(null, '', `#${sec.hash}`);
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
                href={`#${sec.hash}`}
                onClick={(e) => handleSectionClick(sec, e)}
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
                href={`#${sec.hash}`}
                onClick={(e) => handleSectionClick(sec, e)}
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
