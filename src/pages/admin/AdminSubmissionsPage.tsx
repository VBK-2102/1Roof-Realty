import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Maximize2,
  Sparkles
} from 'lucide-react';
import { DatabaseService } from '../../services/db';
import { OwnerSubmission, SubmissionStatus } from '../../types';

export const AdminSubmissionsPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<OwnerSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [convertingId, setConvertingId] = useState<string | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  async function loadSubmissions() {
    setLoading(true);
    const data = await DatabaseService.getOwnerSubmissions();
    setSubmissions(data);
    setLoading(false);
  }

  const handleUpdateStatus = async (id: string, newStatus: SubmissionStatus) => {
    await DatabaseService.updateSubmissionStatus(id, newStatus);
    loadSubmissions();
  };

  const handleConvertToListing = async (id: string) => {
    setConvertingId(id);
    const created = await DatabaseService.convertSubmissionToListing(id);
    setConvertingId(null);
    if (created) {
      alert(`Property successfully converted into live listing: "${created.title}"!`);
      loadSubmissions();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#141912]">Owner Property Submissions</h1>
          <p className="text-xs text-[#4E5B49]">Review properties submitted for sale or lease by verified owners</p>
        </div>

        <span className="font-mono text-xs text-[#963D2C] bg-[#FBECE7] px-3.5 py-1.5 rounded-full border border-[#F1D6CE] self-start sm:self-auto">
          {submissions.length} Submissions
        </span>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.map((sub) => (
          <div
            key={sub.id}
            className="p-6 rounded-[32px] bg-white border border-[#D5E1CE] shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E3EDE0] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#141912]">{sub.ownerName}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    sub.status === 'converted'
                      ? 'bg-green-100 text-green-800'
                      : sub.status === 'pending'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {sub.status}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#8B7355]">
                  Submitted on: {new Date(sub.createdAt).toLocaleDateString()} &bull; Ref: {sub.id}
                </span>
              </div>

              <div className="text-right font-mono">
                <span className="text-[10px] text-[#8B7355] block">Expected Quote</span>
                <span className="text-lg font-bold text-[#963D2C]">{sub.expectedPriceDisplay}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Photo Previews */}
              <div className="md:col-span-3">
                {sub.imageUrls && sub.imageUrls.length > 0 ? (
                  <img
                    src={sub.imageUrls[0]}
                    alt="Owner property"
                    className="w-full h-36 object-cover rounded-2xl border border-[#D5E1CE]"
                  />
                ) : (
                  <div className="w-full h-36 rounded-2xl bg-[#F4F7EE] border border-[#D5E1CE] flex items-center justify-center text-xs text-[#8B7355]">
                    No photos attached
                  </div>
                )}
              </div>

              {/* Details & Specs */}
              <div className="md:col-span-6 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[#963D2C]">
                  <MapPin className="w-3.5 h-3.5 text-[#8B7355]" />
                  <span>{sub.propertyLocation}, {sub.city}</span>
                </div>

                <div className="flex items-center gap-3 font-mono text-[#4E5B49] text-[11px]">
                  <span>Type: <strong className="text-[#141912]">{sub.propertyType}</strong></span>
                  <span>&bull;</span>
                  <span>Intent: <strong className="text-[#141912] uppercase">{sub.intent}</strong></span>
                  <span>&bull;</span>
                  <span>Area: <strong className="text-[#141912]">{sub.areaSqFt} sq.ft</strong></span>
                </div>

                <p className="text-[#4E5B49] leading-relaxed pt-1">
                  "{sub.description}"
                </p>

                {sub.notes && (
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900 text-[11px] font-mono">
                    Admin note: {sub.notes}
                  </div>
                )}
              </div>

              {/* Contact & Convert Actions */}
              <div className="md:col-span-3 flex flex-col justify-between space-y-3 md:border-l md:border-[#E3EDE0] md:pl-4">
                <div className="space-y-1 font-mono text-xs">
                  <a href={`tel:${sub.ownerPhone}`} className="text-[#963D2C] font-bold block hover:underline">
                    {sub.ownerPhone}
                  </a>
                  <a href={`mailto:${sub.ownerEmail}`} className="text-[#4E5B49] block truncate hover:underline text-[11px]">
                    {sub.ownerEmail}
                  </a>
                </div>

                <div className="space-y-2 pt-2">
                  {sub.status !== 'converted' ? (
                    <button
                      onClick={() => handleConvertToListing(sub.id)}
                      disabled={convertingId === sub.id}
                      className="w-full py-2.5 rounded-xl bg-[#963D2C] text-white text-xs font-bold hover:bg-[#7A2514] flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#FFB088]" />
                      <span>{convertingId === sub.id ? 'Converting...' : 'Convert to Listing'}</span>
                    </button>
                  ) : (
                    <span className="block text-center py-2 text-xs font-mono font-bold text-green-700 bg-green-50 rounded-xl">
                      Listing Created &bull; Active
                    </span>
                  )}

                  {sub.status === 'pending' && (
                    <button
                      onClick={() => handleUpdateStatus(sub.id, 'reviewed')}
                      className="w-full py-2 rounded-xl border border-[#D5E1CE] text-xs font-semibold hover:bg-[#F4F7EE]"
                    >
                      Mark Reviewed
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
