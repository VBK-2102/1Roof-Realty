import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  MessageSquare, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { Property } from '../../types';
import { VERIFIED_BUSINESS } from '../../data/verifiedBusiness';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const coverImage = property.images.find(img => img.isCover)?.url || property.images[0]?.url;

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = `Hello 1Roof Realty team, I am interested in ${property.title} (${property.priceDisplay}, Ref: ${property.id}). Please share further details and site visit availability.`;
    window.open(`https://wa.me/${VERIFIED_BUSINESS.contacts.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="group bg-white rounded-[32px] border border-[#ECDCD5] overflow-hidden hover:shadow-[0_12px_40px_rgba(150,61,44,0.12)] hover:border-[#D9B7AD] transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#3D1007]">
          <img
            src={coverImage}
            alt={property.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#3D1007]/80 via-transparent to-transparent"></div>

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm ${
                property.intent === 'buy' 
                  ? 'bg-[#963D2C] text-[#FFB088] border border-[#FFB088]/40' 
                  : 'bg-[#6E2214] text-white border border-white/20'
              }`}>
                For {property.intent}
              </span>

              <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#211613] text-[10px] font-medium border border-[#ECDCD5]">
                {property.propertyType}
              </span>
            </div>

            {property.isVerified && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#3D1007]/80 backdrop-blur-md text-[#FFB088] text-[10px] font-mono border border-[#FFB088]/30">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified</span>
              </span>
            )}
          </div>

          {/* Bottom Overlay Info (Price) */}
          <div className="absolute bottom-4 left-4 right-4 flex items-baseline justify-between text-white">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#ECDCD5] font-mono block">
                {property.intent === 'buy' ? 'Starting Price' : 'Monthly Rent'}
              </span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                {property.priceDisplay}
              </span>
            </div>

            {property.pricePerSqFt && (
              <span className="text-[11px] font-mono text-[#FFB088] bg-[#6E2214]/80 px-2 py-0.5 rounded-md border border-[#FFB088]/20">
                ₹{property.pricePerSqFt.toLocaleString('en-IN')}/sq.ft
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {/* Location and Title */}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#B54D35] font-mono mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#963D2C]" />
              <span>{property.locality}, {property.city}</span>
            </div>
            
            <h3 className="text-base font-bold text-[#211613] group-hover:text-[#963D2C] transition-colors line-clamp-1">
              {property.title}
            </h3>

            <p className="text-xs text-[#5C4944] line-clamp-2 mt-1 leading-relaxed">
              {property.shortDescription}
            </p>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-[#FAF7F2] border border-[#ECDCD5]/80 text-[11px] font-mono text-[#211613]">
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#B54D35] shrink-0" />
              <span>{property.areaSqFt.toLocaleString()} sq.ft</span>
            </div>

            {property.bedrooms ? (
              <div className="flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-[#B54D35] shrink-0" />
                <span>{property.bedrooms} Beds</span>
              </div>
            ) : (
              <div className="text-[#5C4944] text-[10px] flex items-center">
                <span>{property.category.toUpperCase()}</span>
              </div>
            )}

            {property.bathrooms ? (
              <div className="flex items-center gap-1.5">
                <Bath className="w-3.5 h-3.5 text-[#B54D35] shrink-0" />
                <span>{property.bathrooms} Baths</span>
              </div>
            ) : (
              <div className="text-[#5C4944] text-[10px] flex items-center">
                <span>{property.availability}</span>
              </div>
            )}
          </div>

          {/* RERA / Demo Tag */}
          <div className="flex items-center justify-between text-[10px] font-mono text-[#5C4944]">
            {property.reraId ? (
              <span>RERA: {property.reraId}</span>
            ) : (
              <span>Title Clearance Checked</span>
            )}

            {property.isDemoData && (
              <span className="flex items-center gap-1 text-[#B54D35]">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Demo Showcase</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer / CTAs */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 flex items-center gap-2 border-t border-[#FBECE7]">
        <button
          onClick={handleWhatsAppClick}
          className="p-2.5 rounded-xl border border-[#ECDCD5] hover:border-[#963D2C] bg-[#FAF7F2] hover:bg-[#FBECE7] text-[#963D2C] transition-colors"
          title="WhatsApp Enquiry"
          aria-label="Enquire on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 text-[#963D2C]" />
        </button>

        <Link
          to={`/properties/${property.slug}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl bg-[#963D2C] text-white hover:bg-[#7A2514] text-xs font-semibold transition-all shadow-sm group-hover:shadow group/btn"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#FFB088] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
