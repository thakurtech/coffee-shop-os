import { Link } from 'react-router-dom';
import { TrendingUp, Users, Trophy, Handshake, ArrowRight, CheckCircle2, Star, Zap, BarChart3, Shield, Sparkles, Play } from 'lucide-react';
import './LandingPage.css';

// Using new premium 3D assets for features instead of Lucide icons
const features = [
    { img: '/icon-retention-3d.png', title: 'Smart Retention', description: 'AI-powered streak rewards and personalized engagement that keeps students coming back', stat: '35% less churn' },
    { img: '/icon-revenue-3d.png', title: 'Revenue Upsells', description: 'Premium seats, AC zones, and extended hours that students actually want to pay for', stat: '₹6K/month extra' },
    { img: '/icon-partners-3d.png', title: 'Partner Ecosystem', description: 'Integrated marketplace for snacks, stationery, and coaching — you earn on every sale', stat: '₹4K commissions' },
    { img: '/icon-referral-3d.png', title: 'Referral Engine', description: 'Turn your happy students into brand ambassadors with tier-based rewards', stat: '2X growth rate' },
];

const stats = [
    { value: '₹20K+', label: 'Monthly Revenue Boost', icon: '💰' },
    { value: '89%', label: 'Retention Rate', icon: '📈' },
    { value: '500+', label: 'Libraries Trust Us', icon: '🏛️' },
    { value: '4.9★', label: 'Owner Rating', icon: '⭐' },
];

const testimonials = [
    { name: 'Priya Sharma', role: 'StudyZone Delhi', quote: 'Revenue jumped ₹28K in the first quarter. The retention system is pure magic.', rating: 5, image: '/logo.png' },
    { name: 'Rahul Mehta', role: 'Focus Library Mumbai', quote: 'Partner commissions alone cover my software costs 3x over.', rating: 5, image: '/logo.png' },
    { name: 'Anita Verma', role: 'Career Point Pune', quote: 'Student churn dropped 40%. I wish I found this years ago.', rating: 5, image: '/logo.png' },
];

const plans = [
    { name: 'Starter', price: '₹999', features: ['50 students', 'Basic analytics', 'Seat booking', 'Email support'], popular: false },
    { name: 'Growth', price: '₹2,499', features: ['200 students', 'Retention engine', 'Partner marketplace', 'Referrals', 'Priority support'], popular: true },
    { name: 'Enterprise', price: '₹4,999', features: ['Unlimited', 'Multi-location', 'Custom reports', 'API access', 'Dedicated manager'], popular: false },
];

