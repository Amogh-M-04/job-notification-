import { Outlet } from 'react-router-dom';
import TopNavbar from './TopNavbar';

const MainLayout = () => {
    return (
        <div className="app-container">
            <TopNavbar />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
