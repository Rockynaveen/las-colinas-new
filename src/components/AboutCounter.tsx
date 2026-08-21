import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

interface StatItem {
  target: number;
  suffix: string;
  label: string;
  duration?: number;
}

const CountUpNumber: React.FC<{ target: number; suffix: string; duration?: number }> = ({ 
  target, 
  suffix, 
  duration = 2 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setCount(target);
      return;
    }

    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutCubic = (x: number): number => {
      return 1 - Math.pow(1 - x, 3);
    };

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = easeOutCubic(progress);
      
      const currentVal = Math.floor(easedProgress * target);
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, target, duration, reduceMotion]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

export const AboutCounter: React.FC = () => {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.8, delay, ease }
  });

  const stats: StatItem[] = [
    { target: 2016, suffix: '', label: 'FOUNDED', duration: 2.2 },
    { target: 25, suffix: '+', label: 'HOTELS IN PORTFOLIO', duration: 2.0 },
    { target: 1800, suffix: '+', label: 'ROOMS UNDER MANAGEMENT', duration: 2.4 },
    { target: 98, suffix: '%', label: 'GUEST SATISFACTION', duration: 2.0 }
  ];

  return (
    <section className="about-counter-section">
      <div className="about-counter-container">
        <div className="about-counter-grid">
          {stats.map((stat, idx) => (
            <React.Fragment key={stat.label}>
              <motion.div 
                className="about-counter-item"
                {...fadeUp(idx * 0.1)}
              >
                <span className="about-counter-val">
                  <CountUpNumber target={stat.target} suffix={stat.suffix} duration={stat.duration} />
                </span>
                <span className="about-counter-label">{stat.label}</span>
              </motion.div>
              {idx < stats.length - 1 && (
                <div className="about-counter-divider" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutCounter;
