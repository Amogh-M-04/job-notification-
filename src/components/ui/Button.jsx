import React from 'react';
import './Button.css';

export const Button = ({
    children,
    variant = 'primary',
    className = '',
    icon: Icon,
    ...props
}) => {
    return (
        <button
            className={`btn btn-${variant} ${className}`}
            {...props}
        >
            {Icon && <Icon size={16} />}
            {children}
        </button>
    );
};
