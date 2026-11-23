import React, { useState, useEffect } from 'react';
import { Property } from '../types';
import { DatabaseService } from '../services/db';
import { PropertyCard } from '../components/properties/PropertyCard';
import { DemoBadge } from '../components/common/DemoBadge';
import { SEO } from '../components/common/SEO';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { Compass } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const all = await DatabaseService.getProperties();
      // Projects or plots or under construction
      setProperties(all.filter(p => p.category === 'plots' || p.category === 'projects' || p.availability.includes('Construction') || p.propertyType.includes('Plot') || p.isFeatured));
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <SEO 
        title="New Projects, Villa Plots & Master Townships | 1Roof Realty"
        description="Explore RERA-approved residential projects, master planned villa plotting developments along the Indore Super Corridor and Mumbai Eastern corridor."
      />

      <section className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal animation="fade-up">
          <div className="p-8 sm:p-12 rounded-[40px] bento-card-dark text-white space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFB088] text-xs font-mono">
              <Compass className="w-3.5 h-3.5" />
              <span>Master Townships & Villa Plots</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              New Projects & <span className="font-serif-italic font-normal text-[#FFB088]">High-Growth Land Corridors</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#FBECE7]/80 max-w-2xl leading-relaxed">
              Gain early-entry pricing on RERA-certified developments, gated plotting projects, and master-planned communities engineered for superior long-term capital appreciation.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up" delay={0.1}>
          <DemoBadge />

          {loading ? (
            <div className="py-20 text-center font-mono text-sm text-[#57443E]">Loading project developments...</div>
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
