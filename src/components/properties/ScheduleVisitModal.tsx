import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { DatabaseService } from '../../services/db';
import { Property } from '../../types';
import confetti from 'canvas-confetti';

interface ScheduleVisitModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  property,
  isOpen,
  onClose
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 01:00 PM');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || name.length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number for site manager SMS.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!preferredDate) {
      setErrorMsg('Please select a preferred date for the site inspection.');
      return;
    }

    setLoading(true);

    try {
      await DatabaseService.createSiteVisit({
        propertyId: property.id,
        propertyTitle: property.title,
        propertyCity: property.city,
        customerName: name.trim(),
        customerEmail: email.trim(),
        customerPhone: phone.trim(),
        preferredDate,
        preferredTimeSlot: timeSlot,
        additionalNotes: additionalNotes.trim() || undefined
      });

      setLoading(false);
      setConfirmed(true);

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#963D2C', '#FFB088', '#B54D35', '#E87A47']
        });
      } catch (err) {}
    } catch (err) {
      setLoading(false);
      setErrorMsg('Unable to schedule visit. Please call 1Roof Realty directly.');
    }
  };

  const minDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#3D1007]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-[36px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#ECDCD5] relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#FAF7F2] text-[#5C4944] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#963D2C] text-[#FFB088] flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-xl font-bold text-[#3D1007]">Site Visit Scheduled!</h3>
            
            <p className="text-xs text-[#5C4944] leading-relaxed max-w-md mx-auto">
              Your visit to <strong className="text-[#211613]">{property.title}</strong> has been booked for <span className="font-mono text-[#963D2C] font-bold">{preferredDate} ({timeSlot})</span>.
            </p>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#ECDCD5] text-left text-xs space-y-1.5">
              <div className="text-[#B54D35] font-mono text-[10px] uppercase tracking-wider font-semibold">Location / Address</div>
              <p className="text-[#211613] font-medium">{property.address}</p>
              <p className="text-[11px] text-[#5C4944]">Site executive will coordinate 2 hours prior to arrival.</p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-[#963D2C] text-white font-semibold text-xs hover:bg-[#7A2514] transition-all shadow-md"
            >
              Done & Return to Property
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="flex items-center gap-1.5 text-xs font-mono text-[#B54D35] mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#963D2C]" />
                <span>Schedule a Private Site Visit</span>
              </span>
              <h2 className="text-lg font-bold text-[#211613] leading-tight">
                {property.title}
              </h2>
              <p className="text-xs text-[#5C4944] mt-0.5">
                {property.locality}, {property.city} &bull; {property.priceDisplay}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#5C4944]">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kulkarni"
                  className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-2.5 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#5C4944]">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98200 00000"
                    className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-2.5 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#5C4944]">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ramesh@gmail.com"
                    className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-2.5 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#5C4944]">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    min={minDate}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-2.5 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#5C4944]">Preferred Time Slot</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-2.5 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
                  >
                    <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM)</option>
                    <option value="12:00 PM - 02:00 PM">Mid-Day (12:00 PM - 02:00 PM)</option>
                    <option value="02:00 PM - 04:00 PM">Afternoon (02:00 PM - 04:00 PM)</option>
                    <option value="04:00 PM - 06:30 PM">Evening (04:00 PM - 06:30 PM)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#5C4944]">Notes for Site Executive</label>
                <textarea
                  rows={2}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="e.g. Bringing car, need parking / prefer inspecting sample flat..."
                  className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl p-2.5 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-[#963D2C] text-white hover:bg-[#7A2514] text-xs font-bold transition-all shadow-md shadow-[#963D2C]/20 disabled:opacity-50 mt-2"
              >
                {loading ? 'Confirming Site Visit...' : 'Confirm Site Visit Booking'}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#5C4944] font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#963D2C]" />
                <span>Zero obligation &bull; Free official accompanied tour</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
