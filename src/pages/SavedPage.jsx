import { useState } from 'react';
import { JOBS } from '../data/jobs';
import JobCard from '../components/ui/JobCard';
import JobModal from '../components/ui/JobModal';
import './DashboardPage.css'; // Reuse dashboard styles
import './EmptyState.css';

const SavedPage = () => {
    // Lazy initialization of state
    const [savedJobs, setSavedJobs] = useState(() => {
        try {
            const savedIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
            return JOBS.filter(job => savedIds.includes(job.id));
        } catch (error) {
            console.error(error);
            return [];
        }
    });

    const [selectedJob, setSelectedJob] = useState(null);

    const handleUnsave = (id) => {
        const currentSavedIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        const newSavedIds = currentSavedIds.filter(savedId => savedId !== id);

        localStorage.setItem('savedJobs', JSON.stringify(newSavedIds));

        // Update local state specific to this page
        setSavedJobs(prev => prev.filter(job => job.id !== id));
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Saved Jobs</h1>
                    <p>Your curated collection of opportunities</p>
                </div>

                {savedJobs.length > 0 ? (
                    <div className="jobs-grid">
                        {savedJobs.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                isSaved={true}
                                onSave={handleUnsave}
                                onView={setSelectedJob}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state-page" style={{ height: '50vh', background: 'transparent' }}>
                        <div className="empty-state-container">
                            <h2 className="empty-state-title">No saved jobs</h2>
                            <p className="empty-state-message">Jobs you save will appear here for quick access.</p>
                        </div>
                    </div>
                )}
            </div>

            {selectedJob && (
                <JobModal
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}
        </div>
    );
};

export default SavedPage;
