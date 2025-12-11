import { useState } from 'react';
import { Search, Filter, Plus, MoreHorizontal, Mail, Phone, Calendar, TrendingUp, Award, ChevronDown } from 'lucide-react';

const students = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', phone: '98765-43210', plan: 'Quarterly', status: 'Active', streak: 28, retention: 95, joinDate: '15 Oct 2024', avatar: 'RS', daysLeft: 45 },
    { id: 2, name: 'Priya Singh', email: 'priya@email.com', phone: '98765-43211', plan: 'Monthly', status: 'Active', streak: 15, retention: 88, joinDate: '01 Nov 2024', avatar: 'PS', daysLeft: 12 },
    { id: 3, name: 'Amit Kumar', email: 'amit@email.com', phone: '98765-43212', plan: 'Monthly', status: 'At Risk', streak: 0, retention: 45, joinDate: '20 Sep 2024', avatar: 'AK', daysLeft: 5 },
    { id: 4, name: 'Neha Gupta', email: 'neha@email.com', phone: '98765-43213', plan: 'Yearly', status: 'Active', streak: 42, retention: 98, joinDate: '01 Jan 2024', avatar: 'NG', daysLeft: 180 },
    { id: 5, name: 'Vikram Mehta', email: 'vikram@email.com', phone: '98765-43214', plan: 'Monthly', status: 'Expired', streak: 0, retention: 30, joinDate: '15 Aug 2024', avatar: 'VM', daysLeft: 0 },
    { id: 6, name: 'Anita Verma', email: 'anita@email.com', phone: '98765-43215', plan: 'Quarterly', status: 'Active', streak: 21, retention: 92, joinDate: '10 Sep 2024', avatar: 'AV', daysLeft: 32 },
];

