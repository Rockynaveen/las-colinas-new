import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Loader2, 
  Check,
  Send,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import { ServicesHero } from '../components/ServicesHero';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormState: FormData = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

const ease = [0.16, 1, 0.3, 1] as const;

export const Contact: React.FC = () => {
  const [form, setForm] = useState<FormData>(initialFormState);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const reduceMotion = useReducedMotion();

  // Prevent background scroll when success popup modal is open
  useEffect(() => {
    if (status === 'success') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
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
      
      {/* 1. HERO BANNER */}
      <ServicesHero
        label="CONTACT US"
        heading="Get In Touch With Las Colinas"
        subtext="Have questions or want to explore how Las Colinas Hospitality Management can elevate your hotel asset? Reach out to our executive team today."
      />

      {/* 2. GET IN TOUCH SECTION HEADER + ALTERNATING 4 INFO CARDS */}
      <section className="contact-info-cards-section">
        <div className="contact-cards-container">
          
          {/* Section Header */}
          <motion.div className="contact-section-header" {...fadeUp(0.05)}>
            <span className="contact-script-eyebrow">Contact Us</span>
            <h2 className="contact-main-heading">Get In Touch With Las Colinas</h2>
            <p className="contact-sub-heading">
              Have questions or want to explore how Las Colinas Hospitality Management can elevate your hotel asset? Reach out to our executive team today.
            </p>
          </motion.div>

          {/* 4 Alternating Info Cards Grid */}
          <motion.div className="contact-info-grid-4" {...fadeUp(0.15)}>
            
            {/* Card 1: White */}
            <div className="contact-card-item contact-card--light">
              <div className="contact-card-icon-wrap">
                <MapPin size={42} strokeWidth={1.5} />
              </div>
              <h3 className="contact-card-title">Our Location</h3>
              <p className="contact-card-desc">
                450 E. John Carpenter Freeway<br />
                Irving, Texas 75062
              </p>
            </div>

            {/* Card 2: White */}
            <div className="contact-card-item contact-card--light">
              <div className="contact-card-icon-wrap">
                <Phone size={42} strokeWidth={1.5} />
              </div>
              <h3 className="contact-card-title">Phone Number</h3>
              <p className="contact-card-desc">
                <a href="tel:214-729-9676">+1 (214) 729-9676</a><br />
                <a href="tel:214-709-4231">+1 (214) 709-4231</a>
              </p>
            </div>

            {/* Card 3: White */}
            <div className="contact-card-item contact-card--light">
              <div className="contact-card-icon-wrap">
                <Mail size={42} strokeWidth={1.5} />
              </div>
              <h3 className="contact-card-title">Email Us</h3>
              <p className="contact-card-desc">
                <a href="mailto:info@lascolinasmanagement.com">info@lascolinasmanagement.com</a>
              </p>
            </div>

            {/* Card 4: White */}
            <div className="contact-card-item contact-card--light">
              <div className="contact-card-icon-wrap">
                <Clock size={42} strokeWidth={1.5} />
              </div>
              <h3 className="contact-card-title">Working Hours</h3>
              <p className="contact-card-desc">
                Mon - Fri: 8:00 AM - 6:00 PM<br />
                Sat - Sun: By Appointment
              </p>
            </div>

          </motion.div>

        </div>
      </section>

      {/* 3. SPLIT UNIFIED MAP + FORM CONTAINER SECTION */}
      <section className="contact-split-section">
        <div className="contact-split-container">
          
          <motion.div className="contact-split-card" {...fadeUp(0.2)}>
            
            {/* Left Side: Full Height Google Map */}
            <div className="contact-map-col">
              <iframe 
                src="https://maps.google.com/maps?q=450%20E%20John%20Carpenter%20Freeway,%20Irving,%20TX%2075062&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Las Colinas Office Location Map"
              />
            </div>

            {/* Right Side: Message Form */}
            <div className="contact-form-col">
              <div className="contact-form-header-block">
                <span className="contact-form-eyebrow">SEND US A MESSAGE</span>
                <h3 className="contact-form-heading">We'd Love to Hear From You</h3>
                <p className="contact-form-subtext">
                  Fill out the form below and our executive leadership team will respond promptly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="contact-travella-form" noValidate>
                
                <div className="contact-form-input-wrap">
                  <label htmlFor="name" className="contact-field-label">Full Name *</label>
                  <input 
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    disabled={status === 'submitting' || status === 'success'}
                    required
                  />
                </div>

                <div className="contact-form-input-wrap">
                  <label htmlFor="email" className="contact-field-label">Email Address *</label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    disabled={status === 'submitting' || status === 'success'}
                    required
                  />
                </div>

                <div className="contact-form-input-wrap">
                  <label htmlFor="subject" className="contact-field-label">Subject *</label>
                  <input 
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Enter subject / inquiry topic"
                    disabled={status === 'submitting' || status === 'success'}
                    required
                  />
                </div>

                <div className="contact-form-input-wrap">
                  <label htmlFor="message" className="contact-field-label">Your Message *</label>
                  <textarea 
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={4}
                    disabled={status === 'submitting' || status === 'success'}
                    required
                  />
                </div>

                <button 
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  className="contact-pill-submit-btn"
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
                      <Send size={15} />
                    </>
                  )}
                </button>

                <AnimatePresence mode="wait">
                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="contact-feedback-msg error"
                    >
                      <div className="contact-feedback-icon-wrap error">
                        <AlertCircle size={20} />
                      </div>
                      <div className="contact-feedback-content">
                        <h5 className="contact-feedback-title">Submission Error</h5>
                        <p className="contact-feedback-desc">{errorMsg}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </div>

          </motion.div>

        </div>
      </section>

      {/* SUCCESS POPUP MODAL */}
      {ReactDOM.createPortal(
        <AnimatePresence>
          {status === 'success' && (
            <div className="contact-modal-backdrop" onClick={() => setStatus('idle')}>
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="contact-modal-panel"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="contact-modal-close-btn"
                  onClick={() => setStatus('idle')}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>

                <div className="contact-modal-content">
                  <div className="contact-modal-icon-ring">
                    <CheckCircle2 size={44} className="contact-modal-check-icon" />
                  </div>
                  <span className="contact-modal-eyebrow">MESSAGE RECEIVED</span>
                  <h3 className="contact-modal-title">Thank You!</h3>
                  <p className="contact-modal-desc">
                    Your message has been sent successfully. Our executive team has received your inquiry and will reach out to you shortly.
                  </p>
                  <button
                    type="button"
                    className="contact-modal-action-btn"
                    onClick={() => setStatus('idle')}
                  >
                    <span>CLOSE WINDOW</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </div>
  );
};

export default Contact;
