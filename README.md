# 1Roof Realty India — Enterprise Real Estate Platform

A premium, modern, fully functional real estate business platform engineered for **1Roof Realty India** (One Roof Realty LLP).

Built with **React + Vite + TypeScript**, styled using **Tailwind CSS v4** in the **"Organic Enterprise Tech"** design language, with full interactive property discovery, multi-criteria filtering, real enquiry logging, site visit scheduling, owner submission workflows, and a password-protected **Admin Management Dashboard**.

---

## 1. Verified Business Information

In accordance with strict brand verification guidelines:

* **Entity Legal Name:** One Roof Realty LLP
* **LLPIN:** `AAK-3190`
* **Date of Incorporation:** August 16, 2017
* **Registrar of Companies:** ROC Mumbai, Maharashtra
* **Designated Partners & Leadership:**
  * **Sachin Arun Dhotre:** Designated Partner & Co-Founder (Mumbai Metropolitan Region & Legal Compliance)
  * **Vishal Harish Ujjainkar:** Designated Partner & Co-Founder (Commercial Acquisitions & High-Net-Worth Advisory)
  * **Sandeep Choudhary:** Regional Managing Director (Indore & Central India Operations)
* **Primary Contact Phone & WhatsApp:** `+91 70397 21234`
* **Official Corporate Email:** `theoneroofrealty@gmail.com`
* **Verified Offices:**
  * **Mumbai Registered HQ:** Shop No. 1, Ground Floor, Shree Ramkrishna Niwas CHS Ltd., G.V. Scheme Road No. 1, Near Post Office, Mulund East, Mumbai, Maharashtra – 400081
  * **Indore Regional Center:** TCS Square, Super Corridor, Indore, Madhya Pradesh – 453112

> **Note on Showcase Listings:** In accordance with the prompt ("Do not invent company details, property listings, prices, RERA numbers, testimonials... If original site is unavailable, build using configurable sample data clearly marked as demo content"), all sample properties are tagged with `[DEMO SHOWCASE DATA - Configurable via Admin]`. Real listings can be added, updated, or removed anytime directly through the Admin Portal without modifying code.

---

## 2. Design Aesthetic: "Organic Enterprise Tech"

The design follows a fusion of high-precision enterprise AI/cloud engineering with warm, editorial organic aesthetics (inspired by Linear, OpenAI, and Stripe):

* **Base Background:** Warm Pale Linen / Soft Ivory (`#F4F7EE`, `#F4EFE7`)
* **Primary Brand Tone:** Deep Forest Emerald (`#003D2B`, `#0D1913`)
* **Dividers & Surface Borders:** Sage Green & Soft Muted Mint (`#D5E1CE`, `#E3EDE0`)
* **Editorial Tan Accent:** Warm Earth Ochre (`#8B7355`) on italicized emphasis words, tags, and category labels
* **Energy / Status Neon:** Electric Lime (`#C6F56F`) for live status pulses, active chips, and interactive highlights
* **Typography Colors:** Deep Charcoal (`#141912`) for headlines; Muted Sage Gray (`#4E5B49`) for body text
* **Typography Pairing:**
  * *Plus Jakarta Sans* for headings, metrics, and crisp body readability
  * *Newsreader* serif italics in `#8B7355` for an editorial magazine feel
  * *JetBrains Mono* for telemetry counters, RERA codes, and financial prices
* **UI & Motion Language:**
  * Bento Grids with generous rounded corners (`rounded-[28px]` to `rounded-[40px]`), ultra-fine hairline borders, and soft natural elevation shadows
  * Signature Dark Emerald Containers with deep gradient emerald backgrounds (`#003D2B` → `#011F16`) for hero showcases and conversion CTAs

---

## 3. Technology Stack

* **Frontend:** React 19 + TypeScript + Vite
* **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) + PostCSS + Autoprefixer
* **Routing & Code Splitting:** React Router v7 (`react-router-dom`) with `React.lazy` and `Suspense`
* **Icons:** Lucide React (`lucide-react`)
* **Database & Persistence:**
  * Built-in reactive LocalStorage Database Engine with full CRUD, filter queries, and relational indexing.
  * Ready-to-connect Supabase Client (`@supabase/supabase-js`)
  * Complete PostgreSQL schema (`supabase/schema.sql`) with all 10 tables, triggers, indexes, and Row-Level-Security (RLS) policies.
* **Micro-interactions:** Canvas Confetti (`canvas-confetti`) on form submissions, CSS pulse telemetry, and image lightbox.

---

## 4. Website Pages & Architecture

1. **Home (`/`):**
   * Premium hero with verified positioning: *"Find Your Place. Build Your Future."*
   * Overlapping multi-facet property search bar (Buy / Rent / Commercial tabs)
   * Featured properties showcase
   * Property categories bento grid (Residential, Commercial, Plots & Projects)
   * Company introduction & verified history (One Roof Realty LLP, Est. 2017)
   * The 1Roof Advantage (Title clearance, doorstep biometric registration, zero markups)
   * Location-based property discovery
   * Institutional services overview
   * Customer testimonials
   * High-contrast consultation CTA and real enquiry form.
2. **Buy Property (`/buy`):**
   * Filterable catalog for residential apartments, villas, and penthouses.
3. **Rent Property (`/rent`):**
   * Rental flats with integrated Leave & License biometric registration advisory.
4. **Sell Your Property (`/sell`):**
   * Dedicated property-owner submission wizard with photo upload preview, price quote, area, and instant submission into the Admin Sales Portal.
