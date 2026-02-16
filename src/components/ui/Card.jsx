import React from 'react';
import './Card.css';

export const Card = ({ children, title, className = '', ...props }) => {
    return (
        <div className={`card ${className}`} {...props}>
            {title && (
                <div className="card-header">
                    <h3 className="card-title">{title}</h3>
                </div>
            )}
            {children}
        </div>
    );
};
