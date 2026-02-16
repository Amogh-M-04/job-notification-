import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// App initialized
import MainLayout from './components/layout/MainLayout';
import LandingPage from './pages/LandingPage';
import SettingsPage from './pages/SettingsPage';
import DashboardPage from './pages/DashboardPage';
import SavedPage from './pages/SavedPage';
import DigestPage from './pages/DigestPage';
import ProofPage from './pages/ProofPage';
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
