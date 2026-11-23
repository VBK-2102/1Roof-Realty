import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Inbox, 
  Calendar, 
  FileText, 
  LogOut, 
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { DatabaseService } from '../../services/db';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem('1roof_admin_session_v1');
    if (!auth) {
      navigate('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('1roof_admin_session_v1');
    navigate('/admin/login');
  };

  const handleResetDemoData = () => {
    if (confirm('Are you sure you want to restore original showcase demo data? This will reseed properties, inquiries, and site visits.')) {
      DatabaseService.resetAllDemoData();
      window.location.reload();
    }
  };

  if (isAuthenticated === null) {
    return <div className="p-8 font-mono text-xs text-[#5C4944]">Checking authentication session...</div>;
  }

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Properties Management', path: '/admin/properties', icon: Building2 },
    { name: 'Enquiries & Leads CRM', path: '/admin/enquiries', icon: Inbox },
    { name: 'Site Visit Requests', path: '/admin/site-visits', icon: Calendar },
    { name: 'Owner Submissions', path: '/admin/submissions', icon: FileText }
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] bg-grid-architectural flex flex-col md:flex-row text-[#211613]">
      
      {/* Sidebar Navigation in Brick Dark */}
      <aside className="w-full md:w-64 bg-[#3D1007] text-[#ECDCD5] p-6 flex flex-col justify-between border-r border-[#6E2214] shrink-0">
        <div className="space-y-8">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#963D2C] flex items-center justify-center border border-[#FFB088]/30 text-white font-mono font-bold">
              1R
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight block">1ROOF Realty</span>
              <span className="text-[10px] font-mono text-[#FFB088] block">Admin Console v2.0</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[#963D2C] text-white shadow-md border border-[#FFB088]/20'
                      : 'text-[#ECDCD5]/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-[#6E2214]/80 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 text-[11px] text-[#ECDCD5] hover:bg-white/10 transition-colors font-mono"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleResetDemoData}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] text-[#D9B7AD] hover:text-[#FFB088] transition-colors font-mono"
            title="Reset database to seed records"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-red-950/40 border border-red-900/40 text-red-300 hover:bg-red-900/60 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};
