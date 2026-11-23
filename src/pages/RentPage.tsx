import React, { useState, useEffect } from 'react';
import { Property, PropertyFilterParams } from '../types';
import { DatabaseService } from '../services/db';
import { PropertyCard } from '../components/properties/PropertyCard';
import { PropertySearch } from '../components/properties/PropertySearch';
import { DemoBadge } from '../components/common/DemoBadge';
import { SEO } from '../components/common/SEO';
import { FileCheck2, CheckCircle2 } from 'lucide-react';
import { VERIFIED_BUSINESS } from '../data/verifiedBusiness';
import { ScrollReveal, ScrollStagger } from '../components/common/ScrollReveal';

export const RentPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PropertyFilterParams>({ intent: 'rent' });

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      const res = await DatabaseService.getProperties({ ...filters, intent: 'rent' });
      setProperties(res);
      setLoading(false);
    }
    fetchProperties();
  }, [filters]);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <SEO 
        title="Rent Property & Flats in Mumbai & Indore | 1Roof Realty India"
        description="Curated rental apartments, furnished corporate flats, and commercial offices with official government Leave & License digital registration by 1Roof Realty India."
      />

      {/* Header Banner */}
      <section className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal direction="down">
          <div className="p-8 sm:p-12 rounded-[40px] bento-card-dark text-white space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#B54D35]/30 rounded-full blur-3xl pointer-events-none"></div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFB088] text-xs font-mono">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Official Leave & License Included</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Curated Rental Homes & <span className="font-serif-italic font-normal text-[#FFB088]">Corporate Residences</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#ECDCD5]/80 max-w-2xl leading-relaxed">
              Move into verified, high-quality apartments and commercial properties. We manage the entire lease lifecycle: drafting, biometric doorstep registration, stamp duty submission, and police intimation.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Leave & License Feature Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="p-6 rounded-[32px] bg-white border border-[#ECDCD5] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs shadow-sm">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#963D2C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#211613] font-bold">Doorstep Biometric Verification</strong>
                <p className="text-[11px] text-[#5C4944] mt-0.5">Government UIDAI biometric registration at your convenient timing.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#963D2C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#211613] font-bold">Transparent Security Escrows</strong>
                <p className="text-[11px] text-[#5C4944] mt-0.5">Clear deposit handover terms and standardized inventory audit reports.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#963D2C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#211613] font-bold">100% Verified Landlord Titles</strong>
                <p className="text-[11px] text-[#5C4944] mt-0.5">Zero brokerage disputes. Thorough society NOC and ownership checks.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Search & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0.1}>
          <PropertySearch
            initialFilters={{ intent: 'rent' }}
            onFilterChange={(newFilters) => setFilters(newFilters)}
            resultCount={properties.length}
          />
        </ScrollReveal>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <DemoBadge />
        </ScrollReveal>

        {loading ? (
          <div className="py-20 text-center text-sm font-mono text-[#5C4944]">
            Loading rental properties...
          </div>
        ) : properties.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-white rounded-[32px] border border-[#ECDCD5] p-8 shadow-sm">
            <h3 className="text-lg font-bold text-[#3D1007]">No rental properties currently matched</h3>
            <p className="text-xs text-[#5C4944] max-w-md mx-auto">
              We have off-market rental inventory in Mulund, Powai, and Indore. Contact our rental desk at {VERIFIED_BUSINESS.contacts.primaryPhone}.
            </p>
          </div>
        ) : (
          <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((prop) => (
              <ScrollReveal key={prop.id} direction="up">
                <PropertyCard property={prop} />
              </ScrollReveal>
            ))}
          </ScrollStagger>
        )}
      </section>

    </div>
  );
};
