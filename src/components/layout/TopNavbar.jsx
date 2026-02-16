import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './TopNavbar.css';

const TopNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="top-navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">KodNest</Link>
                </div>

                <div className="mobile-menu-icon" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </div>

                <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                    <li>
                        <Link to="/dashboard" className={isActive('/dashboard')} onClick={() => setIsMenuOpen(false)}>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/saved" className={isActive('/saved')} onClick={() => setIsMenuOpen(false)}>
                            Saved
                        </Link>
                    </li>
                    <li>
                        <Link to="/digest" className={isActive('/digest')} onClick={() => setIsMenuOpen(false)}>
                            Digest
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings" className={isActive('/settings')} onClick={() => setIsMenuOpen(false)}>
                            Settings
                        </Link>
                    </li>
                    <li>
                        <Link to="/proof" className={isActive('/proof')} onClick={() => setIsMenuOpen(false)}>
                            Proof
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default TopNavbar;
