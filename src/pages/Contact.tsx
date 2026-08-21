import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Loader2, 
  Check 
} from 'lucide-react';


interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialFormState: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

const ease = [0.16, 1, 0.3, 1] as const;

export const Contact: React.FC = () => {
  const [form, setForm] = useState<FormData>(initialFormState);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const reduceMotion = useReducedMotion();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (status === 'error') setStatus('idle');
  };


  const handlePartnerCTA = () => {
    window.location.hash = '#home';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.email || !form.subject || !form.message) {
      setStatus('error');
      setErrorMsg('Please complete all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');

    setTimeout(() => {
      setStatus('success');
      setForm(initialFormState);
      setErrorMsg('');
    }, 1500);
  };

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.8, delay, ease }
  });

  return (
    <div className="contact-page-wrap">
      
      {/* 1. HERO SECTION (Dallas Skyline Banner) */}
      <section className="about-hero contact-hero-banner">
        <motion.img
          className="about-hero-image"
          src="/images/dallas-skyline.jpg"
          alt="Dallas skyline at sunset"
          initial={reduceMotion ? { scale: 1 } : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease }}
        />

        <div className="about-overlay" />

        <div className="about-content">
          <span className="about-label">CONTACT US</span>
          <h1 className="about-title">Let's Start a Partnership.</h1>
          <div className="gold-line" />
          <p className="about-desc">
            Have questions or want to explore how we can maximize your hotel's potential? Reach out to us today.
          </p>
        </div>
      </section>

      {/* 2. CONTACT DETAILS & MESSAGE FORM (Side by Side Layout) */}
      <section className="contact-main-section">
        <div className="contact-main-container">
          
          <div className="contact-grid-layout">
            
            {/* Left Column: Contact Details Stack */}
            <motion.div 
              className="contact-info-column"
              {...fadeUp(0.1)}
            >
              <span className="contact-info-eyebrow">Get in Touch</span>
              <div className="contact-info-eyebrow-diamond">◇</div>
              <h2 className="contact-info-main-title">We'd love to hear from you</h2>
              
              <div className="contact-info-cards-stack">
                
                {/* Detail 1: Office */}
                <div className="contact-info-stack-item">
                  <div className="contact-info-item-icon">
                    <MapPin size={18} />
                  </div>
                  <div className="contact-info-item-content">
                    <h4>Our Office</h4>
                    <p>
                      Las Colinas Hospitality Management LLC<br />
                      450 E. John Carpenter Freeway<br />
                      Irving, Texas 75062
                    </p>
                  </div>
                </div>

                {/* Detail 2: Phone */}
                <div className="contact-info-stack-item">
                  <div className="contact-info-item-icon">
                    <Phone size={18} />
                  </div>
                  <div className="contact-info-item-content">
                    <h4>Phone</h4>
                    <p>
                      <a href="tel:214-729-9676">214-729-9676</a><br />
                      <a href="tel:214-709-4231">214-709-4231</a>
                    </p>
                  </div>
                </div>

                {/* Detail 3: Email */}
                <div className="contact-info-stack-item">
                  <div className="contact-info-item-icon">
                    <Mail size={18} />
                  </div>
                  <div className="contact-info-item-content">
                    <h4>Email</h4>
                    <p>
                      <a href="mailto:info@lascolinasmanagement.com">info@lascolinasmanagement.com</a>
                    </p>
                  </div>
                </div>

                {/* Detail 4: Business Hours */}
                <div className="contact-info-stack-item">
                  <div className="contact-info-item-icon">
                    <Clock size={18} />
                  </div>
                  <div className="contact-info-item-content">
                    <h4>Business Hours</h4>
                    <p>
                      Monday – Friday: 9:00 AM – 6:00 PM<br />
                      Saturday – Sunday: By Appointment
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Right Column: Message Form */}
            <motion.div 
              className="contact-form-column"
              {...fadeUp(0.2)}
            >
              <span className="contact-form-eyebrow">Send Us a Message</span>
              <div className="contact-form-eyebrow-diamond">◇</div>
              
              <form onSubmit={handleSubmit} className="contact-message-form" noValidate>
                
                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <label htmlFor="firstName">First Name *</label>
                    <input 
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      disabled={status === 'submitting' || status === 'success'}
                      required
                    />
                  </div>
                  <div className="contact-form-field">
                    <label htmlFor="lastName">Last Name *</label>
                    <input 
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      disabled={status === 'submitting' || status === 'success'}
                      required
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <label htmlFor="email">Email Address *</label>
                    <input 
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      disabled={status === 'submitting' || status === 'success'}
                      required
                    />
                  </div>
                  <div className="contact-form-field">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      disabled={status === 'submitting' || status === 'success'}
                    />
                  </div>
                </div>

                <div className="contact-form-field">
                  <label htmlFor="subject">Subject *</label>
                  <select 
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    disabled={status === 'submitting' || status === 'success'}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="Hotel Management">Hotel Management Services</option>
                    <option value="Asset Management">Asset Management</option>
                    <option value="Hotel Development">Hotel Development & Advisory</option>
                    <option value="Consulting Services">Hospitality Consulting</option>
                    <option value="Other">Other Inquiry</option>
                  </select>
                </div>

                <div className="contact-form-field">
                  <label htmlFor="message">Your Message *</label>
                  <textarea 
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    disabled={status === 'submitting' || status === 'success'}
                    placeholder="Type your message here..."
                    required
                  />
                </div>

                <button 
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  className="contact-submit-btn"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>SENDING MESSAGE...</span>
                    </>
                  ) : status === 'success' ? (
                    <>
                      <Check size={16} />
                      <span>MESSAGE SENT</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <span className="contact-submit-arrow">→</span>
                    </>
                  )}
                </button>

                <AnimatePresence mode="wait">
                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="contact-feedback-msg error"
                    >
                      {errorMsg}
                    </motion.div>
                  )}
                  {status === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="contact-feedback-msg success"
                    >
                      Thank you. Your message has been sent successfully. Our team will contact you shortly.
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 4. OFFICE LOCATION MAP (Full Width Map) */}
      <section className="contact-office-map-section">
        <div className="contact-office-map-container">
          <iframe 
            src="https://maps.google.com/maps?q=450%20E%20John%20Carpenter%20Freeway,%20Irving,%20TX%2075062&t=&z=14&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Las Colinas Hospitality Management Office Location Map"
          />
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER (Beige background) */}
      <section className="contact-cta-section">
        <div className="contact-cta-container">
          <motion.div 
            className="contact-cta-card-new"
            {...fadeUp(0.1)}
          >
            <div className="contact-cta-left-content">
              <div className="contact-cta-icon-circle">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#B08C48" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="contact-cta-text-block">
                <h3 className="contact-cta-title">Ready to Maximize Your Asset's Potential?</h3>
                <p className="contact-cta-desc">
                  Partner with Las Colinas Hospitality Management and experience exceptional results, driven by expertise and a commitment to your success.
                </p>
              </div>
            </div>
            
            <button 
              onClick={handlePartnerCTA}
              className="contact-cta-button"
            >
              <span>PARTNER WITH US</span>
              <span className="contact-cta-btn-arrow">→</span>
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
