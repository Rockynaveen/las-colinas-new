import React from 'react';
import { 
  Hotel, 
  Sparkles, 
  BarChart3, 
  Coins, 
  Wrench, 
  Mail, 
  ArrowRight 
} from 'lucide-react';

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

export const CareersOpportunities: React.FC = () => {
  return (
    <section id="open-positions" className="careers-jobs-section">
      <div className="careers-inner-container">
        
        <div className="careers-categories-header" style={{ marginBottom: '3rem' }}>
          <div className="careers-intro-eyebrow">
            <span>OPPORTUNITIES</span>
          </div>

          <h2 className="careers-categories-heading">
            Explore Current Opportunities
          </h2>

          <p className="careers-categories-subtext">
            Ready to take the next step in your hospitality career? Browse our current openings and discover opportunities to become part of the Las Colinas Hospitality Management team.
          </p>
        </div>
        
        <div className="careers-jobs-grid">
          
          {/* Left Column: Job Openings List or Empty State Fallback */}
          <div className="careers-jobs-list-col">
            {jobOpenings.length > 0 ? (
              <>
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
              </>
            ) : (
              <div className="careers-no-jobs-card">
                <h3 className="no-jobs-title">We’re always looking for exceptional hospitality professionals.</h3>
                <p className="no-jobs-desc">
                  Don't see the right opportunity today? Submit your resume and we'll keep you in mind for future positions.
                </p>
                <a href="#contact" className="btn-navy-careers">
                  <span>SUBMIT YOUR RESUME</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            )}
          </div>
          
          {/* Right Column: Resume Card */}
          <div className="careers-jobs-resume-col">
            <div className="resume-sidebar-card">
              <div className="resume-card-icon-box">
                <Mail size={24} />
              </div>
              <h3 className="resume-card-title">Don't See the Right Role?</h3>
              <div className="resume-card-divider">◊</div>
              <p className="resume-card-desc">
                We’re always looking for exceptional hospitality professionals. Submit your resume and we'll keep you in mind for future positions.
              </p>
              <a href="#contact" className="btn-navy-careers-full">
                <span>SUBMIT YOUR RESUME</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
};

export default CareersOpportunities;
