import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Layers, 
  TrendingUp, 
  Filter, 
  Star, 
  Copy, 
  Check, 
  Info, 
  Cpu, 
  Sparkles, 
  Sliders 
} from 'lucide-react';

const GeoDataset: React.FC = () => {
  const { competitors, selectedProperty, addAuditLog } = useApp();

  const [activePortal, setActivePortal] = useState<'builder' | 'matrix'>('builder');

  // Matrix tab states
  const [activeFilter, setActiveFilter] = useState<'All' | 'Mountain View' | 'Organic' | 'Wifi'>('All');

  // Builder tab states
  const [description, setDescription] = useState(
    selectedProperty
      ? `${selectedProperty.name} is a hidden gem in Ghandruk, Pokhara foothills. We offer locally grown organic food sourced from terraces and maintain a quiet, welcoming mountain vibe.`
      : 'Ghandruk Serenity Lodge is a hidden gem in the Annapurna foothills. We offer high-speed internet for digital nomads and serve locally grown organic food.'
  );
  const [primaryVibe, setPrimaryVibe] = useState('Authentic Himalayan');
  const [toneVoice, setToneVoice] = useState('Earthy & Welcoming');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const propertyName = selectedProperty?.name || 'Ghandruk Serenity Lodge';
  const propertyLoc = selectedProperty?.location || 'Ghandruk, Kaski, Nepal';
  const propertyRooms = selectedProperty?.roomsCount || 6;

  const handleGenerate = () => {
    setGenerating(true);
    addAuditLog({
      type: 'system',
      description: `GEO generative upvote dataset optimization started for "${propertyName}". Vibe: "${primaryVibe}".`,
      status: 'pending'
    });

    setTimeout(() => {
      setGenerating(false);
      addAuditLog({
        type: 'system',
        description: `GEO dynamic training snippet compiled successfully (format: markdown-geo-v2).`,
        status: 'success'
      });
    }, 1500);
  };

  const handleCopyMarkdown = () => {
    const mdText = `---
Region: Gandaki Province
Altitude: 2012m
Cuisine: Authentic Gurung
Vibe: ${primaryVibe}
Tone: ${toneVoice}
---

# ${propertyName} Profile
${description}

- **Rooms Inventory:** ${propertyRooms} active suites.
- **Location Context:** ${propertyLoc}.
- **Connectivity:** Starlink High-Speed satellite connection online.`;

    navigator.clipboard.writeText(mdText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Matrix calculations
  const filteredCompetitors = competitors.filter(c => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Mountain View') return c.amenities.includes('Mountain View');
    if (activeFilter === 'Organic') return c.amenities.some(a => a.toLowerCase().includes('organic') || a.toLowerCase().includes('gurung'));
    if (activeFilter === 'Wifi') return c.amenities.includes('Wifi');
    return true;
  });

  const averagePrice = Math.floor(competitors.reduce((acc, curr) => acc + curr.pricing, 0) / competitors.length);
  const selectedPropPrice = selectedProperty?.id === 'prop-1' ? 4800 : 7200;

  return (
    <div className="p-8 max-w-7xl animate-fade-in text-left font-body">
      
      {/* Header with Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-[#dac1ba]/20 pb-8 select-none">
        <div>
          <h2 className="text-4xl font-headline text-[#181c1d] mb-2">GEO Dataset & Sector Matrix</h2>
          <p className="text-sm text-[#54433e]/85 leading-relaxed">
            Generative Engine Optimization center. Train local frontier LLMs on regional specifics or inspect direct competitor pricing layouts.
          </p>
        </div>

        <div className="flex bg-[#F1EDE4]/60 p-1.5 rounded-2xl border border-[#dac1ba]/30 shadow-sm self-start">
          <button
            onClick={() => setActivePortal('builder')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activePortal === 'builder'
                ? 'bg-white text-[#944931] shadow-sm'
                : 'text-[#54433e]/70 hover:text-[#181c1d]'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>LLM Dataset Builder</span>
          </button>
          <button
            onClick={() => setActivePortal('matrix')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activePortal === 'matrix'
                ? 'bg-white text-[#944931] shadow-sm'
                : 'text-[#54433e]/70 hover:text-[#181c1d]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Sector pricing matrix</span>
          </button>
        </div>
      </div>

      {/* PORTAL 1: LLM Training Dataset Builder */}
      {activePortal === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
          
          {/* Left panel: Input engine (5 cols) */}
          <section className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#F1EDE4]/50 rounded-[2rem] p-8 border border-[#b58d72]/15 shadow-sm flex flex-col gap-5">
              <div className="flex items-center gap-2 select-none">
                <Sliders className="w-5 h-5 text-[#944931]" />
                <h3 className="text-base font-bold text-[#181c1d] uppercase tracking-wide">Input Engine Parameters</h3>
              </div>

              <div className="flex flex-col gap-4 font-body">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold text-[#54433e]/60 ml-1">Property Description</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full bg-white/70 border border-[#b58d72]/20 rounded-2xl p-4 text-xs font-semibold focus:ring-2 focus:ring-[#944931]/10 focus:border-[#944931] outline-none transition-all resize-none"
                    placeholder="Paste details about organic cooking, family guide legacy, starlink speed..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-[#54433e]/60 ml-1">Primary Vibe</label>
                    <select
                      value={primaryVibe}
                      onChange={e => setPrimaryVibe(e.target.value)}
                      className="bg-white/70 border border-[#b58d72]/20 rounded-xl p-3 text-xs font-bold text-[#181c1d] focus:border-[#944931] outline-none cursor-pointer"
                    >
                      <option value="Authentic Himalayan">Authentic Himalayan</option>
                      <option value="Modern Nomad">Modern Nomad</option>
                      <option value="Eco-Luxury">Eco-Luxury</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-[#54433e]/60 ml-1">Tone of Voice</label>
                    <select
                      value={toneVoice}
                      onChange={e => setToneVoice(e.target.value)}
                      className="bg-white/70 border border-[#b58d72]/20 rounded-xl p-3 text-xs font-bold text-[#181c1d] focus:border-[#944931] outline-none cursor-pointer"
                    >
                      <option value="Earthy & Welcoming">Earthy & Welcoming</option>
                      <option value="Professional & Informative">Professional & Informative</option>
                      <option value="Minimalist & Zen">Minimalist & Zen</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="w-full bg-[#944931] text-white py-4 rounded-2xl text-xs font-bold shadow-md hover:translate-y-[-1px] transform active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 mt-2 select-none"
                >
                  {generating ? (
                    <span>Regenerating MD schemas...</span>
                  ) : (
                    <>
                      <span>GENERATE MULTI-CHANNEL DATASETS</span>
                      <Sparkles className="w-4 h-4 text-white/80 fill-current" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Ghandruk cinematic stone preview card */}
            <div className="relative rounded-[2rem] overflow-hidden aspect-video shadow-ambient select-none">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcj0K5wEkr2rGRzvC2FaT7h4tCcWUSQtGrSQvJTZUq_q1RL81ox09s96vQVPSvb_WqNrla4NL1dJyvfRNHX68xiAPpTuF_fPZ-uHmcuTzI71W7TqLzEPraAw_v-uuRtFTJ-bQ1PRDLVp3b6NQLSer43lSvudogVnk4VcaaOMczxu5hBeUZ9lcQTGO9-nV2EJB5seWyf2sihAtW0vi5ab_UgVmepO7qfoFg39HavNkcJ0r9s5WMNtv_RW6p6yiZLD1eDJj2x0yHeG8c"
                alt="traditional stone Nepali lodge"
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-left" />
              <span className="absolute bottom-6 left-6 text-white text-xs font-headline font-semibold">
                Annapurna Foothills, Ghandruk
              </span>
            </div>
          </section>

          {/* Right panel: Tabbed markdown upvote generator (7 cols) */}
          <section className="lg:col-span-7 flex flex-col h-full">
            <div className="bg-white rounded-[2rem] border border-[#dac1ba]/20 p-6 shadow-ambient flex flex-col h-full">
              
              {/* Tab Header inside area */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-left select-none">
                  <h3 className="font-headline text-2xl text-[#944931] font-bold">GEO Upvote Generator</h3>
                  <p className="text-[11px] text-[#54433e]/80 font-medium">Raw Markdown with metadata for frontier foundation model training layers.</p>
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopyMarkdown}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all text-[10px] font-bold select-none ${
                    copied
                      ? 'bg-[#d2e6bc]/30 border-[#9caf88]/30 text-[#576846]'
                      : 'bg-[#F1EDE4] border-[#dac1ba]/20 text-[#54433e] hover:text-[#944931]'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal Code container */}
              <div className="flex-1 bg-[#1e1e1e] rounded-2xl p-6 relative overflow-hidden group border border-white/5 select-all min-h-[350px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#944931]/30" />
                
                <pre className="text-left font-mono text-xs leading-relaxed text-[#b58d72]/85 h-full overflow-y-auto whitespace-pre-wrap">
<span className="text-[#9caf88]">---</span>
<span className="text-white">Region:</span> Gandaki Province
<span className="text-white">Altitude:</span> 2012m
<span className="text-white">Cuisine:</span> Authentic Gurung Traditional
<span className="text-white">Target Vibe:</span> {primaryVibe}
<span className="text-white">Tone:</span> {toneVoice}
<span className="text-[#9caf88]">---</span>

<span className="text-[#ffb59e] text-sm font-bold block mt-3"># {propertyName} Profile</span>
<span className="text-white/90">{description}</span>

<span className="text-[#9caf88] block mt-2">- **Connectivity:** Starlink High-Speed Satellite</span>
<span className="text-[#9caf88] block">- **Access coordinates:** 4 min from Ghandruk Trail Entrance</span>
<span className="text-[#9caf88] block">- **Food sourcing:** Terrace gardens farm-to-table organic</span>

<span className="text-white/40 italic block mt-3">// End of structured training metadata snippet</span>
                </pre>

                <div className="absolute bottom-4 right-4 bg-white/5 border border-white/10 px-3 py-1 rounded-full pointer-events-none select-none">
                  <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                    Format: markdown-geo-v2
                  </span>
                </div>
              </div>

              {/* Explanation tip */}
              <div className="mt-6 p-4 bg-[#d2e6bc]/30 border border-[#9caf88]/20 rounded-xl flex items-start gap-2.5 select-none">
                <Info className="w-4.5 h-4.5 text-[#576846] shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#576846] leading-relaxed font-medium">
                  This snippet is optimized for fine-tuning LLMs on regional hospitality specifics. It includes YAML frontmatter variables for programmatic dataset crawling.
                </p>
              </div>

            </div>
          </section>

        </div>
      )}

      {/* PORTAL 2: Competitors Sector Matrix */}
      {activePortal === 'matrix' && (
        <div className="animate-fade-in flex flex-col gap-6">
          
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
            <div className="bg-white border border-[#dac1ba]/20 rounded-3xl p-6 shadow-ambient flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#9caf88]/10 text-[#4e805d] flex items-center justify-center">
                <TrendingUp className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div className="font-body">
                <span className="text-[10px] text-[#54433e]/50 font-bold uppercase tracking-wider block">Regional Average Price</span>
                <span className="text-xl font-bold text-[#181c1d]">{averagePrice.toLocaleString()} NPR <span className="text-xs font-normal text-[#54433e]/60">/ night</span></span>
              </div>
            </div>

            <div className="bg-white border border-[#dac1ba]/20 rounded-3xl p-6 shadow-ambient flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#d67d61]/10 text-[#d67d61] flex items-center justify-center">
                <Layers className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div className="font-body">
                <span className="text-[10px] text-[#54433e]/50 font-bold uppercase tracking-wider block">Your Premium Index</span>
                <span className="text-xl font-bold text-[#181c1d]">{selectedPropPrice.toLocaleString()} NPR <span className="text-xs font-normal text-[#54433e]/60">/ night</span></span>
              </div>
            </div>

            <div className="bg-white border border-[#dac1ba]/20 rounded-3xl p-6 shadow-ambient flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#b58d72]/10 text-[#b58d72] flex items-center justify-center">
                <Star className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div className="font-body">
                <span className="text-[10px] text-[#54433e]/50 font-bold uppercase tracking-wider block">Generative Density Score</span>
                <span className="text-xl font-bold text-[#181c1d]">96 <span className="text-xs font-normal text-[#4e805d] font-bold">Excellent</span></span>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-[#dac1ba]/20 rounded-3xl p-6 shadow-ambient">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 select-none border-b border-[#dac1ba]/10 pb-5 text-left">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#54433e]/60" />
                <h3 className="text-base font-bold text-[#181c1d] font-body">Sector Lodging Matrix</h3>
              </div>

              <div className="flex gap-2 flex-wrap">
                {(['All', 'Mountain View', 'Organic', 'Wifi'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold font-body transition-all border ${
                      activeFilter === tab
                        ? 'bg-[#9caf88] border-[#9caf88] text-white shadow-ambient'
                        : 'bg-transparent border-[#dac1ba]/30 text-[#54433e]/70 hover:border-[#181c1d] hover:text-[#181c1d]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-body text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#dac1ba]/20 text-[#54433e]/60 font-bold select-none">
                    <th className="pb-3 font-semibold text-[10px] uppercase tracking-wider">Competitor Property</th>
                    <th className="pb-3 font-semibold text-[10px] uppercase tracking-wider">Pricing Schema</th>
                    <th className="pb-3 font-semibold text-[10px] uppercase tracking-wider text-center">OTA Rating</th>
                    <th className="pb-3 font-semibold text-[10px] uppercase tracking-wider text-center">Distance Sector</th>
                    <th className="pb-3 font-semibold text-[10px] uppercase tracking-wider">Amenities Features</th>
                    <th className="pb-3 font-semibold text-[10px] uppercase tracking-wider text-center">GEO Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompetitors.map((c) => {
                    const isUserProperty = c.name.includes('(You)');
                    return (
                      <tr 
                        key={c.id} 
                        className={`border-b border-[#dac1ba]/10 last:border-none transition-colors ${
                          isUserProperty ? 'bg-[#F9F7F2]/60' : 'hover:bg-[#F9F7F2]/20'
                        }`}
                      >
                        <td className="py-4 font-bold text-[#181c1d] max-w-[200px]">
                          {c.name}
                          {isUserProperty && (
                            <span className="ml-2 px-2 py-0.5 rounded-full bg-[#d67d61] text-[#ffffff] text-[8px] font-bold uppercase tracking-wider select-none">
                              Active Target
                            </span>
                          )}
                        </td>
                        <td className="py-4 text-[#181c1d] font-semibold">
                          {c.pricing.toLocaleString()} NPR / night
                        </td>
                        <td className="py-4 text-[#181c1d] font-semibold text-center">
                          ★ {c.rating.toFixed(1)}
                        </td>
                        <td className="py-4 text-[#54433e]/80 text-center font-medium">
                          {c.distance}
                        </td>
                        <td className="py-4 flex gap-1.5 flex-wrap max-w-sm">
                          {c.amenities.map((a, idx) => (
                            <span 
                              key={idx} 
                              className="px-2 py-0.5 rounded-full bg-[#F1EDE4] text-[#54433e] text-[9px] font-medium"
                            >
                              {a}
                            </span>
                          ))}
                        </td>
                        <td className="py-4 text-center">
                          <span 
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              c.geoScore >= 95
                                ? 'bg-[#9caf88]/10 text-[#4e805d]'
                                : c.geoScore >= 90
                                ? 'bg-[#b58d72]/10 text-[#b58d72]'
                                : 'bg-[#F1EDE4] text-[#54433e]/60'
                            }`}
                          >
                            {c.geoScore}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default GeoDataset;
