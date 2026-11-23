import React from 'react';
import { SEO } from '../components/common/SEO';
import { VERIFIED_BUSINESS } from '../data/verifiedBusiness';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <SEO 
        title="Terms and Conditions | 1Roof Realty India"
        description="Terms of engagement, advisory standards, and RERA disclaimer for One Roof Realty LLP."
      />

      <ScrollReveal direction="down">
        <div className="border-b border-[#F1D6CE] pb-6 space-y-2">
          <span className="text-xs font-mono text-[#963D2C] uppercase tracking-wider font-semibold">
            Legal Framework
          </span>
          <h1 className="text-3xl font-extrabold text-[#141912]">Terms and Conditions</h1>
          <p className="text-xs text-[#57443E] font-mono">
            One Roof Realty LLP (LLPIN: {VERIFIED_BUSINESS.llpin}, Regd: August 16, 2017)
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <div className="prose prose-sm max-w-none text-xs sm:text-sm text-[#57443E] leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#141912]">1. Nature of Advisory Services</h2>
            <p>
              1Roof Realty India acts as an authorized real estate consultant and transaction facilitator between prospective buyers, tenants, owners, and developers. All property representations are based on documentation furnished by respective titleholders and developers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#141912]">2. RERA Compliance & Buyer Due Diligence</h2>
            <p>
              Buyers and investors are advised to independently review MahaRERA / RERA project certificates, sanctioned layout plans, and carpet area definitions prior to executing formal deeds of conveyance or allotting advance payments.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#141912]">3. Leave & License Registration Procedures</h2>
            <p>
              Government Leave & License agreements are registered digitally with the appropriate stamp offices. Parties must present valid government identity documents (Aadhaar & PAN) for biometric verification.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#141912]">4. Jurisdiction</h2>
            <p>
              Any disputes arising out of property consultations shall be subject to the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra.
            </p>
          </section>
        </div>
      </ScrollReveal>
    </div>
  );
};
