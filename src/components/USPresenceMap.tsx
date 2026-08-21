import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Landmark, ShieldCheck } from 'lucide-react';

interface MapMarker {
  id: string;
  city: string;
  type: string;
  details: string;
  left: string;
  top: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const presenceMarkers: MapMarker[] = [
  {
    id: 'irving-hq',
    city: 'Irving, TX',
    type: 'Corporate Headquarters',
    details: '450 E. John Carpenter Freeway, Irving, TX 75062',
    left: '49.0%',
    top: '72.5%',
    icon: Building2
  },
  {
    id: 'orlando-office',
    city: 'Orlando, FL',
    type: 'Regional Operations Hub',
    details: 'Orlando Operations, Sales & Revenue Management',
    left: '81.3%',
    top: '79.2%',
    icon: Landmark
  },
  {
    id: 'dallas-ops',
    city: 'Dallas, TX',
    type: 'Core Management Market',
    details: 'Asset Management, Operations & Compliance Audits',
    left: '52.0%',
    top: '70.2%',
    icon: ShieldCheck
  },
  {
    id: 'miami-ops',
    city: 'Miami, FL',
    type: 'Key Florida Operations',
    details: 'Premium Branded & Extended-Stay Assets',
    left: '84.5%',
    top: '87.7%',
    icon: MapPin
  }
];

export const USPresenceMap: React.FC = () => {
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  return (
    <section className="us-presence-section">
      <div className="us-presence-container">
        
        {/* Section Header */}
        <div className="us-presence-header">
          <span className="us-presence-eyebrow">NATIONWIDE OPERATIONS</span>
          <h2 className="us-presence-title">Our Presence & Regional Hubs</h2>
          <div className="us-presence-divider" />
          <p className="us-presence-subtitle">
            Operating in major markets across the United States. Hover or tap on a hub to view regional management offices and key operations.
          </p>
        </div>

        {/* Interactive Map Layout Container */}
        <div className="us-map-layout-wrapper">
          <div className="us-map-inner-wrapper">
            
            {/* The SVG Map Image */}
            <img 
              src="/images/us-map.svg" 
              alt="United States Operations Map" 
              className="us-map-svg-base"
              draggable="false"
            />

            {/* Interactive Pulse Markers */}
            {presenceMarkers.map((marker) => {
              const IconComponent = marker.icon;
              const isHovered = hoveredMarker === marker.id;
              const isActive = activeMarker === marker.id;
              const showCard = isHovered || isActive;

              return (
                <div 
                  key={marker.id}
                  className="us-map-marker-container"
                  style={{ left: marker.left, top: marker.top }}
                  onMouseEnter={() => setHoveredMarker(marker.id)}
                  onMouseLeave={() => setHoveredMarker(null)}
                  onClick={() => setActiveMarker(activeMarker === marker.id ? null : marker.id)}
                >
                  {/* Pulse Animation Effect */}
                  <div className="us-marker-pulse-ring" />
                  
                  {/* Actual Marker Pin */}
                  <button 
                    type="button" 
                    className={`us-marker-pin-btn ${showCard ? 'active' : ''}`}
                    aria-label={`View details for ${marker.city}`}
                  >
                    <MapPin size={18} strokeWidth={2.2} />
                  </button>

                  {/* Tooltip Card Overlay */}
                  <AnimatePresence>
                    {showCard && (
                      <motion.div 
                        className="us-marker-tooltip-card"
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="us-tooltip-header">
                          <IconComponent className="us-tooltip-icon" size={16} />
                          <span className="us-tooltip-type">{marker.type}</span>
                        </div>
                        <h4 className="us-tooltip-city">{marker.city}</h4>
                        <p className="us-tooltip-details">{marker.details}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
};

export default USPresenceMap;
