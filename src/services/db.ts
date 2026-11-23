import { 
  Property, 
  Enquiry, 
  SiteVisitRequest, 
  OwnerSubmission, 
  PropertyFilterParams 
} from '../types';
import { SEED_PROPERTIES } from '../data/seedData';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const STORAGE_KEYS = {
  PROPERTIES: '1roof_properties_v1',
  ENQUIRIES: '1roof_enquiries_v1',
  SITE_VISITS: '1roof_site_visits_v1',
  SUBMISSIONS: '1roof_submissions_v1',
  ADMIN_AUTH: '1roof_admin_session_v1'
};

// Supabase client instance (if env vars provided)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase: SupabaseClient | null = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Initial seed enquiries for demonstration in admin
const SEED_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-101',
    propertyId: 'prop-1',
    propertyTitle: 'The Emerald Residence, Mulund East',
    fullName: 'Rohan Deshmukh',
    email: 'rohan.deshmukh@gmail.com',
    phone: '+91 98210 54321',
    budgetRange: '₹2.2 Cr - ₹2.5 Cr',
    message: 'Interested in the 3 BHK layout on a higher floor. Looking for immediate registration with stamp duty assistance.',
    status: 'new',
    assignedSalesperson: 'Sachin Dhotre',
    internalNotes: 'Client works at Mindspace Airoli; preferred weekend visit.',
    source: 'website_property_page',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'enq-102',
    propertyId: 'prop-2',
    propertyTitle: 'Aurora Sky Villas, Super Corridor',
    fullName: 'Ananya Sharma',
    email: 'ananya.s@technova.com',
    phone: '+91 97555 88990',
    budgetRange: '₹1.8 Cr - ₹2.0 Cr',
    message: 'Seeking a family villa close to the TCS campus in Indore. Need details about HDFC pre-approved loan sanctions.',
    status: 'contacted',
    assignedSalesperson: 'Sandeep Choudhary',
    internalNotes: 'Contacted via WhatsApp; sent PDF brochure and site video walkthrough.',
    source: 'website_property_page',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'enq-103',
    propertyTitle: 'General Commercial Investment Enquiry',
    fullName: 'Dr. Vikramaditya Rao',
    email: 'dr.rao.cardio@medmail.in',
    phone: '+91 94250 11223',
    budgetRange: '₹1 Cr - ₹3 Cr',
    message: 'Inquiring about high-rental-yield commercial retail shops along Super Corridor Indore.',
    status: 'in_discussion',
    assignedSalesperson: 'Vishal Ujjainkar',
    internalNotes: 'High-intent investor; evaluating shop #4 ground floor.',
    source: 'homepage_cta',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

const SEED_VISITS: SiteVisitRequest[] = [
  {
    id: 'visit-201',
    propertyId: 'prop-1',
    propertyTitle: 'The Emerald Residence, Mulund East',
    propertyCity: 'Mumbai',
    customerName: 'Kunal Singhania',
    customerEmail: 'kunal.singh@outlook.com',
    customerPhone: '+91 98199 44332',
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    preferredTimeSlot: '11:00 AM - 01:00 PM',
    additionalNotes: 'Please keep the sample flat keys ready. Family of 3 visiting.',
    status: 'confirmed',
    internalNotes: 'Confirmed with site supervisor at Mulund East.',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'visit-202',
    propertyId: 'prop-3',
    propertyTitle: 'The Apex Tower: Grade-A Commercial Floor, Powai',
    propertyCity: 'Mumbai',
    customerName: 'Meera Iyer',
    customerEmail: 'facilities@fintechventures.io',
    customerPhone: '+91 99201 98765',
    preferredDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    preferredTimeSlot: '03:00 PM - 05:00 PM',
    additionalNotes: 'Need access to building HVAC specs and MLCP basement.',
    status: 'pending',
    internalNotes: '',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];

const SEED_SUBMISSIONS: OwnerSubmission[] = [
  {
    id: 'sub-301',
    ownerName: 'Harishchandra Patil',
    ownerPhone: '+91 98205 66778',
    ownerEmail: 'harish.patil@rediffmail.com',
    propertyLocation: 'Near Eastern Express Highway, Mulund East',
    city: 'Mumbai',
    locality: 'Mulund East',
    propertyType: 'Apartment',
    intent: 'buy',
    expectedPrice: 19500000,
    expectedPriceDisplay: '₹1.95 Cr',
    areaSqFt: 1050,
    bedrooms: 2,
    bathrooms: 2,
    furnishing: 'Semi-Furnished',
    description: 'Immaculately maintained 2 BHK in prime cooperative society. Covered car park, clear title, society NOC ready.',
    imageUrls: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'],
    status: 'reviewed',
    notes: 'Title verification in progress; verified original share certificates.',
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString()
  }
];

// Helper to initialize local storage
function initStorage() {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.PROPERTIES)) {
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(SEED_PROPERTIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ENQUIRIES)) {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(SEED_ENQUIRIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SITE_VISITS)) {
    localStorage.setItem(STORAGE_KEYS.SITE_VISITS, JSON.stringify(SEED_VISITS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SUBMISSIONS)) {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(SEED_SUBMISSIONS));
  }
}

