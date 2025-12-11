import { useState } from 'react';
import { Calendar, Clock, Filter, Star, Snowflake, Wifi, Users, Check, X } from 'lucide-react';

const zones = [
    { id: 'general', name: 'General Zone', icon: Users, price: 0, color: '#4a4a5a' },
    { id: 'quiet', name: 'Quiet Zone', icon: Wifi, price: 50, color: '#1a1a2e' },
    { id: 'ac', name: 'AC Zone', icon: Snowflake, price: 100, color: '#2563eb' },
    { id: 'premium', name: 'Premium Cabin', icon: Star, price: 200, color: '#c9a227' },
];

const generateSeats = () => {
    const seats = [];
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 10; col++) {
            const id = `${String.fromCharCode(65 + row)}${col + 1}`;
            const zone = col < 3 ? 'general' : col < 6 ? 'quiet' : col < 8 ? 'ac' : 'premium';
            const status = Math.random() > 0.6 ? 'available' : Math.random() > 0.5 ? 'occupied' : 'reserved';
            seats.push({ id, row, col, zone, status, occupant: status === 'occupied' ? ['Rahul S.', 'Priya G.', 'Amit K.', 'Neha V.'][Math.floor(Math.random() * 4)] : null });
        }
    }
    return seats;
};

export default function SeatBooking() {
    const [seats] = useState(generateSeats());
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [selectedZone, setSelectedZone] = useState('all');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const seatStats = { total: seats.length, available: seats.filter(s => s.status === 'available').length, occupied: seats.filter(s => s.status === 'occupied').length, reserved: seats.filter(s => s.status === 'reserved').length };

    return (
        <div className="seat-booking-page">
            <div className="page-header"><div><h1>Seat Booking</h1><p>Manage seat assignments and bookings</p></div><div className="header-controls"><div className="date-picker"><Calendar size={18} /><input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} /></div></div></div>

            <div className="stats-bar card-3d">
                <div className="seat-stat"><span className="num">{seatStats.total}</span><span className="lbl">Total</span></div>
                <div className="seat-stat available"><span className="num">{seatStats.available}</span><span className="lbl">Available</span></div>
                <div className="seat-stat occupied"><span className="num">{seatStats.occupied}</span><span className="lbl">Occupied</span></div>
                <div className="seat-stat reserved"><span className="num">{seatStats.reserved}</span><span className="lbl">Reserved</span></div>
            </div>

            <div className="booking-layout">
                <div className="seat-map-container card-3d">
                    <div className="zone-filter"><button className={`zone-btn ${selectedZone === 'all' ? 'active' : ''}`} onClick={() => setSelectedZone('all')}>All Zones</button>{zones.map(z => (<button key={z.id} className={`zone-btn ${selectedZone === z.id ? 'active' : ''}`} onClick={() => setSelectedZone(z.id)} style={{ '--zone-color': z.color }}>{z.name}</button>))}</div>
                    <div className="seat-map">
                        <div className="map-header"><div className="entrance">📚 Entrance</div></div>
                        <div className="seats-grid">
                            {seats.map(seat => {
                                const zone = zones.find(z => z.id === seat.zone);
                                if (selectedZone !== 'all' && seat.zone !== selectedZone) return null;
                                return (<button key={seat.id} className={`seat ${seat.status} ${selectedSeat?.id === seat.id ? 'selected' : ''}`} style={{ '--seat-color': zone?.color }} onClick={() => seat.status === 'available' && setSelectedSeat(seat)} title={seat.occupant || seat.id}><span className="seat-id">{seat.id}</span>{seat.zone === 'premium' && <Star size={10} className="zone-icon" />}{seat.zone === 'ac' && <Snowflake size={10} className="zone-icon" />}</button>);
                            })}
                        </div>
                    </div>
                    <div className="map-legend"><div className="legend-item"><span className="legend-dot available" />Available</div><div className="legend-item"><span className="legend-dot occupied" />Occupied</div><div className="legend-item"><span className="legend-dot reserved" />Reserved</div></div>
                </div>

                <div className="booking-panel card-3d">
                    <h3>Booking Details</h3>
                    {selectedSeat ? (
                        <div className="selected-seat-info">
                            <div className="seat-preview" style={{ background: zones.find(z => z.id === selectedSeat.zone)?.color }}>{selectedSeat.id}</div>
                            <div className="seat-details"><div className="detail-row"><span>Seat ID</span><span>{selectedSeat.id}</span></div><div className="detail-row"><span>Zone</span><span>{zones.find(z => z.id === selectedSeat.zone)?.name}</span></div><div className="detail-row"><span>Extra Charge</span><span>+₹{zones.find(z => z.id === selectedSeat.zone)?.price}/day</span></div></div>
                            <div className="booking-form"><div className="input-group"><label>Student</label><select className="input"><option>Select student...</option><option>Rahul Sharma</option><option>Priya Singh</option></select></div><div className="input-group"><label>Time Slot</label><select className="input"><option>Full Day (8 AM - 8 PM)</option><option>Morning (8 AM - 1 PM)</option><option>Evening (2 PM - 8 PM)</option></select></div><button className="btn btn-primary w-full">Book Seat</button></div>
                        </div>
                    ) : (<div className="empty-state"><p>Click on an available seat to book it</p></div>)}
                    <div className="quick-stats"><h4>Today's Revenue from Upsells</h4><div className="upsell-amount">₹2,400</div><p className="upsell-note">From 12 premium seat bookings</p></div>
                </div>
            </div>

            <style>{`
        .seat-booking-page { animation: fadeIn 0.3s ease; }
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-6); }
        .page-header h1 { font-size: var(--font-size-3xl); margin-bottom: var(--space-2); }
        .page-header p { color: var(--text-secondary); }
        .date-picker { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-3) var(--space-4); background: var(--bg-secondary); border: 1px solid var(--border-light); border-radius: var(--radius-lg); box-shadow: var(--shadow-xs); }
        .date-picker svg { color: var(--text-muted); }
        .date-picker input { background: none; border: none; color: var(--text-primary); outline: none; }
        
        .stats-bar { display: flex; gap: var(--space-6); padding: var(--space-4) var(--space-6); margin-bottom: var(--space-8); }
        .seat-stat { text-align: center; padding: 0 var(--space-6); border-right: 1px solid var(--border-light); }
        .seat-stat:last-child { border-right: none; }
        .seat-stat .num { display: block; font-size: var(--font-size-2xl); font-weight: 700; }
        .seat-stat .lbl { font-size: var(--font-size-sm); color: var(--text-muted); }
        .seat-stat.available .num { color: var(--accent-emerald); }
        .seat-stat.occupied .num { color: var(--accent-primary); }
        .seat-stat.reserved .num { color: var(--accent-gold-dark); }
        
        .booking-layout { display: grid; grid-template-columns: 1fr 320px; gap: var(--space-6); }
        .seat-map-container, .booking-panel { padding: var(--space-6); }
        .zone-filter { display: flex; gap: var(--space-2); margin-bottom: var(--space-6); flex-wrap: wrap; }
        .zone-btn { padding: var(--space-2) var(--space-4); background: var(--bg-tertiary); border: 1px solid var(--border-light); border-radius: var(--radius-lg); color: var(--text-secondary); cursor: pointer; font-size: var(--font-size-sm); transition: all var(--transition-fast); }
        .zone-btn.active { background: var(--zone-color, var(--accent-primary)); color: white; border-color: transparent; }
        
        .seat-map { padding: var(--space-4); background: var(--bg-tertiary); border-radius: var(--radius-lg); }
        .map-header { text-align: center; padding: var(--space-4); margin-bottom: var(--space-4); border-bottom: 2px dashed var(--border-light); }
        .entrance { font-size: var(--font-size-lg); font-weight: 600; }
        .seats-grid { display: grid; grid-template-columns: repeat(10, 1fr); gap: var(--space-2); }
        .seat { width: 100%; aspect-ratio: 1; border-radius: var(--radius-md); border: 2px solid; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: all var(--transition-fast); position: relative; background: var(--bg-secondary); }
        .seat.available { border-color: var(--accent-emerald); }
        .seat.available:hover { background: rgba(5, 150, 105, 0.1); transform: scale(1.1); }
        .seat.occupied { border-color: var(--seat-color, var(--accent-primary)); background: var(--seat-color, var(--accent-primary)); cursor: not-allowed; opacity: 0.7; }
        .seat.occupied .seat-id { color: white; }
        .seat.reserved { border-color: var(--accent-gold); background: rgba(201, 162, 39, 0.15); cursor: not-allowed; }
        .seat.selected { border-color: var(--accent-emerald); box-shadow: 0 0 10px var(--accent-emerald); }
        .seat-id { font-size: var(--font-size-xs); font-weight: 600; }
        .zone-icon { position: absolute; top: 2px; right: 2px; color: var(--accent-gold); }
        
        .map-legend { display: flex; justify-content: center; gap: var(--space-6); margin-top: var(--space-4); }
        .legend-item { display: flex; align-items: center; gap: var(--space-2); font-size: var(--font-size-sm); color: var(--text-muted); }
        .legend-dot { width: 12px; height: 12px; border-radius: var(--radius-sm); border: 2px solid; }
        .legend-dot.available { border-color: var(--accent-emerald); background: transparent; }
        .legend-dot.occupied { border-color: var(--accent-primary); background: var(--accent-primary); }
        .legend-dot.reserved { border-color: var(--accent-gold); background: rgba(201, 162, 39, 0.3); }
        
        .booking-panel h3 { margin-bottom: var(--space-6); }
        .selected-seat-info { text-align: center; }
        .seat-preview { width: 80px; height: 80px; margin: 0 auto var(--space-6); border-radius: var(--radius-xl); display: flex; align-items: center; justify-content: center; font-size: var(--font-size-2xl); font-weight: 700; color: white; box-shadow: var(--shadow-md); }
        .seat-details { margin-bottom: var(--space-6); }
        .detail-row { display: flex; justify-content: space-between; padding: var(--space-3) 0; border-bottom: 1px solid var(--border-light); }
        .detail-row:last-child { border-bottom: none; }
        .detail-row span:first-child { color: var(--text-muted); }
        .booking-form { display: flex; flex-direction: column; gap: var(--space-4); }
        .empty-state { text-align: center; padding: var(--space-8); color: var(--text-muted); }
        
        .quick-stats { margin-top: var(--space-8); padding-top: var(--space-6); border-top: 1px solid var(--border-light); }
        .quick-stats h4 { font-size: var(--font-size-sm); color: var(--text-muted); margin-bottom: var(--space-2); }
        .upsell-amount { font-size: var(--font-size-3xl); font-weight: 800; color: var(--accent-emerald); }
        .upsell-note { font-size: var(--font-size-sm); color: var(--text-muted); margin-top: var(--space-2); }
        
        @media (max-width: 1024px) { .booking-layout { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .seats-grid { grid-template-columns: repeat(5, 1fr); } }
      `}</style>
        </div>
    );
}
