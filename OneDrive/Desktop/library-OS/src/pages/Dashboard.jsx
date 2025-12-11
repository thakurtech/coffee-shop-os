import { TrendingUp, Users, CreditCard, Trophy, ArrowUpRight, ArrowDownRight, Target, Zap, AlertTriangle, Calendar, ChevronRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const revenueData = [
    { month: 'Jul', revenue: 12000, target: 20000 },
    { month: 'Aug', revenue: 14500, target: 20000 },
    { month: 'Sep', revenue: 13200, target: 20000 },
    { month: 'Oct', revenue: 16800, target: 20000 },
    { month: 'Nov', revenue: 15400, target: 20000 },
    { month: 'Dec', revenue: 18600, target: 20000 },
];

const revenueBreakdown = [
    { name: 'Memberships', value: 45, color: '#1a1a2e' },
    { name: 'Upsells', value: 25, color: '#c9a227' },
    { name: 'Partners', value: 20, color: '#059669' },
    { name: 'Referrals', value: 10, color: '#2563eb' },
];

const atRiskStudents = [
    { name: 'Amit Kumar', days: 5, plan: 'Monthly', avatar: 'AK' },
    { name: 'Priya Singh', days: 4, plan: 'Quarterly', avatar: 'PS' },
    { name: 'Rohan Verma', days: 6, plan: 'Monthly', avatar: 'RV' },
];

const recentActivity = [
    { type: 'membership', message: 'Rahul Sharma renewed for 3 months', time: '2 min ago', amount: '+₹2,400' },
    { type: 'upsell', message: 'Premium seat upgrade by Neha Gupta', time: '15 min ago', amount: '+₹500' },
    { type: 'partner', message: 'Chai Point commission credited', time: '1 hour ago', amount: '+₹180' },
    { type: 'referral', message: 'Vikram referred Arun (Gold tier)', time: '3 hours ago', amount: '+₹300' },
];

const quickActions = [
    { icon: Users, label: 'Add Student', color: '#1a1a2e' },
    { icon: CreditCard, label: 'New Membership', color: '#c9a227' },
    { icon: Zap, label: 'Send Reminder', color: '#059669' },
    { icon: Target, label: 'Create Offer', color: '#2563eb' },
];

export default function Dashboard() {
    const stats = [
        { label: 'Monthly Revenue', value: '₹18,600', change: '+12.4%', trend: 'up', icon: TrendingUp, description: 'vs last month' },
        { label: 'Active Students', value: '142', change: '+8', trend: 'up', icon: Users, description: 'this month' },
        { label: 'Retention Rate', value: '89%', change: '+3%', trend: 'up', icon: Trophy, description: '30-day rolling' },
        { label: 'At Risk', value: '5', change: '-2', trend: 'down', icon: AlertTriangle, description: 'need attention' },
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div><h1>Good morning, Admin! 👋</h1><p>Here's your revenue snapshot for December 2024</p></div>
                <div className="goal-tracker">
                    <div className="goal-info"><span className="goal-label">Monthly Goal</span><span className="goal-progress-text"><span className="current">₹18,600</span> / ₹20,000</span></div>
                    <div className="progress"><div className="progress-bar" style={{ width: '93%' }} /></div>
                    <span className="goal-remaining">₹1,400 to go! 🎯</span>
                </div>
            </div>

            <div className="stats-grid">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="stat-card card-3d">
                            <div className="stat-header">
                                <div className={`stat-icon ${stat.trend}`}><Icon size={22} /></div>
                                <span className={`stat-change ${stat.trend}`}>{stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{stat.change}</span>
                            </div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                            <div className="stat-description">{stat.description}</div>
                        </div>
                    );
                })}
            </div>

            <div className="quick-actions">
                {quickActions.map((action, i) => {
                    const Icon = action.icon;
                    return (
                        <button key={i} className="quick-action-btn"><div className="action-icon" style={{ background: action.color }}><Icon size={18} /></div><span>{action.label}</span></button>
                    );
                })}
            </div>

            <div className="charts-row">
                <div className="chart-card card-3d revenue-chart">
                    <div className="card-header"><h3>Revenue Trend</h3><div className="chart-legend"><span className="legend-item"><span className="dot primary" />Revenue</span><span className="legend-item"><span className="dot muted" />Target</span></div></div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={280}>
                            <AreaChart data={revenueData}>
                                <defs><linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c9a227" stopOpacity={0.2} /><stop offset="100%" stopColor="#c9a227" stopOpacity={0} /></linearGradient></defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                                <XAxis dataKey="month" stroke="#8a8a9a" fontSize={12} />
                                <YAxis stroke="#8a8a9a" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
                                <Tooltip contentStyle={{ background: '#fff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                                <Area type="monotone" dataKey="target" stroke="#8a8a9a" strokeDasharray="5 5" fill="none" />
                                <Area type="monotone" dataKey="revenue" stroke="#c9a227" strokeWidth={2} fill="url(#revenueGradient)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart-card card-3d breakdown-chart">
                    <div className="card-header"><h3>Revenue Sources</h3></div>
                    <div className="chart-container pie-container">
                        <ResponsiveContainer width="100%" height={200}><PieChart><Pie data={revenueBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">{revenueBreakdown.map((entry, i) => (<Cell key={i} fill={entry.color} />))}</Pie></PieChart></ResponsiveContainer>
                        <div className="pie-legend">{revenueBreakdown.map((item, i) => (<div key={i} className="pie-legend-item"><span className="dot" style={{ background: item.color }} /><span className="pie-label">{item.name}</span><span className="pie-value">{item.value}%</span></div>))}</div>
                    </div>
                </div>
            </div>

            <div className="bottom-row">
                <div className="card-3d at-risk-card">
                    <div className="card-header"><h3>⚠️ At-Risk Students</h3><button className="btn btn-sm btn-ghost">View all</button></div>
                    <div className="at-risk-list">
                        {atRiskStudents.map((student, i) => (
                            <div key={i} className="at-risk-item"><div className="avatar">{student.avatar}</div><div className="student-info"><span className="student-name">{student.name}</span><span className="student-plan">{student.plan}</span></div><div className="days-absent"><span className="days">{student.days}</span><span className="days-label">days absent</span></div><button className="btn btn-sm btn-primary">Reach out</button></div>
                        ))}
                    </div>
                </div>

                <div className="card-3d activity-card">
                    <div className="card-header"><h3>Recent Activity</h3><button className="btn btn-sm btn-ghost">View all</button></div>
                    <div className="activity-list">
                        {recentActivity.map((activity, i) => (
                            <div key={i} className="activity-item"><div className={`activity-dot ${activity.type}`} /><div className="activity-content"><span className="activity-message">{activity.message}</span><span className="activity-time">{activity.time}</span></div><span className="activity-amount">{activity.amount}</span></div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        .dashboard { animation: fadeIn 0.3s ease; }
        .dashboard-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-8); flex-wrap: wrap; gap: var(--space-6); }
        .dashboard-header h1 { font-size: var(--font-size-3xl); margin-bottom: var(--space-2); }
        .dashboard-header p { color: var(--text-secondary); }
        .goal-tracker { background: var(--bg-warm); border: 1px solid rgba(201, 162, 39, 0.15); border-radius: var(--radius-xl); padding: var(--space-5); min-width: 280px; }
        .goal-info { display: flex; justify-content: space-between; margin-bottom: var(--space-3); }
        .goal-label { font-size: var(--font-size-sm); color: var(--text-muted); }
        .goal-progress-text { font-size: var(--font-size-sm); }
        .goal-progress-text .current { font-weight: 700; color: var(--accent-emerald); }
        .goal-remaining { font-size: var(--font-size-xs); color: var(--accent-gold-dark); display: block; margin-top: var(--space-2); font-weight: 500; }
        
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-6); margin-bottom: var(--space-6); }
        .stat-card { padding: var(--space-6); }
        .stat-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); }
        .stat-icon { width: 48px; height: 48px; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; }
        .stat-icon.up { background: rgba(5, 150, 105, 0.1); color: var(--accent-emerald); }
        .stat-icon.down { background: rgba(220, 38, 38, 0.1); color: var(--accent-coral); }
        .stat-change { display: flex; align-items: center; gap: var(--space-1); font-size: var(--font-size-sm); font-weight: 600; padding: var(--space-1) var(--space-2); border-radius: var(--radius-full); }
        .stat-change.up { color: var(--accent-emerald); background: rgba(5, 150, 105, 0.08); }
        .stat-change.down { color: var(--accent-coral); background: rgba(220, 38, 38, 0.08); }
        .stat-value { font-size: var(--font-size-3xl); font-weight: 800; margin-bottom: var(--space-1); }
        .stat-label { font-size: var(--font-size-sm); color: var(--text-secondary); font-weight: 600; }
        .stat-description { font-size: var(--font-size-xs); color: var(--text-muted); }
        
        .quick-actions { display: flex; gap: var(--space-4); margin-bottom: var(--space-6); flex-wrap: wrap; }
        .quick-action-btn { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) var(--space-5); background: var(--bg-secondary); border: 1px solid var(--border-light); border-radius: var(--radius-lg); cursor: pointer; transition: all var(--transition-fast); color: var(--text-primary); font-weight: 500; box-shadow: var(--shadow-sm); }
        .quick-action-btn:hover { border-color: var(--accent-gold); transform: translateY(-2px); box-shadow: var(--shadow-md); }
        .action-icon { width: 36px; height: 36px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: white; }
        
        .charts-row { display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-6); margin-bottom: var(--space-6); }
        .chart-card { padding: var(--space-6); }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); }
        .card-header h3 { font-size: var(--font-size-lg); }
        .chart-legend { display: flex; gap: var(--space-4); }
        .legend-item { display: flex; align-items: center; gap: var(--space-2); font-size: var(--font-size-sm); color: var(--text-muted); }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.primary { background: var(--accent-gold); }
        .dot.muted { background: var(--text-muted); }
        .pie-container { display: flex; align-items: center; gap: var(--space-6); }
        .pie-legend { flex: 1; }
        .pie-legend-item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) 0; }
        .pie-label { flex: 1; font-size: var(--font-size-sm); color: var(--text-secondary); }
        .pie-value { font-weight: 600; }
        
        .bottom-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6); }
        .at-risk-card, .activity-card { padding: var(--space-6); }
        .at-risk-list, .activity-list { display: flex; flex-direction: column; gap: var(--space-3); }
        .at-risk-item { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-4); background: var(--bg-tertiary); border-radius: var(--radius-lg); }
        .student-info { flex: 1; display: flex; flex-direction: column; }
        .student-name { font-weight: 600; }
        .student-plan { font-size: var(--font-size-xs); color: var(--text-muted); }
        .days-absent { text-align: center; margin-right: var(--space-4); }
        .days { display: block; font-size: var(--font-size-xl); font-weight: 700; color: var(--accent-coral); }
        .days-label { font-size: var(--font-size-xs); color: var(--text-muted); }
        .activity-item { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-3) 0; border-bottom: 1px solid var(--border-light); }
        .activity-item:last-child { border-bottom: none; }
        .activity-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .activity-dot.membership { background: var(--accent-primary); }
        .activity-dot.upsell { background: var(--accent-gold); }
        .activity-dot.partner { background: var(--accent-emerald); }
        .activity-dot.referral { background: var(--accent-blue); }
        .activity-content { flex: 1; }
        .activity-message { display: block; font-size: var(--font-size-sm); }
        .activity-time { font-size: var(--font-size-xs); color: var(--text-muted); }
        .activity-amount { font-weight: 600; color: var(--accent-emerald); }
        
        @media (max-width: 1024px) { .charts-row, .bottom-row { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .pie-container { flex-direction: column; } }
      `}</style>
        </div>
    );
}
