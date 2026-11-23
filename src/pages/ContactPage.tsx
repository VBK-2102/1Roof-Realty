import React from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';
import { VERIFIED_BUSINESS } from '../data/verifiedBusiness';
import { EnquiryForm } from '../components/properties/EnquiryForm';
import { SEO } from '../components/common/SEO';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const ContactPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-16">
      <SEO 
        title="Contact Us & Offices | 1Roof Realty India"
        description="Connect with 1Roof Realty India (One Roof Realty LLP). Mumbai Corporate Office in Mulund East and Indore Regional Center at TCS Square."
      />

      {/* Header Banner */}
      <section className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal direction="down">
          <div className="p-8 sm:p-14 rounded-[40px] bento-card-dark text-white space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#B54D35]/30 rounded-full blur-3xl pointer-events-none"></div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFB088] text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authorized Corporate Contacts &bull; LLPIN: {VERIFIED_BUSINESS.llpin}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Connect with <span className="font-serif-italic font-normal text-[#FFB088]">1Roof Realty</span>
            </h1>

            <p className="text-sm sm:text-base text-[#ECDCD5]/90 leading-relaxed max-w-2xl">
              Have a question regarding residential acquisition, commercial leasing, or leave-and-license registration? Our executive team in Mumbai and Indore is ready to assist.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Contact Grid: Form + Office Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="left">
              <EnquiryForm />
            </ScrollReveal>
          </div>

          {/* Right Column: Verified Office Locations */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Box */}
            <ScrollReveal direction="right" delay={0.05}>
              <div className="p-6 rounded-[32px] bg-white border border-[#ECDCD5] shadow-sm space-y-4">
                <span className="text-[10px] font-mono text-[#B54D35] uppercase tracking-wider font-semibold">
                  Instant Telephony & Messaging
                </span>

                <div className="space-y-3 text-xs">
                  <a
                    href={`tel:${VERIFIED_BUSINESS.contacts.primaryPhone}`}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FAF7F2] hover:bg-[#FBECE7] transition-colors border border-[#ECDCD5]"
                  >
                    <Phone className="w-4 h-4 text-[#963D2C]" />
                    <div>
                      <span className="text-[10px] text-[#5C4944] block">Direct Advisory Line</span>
                      <strong className="font-mono text-sm text-[#963D2C]">{VERIFIED_BUSINESS.contacts.primaryPhone}</strong>
                    </div>
                  </a>

                  <a
                    href={`mailto:${VERIFIED_BUSINESS.contacts.email}`}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FAF7F2] hover:bg-[#FBECE7] transition-colors border border-[#ECDCD5]"
                  >
                    <Mail className="w-4 h-4 text-[#963D2C]" />
                    <div>
                      <span className="text-[10px] text-[#5C4944] block">Official Email Inquiries</span>
                      <strong className="font-mono text-xs text-[#963D2C] block truncate">{VERIFIED_BUSINESS.contacts.email}</strong>
                    </div>
                  </a>

                  <div className="flex items-center gap-2 p-3 text-[11px] text-[#5C4944] font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#B54D35]" />
                    <span>{VERIFIED_BUSINESS.contacts.workingHours}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Office 1: Mumbai */}
            <ScrollReveal direction="right" delay={0.1}>
              <div className="p-6 rounded-[32px] bg-white border border-[#ECDCD5] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#963D2C] text-white">
                    Mumbai Registered HQ
                  </span>
                  <span className="text-xs font-mono text-[#B54D35] font-bold">Maharashtra</span>
                </div>

                <h4 className="text-sm font-bold text-[#211613]">{VERIFIED_BUSINESS.offices[0].name}</h4>
                <p className="text-xs text-[#5C4944] leading-relaxed">
                  {VERIFIED_BUSINESS.offices[0].addressLine1}, {VERIFIED_BUSINESS.offices[0].addressLine2}, {VERIFIED_BUSINESS.offices[0].city} – {VERIFIED_BUSINESS.offices[0].pincode}
                </p>

                <div className="rounded-2xl overflow-hidden border border-[#ECDCD5] aspect-[16/9] mt-3">
                  <iframe
                    title="Mumbai Office Map"
                    src={VERIFIED_BUSINESS.offices[0].mapEmbedUrl}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    style={{ border: 0 }}
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Office 2: Indore */}
            <ScrollReveal direction="right" delay={0.15}>
              <div className="p-6 rounded-[32px] bg-white border border-[#ECDCD5] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#6E2214] text-white">
                    Central India Regional Center
                  </span>
                  <span className="text-xs font-mono text-[#B54D35] font-bold">Madhya Pradesh</span>
                </div>

                <h4 className="text-sm font-bold text-[#211613]">{VERIFIED_BUSINESS.offices[1].name}</h4>
                <p className="text-xs text-[#5C4944] leading-relaxed">
                  {VERIFIED_BUSINESS.offices[1].addressLine1}, {VERIFIED_BUSINESS.offices[1].addressLine2}, {VERIFIED_BUSINESS.offices[1].city} – {VERIFIED_BUSINESS.offices[1].pincode}
                </p>

                <div className="rounded-2xl overflow-hidden border border-[#ECDCD5] aspect-[16/9] mt-3">
                  <iframe
                    title="Indore Office Map"
                    src={VERIFIED_BUSINESS.offices[1].mapEmbedUrl}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    style={{ border: 0 }}
                  />
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

    </div>
  );
};
