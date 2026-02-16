import './PlaceholderPage.css';

const PlaceholderPage = ({ title }) => {
    return (
        <div className="placeholder-page">
            <h1 className="placeholder-title">{title}</h1>
            <p className="placeholder-subtitle">This section will be built in the next step.</p>
        </div>
    );
};

export default PlaceholderPage;
