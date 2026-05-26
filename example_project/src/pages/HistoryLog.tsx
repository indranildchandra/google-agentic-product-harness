import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Search,
  History,
  RefreshCw,
  LayoutGrid,
  List,
  PlusCircle,
  Compass,
  Cpu,
  FolderOpen,
  Settings,
  Sparkles
} from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  tag: 'Completed' | 'New Generation' | '';
  audience: string[];
  assets: string;
  region: 'Kaski' | 'Kathmandu' | 'Manang';
}

const HistoryLog: React.FC = () => {
  const { auditLogs } = useApp();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'archive' | 'audit'>('archive');
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState<'all' | 'Kaski' | 'Kathmandu' | 'Manang'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'new'>('all');

  // Seed data for Project History archive
  const projects: ProjectItem[] = [
    {
      id: 'proj-1',
      title: 'Ghandruk Serenity Lodge',
      date: 'Oct 24, 2025',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs_6gGzkyyUR3uyVyOlfvgZFba3LgK4FYnKwgG87OkhciyT0d1Glz_m7AiBPRRPXu3ND8KSAQNRd5Ty2JctO2qslmw5OsQ-SAo92X_xHUPb80YkN5rxGhXa8YJnzU8-rHETKUvMeagj5hSpdhZUEYA6IduzFrB3Ge2OtHTaTPi0Mgb5vPWZT602aZfTIQ_cNaQOt0nGUYXE45k_v1PUIefNTwGF7uo5VP17TL0BcAsOUbCABzdrpTegcCCg1HlSKQqJNaCk0jC-yEO',
      tag: 'Completed',
      audience: ['Solo Adventurers', 'Cultural Seekers'],
      assets: '12 High-Res Images, 3 Property Descriptions, Booking Engine Integration.',
      region: 'Kaski'
    },
    {
      id: 'proj-2',
      title: 'Thamel Urban Retreat',
      date: 'Nov 12, 2025',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9UV7mMxmVg2San6RZkrelaS08vZ47P1DdFLb6AER9tK2jC8uvwQPIMgNJ0C5cLMXmTW6stdQ-CRrpxDmhuZKong3CAYIPTaa26HcX9gRrNcn1U0_rvCiXPaTAODjsKhlueFERqm50D6Un20oME8geoqbbcy2-9qb_TnFH7pRRKXtv53s7s2PNp_m_lYQWP3gxfSodz4nvAEtrHmn6on4Yp8Kr2ZDeFyZErcLT3nJwkHkV8QSz5s02vlhIms8UT82y68GEhEy_U9ta',
      tag: 'New Generation',
      audience: ['Digital Nomads'],
      assets: '8 Assets, 2 Multi-language copy updates, Airbnb schema.',
      region: 'Kathmandu'
    },
    {
      id: 'proj-3',
      title: 'Manang Stone House',
      date: 'Sept 15, 2025',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtaAe7oTEJ7TXQyHYeIm7-i0PGSVLOpIgyhTyGbu1wnpv3t3gjckxvz4q8nbRNUH48CG0p8lujoX-ArU6KRpKNvxu20bvfz8eqCHhAqSLx50TFGd3m0DBQ72fX99y4LPNhCMP659Hx4cjrADGypUDn4Gq6BHGfky_8YWXc_L5pRxgbP8cZbbN79uKFJYOHGwmxBs0VP1_l3_TYjfLuBPHyY-9tfef5w97Bdf1T-oVres_1w7rKM3NUa9jUWEWuG4qTybDHNAPVWcw0',
      tag: '',
      audience: ['Hardcore Trekkers'],
      assets: '4 Terrain map bundles, 2 local liaison reviews.',
      region: 'Manang'
    },
    {
      id: 'proj-4',
      title: 'Pokhara Wellness Hub',
      date: 'Aug 02, 2025',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3xtIaYYRta3XJdNcUyum8lYCzrs3e2EYb4ONCki_L9Jr2Xq0bv_pSLUBIzUo4mO_hbjkxAe5bXtWAtsHmWvFO2b-g3Yx98-m1TjnAFgB8VBuSayC85-TrhMnXhVb4iPGm3X5l0tIPPMb6k2P_bcQ2Smrl7bw39IEmmOy78lFqeOv1Z0GX1A0jovGgzpVNOR-e2SQIcgayoj5JUMv5rNU90Fqc6BuP-KYcZA1LsLS0g77yJ_u972yU34jMO7Ev7hiO6u86VPiyx9WU',
      tag: '',
      audience: ['Yoga Enthusiasts'],
      assets: '6 Scenic garden panels, 3 optimization scripts.',
      region: 'Kaski'
    }
  ];

  // Log icon resolver
  const getLogIcon = (type: string) => {
    switch (type) {
      case 'system':
        return <Cpu className="w-4 h-4 text-[#d67d61]" />;
      case 'resource':
        return <FolderOpen className="w-4 h-4 text-[#b58d72]" />;
      case 'onboarding':
        return <Compass className="w-4 h-4 text-[#9caf88]" />;
      default:
        return <Settings className="w-4 h-4 text-[#54433e]" />;
    }
  };

  // Filter projects basis search input + chips
  const filteredProjects = projects.filter(proj => {
    const matchesSearch = proj.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          proj.audience.some(aud => aud.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRegion = regionFilter === 'all' || proj.region === regionFilter;
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'completed' && proj.tag === 'Completed') ||
                          (statusFilter === 'new' && proj.tag === 'New Generation');
    return matchesSearch && matchesRegion && matchesStatus;
  });

  // Filter platform logs
  const filteredLogs = auditLogs.filter(log =>
    log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = (title: string) => {
    alert(`Refreshing credentials and synchronizing active assets for ${title}...`);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fade-in text-left">
      {/* Upper Tab Navigation Selector */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-[#dac1ba]/20 pb-6 select-none">
        <div>
          <h1 className="font-headline text-4xl font-bold text-[#944931] mb-2">Project History</h1>
          <p className="font-body text-sm text-[#54433e]/80">
            Explore your archive of past AI-generated distribution assets and inspect historical background runs.
          </p>
        </div>

        <div className="flex bg-[#F1EDE4] p-1.5 rounded-xl self-start md:self-auto shadow-inner">
          <button
            onClick={() => {
              setActiveTab('archive');
              setSearchTerm('');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'archive'
                ? 'bg-white text-[#944931] shadow-ambient'
                : 'text-[#54433e]/70 hover:text-[#181c1d]'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Generated Assets</span>
          </button>
          
          <button
            onClick={() => {
              setActiveTab('audit');
              setSearchTerm('');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'audit'
                ? 'bg-white text-[#944931] shadow-ambient'
                : 'text-[#54433e]/70 hover:text-[#181c1d]'
            }`}
          >
            <List className="w-4 h-4" />
            <span>Audit Trail Logs</span>
          </button>
        </div>
      </div>

      {activeTab === 'archive' ? (
        <>
          {/* Search and Filters Segment */}
          <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search projects by name or audience..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-[#F1EDE4]/50 border border-[#dac1ba]/30 rounded-xl pl-11 pr-4 py-3 text-sm text-[#181c1d] focus:ring-2 focus:ring-[#944931]/20 focus:border-[#944931] outline-none transition-all font-body"
              />
              <Search className="w-5 h-5 text-[#54433e]/40 absolute left-4 top-3.5" />
            </div>

            {/* Dynamic Filter Selectors */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 select-none">
              <select
                value={regionFilter}
                onChange={e => setRegionFilter(e.target.value as any)}
                className="bg-[#F1EDE4]/50 border border-[#dac1ba]/30 text-xs font-semibold px-4 py-3 rounded-xl text-[#54433e] focus:border-[#944931] transition-colors cursor-pointer outline-none"
              >
                <option value="all">Region: All</option>
                <option value="Kaski">Region: Kaski</option>
                <option value="Kathmandu">Region: Kathmandu</option>
                <option value="Manang">Region: Manang</option>
              </select>

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as any)}
                className="bg-[#F1EDE4]/50 border border-[#dac1ba]/30 text-xs font-semibold px-4 py-3 rounded-xl text-[#54433e] focus:border-[#944931] transition-colors cursor-pointer outline-none"
              >
                <option value="all">Status: All</option>
                <option value="completed">Status: Completed</option>
                <option value="new">Status: New Generation</option>
              </select>

              {(regionFilter !== 'all' || statusFilter !== 'all' || searchTerm) && (
                <button
                  onClick={() => {
                    setRegionFilter('all');
                    setStatusFilter('all');
                    setSearchTerm('');
                  }}
                  className="bg-[#944931]/10 text-[#944931] border border-[#944931]/20 text-xs font-bold px-4 py-3 rounded-xl hover:bg-[#944931]/20 transition-all whitespace-nowrap"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj, idx) => {
              const isFirstFeatured = idx === 0 && !searchTerm && regionFilter === 'all' && statusFilter === 'all';
              
              return (
                <article
                  key={proj.id}
                  className={`bg-white rounded-2xl overflow-hidden shadow-ambient border border-[#dac1ba]/10 hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1 flex flex-col ${
                    isFirstFeatured ? 'lg:col-span-2 group md:grid md:grid-cols-2 h-full' : ''
                  }`}
                >
                  {/* Photo Container */}
                  <div className={`relative overflow-hidden ${isFirstFeatured ? 'h-64 md:h-full shrink-0' : 'h-48'}`}>
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                    />
                    
                    {proj.tag && (
                      <div className="absolute top-4 left-4 flex gap-2 select-none">
                        <span className={`backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold shadow-sm ${
                          proj.tag === 'Completed'
                            ? 'bg-[#d2e6bc]/90 text-[#3b4c2c]'
                            : 'bg-[#ffdbd0]/90 text-[#76321c]'
                        }`}>
                          {proj.tag}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div className="text-left">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="font-headline text-2xl font-bold text-[#944931] group-hover:text-[#551905] transition-colors">
                            {proj.title}
                          </h2>
                          <p className="font-body text-xs text-[#54433e]/60 font-medium select-none mt-1">
                            Generated: {proj.date} • {proj.region} Region
                          </p>
                        </div>
                        <Sparkles className="w-5 h-5 text-[#b58d72] shrink-0" />
                      </div>

                      <div className="space-y-4 mb-6">
                        <div>
                          <p className="text-[10px] font-bold text-[#b58d72] uppercase tracking-wider select-none">Target Audience</p>
                          <div className="flex flex-wrap gap-2 mt-2 select-none">
                            {proj.audience.map(aud => (
                              <span key={aud} className="bg-[#F1EDE4] text-[#54433e] px-2.5 py-0.5 rounded-full font-body text-[10px] font-semibold">
                                {aud}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] font-bold text-[#b58d72] uppercase tracking-wider select-none">Assets & Outputs</p>
                          <p className="font-body text-xs text-[#54433e] leading-relaxed mt-1">
                            {proj.assets}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 pt-6 border-t border-[#dac1ba]/10 select-none">
                      <button
                        onClick={() => alert(`Pulling generated documents and copy sheets for ${proj.title}...`)}
                        className="flex-grow bg-[#d67d61] hover:bg-[#944931] text-white py-2.5 rounded-xl font-body text-xs font-semibold shadow-sm transition-all"
                      >
                        View Assets
                      </button>
                      <button
                        onClick={() => handleRefresh(proj.title)}
                        className="flex items-center justify-center w-11 h-11 border border-[#dac1ba]/40 text-[#944931] rounded-xl hover:bg-[#F1EDE4] transition-colors"
                        title="Re-run Crawler Generation"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Empty State / Create Box */}
            <button
              onClick={() => navigate('/')}
              className="border-2 border-dashed border-[#dac1ba]/40 rounded-2xl flex flex-col items-center justify-center p-8 group hover:border-[#944931] hover:bg-white/40 transition-all select-none min-h-[300px]"
            >
              <div className="w-14 h-14 rounded-full bg-[#F1EDE4] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <PlusCircle className="w-7 h-7 text-[#944931]" />
              </div>
              <h3 className="font-headline text-xl font-bold text-[#181c1d] mb-1">Start New Project</h3>
              <p className="font-body text-xs text-[#54433e]/70 text-center max-w-[200px] leading-relaxed">
                Transform your lodging vibe into high-performing active assets.
              </p>
            </button>
          </div>
        </>
      ) : (
        /* Platforms Audit Logs View */
        <div className="bg-white border border-[#dac1ba]/20 rounded-2xl p-6 shadow-ambient">
          <div className="mb-6">
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search audit trail logs..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-[#F1EDE4]/50 border border-[#dac1ba]/30 rounded-xl pl-11 pr-4 py-2.5 text-sm text-[#181c1d] focus:ring-2 focus:ring-[#944931]/20 focus:border-[#944931] outline-none transition-all font-body"
              />
              <Search className="w-4 h-4 text-[#54433e]/40 absolute left-4 top-3.5" />
            </div>
          </div>

          {filteredLogs.length > 0 ? (
            <div className="flex flex-col gap-6 relative before:content-[''] before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#dac1ba]/20 select-none">
              {filteredLogs.map(log => (
                <div key={log.id} className="flex gap-6 items-start relative animate-fade-in text-left">
                  {/* Bubble Icon indicator */}
                  <div className="w-12 h-12 rounded-full border border-[#dac1ba]/20 bg-[#F9F7F2] flex items-center justify-center shrink-0 z-10 shadow-sm">
                    {getLogIcon(log.type)}
                  </div>

                  {/* Description Box */}
                  <div className="flex-1 font-body text-left">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-1.5">
                      <span className="text-[10px] uppercase font-bold text-[#b58d72] tracking-wider font-body">
                        {log.type} Event Log
                      </span>
                      <span className="text-[10px] text-[#54433e]/50 font-bold font-body">
                        {log.timestamp}
                      </span>
                    </div>

                    <p className="text-sm text-[#181c1d] leading-relaxed font-semibold">
                      {log.description}
                    </p>

                    <div className="flex items-center gap-1.5 mt-2">
                      {log.status === 'success' ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#9caf88]/20 text-[#3b4c2c] text-[9px] font-bold uppercase tracking-wider">
                          ✓ success
                        </span>
                      ) : log.status === 'pending' ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#d67d61]/20 text-[#76321c] text-[9px] font-bold uppercase tracking-wider animate-pulse">
                          ● sync process active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[9px] font-bold uppercase tracking-wider">
                          ✗ connection fault
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center select-none">
              <History className="w-12 h-12 text-[#b58d72]/30 mx-auto mb-3 stroke-[1.5]" />
              <p className="text-sm font-body text-[#54433e]/60">No historical events matching your filter.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HistoryLog;
