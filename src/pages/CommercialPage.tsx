import React, { useState, useEffect } from 'react';
import { Property } from '../types';
import { DatabaseService } from '../services/db';
import { PropertyCard } from '../components/properties/PropertyCard';
import { DemoBadge } from '../components/common/DemoBadge';
import { SEO } from '../components/common/SEO';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { Briefcase } from 'lucide-react';

export const CommercialPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const all = await DatabaseService.getProperties({ category: 'commercial' });
      setProperties(all);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <SEO 
        title="Commercial Real Estate, Office Spaces & Retail | 1Roof Realty"
        description="Grade-A office floors, corporate IT parks, and high-visibility retail showrooms in Mumbai Powai and Indore Super Corridor with 1Roof Realty India."
      />

      <section className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal direction="down">
          <div className="p-8 sm:p-12 rounded-[40px] bento-card-dark text-white space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFB088] text-xs font-mono">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Commercial & Enterprise Real Estate</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Grade-A Corporate Offices & <br />
              <span className="font-serif-italic font-normal text-[#FFB088]">High-Street Retail Spaces</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#FBECE7]/80 max-w-2xl leading-relaxed">
              Institutional-grade commercial assets with high column-free floor plates, 100% DG backup, and prime transport accessibility in Powai, Mulund, and Indore TCS Square.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0.1}>
          <DemoBadge />

          {loading ? (
            <div className="py-20 text-center font-mono text-sm text-[#57443E]">Loading commercial spaces...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}
        </ScrollReveal>
      </section>
    </div>
  );
};
