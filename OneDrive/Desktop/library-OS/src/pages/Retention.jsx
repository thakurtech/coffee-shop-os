import { Trophy, Flame, Award, Target, Gift, Users, TrendingUp, ChevronRight, Star, Zap, Medal } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const streakLeaders = [
    { rank: 1, name: 'Neha Gupta', streak: 47, badge: '🔥', avatar: 'NG' },
    { rank: 2, name: 'Rahul Sharma', streak: 35, badge: '⭐', avatar: 'RS' },
    { rank: 3, name: 'Vikram Mehta', streak: 28, badge: '💪', avatar: 'VM' },
    { rank: 4, name: 'Priya Singh', streak: 21, badge: '🎯', avatar: 'PS' },
    { rank: 5, name: 'Amit Kumar', streak: 18, badge: '✨', avatar: 'AK' },
];

const badges = [
    { name: 'Early Bird', icon: '🌅', description: 'Check in before 8 AM', earned: 45 },
    { name: 'Night Owl', icon: '🦉', description: 'Study past 9 PM', earned: 32 },
    { name: '7-Day Streak', icon: '🔥', description: 'Visit 7 days in a row', earned: 89 },
    { name: '30-Day Streak', icon: '💎', description: 'Visit 30 days in a row', earned: 24 },
    { name: 'Referral Pro', icon: '🤝', description: 'Refer 5 friends', earned: 18 },
    { name: 'Premium Member', icon: '👑', description: 'Upgrade to premium', earned: 35 },
];

const atRiskStudents = [
    { name: 'Rohan Verma', days: 6, plan: 'Monthly', reason: 'Exam season', avatar: 'RV' },
    { name: 'Sneha Patel', days: 5, plan: 'Quarterly', reason: 'Travel', avatar: 'SP' },
    { name: 'Karan Singh', days: 4, plan: 'Monthly', reason: 'Unknown', avatar: 'KS' },
];

const retentionData = [
    { week: 'W1', rate: 95 }, { week: 'W2', rate: 92 }, { week: 'W3', rate: 88 }, { week: 'W4', rate: 91 },
];

