import { X, CheckCircle } from 'lucide-react';
import './JobModal.css';

const JobModal = ({ job, onClose }) => {
    if (!job) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-header">
                    <h2 className="modal-title">{job.title}</h2>
                    <p className="modal-company">{job.company} • {job.location} ({job.mode})</p>
                </div>

                <div className="modal-body">
                    <div className="modal-section">
                        <h3>Description</h3>
                        <p>{job.description}</p>
                    </div>

                    <div className="modal-section">
                        <h3>Skills</h3>
                        <div className="skills-list">
                            {job.skills.map((skill, index) => (
                                <span key={index} className="skill-tag">
                                    <CheckCircle size={14} /> {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="modal-section">
                        <h3>Details</h3>
                        <div className="details-grid">
                            <div className="detail-item">
                                <span className="label">Experience</span>
                                <span className="value">{job.experience}</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Salary</span>
                                <span className="value">{job.salaryRange}</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Source</span>
                                <span className="value">{job.source}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="modal-cta">
                        Apply Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default JobModal;
