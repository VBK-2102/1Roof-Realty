import React from 'react';
import { 
  Building2, 
  FileCheck2, 
  ShieldCheck, 
  PhoneCall, 
  CheckCircle2
} from 'lucide-react';
import { VERIFIED_BUSINESS } from '../data/verifiedBusiness';
import { SEO } from '../components/common/SEO';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const ServicesPage: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <SEO 
        title="Real Estate Services & Advisory | 1Roof Realty India"
        description="Comprehensive property services: residential acquisition, commercial leasing, government biometric Leave & License registration, and NRI portfolio management."
      />

      {/* Header Banner */}
      <section className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal direction="down">
          <div className="p-8 sm:p-14 rounded-[40px] bento-card-dark text-white space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#B54D35]/30 rounded-full blur-3xl pointer-events-none"></div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFB088] text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authorized Advisory Services &bull; LLP Reg: {VERIFIED_BUSINESS.llpin}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Institutional Real Estate <br />
              <span className="font-serif-italic font-normal text-[#FFB088]">Services & Execution</span>
            </h1>

            <p className="text-sm sm:text-base text-[#ECDCD5]/90 leading-relaxed max-w-2xl">
              We provide structured, legally airtight real estate services across Western and Central India. Zero guesswork, certified legal documentation, and client-centric integrity.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VERIFIED_BUSINESS.services.map((service, idx) => (
            <ScrollReveal key={service.id} delay={idx * 0.08} direction="up">
              <div
                className="p-8 rounded-[36px] bg-white border border-[#ECDCD5] hover:shadow-[0_12px_40px_rgba(150,61,44,0.1)] transition-all duration-300 space-y-6 flex flex-col justify-between h-full"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#963D2C] text-white flex items-center justify-center shadow-md">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-[#B54D35] font-bold">
                      0{idx + 1} / Service
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#211613]">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5C4944] leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <div className="space-y-2 pt-2">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-[#211613]">
                        <CheckCircle2 className="w-4 h-4 text-[#963D2C] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#FBECE7] flex items-center justify-between">
                  <a
                    href={`tel:${VERIFIED_BUSINESS.contacts.primaryPhone}`}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#963D2C] hover:text-[#7A2514]"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call {VERIFIED_BUSINESS.contacts.primaryPhone}</span>
                  </a>

                  <Link
                    to="/contact"
                    className="px-5 py-2 rounded-full bg-[#963D2C] text-white text-xs font-semibold hover:bg-[#7A2514] transition-all"
                  >
                    Consult Now
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Special Spotlight: Government Biometric Leave & License */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal scale>
          <div className="rounded-[40px] bento-card-dark text-white p-8 sm:p-14 shadow-xl border border-[#FFB088]/20 relative overflow-hidden">
            <div className="max-w-3xl space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFB088] text-xs font-mono">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Government Registered Process</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Biometric Doorstep Leave & License Registration in Mumbai
              </h2>

              <p className="text-xs sm:text-sm text-[#ECDCD5]/90 leading-relaxed">
                In accordance with Maharashtra Rent Control laws, every tenancy requires registered digital documentation. Our authorized legal agents visit your home with certified biometric scanners to complete registration with the Inspector General of Registration (IGR Maharashtra).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                  <span className="text-[#FFB088] font-bold block mb-1">Step 1</span>
                  <span>Drafting with customized legal clauses & inventory annexures</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                  <span className="text-[#FFB088] font-bold block mb-1">Step 2</span>
                  <span>Doorstep Aadhaar biometric verification for owner & tenant</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                  <span className="text-[#FFB088] font-bold block mb-1">Step 3</span>
                  <span>Instant government seal, e-stamp duty & police intimation receipt</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-full bg-[#FFB088] text-[#3D1007] font-bold text-xs hover:bg-white transition-all shadow-md"
                >
                  Book Registration Slot
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
};
