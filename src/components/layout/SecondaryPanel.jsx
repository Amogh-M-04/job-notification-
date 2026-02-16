import React from 'react';
import { Button } from '../ui/Button';
import { Copy, Terminal, CheckCircle, AlertTriangle, Image } from 'lucide-react';
import './SecondaryPanel.css';

export const SecondaryPanel = ({ explanation, promptText }) => {
    return (
        <aside className="secondary-panel">
            <div className="panel-explanation">
                <strong>Step Explanation:</strong>
                <p>{explanation}</p>
            </div>

            <div>
                <div className="input-label" style={{ marginBottom: '8px' }}>Prompt</div>
                <div className="prompt-box">
                    {promptText}
                </div>
                <Button variant="secondary" icon={Copy} style={{ width: '100%' }}>
                    Copy Prompt
                </Button>
            </div>

            <div className="panel-actions">
                <Button variant="primary" icon={Terminal} style={{ width: '100%' }}>
                    Build in Lovable
                </Button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <Button variant="secondary" icon={CheckCircle} style={{ width: '100%', fontSize: '12px' }}>
                        It Worked
                    </Button>
                    <Button variant="secondary" icon={AlertTriangle} style={{ width: '100%', fontSize: '12px' }}>
                        Error
                    </Button>
                </div>
                <Button variant="secondary" icon={Image} style={{ width: '100%' }}>
                    Add Screenshot
                </Button>
            </div>
        </aside>
    );
};
