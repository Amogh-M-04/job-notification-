import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <div className="landing-content">
                <h1 className="landing-headline">Stop Missing The Right Jobs.</h1>
                <p className="landing-subtext">Precision-matched job discovery delivered daily at 9AM.</p>
                <Link to="/settings" className="cta-button">Start Tracking</Link>
            </div>
        </div>
    );
};

export default LandingPage;
