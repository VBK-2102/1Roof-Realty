import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Search, 
  Phone, 
  Mail, 
  MessageSquare, 
  CheckCircle, 
  UserPlus, 
  Edit3, 
  Clock,
  Filter
} from 'lucide-react';
import { DatabaseService } from '../../services/db';
import { Enquiry, EnquiryStatus } from '../../types';
import { VERIFIED_BUSINESS } from '../../data/verifiedBusiness';

export const AdminEnquiriesPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Notes editing state
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [salesDraft, setSalesDraft] = useState('');

  useEffect(() => {
    loadEnquiries();
  }, []);

  async function loadEnquiries() {
    setLoading(true);
    const data = await DatabaseService.getEnquiries();
    setEnquiries(data);
    setLoading(false);
  }

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    await DatabaseService.updateEnquiryStatus(id, newStatus);
    loadEnquiries();
  };

  const handleOpenNotes = (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    setNotesDraft(enq.internalNotes || '');
    setSalesDraft(enq.assignedSalesperson || 'Sachin Dhotre');
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    await DatabaseService.updateEnquiryStatus(
      selectedEnquiry.id, 
      selectedEnquiry.status, 
      notesDraft, 
      salesDraft
    );
    setSelectedEnquiry(null);
    loadEnquiries();
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    const matchesSearch = e.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.includes(searchQuery) ||
      (e.propertyTitle && e.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#141912]">Client Enquiries & Lead CRM</h1>
          <p className="text-xs text-[#4E5B49]">Track customer inquiries, assign sales partners, and record internal notes</p>
        </div>

        <span className="font-mono text-xs text-[#963D2C] bg-[#FBECE7] px-3.5 py-1.5 rounded-full border border-[#F1D6CE] self-start sm:self-auto">
          {enquiries.length} Total Enquiries Logged
        </span>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 rounded-3xl bg-white border border-[#D5E1CE] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8B7355] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, phone or property..."
            className="w-full text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl pl-10 pr-4 py-2 text-[#141912] focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl px-3 py-2 text-[#141912] focus:bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="new">New Inward</option>
            <option value="contacted">Contacted</option>
            <option value="in_discussion">In Discussion</option>
            <option value="closed">Closed Deal</option>
            <option value="archived">Archived</option>
          </select>

          <span className="text-xs font-mono text-[#4E5B49] shrink-0">
            {filteredEnquiries.length} records
          </span>
        </div>
      </div>

      {/* Enquiry Cards List */}
      <div className="space-y-4">
        {filteredEnquiries.map((enq) => (
          <div
            key={enq.id}
            className="p-6 rounded-[32px] bg-white border border-[#D5E1CE] hover:shadow-md transition-shadow space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E3EDE0] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#963D2C] text-[#FFB088] font-bold text-sm flex items-center justify-center font-mono">
                  {enq.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#141912]">{enq.fullName}</h3>
                  <span className="text-[10px] font-mono text-[#4E5B49]">
                    Inquired on: {new Date(enq.createdAt).toLocaleString()} &bull; Ref: {enq.id}
                  </span>
                </div>
              </div>

              {/* Status Selector & Salesperson Pill */}
              <div className="flex items-center gap-2">
                {enq.assignedSalesperson && (
                  <span className="px-2.5 py-1 rounded-full bg-[#FBECE7] text-[#963D2C] border border-[#F1D6CE] text-[10px] font-mono">
                    Assigned: {enq.assignedSalesperson}
                  </span>
                )}

                <select
                  value={enq.status}
                  onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                  className={`text-xs font-mono font-bold rounded-full px-3 py-1 border transition-colors ${
                    enq.status === 'new'
                      ? 'bg-[#FFB088] text-[#3D1007] border-[#963D2C]'
                      : enq.status === 'contacted'
                      ? 'bg-blue-100 text-blue-800 border-blue-300'
                      : enq.status === 'in_discussion'
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-green-100 text-green-800 border-green-300'
                  }`}
                >
                  <option value="new">Status: New</option>
                  <option value="contacted">Status: Contacted</option>
                  <option value="in_discussion">Status: In Discussion</option>
                  <option value="closed">Status: Closed</option>
                  <option value="archived">Status: Archived</option>
                </select>
              </div>
            </div>

            {/* Inquired Target & Message */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
              <div className="md:col-span-8 space-y-2">
                <div className="text-[11px] font-mono text-[#8B7355] font-semibold">
                  Property Interested: <strong className="text-[#963D2C]">{enq.propertyTitle || 'General Inward Enquiry'}</strong>
                  {enq.budgetRange && <span className="ml-2 text-[#4E5B49]">&bull; Budget: {enq.budgetRange}</span>}
                </div>

                <p className="p-3.5 rounded-2xl bg-[#F4F7EE] text-[#141912] leading-relaxed italic">
                  "{enq.message}"
                </p>

                {enq.internalNotes && (
                  <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-[11px]">
                    <strong className="font-mono uppercase text-[10px] block text-amber-800">Internal Sales Notes:</strong>
                    {enq.internalNotes}
                  </div>
                )}
              </div>

              {/* Direct Actions & Contact Info */}
              <div className="md:col-span-4 flex flex-col justify-between space-y-3 pt-2 md:pt-0 md:border-l md:border-[#E3EDE0] md:pl-4">
                <div className="space-y-1.5 font-mono text-xs">
                  <a href={`tel:${enq.phone}`} className="flex items-center gap-2 text-[#963D2C] font-bold hover:underline">
                    <Phone className="w-3.5 h-3.5 text-[#8B7355]" />
                    <span>{enq.phone}</span>
                  </a>
                  <a href={`mailto:${enq.email}`} className="flex items-center gap-2 text-[#4E5B49] hover:underline truncate">
                    <Mail className="w-3.5 h-3.5 text-[#8B7355]" />
                    <span className="truncate">{enq.email}</span>
                  </a>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      const msg = `Hello ${enq.fullName}, this is from 1Roof Realty regarding your enquiry for ${enq.propertyTitle || 'properties in Mumbai / Indore'}.`;
                      window.open(`https://wa.me/${enq.phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    className="flex-1 py-2 rounded-xl bg-[#963D2C] text-white text-[11px] font-semibold hover:bg-[#7A2514] flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#FFB088]" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => handleOpenNotes(enq)}
                    className="p-2 rounded-xl border border-[#D5E1CE] hover:bg-[#F4F7EE] text-[#963D2C]"
                    title="Add Internal Notes / Assign Consultant"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Internal Notes / Assignment Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-[#3D1007]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-md w-full p-6 shadow-2xl border border-[#D5E1CE] space-y-4">
            <h3 className="text-base font-bold text-[#141912]">
              CRM Notes for {selectedEnquiry.fullName}
            </h3>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[#4E5B49]">Assign Lead Consultant</label>
              <select
                value={salesDraft}
                onChange={(e) => setSalesDraft(e.target.value)}
                className="w-full text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl px-3 py-2"
              >
                <option value="Sachin Dhotre">Sachin Dhotre (Mulund & Eastern Suburbs)</option>
                <option value="Vishal Ujjainkar">Vishal Ujjainkar (Commercial & HNI)</option>
                <option value="Sandeep Choudhary">Sandeep Choudhary (Indore Regional)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[#4E5B49]">Internal CRM Notes</label>
              <textarea
                rows={4}
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                placeholder="Log discussion notes, preferred visit timings, loan eligibility..."
                className="w-full text-xs bg-[#F4F7EE] border border-[#D5E1CE] rounded-2xl p-3 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 rounded-full border border-[#D5E1CE] text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-5 py-2 rounded-full bg-[#963D2C] text-white text-xs font-bold hover:bg-[#7A2514]"
              >
                Save to CRM
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
