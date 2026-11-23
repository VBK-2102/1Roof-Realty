import React from 'react';
import { Sparkles, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DemoBadgeProps {
  minimal?: boolean;
}

export const DemoBadge: React.FC<DemoBadgeProps> = ({ minimal = false }) => {
  if (minimal) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FBECE7] text-[#963D2C] text-[10px] font-mono font-medium border border-[#ECDCD5]">
        <Sparkles className="w-2.5 h-2.5" />
        <span>Demo Showcase</span>
      </span>
    );
  }

  return (
    <div className="bg-[#FBECE7]/90 border border-[#ECDCD5] rounded-2xl p-3.5 my-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs">
      <div className="flex items-start sm:items-center gap-2.5">
        <div className="w-6 h-6 rounded-full bg-[#963D2C]/15 flex items-center justify-center text-[#963D2C] shrink-0 mt-0.5 sm:mt-0">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <div>
          <span className="font-semibold text-[#3D1007]">Configurable Showcase Data</span>
          <p className="text-[11px] text-[#5C4944] leading-tight">
            These listings represent realistic architecture samples. Real properties can be created, updated, or removed dynamically via the Admin Console.
          </p>
        </div>
      </div>

      <Link
        to="/admin/properties"
        className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#963D2C] text-white hover:bg-[#7A2514] text-[11px] font-medium transition-all shadow-sm shrink-0"
      >
        <Settings className="w-3 h-3 text-[#FFB088]" />
        <span>Manage in Admin</span>
      </Link>
    </div>
  );
};
