import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, CheckCircle2, AlertCircle, FileText, Send } from 'lucide-react';

interface CareersApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  initialFile?: File | null;
}

export const CareersApplyModal: React.FC<CareersApplyModalProps> = ({
  isOpen,
  onClose,
  jobTitle,
  initialFile,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Lock background body & html scrolling completely when modal is open
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  // Reset form when modal opens with new job title or initialFile
  useEffect(() => {
    if (isOpen) {
      setFullName('');
      setEmail('');
      setMessage('');
      setResumeFile(initialFile || null);
      setFileError(null);
      setFormError(null);
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  }, [isOpen, jobTitle, initialFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);

    if (!file) {
      setResumeFile(null);
      return;
    }

    const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB limit

    if (file.size > MAX_SIZE_BYTES) {
      setFileError('File size exceeds the 5MB limit. Please upload a smaller file.');
      setResumeFile(null);
      e.target.value = '';
      return;
    }

    setResumeFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (!resumeFile) {
      setFormError('Please upload your resume before submitting.');
      return;
    }

    if (fileError) {
      setFormError('Please fix the file upload error before submitting.');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const isGeneralResume = jobTitle === 'General Application';

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="careers-modal-backdrop" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="careers-modal-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="careers-modal-header">
              <div className="careers-modal-header-text">
                <span className="careers-modal-badge">APPLICATION FORM</span>
                <h3 className="careers-modal-title">
                  {isGeneralResume ? 'Submit Your Resume' : 'Apply for Job'}
                </h3>
              </div>
              <button
                type="button"
                className="careers-modal-close-btn"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            {isSuccess ? (
              <div className="careers-modal-success-state">
                <div className="careers-success-icon-wrap">
                  <CheckCircle2 size={48} className="careers-success-icon" />
                </div>
                <h4 className="careers-success-title">Application Submitted!</h4>
                <p className="careers-success-desc">
                  Thank you for submitting your resume for <strong>{jobTitle}</strong>. Our talent acquisition team has received your details and will be in touch shortly.
                </p>
                <button
                  type="button"
                  className="btn-navy-careers-full"
                  onClick={onClose}
                  style={{ marginTop: '1.5rem' }}
                >
                  <span>Close Window</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="careers-modal-form">
                {formError && (
                  <div className="careers-modal-error-banner">
                    <AlertCircle size={16} />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Job Title (Only shown for specific job positions) */}
                {!isGeneralResume && (
                  <div className="careers-form-group">
                    <label className="careers-form-label">Position / Job Title</label>
                    <input
                      type="text"
                      value={jobTitle}
                      readOnly
                      className="careers-form-input readonly-input"
                    />
                  </div>
                )}

                {/* Full Name */}
                <div className="careers-form-group">
                  <label className="careers-form-label">
                    Full Name <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="careers-form-input"
                  />
                </div>

                {/* Email Address */}
                <div className="careers-form-group">
                  <label className="careers-form-label">
                    Email Address <span className="required-star">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="careers-form-input"
                  />
                </div>

                {/* Cover Letter / Message (Only shown for specific job applications) */}
                {!isGeneralResume && (
                  <div className="careers-form-group">
                    <label className="careers-form-label">Cover Letter / Message</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us briefly about your experience and hospitality background..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="careers-form-textarea"
                    />
                  </div>
                )}

                {/* Resume Upload (Max 5MB - Mandatory) */}
                <div className="careers-form-group">
                  <label className="careers-form-label">
                    Upload Resume <span className="required-star">*</span> <span className="max-size-hint">(Max 5MB • PDF, DOC, DOCX)</span>
                  </label>
                  
                  <div className={`careers-file-dropzone ${fileError ? 'has-error' : ''}`}>
                    <input
                      type="file"
                      id="resume-upload-input"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      className="careers-file-hidden-input"
                    />
                    <label htmlFor="resume-upload-input" className="careers-file-label">
                      <div className="careers-file-icon-wrap">
                        {resumeFile ? <FileText size={22} /> : <Upload size={22} />}
                      </div>
                      <div className="careers-file-text-wrap">
                        {resumeFile ? (
                          <>
                            <span className="careers-filename">{resumeFile.name}</span>
                            <span className="careers-filesize">
                              ({(resumeFile.size / (1024 * 1024)).toFixed(2)} MB)
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="careers-file-prompt">Click to select resume file</span>
                            <span className="careers-file-subtext">PDF, DOC, DOCX up to 5MB</span>
                          </>
                        )}
                      </div>
                    </label>
                  </div>

                  {fileError && (
                    <div className="careers-file-error-msg">
                      <AlertCircle size={14} />
                      <span>{fileError}</span>
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="careers-modal-actions">
                  <button
                    type="button"
                    className="careers-btn-cancel"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="careers-btn-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CareersApplyModal;
