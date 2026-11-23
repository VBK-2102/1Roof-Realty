import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCw, 
  Phone, 
  Mail, 
  MapPin,
  Search,
  AlertCircle
} from 'lucide-react';
import { DatabaseService } from '../../services/db';
import { SiteVisitRequest, VisitStatus } from '../../types';

export const AdminSiteVisitsPage: React.FC = () => {
  const [visits, setSiteVisits] = useState<SiteVisitRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVisits();
  }, []);

  async function loadVisits() {
    setLoading(true);
    const data = await DatabaseService.getSiteVisits();
    setSiteVisits(data);
    setLoading(false);
  }

  const handleUpdateStatus = async (id: string, newStatus: VisitStatus) => {
    await DatabaseService.updateSiteVisitStatus(id, newStatus);
    loadVisits();
  };

  const filteredVisits = visits.filter(v => statusFilter === 'All' || v.status === statusFilter);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#141912]">Site Visit Scheduling Desk</h1>
          <p className="text-xs text-[#4E5B49]">Manage private guided property inspections requested by clients</p>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs bg-white border border-[#D5E1CE] rounded-2xl px-3.5 py-2 text-[#141912] shadow-sm self-start sm:self-auto"
        >
          <option value="All">All Visit Requests</option>
          <option value="pending">Pending Confirmation</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Visits List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredVisits.map((visit) => (
          <div
            key={visit.id}
            className="p-6 rounded-[32px] bg-white border border-[#D5E1CE] shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                  visit.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800'
                    : visit.status === 'pending'
                    ? 'bg-amber-100 text-amber-800'
                    : visit.status === 'completed'
                    ? 'bg-[#963D2C] text-white'
                    : 'bg-red-100 text-red-800'
                }`}>
                  Status: {visit.status}
                </span>

                <span className="text-[10px] font-mono text-[#8B7355]">
                  Ref: {visit.id}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#141912]">{visit.customerName}</h3>
                <p className="text-xs font-medium text-[#963D2C]">{visit.propertyTitle} ({visit.propertyCity})</p>
              </div>

              {/* Slot Details */}
              <div className="p-3.5 rounded-2xl bg-[#F4F7EE] border border-[#D5E1CE] grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#963D2C]" />
                  <span>{visit.preferredDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#963D2C]" />
                  <span>{visit.preferredTimeSlot}</span>
                </div>
              </div>

              {visit.additionalNotes && (
                <p className="text-xs text-[#4E5B49] italic">
                  Note: "{visit.additionalNotes}"
                </p>
              )}

              {/* Contact info */}
              <div className="pt-2 flex items-center justify-between text-xs font-mono">
                <a href={`tel:${visit.customerPhone}`} className="text-[#963D2C] font-bold hover:underline flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  <span>{visit.customerPhone}</span>
                </a>
                <a href={`mailto:${visit.customerEmail}`} className="text-[#4E5B49] hover:underline truncate max-w-[150px]">
                  {visit.customerEmail}
                </a>
              </div>
            </div>

            {/* Status Change Buttons */}
            <div className="pt-4 border-t border-[#E3EDE0] flex items-center gap-2">
              {visit.status !== 'confirmed' && (
                <button
                  onClick={() => handleUpdateStatus(visit.id, 'confirmed')}
                  className="flex-1 py-2 rounded-xl bg-[#963D2C] text-white text-[11px] font-semibold hover:bg-[#7A2514]"
                >
                  Confirm Visit
                </button>
              )}

              {visit.status !== 'completed' && (
                <button
                  onClick={() => handleUpdateStatus(visit.id, 'completed')}
                  className="flex-1 py-2 rounded-xl bg-[#FBECE7] text-[#963D2C] text-[11px] font-semibold hover:bg-[#F1D6CE]"
                >
                  Mark Completed
                </button>
              )}

              {visit.status !== 'cancelled' && (
                <button
                  onClick={() => handleUpdateStatus(visit.id, 'cancelled')}
                  className="px-3 py-2 rounded-xl border border-red-200 text-red-600 text-[11px] font-semibold hover:bg-red-50"
                >
                  Cancel
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
