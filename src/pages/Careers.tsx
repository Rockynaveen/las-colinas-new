import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  Star, 
  ShieldCheck, 
  Heart, 
  Award, 
  Hotel, 
  Sparkles, 
  BarChart3, 
  Coins, 
  Wrench, 
  Mail, 
  DollarSign, 
  UserCheck, 
  Activity, 
  GraduationCap, 
  Calendar, 
  PiggyBank, 
  Tag, 
  Trophy, 
  ArrowRight 
} from 'lucide-react';

interface ValueCard {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const valuePillars: ValueCard[] = [
  {
    title: 'People First',
    description: 'We value our team members and foster a culture of respect, collaboration, and belonging.',
    icon: Users
  },
  {
    title: 'Growth & Development',
    description: 'We invest in your growth with continuous learning, training programs, and career advancement opportunities.',
    icon: TrendingUp
  },
  {
    title: 'Make an Impact',
    description: 'Be part of a team that delivers exceptional experiences and creates lasting value for our guests and partners.',
    icon: Star
  },
  {
    title: 'Integrity Always',
    description: 'We operate with honesty, transparency, and accountability in everything we do.',
    icon: ShieldCheck
  },
  {
    title: 'Work-Life Balance',
    description: 'We support a healthy balance so you can thrive both at work and at home.',
    icon: Heart
  },
  {
    title: 'Rewards & Recognition',
    description: 'We recognize and celebrate your contributions and achievements.',
    icon: Award
  }
];

interface JobOpening {
  title: string;
  location: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const jobOpenings: JobOpening[] = [
  {
    title: 'Front Office Manager',
    location: 'Irving, Texas',
    icon: Hotel
  },
  {
    title: 'Director of Housekeeping',
    location: 'Irving, Texas',
    icon: Sparkles
  },
  {
    title: 'Sales & Marketing Manager',
    location: 'Irving, Texas',
    icon: BarChart3
  },
  {
    title: 'Revenue Manager',
    location: 'Irving, Texas',
    icon: Coins
  },
  {
    title: 'Maintenance Supervisor',
    location: 'Irving, Texas',
    icon: Wrench
  }
];

interface BenefitItem {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const benefitsList: BenefitItem[] = [
  { title: 'Competitive Compensation', icon: DollarSign },
  { title: 'Career Advancement', icon: UserCheck },
  { title: 'Health & Wellness Benefits', icon: Activity },
  { title: 'Training & Development', icon: GraduationCap },
  { title: 'Paid Time Off', icon: Calendar },
  { title: 'Retirement Plans', icon: PiggyBank },
  { title: 'Employee Discounts', icon: Tag },
  { title: 'Recognition Programs', icon: Trophy }
];

export const Careers: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const scrollToPositions = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.getElementById('open-positions');
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="careers-page-wrapper">
      
      {/* 1. Hero Section */}
      <section className="careers-new-hero">
        <div className="careers-hero-grid">
          
          {/* Left Column Copy */}
          <div className="careers-hero-copy">
            <div className="careers-eyebrow-wrapper">
              <span className="careers-gold-spark">◊</span>
              <span className="careers-eyebrow-text">JOIN OUR TEAM</span>
              <span className="careers-eyebrow-line" />
            </div>
            
            <h1 className="careers-hero-title">
              Build Your Future<br />
              in <span className="serif-gold-accent">Hospitality</span>
            </h1>
            
            <div className="careers-diamond-divider">◊</div>
            
            <h2 className="careers-hero-subtitle">
              Grow With Purpose. Succeed Together.
            </h2>
            
            <p className="careers-hero-desc-para">
              At Las Colinas Hospitality Management, we believe our people are the key to exceptional guest experiences and lasting success. Join a team that values passion, integrity, and excellence.
            </p>
            
            <button 
              type="button" 
              onClick={scrollToPositions}
              className="btn-navy-careers"
            >
              <span>VIEW OPEN POSITIONS</span>
              <ArrowRight size={15} />
            </button>
          </div>
          
          {/* Right Column Curved Image */}
          <div className="careers-hero-visual-container">
            {/* Curved absolute border line overlay */}
            <div className="careers-hero-curve-overlay">
              <svg viewBox="0 0 100 500" preserveAspectRatio="none" className="careers-svg-curve">
                <path d="M0 0 L100 0 C40 150 40 350 100 500 L0 500 Z" fill="#FAF8F5" />
                <path d="M100 0 C40 150 40 350 100 500" fill="none" stroke="#B08C48" strokeWidth="2.5" />
              </svg>
            </div>
            
            <div className="careers-hero-photo-wrapper">
              <img 
                src="/images/careers-hero-staff.jpg" 
                alt="Smiling luxury hospitality team, hotel manager, chef and operations associates" 
                className="careers-hero-staff-img"
              />
            </div>
          </div>
          
