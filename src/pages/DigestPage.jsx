import './EmptyState.css';

const DigestPage = () => {
    return (
        <div className="empty-state-page">
            <div className="empty-state-container">
                <h1 className="empty-state-title">Daily Digest</h1>
                <p className="empty-state-message">Your daily briefing of precision-matched roles will be delivered here at 9AM.</p>
            </div>
        </div>
    );
};

export default DigestPage;