export default function Students() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const filteredStudents = students.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'All' || s.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="students-page">
            <div className="page-header">
                <div><h1>Students</h1><p>{students.length} total students • {students.filter(s => s.status === 'Active').length} active</p></div>
                <button className="btn btn-primary"><Plus size={18} />Add Student</button>
            </div>

            <div className="filters-bar">
                <div className="search-box"><Search size={18} /><input type="text" placeholder="Search students..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
                <div className="filter-buttons">{['All', 'Active', 'At Risk', 'Expired'].map(status => (<button key={status} className={`filter-btn ${filterStatus === status ? 'active' : ''}`} onClick={() => setFilterStatus(status)}>{status}</button>))}</div>
            </div>

            <div className="students-grid">
                {filteredStudents.map(student => (
                    <div key={student.id} className={`student-card card-3d ${student.status.toLowerCase().replace(' ', '-')}`}>
                        <div className="card-header"><div className="student-avatar">{student.avatar}</div><div className="student-basic"><h3>{student.name}</h3><span className={`status-badge ${student.status.toLowerCase().replace(' ', '-')}`}>{student.status}</span></div><button className="more-btn"><MoreHorizontal size={18} /></button></div>
                        <div className="student-contact"><a href={`mailto:${student.email}`}><Mail size={14} />{student.email}</a><a href={`tel:${student.phone}`}><Phone size={14} />{student.phone}</a></div>
                        <div className="student-stats">
                            <div className="stat"><span className="stat-icon"><TrendingUp size={16} /></span><div><span className="stat-val">{student.retention}%</span><span className="stat-lbl">Retention</span></div></div>
                            <div className="stat"><span className="stat-icon"><Award size={16} /></span><div><span className="stat-val">{student.streak}</span><span className="stat-lbl">Day Streak</span></div></div>
                            <div className="stat"><span className="stat-icon"><Calendar size={16} /></span><div><span className="stat-val">{student.daysLeft}</span><span className="stat-lbl">Days Left</span></div></div>
                        </div>
                        <div className="card-footer"><span className="plan-badge">{student.plan}</span><span className="join-date">Joined {student.joinDate}</span></div>
                        <div className="card-actions"><button className="btn btn-sm btn-secondary">Message</button><button className="btn btn-sm btn-primary">{student.status === 'Expired' ? 'Renew' : 'Upgrade'}</button></div>
                    </div>
                ))}
            </div>

            <style>{`
        .students-page { animation: fadeIn 0.3s ease; }
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--font-size-3xl); margin-bottom: var(--space-2); }
        .page-header p { color: var(--text-secondary); }
        
        .filters-bar { display: flex; justify-content: space-between; align-items: center; gap: var(--space-4); margin-bottom: var(--space-6); flex-wrap: wrap; }
        .search-box { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) var(--space-4); background: var(--bg-secondary); border: 1px solid var(--border-light); border-radius: var(--radius-lg); flex: 1; max-width: 400px; box-shadow: var(--shadow-xs); }
        .search-box svg { color: var(--text-muted); }
        .search-box input { background: none; border: none; outline: none; color: var(--text-primary); font-size: var(--font-size-sm); width: 100%; }
        .filter-buttons { display: flex; gap: var(--space-2); }
        .filter-btn { padding: var(--space-2) var(--space-4); background: var(--bg-secondary); border: 1px solid var(--border-light); border-radius: var(--radius-lg); color: var(--text-secondary); cursor: pointer; font-size: var(--font-size-sm); transition: all var(--transition-fast); }
        .filter-btn:hover { border-color: var(--accent-gold); color: var(--text-primary); }
        .filter-btn.active { background: rgba(201, 162, 39, 0.1); border-color: var(--accent-gold); color: var(--accent-gold-dark); font-weight: 600; }
        
        .students-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: var(--space-6); }
        .student-card { padding: var(--space-6); }
        .student-card:hover { border-color: var(--accent-gold); }
        .student-card.at-risk { border-color: rgba(201, 162, 39, 0.4); }
        .student-card.expired { opacity: 0.7; }
        
        .card-header { display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-4); }
        .student-avatar { width: 48px; height: 48px; background: var(--gradient-dark); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: var(--font-size-sm); color: white; }
        .student-basic { flex: 1; }
        .student-basic h3 { font-size: var(--font-size-lg); margin-bottom: var(--space-1); }
        .status-badge { padding: var(--space-1) var(--space-2); border-radius: var(--radius-sm); font-size: var(--font-size-xs); font-weight: 600; text-transform: uppercase; }
        .status-badge.active { background: rgba(5, 150, 105, 0.1); color: var(--accent-emerald); }
        .status-badge.at-risk { background: rgba(201, 162, 39, 0.1); color: var(--accent-gold-dark); }
        .status-badge.expired { background: rgba(220, 38, 38, 0.1); color: var(--accent-coral); }
        .more-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; padding: var(--space-2); border-radius: var(--radius-md); }
        .more-btn:hover { background: var(--bg-tertiary); }
        
        .student-contact { display: flex; flex-direction: column; gap: var(--space-2); margin-bottom: var(--space-4); padding-bottom: var(--space-4); border-bottom: 1px solid var(--border-light); }
        .student-contact a { display: flex; align-items: center; gap: var(--space-2); color: var(--text-secondary); font-size: var(--font-size-sm); }
        .student-contact a:hover { color: var(--accent-gold-dark); }
        
        .student-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); margin-bottom: var(--space-4); }
        .stat { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-3); background: var(--bg-tertiary); border-radius: var(--radius-md); }
        .stat-icon { color: var(--accent-gold-dark); }
        .stat-val { display: block; font-weight: 700; font-size: var(--font-size-sm); }
        .stat-lbl { font-size: var(--font-size-xs); color: var(--text-muted); }
        
        .card-footer { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); }
        .plan-badge { padding: var(--space-1) var(--space-3); background: var(--bg-warm); border: 1px solid rgba(201, 162, 39, 0.2); border-radius: var(--radius-full); font-size: var(--font-size-xs); color: var(--accent-gold-dark); font-weight: 500; }
        .join-date { font-size: var(--font-size-xs); color: var(--text-muted); }
        .card-actions { display: flex; gap: var(--space-3); }
        .card-actions .btn { flex: 1; }
      `}</style>
        </div>
    );
}
