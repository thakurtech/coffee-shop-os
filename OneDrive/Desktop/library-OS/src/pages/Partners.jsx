import { useState } from 'react';
import { Plus, Store, TrendingUp, Percent, ExternalLink, Edit2, MoreHorizontal } from 'lucide-react';

const partners = [
    { id: 1, name: 'Chai Point', category: 'Food & Beverage', logo: '☕', commission: 15, monthlyRevenue: 4200, orders: 280, status: 'Active', since: 'Oct 2024' },
    { id: 2, name: 'Stationery Hub', category: 'Stationery', logo: '📝', commission: 10, monthlyRevenue: 1800, orders: 120, status: 'Active', since: 'Sep 2024' },
    { id: 3, name: 'Career Prep', category: 'Coaching', logo: '🎓', commission: 20, monthlyRevenue: 6000, orders: 15, status: 'Active', since: 'Nov 2024' },
    { id: 4, name: 'Print Express', category: 'Services', logo: '🖨️', commission: 12, monthlyRevenue: 960, orders: 80, status: 'Active', since: 'Oct 2024' },
    { id: 5, name: 'Snack Box', category: 'Food & Beverage', logo: '🍕', commission: 18, monthlyRevenue: 2700, orders: 150, status: 'Pending', since: 'Dec 2024' },
];

const transactions = [
    { partner: 'Chai Point', student: 'Rahul S.', item: 'Chai + Samosa Combo', amount: 60, commission: 9, date: '10 Dec' },
    { partner: 'Career Prep', student: 'Priya G.', item: 'CAT Mock Test', amount: 500, commission: 100, date: '10 Dec' },
    { partner: 'Stationery Hub', student: 'Amit K.', item: 'Notebook Set', amount: 150, commission: 15, date: '09 Dec' },
    { partner: 'Print Express', student: 'Neha V.', item: 'Notes Printing', amount: 80, commission: 10, date: '09 Dec' },
];

