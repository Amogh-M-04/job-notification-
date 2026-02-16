import { useState, useMemo } from 'react';
import { JOBS } from '../data/jobs';
import JobCard from '../components/ui/JobCard';
import JobModal from '../components/ui/JobModal';
import FilterBar from '../components/ui/FilterBar';
import { calculateMatchScore, parseSalary } from '../utils/scoring';
import { useJobStatus } from '../hooks/useJobStatus';
import './DashboardPage.css';
import './EmptyState.css';

const DashboardPage = () => {
    // Lazy init savedIds from localStorage
    const [savedIds, setSavedIds] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('savedJobs') || '[]');
        } catch (error) {
            console.error(error);
            return [];
        }
    });

    // Preferences - Lazy init
    const [preferences] = useState(() => {
        try {
            const saved = localStorage.getItem('jobTrackerPreferences');
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.error(error);
            return null;
        }
    });

    const [selectedJob, setSelectedJob] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        mode: '',
        experience: '',
        source: '',
        status: ''
    });
    const [showMatchesOnly, setShowMatchesOnly] = useState(false);
    const [sortBy, setSortBy] = useState('latest');

    const { jobStatus, updateStatus } = useJobStatus();
    const [toast, setToast] = useState(null);

    const handleStatusChange = (jobId, newStatus) => {
        updateStatus(jobId, newStatus);

        // Show Toast
        setToast(`Status updated: ${newStatus}`);
        setTimeout(() => setToast(null), 3000);
    };

    // Derived state for jobs using useMemo
    const jobs = useMemo(() => {
        let result = JOBS.map(job => ({
            ...job,
            matchResult: calculateMatchScore(job, preferences),
            status: jobStatus[job.id]?.status || 'Not Applied'
        }));

        // 1. Filter
        if (showMatchesOnly && preferences) {
            result = result.filter(job => job.matchResult.score >= (preferences.minMatchScore || 40));
        }

        if (filters.search) {
            const query = filters.search.toLowerCase();
            result = result.filter(job =>
                job.title.toLowerCase().includes(query) ||
                job.company.toLowerCase().includes(query) ||
                job.skills.some(skill => skill.toLowerCase().includes(query))
            );
        }

        if (filters.location) {
            result = result.filter(job => job.location.includes(filters.location));
        }

        if (filters.mode) {
            result = result.filter(job => job.mode === filters.mode);
        }

        if (filters.experience) {
            result = result.filter(job => job.experience === filters.experience);
        }

        if (filters.source) {
            result = result.filter(job => job.source === filters.source);
        }

        if (filters.status) {
            result = result.filter(job => job.status === filters.status);
        }

        // 2. Sort
        result.sort((a, b) => {
            if (sortBy === 'score') {
                return b.matchResult.score - a.matchResult.score;
            } else if (sortBy === 'salary') {
                return parseSalary(b.salaryRange) - parseSalary(a.salaryRange);
            } else { // latest
                return a.postedDaysAgo - b.postedDaysAgo;
            }
        });

        return result;
    }, [filters, showMatchesOnly, sortBy, preferences, jobStatus]);

    const handleSave = (id) => {
        let newSaved;
        if (savedIds.includes(id)) {
            newSaved = savedIds.filter(savedId => savedId !== id);
        } else {
            newSaved = [...savedIds, id];
        }
        setSavedIds(newSaved);
        localStorage.setItem('savedJobs', JSON.stringify(newSaved));
    };

    return (
        <div className="dashboard-page">
            {toast && <div className="toast-notification">{toast}</div>}
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Find Your Next Role</h1>
                    <p>Showing {jobs.length} opportunities matching your criteria</p>
                    {!preferences && (
                        <div className="prefs-banner">
                            <p>Set your preferences in Settings for intelligent matching scores.</p>
                        </div>
                    )}
                </div>

                <FilterBar
                    filters={filters}
                    setFilters={setFilters}
                    showMatchesOnly={showMatchesOnly}
                    setShowMatchesOnly={setShowMatchesOnly}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                {jobs.length > 0 ? (
                    <div className="jobs-grid">
                        {jobs.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                isSaved={savedIds.includes(job.id)}
                                onSave={handleSave}
                                onView={setSelectedJob}
                                matchScore={preferences ? job.matchResult.score : undefined}
                                status={job.status}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state-container">
                        <h2 className="empty-state-title">No jobs found</h2>
                        <p className="empty-state-message">
                            {showMatchesOnly
                                ? "No jobs meet your minimum match score. Try lowering the threshold in Settings."
                                : "Try adjusting your filters to see more results."}
                        </p>
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

export default DashboardPage;
