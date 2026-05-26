import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, ChevronDown, CheckCircle, RefreshCw } from 'lucide-react';

const Topbar: React.FC = () => {
  const { properties, selectedPropertyId, setSelectedPropertyId, isDistributing } = useApp();

  return (
    <header className="h-20 border-b border-[#dac1ba]/20 bg-white/80 backdrop-blur-[12px] px-8 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Property Selector */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#F9F7F2] border border-[#dac1ba]/30 flex items-center justify-center text-[#944931]">
          <Building2 className="w-5 h-5 stroke-[1.5]" />
        </div>
        <div className="relative">
          <label className="text-[10px] text-[#54433e]/50 uppercase tracking-[0.1em] font-bold block mb-0.5">
            Active Property
          </label>
          <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
            <select
              value={selectedPropertyId}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
              className="bg-transparent text-sm font-semibold text-[#181c1d] pr-6 py-0 appearance-none border-none outline-none font-body cursor-pointer"
            >
              {properties.map((prop) => (
                <option key={prop.id} value={prop.id} className="text-black bg-white">
                  {prop.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#54433e]/50 pointer-events-none absolute right-0 bottom-0" />
          </div>
        </div>
      </div>

      {/* Sync Status / Activity Panel */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 bg-[#F9F7F2] border border-[#dac1ba]/20 px-4 py-2 rounded-xl">
          <div className="relative flex items-center justify-center">
            {isDistributing ? (
              <RefreshCw className="w-4 h-4 text-[#d67d61] animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4 text-[#4e805d]" />
            )}
          </div>
          <div className="text-left font-body">
            <span className="text-[10px] text-[#54433e]/50 uppercase tracking-wider block font-bold">
              Distribution State
            </span>
            <span className="text-xs font-semibold text-[#181c1d]">
              {isDistributing ? 'Distributing Assets...' : 'Synchronized'}
            </span>
          </div>
        </div>

        {/* Small avatar representing the Gurung Family Host */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-semibold text-[#181c1d] block">Gurung Family</span>
            <span className="text-[10px] text-[#54433e]/60 font-medium">Boutique Host</span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-[#d67d61] bg-[#F1EDE4] overflow-hidden shadow-ambient select-none">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" 
              alt="Gurung Host Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
