import { useState, useEffect } from 'react';
import './TestPage.css';

const TEST_ITEMS = [
    { id: 1, label: 'Preferences persist after refresh', desc: 'Set prefs in Settings, reload page, verify they are still there.' },
    { id: 2, label: 'Match score calculates correctly', desc: 'Check if job cards show a % match based on your settings.' },
    { id: 3, label: '"Show only matches" toggle works', desc: 'Enable toggle in Dashboard, verify non-matching jobs disappear.' },
    { id: 4, label: 'Save job persists after refresh', desc: 'Save a job, reload, check Saved page.' },
    { id: 5, label: 'Apply opens in new tab', desc: 'Click Apply button, verify it opens new tab to correct URL.' },
    { id: 6, label: 'Status update persists after refresh', desc: 'Change job status, reload, verify status remains.' },
    { id: 7, label: 'Status filter works correctly', desc: 'Filter by "Applied", ensure only applied jobs show.' },
    { id: 8, label: 'Digest generates top 10 by score', desc: 'Go to Digest, generate, verify order is by Match Score.' },
    { id: 9, label: 'Digest persists for the day', desc: 'Reload Digest page, verify generated list remains.' },
    { id: 10, label: 'No console errors on main pages', desc: 'Open F12 Console, navigate pages, ensure no red errors.' },
];

const TestPage = () => {
    // Lazy init checklist state
    const [checkedItems, setCheckedItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('testChecklist')) || {};
        } catch (error) {
            console.error(error);
            return {};
        }
    });

    const passedCount = Object.values(checkedItems).filter(Boolean).length;

    useEffect(() => {
        localStorage.setItem('testChecklist', JSON.stringify(checkedItems));
    }, [checkedItems]);

    const handleCheck = (id) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleReset = () => {
        if (window.confirm('Reset all test progress?')) {
            setCheckedItems({});
        }
    };

    return (
        <div className="test-page">
            <div className="test-header">
                <h1>System Verification Protocol</h1>
                <p>Run through the checklist below to verify system integrity before shipping.</p>
            </div>

            <div className="test-summary">
                <div className={`test-score ${passedCount === 10 ? 'passing' : ''}`}>
                    Tests Passed: {passedCount} / 10
                </div>
                {passedCount < 10 && (
                    <div className="test-warning">
                        Resolve all issues before shipping.
                    </div>
                )}
            </div>

            <div className="test-progress">
                <div
                    className={`progress-bar ${passedCount === 10 ? 'complete' : ''}`}
                    style={{ width: `${(passedCount / 10) * 100}%` }}
                />
            </div>

            <div className="checklist-container">
                {TEST_ITEMS.map(item => (
                    <div key={item.id} className="checklist-item">
                        <input
                            type="checkbox"
                            className="checklist-checkbox"
                            id={`check-${item.id}`}
                            checked={!!checkedItems[item.id]}
                            onChange={() => handleCheck(item.id)}
                        />
                        <div className="item-content">
                            <label htmlFor={`check-${item.id}`} className="item-label">
                                {item.label}
                            </label>
                            <p className="item-desc">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="reset-actions">
                <button onClick={handleReset} className="reset-btn">
                    Reset Test Status
                </button>
            </div>
        </div>
    );
};

export default TestPage;