export default function Retention() {
    const stats = [
        { label: 'Retention Rate', value: '89%', change: '+3%', icon: TrendingUp, color: '#10b981' },
        { label: 'Avg Streak', value: '12 days', change: '+2 days', icon: Flame, color: '#f59e0b' },
        { label: 'At Risk', value: '5', change: '-2', icon: Target, color: '#ef4444' },
        { label: 'Rewards Given', value: '234', change: '+18', icon: Gift, color: '#8b5cf6' },
    ];

    return (
        <div className="retention-page">
            <div className="page-header">
                <div><h1>Student Retention</h1><p>Keep students engaged with gamification and rewards</p></div>
                <button className="btn btn-primary"><Zap size={18} />Create Campaign</button>
            </div>

            <div className="stats-grid">
                {stats.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <div key={i} className="stat-card">
                            <div className="stat-icon" style={{ background: s.color }}><Icon size={22} /></div>
                            <div className="stat-content"><span className="stat-value">{s.value}</span><span className="stat-label">{s.label}</span></div>
                            <span className="stat-change" style={{ color: s.color }}>{s.change}</span>
                        </div>
                    );
                })}
            </div>

            <div className="main-grid">
                <div className="leaderboard-card">
                    <div className="card-header"><h3><Trophy size={20} /> Streak Leaderboard</h3><button className="btn btn-sm btn-ghost">View all</button></div>
                    <div className="leaders-list">
                        {streakLeaders.map(leader => (
                            <div key={leader.rank} className={`leader-item rank-${leader.rank}`}>
                                <span className="rank">{leader.rank === 1 ? '🥇' : leader.rank === 2 ? '🥈' : leader.rank === 3 ? '🥉' : leader.rank}</span>
                                <div className="avatar">{leader.avatar}</div>
                                <div className="leader-info"><span className="name">{leader.name}</span><span className="streak"><Flame size={14} /> {leader.streak} days</span></div>
                                <span className="leader-badge">{leader.badge}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="at-risk-card">
                    <div className="card-header"><h3>⚠️ At-Risk Students</h3><span className="count">{atRiskStudents.length} need attention</span></div>
                    <div className="risk-list">
                        {atRiskStudents.map((s, i) => (
                            <div key={i} className="risk-item">
                                <div className="avatar">{s.avatar}</div>
                                <div className="risk-info"><span className="name">{s.name}</span><span className="reason">{s.reason}</span></div>
                                <div className="days-box"><span className="days">{s.days}</span><span className="label">days</span></div>
                                <button className="btn btn-sm btn-primary">Message</button>
                            </div>
                        ))}
                    </div>
                    <div className="quick-actions-bar">
                        <button className="btn btn-secondary w-full">Send Bulk Reminder</button>
                    </div>
                </div>

                <div className="chart-card">
                    <div className="card-header"><h3>Weekly Retention</h3></div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={retentionData}>
                            <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} domain={[80, 100]} />
                            <Bar dataKey="rate" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="badges-card">
                    <div className="card-header"><h3><Award size={20} /> Achievement Badges</h3></div>
                    <div className="badges-grid">
                        {badges.map((b, i) => (
                            <div key={i} className="badge-item">
                                <span className="badge-icon">{b.icon}</span>
                                <div className="badge-info"><span className="badge-name">{b.name}</span><span className="badge-desc">{b.description}</span></div>
                                <span className="earned">{b.earned} earned</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        .retention-page { animation: fadeIn 0.3s ease; }
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-8); }
        .page-header h1 { font-size: var(--font-size-3xl); margin-bottom: var(--space-2); }
        .page-header p { color: var(--text-secondary); }
        
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-6); margin-bottom: var(--space-8); }
        .stat-card { display: flex; align-items: center; gap: var(--space-4); background: var(--bg-glass); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: var(--space-5); }
        .stat-icon { width: 48px; height: 48px; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: white; }
        .stat-content { flex: 1; }
        .stat-value { display: block; font-size: var(--font-size-xl); font-weight: 700; }
        .stat-label { font-size: var(--font-size-sm); color: var(--text-muted); }
        .stat-change { font-size: var(--font-size-sm); font-weight: 600; }
        
        .main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6); }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6); }
        .card-header h3 { display: flex; align-items: center; gap: var(--space-2); font-size: var(--font-size-lg); }
        .count { font-size: var(--font-size-sm); color: var(--accent-amber); }
        
        .leaderboard-card, .at-risk-card, .chart-card, .badges-card { background: var(--bg-glass); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: var(--space-6); }
        
        .leaders-list { display: flex; flex-direction: column; gap: var(--space-3); }
        .leader-item { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-3); background: var(--bg-tertiary); border-radius: var(--radius-lg); }
        .leader-item.rank-1 { background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%); border: 1px solid rgba(245, 158, 11, 0.3); }
        .rank { font-size: var(--font-size-lg); min-width: 24px; text-align: center; }
        .avatar { width: 40px; height: 40px; background: var(--gradient-primary); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: var(--font-size-sm); }
        .leader-info { flex: 1; }
        .leader-info .name { display: block; font-weight: 600; }
        .leader-info .streak { display: flex; align-items: center; gap: var(--space-1); font-size: var(--font-size-sm); color: var(--accent-amber); }
        .leader-badge { font-size: 20px; }
        
        .risk-list { display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-4); }
        .risk-item { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-3); background: var(--bg-tertiary); border-radius: var(--radius-lg); }
        .risk-info { flex: 1; }
        .risk-info .name { display: block; font-weight: 600; }
        .risk-info .reason { font-size: var(--font-size-sm); color: var(--text-muted); }
        .days-box { text-align: center; padding: 0 var(--space-4); }
        .days-box .days { display: block; font-size: var(--font-size-xl); font-weight: 700; color: var(--accent-rose); }
        .days-box .label { font-size: var(--font-size-xs); color: var(--text-muted); }
        
        .badges-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-3); }
        .badge-item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); background: var(--bg-tertiary); border-radius: var(--radius-lg); }
        .badge-icon { font-size: 24px; }
        .badge-info { flex: 1; }
        .badge-name { display: block; font-weight: 600; font-size: var(--font-size-sm); }
        .badge-desc { font-size: var(--font-size-xs); color: var(--text-muted); }
        .earned { font-size: var(--font-size-xs); color: var(--accent-purple); }
        
        @media (max-width: 1024px) { .main-grid { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
}
