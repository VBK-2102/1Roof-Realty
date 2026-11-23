import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';
import { DatabaseService } from '../services/db';
import { PropertyType, ListingIntent, FurnishingStatus } from '../types';
import { SEO } from '../components/common/SEO';
import confetti from 'canvas-confetti';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const SellPage: React.FC = () => {
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [propertyLocation, setPropertyLocation] = useState('');
  const [city, setCity] = useState('Mumbai');
  const [locality, setLocality] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('Apartment');
  const [intent, setIntent] = useState<ListingIntent>('buy');
  const [expectedPrice, setExpectedPrice] = useState<number | ''>('');
  const [areaSqFt, setAreaSqFt] = useState<number | ''>('');
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [furnishing, setFurnishing] = useState<FurnishingStatus>('Semi-Furnished');
  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  ]);
  const [sampleUrlInput, setSampleUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddImageUrl = () => {
    if (sampleUrlInput.trim()) {
      setImageUrls([...imageUrls, sampleUrlInput.trim()]);
      setSampleUrlInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!ownerName.trim() || ownerName.length < 2) {
      setErrorMsg('Please enter your full name as property owner.');
      return;
    }
    if (!ownerPhone.trim() || ownerPhone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!ownerEmail.trim() || !ownerEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!propertyLocation.trim()) {
      setErrorMsg('Please provide the building name / landmark and locality.');
      return;
    }
    if (!expectedPrice || Number(expectedPrice) <= 0) {
      setErrorMsg('Please specify your expected price.');
      return;
    }
    if (!areaSqFt || Number(areaSqFt) <= 0) {
      setErrorMsg('Please provide the total super built-up / carpet area.');
      return;
    }
    if (!description.trim() || description.length < 15) {
      setErrorMsg('Please add a brief description of the property features.');
      return;
    }

    setLoading(true);

    try {
      const numPrice = Number(expectedPrice);
      const displayPrice = intent === 'buy' 
        ? (numPrice >= 10000000 ? `₹${(numPrice / 10000000).toFixed(2)} Cr` : `₹${(numPrice / 100000).toFixed(2)} Lakh`)
        : `₹${numPrice.toLocaleString('en-IN')} / mo`;

      await DatabaseService.createOwnerSubmission({
        ownerName: ownerName.trim(),
        ownerPhone: ownerPhone.trim(),
        ownerEmail: ownerEmail.trim(),
        propertyLocation: propertyLocation.trim(),
        city,
        locality: locality.trim() || propertyLocation.split(',')[0] || city,
        propertyType,
        intent,
        expectedPrice: numPrice,
        expectedPriceDisplay: displayPrice,
        areaSqFt: Number(areaSqFt),
        bedrooms: ['Apartment', 'Penthouse', 'Luxury Villa', 'Independent House'].includes(propertyType) ? bedrooms : undefined,
        bathrooms: ['Apartment', 'Penthouse', 'Luxury Villa', 'Independent House'].includes(propertyType) ? bathrooms : undefined,
        furnishing,
        description: description.trim(),
        imageUrls
      });

      setLoading(false);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#963D2C', '#FFB088', '#B54D35', '#E87A47']
        });
      } catch (err) {}
    } catch (err) {
      setLoading(false);
      setErrorMsg('Failed to submit listing. Please contact 1Roof Realty directly.');
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <SEO 
        title="Sell or Rent Your Property | 1Roof Realty India"
        description="List your residential or commercial property with 1Roof Realty India. Guaranteed buyer reach, verified documentation, Leave & License biometric registration."
      />

      {/* Hero Banner */}
      <section className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal direction="down">
          <div className="p-8 sm:p-14 rounded-[40px] bento-card-dark text-white space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#B54D35]/30 rounded-full blur-3xl pointer-events-none"></div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#FFB088] text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Dedicated Property Owners Desk &bull; 1Roof Realty</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              List Your Property with <br />
              <span className="font-serif-italic font-normal text-[#FFB088]">1Roof Realty India</span>
            </h1>

            <p className="text-sm sm:text-base text-[#ECDCD5]/90 leading-relaxed max-w-2xl">
              Reach high-intent homebuyers, corporate tenants, and institutional buyers in Mumbai and Central India. Zero unsolicited spam calls, complete documentation support, and market-accurate valuation.
            </p>

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/15 font-mono text-xs">
              <div>
                <span className="text-xl font-bold text-white block">15-Day</span>
                <span className="text-[#ECDCD5]/75">Avg Tenant Placement</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white block">100%</span>
                <span className="text-[#ECDCD5]/75">Verified Buyer Screenings</span>
              </div>
              <div>
                <span className="text-xl font-bold text-[#FFB088] block">Free</span>
                <span className="text-[#ECDCD5]/75">Property Valuation Assessment</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Main Submission Form Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          {submitted ? (
            <div className="p-10 sm:p-14 rounded-[40px] bg-white border border-[#ECDCD5] text-center space-y-5 shadow-xl animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#963D2C] text-[#FFB088] flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h2 className="text-2xl font-bold text-[#3D1007]">Property Successfully Submitted!</h2>
              
              <p className="text-xs sm:text-sm text-[#5C4944] leading-relaxed max-w-lg mx-auto">
                Thank you, <strong className="text-[#211613]">{ownerName}</strong>. Your property submission in <strong className="text-[#963D2C]">{propertyLocation}, {city}</strong> has been logged securely in our Sales Management Portal.
              </p>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#ECDCD5] text-left text-xs max-w-md mx-auto space-y-2">
                <div className="font-mono text-[#B54D35] text-[10px] uppercase font-bold">What happens next?</div>
                <p className="text-[#211613]">1. Our regional valuation officer will review your pricing & photos.</p>
                <p className="text-[#211613]">2. We will arrange a verified listing confirmation call within 24 hours.</p>
                <p className="text-[#211613]">3. Your listing will go live across 1Roof Realty channels & network.</p>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setDescription('');
                  setExpectedPrice('');
                }}
                className="px-8 py-3 rounded-2xl bg-[#963D2C] text-white text-xs font-semibold hover:bg-[#7A2514] transition-all"
              >
                Submit Another Property
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-[40px] border border-[#ECDCD5] p-6 sm:p-12 shadow-xl shadow-[#963D2C]/5">
              <div className="border-b border-[#FBECE7] pb-6 mb-8">
                <span className="text-xs font-mono text-[#B54D35] uppercase tracking-wider font-semibold">
                  Owner Direct Submission
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#211613] mt-1">
                  Tell Us About Your Property
                </h2>
                <p className="text-xs text-[#5C4944] mt-1">
                  Fill in the details below. Our sales team will verify and prepare your premium listing.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Intent Toggle */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#5C4944]">
                    I Want To:
                  </label>
                  <div className="grid grid-cols-2 gap-3 max-w-xs">
                    <button
                      type="button"
                      onClick={() => setIntent('buy')}
                      className={`py-3 rounded-2xl text-xs font-bold transition-all border ${
                        intent === 'buy'
                          ? 'bg-[#963D2C] text-white border-[#963D2C]'
                          : 'bg-[#FAF7F2] text-[#211613] border-[#ECDCD5]'
                      }`}
                    >
                      Sell My Property
                    </button>

                    <button
                      type="button"
                      onClick={() => setIntent('rent')}
                      className={`py-3 rounded-2xl text-xs font-bold transition-all border ${
                        intent === 'rent'
                          ? 'bg-[#963D2C] text-white border-[#963D2C]'
                          : 'bg-[#FAF7F2] text-[#211613] border-[#ECDCD5]'
                      }`}
                    >
                      Rent / Lease Out
                    </button>
                  </div>
                </div>

                {/* Owner Info Section */}
                <div className="pt-4 border-t border-[#FBECE7] space-y-4">
                  <h3 className="text-sm font-bold text-[#963D2C] font-mono uppercase tracking-wider">
                    1. Owner Contact Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#5C4944]">Owner Name *</label>
                      <input
                        type="text"
                        required
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="e.g. Vishal Ujjainkar"
                        className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-3 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#5C4944]">Mobile Phone *</label>
                      <input
                        type="tel"
                        required
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        placeholder="+91 98200 12345"
                        className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-3 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#5C4944]">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={ownerEmail}
                        onChange={(e) => setOwnerEmail(e.target.value)}
                        placeholder="owner@domain.com"
                        className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-3 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
                      />
                    </div>
                  </div>
                </div>

                {/* Property Details Section */}
                <div className="pt-4 border-t border-[#FBECE7] space-y-4">
                  <h3 className="text-sm font-bold text-[#963D2C] font-mono uppercase tracking-wider">
                    2. Property Specifications
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#5C4944]">City *</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-3 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
                      >
                        <option value="Mumbai">Mumbai (Suburbs / Central / Western)</option>
                        <option value="Indore">Indore (Super Corridor / Nipania / AB Rd)</option>
                        <option value="Thane">Thane / Navi Mumbai</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#5C4944]">Locality / Suburb *</label>
                      <input
                        type="text"
                        required
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        placeholder="e.g. Mulund East, Super Corridor..."
                        className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-3 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#5C4944]">Property Type *</label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value as any)}
                        className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-3 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
                      >
                        <option value="Apartment">Apartment / Flat</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Luxury Villa">Luxury Villa / Bungalow</option>
                        <option value="Office Space">Commercial Office Space</option>
                        <option value="Retail Shop">Retail Shop / Showroom</option>
                        <option value="Residential Plot">Residential Plot</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-[#5C4944]">Exact Building Address & Landmark *</label>
                    <input
                      type="text"
                      required
                      value={propertyLocation}
                      onChange={(e) => setPropertyLocation(e.target.value)}
                      placeholder="e.g. Flat 602, Orchid Tower, G.V. Scheme Rd No. 1, Mulund East"
                      className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-3 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#5C4944]">
                        {intent === 'buy' ? 'Expected Price (₹) *' : 'Monthly Rent (₹) *'}
                      </label>
                      <input
                        type="number"
                        required
                        value={expectedPrice}
                        onChange={(e) => setExpectedPrice(e.target.value ? Number(e.target.value) : '')}
                        placeholder={intent === 'buy' ? "e.g. 25000000 (2.5 Cr)" : "e.g. 60000"}
                        className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-3 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#5C4944]">Area (sq.ft) *</label>
                      <input
                        type="number"
                        required
                        value={areaSqFt}
                        onChange={(e) => setAreaSqFt(e.target.value ? Number(e.target.value) : '')}
                        placeholder="e.g. 1250"
                        className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-3 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#5C4944]">Bedrooms</label>
                      <select
                        value={bedrooms}
                        onChange={(e) => setBedrooms(Number(e.target.value))}
                        className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-3 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
                      >
                        <option value="1">1 BHK</option>
                        <option value="2">2 BHK</option>
                        <option value="3">3 BHK</option>
                        <option value="4">4+ BHK</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#5C4944]">Furnishing Status</label>
                      <select
                        value={furnishing}
                        onChange={(e) => setFurnishing(e.target.value as any)}
                        className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-3 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
                      >
                        <option value="Furnished">Furnished</option>
                        <option value="Semi-Furnished">Semi-Furnished</option>
                        <option value="Unfurnished">Unfurnished</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-[#5C4944]">Property Description *</label>
                    <textarea
                      rows={4}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe orientation, floor, car parking, amenities, society status, age of building..."
                      className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl p-3.5 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C] resize-none"
                    />
                  </div>
                </div>

                {/* Photo Uploads Section */}
                <div className="pt-4 border-t border-[#FBECE7] space-y-4">
                  <h3 className="text-sm font-bold text-[#963D2C] font-mono uppercase tracking-wider">
                    3. Photographs / Gallery URLs
                  </h3>

                  <p className="text-xs text-[#5C4944]">
                    Add high-resolution image URLs of your property. Our sales team will also schedule a professional photoshoot if required.
                  </p>

                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={sampleUrlInput}
                      onChange={(e) => setSampleUrlInput(e.target.value)}
                      placeholder="Paste image URL (https://...)"
                      className="flex-1 text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-2.5 text-[#211613] focus:bg-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-4 py-2.5 rounded-2xl bg-[#963D2C] text-white text-xs font-mono font-semibold hover:bg-[#7A2514]"
                    >
                      Add URL
                    </button>
                  </div>

                  {/* Previews */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {imageUrls.map((url, idx) => (
                      <div key={idx} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-[#ECDCD5] group">
                        <img src={url} alt={`Property upload ${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute inset-0 bg-red-600/80 text-white text-xs font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-6 border-t border-[#FBECE7]">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-[#963D2C] text-white hover:bg-[#7A2514] font-bold text-sm transition-all shadow-lg shadow-[#963D2C]/20 flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    <span>{loading ? 'Transmitting Submission...' : 'Submit Property for Listing'}</span>
                    <ArrowRight className="w-4 h-4 text-[#FFB088] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#5C4944] font-mono">
                    <ShieldCheck className="w-4 h-4 text-[#963D2C]" />
                    <span>Submissions are stored securely for 1Roof Realty sales team verification.</span>
                  </div>
                </div>

              </form>
            </div>
          )}
        </ScrollReveal>
      </section>

    </div>
  );
};
