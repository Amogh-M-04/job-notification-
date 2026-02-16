import { useState, useMemo } from 'react';
import { JOBS } from '../data/jobs';
import JobCard from '../components/ui/JobCard';
import JobModal from '../components/ui/JobModal';
import FilterBar from '../components/ui/FilterBar';
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

    const [selectedJob, setSelectedJob] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        mode: '',
        experience: '',
        source: ''
    });

    // Derived state for jobs using useMemo
    const jobs = useMemo(() => {
        let result = JOBS;

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

        return result;
    }, [filters]);

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
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Find Your Next Role</h1>
                    <p>Showing {jobs.length} opportunities matching your criteria</p>
                </div>

                <FilterBar filters={filters} setFilters={setFilters} />

                {jobs.length > 0 ? (
                    <div className="jobs-grid">
                        {jobs.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                isSaved={savedIds.includes(job.id)}
                                onSave={handleSave}
                                onView={setSelectedJob}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state-container">
                        <h2 className="empty-state-title">No jobs found</h2>
                        <p className="empty-state-message">Try adjusting your filters to see more results.</p>
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
