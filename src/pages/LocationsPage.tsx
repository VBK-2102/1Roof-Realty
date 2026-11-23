import React from 'react';
import { Link } from 'react-router-dom';
import { LOCATIONS_DATA } from '../data/locationsData';
import { SEO } from '../components/common/SEO';
import { ArrowRight, Compass } from 'lucide-react';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const LocationsPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-16">
      <SEO 
        title="Location Discovery — Mumbai & Central India | 1Roof Realty"
        description="Explore prime real estate micro-markets: Mulund East, Powai Tech Corridor, and Indore Super Corridor. Price trends, connectivity, and verified listings."
      />

      <section className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal direction="down">
          <div className="p-8 sm:p-14 rounded-[40px] bento-card-dark text-white space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#B54D35]/30 rounded-full blur-3xl pointer-events-none"></div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFB088] text-xs font-mono">
              <Compass className="w-3.5 h-3.5" />
              <span>Strategic Micro-Market Intelligence</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Explore Properties by <br />
              <span className="font-serif-italic font-normal text-[#FFB088]">Growth Corridor</span>
            </h1>

            <p className="text-sm sm:text-base text-[#ECDCD5]/90 leading-relaxed max-w-2xl">
              Location defines capital appreciation and daily lifestyle quality. Review deep micro-market reports, average rates per sq.ft, and active listings in our primary operating nodes.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LOCATIONS_DATA.map((loc, idx) => (
            <ScrollReveal key={loc.slug} delay={idx * 0.1} direction="up">
              <Link
                to={`/locations/${loc.slug}`}
                className="group rounded-[36px] overflow-hidden bg-white border border-[#ECDCD5] hover:shadow-[0_12px_40px_rgba(150,61,44,0.12)] hover:border-[#D9B7AD] transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#3D1007]">
                    <img
                      src={loc.featuredImageUrl}
                      alt={loc.locality}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3D1007]/80 via-transparent to-transparent"></div>
                    
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-xs font-mono text-[#FFB088] uppercase tracking-wider block">
                        {loc.city}, {loc.state}
                      </span>
                      <h3 className="text-2xl font-bold group-hover:text-[#FFB088] transition-colors">
                        {loc.locality}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <p className="text-xs sm:text-sm text-[#5C4944] leading-relaxed">
                      {loc.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 py-3 px-4 rounded-2xl bg-[#FAF7F2] border border-[#ECDCD5] font-mono text-xs">
                      <div>
                        <span className="text-[10px] text-[#B54D35] block">Average Rate</span>
                        <strong className="text-[#963D2C]">{loc.avgPricePerSqFt}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#B54D35] block">Gross Rental Yield</span>
                        <strong className="text-[#963D2C]">{loc.rentalYield}</strong>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      {loc.keyHighlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#211613]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#963D2C]"></span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2 flex items-center justify-between text-xs font-mono font-bold text-[#963D2C] border-t border-[#FBECE7]">
                  <span>View Locality Dossier & Listings</span>
                  <span className="w-8 h-8 rounded-full bg-[#FBECE7] group-hover:bg-[#963D2C] group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
};
