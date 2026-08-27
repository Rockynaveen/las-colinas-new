import React, { useState, useRef } from 'react';
import { 
  Hotel, 
  Sparkles, 
  BarChart3, 
  Coins, 
  Wrench, 
  Mail, 
  ArrowRight 
} from 'lucide-react';
import { CareersApplyModal } from './CareersApplyModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('General Application');
  const [preselectedFile, setPreselectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenModal = (title: string, file?: File | null) => {
    setSelectedJobTitle(title);
    setPreselectedFile(file || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPreselectedFile(null);
  };

  const handleResumeButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDirectFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds the 5MB limit. Please select a smaller file.');
      e.target.value = '';
      return;
    }

    handleOpenModal('General Application', file);
    e.target.value = '';
  };

  return (
    <section id="open-positions" className="careers-jobs-section">
      {/* Hidden File Input for Direct Resume Upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleDirectFileSelect}
        style={{ display: 'none' }}
      />

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
          
          {/* Left Column: Job Openings List */}
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
                      <button
                        type="button"
                        className="btn-job-apply"
                        onClick={() => handleOpenModal(job.title)}
                      >
                        <span>APPLY NOW</span>
                        <span className="apply-chevron">&gt;</span>
                      </button>
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
                <button
                  type="button"
                  className="btn-navy-careers"
                  onClick={handleResumeButtonClick}
                >
                  <span>SUBMIT YOUR RESUME</span>
                  <ArrowRight size={15} />
                </button>
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
              <button
                type="button"
                className="btn-navy-careers-full"
                onClick={handleResumeButtonClick}
              >
                <span>SUBMIT YOUR RESUME</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
          
        </div>
        
      </div>

      {/* Application Popup Modal */}
      <CareersApplyModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        jobTitle={selectedJobTitle}
        initialFile={preselectedFile}
      />
    </section>
  );
};

export default CareersOpportunities;
