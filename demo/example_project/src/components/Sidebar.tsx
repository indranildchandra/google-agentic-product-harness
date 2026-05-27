import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Compass,
  Activity,
  FolderOpen,
  Cpu,
  Layers,
  Share2,
  Settings,
  History,
  Lasso
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Onboarding', icon: Compass },
    { path: '/factory', label: 'Distribution Factory', icon: Activity },
    { path: '/resources', label: 'Resources Manager', icon: FolderOpen },
    { path: '/aeo', label: 'AEO Answer Engine', icon: Cpu },
    { path: '/geo', label: 'GEO Dataset Explorer', icon: Layers },
    { path: '/graph', label: 'Knowledge Graph', icon: Share2 },
    { path: '/settings', label: 'Host Settings & Profile', icon: Settings },
    { path: '/history', label: 'History & Audit Log', icon: History }
  ];

  return (
    <aside className="w-80 bg-[#F9F7F2] border-r border-[#dac1ba]/30 min-h-screen p-8 flex flex-col justify-between select-none sticky top-0 h-screen overflow-y-auto">
      <div>
        {/* Brand Logo Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 text-[#944931]">
            <Lasso className="w-8 h-8 stroke-[1.5]" />
            <h1 className="text-2xl tracking-tight leading-none text-[#181c1d] select-none font-headline font-semibold">
              HamroStay
            </h1>
          </div>
          <p className="text-xs text-[#54433e]/60 font-body uppercase tracking-[0.15em] mt-2 font-medium">
            AI Distribution Suite
          </p>
        </div>

        {/* Elegant Navigation Menu */}
        <nav className="flex flex-col gap-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative font-body text-sm font-medium ${
                  isActive
                    ? 'bg-[#d67d61] text-[#ffffff] shadow-ambient'
                    : 'text-[#54433e]/80 hover:bg-[#F1EDE4] hover:text-[#181c1d]'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${
                    isActive ? 'text-[#ffffff]' : 'text-[#54433e]/60 group-hover:text-[#181c1d]'
                  }`}
                />
                <span className="tracking-wide">{item.label}</span>
                {isActive && (
                  <span className="absolute right-3 w-1.5 h-1.5 bg-[#ffffff] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Foothill Nepal brand signature */}
      <div className="pt-6 border-t border-[#dac1ba]/20 text-[11px] text-[#54433e]/50 font-body font-medium select-none">
        <p className="tracking-wide">Annapurna Boutique Engine</p>
        <p className="mt-0.5 opacity-80">v1.2.0 • Kathmandu Valley</p>
      </div>
    </aside>
  );
};

export default Sidebar;
