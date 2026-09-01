import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, MapPin, Phone, Mail, CheckCircle2, X } from 'lucide-react';
import { Logo } from './Logo';
import { subscriberService } from '../services/subscriberService';
import { portfolioService, type PortfolioResource } from '../services/portfolioService';

interface RecentPortfolioItem {
  id: string | number;
  title: string;
  location: string;
  image: string;
  link?: string;
}

const defaultBlogPosts: RecentPortfolioItem[] = [
  {
    id: 1,
    image: '/images/portfolio-branded.jpg',
    title: 'LUXURY RESORTS',
    location: 'Dallas, Texas, USA',
    link: '#portfolio'
  },
  {
    id: 2,
    image: '/images/portfolio-select.jpg',
    title: 'BUSINESS HOTELS',
    location: 'Miami, Florida, USA',
    link: '#portfolio'
  },
  {
    id: 3,
    image: '/images/portfolio-extended.jpg',
    title: 'BOUTIQUE HOTELS',
    location: 'Austin, Texas, USA',
    link: '#portfolio'
  }
];

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [portfolioItems, setPortfolioItems] = useState<RecentPortfolioItem[]>(defaultBlogPosts);

  useEffect(() => {
    let isMounted = true;
    const fetchRecentPortfolio = async () => {
      try {
        const res = await portfolioService.getPortfolios();
        if (isMounted && res.success && Array.isArray(res.data) && res.data.length > 0) {
          const mapped: RecentPortfolioItem[] = res.data.slice(0, 3).map((item: PortfolioResource, index: number) => {
            const fallbackImg = defaultBlogPosts[index % defaultBlogPosts.length].image;
            return {
              id: item.id,
              title: (item.heading || item.name || item.title || 'PORTFOLIO PROPERTY').toUpperCase(),
              location: item.location_name || item.location || '',
              image: item.image || item.image_url || fallbackImg,
              link: item.link || '#portfolio',
            };
          });
          setPortfolioItems(mapped);
        }
      } catch (err) {
        console.error('Failed to fetch recent portfolio for footer:', err);
      }
    };

    fetchRecentPortfolio();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simple validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await subscriberService.subscribe(email.trim());

      if (res.success) {
        setStatus('success');
        setEmail('');
        setErrorMessage('');
      } else {
        setStatus('error');
        setErrorMessage(res.message || 'Subscription failed. Please try again.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage('Subscription failed. Please try again.');
    }
  };

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Careers', href: '#careers' },
    { label: 'Contact Us', href: '#contact' },
  ];

  const servicesLinks = [
    { label: 'Hotel Management Services', href: '#services/hotel-management' },
    { label: 'A La Carte Services', href: '#services/a-la-carte' },
  ];

  return (
    <footer className="site-footer">
      {/* Dynamic Watermark Background */}
      <div className="footer-watermark-bg" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,6 94,50 50,94 6,50" stroke="#B08C48" strokeWidth="1" opacity="0.3" />
          <polygon points="50,14 86,50 50,86 14,50" stroke="#B08C48" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.2" />
          <text x="50" y="62" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="22" fontWeight="700" fill="#B08C48" textAnchor="middle" opacity="0.4">LC</text>
        </svg>
      </div>

      <div className="footer-top-accent">
        <div className="gold-divider" />
      </div>

      <div className="footer-container">
        {/* Top Section: Branding & Newsletter */}
        <div className="footer-top-grid">
          <div className="footer-brand-column">
            <Logo className="footer-logo" />
            <p className="footer-brand-desc">
              Operational excellence, strategic hotel development, and disciplined asset management for luxury, boutique, and branded properties.
            </p>
          </div>

          <div className="footer-newsletter-column">
            <h3 className="newsletter-heading">SUBSCRIBE TO OUR INSIGHTS</h3>
            <p className="newsletter-desc">
              Curated perspectives on luxury hospitality performance, asset optimization, and industry trends.
            </p>

            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="newsletter-input-container">
                <input
                  type="email"
                  placeholder="Your professional email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  disabled={status === 'submitting' || status === 'success'}
                  className={`newsletter-input ${status === 'error' ? 'has-error' : ''}`}
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  className="newsletter-submit-btn"
                  aria-label="Subscribe"
                >
                  {status === 'submitting' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="loading-spinner"
                    />
                  ) : status === 'success' ? (
                    <Check size={16} className="text-gold" />
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="newsletter-error-msg"
                  >
                    {errorMessage}
                  </motion.p>
                )}
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="newsletter-success-msg"
                  >
                    Subscription confirmed. Welcome to our network.
                  </motion.p>
                )}
              </AnimatePresence>

            </form>
          </div>
        </div>

        {/* Middle Section: Main Navigation Grid */}
        <div className="footer-links-grid">
          {/* Quick Links Column */}
          <div className="footer-links-column">
            <h4 className="column-title">NAVIGATION</h4>
            <ul className="links-list">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="footer-links-column">
            <h4 className="column-title">SERVICES</h4>
            <ul className="links-list">
              {servicesLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Blog Posts Column */}
          <div className="footer-links-column">
            <h4 className="column-title">RECENT PORTFOLIO</h4>
            <div className="footer-blog-list">
              {portfolioItems.map((post) => (
                <a
                  href={post.link || '#portfolio'}
                  target={post.link?.startsWith('http') ? '_blank' : undefined}
                  rel={post.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="footer-blog-post-link"
                  key={post.id}
                >
                  <div className="footer-blog-thumb-container">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="footer-blog-thumb"
                    />
                  </div>
                  <div className="footer-blog-info">
                    <span className="footer-blog-title">{post.title}</span>
                    <div className="footer-blog-meta">
                      {post.location && (
                        <div className="footer-blog-location">
                          <MapPin size={10} className="footer-blog-location-icon" />
                          <span className="footer-blog-location-text">{post.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          {/* Contact Details Column */}
          <div className="footer-links-column contact-column">
            <h4 className="column-title">CONTACT</h4>
            <div className="footer-contact-list">
              {/* Address */}
              <div className="footer-contact-item">
                <MapPin size={15} className="footer-contact-icon" />
                <div className="footer-contact-text">
                  <strong className="footer-contact-company">Las Colinas Hospitality Management</strong>
                  <span>450 E. John Carpenter Freeway</span>
                  <span>Irving, Texas 75062</span>
                </div>
              </div>

              {/* Phone */}
              <div className="footer-contact-item">
                <Phone size={15} className="footer-contact-icon" />
                <div className="footer-contact-text">
                  <a href="tel:214-729-9676" className="footer-contact-link">214-729-9676</a>
                  <a href="tel:214-709-4231" className="footer-contact-link">214-709-4231</a>
                </div>
              </div>

              {/* Email */}
              <div className="footer-contact-item">
                <Mail size={15} className="footer-contact-icon" />
                <div className="footer-contact-text">
                  <a href="mailto:info@lascolinasmanagement.com" className="footer-contact-link email-link">
                    info@lascolinasmanagement.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright, Legal, Socials */}
        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <p className="copyright-text">
              &copy; 2026 Las Colinas Hospitality Management. All Rights Reserved.
            </p>

            {/* Legal Links */}
            <div className="legal-links">
              <a href="#privacy" className="legal-link">Privacy Policy</a>
              <span className="legal-dot">&bull;</span>
              <a href="#terms" className="legal-link">Terms & Conditions</a>
              <span className="legal-dot">&bull;</span>
              <a href="#cookies" className="legal-link">Cookie Policy</a>
            </div>

            {/* Social Links */}
            <div className="social-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
                <svg fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram">
                <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width="16" height="16">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Facebook">
                <svg fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* LUXURY NEWSLETTER SUCCESS POPUP MODAL */}
      {typeof document !== 'undefined' && ReactDOM.createPortal(
        <AnimatePresence>
          {status === 'success' && (
            <div className="footer-modal-backdrop" onClick={() => setStatus('idle')}>
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="footer-modal-panel"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="footer-modal-close-btn"
                  onClick={() => setStatus('idle')}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>

                <div className="footer-modal-content">
                  <div className="footer-modal-icon-ring">
                    <CheckCircle2 size={42} className="footer-modal-check-icon" />
                  </div>
                  <span className="footer-modal-eyebrow">INSIGHTS SUBSCRIPTION</span>
                  <h3 className="footer-modal-title">Welcome to Our Network!</h3>
                  <p className="footer-modal-desc">
                    Thank you for subscribing to Las Colinas Hospitality Management. You will now receive our exclusive hospitality insights, market updates, and portfolio news.
                  </p>
                  <button
                    type="button"
                    className="footer-modal-action-btn"
                    onClick={() => setStatus('idle')}
                  >
                    <span>CONTINUE EXPLORING</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </footer>
  );
};

export default Footer;
