import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './pages/LandingPage';
import SettingsPage from './pages/SettingsPage';
import DashboardPage from './pages/DashboardPage';
import SavedPage from './pages/SavedPage';
import DigestPage from './pages/DigestPage';
import ProofPage from './pages/ProofPage';
import TestPage from './pages/TestPage';
import ShipPage from './pages/ShipPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="saved" element={<SavedPage />} />
          <Route path="digest" element={<DigestPage />} />
          <Route path="proof" element={<ProofPage />} />
          <Route path="jt/07-test" element={<TestPage />} />
          <Route path="jt/08-ship" element={<ShipPage />} />
          <Route path="jt/proof" element={<ProofPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