initStorage();

export const DatabaseService = {
  // Properties CRUD
  async getProperties(filters?: PropertyFilterParams): Promise<Property[]> {
    initStorage();
    const raw = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
    let list: Property[] = raw ? JSON.parse(raw) : SEED_PROPERTIES;

    if (!filters) return list;

    if (filters.intent) {
      list = list.filter(p => p.intent === filters.intent);
    }
    if (filters.category && filters.category !== 'all') {
      list = list.filter(p => p.category === filters.category);
    }
    if (filters.propertyType && filters.propertyType !== 'All') {
      list = list.filter(p => p.propertyType.toLowerCase() === filters.propertyType?.toLowerCase());
    }
    if (filters.city && filters.city !== 'All') {
      list = list.filter(p => p.city.toLowerCase() === filters.city?.toLowerCase());
    }
    if (filters.locality && filters.locality !== 'All') {
      list = list.filter(p => p.locality.toLowerCase().includes(filters.locality!.toLowerCase()));
    }
    if (filters.minPrice !== undefined && filters.minPrice > 0) {
      list = list.filter(p => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
      list = list.filter(p => p.price <= filters.maxPrice!);
    }
    if (filters.bedrooms && filters.bedrooms !== 'any') {
      const bCount = Number(filters.bedrooms);
      list = list.filter(p => (p.bedrooms || 0) >= bCount);
    }
    if (filters.bathrooms && filters.bathrooms !== 'any') {
      const bathCount = Number(filters.bathrooms);
      list = list.filter(p => (p.bathrooms || 0) >= bathCount);
    }
    if (filters.furnishing && filters.furnishing !== 'All') {
      list = list.filter(p => p.furnishing.toLowerCase() === filters.furnishing?.toLowerCase());
    }
    if (filters.availability && filters.availability !== 'All') {
      list = list.filter(p => p.availability.toLowerCase().includes(filters.availability!.toLowerCase()));
    }
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        (p.reraId && p.reraId.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (filters.sortBy === 'price_asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price_desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'area_desc') {
      list.sort((a, b) => b.areaSqFt - a.areaSqFt);
    } else {
      // Default: newest
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return list;
  },

  async getPropertyBySlug(slug: string): Promise<Property | null> {
    initStorage();
    const raw = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
    const list: Property[] = raw ? JSON.parse(raw) : SEED_PROPERTIES;
    return list.find(p => p.slug === slug || p.id === slug) || null;
  },

  async getPropertyById(id: string): Promise<Property | null> {
    initStorage();
    const raw = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
    const list: Property[] = raw ? JSON.parse(raw) : SEED_PROPERTIES;
    return list.find(p => p.id === id) || null;
  },

  async createProperty(data: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
    initStorage();
    const raw = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
    const list: Property[] = raw ? JSON.parse(raw) : [];

    const newProperty: Property = {
      ...data,
      id: 'prop-' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    list.unshift(newProperty);
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(list));
    return newProperty;
  },

  async updateProperty(id: string, updates: Partial<Property>): Promise<Property | null> {
    initStorage();
    const raw = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
    const list: Property[] = raw ? JSON.parse(raw) : [];
    const index = list.findIndex(p => p.id === id);
    if (index === -1) return null;

    list[index] = {
      ...list[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(list));
    return list[index];
  },

  async deleteProperty(id: string): Promise<boolean> {
    initStorage();
    const raw = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
    const list: Property[] = raw ? JSON.parse(raw) : [];
    const filtered = list.filter(p => p.id !== id);
    if (filtered.length === list.length) return false;
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(filtered));
    return true;
  },

  async toggleFeatured(id: string): Promise<Property | null> {
    const prop = await this.getPropertyById(id);
    if (!prop) return null;
    return this.updateProperty(id, { isFeatured: !prop.isFeatured });
  },

  // Enquiries
  async getEnquiries(): Promise<Enquiry[]> {
    initStorage();
    const raw = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    const list: Enquiry[] = raw ? JSON.parse(raw) : [];
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async createEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Promise<Enquiry> {
    initStorage();
    const raw = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    const list: Enquiry[] = raw ? JSON.parse(raw) : [];

    const newEnquiry: Enquiry = {
      ...enquiry,
      id: 'enq-' + Date.now(),
      status: 'new',
      createdAt: new Date().toISOString()
    };

    list.unshift(newEnquiry);
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(list));
    return newEnquiry;
  },

  async updateEnquiryStatus(
    id: string, 
    status: Enquiry['status'], 
    internalNotes?: string, 
    assignedSalesperson?: string
  ): Promise<Enquiry | null> {
    initStorage();
    const raw = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    const list: Enquiry[] = raw ? JSON.parse(raw) : [];
    const item = list.find(e => e.id === id);
    if (!item) return null;

    item.status = status;
    if (internalNotes !== undefined) item.internalNotes = internalNotes;
    if (assignedSalesperson !== undefined) item.assignedSalesperson = assignedSalesperson;

    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(list));
    return item;
  },

  // Site Visits
  async getSiteVisits(): Promise<SiteVisitRequest[]> {
    initStorage();
    const raw = localStorage.getItem(STORAGE_KEYS.SITE_VISITS);
    const list: SiteVisitRequest[] = raw ? JSON.parse(raw) : [];
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async createSiteVisit(visit: Omit<SiteVisitRequest, 'id' | 'createdAt' | 'status'>): Promise<SiteVisitRequest> {
    initStorage();
    const raw = localStorage.getItem(STORAGE_KEYS.SITE_VISITS);
    const list: SiteVisitRequest[] = raw ? JSON.parse(raw) : [];

    const newVisit: SiteVisitRequest = {
      ...visit,
      id: 'visit-' + Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    list.unshift(newVisit);
    localStorage.setItem(STORAGE_KEYS.SITE_VISITS, JSON.stringify(list));
    return newVisit;
  },

  async updateSiteVisitStatus(
    id: string, 
    status: SiteVisitRequest['status'], 
    internalNotes?: string
  ): Promise<SiteVisitRequest | null> {
    initStorage();
    const raw = localStorage.getItem(STORAGE_KEYS.SITE_VISITS);
    const list: SiteVisitRequest[] = raw ? JSON.parse(raw) : [];
    const item = list.find(v => v.id === id);
    if (!item) return null;

    item.status = status;
    if (internalNotes !== undefined) item.internalNotes = internalNotes;

    localStorage.setItem(STORAGE_KEYS.SITE_VISITS, JSON.stringify(list));
    return item;
  },

  // Owner Submissions
  async getOwnerSubmissions(): Promise<OwnerSubmission[]> {
    initStorage();
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    const list: OwnerSubmission[] = raw ? JSON.parse(raw) : [];
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async createOwnerSubmission(sub: Omit<OwnerSubmission, 'id' | 'createdAt' | 'status'>): Promise<OwnerSubmission> {
    initStorage();
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    const list: OwnerSubmission[] = raw ? JSON.parse(raw) : [];

    const newSub: OwnerSubmission = {
      ...sub,
      id: 'sub-' + Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    list.unshift(newSub);
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(list));
    return newSub;
  },

  async updateSubmissionStatus(id: string, status: OwnerSubmission['status'], notes?: string): Promise<OwnerSubmission | null> {
    initStorage();
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    const list: OwnerSubmission[] = raw ? JSON.parse(raw) : [];
    const item = list.find(s => s.id === id);
    if (!item) return null;

    item.status = status;
    if (notes !== undefined) item.notes = notes;

    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(list));
    return item;
  },

  async convertSubmissionToListing(subId: string): Promise<Property | null> {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    const list: OwnerSubmission[] = raw ? JSON.parse(raw) : [];
    const sub = list.find(s => s.id === subId);
    if (!sub) return null;

    // Convert to property
    const newProp: Omit<Property, 'id' | 'createdAt' | 'updatedAt'> = {
      slug: (sub.locality + '-' + sub.propertyType + '-' + Date.now()).toLowerCase().replace(/\s+/g, '-'),
      title: `${sub.propertyType} at ${sub.locality}, ${sub.city}`,
      shortDescription: sub.description.slice(0, 140) + '...',
      fullDescription: sub.description,
      intent: sub.intent,
      category: sub.propertyType.includes('Office') || sub.propertyType.includes('Shop') ? 'commercial' : 'residential',
      propertyType: sub.propertyType,
      price: sub.expectedPrice,
      priceDisplay: sub.expectedPriceDisplay,
      pricePerSqFt: Math.round(sub.expectedPrice / (sub.areaSqFt || 1)),
      areaSqFt: sub.areaSqFt,
      bedrooms: sub.bedrooms,
      bathrooms: sub.bathrooms,
      furnishing: sub.furnishing,
      availability: 'Ready to Move',
      isFeatured: false,
      isVerified: true,
      isDemoData: false,
      city: sub.city,
      locality: sub.locality,
      address: sub.propertyLocation,
      coordinates: { lat: 19.1726, lng: 72.9565 },
      images: sub.imageUrls.map((url, i) => ({ id: `img-sub-${i}`, url, isCover: i === 0 })),
      amenities: [{ category: 'Convenience', name: 'Verified Listing' }],
      specifications: { 'Submission Ref': sub.id }
    };

    const created = await this.createProperty(newProp);
    await this.updateSubmissionStatus(subId, 'converted', `Converted to listing ID: ${created.id}`);
    return created;
  },

  // Reset to seed data
  resetAllDemoData(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(SEED_PROPERTIES));
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(SEED_ENQUIRIES));
    localStorage.setItem(STORAGE_KEYS.SITE_VISITS, JSON.stringify(SEED_VISITS));
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(SEED_SUBMISSIONS));
  }
};
