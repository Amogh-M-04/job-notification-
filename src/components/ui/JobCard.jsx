import { MapPin, Briefcase, Clock, Bookmark, ExternalLink } from 'lucide-react';
import './JobCard.css';

const JobCard = ({ job, isSaved, onSave, onView }) => {
    return (
        <div className="job-card">
            <div className="job-header">
                <div>
                    <h3 className="job-title">{job.title}</h3>
                    <p className="job-company">{job.company}</p>
                </div>
                <button
                    className={`save-btn ${isSaved ? 'saved' : ''}`}
                    onClick={(e) => { e.stopPropagation(); onSave(job.id); }}
                    title={isSaved ? "Unsave" : "Save"}
                >
                    <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
                </button>
            </div>

            <div className="job-meta">
                <span className="meta-item"><MapPin size={14} /> {job.location} ({job.mode})</span>
                <span className="meta-item"><Briefcase size={14} /> {job.experience}</span>
                <span className="meta-item"><Clock size={14} /> {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo}d ago`}</span>
            </div>

            <div className="job-badges">
                <span className="badge salary-badge">{job.salaryRange}</span>
                <span className="badge source-badge">{job.source}</span>
            </div>

            <div className="job-actions">
                <button className="btn-secondary" onClick={() => onView(job)}>View Details</button>
                <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    Apply <ExternalLink size={14} />
                </a>
            </div>
        </div>
    );
};

export default JobCard;
