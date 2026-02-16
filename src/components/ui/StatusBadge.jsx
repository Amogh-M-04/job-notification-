import React from 'react';
import './StatusBadge.css';

export const StatusBadge = ({ status = 'not-started' }) => {
    const getStatusClass = (s) => {
        switch (s) {
            case 'in-progress': return 'badge-in-progress';
            case 'shipped': return 'badge-shipped';
            default: return 'badge-default';
        }
    };

    const labels = {
        'not-started': 'Not Started',
        'in-progress': 'In Progress',
        'shipped': 'Shipped'
    };

    return (
        <span className={`badge ${getStatusClass(status)}`}>
            {labels[status] || 'Unknown'}
        </span>
    );
};
