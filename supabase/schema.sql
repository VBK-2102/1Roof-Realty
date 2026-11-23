-- =========================================================================
-- 1ROOF REALTY INDIA — PRODUCTION POSTGRESQL / SUPABASE DATABASE SCHEMA
-- Entity: One Roof Realty LLP (LLPIN: AAK-3190, Incorporated 2017)
-- =========================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. USERS & ADMIN ACCOUNTS
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) DEFAULT 'agent' CHECK (role IN ('superadmin', 'admin', 'agent', 'staff')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. LOCATIONS TABLE
CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(120) UNIQUE NOT NULL,
    city VARCHAR(100) NOT NULL,
    locality VARCHAR(120) NOT NULL,
    state VARCHAR(100) NOT NULL,
    tagline TEXT,
    description TEXT,
    avg_price_sqft VARCHAR(100),
    rental_yield VARCHAR(50),
    featured_image_url TEXT,
    key_highlights JSONB DEFAULT '[]'::jsonb,
    connectivity JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROPERTIES TABLE
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    intent VARCHAR(20) NOT NULL CHECK (intent IN ('buy', 'rent')),
    category VARCHAR(50) NOT NULL CHECK (category IN ('residential', 'commercial', 'plots', 'projects')),
    property_type VARCHAR(80) NOT NULL,
    price NUMERIC(14, 2) NOT NULL,
    price_display VARCHAR(80) NOT NULL,
    price_per_sqft NUMERIC(10, 2),
    area_sqft NUMERIC(10, 2) NOT NULL,
    bedrooms INTEGER DEFAULT 0,
    bathrooms INTEGER DEFAULT 0,
    balconies INTEGER DEFAULT 0,
    furnishing VARCHAR(50) DEFAULT 'Unfurnished' CHECK (furnishing IN ('Furnished', 'Semi-Furnished', 'Unfurnished')),
    availability VARCHAR(60) DEFAULT 'Ready to Move',
    possession_date VARCHAR(60),
    rera_id VARCHAR(100),
    is_featured BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT true,
    is_demo_data BOOLEAN DEFAULT false,
    city VARCHAR(100) NOT NULL,
    locality VARCHAR(120) NOT NULL,
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    specifications JSONB DEFAULT '{}'::jsonb,
    nearby_landmarks JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PROPERTY IMAGES TABLE
CREATE TABLE IF NOT EXISTS property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    caption VARCHAR(255),
    is_cover BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PROPERTY AMENITIES TABLE
CREATE TABLE IF NOT EXISTS property_amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    category VARCHAR(60) NOT NULL,
    name VARCHAR(120) NOT NULL,
    icon VARCHAR(60),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    property_title VARCHAR(255),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    budget_range VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_discussion', 'closed', 'archived')),
    assigned_salesperson VARCHAR(150),
    internal_notes TEXT,
    source VARCHAR(80) DEFAULT 'website_property_page',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SITE VISITS TABLE
CREATE TABLE IF NOT EXISTS site_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    property_title VARCHAR(255) NOT NULL,
    property_city VARCHAR(100) NOT NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(30) NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time_slot VARCHAR(80) NOT NULL,
    additional_notes TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rescheduled', 'completed', 'cancelled')),
    internal_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. OWNER SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS owner_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_name VARCHAR(150) NOT NULL,
    owner_phone VARCHAR(30) NOT NULL,
    owner_email VARCHAR(255) NOT NULL,
    property_location TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    locality VARCHAR(120) NOT NULL,
    property_type VARCHAR(80) NOT NULL,
    intent VARCHAR(20) NOT NULL CHECK (intent IN ('buy', 'rent')),
    expected_price NUMERIC(14, 2) NOT NULL,
    expected_price_display VARCHAR(80) NOT NULL,
    area_sqft NUMERIC(10, 2) NOT NULL,
    bedrooms INTEGER,
    bathrooms INTEGER,
    furnishing VARCHAR(50) DEFAULT 'Unfurnished',
    description TEXT NOT NULL,
    image_urls JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'approved', 'rejected', 'converted')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(120) UNIQUE NOT NULL,
    title VARCHAR(150) NOT NULL,
    short_desc TEXT NOT NULL,
    full_desc TEXT,
    icon VARCHAR(60),
    highlights JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name VARCHAR(150) NOT NULL,
    client_role VARCHAR(120),
    city VARCHAR(100),
    property_transacted VARCHAR(255),
    quote TEXT NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    is_verified BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- INDEXES FOR HIGH-THROUGHPUT SEARCH & FILTERING
-- =========================================================================
CREATE INDEX IF NOT EXISTS idx_properties_intent_category ON properties(intent, category);
CREATE INDEX IF NOT EXISTS idx_properties_city_locality ON properties(city, locality);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_is_featured ON properties(is_featured);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_site_visits_date ON site_visits(preferred_date);
CREATE INDEX IF NOT EXISTS idx_site_visits_status ON site_visits(status);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE owner_submissions ENABLE ROW LEVEL SECURITY;

-- Public can view active properties
CREATE POLICY "Public properties are viewable by everyone" 
ON properties FOR SELECT USING (true);

-- Public can insert enquiries
CREATE POLICY "Public can insert enquiries" 
ON enquiries FOR INSERT WITH CHECK (true);

-- Public can insert site visits
CREATE POLICY "Public can insert site visits" 
ON site_visits FOR INSERT WITH CHECK (true);

-- Public can insert owner submissions
CREATE POLICY "Public can insert owner submissions" 
ON owner_submissions FOR INSERT WITH CHECK (true);
