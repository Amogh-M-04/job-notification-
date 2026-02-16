import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import PlaceholderPage from './pages/PlaceholderPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<PlaceholderPage title="Dashboard" />} /> {/* Default to Dashboard or Home */}
          <Route path="dashboard" element={<PlaceholderPage title="Dashboard" />} />
          <Route path="saved" element={<PlaceholderPage title="Saved Jobs" />} />
          <Route path="digest" element={<PlaceholderPage title="Daily Digest" />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" />} />
          <Route path="proof" element={<PlaceholderPage title="Proof of Work" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
