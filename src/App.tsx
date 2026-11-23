import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';

// Route-level code splitting with React.lazy
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const BuyPage = lazy(() => import('./pages/BuyPage').then(m => ({ default: m.BuyPage })));
const RentPage = lazy(() => import('./pages/RentPage').then(m => ({ default: m.RentPage })));
const SellPage = lazy(() => import('./pages/SellPage').then(m => ({ default: m.SellPage })));
const ResidentialPage = lazy(() => import('./pages/ResidentialPage').then(m => ({ default: m.ResidentialPage })));
const CommercialPage = lazy(() => import('./pages/CommercialPage').then(m => ({ default: m.CommercialPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const PropertiesPage = lazy(() => import('./pages/PropertiesPage').then(m => ({ default: m.PropertiesPage })));
const PropertyDetailPage = lazy(() => import('./pages/PropertyDetailPage').then(m => ({ default: m.PropertyDetailPage })));
const LocationsPage = lazy(() => import('./pages/LocationsPage').then(m => ({ default: m.LocationsPage })));
const LocationDetailPage = lazy(() => import('./pages/LocationDetailPage').then(m => ({ default: m.LocationDetailPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));

// Admin Pages
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminPropertiesPage = lazy(() => import('./pages/admin/AdminPropertiesPage').then(m => ({ default: m.AdminPropertiesPage })));
const AdminEnquiriesPage = lazy(() => import('./pages/admin/AdminEnquiriesPage').then(m => ({ default: m.AdminEnquiriesPage })));
const AdminSiteVisitsPage = lazy(() => import('./pages/admin/AdminSiteVisitsPage').then(m => ({ default: m.AdminSiteVisitsPage })));
const AdminSubmissionsPage = lazy(() => import('./pages/admin/AdminSubmissionsPage').then(m => ({ default: m.AdminSubmissionsPage })));

// Loading Spinner Fallback with Brick Styling
const PageFallback: React.FC = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="flex items-center gap-2 font-mono text-xs text-[#963D2C]">
      <span className="w-2.5 h-2.5 rounded-full bg-[#963D2C] animate-ping"></span>
      <span>Loading 1Roof Realty...</span>
    </div>
  </div>
);

// Public Shell Layout with Continuous Architectural Grid Background & Gradients
const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-grid-architectural text-[#211613] font-sans antialiased">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export function App() {
  return (
    <Router>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/:slug" element={<PropertyDetailPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Alias / Auxiliary routes */}
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/rent" element={<RentPage />} />
            <Route path="/residential" element={<ResidentialPage />} />
            <Route path="/commercial" element={<CommercialPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/locations/:slug" element={<LocationDetailPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Route>

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Secure Admin Portal Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="properties" element={<AdminPropertiesPage />} />
            <Route path="enquiries" element={<AdminEnquiriesPage />} />
            <Route path="site-visits" element={<AdminSiteVisitsPage />} />
            <Route path="submissions" element={<AdminSubmissionsPage />} />
          </Route>

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-[#FAF7F2] bg-grid-architectural flex items-center justify-center p-6 text-center">
                <div className="max-w-md space-y-4 bg-white p-8 rounded-3xl border border-[#ECDCD5] shadow-xl">
                  <span className="text-4xl font-mono font-bold text-[#963D2C]">404</span>
                  <h1 className="text-xl font-bold text-[#211613]">Page Not Found</h1>
                  <p className="text-xs text-[#5C4944]">The requested destination does not exist or has been relocated.</p>
                  <a
                    href="/"
                    className="inline-block px-6 py-2.5 rounded-full bg-[#963D2C] text-white text-xs font-semibold hover:bg-[#7A2514]"
                  >
                    Return to Home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
