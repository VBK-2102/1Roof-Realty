import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { VERIFIED_BUSINESS } from '../data/verifiedBusiness';
import { SEO } from '../components/common/SEO';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <SEO 
        title="About Us | 1Roof Realty India (One Roof Realty LLP)"
        description="Learn about 1Roof Realty India (One Roof Realty LLP, LLPIN: AAK-3190, incorporated August 2017). Meet our founders and explore our track record across Mumbai and Central India."
      />

      {/* Header Banner */}
      <section className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal direction="down">
          <div className="p-8 sm:p-14 rounded-[40px] bento-card-dark text-white space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#B54D35]/30 rounded-full blur-3xl pointer-events-none"></div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFB088] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#FFB088] pulse-brick"></span>
              <span>Incorporated August 16, 2017 &bull; ROC Mumbai</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              The Story of <span className="font-serif-italic font-normal text-[#FFB088]">1Roof Realty</span>
            </h1>

            <p className="text-sm sm:text-base text-[#ECDCD5]/90 leading-relaxed max-w-2xl font-normal">
              Built on transparency, institutional rigor, and thorough legal diligence. Operating as <strong>{VERIFIED_BUSINESS.legalName}</strong> (LLPIN: {VERIFIED_BUSINESS.llpin}), we have shaped hundreds of seamless property journeys across the Mumbai Metropolitan Region and Central India.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/15 font-mono text-xs">
              <div>
                <span className="text-xl sm:text-2xl font-bold text-white block">2017</span>
                <span className="text-[#ECDCD5]/75">Year Incorporated</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-white block">1,450+</span>
                <span className="text-[#ECDCD5]/75">Transactions Assisted</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-white block">2 Hubs</span>
                <span className="text-[#ECDCD5]/75">Mumbai & Indore</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-[#FFB088] block">100%</span>
                <span className="text-[#ECDCD5]/75">RERA & Title Checked</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Verified Company Origins & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="left">
              <span className="text-xs font-mono text-[#B54D35] uppercase tracking-wider font-semibold">
                Our Foundations
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#211613] tracking-tight leading-tight mt-2">
                A Legacy of Trust, Documented Excellence & Market Integrity.
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-[#5C4944] leading-relaxed mt-3">
                <p>
                  Founded in Mumbai in August 2017, <strong>One Roof Realty LLP</strong> was conceived with a clear principle: real estate decisions are life-defining milestones that demand uncompromised legal clarity, accurate valuation, and zero speculative fluff.
                </p>
                <p>
                  From our registered corporate presence in Mulund East, Mumbai, to our regional center at TCS Square along the Super Corridor in Indore, we deliver high-touch property acquisitions, corporate office leasing, and official government-registered Leave & License services.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FBECE7] border border-[#ECDCD5] flex items-start gap-3 mt-4">
                <ShieldCheck className="w-5 h-5 text-[#963D2C] shrink-0 mt-0.5" />
                <div className="text-xs text-[#3D1007]">
                  <strong className="block font-bold">Government Certified Operations</strong>
                  <p className="text-[11px] text-[#5C4944] mt-0.5">
                    LLPIN: {VERIFIED_BUSINESS.llpin} registered with the Ministry of Corporate Affairs, Government of India.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ScrollReveal direction="up" delay={0.05}>
              <div className="p-6 rounded-[28px] bg-white border border-[#ECDCD5] shadow-sm space-y-2 h-full">
                <span className="text-xs font-mono text-[#B54D35] font-bold">01 / Our Mission</span>
                <h4 className="text-base font-bold text-[#211613]">Clarity Over Confusion</h4>
                <p className="text-xs text-[#5C4944] leading-relaxed">
                  To simplify property discovery, eliminate hidden clauses, and ensure every buyer and tenant enjoys total peace of mind.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <div className="p-6 rounded-[28px] bg-white border border-[#ECDCD5] shadow-sm space-y-2 h-full">
                <span className="text-xs font-mono text-[#B54D35] font-bold">02 / Our Vision</span>
                <h4 className="text-base font-bold text-[#211613]">Modern Institutional Standard</h4>
                <p className="text-xs text-[#5C4944] leading-relaxed">
                  To be the most reliable, technology-enabled property consultancy connecting Western and Central India’s growth arteries.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.15}>
              <div className="p-6 rounded-[28px] bg-white border border-[#ECDCD5] shadow-sm space-y-2 h-full">
                <span className="text-xs font-mono text-[#B54D35] font-bold">03 / Core Values</span>
                <h4 className="text-base font-bold text-[#211613]">Legal Diligence First</h4>
                <p className="text-xs text-[#5C4944] leading-relaxed">
                  Zero compromise on title scrutiny, society approvals, municipal sanctions, and developer track records.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="p-6 rounded-[28px] bg-white border border-[#ECDCD5] shadow-sm space-y-2 h-full">
                <span className="text-xs font-mono text-[#B54D35] font-bold">04 / Client Care</span>
                <h4 className="text-base font-bold text-[#211613]">End-to-End Handholding</h4>
                <p className="text-xs text-[#5C4944] leading-relaxed">
                  From initial site visit arrangements to doorstep biometric Leave & License registration and final key handover.
                </p>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* Verified Leadership Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-[#B54D35] uppercase tracking-wider font-semibold">
              Executive Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#211613] tracking-tight mt-1">
              Meet the Partners of 1Roof Realty
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4944] mt-1.5">
              Verified designated partners and regional directors driving client success.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VERIFIED_BUSINESS.leadership.map((leader, i) => (
            <ScrollReveal key={i} delay={i * 0.1} direction="up">
              <div
                className="p-8 rounded-[36px] bg-white border border-[#ECDCD5] hover:shadow-[0_12px_40px_rgba(150,61,44,0.1)] transition-all space-y-4 flex flex-col justify-between h-full"
              >
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#963D2C] text-white flex items-center justify-center font-bold text-lg font-mono shadow-md">
                    {leader.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#211613]">{leader.name}</h3>
                    <span className="text-xs text-[#B54D35] font-mono font-medium block">
                      {leader.role}
                    </span>
                  </div>

                  <p className="text-xs text-[#5C4944] leading-relaxed">
                    Focus: <strong className="text-[#211613]">{leader.focus}</strong>
                  </p>
                </div>

                <div className="pt-4 border-t border-[#FBECE7] flex items-center justify-between text-[11px] font-mono text-[#963D2C]">
                  <span>Track Record</span>
                  <span className="font-bold">{leader.experience}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal scale>
          <div className="p-8 sm:p-12 rounded-[40px] bento-card-dark text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-bold">Have a property requirement or want to list?</h2>
              <p className="text-xs sm:text-sm text-[#ECDCD5]/80">
                Speak directly with Sachin Dhotre, Vishal Ujjainkar, or Sandeep Choudhary today.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-full bg-[#FFB088] text-[#3D1007] font-bold text-xs hover:bg-white transition-all shadow-md"
              >
                Contact Us Today
              </Link>
              <Link
                to="/sell"
                className="px-6 py-3 rounded-full bg-white/10 text-white font-semibold text-xs border border-white/20 hover:bg-white/20 transition-all"
              >
                Submit Property
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
};
