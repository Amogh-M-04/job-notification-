import './SettingsPage.css';

const SettingsPage = () => {
    return (
        <div className="settings-page">
            <div className="settings-container">
                <h1 className="settings-title">Preferences</h1>
                <p className="settings-subtitle">Customize your job matching criteria.</p>

                <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="keywords">Role Keywords</label>
                        <input type="text" id="keywords" placeholder="e.g. Frontend Engineer, Product Designer" className="premium-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="locations">Preferred Locations</label>
                        <input type="text" id="locations" placeholder="e.g. San Francisco, London, Remote" className="premium-input" />
                    </div>

                    <div className="form-group">
                        <label>Mode</label>
                        <div className="radio-group">
                            <label className="radio-label">
                                <input type="radio" name="mode" value="remote" /> Remote
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="mode" value="hybrid" /> Hybrid
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="mode" value="onsite" /> Onsite
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="experience">Experience Level</label>
                        <select id="experience" className="premium-select">
                            <option value="">Select Level</option>
                            <option value="entry">Entry Level (0-2 years)</option>
                            <option value="mid">Mid Level (2-5 years)</option>
                            <option value="senior">Senior Level (5+ years)</option>
                            <option value="lead">Lead / Manager</option>
                        </select>
                    </div>

                    <button type="submit" className="save-button">Save Preferences</button>
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;
