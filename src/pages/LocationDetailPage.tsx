import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LOCATIONS_DATA } from '../data/locationsData';
import { DatabaseService } from '../services/db';
import { Property } from '../types';
import { PropertyCard } from '../components/properties/PropertyCard';
import { SEO } from '../components/common/SEO';
import { MapPin, Navigation, CheckCircle2, ArrowLeft } from 'lucide-react';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const LocationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const locationInfo = LOCATIONS_DATA.find(l => l.slug === slug) || LOCATIONS_DATA[0];

  useEffect(() => {
    async function loadProperties() {
      setLoading(true);
      const all = await DatabaseService.getProperties({ locality: locationInfo.locality });
      setProperties(all);
      setLoading(false);
    }
    loadProperties();
  }, [locationInfo]);

  return (
    <div className="space-y-16 pb-16">
      <SEO 
        title={`${locationInfo.locality}, ${locationInfo.city} — Real Estate Dossier | 1Roof Realty`}
        description={locationInfo.tagline}
        image={locationInfo.featuredImageUrl}
      />

      {/* Header Banner */}
      <section className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal direction="down">
          <div className="p-8 sm:p-14 rounded-[40px] bento-card-dark text-white space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#B54D35]/30 rounded-full blur-3xl pointer-events-none"></div>

            <Link
              to="/locations"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FFB088] hover:underline mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Locations</span>
            </Link>

            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FFB088]" />
              <span className="text-xs font-mono text-[#ECDCD5] uppercase tracking-wider">
                {locationInfo.city}, {locationInfo.state}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {locationInfo.locality}
            </h1>

            <p className="text-sm sm:text-base text-[#ECDCD5]/90 leading-relaxed max-w-2xl font-serif-italic">
              "{locationInfo.tagline}"
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/15 font-mono text-xs">
              <div>
                <span className="text-xl font-bold text-white block">{locationInfo.avgPricePerSqFt}</span>
                <span className="text-[#ECDCD5]/75">Average Capital Rate</span>
              </div>
              <div>
                <span className="text-xl font-bold text-[#FFB088] block">{locationInfo.rentalYield}</span>
                <span className="text-[#ECDCD5]/75">Gross Rental Yield</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Overview & Connectivity */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7">
            <ScrollReveal direction="left">
              <div className="p-8 rounded-[36px] bg-white border border-[#ECDCD5] shadow-sm space-y-5">
                <h2 className="text-xl font-bold text-[#211613]">Micro-Market Strategic Profile</h2>
                <p className="text-xs sm:text-sm text-[#5C4944] leading-relaxed">
                  {locationInfo.description}
                </p>

                <div className="pt-2 space-y-2.5">
                  <h3 className="text-xs font-mono text-[#B54D35] uppercase tracking-wider font-bold">Key Node Highlights</h3>
                  {locationInfo.keyHighlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#211613]">
                      <CheckCircle2 className="w-4 h-4 text-[#963D2C] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal direction="right">
              <div className="p-8 rounded-[36px] bg-[#FAF7F2] border border-[#ECDCD5] shadow-sm space-y-5">
                <div className="flex items-center gap-2 text-xs font-mono text-[#963D2C] font-bold">
                  <Navigation className="w-4 h-4" />
                  <span>Connectivity & Transit Artery</span>
                </div>

                <div className="space-y-3 divide-y divide-[#FBECE7] text-xs">
                  {locationInfo.connectivity.map((conn, idx) => (
                    <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between">
                      <span className="text-[#5C4944]">{conn.split(':')[0]}</span>
                      <strong className="font-mono text-[#963D2C]">{conn.split(':')[1]}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* Properties in this Location */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="border-b border-[#FBECE7] pb-4 mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#211613]">
                Available Properties in {locationInfo.locality}
              </h2>
              <p className="text-xs text-[#5C4944] mt-0.5">
                Verified residential & commercial listings.
              </p>
            </div>

            <span className="font-mono text-xs text-[#963D2C] bg-[#FBECE7] px-3.5 py-1 rounded-full border border-[#ECDCD5]">
              {properties.length} Active Listings
            </span>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="py-16 text-center font-mono text-xs text-[#5C4944]">Searching locality inventory...</div>
        ) : properties.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-[#ECDCD5] space-y-2">
            <p className="text-xs text-[#5C4944]">Currently, new inventory in this pocket is under verification.</p>
            <Link to="/properties" className="text-xs font-semibold text-[#963D2C] underline">
              Browse other locations
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map(p => (
              <ScrollReveal key={p.id} direction="up">
                <PropertyCard property={p} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
