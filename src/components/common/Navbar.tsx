import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Menu, 
  X, 
  ArrowRight,
  UserCheck,
  Building,
  Sparkles
} from 'lucide-react';
import { VERIFIED_BUSINESS } from '../../data/verifiedBusiness';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Streamlined, high-priority navigation links (unnecessary clutter eliminated)
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Sell Property', path: '/sell' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Telemetry / Compliance Strip with Brick & Amber Accents */}
      <div className="bg-[#3D1007] text-[#ECDCD5] text-xs py-1.5 px-4 sm:px-8 border-b border-[#6E2214]/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#FFB088]">
              <span className="w-2 h-2 rounded-full bg-[#FFB088] pulse-brick"></span>
              LLP REG: {VERIFIED_BUSINESS.llpin}
            </span>
            <span className="hidden md:inline text-xs text-[#E5CFC7]/80 font-serif-italic">
              Est. 2017 &bull; ROC Mumbai &bull; Mulund East &bull; Super Corridor Indore
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href={`tel:${VERIFIED_BUSINESS.contacts.primaryPhone}`} 
              className="flex items-center gap-1.5 hover:text-[#FFB088] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#FFB088]" />
              <span className="font-mono">{VERIFIED_BUSINESS.contacts.primaryPhone}</span>
            </a>
            <div className="h-3 w-[1px] bg-[#ECDCD5]/20 hidden sm:block"></div>
            <Link 
              to="/admin" 
              className="hidden sm:flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#6E2214] text-[#FFB088] hover:bg-[#FFB088] hover:text-[#3D1007] transition-all font-mono text-[10px]"
            >
              <UserCheck className="w-3 h-3" />
              <span>Admin Desk</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Modern Floating Architectural Pill Navbar */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF7F2]/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(150,61,44,0.08)] border-b border-[#ECDCD5] py-2.5' 
          : 'bg-[#FAF7F2]/80 backdrop-blur-md py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Elegant Brick Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#963D2C] via-[#8C2D19] to-[#6E2214] flex items-center justify-center shadow-md shadow-[#963D2C]/20 border border-[#FFB088]/30 group-hover:scale-105 transition-transform">
                <span className="font-mono font-bold text-lg text-white">1R</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-sans font-extrabold text-lg tracking-tight text-[#3D1007]">
                    1ROOF
                  </span>
                  <span className="font-serif-italic text-sm text-[#B54D35]">
                    Realty
                  </span>
                </div>
                <span className="text-[10px] tracking-widest uppercase font-mono text-[#5C4944] -mt-1">
                  India &bull; LLP
                </span>
              </div>
            </Link>

            {/* Streamlined Desktop Navigation (Only 6 essential options) */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/80 backdrop-blur-lg p-1.5 rounded-full border border-[#ECDCD5] shadow-sm">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-[#963D2C] text-white shadow-sm font-semibold'
                      : 'text-[#211613] hover:text-[#963D2C] hover:bg-[#FBECE7]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Quick Action CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/sell"
                className="px-4 py-2 rounded-full text-xs font-semibold border border-[#ECDCD5] bg-white text-[#963D2C] hover:border-[#963D2C] hover:bg-[#FBECE7] transition-all shadow-2xs"
              >
                List Property
              </Link>

              <Link
                to="/contact"
                className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold bg-[#963D2C] text-white hover:bg-[#7A2514] shadow-md shadow-[#963D2C]/25 hover:shadow-lg transition-all group"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FFB088] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                to="/contact"
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#963D2C] text-white shadow-sm"
              >
                Enquire
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white border border-[#ECDCD5] text-[#963D2C]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Streamlined Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-6 bg-[#FAF7F2] border-b border-[#ECDCD5] animate-fadeIn">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-[#963D2C] text-white font-semibold'
                      : 'text-[#211613] hover:bg-[#FBECE7]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#FBECE7] text-[#963D2C] text-xs font-mono font-semibold border border-[#ECDCD5]"
              >
                <span>Admin Management Portal</span>
                <span className="text-[#963D2C]">&rarr;</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
