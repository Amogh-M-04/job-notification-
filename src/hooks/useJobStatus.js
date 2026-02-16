import { useState } from 'react';

export const useJobStatus = () => {
    const [jobStatus, setJobStatus] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('jobTrackerStatus') || '{}');
        } catch (error) {
            console.error(error);
            return {};
        }
    });

    const updateStatus = (jobId, newStatus) => {
        const updatedStatus = {
            ...jobStatus,
            [jobId]: {
                status: newStatus,
                date: new Date().toISOString()
            }
        };
        setJobStatus(updatedStatus);
        localStorage.setItem('jobTrackerStatus', JSON.stringify(updatedStatus));
        return updatedStatus;
    };

    const getStatus = (jobId) => {
        return jobStatus[jobId]?.status || 'Not Applied';
    };

    return { jobStatus, updateStatus, getStatus };
};
