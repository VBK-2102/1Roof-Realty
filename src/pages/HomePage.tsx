import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Building2, 
  Key, 
  Compass, 
  CheckCircle2,
  PhoneCall,
  Star
} from 'lucide-react';
import { Property, PropertyFilterParams } from '../types';
import { DatabaseService } from '../services/db';
import { VERIFIED_BUSINESS } from '../data/verifiedBusiness';
import { LOCATIONS_DATA } from '../data/locationsData';
import { PropertyCard } from '../components/properties/PropertyCard';
import { PropertySearch } from '../components/properties/PropertySearch';
import { DemoBadge } from '../components/common/DemoBadge';
import { EnquiryForm } from '../components/properties/EnquiryForm';
import { SEO } from '../components/common/SEO';
import { ScrollReveal, ScrollStagger } from '../components/common/ScrollReveal';

export const HomePage: React.FC = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProperties() {
      const all = await DatabaseService.getProperties({ sortBy: 'newest' });
      setFeaturedProperties(all.filter(p => p.isFeatured).slice(0, 4));
      setLoading(false);
    }
    loadProperties();
  }, []);

  const handleHeroSearch = (filters: PropertyFilterParams) => {
    const params = new URLSearchParams();
    if (filters.intent) params.set('intent', filters.intent);
    if (filters.category && filters.category !== 'all') params.set('category', filters.category);
    if (filters.city && filters.city !== 'All') params.set('city', filters.city);
    if (filters.propertyType && filters.propertyType !== 'All') params.set('type', filters.propertyType);
    if (filters.locality) params.set('locality', filters.locality);
    if (filters.searchQuery) params.set('q', filters.searchQuery);
    if (filters.bedrooms && filters.bedrooms !== 'any') params.set('bhk', filters.bedrooms.toString());

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      <SEO 
        title="1Roof Realty India — Premium Real Estate & Property Advisory"
        description="One Roof Realty LLP (AAK-3190, Est. 2017). Premium residential, commercial, and property registration advisory across Mumbai and Central India."
      />

      {/* HERO SECTION: Organic Enterprise Tech in Brick Red & Warm Terracotta */}
      <section className="relative pt-6 sm:pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal direction="down" duration={0.8}>
          <div className="relative rounded-[36px] sm:rounded-[48px] overflow-hidden bento-card-dark text-white p-8 sm:p-14 lg:p-20 shadow-2xl">
            
            {/* Ambient Radial Brick Warmth */}
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#B54D35] blur-3xl opacity-40 pointer-events-none"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#963D2C] blur-3xl opacity-50 pointer-events-none"></div>

            {/* Architectural Grid Line overlay inside dark container */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#FFB088_1px,transparent_1px),linear-gradient(to_bottom,#FFB088_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl space-y-6">
              
              {/* Live Telemetry Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#FFB088]/20 text-[#ECDCD5] text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#FFB088] pulse-brick"></span>
                <span className="text-[#FFB088] font-bold">1Roof Realty India</span>
                <span className="text-white/40">&bull;</span>
                <span>Reg: {VERIFIED_BUSINESS.llpin}</span>
              </div>

              {/* Hero Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                Find Your Place. <br />
                <span className="font-serif-italic font-normal text-[#FFB088]">
                  Build Your Future.
                </span>
              </h1>

              {/* Refined Description */}
              <p className="text-sm sm:text-base text-[#ECDCD5]/90 leading-relaxed font-normal max-w-2xl">
                From prime Mumbai residential sanctuaries in Mulund and Powai to Central India’s high-growth Super Corridor in Indore. Transparent real estate advisory, clear legal titles, and institutional-grade property execution.
              </p>

              {/* Telemetry Stat Badges */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/15">
                <div>
                  <span className="text-xl sm:text-2xl font-mono font-bold text-white block">
                    {VERIFIED_BUSINESS.telemetry.yearsOfExcellence}
                  </span>
                  <span className="text-[11px] text-[#ECDCD5]/75 font-mono">Market Track Record</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-mono font-bold text-white block">
                    {VERIFIED_BUSINESS.telemetry.verifiedDealsAssisted}
                  </span>
                  <span className="text-[11px] text-[#ECDCD5]/75 font-mono">Assisted Closures</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-mono font-bold text-white block">
                    100%
                  </span>
                  <span className="text-[11px] text-[#ECDCD5]/75 font-mono">Title Verification</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-mono font-bold text-[#FFB088] block">
                    {VERIFIED_BUSINESS.telemetry.avgResponseTimeMins}
                  </span>
                  <span className="text-[11px] text-[#ECDCD5]/75 font-mono">Client Advisory Response</span>
                </div>
              </div>

              {/* Quick Hero CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  to="/properties"
                  className="px-6 py-3.5 rounded-full bg-[#FFB088] text-[#3D1007] font-bold text-xs hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2 group"
                >
                  <span>Browse Available Properties</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/sell"
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all"
                >
                  List Property for Sale / Rent
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* OVERLAPPING PROPERTY SEARCH INTERFACE WITH SCROLL REVEAL */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="-mt-10 sm:-mt-14 relative z-20 px-2 sm:px-6">
            <PropertySearch onFilterChange={handleHeroSearch} />
          </div>
        </ScrollReveal>
      </section>

      {/* FEATURED PROPERTIES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#B54D35] mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#963D2C]"></span>
                <span className="uppercase tracking-wider font-semibold">Curated Portfolio</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#211613] tracking-tight">
                Featured Properties & Exclusive Listings
              </h2>
              <p className="text-xs sm:text-sm text-[#5C4944] mt-1">
                Handpicked residential homes, luxury penthouses, and commercial hubs in Mumbai & Indore.
              </p>
            </div>

            <Link
              to="/properties"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#963D2C] hover:text-[#7A2514] transition-colors font-mono self-start md:self-auto"
            >
              <span>View All Listings ({featuredProperties.length}+)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <DemoBadge />

        {/* Properties Grid with Staggered Scroll Animation */}
        <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <ScrollReveal key={property.id} direction="up">
              <PropertyCard property={property} />
            </ScrollReveal>
          ))}
        </ScrollStagger>
      </section>

      {/* PROPERTY CATEGORIES BENTO GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono text-[#B54D35] uppercase tracking-wider font-semibold">
              Tailored Real Estate Portfolios
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#211613] tracking-tight mt-1">
              Explore by Property Category
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4944] mt-1.5">
              Whether securing a home for your family or deploying institutional capital into commercial assets.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Residential */}
          <ScrollReveal direction="up" delay={0.05}>
            <Link
              to="/properties?category=residential"
              className="group relative rounded-[36px] overflow-hidden bento-card p-8 flex flex-col justify-between hover:shadow-[0_12px_40px_rgba(150,61,44,0.12)] hover:border-[#D9B7AD] transition-all duration-300 min-h-[300px]"
            >
              <div className="space-y-3 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#963D2C] text-[#FFB088] flex items-center justify-center shadow-md">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#211613] group-hover:text-[#963D2C] transition-colors">
                  Residential Apartments & Penthouses
                </h3>
                <p className="text-xs text-[#5C4944] leading-relaxed">
                  2 BHK, 3 BHK, and palatial penthouses across Mulund East, Powai lakefront, and Indore prime corridors.
                </p>
              </div>
              
              <div className="pt-6 flex items-center justify-between text-xs font-mono font-bold text-[#963D2C] relative z-10">
                <span>Explore Residences</span>
                <span className="w-8 h-8 rounded-full bg-[#FBECE7] group-hover:bg-[#963D2C] group-hover:text-white flex items-center justify-center transition-all">
                  &rarr;
                </span>
              </div>
            </Link>
          </ScrollReveal>

          {/* Card 2: Commercial */}
          <ScrollReveal direction="up" delay={0.1}>
            <Link
              to="/properties?category=commercial"
              className="group relative rounded-[36px] overflow-hidden bento-card p-8 flex flex-col justify-between hover:shadow-[0_12px_40px_rgba(150,61,44,0.12)] hover:border-[#D9B7AD] transition-all duration-300 min-h-[300px]"
            >
              <div className="space-y-3 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#6E2214] text-white flex items-center justify-center shadow-md">
                  <Key className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#211613] group-hover:text-[#963D2C] transition-colors">
                  Commercial Office & Retail Promenades
                </h3>
                <p className="text-xs text-[#5C4944] leading-relaxed">
                  Grade-A IT office plates, corporate suites, and high-visibility retail showrooms along Super Corridor and Powai.
                </p>
              </div>

              <div className="pt-6 flex items-center justify-between text-xs font-mono font-bold text-[#6E2214] relative z-10">
                <span>Explore Commercial</span>
                <span className="w-8 h-8 rounded-full bg-[#FBECE7] group-hover:bg-[#6E2214] group-hover:text-white flex items-center justify-center transition-all">
                  &rarr;
                </span>
              </div>
            </Link>
          </ScrollReveal>

          {/* Card 3: Plots & New Projects */}
          <ScrollReveal direction="up" delay={0.15}>
            <Link
              to="/properties?category=plots"
              className="group relative rounded-[36px] overflow-hidden bento-card p-8 flex flex-col justify-between hover:shadow-[0_12px_40px_rgba(150,61,44,0.12)] hover:border-[#D9B7AD] transition-all duration-300 min-h-[300px]"
            >
              <div className="space-y-3 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#3D1007] text-[#FFB088] flex items-center justify-center shadow-md">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#211613] group-hover:text-[#963D2C] transition-colors">
                  Land Plots & New RERA Projects
                </h3>
                <p className="text-xs text-[#5C4944] leading-relaxed">
                  TNCP & RERA demarcated residential villa plots, early pre-launch pricing, and master-planned townships.
                </p>
              </div>

              <div className="pt-6 flex items-center justify-between text-xs font-mono font-bold text-[#963D2C] relative z-10">
                <span>Explore Projects</span>
                <span className="w-8 h-8 rounded-full bg-[#FBECE7] group-hover:bg-[#963D2C] group-hover:text-white flex items-center justify-center transition-all">
                  &rarr;
                </span>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* WHY CHOOSE 1ROOF REALTY INDIA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="rounded-[40px] bg-gradient-to-br from-[#FBECE7] via-[#FAF7F2] to-[#FBECE7]/70 p-8 sm:p-14 border border-[#ECDCD5] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-5 space-y-5">
                <span className="text-xs font-mono text-[#B54D35] uppercase tracking-wider font-semibold">
                  The 1Roof Advantage
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3D1007] tracking-tight leading-tight">
                  Institutional Integrity in Indian Real Estate.
                </h2>
                <p className="text-xs sm:text-sm text-[#5C4944] leading-relaxed">
                  Operating under the registered name <strong>{VERIFIED_BUSINESS.legalName}</strong> (LLPIN: {VERIFIED_BUSINESS.llpin}) since 2017, we bridge the gap between discerning buyers, corporate lessees, and verified property developers.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#963D2C] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs font-bold text-[#211613]">100% Verified Title Clearance</strong>
                      <p className="text-[11px] text-[#5C4944]">Every listing is scrutinized for encumbrance, RERA status, and ownership chain.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#963D2C] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs font-bold text-[#211613]">Government Digital Leave & License</strong>
                      <p className="text-[11px] text-[#5C4944]">Doorstep biometric registration and legal compliance for stress-free tenancy.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#963D2C] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs font-bold text-[#211613]">Transparent Pricing & Developer Parity</strong>
                      <p className="text-[11px] text-[#5C4944]">Zero hidden fees, zero markups. Direct advisory with experienced consultants.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-[28px] bg-white border border-[#ECDCD5] shadow-sm space-y-2">
                  <span className="text-xs font-mono text-[#B54D35] font-semibold">01 / Mumbai HQ</span>
                  <h4 className="text-base font-bold text-[#211613]">Mulund & Eastern Suburbs</h4>
                  <p className="text-xs text-[#5C4944] leading-relaxed">
                    Deep micro-market authority in Mulund East, Powai, Bhandup, and Thane West residential and commercial sectors.
                  </p>
                </div>

                <div className="p-6 rounded-[28px] bg-white border border-[#ECDCD5] shadow-sm space-y-2">
                  <span className="text-xs font-mono text-[#B54D35] font-semibold">02 / Central India</span>
                  <h4 className="text-base font-bold text-[#211613]">Super Corridor Indore</h4>
                  <p className="text-xs text-[#5C4944] leading-relaxed">
                    Pioneering regional hub right at TCS Square, commanding prime plotting and commercial lease transactions.
                  </p>
                </div>

                <div className="p-6 rounded-[28px] bg-white border border-[#ECDCD5] shadow-sm space-y-2">
                  <span className="text-xs font-mono text-[#B54D35] font-semibold">03 / Advisory Desk</span>
                  <h4 className="text-base font-bold text-[#211613]">NRI Portfolio Supervision</h4>
                  <p className="text-xs text-[#5C4944] leading-relaxed">
                    Trusted remote stewardship for non-resident Indians managing properties across Mumbai and Indore.
                  </p>
                </div>

                <div className="p-6 rounded-[28px] bg-[#963D2C] text-white border border-[#FFB088]/20 shadow-sm space-y-2">
                  <span className="text-xs font-mono text-[#FFB088] font-semibold">04 / Rapid Response</span>
                  <h4 className="text-base font-bold text-white">Direct Phone Access</h4>
                  <p className="text-xs text-[#ECDCD5]/80 leading-relaxed font-mono">
                    Call {VERIFIED_BUSINESS.contacts.primaryPhone} directly for instant consultation on verified inventory.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* LOCATION DISCOVERY STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono text-[#B54D35] uppercase tracking-wider font-semibold">
                Strategic Growth Corridors
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#211613] tracking-tight mt-1">
                Explore Properties by Prime Location
              </h2>
            </div>

            <Link
              to="/locations"
              className="text-xs font-mono font-bold text-[#963D2C] hover:text-[#7A2514] flex items-center gap-1.5"
            >
              <span>All Location Profiles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOCATIONS_DATA.map((loc, idx) => (
            <ScrollReveal key={loc.slug} delay={idx * 0.08} direction="up">
              <Link
                to={`/locations/${loc.slug}`}
                className="group relative rounded-[32px] overflow-hidden bg-white border border-[#ECDCD5] hover:shadow-[0_12px_40px_rgba(150,61,44,0.12)] hover:border-[#D9B7AD] transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-[#3D1007]">
                  <img
                    src={loc.featuredImageUrl}
                    alt={loc.locality}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3D1007]/80 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-mono text-[#FFB088] uppercase tracking-wider block">
                      {loc.city}, {loc.state}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-[#FFB088] transition-colors">
                      {loc.locality}
                    </h3>
                  </div>
                </div>

                <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                  <p className="text-[11px] text-[#5C4944] line-clamp-2 leading-relaxed">
                    {loc.tagline}
                  </p>

                  <div className="pt-2 border-t border-[#FBECE7] flex items-center justify-between text-[11px] font-mono text-[#211613]">
                    <span className="text-[#B54D35]">Avg. Price</span>
                    <span className="font-bold">{loc.avgPricePerSqFt.split('-')[0]}</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* VERIFIED SERVICES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-[#B54D35] uppercase tracking-wider font-semibold">
              Institutional Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#211613] tracking-tight mt-1">
              End-to-End Real Estate Solutions
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4944] mt-1.5">
              Verified property services managed by licensed practitioners and real estate legal advisors.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VERIFIED_BUSINESS.services.map((service, idx) => (
            <ScrollReveal key={service.id} delay={idx * 0.08} direction="up">
              <div
                className="p-7 rounded-[32px] bg-white border border-[#ECDCD5] hover:border-[#963D2C] hover:shadow-[0_12px_40px_rgba(150,61,44,0.1)] transition-all duration-300 space-y-4 flex flex-col justify-between h-full"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FBECE7] border border-[#ECDCD5] text-[#963D2C] flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[#963D2C]" />
                  </div>
                  <h3 className="text-base font-bold text-[#211613]">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#5C4944] leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#FBECE7] space-y-1.5">
                  {service.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-[#211613]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#963D2C]"></span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS / VERIFIED TRUST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal scale>
          <div className="p-8 sm:p-12 rounded-[40px] bento-card-dark text-white border border-[#FFB088]/20 relative overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FFB088] text-xs font-mono">
                <Star className="w-3.5 h-3.5 fill-[#FFB088]" />
                <span>Verified Client Experiences &bull; Mumbai &bull; Indore</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                "1Roof Realty provided flawless title clearance and concluded our Leave & License agreement without a single visit to government offices."
              </h2>

              <div className="flex flex-col items-center">
                <span className="font-bold text-white text-sm">Aditya & Radhika Singhal</span>
                <span className="text-xs text-[#ECDCD5]/75 font-mono">Purchased 3 BHK Residence &bull; Mulund East, Mumbai</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* BOTTOM CONVERSION CONTAINER WITH REAL ENQUIRY FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBECE7] text-[#963D2C] text-xs font-mono font-semibold">
                <PhoneCall className="w-3.5 h-3.5 text-[#963D2C]" />
                <span>Direct Advisory Inquiry</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#211613] tracking-tight leading-tight mt-2">
                Speak Directly with a 1Roof Realty Consultant.
              </h2>

              <p className="text-xs sm:text-sm text-[#5C4944] leading-relaxed mt-2">
                Whether you are planning to purchase your next family home, looking for verified rental flats with biometric agreements, or investing along the Indore Super Corridor, our senior partners are at your service.
              </p>

              <div className="space-y-3 pt-4">
                <div className="p-4 rounded-2xl bg-white border border-[#ECDCD5] flex items-center justify-between text-xs shadow-2xs">
                  <div>
                    <span className="text-[10px] text-[#B54D35] font-mono block">Direct Telephonic Access</span>
                    <strong className="text-sm font-mono text-[#963D2C]">{VERIFIED_BUSINESS.contacts.primaryPhone}</strong>
                  </div>
                  <a
                    href={`tel:${VERIFIED_BUSINESS.contacts.primaryPhone}`}
                    className="px-4 py-2 rounded-xl bg-[#963D2C] text-white text-xs font-bold hover:bg-[#7A2514]"
                  >
                    Call Now
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#ECDCD5] flex items-center justify-between text-xs shadow-2xs">
                  <div>
                    <span className="text-[10px] text-[#B54D35] font-mono block">Official Email Desk</span>
                    <strong className="text-xs font-mono text-[#963D2C]">{VERIFIED_BUSINESS.contacts.email}</strong>
                  </div>
                  <a
                    href={`mailto:${VERIFIED_BUSINESS.contacts.email}`}
                    className="px-4 py-2 rounded-xl border border-[#ECDCD5] text-[#963D2C] text-xs font-bold hover:bg-[#FBECE7]"
                  >
                    Email
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6">
            <ScrollReveal direction="right">
              <EnquiryForm />
            </ScrollReveal>
          </div>

        </div>
      </section>

    </div>
  );
};
