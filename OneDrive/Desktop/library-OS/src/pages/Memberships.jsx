import { useState } from 'react';
import { Plus, Edit2, Trash2, Users, TrendingUp, Star, Check, Crown } from 'lucide-react';

const plans = [
    { id: 1, name: 'Basic', price: 1000, duration: '1 Month', features: ['General seating', '8 AM - 8 PM access', 'Basic support'], subscribers: 45, revenue: 45000, popular: false, color: '#4a4a5a' },
    { id: 2, name: 'Standard', price: 2500, duration: '3 Months', features: ['General seating', '7 AM - 10 PM access', 'Locker included', 'Priority support'], subscribers: 62, revenue: 155000, popular: true, color: '#c9a227' },
    { id: 3, name: 'Premium', price: 4000, duration: '6 Months', features: ['AC zone seating', '24/7 access', 'Private locker', 'Free snacks', 'Priority support'], subscribers: 28, revenue: 112000, popular: false, color: '#2563eb' },
    { id: 4, name: 'VIP', price: 8000, duration: '12 Months', features: ['Private cabin', '24/7 access', 'Premium locker', 'Unlimited snacks', 'Personal assistant', 'Guest passes'], subscribers: 12, revenue: 96000, popular: false, color: '#1a1a2e' },
];

const recentTransactions = [
    { student: 'Rahul Sharma', plan: 'Standard', amount: 2500, date: '10 Dec 2024', type: 'renewal' },
    { student: 'Priya Singh', plan: 'Premium', amount: 4000, date: '09 Dec 2024', type: 'upgrade' },
    { student: 'Amit Kumar', plan: 'Basic', amount: 1000, date: '08 Dec 2024', type: 'new' },
    { student: 'Neha Gupta', plan: 'VIP', amount: 8000, date: '07 Dec 2024', type: 'renewal' },
];

