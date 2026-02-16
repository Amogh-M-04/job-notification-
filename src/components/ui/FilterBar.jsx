import { Search, Filter } from 'lucide-react';
import './FilterBar.css';

const FilterBar = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="filter-bar">
            <div className="search-container">
                <Search size={18} className="search-icon" />
                <input
                    type="text"
                    name="search"
                    placeholder="Search by title, company, or skills..."
                    value={filters.search}
                    onChange={handleChange}
                    className="search-input"
                />
            </div>

            <div className="filters-container">
                <div className="filter-group">
                    <select name="location" value={filters.location} onChange={handleChange} className="filter-select">
                        <option value="">All Locations</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Pune">Pune</option>
                        <option value="Gurgaon">Gurgaon/Dehli</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Remote">Remote</option>
                    </select>
                </div>

                <div className="filter-group">
                    <select name="mode" value={filters.mode} onChange={handleChange} className="filter-select">
                        <option value="">All Modes</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Onsite">Onsite</option>
                    </select>
                </div>

                <div className="filter-group">
                    <select name="experience" value={filters.experience} onChange={handleChange} className="filter-select">
                        <option value="">All Experience</option>
                        <option value="Fresher">Fresher (0 years)</option>
                        <option value="0-1">0-1 Years</option>
                        <option value="1-3">1-3 Years</option>
                        <option value="3-5">3-5 Years</option>
                    </select>
                </div>

                <div className="filter-group mobile-hide">
                    <select name="source" value={filters.source} onChange={handleChange} className="filter-select">
                        <option value="">All Sources</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Naukri">Naukri</option>
                        <option value="Instahyre">Instahyre</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
