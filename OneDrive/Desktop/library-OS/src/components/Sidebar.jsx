import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, Armchair, Handshake, Trophy, BarChart3, Settings, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/students', icon: Users, label: 'Students' },
  { path: '/memberships', icon: CreditCard, label: 'Memberships' },
  { path: '/seats', icon: Armchair, label: 'Seat Booking' },
  { path: '/partners', icon: Handshake, label: 'Partners' },
  { path: '/retention', icon: Trophy, label: 'Retention' },
  { path: '/reports', icon: BarChart3, label: 'Reports' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <img src="/logo.png" alt="LibraryOS" className="logo-img" />
        {!collapsed && <div className="logo-text"><span className="logo-name">LibraryOS</span><span className="logo-tagline">Revenue Engine</span></div>}
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink key={item.path} to={item.path} className={`nav-item ${isActive ? 'active' : ''}`} title={collapsed ? item.label : ''}>
              <span className="nav-icon"><Icon size={20} /></span>
              {!collapsed && <span className="nav-label">{item.label}</span>}
              {isActive && <span className="nav-indicator" />}
            </NavLink>
          );
        })}
      </nav>

      {!collapsed && (
        <>
          <div className="revenue-goal">
            <div className="goal-header"><Sparkles size={14} className="goal-icon" /><span>Monthly Goal</span></div>
            <div className="goal-amount">₹20,000</div>
            <div className="goal-progress"><div className="progress"><div className="progress-bar" style={{ width: '68%' }} /></div><span className="goal-text">₹13,600 earned</span></div>
          </div>

          <div className="sidebar-credit">
            <span className="credit-label">Built by</span>
            <img src="/sumit-badge.png" alt="Sumit Thakur" className="credit-signature" />
          </div>
        </>
      )}

      <button className="sidebar-toggle" onClick={onToggle}>{collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}</button>

      <style>{`
        .sidebar { position: fixed; top: 0; left: 0; width: var(--sidebar-width); height: 100vh; background: var(--bg-secondary); border-right: 1px solid var(--border-light); display: flex; flex-direction: column; padding: var(--space-4); transition: width var(--transition-base); z-index: 100; box-shadow: var(--shadow-sm); }
        .sidebar.collapsed { width: var(--sidebar-collapsed); }
        
        .sidebar-logo { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-4); margin-bottom: var(--space-6); }
        .logo-img { width: 44px; height: 44px; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); }
        .logo-text { display: flex; flex-direction: column; }
        .logo-name { font-size: var(--font-size-lg); font-weight: 800; color: var(--text-primary); }
        .logo-tagline { font-size: var(--font-size-xs); color: var(--text-muted); }
        
        .sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: var(--space-1); }
        .nav-item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) var(--space-4); border-radius: var(--radius-lg); color: var(--text-secondary); text-decoration: none; position: relative; transition: all var(--transition-fast); }
        .nav-item:hover { background: var(--bg-tertiary); color: var(--text-primary); }
        .nav-item.active { background: rgba(201, 162, 39, 0.1); color: var(--accent-gold-dark); }
        .nav-icon { display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .nav-label { font-size: var(--font-size-sm); font-weight: 500; }
        .nav-indicator { position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 20px; background: var(--gradient-warm); border-radius: var(--radius-full); }
        
        .revenue-goal { background: var(--bg-warm); border: 1px solid rgba(201, 162, 39, 0.15); border-radius: var(--radius-xl); padding: var(--space-4); margin-bottom: var(--space-4); }
        .goal-header { display: flex; align-items: center; gap: var(--space-2); font-size: var(--font-size-xs); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-2); }
        .goal-icon { color: var(--accent-gold-dark); }
        .goal-amount { font-size: var(--font-size-2xl); font-weight: 800; color: var(--text-primary); margin-bottom: var(--space-3); }
        .goal-progress .progress { margin-bottom: var(--space-2); }
        .goal-text { font-size: var(--font-size-xs); color: var(--accent-emerald); font-weight: 600; }
        
        .sidebar-credit { margin-top: auto; padding-top: var(--space-4); text-align: center; opacity: 0.7; transition: opacity 0.3s; }
        .sidebar-credit:hover { opacity: 1; }
        .credit-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); display: block; margin-bottom: 4px; }
        .credit-signature { height: 24px; width: auto; filter: contrast(0) sepia(100%) hue-rotate(10deg) saturate(5); }
        
        .sidebar-toggle { position: absolute; top: 50%; right: -12px; transform: translateY(-50%); width: 24px; height: 24px; background: var(--bg-secondary); border: 1px solid var(--border-light); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; color: var(--text-muted); cursor: pointer; transition: all var(--transition-fast); box-shadow: var(--shadow-sm); }
        .sidebar-toggle:hover { background: var(--accent-gold-dark); color: white; border-color: var(--accent-gold-dark); }
        
        @media (max-width: 768px) { .sidebar { transform: translateX(-100%); } }
      `}</style>
    </aside>
  );
}
