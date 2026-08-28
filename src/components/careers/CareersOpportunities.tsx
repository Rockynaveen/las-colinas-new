import React, { useState, useEffect, useRef } from 'react';
import { 
  Hotel, 
  Sparkles, 
  BarChart3, 
  Coins, 
  Wrench, 
  Mail, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import { CareersApplyModal } from './CareersApplyModal';
import { opportunityService, type OpportunityResource } from '../../services/opportunityService';

const getJobIcon = (title: string = '', department: string = '') => {
  const t = (title + ' ' + department).toLowerCase();
  if (t.includes('housekeeping') || t.includes('clean') || t.includes('sparkle')) return Sparkles;
  if (t.includes('sales') || t.includes('marketing') || t.includes('chart')) return BarChart3;
  if (t.includes('revenue') || t.includes('finance') || t.includes('accounting') || t.includes('coin')) return Coins;
  if (t.includes('maintenance') || t.includes('engineer') || t.includes('wrench')) return Wrench;
  return Hotel;
};

export const CareersOpportunities: React.FC = () => {
  const [opportunities, setOpportunities] = useState<OpportunityResource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('General Application');
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<number | string | null>(null);
  const [preselectedFile, setPreselectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchOpportunities = async () => {
      setLoading(true);
      setError(null);
      const res = await opportunityService.getOpportunities();
      if (isMounted) {
        if (res.success && Array.isArray(res.data)) {
          setOpportunities(res.data);
        } else {
          setError(res.message || 'Unable to load opportunities.');
        }
        setLoading(false);
      }
    };

    fetchOpportunities();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenModal = (title: string, opportunityId?: number | string | null, file?: File | null) => {
    setSelectedJobTitle(title);
    setSelectedOpportunityId(opportunityId || null);
    setPreselectedFile(file || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOpportunityId(null);
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

    handleOpenModal('General Application', null, file);
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
            {loading ? (
              <div className="careers-loading-state" style={{ textAlign: 'center', padding: '3rem 1.5rem', color: '#121F34' }}>
                <Loader2 size={28} className="animate-spin" style={{ margin: '0 auto 0.75rem auto', color: '#B08C48' }} />
                <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 500 }}>Loading available opportunities...</p>
              </div>
            ) : error ? (
              <div className="careers-error-state" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', background: 'rgba(217, 56, 58, 0.05)', borderRadius: '8px', border: '1px solid rgba(217, 56, 58, 0.2)' }}>
                <p style={{ color: '#D9383A', margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>{error}</p>
                <button
                  type="button"
                  className="btn-navy-careers"
                  style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center' }}
                  onClick={() => window.location.reload()}
                >
                  <span>RETRY FETCHING</span>
                </button>
              </div>
            ) : opportunities.length > 0 ? (
              <>
                {opportunities.map((job) => {
                  const jobTitle = job.name || job.title || 'Position';
                  const JobIcon = getJobIcon(jobTitle, job.department);
                  return (
                    <div key={job.id} className="careers-job-row">
                      <div className="job-row-left">
                        <div className="job-icon-circle">
                          <JobIcon size={18} />
                        </div>
                        <div className="job-meta-info">
                          <h3 className="job-title-text">{jobTitle}</h3>
                          <span className="job-location-text">{job.location}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-job-apply"
                        onClick={() => handleOpenModal(jobTitle, job.id)}
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
                <h3 className="no-jobs-title">No opportunities currently listed.</h3>
                <p className="no-jobs-desc">
                  We’re always looking for exceptional hospitality professionals. Submit your resume and we'll keep you in mind for future positions.
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
        opportunityId={selectedOpportunityId}
        initialFile={preselectedFile}
      />
    </section>
  );
};

export default CareersOpportunities;

