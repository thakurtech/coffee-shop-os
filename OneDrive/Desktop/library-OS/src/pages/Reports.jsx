import { Download, Calendar, Filter, TrendingUp, TrendingDown, Users, CreditCard, Handshake, Trophy } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const monthlyRevenue = [
    { month: 'Jul', memberships: 35000, upsells: 8000, partners: 5000, referrals: 2000 },
    { month: 'Aug', memberships: 38000, upsells: 9500, partners: 6200, referrals: 2500 },
    { month: 'Sep', memberships: 36000, upsells: 8800, partners: 5800, referrals: 2200 },
    { month: 'Oct', memberships: 42000, upsells: 11000, partners: 7500, referrals: 3500 },
    { month: 'Nov', memberships: 45000, upsells: 12500, partners: 8200, referrals: 4000 },
    { month: 'Dec', memberships: 48000, upsells: 13500, partners: 9000, referrals: 4500 },
];

const peakHours = [
    { hour: '8AM', occupancy: 45 }, { hour: '9AM', occupancy: 65 }, { hour: '10AM', occupancy: 85 },
    { hour: '11AM', occupancy: 92 }, { hour: '12PM', occupancy: 78 }, { hour: '1PM', occupancy: 55 },
    { hour: '2PM', occupancy: 70 }, { hour: '3PM', occupancy: 88 }, { hour: '4PM', occupancy: 95 },
    { hour: '5PM', occupancy: 92 }, { hour: '6PM', occupancy: 85 }, { hour: '7PM', occupancy: 65 },
];

const revenueBySource = [
    { name: 'Memberships', value: 65, color: '#8b5cf6' },
    { name: 'Upsells', value: 18, color: '#06b6d4' },
    { name: 'Partners', value: 12, color: '#10b981' },
    { name: 'Referrals', value: 5, color: '#f59e0b' },
];

