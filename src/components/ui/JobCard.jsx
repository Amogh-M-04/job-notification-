import { MapPin, Briefcase, Clock, Bookmark, ExternalLink } from 'lucide-react';
import './JobCard.css';

const JobCard = ({ job, isSaved, onSave, onView, matchScore, status, onStatusChange }) => {
    const getScoreColor = (score) => {
        if (score >= 80) return 'score-green';
        if (score >= 60) return 'score-amber';
        if (score >= 40) return 'score-neutral';
        return 'score-grey';
    };

    const getStatusColor = (s) => {
        switch (s) {
            case 'Applied': return 'status-blue';
            case 'Rejected': return 'status-red';
            case 'Selected': return 'status-green';
            default: return 'status-neutral';
        }
    };

    return (
        <div className={`job-card ${status ? 'has-status ' + getStatusColor(status) : ''}`}>
            <div className="job-header">
                <div>
                    <h3 className="job-title">{job.title}</h3>
                    <p className="job-company">{job.company}</p>
                </div>
                <div className="header-actions">
                    {matchScore !== undefined && (
                        <div className={`match-badge ${getScoreColor(matchScore)}`}>
                            {matchScore}% Match
                        </div>
                    )}
                    <button
                        className={`save-btn ${isSaved ? 'saved' : ''}`}
                        onClick={(e) => { e.stopPropagation(); onSave(job.id); }}
                        title={isSaved ? "Unsave" : "Save"}
                    >
                        <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
                    </button>
                </div>
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

            <div className="status-section">
                <select
                    className={`status-select ${getStatusColor(status || 'Not Applied')}`}
                    value={status || 'Not Applied'}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => onStatusChange(job.id, e.target.value)}
                >
                    <option value="Not Applied">Not Applied</option>
                    <option value="Applied">Applied</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Selected">Selected</option>
                </select>
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
