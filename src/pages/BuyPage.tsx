import React, { useState, useEffect } from 'react';
import { Property, PropertyFilterParams } from '../types';
import { DatabaseService } from '../services/db';
import { PropertyCard } from '../components/properties/PropertyCard';
import { PropertySearch } from '../components/properties/PropertySearch';
import { DemoBadge } from '../components/common/DemoBadge';
import { SEO } from '../components/common/SEO';
import { KeyRound } from 'lucide-react';
import { ScrollReveal, ScrollStagger } from '../components/common/ScrollReveal';

export const BuyPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PropertyFilterParams>({ intent: 'buy' });

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      const res = await DatabaseService.getProperties({ ...filters, intent: 'buy' });
      setProperties(res);
      setLoading(false);
    }
    fetchProperties();
  }, [filters]);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <SEO 
        title="Buy Property in Mumbai & Indore | 1Roof Realty India"
        description="Explore verified residential flats, luxury penthouses, villas, and commercial spaces for sale across Mulund East, Powai, and Super Corridor Indore."
      />

      {/* Header Banner */}
      <section className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal direction="down">
          <div className="p-8 sm:p-12 rounded-[40px] bento-card-dark text-white space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#B54D35]/30 rounded-full blur-3xl pointer-events-none"></div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFB088] text-xs font-mono">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Property Acquisition &bull; Clear Legal Titles</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Buy Verified Real Estate in <span className="font-serif-italic font-normal text-[#FFB088]">Mumbai & Central India</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#ECDCD5]/80 max-w-2xl leading-relaxed">
              Every listing in our portfolio undergoes thorough RERA checks, society title scrutiny, and valuation validation. Discover your dream home or next high-return investment with 1Roof Realty.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Search & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0.1}>
          <PropertySearch
            initialFilters={{ intent: 'buy' }}
            onFilterChange={(newFilters) => setFilters(newFilters)}
            resultCount={properties.length}
          />
        </ScrollReveal>
      </section>

      {/* Property Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <DemoBadge />
        </ScrollReveal>

        {loading ? (
          <div className="py-20 text-center text-sm font-mono text-[#5C4944]">
            Loading verified buy listings...
          </div>
        ) : properties.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-white rounded-[32px] border border-[#ECDCD5] p-8 shadow-sm">
            <h3 className="text-lg font-bold text-[#3D1007]">No properties matched your criteria</h3>
            <p className="text-xs text-[#5C4944] max-w-md mx-auto">
              Try adjusting your price range, city, or property type filters, or connect directly with our advisory desk.
            </p>
            <button
              onClick={() => setFilters({ intent: 'buy' })}
              className="mt-2 px-6 py-2 rounded-full bg-[#963D2C] text-white text-xs font-semibold hover:bg-[#7A2514]"
            >
              Reset Filters
            </button>
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
