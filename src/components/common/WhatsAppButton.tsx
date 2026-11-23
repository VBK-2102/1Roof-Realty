import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { VERIFIED_BUSINESS } from '../../data/verifiedBusiness';

interface WhatsAppButtonProps {
  propertyContext?: {
    title: string;
    price: string;
    id: string;
  };
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ propertyContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const defaultText = propertyContext
    ? `Hello 1Roof Realty team, I am interested in ${propertyContext.title} (${propertyContext.price}, Ref: ${propertyContext.id}). Please share further details and site visit availability.`
    : `Hello 1Roof Realty, I would like to consult with an advisor regarding residential/commercial properties in Mumbai / Indore.`;

  const handleSend = () => {
    const textToSend = customMsg.trim() || defaultText;
    const url = `https://wa.me/${VERIFIED_BUSINESS.contacts.whatsappNumber}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover dialog */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-[#ECDCD5] p-4 text-[#211613] animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#FBECE7]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#963D2C] flex items-center justify-center text-[#FFB088]">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#3D1007]">1Roof Realty WhatsApp Desk</h4>
                <p className="text-[10px] text-[#5C4944] font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB088] pulse-brick"></span>
                  Avg response: 15 mins
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-[#FBECE7] text-[#5C4944]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3">
            <p className="text-xs text-[#5C4944] mb-2 font-medium">
              Verified phone: <span className="font-mono text-[#963D2C] font-bold">{VERIFIED_BUSINESS.contacts.primaryPhone}</span>
            </p>
            <textarea
              rows={3}
              className="w-full text-xs p-2.5 rounded-xl border border-[#ECDCD5] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#963D2C] resize-none"
              defaultValue={defaultText}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Type your message..."
            />
          </div>

          <button
            onClick={handleSend}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[#963D2C] text-white font-semibold text-xs hover:bg-[#7A2514] transition-all shadow-md group"
          >
            <span>Start WhatsApp Chat</span>
            <Send className="w-3.5 h-3.5 text-[#FFB088] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#963D2C] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all border border-[#FFB088]/30 group"
        aria-label="Contact on WhatsApp"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 text-[#FFB088]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FFB088] rounded-full border-2 border-[#963D2C] pulse-brick"></span>
        </div>
        <span className="text-xs font-semibold tracking-tight hidden sm:inline">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
};
