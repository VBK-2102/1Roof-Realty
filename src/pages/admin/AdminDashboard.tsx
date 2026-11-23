import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus
} from 'lucide-react';
import { DatabaseService } from '../../services/db';
import { Property, Enquiry, SiteVisitRequest, OwnerSubmission } from '../../types';
import { VERIFIED_BUSINESS } from '../../data/verifiedBusiness';

export const AdminDashboard: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [siteVisits, setSiteVisits] = useState<SiteVisitRequest[]>([]);
  const [submissions, setSubmissions] = useState<OwnerSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [p, e, v, s] = await Promise.all([
        DatabaseService.getProperties(),
        DatabaseService.getEnquiries(),
        DatabaseService.getSiteVisits(),
        DatabaseService.getOwnerSubmissions()
      ]);
      setProperties(p);
      setEnquiries(e);
      setSiteVisits(v);
      setSubmissions(s);
      setLoading(false);
    }
    loadData();
  }, []);

  const totalProperties = properties.length;
  const activeListings = properties.filter(p => p.availability !== 'Sold' && p.availability !== 'Rented').length;
  const buyListings = properties.filter(p => p.intent === 'buy').length;
  const rentListings = properties.filter(p => p.intent === 'rent').length;
  const totalEnquiries = enquiries.length;
  const pendingVisits = siteVisits.filter(v => v.status === 'pending').length;

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#B54D35] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#963D2C]"></span>
            <span>Entity: {VERIFIED_BUSINESS.legalName} ({VERIFIED_BUSINESS.llpin})</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#211613] tracking-tight">
            Executive Operations Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/properties"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#963D2C] text-white hover:bg-[#7A2514] text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 text-[#FFB088]" />
            <span>Add New Property</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="p-5 rounded-3xl bg-white border border-[#ECDCD5] shadow-sm space-y-1">
          <span className="text-[10px] font-mono text-[#B54D35] uppercase block">Total Properties</span>
          <span className="text-2xl font-mono font-bold text-[#211613]">{totalProperties}</span>
          <span className="text-[10px] text-[#5C4944] block">In Database</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#ECDCD5] shadow-sm space-y-1">
          <span className="text-[10px] font-mono text-[#B54D35] uppercase block">Active Listings</span>
          <span className="text-2xl font-mono font-bold text-[#963D2C]">{activeListings}</span>
          <span className="text-[10px] text-[#5C4944] block">Available to browse</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#ECDCD5] shadow-sm space-y-1">
          <span className="text-[10px] font-mono text-[#B54D35] uppercase block">For Sale / Buy</span>
          <span className="text-2xl font-mono font-bold text-[#211613]">{buyListings}</span>
          <span className="text-[10px] text-[#5C4944] block">Capital sales</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#ECDCD5] shadow-sm space-y-1">
          <span className="text-[10px] font-mono text-[#B54D35] uppercase block">For Lease / Rent</span>
          <span className="text-2xl font-mono font-bold text-[#211613]">{rentListings}</span>
          <span className="text-[10px] text-[#5C4944] block">Rental flats/offices</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#ECDCD5] shadow-sm space-y-1">
          <span className="text-[10px] font-mono text-[#B54D35] uppercase block">Total Enquiries</span>
          <span className="text-2xl font-mono font-bold text-[#963D2C]">{totalEnquiries}</span>
          <span className="text-[10px] text-[#5C4944] block">Inward leads</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#ECDCD5] shadow-sm space-y-1">
          <span className="text-[10px] font-mono text-[#B54D35] uppercase block">Pending Visits</span>
          <span className="text-2xl font-mono font-bold text-amber-700">{pendingVisits}</span>
          <span className="text-[10px] text-[#5C4944] block">Awaiting confirmation</span>
        </div>

      </div>

      {/* Main Overview Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Inward Enquiries */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-[36px] bg-white border border-[#ECDCD5] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#FBECE7] pb-4">
            <div>
              <h2 className="text-base font-bold text-[#211613]">Recent Inward Enquiries</h2>
              <p className="text-xs text-[#5C4944]">Direct client inquiries from property pages & CTAs</p>
            </div>
            <Link to="/admin/enquiries" className="text-xs font-mono font-bold text-[#963D2C] hover:underline">
              View All CRM &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {enquiries.slice(0, 4).map((enq) => (
              <div key={enq.id} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#ECDCD5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-[#211613] font-bold">{enq.fullName}</strong>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      enq.status === 'new' ? 'bg-[#FBECE7] text-[#963D2C] border border-[#ECDCD5]' : 'bg-[#963D2C] text-white'
                    }`}>
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-[#5C4944] text-[11px] font-medium">{enq.propertyTitle}</p>
                  <p className="text-[#5C4944] text-[11px] line-clamp-1 italic">"{enq.message}"</p>
                </div>

                <div className="text-right sm:shrink-0 font-mono text-[11px]">
                  <span className="text-[#963D2C] font-bold block">{enq.phone}</span>
                  <span className="text-[#B54D35] text-[10px]">{new Date(enq.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Site Visits & Submissions Queue */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Site Visits */}
          <div className="p-6 rounded-[36px] bg-white border border-[#ECDCD5] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#FBECE7] pb-3">
              <h3 className="text-sm font-bold text-[#211613]">Upcoming Site Visits</h3>
              <Link to="/admin/site-visits" className="text-xs font-mono text-[#963D2C] hover:underline">
                Manage ({siteVisits.length})
              </Link>
            </div>

            <div className="space-y-2.5">
              {siteVisits.slice(0, 3).map((visit) => (
                <div key={visit.id} className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#ECDCD5] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-[#211613]">{visit.customerName}</strong>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono ${
                      visit.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {visit.status}
                    </span>
                  </div>
                  <p className="text-[#5C4944] text-[11px] line-clamp-1">{visit.propertyTitle}</p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#B54D35] pt-1">
                    <span>{visit.preferredDate} ({visit.preferredTimeSlot.split(' ')[0]})</span>
                    <span>{visit.customerPhone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Owner Submissions Queue */}
          <div className="p-6 rounded-[36px] bg-white border border-[#ECDCD5] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#FBECE7] pb-3">
              <h3 className="text-sm font-bold text-[#211613]">Owner Property Submissions</h3>
              <Link to="/admin/submissions" className="text-xs font-mono text-[#963D2C] hover:underline">
                Review ({submissions.length})
              </Link>
            </div>

            <div className="space-y-2.5">
              {submissions.slice(0, 2).map((sub) => (
                <div key={sub.id} className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#ECDCD5] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-[#211613]">{sub.ownerName}</strong>
                    <span className="font-mono font-bold text-[#963D2C]">{sub.expectedPriceDisplay}</span>
                  </div>
                  <p className="text-[#5C4944] text-[11px]">{sub.propertyType} &bull; {sub.locality}, {sub.city}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
