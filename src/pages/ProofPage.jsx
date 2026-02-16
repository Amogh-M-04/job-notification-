import { useState, useEffect } from 'react';
import { CheckCircle, Circle, Copy } from 'lucide-react';
import './ProofPage.css';

const STEPS = [
    'Route Skeleton',
    'UI Skeleton',
    'Data Rendering',
    'Match Score Engine',
    'Daily Digest Engine',
    'Status Tracking',
    'Test Checklist',
    'Proof System'
];

const ProofPage = () => {
    const [artifacts, setArtifacts] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('proofArtifacts')) || {
                lovable: '',
                github: '',
                deployed: ''
            };
        } catch {
            return { lovable: '', github: '', deployed: '' };
        }
    });

    const [testPassed] = useState(() => {
        try {
            const checklist = JSON.parse(localStorage.getItem('testChecklist') || '{}');
            const count = Object.values(checklist).filter(Boolean).length;
            return count === 10;
        } catch {
            return false;
        }
    });
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        localStorage.setItem('proofArtifacts', JSON.stringify(artifacts));
    }, [artifacts]);

    const handleChange = (field, value) => {
        setArtifacts(prev => ({ ...prev, [field]: value }));
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const isShippable =
        testPassed &&
        isValidUrl(artifacts.lovable) &&
        isValidUrl(artifacts.github) &&
        isValidUrl(artifacts.deployed);

    const handleCopy = () => {
        const text = `
It's finished.

Job Notification Tracker — Final Submission

Lovable Project:
${artifacts.lovable}

GitHub Repository:
${artifacts.github}

Live Deployment:
${artifacts.deployed}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced
`.trim();

        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <div className="proof-page">
            <div className="proof-header">
                <h1 className="proof-title">Project 1 — Job Notification Tracker</h1>
                <div className={`status-badge ${isShippable ? 'shipped' : 'pending'}`}>
                    {isShippable ? 'Shipped' : 'In Progress'}
                </div>
            </div>

            <div className="proof-section">
                <h2 className="section-title">A) Step Completion Summary</h2>
                <div className="step-list">
                    {STEPS.map((step, index) => (
                        <div key={index} className="step-item completed">
                            <span className="step-icon">
                                <CheckCircle size={16} />
                            </span>
                            {step}
                        </div>
                    ))}
                </div>
            </div>

            <div className="proof-section">
                <h2 className="section-title">B) Artifact Collection</h2>

                <div className="form-group">
                    <label className="form-label">Lovable Project Link</label>
                    <input
                        type="url"
                        className={`form-input ${isValidUrl(artifacts.lovable) ? 'valid' : ''}`}
                        placeholder="https://lovable.dev/..."
                        value={artifacts.lovable}
                        onChange={(e) => handleChange('lovable', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">GitHub Repository Link</label>
                    <input
                        type="url"
                        className={`form-input ${isValidUrl(artifacts.github) ? 'valid' : ''}`}
                        placeholder="https://github.com/..."
                        value={artifacts.github}
                        onChange={(e) => handleChange('github', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Deployed URL</label>
                    <input
                        type="url"
                        className={`form-input ${isValidUrl(artifacts.deployed) ? 'valid' : ''}`}
                        placeholder="https://vercel.app/..."
                        value={artifacts.deployed}
                        onChange={(e) => handleChange('deployed', e.target.value)}
                    />
                </div>

                <div className="validation-status" style={{ marginTop: '2rem', padding: '1rem', background: 'var(--color-bg-subtle)', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Shipping Requirements:</h3>
                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
                        <li style={{ color: testPassed ? 'var(--color-success)' : 'var(--color-error)' }}>
                            {testPassed ? '✓' : '✗'} Test Checklist (10/10 required)
                        </li>
                        <li style={{ color: isValidUrl(artifacts.lovable) ? 'var(--color-success)' : 'var(--color-error)' }}>
                            {isValidUrl(artifacts.lovable) ? '✓' : '✗'} Lovable Project Link (Valid URL required)
                        </li>
                        <li style={{ color: isValidUrl(artifacts.github) ? 'var(--color-success)' : 'var(--color-error)' }}>
                            {isValidUrl(artifacts.github) ? '✓' : '✗'} GitHub Repository Link (Valid URL required)
                        </li>
                        <li style={{ color: isValidUrl(artifacts.deployed) ? 'var(--color-success)' : 'var(--color-error)' }}>
                            {isValidUrl(artifacts.deployed) ? '✓' : '✗'} Deployed URL (Valid URL required)
                        </li>
                    </ul>
                </div>
            </div>

            <div className="submission-actions">
                <button
                    className="copy-btn"
                    disabled={!isShippable}
                    onClick={handleCopy}
                >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Copy size={18} /> Copy Final Submission
                    </span>
                </button>
                {copied && <div className="success-message">Project 1 Shipped Successfully.</div>}
            </div>
        </div>
    );
};

export default ProofPage;
