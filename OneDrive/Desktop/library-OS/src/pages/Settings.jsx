import { useState } from 'react';
import { Building2, Clock, Bell, CreditCard, Shield, Palette, Save, Upload } from 'lucide-react';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'General', icon: Building2 },
        { id: 'hours', label: 'Operating Hours', icon: Clock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'billing', label: 'Billing', icon: CreditCard },
    ];

    return (
        <div className="settings-page">
            <div className="page-header"><h1>Settings</h1><p>Configure your library preferences</p></div>

            <div className="settings-layout">
                <div className="settings-sidebar">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (<button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}><Icon size={18} />{tab.label}</button>);
                    })}
                </div>

                <div className="settings-content">
                    {activeTab === 'general' && (
                        <div className="settings-section">
                            <h2>Library Information</h2>
                            <div className="form-grid">
                                <div className="input-group"><label>Library Name</label><input type="text" className="input" defaultValue="Study Hub Delhi" /></div>
                                <div className="input-group"><label>Email</label><input type="email" className="input" defaultValue="admin@studyhub.com" /></div>
                                <div className="input-group"><label>Phone</label><input type="tel" className="input" defaultValue="+91 98765-43210" /></div>
                                <div className="input-group"><label>Address</label><input type="text" className="input" defaultValue="123 Education Lane, New Delhi" /></div>
                                <div className="input-group full"><label>Description</label><textarea className="input" rows={3} defaultValue="A modern study space for students preparing for competitive exams." /></div>
                            </div>
                            <div className="logo-section">
                                <label>Library Logo</label>
                                <div className="logo-upload"><div className="logo-preview">📚</div><button className="btn btn-secondary"><Upload size={16} />Upload Logo</button></div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'hours' && (
                        <div className="settings-section">
                            <h2>Operating Hours</h2>
                            <div className="hours-grid">
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                    <div key={day} className="hours-row">
                                        <span className="day-name">{day}</span>
                                        <input type="time" className="input time" defaultValue="08:00" />
                                        <span>to</span>
                                        <input type="time" className="input time" defaultValue="22:00" />
                                        <label className="toggle"><input type="checkbox" defaultChecked={day !== 'Sunday'} /><span className="slider" /></label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="settings-section">
                            <h2>Notification Preferences</h2>
                            <div className="notification-options">
                                {[
                                    { label: 'New student registration', desc: 'Get notified when a new student signs up', enabled: true },
                                    { label: 'Membership renewals', desc: 'Alerts for upcoming and completed renewals', enabled: true },
                                    { label: 'At-risk student alerts', desc: 'Notify when students are at risk of churning', enabled: true },
                                    { label: 'Partner transactions', desc: 'Updates on partner marketplace sales', enabled: false },
                                    { label: 'Weekly revenue reports', desc: 'Receive weekly summary via email', enabled: true },
                                ].map((n, i) => (
                                    <div key={i} className="notification-item">
                                        <div className="notif-info"><span className="notif-label">{n.label}</span><span className="notif-desc">{n.desc}</span></div>
                                        <label className="toggle"><input type="checkbox" defaultChecked={n.enabled} /><span className="slider" /></label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'billing' && (
                        <div className="settings-section">
                            <h2>Billing & Subscription</h2>
                            <div className="plan-card">
                                <div className="plan-info"><span className="plan-name">Growth Plan</span><span className="plan-price">₹2,499/month</span></div>
                                <span className="badge badge-success">Active</span>
                            </div>
                            <div className="billing-details">
                                <div className="detail-row"><span>Next billing date</span><span>January 10, 2025</span></div>
                                <div className="detail-row"><span>Payment method</span><span>•••• 4242</span></div>
                            </div>
                            <div className="billing-actions"><button className="btn btn-secondary">Change Plan</button><button className="btn btn-ghost">Update Payment</button></div>
                        </div>
                    )}

                    <div className="save-bar"><button className="btn btn-primary"><Save size={18} />Save Changes</button></div>
                </div>
            </div>

            <style>{`
        .settings-page { animation: fadeIn 0.3s ease; }
        .page-header { margin-bottom: var(--space-8); }
        .page-header h1 { font-size: var(--font-size-3xl); margin-bottom: var(--space-2); }
        .page-header p { color: var(--text-secondary); }
        
        .settings-layout { display: grid; grid-template-columns: 240px 1fr; gap: var(--space-6); }
        .settings-sidebar { background: var(--bg-glass); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: var(--space-4); height: fit-content; }
        .tab-btn { display: flex; align-items: center; gap: var(--space-3); width: 100%; padding: var(--space-3) var(--space-4); background: none; border: none; border-radius: var(--radius-lg); color: var(--text-secondary); cursor: pointer; font-size: var(--font-size-sm); text-align: left; transition: all var(--transition-fast); }
        .tab-btn:hover { background: var(--bg-tertiary); color: var(--text-primary); }
        .tab-btn.active { background: rgba(139, 92, 246, 0.15); color: var(--accent-purple); }
        
        .settings-content { background: var(--bg-glass); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: var(--space-8); }
        .settings-section h2 { font-size: var(--font-size-xl); margin-bottom: var(--space-6); }
        
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); margin-bottom: var(--space-6); }
        .form-grid .full { grid-column: span 2; }
        .input-group textarea { resize: vertical; }
        
        .logo-section { margin-bottom: var(--space-8); }
        .logo-section label { display: block; margin-bottom: var(--space-3); font-size: var(--font-size-sm); color: var(--text-secondary); }
        .logo-upload { display: flex; align-items: center; gap: var(--space-4); }
        .logo-preview { width: 80px; height: 80px; background: var(--bg-tertiary); border-radius: var(--radius-xl); display: flex; align-items: center; justify-content: center; font-size: 40px; }
        
        .hours-grid { display: flex; flex-direction: column; gap: var(--space-4); }
        .hours-row { display: flex; align-items: center; gap: var(--space-4); }
        .day-name { width: 100px; font-weight: 500; }
        .input.time { width: 120px; }
        
        .toggle { position: relative; width: 44px; height: 24px; cursor: pointer; }
        .toggle input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: var(--bg-tertiary); border-radius: var(--radius-full); transition: all var(--transition-fast); }
        .slider::before { content: ''; position: absolute; width: 18px; height: 18px; left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: all var(--transition-fast); }
        .toggle input:checked + .slider { background: var(--accent-purple); }
        .toggle input:checked + .slider::before { transform: translateX(20px); }
        
        .notification-options { display: flex; flex-direction: column; gap: var(--space-4); }
        .notification-item { display: flex; align-items: center; justify-content: space-between; padding: var(--space-4); background: var(--bg-tertiary); border-radius: var(--radius-lg); }
        .notif-label { display: block; font-weight: 600; }
        .notif-desc { font-size: var(--font-size-sm); color: var(--text-muted); }
        
        .plan-card { display: flex; align-items: center; justify-content: space-between; padding: var(--space-6); background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%); border: 1px solid var(--accent-purple); border-radius: var(--radius-xl); margin-bottom: var(--space-6); }
        .plan-name { display: block; font-size: var(--font-size-lg); font-weight: 700; }
        .plan-price { color: var(--text-secondary); }
        .billing-details { margin-bottom: var(--space-6); }
        .detail-row { display: flex; justify-content: space-between; padding: var(--space-3) 0; border-bottom: 1px solid var(--border-subtle); }
        .billing-actions { display: flex; gap: var(--space-4); }
        
        .save-bar { padding-top: var(--space-6); border-top: 1px solid var(--border-subtle); margin-top: var(--space-8); }
        
        @media (max-width: 768px) { .settings-layout { grid-template-columns: 1fr; } .form-grid { grid-template-columns: 1fr; } .form-grid .full { grid-column: span 1; } }
      `}</style>
        </div>
    );
}
