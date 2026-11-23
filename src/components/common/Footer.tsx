import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Clock
} from 'lucide-react';
import { VERIFIED_BUSINESS } from '../../data/verifiedBusiness';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3D1007] text-[#ECDCD5] pt-16 pb-12 border-t border-[#6E2214] relative overflow-hidden">
      {/* Subtle background radial brick glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#963D2C]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-[#6E2214]/80">
          
          {/* Brand & Verified Credentials */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#963D2C] via-[#8C2D19] to-[#6E2214] flex items-center justify-center border border-[#FFB088]/30 shadow-md">
                <span className="font-mono font-bold text-lg text-white">1R</span>
              </div>
              <div>
                <span className="font-sans font-extrabold text-xl tracking-tight text-white">
                  1ROOF
                </span>
                <span className="font-serif-italic text-base text-[#FFB088] ml-1.5">
                  Realty India
                </span>
              </div>
            </div>

            <p className="text-xs text-[#ECDCD5]/80 leading-relaxed max-w-md">
              <strong className="text-white">{VERIFIED_BUSINESS.legalName}</strong> (LLPIN: <span className="font-mono text-[#FFB088]">{VERIFIED_BUSINESS.llpin}</span>) is an institutional property consultancy incorporated in August 2017. Handling residential acquisitions, commercial leasing, biometric Leave & License registration, and strategic land investments across Mumbai & Central India.
            </p>

            <div className="p-3.5 rounded-2xl bg-[#6E2214]/40 border border-[#FFB088]/15 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#FFB088] shrink-0 mt-0.5" />
              <div className="text-[11px] text-[#ECDCD5]/90 leading-tight">
                <strong className="text-white font-mono">Government Registered Indian LLP</strong>
                <p className="mt-0.5 text-[10px] text-[#ECDCD5]/70">
                  Registered with ROC Mumbai, Maharashtra. HQ: Shree Ramkrishna Niwas CHS Ltd., Mulund East.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links (Streamlined) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs text-[#FFB088] uppercase tracking-wider font-semibold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Home</span>
                  <span className="text-[10px] text-[#FFB088] opacity-0 group-hover:opacity-100">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Browse Properties</span>
                  <span className="text-[10px] text-[#FFB088] opacity-0 group-hover:opacity-100">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Sell Your Property</span>
                  <span className="text-[10px] text-[#FFB088] opacity-0 group-hover:opacity-100">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Real Estate Services</span>
                  <span className="text-[10px] text-[#FFB088] opacity-0 group-hover:opacity-100">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>About 1Roof</span>
                  <span className="text-[10px] text-[#FFB088] opacity-0 group-hover:opacity-100">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Contact & Offices</span>
                  <span className="text-[10px] text-[#FFB088] opacity-0 group-hover:opacity-100">&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Real Estate Services & Locations */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs text-[#FFB088] uppercase tracking-wider font-semibold">
              Services & Hubs
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Leave & License Registration
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Commercial Leasing
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  NRI Portfolio Advisory
                </Link>
              </li>
              <li>
                <Link to="/locations/mulund-east-mumbai" className="hover:text-white transition-colors">
                  Mulund East Corridor
                </Link>
              </li>
              <li>
                <Link to="/locations/powai-mumbai" className="hover:text-white transition-colors">
                  Powai Tech Corridor
                </Link>
              </li>
              <li>
                <Link to="/locations/super-corridor-indore" className="hover:text-white transition-colors">
                  Super Corridor Indore
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Verified Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs text-[#FFB088] uppercase tracking-wider font-semibold">
              Verified Contacts
            </h4>
            
            <div className="space-y-3 text-xs">
              <a 
                href={`tel:${VERIFIED_BUSINESS.contacts.primaryPhone}`}
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#6E2214]/40 hover:bg-[#6E2214]/70 transition-colors border border-[#FFB088]/15"
              >
                <Phone className="w-4 h-4 text-[#FFB088]" />
                <div>
                  <span className="text-[10px] text-[#D9B7AD] block">Direct Advisory Phone</span>
                  <span className="font-mono text-white font-medium">{VERIFIED_BUSINESS.contacts.primaryPhone}</span>
                </div>
              </a>

              <a 
                href={`mailto:${VERIFIED_BUSINESS.contacts.email}`}
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#6E2214]/40 hover:bg-[#6E2214]/70 transition-colors border border-[#FFB088]/15"
              >
                <Mail className="w-4 h-4 text-[#FFB088]" />
                <div>
                  <span className="text-[10px] text-[#D9B7AD] block">Official Corporate Email</span>
                  <span className="font-mono text-white text-[11px] truncate block">{VERIFIED_BUSINESS.contacts.email}</span>
                </div>
              </a>
            </div>

            <div className="pt-2 text-[11px] text-[#ECDCD5]/70 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#FFB088]" />
              <span>{VERIFIED_BUSINESS.contacts.workingHours}</span>
            </div>
          </div>
        </div>

        {/* Office Locations Strip */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-[#6E2214]/80 text-xs">
          {VERIFIED_BUSINESS.offices.map((office) => (
            <div key={office.id} className="p-4 rounded-2xl bg-[#6E2214]/30 border border-[#ECDCD5]/10">
              <div className="flex items-center gap-2 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FFB088]" />
                <h5 className="font-bold text-white text-xs">{office.name}</h5>
              </div>
              <p className="text-[#ECDCD5]/80 text-[11px] leading-relaxed">
                {office.addressLine1}, {office.addressLine2}, {office.city}, {office.state} – {office.pincode}
              </p>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer & Bottom Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#ECDCD5]/60">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>&copy; {new Date().getFullYear()} {VERIFIED_BUSINESS.legalName}. All rights reserved.</span>
            <span>&bull;</span>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>&bull;</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>&bull;</span>
            <Link to="/admin" className="font-mono text-[#FFB088] hover:underline">Admin Login</Link>
          </div>

          <div className="font-serif-italic text-xs text-[#FFB088]">
            "Find Your Place. Build Your Future."
          </div>
        </div>
      </div>
    </footer>
  );
};