        </div>
      </section>

      {/* 2. Value Pillars Section */}
      <section className="careers-pillars-section">
        <div className="careers-inner-container">
          
          <div className="careers-pillars-header">
            <span className="pillars-crest-line" />
            <h2 className="careers-pillars-title">Why Build Your Career With Us?</h2>
            <span className="pillars-crest-line" />
          </div>
          
          <motion.div 
            className="careers-pillars-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {valuePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div 
                  key={idx} 
                  className="careers-pillar-card"
                  variants={itemVariants}
                >
                  <div className="pillar-icon-box">
                    <Icon size={24} />
                  </div>
                  <h3 className="pillar-card-title">{pillar.title}</h3>
                  <p className="pillar-card-desc">{pillar.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
          
        </div>
      </section>

      {/* 3. Open Positions Section */}
      <section id="open-positions" className="careers-jobs-section">
        <div className="careers-inner-container">
          
          <div className="careers-jobs-title-block">
            <h2 className="careers-jobs-title">Open Positions</h2>
            <div className="careers-diamond-divider">◊</div>
          </div>
          
          <div className="careers-jobs-grid">
            
            {/* Left Column: Job Openings List */}
            <div className="careers-jobs-list-col">
              {jobOpenings.map((job, idx) => {
                const JobIcon = job.icon;
                return (
                  <div key={idx} className="careers-job-row">
                    <div className="job-row-left">
                      <div className="job-icon-circle">
                        <JobIcon size={18} />
                      </div>
                      <div className="job-meta-info">
                        <h3 className="job-title-text">{job.title}</h3>
                        <span className="job-location-text">{job.location}</span>
                      </div>
                    </div>
                    <a href="#contact" className="btn-job-apply">
                      <span>APPLY NOW</span>
                      <span className="apply-chevron">&gt;</span>
                    </a>
                  </div>
                );
              })}
              
              <div className="careers-jobs-list-footer">
                <a href="#contact" className="btn-gold-outline-careers">
                  <span>VIEW ALL OPENINGS</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
            
            {/* Right Column: Resume Card */}
            <div className="careers-jobs-resume-col">
              <div className="resume-sidebar-card">
                <div className="resume-card-icon-box">
                  <Mail size={24} />
                </div>
                <h3 className="resume-card-title">Not Finding the Right Role?</h3>
                <div className="resume-card-divider">◊</div>
                <p className="resume-card-desc">
                  We are always looking for talented and passionate individuals. Submit your resume and we will keep you in mind for future opportunities.
                </p>
                <a href="#contact" className="btn-navy-careers-full">
                  <span>SEND YOUR RESUME</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* 4. Belong Section */}
      <section className="careers-belong-section">
        <div className="careers-inner-container">
          
          <div className="careers-belong-grid">
            
            {/* Left Column: Headline, desc, and interior picture */}
            <div className="careers-belong-copy-col">
              <h2 className="belong-heading">More Than a Job.<br />A Place to Belong.</h2>
              <div className="belong-divider">◊</div>
              <p className="belong-desc-text">
                We offer a supportive environment, competitive benefits, and meaningful opportunities to help you build a rewarding and fulfilling career in hospitality.
              </p>
              
              <div className="belong-photo-frame">
                <img 
                  src="/images/careers-lobby-belong.jpg" 
                  alt="Upscale luxury hotel lobby lounge with warm interior lighting and comfortable layout" 
                  className="belong-lobby-img"
                />
                <div className="belong-photo-overlay-fade" />
              </div>
            </div>
            
            {/* Right Column: Benefits Checklist */}
            <div className="careers-belong-benefits-col">
              <div className="belong-benefits-list">
                {benefitsList.map((benefit, idx) => {
                  const BenefitIcon = benefit.icon;
                  return (
                    <div key={idx} className="belong-benefit-row">
                      <div className="benefit-icon-wrapper">
                        <BenefitIcon size={20} />
                      </div>
                      <span className="benefit-title-text">{benefit.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* 5. Ready to Make a Difference bottom banner */}
      <section className="careers-footer-cta-strip">
        <div className="careers-inner-container">
          <div className="careers-cta-strip-layout">
            
            <div className="cta-strip-text">
              <h2 className="cta-strip-heading">Ready to Make a Difference?</h2>
              <p className="cta-strip-subheading">Join our team and be part of something extraordinary.</p>
            </div>
            
            <div className="cta-strip-actions">
              <button 
                type="button" 
                onClick={scrollToPositions} 
                className="btn-navy-careers"
              >
                <span>VIEW OPEN POSITIONS</span>
                <ArrowRight size={15} />
              </button>
              
              <a href="#contact" className="btn-gold-outline-careers-light">
                <span>SEND YOUR RESUME</span>
                <ArrowRight size={15} />
              </a>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
};

export default Careers;
