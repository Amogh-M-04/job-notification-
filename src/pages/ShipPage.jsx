import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Unlock, Rocket } from 'lucide-react';
import './ShipPage.css';

const ShipPage = () => {
    const [isLocked] = useState(() => {
        try {
            const checklist = JSON.parse(localStorage.getItem('testChecklist') || '{}');
            const passedCount = Object.values(checklist).filter(Boolean).length;
            return passedCount < 10;
        } catch (error) {
            console.error(error);
            return true;
        }
    });

    return (
        <div className="ship-page">
            <div className={`ship-container ${isLocked ? 'locked' : 'unlocked'}`}>
                {isLocked ? (
                    <>
                        <div className="lock-icon">
                            <Lock size={48} />
                        </div>
                        <h1 className="ship-title">Shipment Locked</h1>
                        <p className="ship-message">
                            Functionality verification is incomplete.<br />
                            Complete the test checklist to release the build.
                        </p>
                        <Link to="/jt/07-test" className="ship-btn">
                            Go to Test Checklist
                        </Link>
                    </>
                ) : (
                    <>
                        <div className="unlock-icon">
                            <Rocket size={48} />
                        </div>
                        <h1 className="ship-title">Ready to Ship</h1>
                        <p className="ship-message">
                            All systems verified. The build is stable and ready for deployment.
                        </p>
                        <button className="ship-btn" onClick={() => alert('Shipping sequences initiated! (Demo)')}>
                            Initiate Launch
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ShipPage;
