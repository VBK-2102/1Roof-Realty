import React from 'react';
import { SEO } from '../components/common/SEO';
import { VERIFIED_BUSINESS } from '../data/verifiedBusiness';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <SEO 
        title="Privacy Policy | 1Roof Realty India"
        description="Data protection and privacy guidelines for One Roof Realty LLP. Compliance with digital personal data protection norms."
      />

      <ScrollReveal animation="fade-up">
        <div className="border-b border-[#F1D6CE] pb-6 space-y-2">
          <span className="text-xs font-mono text-[#963D2C] uppercase tracking-wider font-semibold">
            Data Governance & Confidentiality
          </span>
          <h1 className="text-3xl font-extrabold text-[#141912]">Privacy Policy</h1>
          <p className="text-xs text-[#57443E] font-mono">
            Last Updated: February 2025 &bull; {VERIFIED_BUSINESS.legalName} (LLPIN: {VERIFIED_BUSINESS.llpin})
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" delay={0.1}>
        <div className="prose prose-sm max-w-none text-xs sm:text-sm text-[#57443E] leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#141912]">1. Information We Collect</h2>
            <p>
              When you inquire about a property, schedule a site visit, or submit a property for sale/lease through 1Roof Realty India (One Roof Realty LLP), we collect your name, phone number, email address, property preferences, and transaction intent.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#141912]">2. Use of Information</h2>
            <p>
              We use your information exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Coordinate verified site visits with property owners and authorized developers.</li>
              <li>Execute digital government Leave & License agreements upon your request.</li>
              <li>Provide accurate real estate market valuations and comparative market analysis.</li>
              <li>Communicate directly via phone, SMS, email, or WhatsApp.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#141912]">3. Zero Spam & Strict Non-Disclosure</h2>
            <p>
              We do not sell, rent, or trade client phone numbers or email addresses to third-party telemarketers or external lead brokers. Your contact details remain confidential within the authorized 1Roof Realty consulting team.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#141912]">4. Grievance & Compliance Officer</h2>
            <p>
              For privacy inquiries or data removal requests, contact our Compliance Desk at{' '}
              <a href={`mailto:${VERIFIED_BUSINESS.contacts.email}`} className="text-[#963D2C] font-bold underline">
                {VERIFIED_BUSINESS.contacts.email}
              </a>{' '}
              or write to: One Roof Realty LLP, Shop No. 1, Ground Floor, Shree Ramkrishna Niwas CHS Ltd., G.V. Scheme Road No. 1, Mulund East, Mumbai 400081.
            </p>
          </section>
        </div>
      </ScrollReveal>
    </div>
  );
};
