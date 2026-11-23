import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  MessageSquare, 
  Share2, 
  PhoneCall, 
  ArrowLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import { Property } from '../types';
import { DatabaseService } from '../services/db';
import { Lightbox } from '../components/common/Lightbox';
import { ScheduleVisitModal } from '../components/properties/ScheduleVisitModal';
import { EnquiryForm } from '../components/properties/EnquiryForm';
import { PropertyCard } from '../components/properties/PropertyCard';
import { DemoBadge } from '../components/common/DemoBadge';
import { SEO } from '../components/common/SEO';
import { VERIFIED_BUSINESS } from '../data/verifiedBusiness';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const PropertyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [property, setProperty] = useState<Property | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Gallery & Lightbox State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Schedule Visit Modal
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

  // Floor Plan Active Tab
  const [activeFloorPlanIndex, setActiveFloorPlanIndex] = useState(0);

  useEffect(() => {
    async function loadProperty() {
      if (!slug) return;
      setLoading(true);
      const item = await DatabaseService.getPropertyBySlug(slug);
      if (item) {
        setProperty(item);
        const all = await DatabaseService.getProperties({ intent: item.intent });
        setSimilarProperties(all.filter(p => p.id !== item.id).slice(0, 3));
      }
      setLoading(false);
    }
    loadProperty();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="font-mono text-sm text-[#5C4944] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#963D2C] animate-ping"></span>
          <span>Loading property dossier...</span>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#3D1007]">Property Not Found</h2>
        <p className="text-xs text-[#5C4944]">
          The listing reference you requested may have been leased, sold, or updated.
        </p>
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#963D2C] text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Properties</span>
        </Link>
      </div>
    );
  }

  const handleWhatsAppInquiry = () => {
    const text = `Hello 1Roof Realty team, I am interested in ${property.title} (${property.priceDisplay}, Ref: ${property.id}). Please share further specifications and site visit timing.`;
    window.open(`https://wa.me/${VERIFIED_BUSINESS.contacts.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `${property.title} - ${property.priceDisplay} via 1Roof Realty India`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Property link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <SEO 
        title={`${property.title} — ${property.priceDisplay} | 1Roof Realty`}
        description={property.shortDescription}
        image={property.images[0]?.url}
      />

      {/* Breadcrumb Navigation Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[#5C4944]">
          <Link to="/" className="hover:text-[#963D2C]">Home</Link>
          <span>/</span>
          <Link to="/properties" className="hover:text-[#963D2C]">Properties</Link>
          <span>/</span>
          <span className="text-[#963D2C] font-semibold truncate max-w-xs">{property.title}</span>
        </div>
      </div>

      {/* Main Property Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="down">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#FBECE7]">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
                  property.intent === 'buy' ? 'bg-[#963D2C] text-[#FFB088]' : 'bg-[#6E2214] text-white'
                }`}>
                  For {property.intent}
                </span>

                <span className="px-3 py-1 rounded-full bg-[#FBECE7] text-[#963D2C] text-xs font-semibold">
                  {property.propertyType}
                </span>

                {property.isVerified && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#963D2C]/10 text-[#963D2C] text-xs font-mono font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#963D2C]" />
                    <span>Verified 1Roof Dossier</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#211613] tracking-tight">
                {property.title}
              </h1>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#B54D35] font-mono">
                <MapPin className="w-4 h-4 text-[#963D2C] shrink-0" />
                <span>{property.address}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col lg:items-end gap-3">
              <div>
                <span className="text-[11px] font-mono text-[#5C4944] uppercase tracking-wider block lg:text-right">
                  {property.intent === 'buy' ? 'Official Asking Price' : 'Monthly Rental Quote'}
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#963D2C] tracking-tight">
                  {property.priceDisplay}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-full border border-[#ECDCD5] bg-white text-[#5C4944] hover:text-[#963D2C] transition-colors"
                  title="Share Property"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#963D2C] text-white text-xs font-semibold hover:bg-[#7A2514] transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4 text-[#FFB088]" />
                  <span>WhatsApp Enquiry</span>
                </button>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </div>

      {/* IMAGE GALLERY & LIGHTBOX SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Main Cover Image */}
            <div 
              onClick={() => setIsLightboxOpen(true)}
              className="lg:col-span-8 relative aspect-[16/10] rounded-[32px] overflow-hidden bg-[#3D1007] cursor-pointer group shadow-lg"
            >
              <img
                src={property.images[activeImageIndex]?.url || property.images[0]?.url}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D1007]/60 via-transparent to-transparent pointer-events-none"></div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none text-white">
                <span className="text-xs font-mono bg-[#3D1007]/80 px-3 py-1 rounded-full border border-white/20">
                  {property.images[activeImageIndex]?.caption || `Photo ${activeImageIndex + 1} of ${property.images.length}`}
                </span>

                <span className="flex items-center gap-1.5 text-xs font-mono bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Open Gallery ({property.images.length})</span>
                </span>
              </div>
            </div>

            {/* Thumbnails Column */}
            <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
              {property.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[16/10] lg:h-[120px] rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx ? 'border-[#963D2C] shadow-md scale-[1.02]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

          </div>

          <Lightbox
            images={property.images}
            currentIndex={activeImageIndex}
            isOpen={isLightboxOpen}
            onClose={() => setIsLightboxOpen(false)}
            onPrev={() => setActiveImageIndex((activeImageIndex - 1 + property.images.length) % property.images.length)}
            onNext={() => setActiveImageIndex((activeImageIndex + 1) % property.images.length)}
          />
        </ScrollReveal>
      </div>

      {/* MAIN CONTENT & SIDEBAR GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Dossier Details */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Quick Metrics Bar */}
            <ScrollReveal direction="up">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-[28px] bg-white border border-[#ECDCD5] shadow-sm font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] text-[#B54D35] uppercase block">Super Area</span>
                  <span className="text-base font-bold text-[#211613]">{property.areaSqFt.toLocaleString()} sq.ft</span>
                </div>

                {property.bedrooms ? (
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#B54D35] uppercase block">Configuration</span>
                    <span className="text-base font-bold text-[#211613]">{property.bedrooms} BHK</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#B54D35] uppercase block">Category</span>
                    <span className="text-base font-bold text-[#211613]">{property.category}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <span className="text-[10px] text-[#B54D35] uppercase block">Furnishing</span>
                  <span className="text-base font-bold text-[#211613]">{property.furnishing}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-[#B54D35] uppercase block">Possession</span>
                  <span className="text-base font-bold text-[#963D2C]">{property.availability}</span>
                </div>
              </div>
            </ScrollReveal>

            {property.isDemoData && <DemoBadge />}

            {/* Full Property Description */}
            <ScrollReveal direction="up">
              <div className="p-8 rounded-[36px] bg-white border border-[#ECDCD5] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#211613]">Property Dossier & Editorial Overview</h3>
                <p className="text-xs sm:text-sm text-[#5C4944] leading-relaxed whitespace-pre-line">
                  {property.fullDescription}
                </p>

                {property.reraId && (
                  <div className="pt-4 border-t border-[#FBECE7] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#B54D35]">MahaRERA / RERA Registration ID</span>
                    <span className="font-bold text-[#963D2C] bg-[#FBECE7] px-3 py-1 rounded-md">{property.reraId}</span>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Categorized Amenities */}
            <ScrollReveal direction="up">
              <div className="p-8 rounded-[36px] bg-white border border-[#ECDCD5] shadow-sm space-y-5">
                <h3 className="text-lg font-bold text-[#211613]">Amenities & Lifestyle Infrastructure</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FAF7F2] border border-[#ECDCD5]/80 text-xs">
                      <span className="w-2 h-2 rounded-full bg-[#963D2C] shrink-0"></span>
                      <div>
                        <strong className="text-[#211613] block">{amenity.name}</strong>
                        <span className="text-[10px] text-[#B54D35] font-mono">{amenity.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Technical Specifications */}
            <ScrollReveal direction="up">
              <div className="p-8 rounded-[36px] bg-white border border-[#ECDCD5] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#211613]">Technical Specifications</h3>
                
                <div className="divide-y divide-[#FBECE7] text-xs">
                  {Object.entries(property.specifications).map(([key, val]) => (
                    <div key={key} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-mono text-[#B54D35]">{key}</span>
                      <span className="font-medium text-[#211613] sm:text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Interactive Floor Plans */}
            {property.floorPlans && property.floorPlans.length > 0 && (
              <ScrollReveal direction="up">
                <div className="p-8 rounded-[36px] bg-white border border-[#ECDCD5] shadow-sm space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#211613]">Architectural Floor Plans</h3>
                    <span className="text-xs font-mono text-[#B54D35]">Verified Dimension Layout</span>
                  </div>

                  <div className="flex gap-2">
                    {property.floorPlans.map((plan, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveFloorPlanIndex(i)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                          activeFloorPlanIndex === i
                            ? 'bg-[#963D2C] text-white shadow-sm'
                            : 'bg-[#FAF7F2] text-[#5C4944] hover:bg-[#FBECE7]'
                        }`}
                      >
                        {plan.title} ({plan.areaSqFt} sq.ft)
                      </button>
                    ))}
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-[#ECDCD5] bg-[#3D1007]">
                    <img
                      src={property.floorPlans[activeFloorPlanIndex].imageUrl}
                      alt={property.floorPlans[activeFloorPlanIndex].title}
                      className="w-full h-auto object-cover max-h-[450px]"
                    />
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Commute Landmarks */}
            {property.nearbyLandmarks && property.nearbyLandmarks.length > 0 && (
              <ScrollReveal direction="up">
                <div className="p-8 rounded-[36px] bg-white border border-[#ECDCD5] shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-[#211613]">Commute & Neighborhood Telemetry</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {property.nearbyLandmarks.map((place, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#ECDCD5] flex items-center justify-between">
                        <div>
                          <span className="font-bold text-[#211613] block">{place.name}</span>
                          <span className="text-[10px] text-[#B54D35] font-mono">{place.type}</span>
                        </div>
                        <div className="text-right font-mono text-[11px]">
                          <span className="text-[#963D2C] font-bold block">{place.driveTime}</span>
                          <span className="text-[#5C4944]">{place.distance}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

          </div>

          {/* Right Column: Actions & Enquiry Sidecar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Site Visit Trigger Box */}
            <ScrollReveal direction="left">
              <div className="p-6 rounded-[32px] bg-[#963D2C] text-white space-y-4 shadow-xl shadow-[#963D2C]/20">
                <div className="flex items-center gap-2 text-xs font-mono text-[#FFB088]">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule an Inspection</span>
                </div>

                <h4 className="text-base font-bold leading-tight">
                  Request a Private Guided Site Visit
                </h4>

                <p className="text-xs text-[#ECDCD5]/85 leading-relaxed">
                  Accompanied by an authorized 1Roof Realty property consultant with sample flat access.
                </p>

                <button
                  onClick={() => setIsVisitModalOpen(true)}
                  className="w-full py-3.5 rounded-2xl bg-[#FFB088] text-[#3D1007] font-bold text-xs hover:bg-white transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Site Visit Slot</span>
                </button>
              </div>
            </ScrollReveal>

            {/* Direct Enquiry Form */}
            <ScrollReveal direction="left" delay={0.1}>
              <EnquiryForm
                propertyId={property.id}
                propertyTitle={property.title}
              />
            </ScrollReveal>

            {/* Advisory Hotline Card */}
            <ScrollReveal direction="left" delay={0.15}>
              <div className="p-6 rounded-[32px] bg-white border border-[#ECDCD5] text-xs space-y-3 shadow-2xs">
                <span className="text-[10px] font-mono text-[#B54D35] uppercase tracking-wider font-semibold">
                  Direct Telephonic Access
                </span>
                <h4 className="text-sm font-bold text-[#211613]">Have questions before inquiring?</h4>
                <p className="text-[11px] text-[#5C4944]">
                  Call our Mulund East or Super Corridor offices directly for immediate availability confirmation.
                </p>
                <a
                  href={`tel:${VERIFIED_BUSINESS.contacts.primaryPhone}`}
                  className="flex items-center gap-2 text-[#963D2C] font-mono font-bold hover:underline"
                >
                  <PhoneCall className="w-4 h-4 text-[#B54D35]" />
                  <span>{VERIFIED_BUSINESS.contacts.primaryPhone}</span>
                </a>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </div>

      {/* SIMILAR PROPERTIES */}
      {similarProperties.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-[#FBECE7]">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono text-[#B54D35] uppercase tracking-wider font-semibold">
                  Recommended Alternatives
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#211613]">
                  Similar Properties for {property.intent === 'buy' ? 'Sale' : 'Lease'}
                </h2>
              </div>

              <Link
                to="/properties"
                className="text-xs font-mono font-bold text-[#963D2C] hover:text-[#7A2514] flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <ScrollReveal key={p.id} direction="up">
                <PropertyCard property={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Visit Modal */}
      <ScheduleVisitModal
        property={property}
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
      />

    </div>
  );
};
