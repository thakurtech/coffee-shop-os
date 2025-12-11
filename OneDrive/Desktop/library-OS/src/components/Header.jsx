import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, ChevronDown, Plus, User, LogOut, Settings as SettingsIcon } from 'lucide-react';

const pageNames = { '/dashboard': 'Dashboard', '/students': 'Students', '/memberships': 'Memberships', '/seats': 'Seat Booking', '/partners': 'Partners', '/retention': 'Retention', '/reports': 'Reports', '/settings': 'Settings' };

export default function Header() {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const pageName = pageNames[location.pathname] || 'LibraryOS';

  const notifications = [
    { id: 1, type: 'warning', message: '5 students at risk of churning', time: '2 min ago' },
    { id: 2, type: 'success', message: 'New membership: Rahul Sharma', time: '15 min ago' },
    { id: 3, type: 'info', message: 'Partner payout: ₹2,400 credited', time: '1 hour ago' },
  ];

  return (
    <header className="header">
      <div className="header-left"><h1 className="page-title">{pageName}</h1></div>

      <div className="header-center">
        <div className="search-bar"><Search size={18} className="search-icon" /><input type="text" placeholder="Search students, memberships..." /><kbd>⌘K</kbd></div>
      </div>

      <div className="header-right">
        <button className="btn btn-primary btn-sm"><Plus size={16} />Quick Add</button>

        <div className="dropdown">
          <button className="btn btn-icon btn-ghost notif-btn" onClick={() => setShowNotifications(!showNotifications)}><Bell size={20} /><span className="notif-badge">3</span></button>
          {showNotifications && (
            <div className="dropdown-menu notif-menu">
              <div className="dropdown-header"><span>Notifications</span><button className="btn btn-ghost btn-sm">Mark read</button></div>
              <div className="notif-list">
                {notifications.map(n => (
                  <div key={n.id} className={`notif-item ${n.type}`}><div className="notif-dot" /><div className="notif-content"><p>{n.message}</p><span>{n.time}</span></div></div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="dropdown">
          <button className="profile-btn" onClick={() => setShowProfile(!showProfile)}>
            <div className="avatar">SK</div>
            <div className="profile-info"><span className="profile-name">Study Hub</span><span className="profile-role">Owner</span></div>
            <ChevronDown size={16} />
          </button>
          {showProfile && (
            <div className="dropdown-menu profile-menu">
              <div className="dropdown-item"><User size={16} />My Profile</div>
              <div className="dropdown-item"><SettingsIcon size={16} />Settings</div>
              <div className="dropdown-divider" />
              <div className="dropdown-item danger"><LogOut size={16} />Log out</div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .header { position: fixed; top: 0; left: var(--sidebar-width); right: 0; height: var(--header-height); background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border-light); display: flex; align-items: center; justify-content: space-between; padding: 0 var(--space-8); z-index: 50; transition: left var(--transition-base); }
        .header-left { flex: 1; }
        .page-title { font-size: var(--font-size-xl); font-weight: 700; color: var(--text-primary); }
        
        .header-center { flex: 2; max-width: 480px; margin: 0 var(--space-8); }
        .search-bar { position: relative; display: flex; align-items: center; background: var(--bg-tertiary); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: var(--space-3) var(--space-4); transition: all var(--transition-fast); }
        .search-bar:focus-within { border-color: var(--accent-gold); box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.1); }
        .search-icon { color: var(--text-muted); margin-right: var(--space-3); }
        .search-bar input { flex: 1; background: none; border: none; outline: none; color: var(--text-primary); font-size: var(--font-size-sm); }
        .search-bar input::placeholder { color: var(--text-muted); }
        .search-bar kbd { padding: var(--space-1) var(--space-2); background: var(--bg-secondary); border: 1px solid var(--border-light); border-radius: var(--radius-sm); font-size: var(--font-size-xs); color: var(--text-muted); }
        
        .header-right { display: flex; align-items: center; gap: var(--space-4); }
        .dropdown { position: relative; }
        .notif-btn { position: relative; }
        .notif-badge { position: absolute; top: 2px; right: 2px; width: 18px; height: 18px; background: var(--accent-coral); border-radius: var(--radius-full); font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; color: white; border: 2px solid var(--bg-secondary); }
        
        .dropdown-menu { position: absolute; top: calc(100% + var(--space-2)); right: 0; background: var(--bg-secondary); border: 1px solid var(--border-light); border-radius: var(--radius-xl); box-shadow: var(--shadow-xl); min-width: 240px; animation: slideDown 0.2s ease; z-index: 100; }
        .notif-menu { width: 360px; }
        .dropdown-header { display: flex; justify-content: space-between; align-items: center; padding: var(--space-4); border-bottom: 1px solid var(--border-light); font-weight: 600; }
        .notif-list { max-height: 300px; overflow-y: auto; }
        .notif-item { display: flex; gap: var(--space-3); padding: var(--space-4); border-bottom: 1px solid var(--border-light); cursor: pointer; transition: background var(--transition-fast); }
        .notif-item:hover { background: var(--bg-tertiary); }
        .notif-dot { width: 8px; height: 8px; border-radius: var(--radius-full); margin-top: 6px; flex-shrink: 0; }
        .notif-item.warning .notif-dot { background: var(--accent-gold); }
        .notif-item.success .notif-dot { background: var(--accent-emerald); }
        .notif-item.info .notif-dot { background: var(--accent-blue); }
        .notif-content p { font-size: var(--font-size-sm); margin-bottom: var(--space-1); color: var(--text-primary); }
        .notif-content span { font-size: var(--font-size-xs); color: var(--text-muted); }
        
        .profile-btn { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) var(--space-3); background: none; border: 1px solid var(--border-light); border-radius: var(--radius-lg); cursor: pointer; color: var(--text-primary); transition: all var(--transition-fast); }
        .profile-btn:hover { background: var(--bg-tertiary); border-color: var(--border-medium); }
        .profile-info { text-align: left; }
        .profile-name { display: block; font-size: var(--font-size-sm); font-weight: 600; }
        .profile-role { font-size: var(--font-size-xs); color: var(--text-muted); }
        
        .profile-menu { padding: var(--space-2); }
        .dropdown-item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); cursor: pointer; font-size: var(--font-size-sm); color: var(--text-secondary); transition: all var(--transition-fast); }
        .dropdown-item:hover { background: var(--bg-tertiary); color: var(--text-primary); }
        .dropdown-item.danger { color: var(--accent-coral); }
        .dropdown-divider { height: 1px; background: var(--border-light); margin: var(--space-2) 0; }
        
        @media (max-width: 768px) { .header { left: 0; padding: 0 var(--space-4); } .header-center, .profile-info { display: none; } }
      `}</style>
    </header>
  );
}
