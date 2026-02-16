import React, { useState } from 'react';
import './ProofFooter.css';

export const ProofFooter = () => {
    const [checks, setChecks] = useState({
        ui: false,
        logic: false,
        test: false,
        deployed: false
    });

    const toggleCheck = (key) => {
        setChecks(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <footer className="proof-footer">
            <label className={`proof-item ${checks.ui ? 'checked' : ''}`}>
                <input
                    type="checkbox"
                    checked={checks.ui}
                    onChange={() => toggleCheck('ui')}
                />
                UI Built
            </label>
            <label className={`proof-item ${checks.logic ? 'checked' : ''}`}>
                <input
                    type="checkbox"
                    checked={checks.logic}
                    onChange={() => toggleCheck('logic')}
                />
                Logic Working
            </label>
            <label className={`proof-item ${checks.test ? 'checked' : ''}`}>
                <input
                    type="checkbox"
                    checked={checks.test}
                    onChange={() => toggleCheck('test')}
                />
                Test Passed
            </label>
            <label className={`proof-item ${checks.deployed ? 'checked' : ''}`}>
                <input
                    type="checkbox"
                    checked={checks.deployed}
                    onChange={() => toggleCheck('deployed')}
                />
                Deployed
            </label>
        </footer>
    );
};
