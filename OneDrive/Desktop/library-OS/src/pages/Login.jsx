import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Zap, Shield, CheckCircle2 } from 'lucide-react';

export default function Login({ onLogin }) {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', name: '', libraryName: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onLogin) onLogin();
        navigate('/dashboard');
    };

    return (
        <div className="auth-page">
            <div className="auth-bg"><div className="auth-pattern" /><div className="auth-orb auth-orb-1" /><div className="auth-orb auth-orb-2" /></div>

            <div className="auth-container">
                <div className="auth-card card-3d">
                    <div className="auth-header">
                        <Link to="/" className="auth-logo"><img src="/logo.png" alt="LibraryOS" className="logo-img" /><span className="logo-text">LibraryOS</span></Link>
                        <h1>{isLogin ? 'Welcome back' : 'Get started'}</h1>
                        <p>{isLogin ? 'Sign in to access your revenue dashboard' : 'Create your account and start earning'}</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <>
                                <div className="input-group"><label>Your Name</label><input type="text" className="input" placeholder="Rahul Sharma" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></div>
                                <div className="input-group"><label>Library Name</label><input type="text" className="input" placeholder="Study Hub Delhi" value={formData.libraryName} onChange={(e) => setFormData({ ...formData, libraryName: e.target.value })} required /></div>
                            </>
                        )}
                        <div className="input-group"><label>Email</label><div className="input-icon"><Mail size={18} className="icon" /><input type="email" className="input" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required /></div></div>
                        <div className="input-group"><label>Password</label><div className="input-icon"><Lock size={18} className="icon" /><input type={showPassword ? 'text' : 'password'} className="input" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required /><button type="button" className="pwd-toggle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>

                        {isLogin && <div className="auth-options"><label className="check-label"><input type="checkbox" /> Remember me</label><a href="#">Forgot password?</a></div>}

                        <button type="submit" className="btn btn-primary btn-lg w-full">{isLogin ? 'Sign In' : 'Create Account'}<ArrowRight size={18} /></button>
                    </form>

                    <p className="auth-switch">{isLogin ? "Don't have an account?" : 'Already registered?'}<button type="button" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign up' : 'Sign in'}</button></p>
                </div>

                <div className="auth-features">
                    <span><Shield size={16} />14-day free trial</span>
                    <span><CheckCircle2 size={16} />No credit card</span>
                    <span><Zap size={16} />Setup in 5 min</span>
                </div>
            </div>

            <style>{`
        .auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: var(--space-8); position: relative; background: var(--bg-primary); }
        .auth-bg { position: fixed; inset: 0; z-index: 0; }
        .auth-pattern { position: absolute; inset: 0; background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0); background-size: 32px 32px; }
        .auth-orb { position: absolute; border-radius: 50%; filter: blur(120px); }
        .auth-orb-1 { top: 15%; right: 15%; width: 500px; height: 500px; background: rgba(201, 162, 39, 0.08); animation: float 10s ease-in-out infinite; }
        .auth-orb-2 { bottom: 15%; left: 15%; width: 400px; height: 400px; background: rgba(37, 99, 235, 0.05); animation: float 8s ease-in-out infinite reverse; }
        
        .auth-container { width: 100%; max-width: 440px; z-index: 1; }
        .auth-card { padding: var(--space-10); animation: scaleIn 0.4s ease; background: var(--bg-secondary); }
        .auth-header { text-align: center; margin-bottom: var(--space-8); }
        .auth-logo { display: inline-flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-6); }
        .logo-img { width: 52px; height: 52px; border-radius: var(--radius-xl); box-shadow: var(--shadow-md); }
        .logo-text { font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); }
        .auth-header h1 { font-size: var(--font-size-2xl); margin-bottom: var(--space-2); }
        .auth-header p { color: var(--text-secondary); }
        
        .auth-form { display: flex; flex-direction: column; gap: var(--space-5); }
        .input-icon { position: relative; }
        .input-icon .icon { position: absolute; left: var(--space-4); top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .input-icon .input { padding-left: var(--space-12); padding-right: var(--space-12); }
        .pwd-toggle { position: absolute; right: var(--space-4); top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-muted); cursor: pointer; }
        .pwd-toggle:hover { color: var(--text-primary); }
        
        .auth-options { display: flex; justify-content: space-between; align-items: center; font-size: var(--font-size-sm); }
        .check-label { display: flex; align-items: center; gap: var(--space-2); color: var(--text-secondary); cursor: pointer; }
        .auth-options a { color: var(--accent-gold-dark); font-weight: 500; }
        
        .auth-switch { text-align: center; margin-top: var(--space-6); color: var(--text-secondary); font-size: var(--font-size-sm); }
        .auth-switch button { background: none; border: none; color: var(--accent-gold-dark); font-weight: 600; cursor: pointer; margin-left: var(--space-2); }
        
        .auth-features { display: flex; justify-content: center; gap: var(--space-6); margin-top: var(--space-8); }
        .auth-features span { display: flex; align-items: center; gap: var(--space-2); color: var(--text-muted); font-size: var(--font-size-sm); }
        .auth-features svg { color: var(--accent-gold-dark); }
      `}</style>
        </div>
    );
}
