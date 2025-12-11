import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Memberships from './pages/Memberships';
import SeatBooking from './pages/SeatBooking';
import Partners from './pages/Partners';
import Retention from './pages/Retention';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import './index.css';

function AppLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header />
        <main className="page-content">
          {children}
        </main>
      </div>

      <style>{`
        .app-layout {
          display: flex;
          min-height: 100vh;
        }
        
        .main-content {
          flex: 1;
          margin-left: var(--sidebar-width);
          transition: margin-left var(--transition-base);
        }
        
        .main-content.sidebar-collapsed {
          margin-left: var(--sidebar-collapsed);
        }
        
        .page-content {
          padding: var(--space-8);
          padding-top: calc(var(--header-height) + var(--space-8));
          min-height: 100vh;
        }
        
        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
          }
          
          .page-content {
            padding: var(--space-4);
            padding-top: calc(var(--header-height) + var(--space-4));
          }
        }
      `}</style>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <AppLayout><Dashboard /></AppLayout>
        } />
        <Route path="/students" element={
          <AppLayout><Students /></AppLayout>
        } />
        <Route path="/memberships" element={
          <AppLayout><Memberships /></AppLayout>
        } />
        <Route path="/seats" element={
          <AppLayout><SeatBooking /></AppLayout>
        } />
        <Route path="/partners" element={
          <AppLayout><Partners /></AppLayout>
        } />
        <Route path="/retention" element={
          <AppLayout><Retention /></AppLayout>
        } />
        <Route path="/reports" element={
          <AppLayout><Reports /></AppLayout>
        } />
        <Route path="/settings" element={
          <AppLayout><Settings /></AppLayout>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
