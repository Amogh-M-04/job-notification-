import React from 'react';
import { TopBar } from './TopBar';
import { ContextHeader } from './ContextHeader';
import { ProofFooter } from './ProofFooter';
import './Layout.css';

export const Layout = ({
    children,
    sidebar,
    projectName = "KodNest Build",
    step = 1,
    totalSteps = 5,
    status = "in-progress",
    title = "Page Title",
    description = "Page description goes here."
}) => {
    return (
        <div className="app-layout">
            <TopBar
                projectName={projectName}
                step={step}
                totalSteps={totalSteps}
                status={status}
            />

            <div className="main-content">
                <main className="workspace">
                    <ContextHeader title={title} description={description} />
                    <div className="workspace-content">
                        {children}
                    </div>
                </main>

                {sidebar}
            </div>

            <ProofFooter />
        </div>
    );
};