export default function LandingPage() {
    return (
        <div className="landing">
            {/* Navigation */}
            <nav className="nav">
                <div className="nav-inner">
                    <Link to="/" className="logo">
                        <img src="/logo.png" alt="LibraryOS" className="logo-img" />
                        <span className="logo-text">LibraryOS</span>
                    </Link>
                    <div className="nav-links">
                        <a href="#features">Features</a>
                        <a href="#pricing">Pricing</a>
                        <a href="#testimonials">Reviews</a>
                    </div>
                    <div className="nav-actions">
                        <Link to="/login" className="btn btn-ghost">Log in</Link>
                        <Link to="/login" className="btn btn-primary">Start Free Trial</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="hero-orb hero-orb-1" />
                    <div className="hero-orb hero-orb-2" />
                    <div className="hero-grid" />
                </div>

                <div className="hero-content">
                    <div className="hero-badge"><Sparkles size={14} />Trusted by 500+ library owners</div>

                    <h1 className="hero-title">
                        Transform Your Library Into a<br />
                        <span className="hero-highlight">₹20K+ Revenue</span> Powerhouse
                    </h1>

                    <p className="hero-subtitle">
                        The intelligent platform that boosts student retention, unlocks premium upsells,
                        and creates passive income through partnerships — all on autopilot.
                    </p>

                    <div className="hero-cta">
                        <Link to="/login" className="btn btn-primary btn-lg hero-btn">
                            <Zap size={20} />
                            Start Free 14-Day Trial
                            <ArrowRight size={18} />
                        </Link>
                        <button className="btn btn-secondary btn-lg">
                            <Play size={18} />
                            Watch Demo
                        </button>
                    </div>

                    <div className="hero-stats">
                        {stats.map((s, i) => (
                            <div key={i} className="hero-stat">
                                <span className="stat-icon">{s.icon}</span>
                                <div className="stat-content">
                                    <span className="stat-value">{s.value}</span>
                                    <span className="stat-label">{s.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="hero-image-wrapper">
                        <img src="/hero-illustration.png" alt="Modern Library" className="hero-image" />
                    </div>
                </div>
            </section>

            {/* Features with 3D Icons */}
            <section id="features" className="features">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Features</span>
                        <h2>Everything You Need to<br /><span className="text-gradient-gold">10x Your Revenue</span></h2>
                        <p>Powerful, elegant tools designed by library owners, for library owners</p>
                    </div>

                    <div className="features-grid">
                        {features.map((f, i) => (
                            <div key={i} className="feature-card card-3d">
                                <div className="feature-img-wrapper">
                                    <img src={f.img} alt={f.title} className="feature-img" />
                                </div>
                                <h3>{f.title}</h3>
                                <p>{f.description}</p>
                                <div className="feature-stat">{f.stat}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Revenue Calculator */}
            <section className="calculator">
                <div className="container">
                    <div className="calc-card card-3d">
                        <div className="calc-left">
                            <span className="section-tag">Revenue Potential</span>
                            <h2>See Your <span className="text-gradient-gold">Earnings</span></h2>
                            <p>Based on 100 active students, here's your monthly potential:</p>

                            <div className="calc-items">
                                <div className="calc-item"><BarChart3 size={20} /><span>Retention Savings</span><span className="calc-value">+₹8,000</span></div>
                                <div className="calc-item"><TrendingUp size={20} /><span>Upsell Revenue</span><span className="calc-value">+₹6,000</span></div>
                                <div className="calc-item"><Handshake size={20} /><span>Partner Commissions</span><span className="calc-value">+₹4,000</span></div>
                                <div className="calc-item"><Users size={20} /><span>Referral Growth</span><span className="calc-value">+₹2,000</span></div>
                            </div>
                        </div>

                        <div className="calc-right">
                            <div className="calc-total">
                                <span className="calc-total-label">Your Monthly Extra Revenue</span>
                                <span className="calc-total-value">₹20,000+</span>
                                <span className="calc-total-note">Conservative estimate based on 100 students</span>
                            </div>
                            <Link to="/login" className="btn btn-primary btn-lg w-full">Claim Your Revenue</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="testimonials">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Testimonials</span>
                        <h2>Loved by <span className="text-gradient-gold">Library Owners</span></h2>
                    </div>

                    <div className="testimonials-grid">
                        {testimonials.map((t, i) => (
                            <div key={i} className="testimonial-card card-3d">
                                <div className="testimonial-stars">{[...Array(t.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}</div>
                                <p className="testimonial-quote">"{t.quote}"</p>
                                <div className="testimonial-author">
                                    <div className="avatar"><img src={t.image} alt={t.name} /></div>
                                    <div><span className="author-name">{t.name}</span><span className="author-role">{t.role}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="pricing">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Pricing</span>
                        <h2>Simple, <span className="text-gradient-gold">Transparent</span> Pricing</h2>
                    </div>

                    <div className="pricing-grid">
                        {plans.map((p, i) => (
                            <div key={i} className={`pricing-card card-3d ${p.popular ? 'popular' : ''}`}>
                                {p.popular && <div className="popular-badge">Most Popular</div>}
                                <h3>{p.name}</h3>
                                <div className="pricing-amount"><span className="price">{p.price}</span><span className="period">/month</span></div>
                                <ul className="pricing-features">
                                    {p.features.map((f, j) => <li key={j}><CheckCircle2 size={16} />{f}</li>)}
                                </ul>
                                <Link to="/login" className={`btn w-full ${p.popular ? 'btn-primary' : 'btn-secondary'}`}>Get Started</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container footer-inner">
                    <div className="footer-brand">
                        <div className="logo"><img src="/logo.png" alt="LibraryOS" className="logo-img" /><span className="logo-text">LibraryOS</span></div>
                        <p>The revenue engine for modern libraries.</p>
                        <div className="credit-badge">
                            <img src="/sumit-badge.png" alt="Built by Sumit Thakur" className="credit-img" />
                        </div>
                    </div>
                    <div className="footer-links">
                        <div className="footer-col"><h4>Product</h4><a href="#">Features</a><a href="#">Pricing</a><a href="#">Integrations</a></div>
                        <div className="footer-col"><h4>Resources</h4><a href="#">Documentation</a><a href="#">Blog</a><a href="#">Support</a></div>
                        <div className="footer-col"><h4>Company</h4><a href="#">About</a><a href="#">Careers</a><a href="#">Contact</a></div>
                    </div>
                </div>
                <div className="footer-bottom"><p>© 2024 LibraryOS. All rights reserved.</p></div>
            </footer>
        </div>
    );
}
