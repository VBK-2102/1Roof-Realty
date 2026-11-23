import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Building, 
  Bed, 
  RotateCcw
} from 'lucide-react';
import { PropertyFilterParams, ListingIntent } from '../../types';

interface PropertySearchProps {
  initialFilters?: PropertyFilterParams;
  onFilterChange: (filters: PropertyFilterParams) => void;
  resultCount?: number;
  compact?: boolean;
}

export const PropertySearch: React.FC<PropertySearchProps> = ({
  initialFilters = {},
  onFilterChange,
  resultCount,
}) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'commercial'>(
    initialFilters.category === 'commercial' 
      ? 'commercial' 
      : (initialFilters.intent || 'buy')
  );

  const [city, setCity] = useState<string>(initialFilters.city || 'All');
  const [propertyType, setPropertyType] = useState<string>(initialFilters.propertyType || 'All');
  const [locality, setLocality] = useState<string>(initialFilters.locality || '');
  const [bedrooms, setBedrooms] = useState<string>(initialFilters.bedrooms?.toString() || 'any');
  const [minPrice, setMinPrice] = useState<number | undefined>(initialFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(initialFilters.maxPrice);
  const [furnishing, setFurnishing] = useState<string>(initialFilters.furnishing || 'All');
  const [availability, setAvailability] = useState<string>(initialFilters.availability || 'All');
  const [sortBy, setSortBy] = useState<PropertyFilterParams['sortBy']>(initialFilters.sortBy || 'newest');
  const [searchQuery, setSearchQuery] = useState<string>(initialFilters.searchQuery || '');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const triggerSearch = (override?: Partial<PropertyFilterParams>) => {
    let intent: ListingIntent = 'buy';
    let category: PropertyFilterParams['category'] = 'residential';

    if (activeTab === 'buy') {
      intent = 'buy';
      category = 'residential';
    } else if (activeTab === 'rent') {
      intent = 'rent';
      category = 'residential';
    } else if (activeTab === 'commercial') {
      intent = 'buy';
      category = 'commercial';
    }

    const filters: PropertyFilterParams = {
      intent: activeTab === 'commercial' ? undefined : intent,
      category: activeTab === 'commercial' ? 'commercial' : undefined,
      city: city === 'All' ? undefined : city,
      locality: locality.trim() || undefined,
      propertyType: propertyType === 'All' ? undefined : propertyType,
      bedrooms: bedrooms === 'any' ? undefined : Number(bedrooms),
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      furnishing: furnishing === 'All' ? undefined : furnishing,
      availability: availability === 'All' ? undefined : availability,
      sortBy,
      searchQuery: searchQuery.trim() || undefined,
      ...override
    };

    onFilterChange(filters);
  };

  const handleTabSwitch = (tab: 'buy' | 'rent' | 'commercial') => {
    setActiveTab(tab);
    if (tab === 'commercial') {
      triggerSearch({ category: 'commercial', intent: undefined });
    } else {
      triggerSearch({ intent: tab, category: 'residential' });
    }
  };

  const handleReset = () => {
    setCity('All');
    setPropertyType('All');
    setLocality('');
    setBedrooms('any');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setFurnishing('All');
    setAvailability('All');
    setSortBy('newest');
    setSearchQuery('');
    setActiveTab('buy');
    onFilterChange({});
  };

  return (
    <div className="w-full bg-white rounded-[32px] sm:rounded-[40px] p-4 sm:p-7 shadow-[0_12px_40px_rgba(150,61,44,0.08)] border border-[#ECDCD5]">
      
      {/* Top Segment Tabs */}
      <div className="flex items-center justify-between pb-5 border-b border-[#FBECE7] gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#FAF7F2] border border-[#ECDCD5]">
          <button
            type="button"
            onClick={() => handleTabSwitch('buy')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'buy'
                ? 'bg-[#963D2C] text-white shadow-sm'
                : 'text-[#211613] hover:text-[#963D2C]'
            }`}
          >
            Buy Property
          </button>

          <button
            type="button"
            onClick={() => handleTabSwitch('rent')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'rent'
                ? 'bg-[#963D2C] text-white shadow-sm'
                : 'text-[#211613] hover:text-[#963D2C]'
            }`}
          >
            Rent Property
          </button>

          <button
            type="button"
            onClick={() => handleTabSwitch('commercial')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'commercial'
                ? 'bg-[#963D2C] text-white shadow-sm'
                : 'text-[#211613] hover:text-[#963D2C]'
            }`}
          >
            Commercial Spaces
          </button>
        </div>

        {/* Quick status count & reset */}
        <div className="flex items-center gap-3">
          {resultCount !== undefined && (
            <span className="font-mono text-xs text-[#5C4944] bg-[#FAF7F2] px-3 py-1.5 rounded-full border border-[#ECDCD5]">
              Showing <strong className="text-[#963D2C] font-bold">{resultCount}</strong> matches
            </span>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-[#B54D35] hover:text-[#963D2C] font-mono transition-colors"
            title="Reset All Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Primary Search Inputs Grid */}
      <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* City Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C4944] flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#B54D35]" />
            <span>Select City</span>
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full text-xs font-medium bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-3 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
          >
            <option value="All">All Regions (Mumbai & Central India)</option>
            <option value="Mumbai">Mumbai Metropolitan (Mulund, Powai, Thane)</option>
            <option value="Indore">Indore Hub (Super Corridor, Nipania)</option>
          </select>
        </div>

        {/* Property Type */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C4944] flex items-center gap-1">
            <Building className="w-3 h-3 text-[#B54D35]" />
            <span>Property Type</span>
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full text-xs font-medium bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-3 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
          >
            <option value="All">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Luxury Villa">Luxury Villa</option>
            <option value="Office Space">Grade-A Office Space</option>
            <option value="Retail Shop">Retail Shop / Showroom</option>
            <option value="Residential Plot">Residential Plot</option>
          </select>
        </div>

        {/* Locality / Keyword Search */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C4944] flex items-center gap-1">
            <Search className="w-3 h-3 text-[#B54D35]" />
            <span>Search Locality / Keyword</span>
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && triggerSearch()}
            placeholder="e.g. Mulund, Super Corridor, RERA..."
            className="w-full text-xs font-medium bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-3 text-[#211613] placeholder-[#5C4944]/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
          />
        </div>

        {/* Bedrooms / BHK */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C4944] flex items-center gap-1">
            <Bed className="w-3 h-3 text-[#B54D35]" />
            <span>Bedrooms (BHK)</span>
          </label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full text-xs font-medium bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-3 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
          >
            <option value="any">Any BHK Configuration</option>
            <option value="1">1+ BHK</option>
            <option value="2">2+ BHK</option>
            <option value="3">3+ BHK</option>
            <option value="4">4+ BHK (Luxury & Penthouses)</option>
          </select>
        </div>
      </div>

      {/* Action Row & Advanced Toggle */}
      <div className="mt-5 pt-4 border-t border-[#FBECE7] flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs font-mono text-[#963D2C] hover:text-[#7A2514] flex items-center gap-1.5 py-1"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#B54D35]" />
          <span>{showAdvanced ? 'Hide Detailed Filters' : 'More Filters (Budget, Furnishing, Availability, Sorting)'}</span>
        </button>

        <button
          type="button"
          onClick={() => triggerSearch()}
          className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#963D2C] text-white hover:bg-[#7A2514] text-xs font-bold tracking-wide transition-all shadow-md shadow-[#963D2C]/20 flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4 text-[#FFB088]" />
          <span>Apply Search Filters</span>
        </button>
      </div>

      {/* Advanced Filter Drawer */}
      {showAdvanced && (
        <div className="mt-5 pt-5 border-t border-[#FBECE7] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
          
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-[#5C4944]">Min Budget (₹)</label>
            <input
              type="number"
              value={minPrice || ''}
              onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
              placeholder="e.g. 5000000 (50L)"
              className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3 py-2.5"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-[#5C4944]">Max Budget (₹)</label>
            <input
              type="number"
              value={maxPrice || ''}
              onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
              placeholder="e.g. 30000000 (3 Cr)"
              className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3 py-2.5"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-[#5C4944]">Furnishing</label>
            <select
              value={furnishing}
              onChange={(e) => setFurnishing(e.target.value)}
              className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3 py-2.5"
            >
              <option value="All">All Furnishing</option>
              <option value="Furnished">Furnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-[#5C4944]">Sort Listings By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3 py-2.5"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="area_desc">Largest Area (sq.ft)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