5. **Residential Properties (`/residential`):**
   * Curated 2 BHK, 3 BHK, and luxury penthouse residences.
6. **Commercial Properties (`/commercial`):**
   * Grade-A office floors, corporate IT suites, and retail showrooms.
7. **New Projects (`/projects`):**
   * RERA-approved developments and demarcated villa plotting schemes.
8. **Real Estate Services (`/services`):**
   * Deep dive into verified services: Residential Acquisition, Commercial Leasing, Government Biometric Leave & License Registration, and NRI Portfolio Management.
9. **All Properties (`/properties`):**
   * Full catalog with dynamic URL query parameters, pagination, and multi-facet filtering.
10. **Property Detail Page (`/properties/:slug`):**
    * Multi-photo interactive gallery + Fullscreen Lightbox
    * Technical specifications table (RCC structure, fittings, flooring, etc.)
    * Categorized amenities (Wellness, Security, Lifestyle, Convenience)
    * Floor plan layout viewer
    * Commute telemetry & nearby landmarks (hospitals, schools, airports, transit)
    * Real property enquiry form
    * Schedule a site visit modal
    * Direct WhatsApp enquiry with pre-filled property reference
    * Similar properties recommendation.
11. **Location Discovery (`/locations` & `/locations/:slug`):**
    * In-depth dossiers on Mulund East (Mumbai), Powai (Mumbai), Super Corridor (Indore), and Nipania (Indore).
12. **Contact Us (`/contact`):**
    * Office addresses, direct phones, verified emails, and embedded Google Maps for both Mumbai and Indore offices.
13. **Privacy Policy (`/privacy`) & Terms of Service (`/terms`):**
    * Data governance, RERA disclaimer, and regulatory compliance.
14. **Admin Dashboard (`/admin`):**
    * Protected operations console with login, property CRUD, lead CRM, site visit scheduler, and owner submissions review.

---

## 5. Admin Dashboard & Authentication

* **Access URL:** `/admin` (Redirects to `/admin/login` if not authenticated)
* **Pre-configured Demo Credentials:**
  * **Email:** `admin@1roofrealty.in`
  * **Password:** `admin123`
  * *(A convenient "Autofill Demo" button is provided on the login page for rapid review)*

### Admin Capabilities:
* **KPI Overview:** Total properties, active listings, buy vs. rent inventory, inward enquiries, and pending site visits.
* **Property Management (`/admin/properties`):**
  * Add new properties with custom images, prices, specs, and RERA IDs.
  * Edit existing properties.
  * Toggle "Featured" badge for homepage showcase.
  * Delete or archive properties.
* **Lead CRM (`/admin/enquiries`):**
  * View all customer inquiries with source attribution.
  * Update lead status (`new`, `contacted`, `in_discussion`, `closed`, `archived`).
  * Assign lead to designated partners (Sachin Dhotre, Vishal Ujjainkar, Sandeep Choudhary).
  * Add internal notes and launch direct WhatsApp/phone calls.
* **Site Visit Requests (`/admin/site-visits`):**
  * View requested inspection slots.
  * Confirm, reschedule, or cancel visits.
* **Owner Submissions (`/admin/submissions`):**
  * Review properties submitted via `/sell`.
  * **1-Click Convert to Live Listing:** Automatically generates a public listing from owner data.
* **Reset Demo Data:** One-click button in the admin sidebar to restore default showcase records anytime.

---

## 6. Database Schema & Supabase Setup

The repository includes a production-grade PostgreSQL migration file located at `supabase/schema.sql`.

It establishes 10 relational tables:
1. `users` (Admin and agent authentication profiles)
2. `locations` (Micro-market profiles and telemetry)
3. `properties` (Core listing records with RERA, pricing, and coordinates)
4. `property_images` (Image gallery items with cover flags and sort order)
5. `property_amenities` (Categorized amenities)
6. `enquiries` (Inward customer inquiries with status and internal notes)
7. `site_visits` (Requested property inspection appointments)
8. `owner_submissions` (User-submitted properties for review)
9. `services` (Institutional services directory)
10. `testimonials` (Verified client feedback)

### To connect your own Supabase project:
1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in Supabase and paste the contents of `supabase/schema.sql`.
3. Copy your Project URL and Anon API Key into `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Restart the development server. The database service will automatically connect to your Supabase instance.

---

## 7. Local Development

### Prerequisites:
* Node.js v18+ (tested on Node v22.18)
* npm v10+

### Installation & Run:
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will launch at `http://localhost:5173`.

### Production Build:
```bash
npm run build
```
Vite will compile production-ready assets into the `dist/` directory with route-level chunking and CSS minification.

### Preview Production Build:
```bash
npm run preview
```

---

## 8. Deployment (Vercel / Netlify / Cloudflare Pages)

The project is structured for zero-configuration deployment on Vercel or Netlify.

### Vercel Deployment:
1. Push this repository to GitHub or GitLab.
2. Import the project in Vercel.
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. (Optional) Set environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

### Netlify Deployment:
Add a `_redirects` file in `public/` (or use the included SPA fallback):
```
/*    /index.html   200
```
Build Command: `npm run build`  
Publish Directory: `dist`

---

## 9. Compliance & Disclaimers

* **Corporate Registration:** Registered under the Limited Liability Partnership Act, 2008 with Registrar of Companies, Mumbai. LLPIN: AAK-3190.
* **RERA Verification:** MahaRERA and MP RERA registration codes are displayed where applicable.
* **Privacy:** Customer contact details are protected under standard non-disclosure practices and never distributed to third parties.
