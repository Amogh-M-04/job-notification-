import './EmptyState.css';

const DashboardPage = () => {
    return (
        <div className="empty-state-page">
            <div className="empty-state-container">
                <h1 className="empty-state-title">Dashboard</h1>
                <p className="empty-state-message">No jobs yet. In the next step, you will load a realistic dataset.</p>
            </div>
        </div>
    );
};

export default DashboardPage;
