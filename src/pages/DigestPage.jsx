import { useState } from 'react';
import { JOBS } from '../data/jobs';
import { calculateMatchScore } from '../utils/scoring';
import { ExternalLink, Copy, Mail, CheckCircle, RefreshCcw } from 'lucide-react';
import './DigestPage.css';

const DigestPage = () => {

    const [loading, setLoading] = useState(false);

    // Lazy init preferences
    const [preferences] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('jobTrackerPreferences'));
        } catch (error) {
            console.error(error);
            return null;
        }
    });

    const [today] = useState(() => {
        const date = new Date();
        return date.toISOString().split('T')[0];
    });

    const [digest, setDigest] = useState(() => {
        try {
            // Re-derive today here since we can't access state in another state initializer easily without extraction
            const date = new Date();
            const dateKey = date.toISOString().split('T')[0];
            const savedDigest = localStorage.getItem(`jobTrackerDigest_${dateKey}`);
            return savedDigest ? JSON.parse(savedDigest) : null;
        } catch (error) {
            console.error(error);
            return null;
        }
    });

    const generateDigest = () => {
        if (!preferences) return;

        setLoading(true);
        setTimeout(() => {
            // 1. Calculate scores
            const scoredJobs = JOBS.map(job => ({
                ...job,
                matchScore: calculateMatchScore(job, preferences).score
            }))
                .filter(job => job.matchScore > 0); // Filter out zero matches

            // 2. Sort: Match Score desc, then Posted Date asc
            scoredJobs.sort((a, b) => {
                if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
                return a.postedDaysAgo - b.postedDaysAgo;
            });

            // 3. Take Top 10
            const topJobs = scoredJobs.slice(0, 10);

            setDigest(topJobs);
            localStorage.setItem(`jobTrackerDigest_${today}`, JSON.stringify(topJobs));
            setLoading(false);
        }, 800); // Simulate network/processing delay
    };

    const copyToClipboard = () => {
        if (!digest) return;
        const text = digest.map(job =>
            `${job.title} at ${job.company}\nLocation: ${job.location}\nMatch: ${job.matchScore}%\nLink: ${job.applyUrl}\n`
        ).join('\n---\n\n');

        navigator.clipboard.writeText(`Top Jobs for ${today}:\n\n${text}`);
        alert('Digest copied to clipboard!');
    };

    const createEmailDraft = () => {
        if (!digest) return;
        const subject = encodeURIComponent(`My 9AM Job Digest - ${today}`);
        const body = encodeURIComponent(
            `Here are my top job matches for today:\n\n` +
            digest.map(job =>
                `${job.title} at ${job.company}\nLocation: ${job.location} | Exp: ${job.experience}\nMatch Score: ${job.matchScore}%\nApply: ${job.applyUrl}`
            ).join('\n\n--------------------------------\n\n')
        );
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    if (!preferences) {
        return (
            <div className="digest-page">
                <div className="empty-digest-state">
                    <h2>Personalize Your Digest</h2>
                    <p>Set your preferences in Settings to generate a personalized 9AM digest.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="digest-page">
            <div className="digest-container">
                {!digest ? (
                    <div className="digest-start">
                        <h2>Daily 9AM Digest</h2>
                        <p>Generate your curated list of top opportunities for today.</p>
                        <button className="generate-btn" onClick={generateDigest} disabled={loading}>
                            {loading ? <RefreshCcw className="spin" size={20} /> : 'Generate Today\'s 9AM Digest (Simulated)'}
                        </button>
                        <p className="simulation-note">Demo Mode: Daily 9AM trigger simulated manually.</p>
                    </div>
                ) : (
                    <div className="digest-view">
                        <div className="digest-actions-bar">
                            <button className="action-btn" onClick={copyToClipboard}>
                                <Copy size={16} /> Copy List
                            </button>
                            <button className="action-btn primary" onClick={createEmailDraft}>
                                <Mail size={16} /> Email Draft
                            </button>
                        </div>

                        <div className="email-paper">
                            <div className="email-header">
                                <h1>Top 10 Jobs For You — 9AM Digest</h1>
                                <p className="email-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>

                            {digest.length > 0 ? (
                                <div className="email-body">
                                    {digest.map((job, index) => (
                                        <div key={job.id} className="digest-item">
                                            <div className="digest-item-header">
                                                <h3 className="digest-job-title">
                                                    {index + 1}. {job.title}
                                                </h3>
                                                <span className={`digest-score ${job.matchScore >= 80 ? 'green' : 'amber'}`}>
                                                    {job.matchScore}% Match
                                                </span>
                                            </div>
                                            <p className="digest-company">{job.company} • {job.location}</p>
                                            <div className="digest-meta">
                                                <span>{job.experience}</span> • <span>{job.mode}</span>
                                            </div>
                                            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="digest-apply-link">
                                                Apply Now <ExternalLink size={12} />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="email-empty">
                                    <p>No matching roles found today based on your preferences.</p>
                                    <p>Try adjusting your settings to broaden your search.</p>
                                </div>
                            )}

                            <div className="email-footer">
                                <p>This digest was generated based on your preferences.</p>
                                <p>KodNest Job Tracker • Daily Digest</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DigestPage;
