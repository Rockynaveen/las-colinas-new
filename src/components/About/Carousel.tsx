import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  items?: React.ReactNode[];
  images?: string[];
  autoplay?: boolean;
  intervalTime?: number; // 5000 default
  slidesToShow?: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
  transitionType?: 'slide' | 'fade';
  showArrows?: boolean;
  showDots?: boolean;
  showCounter?: boolean;
  accessibilityLabel?: string;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  images,
  autoplay = true,
  intervalTime = 5000,
  slidesToShow = { desktop: 1, tablet: 1, mobile: 1 },
  transitionType = 'slide',
  showArrows = true,
  showDots = true,
  showCounter = true,
  accessibilityLabel = 'Carousel',
  className = '',
}) => {
  const isImageOnly = !!images && !items;
  const slideList = isImageOnly ? (images || []) : (items || []);
  const N = slideList.length;

  // For infinite scroll of card list, we triple the items and start at index N
  const [currentIndex, setCurrentIndex] = useState(isImageOnly ? 0 : N);
  const [transitionDuration, setTransitionDuration] = useState(0.5);
  const [isHovered, setIsHovered] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const autoplayTimer = useRef<any>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [visibleSlides, setVisibleSlides] = useState(slidesToShow.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleSlides(slidesToShow.mobile);
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(slidesToShow.tablet);
      } else {
        setVisibleSlides(slidesToShow.desktop);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [slidesToShow]);

  const handleNext = useCallback(() => {
    if (isMoving) return;
    setIsMoving(true);
    setTransitionDuration(0.5);
    if (isImageOnly) {
      setCurrentIndex((prev) => (prev + 1) % N);
      setIsMoving(false);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [isMoving, N, isImageOnly]);

  const handlePrev = useCallback(() => {
    if (isMoving) return;
    setIsMoving(true);
    setTransitionDuration(0.5);
    if (isImageOnly) {
      setCurrentIndex((prev) => (prev - 1 + N) % N);
      setIsMoving(false);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [isMoving, N, isImageOnly]);

  const handleAnimationComplete = () => {
    setIsMoving(false);
    if (!isImageOnly) {
      if (currentIndex >= 2 * N) {
        setTransitionDuration(0);
        setCurrentIndex(currentIndex - N);
      } else if (currentIndex < N) {
        setTransitionDuration(0);
        setCurrentIndex(currentIndex + N);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isHovered) {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHovered, handleNext, handlePrev]);

  useEffect(() => {
    if (!autoplay || isHovered || isMoving) {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
      return;
    }
    autoplayTimer.current = setInterval(() => {
      handleNext();
    }, intervalTime);

    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [autoplay, isHovered, isMoving, intervalTime, handleNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  const goToSlide = (targetIndex: number) => {
    if (isMoving) return;
    setIsMoving(true);
    setTransitionDuration(0.5);
    if (isImageOnly) {
      setCurrentIndex(targetIndex);
      setIsMoving(false);
    } else {
      setCurrentIndex(N + targetIndex);
    }
  };

  const displayIndex = isImageOnly 
    ? currentIndex 
    : ((currentIndex - N) % N + N) % N;

  const tripledItems = isImageOnly ? [] : [...slideList, ...slideList, ...slideList];

  return (
    <div 
      className={`about-carousel ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label={accessibilityLabel}
    >
      {isImageOnly ? (
        <div className="about-carousel-img-container">
          {transitionType === 'fade' ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                >
                  <img
                    src={images[currentIndex]}
                    alt={`${accessibilityLabel} - Slide ${currentIndex + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', overflow: 'hidden' }}>
              <motion.div
                style={{ display: 'flex', width: '100%', height: '100%', flexShrink: 0 }}
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              >
                {images.map((imgUrl, idx) => (
                  <div key={idx} style={{ width: '100%', height: '100%', flexShrink: 0, minWidth: '100%', position: 'relative' }}>
                    <img
                      src={imgUrl}
                      alt={`${accessibilityLabel} - Slide ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      ) : (
        <div className="about-carousel-track-wrapper" ref={trackRef}>
          <motion.div
            className="about-carousel-track"
            animate={{
              x: `calc(-${currentIndex} * 100% / ${visibleSlides})`
            }}
            transition={transitionDuration > 0 ? {
              type: 'spring',
              stiffness: 140,
              damping: 24,
              restDelta: 0.01
            } : { duration: 0 }}
            onAnimationComplete={handleAnimationComplete}
          >
            {tripledItems.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  width: `calc(100% / ${visibleSlides})`,
                  flexShrink: 0,
                }}
                className="carousel-slide-item"
              >
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {(showArrows || showDots || showCounter) && (
      <div className="carousel-controls-bar">
        {/* Left Arrow */}
        {showArrows && (
          <button
            onClick={handlePrev}
            className="carousel-arrow-btn prev"
            aria-label={`Previous slide`}
            type="button"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Counter Center */}
        {showCounter && (
          <div className="carousel-counter-indicator">
            {String(displayIndex + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
          </div>
        )}

        {/* Pagination Dots */}
        {showDots && (
          <div className="carousel-dots-wrapper">
            {slideList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={displayIndex === idx ? 'active' : ''}
                aria-label={`Go to slide ${idx + 1}`}
                type="button"
              />
            ))}
          </div>
        )}

        {/* Right Arrow */}
        {showArrows && (
          <button
            onClick={handleNext}
            className="carousel-arrow-btn next"
            aria-label={`Next slide`}
            type="button"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
      )}
    </div>
  );
};

export default Carousel;
