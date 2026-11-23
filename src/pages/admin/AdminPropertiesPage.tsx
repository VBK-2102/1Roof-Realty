import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  Search, 
  X, 
  Check, 
  Upload, 
  Eye, 
  MapPin,
  IndianRupee,
  AlertCircle
} from 'lucide-react';
import { DatabaseService } from '../../services/db';
import { Property, PropertyType, ListingIntent, PropertyCategory, FurnishingStatus, AvailabilityStatus } from '../../types';

export const AdminPropertiesPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [intent, setIntent] = useState<ListingIntent>('buy');
  const [category, setCategory] = useState<PropertyCategory>('residential');
  const [propertyType, setPropertyType] = useState<PropertyType>('Apartment');
  const [price, setPrice] = useState<number>(20000000);
  const [priceDisplay, setPriceDisplay] = useState('₹2.00 Cr');
  const [areaSqFt, setAreaSqFt] = useState<number>(1200);
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [furnishing, setFurnishing] = useState<FurnishingStatus>('Semi-Furnished');
  const [availability, setAvailability] = useState<AvailabilityStatus>('Ready to Move');
  const [city, setCity] = useState('Mumbai');
  const [locality, setLocality] = useState('Mulund East');
  const [address, setAddress] = useState('G.V. Scheme Road No. 1, Mulund East');
  const [reraId, setReraId] = useState('P51800049912');
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    setLoading(true);
    const data = await DatabaseService.getProperties();
    setProperties(data);
    setLoading(false);
  }

  const handleOpenAddModal = () => {
    setEditingPropertyId(null);
    setTitle('');
    setSlug('');
    setShortDesc('');
    setFullDesc('');
    setIntent('buy');
    setCategory('residential');
    setPropertyType('Apartment');
    setPrice(22000000);
    setPriceDisplay('₹2.20 Cr');
    setAreaSqFt(1150);
    setBedrooms(2);
    setBathrooms(2);
    setFurnishing('Semi-Furnished');
    setAvailability('Ready to Move');
    setCity('Mumbai');
    setLocality('Mulund East');
    setAddress('G.V. Scheme Road, Mulund East, Mumbai 400081');
    setReraId('P51800099881');
    setIsFeatured(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: Property) => {
    setEditingPropertyId(p.id);
    setTitle(p.title);
    setSlug(p.slug);
    setShortDesc(p.shortDescription);
    setFullDesc(p.fullDescription);
    setIntent(p.intent);
    setCategory(p.category);
    setPropertyType(p.propertyType);
    setPrice(p.price);
    setPriceDisplay(p.priceDisplay);
    setAreaSqFt(p.areaSqFt);
    setBedrooms(p.bedrooms || 2);
    setBathrooms(p.bathrooms || 2);
    setFurnishing(p.furnishing);
    setAvailability(p.availability);
    setCity(p.city);
    setLocality(p.locality);
    setAddress(p.address);
    setReraId(p.reraId || '');
    setIsFeatured(p.isFeatured);
    setImageUrlInput(p.images[0]?.url || '');
    setIsModalOpen(true);
  };

  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();

    const generatedSlug = slug.trim() 
      ? slug.trim().toLowerCase().replace(/\s+/g, '-') 
      : title.trim().toLowerCase().replace(/\s+/g, '-');

    if (editingPropertyId) {
      // Update
      await DatabaseService.updateProperty(editingPropertyId, {
        title,
        slug: generatedSlug,
        shortDescription: shortDesc,
        fullDescription: fullDesc,
        intent,
        category,
        propertyType,
        price,
        priceDisplay,
        pricePerSqFt: Math.round(price / (areaSqFt || 1)),
        areaSqFt,
        bedrooms,
        bathrooms,
        furnishing,
        availability,
        city,
        locality,
        address,
        reraId: reraId || undefined,
        isFeatured,
        images: [{ id: 'img-main', url: imageUrlInput, isCover: true }]
      });
    } else {
      // Create
      await DatabaseService.createProperty({
        slug: generatedSlug,
        title,
        shortDescription: shortDesc,
        fullDescription: fullDesc,
        intent,
        category,
        propertyType,
        price,
        priceDisplay,
        pricePerSqFt: Math.round(price / (areaSqFt || 1)),
        areaSqFt,
        bedrooms,
        bathrooms,
        furnishing,
        availability,
        possessionDate: availability === 'Ready to Move' ? 'Immediate' : 'Under Construction',
        city,
        locality,
        address,
        reraId: reraId || undefined,
        isFeatured,
        isVerified: true,
        isDemoData: false,
        coordinates: { lat: 19.1726, lng: 72.9565 },
        images: [{ id: 'img-main', url: imageUrlInput, isCover: true }],
        amenities: [
          { category: 'Convenience', name: '24/7 Power Redundancy' },
          { category: 'Security', name: 'Biometric Access Control' }
        ],
        specifications: {
          'Structure': 'RCC Framed Structure',
          'Flooring': 'Vitrified Marble tiles'
        }
      });
    }

    setIsModalOpen(false);
    loadProperties();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this property listing?')) {
      await DatabaseService.deleteProperty(id);
      loadProperties();
    }
  };

  const handleToggleFeatured = async (id: string) => {
    await DatabaseService.toggleFeatured(id);
    loadProperties();
  };

  // Filtered
  const filteredProperties = properties.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#141912]">Property Inventory Management</h1>
          <p className="text-xs text-[#4E5B49]">Create, modify, feature, or archive properties in the live database</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#963D2C] text-white hover:bg-[#7A2514] text-xs font-bold shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#FFB088]" />
          <span>Add New Property</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-white border border-[#D5E1CE] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8B7355] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, locality or city..."
            className="w-full text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl pl-10 pr-4 py-2 text-[#141912] focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl px-3 py-2 text-[#141912] focus:bg-white"
          >
            <option value="All">All Categories</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="plots">Plots & Land</option>
          </select>

          <span className="text-xs font-mono text-[#4E5B49] shrink-0">
            {filteredProperties.length} records
          </span>
        </div>
      </div>

      {/* Property Table */}
      <div className="bg-white rounded-[32px] border border-[#D5E1CE] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F4F7EE] border-b border-[#D5E1CE] font-mono text-[#8B7355] uppercase text-[10px]">
              <tr>
                <th className="py-4 px-6">Property</th>
                <th className="py-4 px-4">Location</th>
                <th className="py-4 px-4">Intent</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4">Availability</th>
                <th className="py-4 px-4">Featured</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EDE0]">
              {filteredProperties.map((p) => (
                <tr key={p.id} className="hover:bg-[#F4F7EE]/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]?.url}
                        alt={p.title}
                        className="w-12 h-10 object-cover rounded-xl border border-[#D5E1CE] shrink-0"
                      />
                      <div>
                        <strong className="text-[#141912] font-bold block max-w-xs truncate">{p.title}</strong>
                        <span className="text-[10px] text-[#4E5B49] font-mono">
                          {p.propertyType} &bull; {p.areaSqFt} sq.ft {p.isDemoData && '(Demo)'}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-mono text-[#4E5B49]">
                    <span>{p.locality}, {p.city}</span>
                  </td>

                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      p.intent === 'buy' ? 'bg-[#963D2C] text-[#FFB088]' : 'bg-[#B54D35] text-white'
                    }`}>
                      {p.intent}
                    </span>
                  </td>

                  <td className="py-4 px-4 font-mono font-bold text-[#963D2C]">
                    {p.priceDisplay}
                  </td>

                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-[#FBECE7] text-[#963D2C] text-[10px] font-mono">
                      {p.availability}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleToggleFeatured(p.id)}
                      className={`p-1.5 rounded-full transition-colors ${
                        p.isFeatured ? 'text-amber-500 hover:text-amber-600' : 'text-gray-300 hover:text-gray-400'
                      }`}
                      title={p.isFeatured ? 'Unfeature' : 'Feature on Homepage'}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditModal(p)}
                        className="p-1.5 rounded-lg border border-[#F1D6CE] hover:bg-[#FAF7F2] text-[#963D2C]"
                        title="Edit property"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600"
                        title="Delete property"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT PROPERTY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3D1007]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[36px] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#D5E1CE] my-8 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#F4F7EE]"
            >
              <X className="w-5 h-5 text-[#4E5B49]" />
            </button>

            <div className="mb-6 border-b border-[#E3EDE0] pb-4">
              <h2 className="text-xl font-bold text-[#141912]">
                {editingPropertyId ? 'Edit Property Listing' : 'Add New Property to Database'}
              </h2>
              <p className="text-xs text-[#4E5B49]">Fill all specifications accurately for public presentation.</p>
            </div>

            <form onSubmit={handleSaveProperty} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#4E5B49]">Property Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The Grand View 3 BHK Residence"
                  className="w-full text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl px-3.5 py-2.5 text-[#141912] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#4E5B49]">Intent *</label>
                  <select
                    value={intent}
                    onChange={(e) => setIntent(e.target.value as any)}
                    className="w-full text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl px-3 py-2.5"
                  >
                    <option value="buy">For Sale (Buy)</option>
                    <option value="rent">For Rent / Lease</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#4E5B49]">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl px-3 py-2.5"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="plots">Plots & Land</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#4E5B49]">Property Type *</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as any)}
                    className="w-full text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl px-3 py-2.5"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Office Space">Office Space</option>
                    <option value="Retail Shop">Retail Shop</option>
                    <option value="Residential Plot">Residential Plot</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#4E5B49]">Price in INR *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setPrice(val);
                      if (intent === 'buy') {
                        setPriceDisplay(val >= 10000000 ? `₹${(val / 10000000).toFixed(2)} Cr` : `₹${(val / 100000).toFixed(2)} Lakh`);
                      } else {
                        setPriceDisplay(`₹${val.toLocaleString('en-IN')} / mo`);
                      }
                    }}
                    className="w-full text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl px-3 py-2.5"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#4E5B49]">Display Price *</label>
                  <input
                    type="text"
                    required
                    value={priceDisplay}
                    onChange={(e) => setPriceDisplay(e.target.value)}
                    className="w-full text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl px-3 py-2.5"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#4E5B49]">Area (sq.ft) *</label>
                  <input
                    type="number"
                    required
                    value={areaSqFt}
                    onChange={(e) => setAreaSqFt(Number(e.target.value))}
                    className="w-full text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl px-3 py-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#4E5B49]">Bedrooms</label>
                  <input
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl px-3 py-2.5"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#4E5B49]">Bathrooms</label>
                  <input
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl px-3 py-2.5"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#4E5B49]">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl px-3 py-2.5"
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Indore">Indore</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#4E5B49]">Locality</label>
                  <input
                    type="text"
                    required
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl px-3 py-2.5"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#4E5B49]">Full Address *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl px-3.5 py-2.5"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#4E5B49]">Primary Image URL *</label>
                <input
                  type="url"
                  required
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  className="w-full text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl px-3.5 py-2.5"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#4E5B49]">Short Summary (Card) *</label>
                <input
                  type="text"
                  required
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl px-3.5 py-2.5"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#4E5B49]">Full Description *</label>
                <textarea
                  rows={3}
                  required
                  value={fullDesc}
                  onChange={(e) => setFullDesc(e.target.value)}
                  className="w-full text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl p-3 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-[#963D2C]"
                />
                <label htmlFor="featuredToggle" className="text-xs font-semibold text-[#141912]">
                  Feature this property on the homepage showcase
                </label>
              </div>

              <div className="pt-4 border-t border-[#E3EDE0] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#D5E1CE] text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#963D2C] text-white text-xs font-bold hover:bg-[#7A2514]"
                >
                  {editingPropertyId ? 'Save Changes' : 'Create Listing'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
