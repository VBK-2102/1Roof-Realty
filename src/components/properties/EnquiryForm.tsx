import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, PhoneCall, ShieldCheck } from 'lucide-react';
import { DatabaseService } from '../../services/db';
import confetti from 'canvas-confetti';
import { VERIFIED_BUSINESS } from '../../data/verifiedBusiness';

interface EnquiryFormProps {
  propertyId?: string;
  propertyTitle?: string;
  onSuccess?: () => void;
  inline?: boolean;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  propertyId,
  propertyTitle,
  onSuccess,
  inline = false
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || fullName.length < 2) {
      setErrorMsg('Please enter your full name (at least 2 characters).');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please provide a valid corporate or personal email address.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit Indian phone number.');
      return;
    }
    if (!message.trim() || message.length < 5) {
      setErrorMsg('Please add a short note describing your query or timeline.');
      return;
    }

    setLoading(true);

    try {
      await DatabaseService.createEnquiry({
        propertyId,
        propertyTitle: propertyTitle || 'General Advisory Enquiry',
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        budgetRange: budgetRange || undefined,
        message: message.trim(),
        source: propertyId ? 'website_property_page' : 'contact_page'
      });

      setSubmitted(true);
      setLoading(false);

      // Trigger celebration confetti in Brick & Terracotta colors
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#963D2C', '#FFB088', '#B54D35', '#E87A47']
        });
      } catch (err) {}

      if (onSuccess) onSuccess();
    } catch (err) {
      setLoading(false);
      setErrorMsg('Failed to submit enquiry. Please call our team directly at +91 70397 21234.');
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-[32px] bg-white border border-[#ECDCD5] text-center space-y-4 shadow-sm animate-in zoom-in-95 duration-200">
        <div className="w-14 h-14 rounded-full bg-[#963D2C] text-[#FFB088] flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-[#3D1007]">Enquiry Received</h3>
          <p className="text-xs text-[#5C4944] mt-1 max-w-sm mx-auto leading-relaxed">
            Thank you, <strong className="text-[#211613]">{fullName}</strong>. Your enquiry for{' '}
            <span className="font-semibold text-[#963D2C]">{propertyTitle || '1Roof Realty advisory'}</span> has been logged into our authorized CRM. An assigned consultant will reach you shortly.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#ECDCD5] text-[11px] font-mono text-[#5C4944] flex items-center justify-center gap-2">
          <PhoneCall className="w-3.5 h-3.5 text-[#963D2C]" />
          <span>Priority support desk: {VERIFIED_BUSINESS.contacts.primaryPhone}</span>
        </div>

        <button
          onClick={() => {
            setSubmitted(false);
            setMessage('');
          }}
          className="text-xs font-semibold text-[#B54D35] hover:text-[#963D2C] underline"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${inline ? '' : 'p-6 sm:p-8 rounded-[32px] bg-white border border-[#ECDCD5] shadow-lg shadow-[#963D2C]/5'}`}>
      
      {!inline && (
        <div className="border-b border-[#FBECE7] pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B54D35] mb-1">
            <ShieldCheck className="w-4 h-4 text-[#963D2C]" />
            <span>Direct Advisory Inquiry</span>
          </div>
          <h3 className="text-base font-bold text-[#211613]">
            {propertyTitle ? `Enquire about this Property` : `Connect with 1Roof Realty`}
          </h3>
          <p className="text-[11px] text-[#5C4944] mt-0.5">
            Verified team response within &lt; 15 minutes during business hours.
          </p>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Full Name */}
      <div className="space-y-1">
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C4944]">
          Your Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="e.g. Kunal Singhania"
          className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-2.5 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
        />
      </div>

      {/* Email & Phone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C4944]">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="kunal@example.com"
            className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-2.5 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C4944]">
            Phone (10 Digits) <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98200 00000"
            className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-2.5 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
          />
        </div>
      </div>

      {/* Target Budget */}
      <div className="space-y-1">
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C4944]">
          Estimated Budget Range
        </label>
        <select
          value={budgetRange}
          onChange={(e) => setBudgetRange(e.target.value)}
          className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl px-3.5 py-2.5 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C]"
        >
          <option value="">Select your preferred range</option>
          <option value="Under ₹1 Crore">Under ₹1 Crore</option>
          <option value="₹1 Crore – ₹2 Crore">₹1 Crore – ₹2 Crore</option>
          <option value="₹2 Crore – ₹4 Crore">₹2 Crore – ₹4 Crore</option>
          <option value="₹4 Crore+ (Ultra Luxury)">₹4 Crore+ (Ultra Luxury)</option>
          <option value="₹30,000 – ₹70,000 / mo (Rental)">₹30,000 – ₹70,000 / mo (Rental)</option>
          <option value="₹70,000+ / mo (Commercial / Luxury Rent)">₹70,000+ / mo (Commercial / Luxury Rent)</option>
        </select>
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C4944]">
          Message / Specific Requirement <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={3}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="I would like to enquire about availability, payment schedule, or schedule an inspection..."
          className="w-full text-xs bg-[#FAF7F2] border border-[#ECDCD5] rounded-2xl p-3 text-[#211613] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C] resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#963D2C] text-white hover:bg-[#7A2514] text-xs font-bold transition-all shadow-md shadow-[#963D2C]/20 group disabled:opacity-50"
      >
        <span>{loading ? 'Submitting Enquiry...' : 'Submit Real Enquiry'}</span>
        <Send className="w-3.5 h-3.5 text-[#FFB088] group-hover:translate-x-1 transition-transform" />
      </button>

      <p className="text-[10px] text-center text-[#5C4944] font-mono">
        Your information is protected by 1Roof Realty data privacy protocols.
      </p>
    </form>
  );
};
