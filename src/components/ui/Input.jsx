import React from 'react';
import './Input.css';

export const Input = ({ label, className = '', ...props }) => {
    return (
        <div className={`input-group ${className}`}>
            {label && <label className="input-label">{label}</label>}
            <input className="input-field" {...props} />
        </div>
    );
};
