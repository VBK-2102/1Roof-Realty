export type PropertyCategory = 'residential' | 'commercial' | 'plots' | 'projects';
export type ListingIntent = 'buy' | 'rent';
export type PropertyType = 
  | 'Apartment' 
  | 'Penthouse' 
  | 'Luxury Villa' 
  | 'Independent House' 
  | 'Office Space' 
  | 'Commercial Showroom' 
  | 'Retail Shop' 
  | 'Residential Plot'
  | 'Industrial / Warehouse';

export type FurnishingStatus = 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
export type AvailabilityStatus = 'Ready to Move' | 'Under Construction' | 'Immediate' | 'Sold' | 'Rented';
export type EnquiryStatus = 'new' | 'contacted' | 'in_discussion' | 'closed' | 'archived';
export type VisitStatus = 'pending' | 'confirmed' | 'rescheduled' | 'completed' | 'cancelled';
export type SubmissionStatus = 'pending' | 'reviewed' | 'approved' | 'rejected' | 'converted';

export interface PropertyImage {
  id: string;
  url: string;
  caption?: string;
  isCover?: boolean;
}

export interface Amenity {
  category: 'Security' | 'Lifestyle' | 'Wellness' | 'Eco-Friendly' | 'Convenience';
  name: string;
  icon?: string;
}

export interface FloorPlan {
  title: string;
  bhk: string;
  areaSqFt: number;
  imageUrl: string;
}

export interface NearbyPlace {
  name: string;
  type: 'Transit' | 'Airport' | 'Hospital' | 'School' | 'Tech Park' | 'Shopping' | 'Lifestyle';
  distance: string;
  driveTime: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  intent: ListingIntent; // buy or rent
  category: PropertyCategory;
  propertyType: PropertyType;
  price: number; // in INR
  priceDisplay: string; // e.g. "₹2.45 Cr" or "₹65,000 / mo"
  pricePerSqFt?: number;
  areaSqFt: number;
  bedrooms?: number;
  bathrooms?: number;
  balconies?: number;
  furnishing: FurnishingStatus;
  availability: AvailabilityStatus;
  possessionDate?: string;
  reraId?: string;
  isFeatured: boolean;
  isVerified: boolean;
  isDemoData: boolean;
  city: string; // e.g. "Mumbai", "Indore"
  locality: string; // e.g. "Mulund East", "Super Corridor"
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  images: PropertyImage[];
  amenities: Amenity[];
  specifications: Record<string, string>;
  floorPlans?: FloorPlan[];
  nearbyLandmarks?: NearbyPlace[];
  createdAt: string;
  updatedAt: string;
}

export interface Enquiry {
  id: string;
  propertyId?: string;
  propertyTitle?: string;
  fullName: string;
  email: string;
  phone: string;
  budgetRange?: string;
  message: string;
  status: EnquiryStatus;
  assignedSalesperson?: string;
  internalNotes?: string;
  source: 'website_property_page' | 'homepage_cta' | 'contact_page' | 'whatsapp_intent';
  createdAt: string;
}

export interface SiteVisitRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyCity: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  preferredDate: string;
  preferredTimeSlot: string; // e.g. "10:00 AM - 12:00 PM"
  additionalNotes?: string;
  status: VisitStatus;
  internalNotes?: string;
  createdAt: string;
}

export interface OwnerSubmission {
  id: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  propertyLocation: string;
  city: string;
  locality: string;
  propertyType: PropertyType;
  intent: ListingIntent;
  expectedPrice: number;
  expectedPriceDisplay: string;
  areaSqFt: number;
  bedrooms?: number;
  bathrooms?: number;
  furnishing: FurnishingStatus;
  description: string;
  imageUrls: string[];
  status: SubmissionStatus;
  notes?: string;
  createdAt: string;
}

export interface LocationInfo {
  slug: string;
  city: string;
  locality: string;
  state: string;
  tagline: string;
  description: string;
  avgPricePerSqFt: string;
  rentalYield: string;
  featuredImageUrl: string;
  keyHighlights: string[];
  connectivity: string[];
}

export interface PropertyFilterParams {
  intent?: ListingIntent;
  category?: PropertyCategory | 'all';
  propertyType?: string;
  city?: string;
  locality?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number | 'any';
  bathrooms?: number | 'any';
  minArea?: number;
  maxArea?: number;
  furnishing?: string;
  availability?: string;
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'area_desc';
  searchQuery?: string;
}