export default function Memberships() {
    const totalRevenue = plans.reduce((sum, p) => sum + p.revenue, 0);
    const totalSubscribers = plans.reduce((sum, p) => sum + p.subscribers, 0);

    return (
        <div className="memberships-page">
            <div className="page-header"><div><h1>Memberships</h1><p>Manage your membership plans and pricing</p></div><button className="btn btn-primary"><Plus size={18} />Create Plan</button></div>

            <div className="stats-row">
                <div className="stat-card card-3d"><div className="stat-icon"><Users size={24} /></div><div><span className="stat-value">{totalSubscribers}</span><span className="stat-label">Total Members</span></div></div>
                <div className="stat-card card-3d"><div className="stat-icon gold"><TrendingUp size={24} /></div><div><span className="stat-value">₹{(totalRevenue / 1000).toFixed(0)}K</span><span className="stat-label">Total Revenue</span></div></div>
                <div className="stat-card card-3d"><div className="stat-icon emerald"><Star size={24} /></div><div><span className="stat-value">₹{Math.round(totalRevenue / totalSubscribers)}</span><span className="stat-label">Avg. per Member</span></div></div>
            </div>

            <h2 className="section-title">Active Plans</h2>
            <div className="plans-grid">
                {plans.map(plan => (
                    <div key={plan.id} className={`plan-card card-3d ${plan.popular ? 'popular' : ''}`}>
                        {plan.popular && <div className="popular-tag"><Crown size={12} /> Most Popular</div>}
                        <div className="plan-header"><div className="plan-icon" style={{ background: plan.color }}>{plan.name[0]}</div><div className="plan-actions"><button className="icon-btn"><Edit2 size={16} /></button><button className="icon-btn danger"><Trash2 size={16} /></button></div></div>
                        <h3>{plan.name}</h3>
                        <div className="plan-price"><span className="amount">₹{plan.price.toLocaleString()}</span><span className="duration">/ {plan.duration}</span></div>
                        <ul className="plan-features">{plan.features.map((f, i) => (<li key={i}><Check size={14} />{f}</li>))}</ul>
                        <div className="plan-stats"><div className="plan-stat"><span className="num">{plan.subscribers}</span><span className="lbl">Members</span></div><div className="plan-stat"><span className="num">₹{(plan.revenue / 1000).toFixed(0)}K</span><span className="lbl">Revenue</span></div></div>
                    </div>
                ))}
            </div>

            <div className="transactions-section card-3d">
                <h2 className="section-title">Recent Transactions</h2>
                <div className="transactions-table">
                    <div className="table-header"><span>Student</span><span>Plan</span><span>Amount</span><span>Date</span><span>Type</span></div>
                    {recentTransactions.map((t, i) => (<div key={i} className="table-row"><span className="student-name">{t.student}</span><span className="plan-name">{t.plan}</span><span className="amount">₹{t.amount.toLocaleString()}</span><span className="date">{t.date}</span><span className={`type-badge ${t.type}`}>{t.type}</span></div>))}
                </div>
            </div>

            <style>{`
        .memberships-page { animation: fadeIn 0.3s ease; }
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-8); }
        .page-header h1 { font-size: var(--font-size-3xl); margin-bottom: var(--space-2); }
        .page-header p { color: var(--text-secondary); }
        
        .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-6); margin-bottom: var(--space-8); }
        .stat-card { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-6); }
        .stat-icon { width: 56px; height: 56px; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; background: var(--gradient-dark); color: white; }
        .stat-icon.gold { background: var(--gradient-warm); }
        .stat-icon.emerald { background: var(--accent-emerald); }
        .stat-value { display: block; font-size: var(--font-size-2xl); font-weight: 800; }
        .stat-label { color: var(--text-secondary); font-size: var(--font-size-sm); }
        
        .section-title { font-size: var(--font-size-xl); margin-bottom: var(--space-6); }
        
        .plans-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-6); margin-bottom: var(--space-10); }
        .plan-card { position: relative; padding: var(--space-6); }
        .plan-card.popular { border-color: var(--accent-gold); box-shadow: var(--shadow-gold); background: var(--bg-warm); }
        .popular-tag { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: var(--space-1); padding: var(--space-1) var(--space-3); background: var(--gradient-warm); border-radius: var(--radius-full); font-size: var(--font-size-xs); font-weight: 600; color: white; }
        .plan-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); }
        .plan-icon { width: 44px; height: 44px; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: var(--font-size-lg); color: white; }
        .plan-actions { display: flex; gap: var(--space-2); }
        .icon-btn { width: 32px; height: 32px; border-radius: var(--radius-md); background: var(--bg-tertiary); border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all var(--transition-fast); }
        .icon-btn:hover { background: var(--accent-primary); color: white; }
        .icon-btn.danger:hover { background: var(--accent-coral); }
        .plan-card h3 { font-size: var(--font-size-xl); margin-bottom: var(--space-2); }
        .plan-price { margin-bottom: var(--space-4); }
        .plan-price .amount { font-size: var(--font-size-3xl); font-weight: 800; }
        .plan-price .duration { color: var(--text-muted); }
        .plan-features { list-style: none; margin-bottom: var(--space-6); }
        .plan-features li { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-2) 0; color: var(--text-secondary); font-size: var(--font-size-sm); }
        .plan-features svg { color: var(--accent-emerald); flex-shrink: 0; }
        .plan-stats { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); padding-top: var(--space-4); border-top: 1px solid var(--border-light); }
        .plan-stat { text-align: center; }
        .plan-stat .num { display: block; font-size: var(--font-size-lg); font-weight: 700; }
        .plan-stat .lbl { font-size: var(--font-size-xs); color: var(--text-muted); }
        
        .transactions-section { padding: var(--space-6); }
        .table-header, .table-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: var(--space-4); padding: var(--space-4); align-items: center; }
        .table-header { background: var(--bg-tertiary); border-radius: var(--radius-lg); font-size: var(--font-size-xs); font-weight: 600; text-transform: uppercase; color: var(--text-muted); margin-bottom: var(--space-2); }
        .table-row { border-bottom: 1px solid var(--border-light); }
        .table-row:last-child { border-bottom: none; }
        .student-name { font-weight: 600; }
        .type-badge { padding: var(--space-1) var(--space-2); border-radius: var(--radius-sm); font-size: var(--font-size-xs); font-weight: 600; text-transform: capitalize; }
        .type-badge.new { background: rgba(5, 150, 105, 0.1); color: var(--accent-emerald); }
        .type-badge.renewal { background: rgba(201, 162, 39, 0.1); color: var(--accent-gold-dark); }
        .type-badge.upgrade { background: rgba(37, 99, 235, 0.1); color: var(--accent-blue); }
        
        @media (max-width: 768px) { .table-header, .table-row { grid-template-columns: 1fr 1fr; } .table-header span:nth-child(n+3), .table-row span:nth-child(n+3) { display: none; } }
      `}</style>
        </div>
    );
}
