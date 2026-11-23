import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Property, PropertyFilterParams } from '../types';
import { DatabaseService } from '../services/db';
import { PropertyCard } from '../components/properties/PropertyCard';
import { PropertySearch } from '../components/properties/PropertySearch';
import { DemoBadge } from '../components/common/DemoBadge';
import { SEO } from '../components/common/SEO';
import { ScrollReveal, ScrollStagger } from '../components/common/ScrollReveal';

export const PropertiesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<PropertyFilterParams>(() => {
    const f: PropertyFilterParams = {};
    if (searchParams.get('intent')) f.intent = searchParams.get('intent') as any;
    if (searchParams.get('category')) f.category = searchParams.get('category') as any;
    if (searchParams.get('city')) f.city = searchParams.get('city')!;
    if (searchParams.get('locality')) f.locality = searchParams.get('locality')!;
    if (searchParams.get('type')) f.propertyType = searchParams.get('type')!;
    if (searchParams.get('q')) f.searchQuery = searchParams.get('q')!;
    if (searchParams.get('bhk')) f.bedrooms = Number(searchParams.get('bhk'));
    return f;
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await DatabaseService.getProperties(filters);
      setProperties(res);
      setLoading(false);
    }
    load();
  }, [filters]);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <SEO 
        title="All Real Estate Listings & Properties | 1Roof Realty India"
        description="Search through all verified residential, commercial, luxury villas, and plots available across Mumbai and Central India with 1Roof Realty."
      />

      <section className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal direction="down">
          <div className="p-8 sm:p-12 rounded-[40px] bento-card-dark text-white space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#B54D35]/30 rounded-full blur-3xl pointer-events-none"></div>
            <span className="text-xs font-mono text-[#FFB088] uppercase tracking-wider font-semibold">
              Real-Time Property Portfolio
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Discover Verified <span className="font-serif-italic font-normal text-[#FFB088]">Properties</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#ECDCD5]/80 max-w-2xl leading-relaxed">
              Filter by purchase intent, city, configuration, budget, or possession readiness.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Filter Component */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0.1}>
          <PropertySearch
            initialFilters={filters}
            onFilterChange={(newF) => setFilters(newF)}
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
          <div className="py-20 text-center font-mono text-sm text-[#5C4944]">
            Searching properties...
          </div>
        ) : properties.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-white rounded-[32px] border border-[#ECDCD5] p-8 shadow-sm">
            <h3 className="text-lg font-bold text-[#3D1007]">No properties matched your current filters</h3>
            <p className="text-xs text-[#5C4944] max-w-md mx-auto">
              Try broadening your criteria or reset the filters to see all available inventory.
            </p>
            <button
              onClick={() => setFilters({})}
              className="mt-2 px-6 py-2.5 rounded-full bg-[#963D2C] text-white text-xs font-semibold hover:bg-[#7A2514]"
            >
              Clear All Filters
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
