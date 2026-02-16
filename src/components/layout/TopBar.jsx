import React from 'react';
import { StatusBadge } from '../ui/StatusBadge';
import './TopBar.css';

export const TopBar = ({ projectName, step, totalSteps, status }) => {
    return (
        <header className="topbar">
            <div className="topbar-left">
                {projectName}
            </div>
            <div className="topbar-center">
                Step {step} / {totalSteps}
            </div>
            <div className="topbar-right">
                <StatusBadge status={status} />
            </div>
        </header>
    );
};
