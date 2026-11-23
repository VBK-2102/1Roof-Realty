import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, Key } from 'lucide-react';
import { SEO } from '../../components/common/SEO';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (
      (email === 'admin@1roofrealty.in' && password === 'admin123') ||
      (email === 'sachin@1roofrealty.in' && password === '1roof2017')
    ) {
      localStorage.setItem('1roof_admin_session_v1', JSON.stringify({
        email,
        name: email.startsWith('sachin') ? 'Sachin Arun Dhotre' : '1Roof Administrator',
        role: 'superadmin',
        loginTime: new Date().toISOString()
      }));
      navigate('/admin');
    } else {
      setLoading(false);
      setErrorMsg('Invalid administrative credentials. Use the demo credentials provided below.');
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@1roofrealty.in');
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-[#3D1007] text-[#ECDCD5] flex items-center justify-center p-4 relative overflow-hidden bg-grid-architectural">
      <SEO title="Admin Secure Login | 1Roof Realty India" />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#963D2C]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#3D1007]/90 rounded-[36px] border border-[#ECDCD5]/20 p-8 sm:p-10 shadow-2xl backdrop-blur-md space-y-6 relative z-10">
        
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#963D2C] border border-[#FFB088]/30 text-white font-mono font-bold text-xl flex items-center justify-center mx-auto shadow-lg shadow-[#963D2C]/30">
            1R
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            1Roof Realty Admin Portal
          </h1>
          <p className="text-xs text-[#ECDCD5]/70 font-mono">
            One Roof Realty LLP Management Console
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase text-[#ECDCD5]/80">Staff Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#FFB088] absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@1roofrealty.in"
                className="w-full text-xs bg-white/5 border border-[#ECDCD5]/20 rounded-2xl pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FFB088]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase text-[#ECDCD5]/80">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#FFB088] absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs bg-white/5 border border-[#ECDCD5]/20 rounded-2xl pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FFB088]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-[#963D2C] text-white font-bold text-xs hover:bg-[#7A2514] transition-all shadow-lg flex items-center justify-center gap-2 group mt-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Admin Console'}</span>
            <ArrowRight className="w-4 h-4 text-[#FFB088] group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Demo Credentials Helper */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase text-[#FFB088] font-bold flex items-center gap-1">
              <Key className="w-3 h-3" />
              <span>Demo Admin Credentials</span>
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-bold text-[#FFB088] hover:underline"
            >
              Autofill Demo
            </button>
          </div>
          <div className="font-mono text-[11px] text-[#ECDCD5]/80 space-y-0.5">
            <div>Email: <span className="text-white">admin@1roofrealty.in</span></div>
            <div>Password: <span className="text-white">admin123</span></div>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link to="/" className="text-xs text-[#D9B7AD] hover:text-[#FFB088] transition-colors font-mono">
            &larr; Return to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
};