export default function Reports() {
    const kpis = [
        { label: 'Total Revenue', value: '₹75,000', change: '+18%', trend: 'up', icon: TrendingUp, color: '#10b981' },
        { label: 'Active Students', value: '142', change: '+12', trend: 'up', icon: Users, color: '#8b5cf6' },
        { label: 'Avg Revenue/Student', value: '₹528', change: '+8%', trend: 'up', icon: CreditCard, color: '#06b6d4' },
        { label: 'Churn Rate', value: '11%', change: '-3%', trend: 'down', icon: TrendingDown, color: '#f59e0b' },
    ];

    return (
        <div className="reports-page">
            <div className="page-header">
                <div><h1>Analytics & Reports</h1><p>Comprehensive insights into your library's performance</p></div>
                <div className="header-actions">
                    <div className="date-range"><Calendar size={18} /><span>Dec 1 - Dec 11, 2024</span></div>
                    <button className="btn btn-secondary"><Download size={18} />Export</button>
                </div>
            </div>

            <div className="kpi-grid">
                {kpis.map((kpi, i) => {
                    const Icon = kpi.icon;
                    return (
                        <div key={i} className="kpi-card">
                            <div className="kpi-icon" style={{ background: kpi.color }}><Icon size={22} /></div>
                            <div className="kpi-content"><span className="kpi-label">{kpi.label}</span><span className="kpi-value">{kpi.value}</span></div>
                            <span className={`kpi-change ${kpi.trend}`}>{kpi.change}</span>
                        </div>
                    );
                })}
            </div>

            <div className="charts-grid">
                <div className="chart-card large">
                    <div className="card-header"><h3>Revenue Breakdown by Source</h3></div>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={monthlyRevenue}>
                            <defs>
                                <linearGradient id="colorMemberships" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} /><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} /></linearGradient>
                                <linearGradient id="colorUpsells" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} /><stop offset="95%" stopColor="#06b6d4" stopOpacity={0} /></linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
                            <Tooltip contentStyle={{ background: '#1a1a24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                            <Area type="monotone" dataKey="memberships" stackId="1" stroke="#8b5cf6" fill="url(#colorMemberships)" />
                            <Area type="monotone" dataKey="upsells" stackId="1" stroke="#06b6d4" fill="url(#colorUpsells)" />
                            <Area type="monotone" dataKey="partners" stackId="1" stroke="#10b981" fill="rgba(16, 185, 129, 0.2)" />
                            <Area type="monotone" dataKey="referrals" stackId="1" stroke="#f59e0b" fill="rgba(245, 158, 11, 0.2)" />
                        </AreaChart>
                    </ResponsiveContainer>
                    <div className="chart-legend">
                        <span><span className="dot" style={{ background: '#8b5cf6' }} />Memberships</span>
                        <span><span className="dot" style={{ background: '#06b6d4' }} />Upsells</span>
                        <span><span className="dot" style={{ background: '#10b981' }} />Partners</span>
                        <span><span className="dot" style={{ background: '#f59e0b' }} />Referrals</span>
                    </div>
                </div>

                <div className="chart-card">
                    <div className="card-header"><h3>Revenue Distribution</h3></div>
                    <div className="pie-container">
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart><Pie data={revenueBySource} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">{revenueBySource.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie></PieChart>
                        </ResponsiveContainer>
                        <div className="pie-stats">
                            {revenueBySource.map((s, i) => (<div key={i} className="pie-stat"><span className="dot" style={{ background: s.color }} /><span className="name">{s.name}</span><span className="pct">{s.value}%</span></div>))}
                        </div>
                    </div>
                </div>

                <div className="chart-card">
                    <div className="card-header"><h3>Peak Hours Analysis</h3></div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={peakHours}><XAxis dataKey="hour" stroke="#64748b" fontSize={10} /><YAxis stroke="#64748b" fontSize={10} /><Bar dataKey="occupancy" fill="#8b5cf6" radius={[4, 4, 0, 0]} /></BarChart>
                    </ResponsiveContainer>
                    <p className="chart-note">Peak occupancy: 4-5 PM (95%)</p>
                </div>
            </div>

            <style>{`
        .reports-page { animation: fadeIn 0.3s ease; }
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-8); flex-wrap: wrap; gap: var(--space-4); }
        .page-header h1 { font-size: var(--font-size-3xl); margin-bottom: var(--space-2); }
        .page-header p { color: var(--text-secondary); }
        .header-actions { display: flex; gap: var(--space-4); }
        .date-range { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-3) var(--space-4); background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); font-size: var(--font-size-sm); }
        
        .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-6); margin-bottom: var(--space-8); }
        .kpi-card { display: flex; align-items: center; gap: var(--space-4); background: var(--bg-glass); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: var(--space-5); }
        .kpi-icon { width: 48px; height: 48px; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: white; }
        .kpi-content { flex: 1; }
        .kpi-label { display: block; font-size: var(--font-size-sm); color: var(--text-muted); }
        .kpi-value { font-size: var(--font-size-xl); font-weight: 800; }
        .kpi-change { font-size: var(--font-size-sm); font-weight: 600; padding: var(--space-1) var(--space-2); border-radius: var(--radius-sm); }
        .kpi-change.up { color: var(--accent-green); background: rgba(16, 185, 129, 0.1); }
        .kpi-change.down { color: var(--accent-amber); background: rgba(245, 158, 11, 0.1); }
        
        .charts-grid { display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-6); }
        .chart-card { background: var(--bg-glass); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: var(--space-6); }
        .chart-card.large { grid-column: span 2; }
        .card-header { margin-bottom: var(--space-4); }
        .card-header h3 { font-size: var(--font-size-lg); }
        .chart-legend { display: flex; justify-content: center; gap: var(--space-6); margin-top: var(--space-4); font-size: var(--font-size-sm); color: var(--text-muted); }
        .chart-legend span { display: flex; align-items: center; gap: var(--space-2); }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .pie-container { display: flex; align-items: center; gap: var(--space-4); }
        .pie-stats { flex: 1; }
        .pie-stat { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-2) 0; font-size: var(--font-size-sm); }
        .pie-stat .name { flex: 1; }
        .pie-stat .pct { font-weight: 600; }
        .chart-note { text-align: center; font-size: var(--font-size-sm); color: var(--accent-purple); margin-top: var(--space-4); }
        
        @media (max-width: 1024px) { .charts-grid { grid-template-columns: 1fr; } .chart-card.large { grid-column: span 1; } }
      `}</style>
        </div>
    );
}
