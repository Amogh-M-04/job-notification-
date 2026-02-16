import React from 'react';
import './ContextHeader.css';

export const ContextHeader = ({ title, description }) => {
    return (
        <section className="context-header">
            <h1 className="context-headline">{title}</h1>
            <p className="context-subtext">{description}</p>
        </section>
    );
};
