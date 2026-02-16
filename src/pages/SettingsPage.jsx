import { useState } from 'react';
import './SettingsPage.css';

const SettingsPage = () => {
    const [preferences, setPreferences] = useState(() => {
        try {
            const savedPrefs = localStorage.getItem('jobTrackerPreferences');
            if (savedPrefs) {
                const parsed = JSON.parse(savedPrefs);
                return {
                    roleKeywords: parsed.roleKeywords ? parsed.roleKeywords.join(', ') : '',
                    preferredLocations: parsed.preferredLocations ? parsed.preferredLocations.join(', ') : '',
                    preferredMode: {
                        Remote: parsed.preferredMode ? parsed.preferredMode.includes('Remote') : false,
                        Hybrid: parsed.preferredMode ? parsed.preferredMode.includes('Hybrid') : false,
                        Onsite: parsed.preferredMode ? parsed.preferredMode.includes('Onsite') : false
                    },
                    experienceLevel: parsed.experienceLevel || '',
                    skills: parsed.skills ? parsed.skills.join(', ') : '',
                    minMatchScore: parsed.minMatchScore || 40
                };
            }
        } catch (error) {
            console.error(error);
        }

        return {
            roleKeywords: '',
            preferredLocations: '',
            preferredMode: {
                Remote: false,
                Hybrid: false,
                Onsite: false
            },
            experienceLevel: '',
            skills: '',
            minMatchScore: 40
        };
    });

    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setPreferences(prev => ({
                ...prev,
                preferredMode: {
                    ...prev.preferredMode,
                    [name]: checked // name will be Remote, Hybrid, etc.
                }
            }));
        } else {
            setPreferences(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Transform for storage
        const storageFormat = {
            roleKeywords: preferences.roleKeywords.split(',').map(s => s.trim()).filter(Boolean),
            preferredLocations: preferences.preferredLocations.split(',').map(s => s.trim()).filter(Boolean),
            preferredMode: Object.keys(preferences.preferredMode).filter(k => preferences.preferredMode[k]),
            experienceLevel: preferences.experienceLevel,
            skills: preferences.skills.split(',').map(s => s.trim()).filter(Boolean),
            minMatchScore: parseInt(preferences.minMatchScore, 10)
        };

        localStorage.setItem('jobTrackerPreferences', JSON.stringify(storageFormat));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="settings-page">
            <div className="settings-container">
                <h1 className="settings-title">Preferences</h1>
                <p className="settings-subtitle">Customize your matching criteria for the scoring engine.</p>

                <form className="settings-form" onSubmit={handleSubmit}>
                    {/* Role keywords input */}
                    <div className="form-group">
                        <label htmlFor="roleKeywords">Role Keywords (comma separated)</label>
                        <input
                            type="text"
                            name="roleKeywords"
                            id="roleKeywords"
                            value={preferences.roleKeywords}
                            onChange={handleChange}
                            placeholder="e.g. Frontend, React, Java Backend"
                            className="premium-input"
                        />
                    </div>

                    {/* Preferred locations input */}
                    <div className="form-group">
                        <label htmlFor="preferredLocations">Preferred Locations (comma separated)</label>
                        <input
                            type="text"
                            name="preferredLocations"
                            id="preferredLocations"
                            value={preferences.preferredLocations}
                            onChange={handleChange}
                            placeholder="e.g. Bangalore, Pune, Remote"
                            className="premium-input"
                        />
                    </div>

                    {/* Mode selection */}
                    <div className="form-group">
                        <label>Preferred Mode</label>
                        <div className="radio-group">
                            <label className="radio-label">
                                <input
                                    type="checkbox"
                                    name="Remote"
                                    checked={preferences.preferredMode.Remote}
                                    onChange={handleChange}
                                /> Remote
                            </label>
                            <label className="radio-label">
                                <input
                                    type="checkbox"
                                    name="Hybrid"
                                    checked={preferences.preferredMode.Hybrid}
                                    onChange={handleChange}
                                /> Hybrid
                            </label>
                            <label className="radio-label">
                                <input
                                    type="checkbox"
                                    name="Onsite"
                                    checked={preferences.preferredMode.Onsite}
                                    onChange={handleChange}
                                /> Onsite
                            </label>
                        </div>
                    </div>

                    {/* Experience level select */}
                    <div className="form-group">
                        <label htmlFor="experienceLevel">Experience Level</label>
                        <select
                            name="experienceLevel"
                            id="experienceLevel"
                            value={preferences.experienceLevel}
                            onChange={handleChange}
                            className="premium-select"
                        >
                            <option value="">Select Level</option>
                            <option value="Fresher">Fresher (0 years)</option>
                            <option value="0-1">0-1 Years</option>
                            <option value="1-3">1-3 Years</option>
                            <option value="3-5">3-5 Years</option>
                        </select>
                    </div>

                    {/* Skills input */}
                    <div className="form-group">
                        <label htmlFor="skills">My Skills (comma separated)</label>
                        <textarea
                            name="skills"
                            id="skills"
                            value={preferences.skills}
                            onChange={handleChange}
                            placeholder="e.g. JavaScript, Python, AWS, SQL"
                            className="premium-context"
                            rows="3"
                        />
                    </div>

                    {/* Score Threshold */}
                    <div className="form-group">
                        <label htmlFor="minMatchScore">Minimum Match Score: {preferences.minMatchScore}</label>
                        <input
                            type="range"
                            name="minMatchScore"
                            id="minMatchScore"
                            min="0"
                            max="100"
                            value={preferences.minMatchScore}
                            onChange={handleChange}
                            className="premium-range"
                        />
                    </div>

                    <button type="submit" className="save-button">
                        {saved ? 'Saved!' : 'Save Preferences'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;