export default function Partners() {
    const [showAddModal, setShowAddModal] = useState(false);
    const totalRevenue = partners.reduce((sum, p) => sum + p.monthlyRevenue, 0);
    const avgCommission = Math.round(partners.reduce((sum, p) => sum + p.commission, 0) / partners.length);

    return (
        <div className="partners-page">
            <div className="page-header">
                <div><h1>Partner Marketplace</h1><p>Manage vendor partnerships and commissions</p></div>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}><Plus size={18} />Add Partner</button>
            </div>

            <div className="stats-row">
                <div className="stat-card">
                    <div className="stat-icon purple"><Store size={24} /></div>
                    <div><span className="stat-value">{partners.length}</span><span className="stat-label">Active Partners</span></div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon green"><TrendingUp size={24} /></div>
                    <div><span className="stat-value">₹{(totalRevenue / 1000).toFixed(1)}K</span><span className="stat-label">Monthly Commissions</span></div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon amber"><Percent size={24} /></div>
                    <div><span className="stat-value">{avgCommission}%</span><span className="stat-label">Avg Commission Rate</span></div>
                </div>
            </div>

            <div className="partners-grid">
                {partners.map(partner => (
                    <div key={partner.id} className={`partner-card ${partner.status.toLowerCase()}`}>
                        <div className="card-header">
                            <div className="partner-logo">{partner.logo}</div>
                            <div className="partner-info">
                                <h3>{partner.name}</h3>
                                <span className="category">{partner.category}</span>
                            </div>
                            <span className={`status-badge ${partner.status.toLowerCase()}`}>{partner.status}</span>
                        </div>

                        <div className="partner-stats">
                            <div className="p-stat"><span className="label">Commission</span><span className="value">{partner.commission}%</span></div>
                            <div className="p-stat"><span className="label">Monthly Revenue</span><span className="value highlight">₹{partner.monthlyRevenue.toLocaleString()}</span></div>
                            <div className="p-stat"><span className="label">Orders</span><span className="value">{partner.orders}</span></div>
                        </div>

                        <div className="card-footer">
                            <span className="since">Partner since {partner.since}</span>
                            <div className="actions">
                                <button className="btn btn-sm btn-ghost"><Edit2 size={14} /></button>
                                <button className="btn btn-sm btn-ghost"><ExternalLink size={14} /></button>
                            </div>
                        </div>
                    </div>
                ))}

                <button className="add-partner-card" onClick={() => setShowAddModal(true)}>
                    <Plus size={32} />
                    <span>Add New Partner</span>
                </button>
            </div>

            <div className="transactions-section">
                <h2>Recent Transactions</h2>
                <div className="transactions-list">
                    {transactions.map((t, i) => (
                        <div key={i} className="transaction-item">
                            <div className="t-partner">{partners.find(p => p.name === t.partner)?.logo} {t.partner}</div>
                            <div className="t-details"><span className="t-student">{t.student}</span><span className="t-item">{t.item}</span></div>
                            <div className="t-amount">₹{t.amount}</div>
                            <div className="t-commission">+₹{t.commission}</div>
                            <div className="t-date">{t.date}</div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .partners-page { animation: fadeIn 0.3s ease; }
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-8); }
        .page-header h1 { font-size: var(--font-size-3xl); margin-bottom: var(--space-2); }
        .page-header p { color: var(--text-secondary); }
        
        .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-6); margin-bottom: var(--space-8); }
        .stat-card { display: flex; align-items: center; gap: var(--space-4); background: var(--bg-glass); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: var(--space-6); }
        .stat-icon { width: 56px; height: 56px; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: white; }
        .stat-icon.purple { background: var(--accent-purple); }
        .stat-icon.green { background: var(--accent-green); }
        .stat-icon.amber { background: var(--accent-amber); }
        .stat-value { display: block; font-size: var(--font-size-2xl); font-weight: 800; }
        .stat-label { color: var(--text-secondary); font-size: var(--font-size-sm); }
        
        .partners-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-6); margin-bottom: var(--space-10); }
        .partner-card { background: var(--bg-glass); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: var(--space-6); transition: all var(--transition-base); }
        .partner-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-glow); }
        .partner-card.pending { opacity: 0.7; }
        
        .card-header { display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-6); }
        .partner-logo { width: 48px; height: 48px; background: var(--bg-tertiary); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .partner-info { flex: 1; }
        .partner-info h3 { font-size: var(--font-size-lg); margin-bottom: var(--space-1); }
        .category { font-size: var(--font-size-sm); color: var(--text-muted); }
        .status-badge { padding: var(--space-1) var(--space-3); border-radius: var(--radius-full); font-size: var(--font-size-xs); font-weight: 600; }
        .status-badge.active { background: rgba(16, 185, 129, 0.15); color: var(--accent-green); }
        .status-badge.pending { background: rgba(245, 158, 11, 0.15); color: var(--accent-amber); }
        
        .partner-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); margin-bottom: var(--space-6); }
        .p-stat { text-align: center; padding: var(--space-3); background: var(--bg-tertiary); border-radius: var(--radius-md); }
        .p-stat .label { display: block; font-size: var(--font-size-xs); color: var(--text-muted); margin-bottom: var(--space-1); }
        .p-stat .value { font-weight: 700; }
        .p-stat .value.highlight { color: var(--accent-green); }
        
        .card-footer { display: flex; justify-content: space-between; align-items: center; }
        .since { font-size: var(--font-size-xs); color: var(--text-muted); }
        .actions { display: flex; gap: var(--space-2); }
        
        .add-partner-card { background: var(--bg-tertiary); border: 2px dashed var(--border-subtle); border-radius: var(--radius-xl); padding: var(--space-8); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--space-4); color: var(--text-muted); cursor: pointer; transition: all var(--transition-fast); }
        .add-partner-card:hover { border-color: var(--accent-purple); color: var(--accent-purple); }
        
        .transactions-section { background: var(--bg-glass); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: var(--space-6); }
        .transactions-section h2 { font-size: var(--font-size-xl); margin-bottom: var(--space-6); }
        .transaction-item { display: grid; grid-template-columns: 2fr 3fr 1fr 1fr 1fr; gap: var(--space-4); padding: var(--space-4) 0; border-bottom: 1px solid var(--border-subtle); align-items: center; }
        .transaction-item:last-child { border-bottom: none; }
        .t-partner { display: flex; align-items: center; gap: var(--space-2); font-weight: 600; }
        .t-details { display: flex; flex-direction: column; }
        .t-student { font-weight: 500; }
        .t-item { font-size: var(--font-size-sm); color: var(--text-muted); }
        .t-commission { color: var(--accent-green); font-weight: 600; }
        .t-date { color: var(--text-muted); font-size: var(--font-size-sm); }
        
        @media (max-width: 768px) { .transaction-item { grid-template-columns: 1fr 1fr; } .t-details, .t-date { display: none; } }
      `}</style>
        </div>
    );
}
