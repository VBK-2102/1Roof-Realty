import { Property } from '../types';

export const SEED_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    slug: 'the-emerald-residence-mulund-east',
    title: 'The Emerald Residence, Mulund East',
    shortDescription: 'Ultra-luxurious 3 BHK sunlit residence offering panoramic green hill views, smart home automation, and Italian marble flooring.',
    fullDescription: 'Set in the tranquil and prestigious G.V. Scheme corridor of Mulund East, The Emerald Residence offers an oasis of refined calm just moments from the Eastern Express Highway. Designed by renowned landscape architects, this tower features private deck balconies overlooking Sanjay Gandhi National Park, acoustic double-glazed windows, and dual master suites. Residents enjoy access to a rooftop sky lounge, temperature-controlled lap pool, and 3 tiers of biometric security.',
    intent: 'buy',
    category: 'residential',
    propertyType: 'Apartment',
    price: 24500000,
    priceDisplay: '₹2.45 Cr',
    pricePerSqFt: 18846,
    areaSqFt: 1300,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    furnishing: 'Semi-Furnished',
    availability: 'Ready to Move',
    possessionDate: 'Immediate',
    reraId: 'P51800048912',
    isFeatured: true,
    isVerified: true,
    isDemoData: true,
    city: 'Mumbai',
    locality: 'Mulund East',
    address: 'Near Shree Ramkrishna Niwas, G.V. Scheme Rd No. 1, Mulund East, Mumbai 400081',
    coordinates: { lat: 19.1726, lng: 72.9565 },
    images: [
      { id: 'img-1', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80', isCover: true, caption: 'Spacious living room with floor-to-ceiling glass' },
      { id: 'img-2', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80', isCover: false, caption: 'Designer modular kitchen with German fittings' },
      { id: 'img-3', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80', isCover: false, caption: 'Master bedroom with walk-in wardrobe' },
      { id: 'img-4', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80', isCover: false, caption: 'Deck balcony overlooking lush greenery' }
    ],
    amenities: [
      { category: 'Wellness', name: 'Infinity Lap Pool' },
      { category: 'Wellness', name: 'High-Tech Gymnasium' },
      { category: 'Lifestyle', name: 'Rooftop Sky Lounge' },
      { category: 'Security', name: '3-Tier Biometric Access & CCTV' },
      { category: 'Convenience', name: 'EV Charging Bay' },
      { category: 'Eco-Friendly', name: 'Rainwater Harvesting & Solar Lighting' }
    ],
    specifications: {
      'Flooring': 'Imported Italian Bottochino Marble',
      'Fittings': 'Grohe and Kohler sanitaryware',
      'Structure': 'Earthquake-resistant RCC framed superstructure (Zone III)',
      'Electrical': 'Concealed copper wiring with Schneider smart modular switches',
      'Power Backup': '100% DG backup for common services & 3kVA per apartment'
    },
    floorPlans: [
      { title: 'Standard 3 BHK Layout', bhk: '3 BHK', areaSqFt: 1300, imageUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80' }
    ],
    nearbyLandmarks: [
      { name: 'Mulund Railway Station', type: 'Transit', distance: '1.1 km', driveTime: '4 mins' },
      { name: 'Eastern Express Highway', type: 'Transit', distance: '0.8 km', driveTime: '2 mins' },
      { name: 'Fortis Hospital Mulund', type: 'Hospital', distance: '2.5 km', driveTime: '7 mins' },
      { name: 'V.G. Vaze College', type: 'School', distance: '1.2 km', driveTime: '5 mins' }
    ],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-02-01T12:00:00Z'
  },
  {
    id: 'prop-2',
    slug: 'aurora-sky-villas-super-corridor-indore',
    title: 'Aurora Sky Villas, Super Corridor',
    shortDescription: 'Contemporary 4 BHK triplex villa with private plunge pool, lawn garden, and automated smart energy telemetry.',
    fullDescription: 'Strategically located on the bustling Super Corridor close to the TCS & Infosys tech complexes, Aurora Sky Villas represents the next evolution of luxurious suburban living in Indore. Each villa boasts expansive 11-foot ceiling heights, private landscaped terrace gardens, home elevator provision, and covered multi-car parking. Engineered with thermal insulation and energy-efficient solar setups.',
    intent: 'buy',
    category: 'residential',
    propertyType: 'Luxury Villa',
    price: 18500000,
    priceDisplay: '₹1.85 Cr',
    pricePerSqFt: 6607,
    areaSqFt: 2800,
    bedrooms: 4,
    bathrooms: 4,
    balconies: 3,
    furnishing: 'Unfurnished',
    availability: 'Ready to Move',
    possessionDate: 'Ready',
    reraId: 'P-IND-23-4019',
    isFeatured: true,
    isVerified: true,
    isDemoData: true,
    city: 'Indore',
    locality: 'Super Corridor',
    address: 'Near TCS Square, Super Corridor Expressway, Indore 453112',
    coordinates: { lat: 22.7592, lng: 75.8341 },
    images: [
      { id: 'img-5', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80', isCover: true, caption: 'Modern contemporary villa exterior' },
      { id: 'img-6', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80', isCover: false, caption: 'Private pool deck and manicured lawn' },
      { id: 'img-7', url: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1600&q=80', isCover: false, caption: 'Double height dining and salon area' }
    ],
    amenities: [
      { category: 'Lifestyle', name: 'Private Plunge Pool' },
      { category: 'Wellness', name: 'Clubhouse with Steam & Sauna' },
      { category: 'Security', name: '24/7 Gated Community Surveillance' },
      { category: 'Convenience', name: 'Internal Road Solar Streetlights' },
      { category: 'Convenience', name: '2-Car Covered Garage' }
    ],
    specifications: {
      'Flooring': 'Large format 800x1600mm glazed vitrified tiles',
      'Doors': 'Teakwood frame with designer veneered flush doors',
      'Plumbing': 'Jaguar Artize premium range',
      'Walls': 'Acrylic emulsion with weather-shield exterior coating'
    },
    floorPlans: [
      { title: 'Ground & First Level Plan', bhk: '4 BHK Triplex', areaSqFt: 2800, imageUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80' }
    ],
    nearbyLandmarks: [
      { name: 'TCS IT Campus', type: 'Tech Park', distance: '1.2 km', driveTime: '3 mins' },
      { name: 'Indore International Airport', type: 'Airport', distance: '6.5 km', driveTime: '9 mins' },
      { name: 'Aurobindo Medical Hospital', type: 'Hospital', distance: '4.0 km', driveTime: '8 mins' }
    ],
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-02-05T12:00:00Z'
  },
  {
    id: 'prop-3',
    slug: 'the-apex-tower-grade-a-office-powai',
    title: 'The Apex Tower: Grade-A Commercial Floor, Powai',
    shortDescription: 'Warm shell IT/corporate office floor with 100% DG backup, LEED Gold pre-certification, and high-speed OTIS elevators.',
    fullDescription: 'Elevate your enterprise footprint in Mumbai’s prominent tech enclave. The Apex Tower in Powai provides corporate tenants with efficient, column-free floor plates designed for flexible workspace layouts. Boasting panoramic Powai lake perspectives, high-efficiency VRV air conditioning provision, and ample dedicated basement parking with smart RFID boom barriers.',
    intent: 'rent',
    category: 'commercial',
    propertyType: 'Office Space',
    price: 320000,
    priceDisplay: '₹3.20 Lakh / mo',
    pricePerSqFt: 88,
    areaSqFt: 3650,
    bathrooms: 4,
    furnishing: 'Semi-Furnished',
    availability: 'Immediate',
    possessionDate: 'Immediate',
    reraId: 'P51800029384',
    isFeatured: true,
    isVerified: true,
    isDemoData: true,
    city: 'Mumbai',
    locality: 'Powai',
    address: 'Central Avenue, Near Hiranandani Gardens, Powai, Mumbai 400076',
    coordinates: { lat: 19.1176, lng: 72.9060 },
    images: [
      { id: 'img-8', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80', isCover: true, caption: 'Column-free open corporate floor' },
      { id: 'img-9', url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80', isCover: false, caption: 'Executive boardroom overlooking green boulevard' },
      { id: 'img-10', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80', isCover: false, caption: 'Glass facade exterior with grand reception lobby' }
    ],
    amenities: [
      { category: 'Convenience', name: '100% DG Power Redundancy' },
      { category: 'Security', name: 'Turnstile Access Control & 24/7 Security' },
      { category: 'Lifestyle', name: 'Food Court & Cafeteria on 3rd Floor' },
      { category: 'Convenience', name: 'Multi-Level Car Parking (MLCP)' }
    ],
    specifications: {
      'Efficiency': '82% Carpet to Super Built-up Ratio',
      'HVAC': 'High COP VRV Air Conditioning compatible',
      'Floor to Ceiling': '3.9 Meters Clear Height',
      'Elevators': '6 High-speed Passenger Lifts + 2 Service Lifts'
    },
    nearbyLandmarks: [
      { name: 'IIT Bombay Main Gate', type: 'School', distance: '1.5 km', driveTime: '4 mins' },
      { name: 'Mumbai International Airport', type: 'Airport', distance: '7.8 km', driveTime: '18 mins' },
      { name: 'Western Express Highway', type: 'Transit', distance: '6.2 km', driveTime: '15 mins' }
    ],
    createdAt: '2025-01-25T10:00:00Z',
    updatedAt: '2025-02-10T12:00:00Z'
  },
  {
    id: 'prop-4',
    slug: 'serene-heights-2bhk-mulund-west',
    title: 'Serene Heights: Premium 2 BHK for Lease',
    shortDescription: 'Tastefully furnished 2 BHK flat with modular kitchen, Italian wardrobes, and walking distance to Mulund Station.',
    fullDescription: 'Perfect for professionals and families seeking a ready-to-move sanctuary in Mumbai. Serene Heights features a bright east-facing orientation ensuring glorious morning sunlight and continuous cross-ventilation. Verified ownership through 1Roof Realty with rapid Leave & License registration support.',
    intent: 'rent',
    category: 'residential',
    propertyType: 'Apartment',
    price: 58000,
    priceDisplay: '₹58,000 / mo',
    pricePerSqFt: 64,
    areaSqFt: 910,
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    furnishing: 'Furnished',
    availability: 'Immediate',
    possessionDate: 'Immediate',
    isFeatured: false,
    isVerified: true,
    isDemoData: true,
    city: 'Mumbai',
    locality: 'Mulund East',
    address: 'Near Mulund Gymkhana, Mulund East, Mumbai 400081',
    coordinates: { lat: 19.1710, lng: 72.9580 },
    images: [
      { id: 'img-11', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80', isCover: true, caption: 'Fully furnished living space' },
      { id: 'img-12', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80', isCover: false, caption: 'Equipped modular kitchen' }
    ],
    amenities: [
      { category: 'Security', name: 'Intercom & 24/7 Security' },
      { category: 'Lifestyle', name: 'Children\'s Play Park' },
      { category: 'Convenience', name: 'Dedicated Covered Car Parking' }
    ],
    specifications: {
      'Furnishing': 'Sofa set, 4-seater dining, Queen beds, refrigerator & microwave',
      'Air Conditioning': 'Daikin Inverter ACs in living and master bedroom'
    },
    nearbyLandmarks: [
      { name: 'Mulund Station', type: 'Transit', distance: '0.6 km', driveTime: '3 mins' }
    ],
    createdAt: '2025-02-01T10:00:00Z',
    updatedAt: '2025-02-14T12:00:00Z'
  },
  {
    id: 'prop-5',
    slug: 'the-grand-regency-penthouse-nipania-indore',
    title: 'The Grand Regency: 5 BHK Duplex Penthouse, Nipania',
    shortDescription: 'Breathtaking 4,500 sq.ft duplex penthouse featuring double-height lounge, private jacuzzi terrace, and sky garden.',
    fullDescription: 'Experience imperial living in Indore’s premier luxury corridor. Occupying the top two levels of The Grand Regency in Nipania, this penthouse commands 360-degree vistas of the city skyline. Custom Italian marble appointments, acoustic home theatre lounge, and direct elevator access into your private vestibule.',
    intent: 'buy',
    category: 'residential',
    propertyType: 'Penthouse',
    price: 36000000,
    priceDisplay: '₹3.60 Cr',
    pricePerSqFt: 8000,
    areaSqFt: 4500,
    bedrooms: 5,
    bathrooms: 6,
    balconies: 4,
    furnishing: 'Semi-Furnished',
    availability: 'Ready to Move',
    possessionDate: 'Ready',
    reraId: 'P-IND-22-3108',
    isFeatured: true,
    isVerified: true,
    isDemoData: true,
    city: 'Indore',
    locality: 'Nipania',
    address: 'Near Bombay Hospital, Nipania Main Road, Indore 452010',
    coordinates: { lat: 22.7540, lng: 75.9080 },
    images: [
      { id: 'img-13', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80', isCover: true, caption: 'Palatial penthouse salon with glass ceiling' },
      { id: 'img-14', url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80', isCover: false, caption: 'Private terrace garden with infinity jacuzzi' }
    ],
    amenities: [
      { category: 'Lifestyle', name: 'Private Rooftop Jacuzzi' },
      { category: 'Wellness', name: 'Private Gym & Spa Chamber' },
      { category: 'Security', name: 'Dedicated High-Speed Private Elevator' },
      { category: 'Convenience', name: '3 Covered Reserved Stilt Parkings' }
    ],
    specifications: {
      'Ceiling Height': '6.2 Meters in central foyer',
      'Smart Home': 'Control4 lighting and HVAC integration',
      'Kitchen': 'Poggenpohl cabinetry with Miele appliances'
    },
    nearbyLandmarks: [
      { name: 'Bombay Hospital', type: 'Hospital', distance: '1.4 km', driveTime: '4 mins' },
      { name: 'Phoenix Citadel Mall', type: 'Shopping', distance: '3.1 km', driveTime: '7 mins' }
    ],
    createdAt: '2025-02-05T10:00:00Z',
    updatedAt: '2025-02-15T12:00:00Z'
  },
  {
    id: 'prop-6',
    slug: 'prime-retail-promenade-tcs-square-indore',
    title: 'Prime High-Street Retail Showroom, TCS Square',
    shortDescription: 'High-visibility corner retail showroom facing the 8-lane Super Corridor with 40-foot wide frontage.',
    fullDescription: 'Positioned squarely at the TCS Square junction, this ground floor retail space enjoys unbeatable footfall from tech employees, residential commuters, and airport traffic. Ideal for bank branches, flagship brand outlets, or high-end dining bistros.',
    intent: 'buy',
    category: 'commercial',
    propertyType: 'Retail Shop',
    price: 14500000,
    priceDisplay: '₹1.45 Cr',
    pricePerSqFt: 10740,
    areaSqFt: 1350,
    bathrooms: 2,
    furnishing: 'Unfurnished',
    availability: 'Ready to Move',
    possessionDate: 'Ready',
    reraId: 'P-IND-24-5120',
    isFeatured: false,
    isVerified: true,
    isDemoData: true,
    city: 'Indore',
    locality: 'Super Corridor',
    address: 'Commercial Hub, TCS Square, Super Corridor, Indore 453112',
    coordinates: { lat: 22.7610, lng: 75.8360 },
    images: [
      { id: 'img-15', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80', isCover: true, caption: 'High street storefront with expansive glazing' }
    ],
    amenities: [
      { category: 'Convenience', name: 'Dedicated Customer Parking Plaza' },
      { category: 'Security', name: '24/7 Security with CCTV Perimeter' },
      { category: 'Convenience', name: 'Three-Phase 25kW Commercial Power' }
    ],
    specifications: {
      'Frontage': '40 Feet continuous road display',
      'Floor Height': '14 Feet clear height (mezzanine ready)'
    },
    nearbyLandmarks: [
      { name: 'TCS IT Campus', type: 'Tech Park', distance: '0.4 km', driveTime: '1 min' },
      { name: 'Indore Airport', type: 'Airport', distance: '5.2 km', driveTime: '7 mins' }
    ],
    createdAt: '2025-02-08T10:00:00Z',
    updatedAt: '2025-02-18T12:00:00Z'
  },
  {
    id: 'prop-7',
    slug: 'the-botanica-villa-plots-super-corridor-indore',
    title: 'The Botanica: Gated Residential Plot, Super Corridor',
    shortDescription: 'RERA and TNCP approved residential land parcel inside a landscaped luxury gated development with clubhouse.',
    fullDescription: 'Secure your slice of Central India’s fastest appreciating growth corridor. The Botanica offers demarcated, freehold villa plots with wide 40-foot internal asphalt roads, underground electrification, dedicated water connections, and an active community center. Clear title and bank loan approved by SBI & HDFC.',
    intent: 'buy',
    category: 'plots',
    propertyType: 'Residential Plot',
    price: 8200000,
    priceDisplay: '₹82 Lakh',
    pricePerSqFt: 4100,
    areaSqFt: 2000,
    furnishing: 'Unfurnished',
    availability: 'Immediate',
    possessionDate: 'Immediate',
    reraId: 'P-IND-23-4882',
    isFeatured: true,
    isVerified: true,
    isDemoData: true,
    city: 'Indore',
    locality: 'Super Corridor',
    address: 'Near Nainod, Super Corridor, Indore 453112',
    coordinates: { lat: 22.7680, lng: 75.8290 },
    images: [
      { id: 'img-16', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80', isCover: true, caption: 'Landscaped plots with paved tree-lined boulevards' }
    ],
    amenities: [
      { category: 'Convenience', name: 'Underground Electric Cabling' },
      { category: 'Eco-Friendly', name: 'Lush Botanical Theme Park' },
      { category: 'Security', name: 'Boundary Wall Gated Security' }
    ],
    specifications: {
      'Approval': 'Town & Country Planning (TNCP) + RERA',
      'Road Width': '40-foot main boulevard and 30-foot internal avenues'
    },
    nearbyLandmarks: [
      { name: 'Proposed Metro Station', type: 'Transit', distance: '1.0 km', driveTime: '2 mins' }
    ],
    createdAt: '2025-02-10T10:00:00Z',
    updatedAt: '2025-02-18T12:00:00Z'
  },
  {
    id: 'prop-8',
    slug: 'hiranandani-heritage-3bhk-powai',
    title: 'Heritage Gardens: Elegant 3 BHK, Powai',
    shortDescription: 'Exquisite lake-facing 3 BHK in classical neoclassical facade tower with marble lobby and Olympic sports club.',
    fullDescription: 'A classic address in the heart of Powai. Designed in timeless neoclassical architecture, this residence provides serene views of Powai lake and green hills. Features a grand entrance lobby, clubhouse access with squash courts, and seamless pedestrian access to high street cafes.',
    intent: 'buy',
    category: 'residential',
    propertyType: 'Apartment',
    price: 38500000,
    priceDisplay: '₹3.85 Cr',
    pricePerSqFt: 24838,
    areaSqFt: 1550,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    furnishing: 'Semi-Furnished',
    availability: 'Ready to Move',
    possessionDate: 'Ready',
    reraId: 'P51800001892',
    isFeatured: true,
    isVerified: true,
    isDemoData: true,
    city: 'Mumbai',
    locality: 'Powai',
    address: 'Near Galleria Shopping Mall, Powai, Mumbai 400076',
    coordinates: { lat: 19.1205, lng: 72.9090 },
    images: [
      { id: 'img-17', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80', isCover: true, caption: 'Neoclassical architectural exterior' },
      { id: 'img-18', url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80', isCover: false, caption: 'Sunlit living salon' }
    ],
    amenities: [
      { category: 'Wellness', name: 'Olympic-Sized Swimming Pool' },
      { category: 'Lifestyle', name: 'Squash & Badminton Courts' },
      { category: 'Security', name: 'Comprehensive Video Door Phone Security' }
    ],
    specifications: {
      'Flooring': 'Imported Marble throughout',
      'Bathrooms': 'Duravit and Hansgrohe fittings'
    },
    nearbyLandmarks: [
      { name: 'Galleria Mall', type: 'Shopping', distance: '0.3 km', driveTime: '2 mins' },
      { name: 'Powai Lake Promenade', type: 'Lifestyle', distance: '0.5 km', driveTime: '3 mins' }
    ],
    createdAt: '2025-02-12T10:00:00Z',
    updatedAt: '2025-02-19T12:00:00Z'
  }
];
