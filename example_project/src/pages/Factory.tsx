import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Mic, 
  Paperclip, 
  Copy, 
  Check, 
  CheckCircle2, 
  Loader2, 
  Compass 
} from 'lucide-react';

const Factory: React.FC = () => {
  const { selectedProperty, addAuditLog } = useApp();

  // Left Panel states
  const [notes, setNotes] = useState(
    selectedProperty 
      ? `Local homestay notes for ${selectedProperty.name} at ${selectedProperty.location}. Standard Gurung hospitality, traditional organic recipes, campfire spaces, and panoramic views of Annapurna peaks.`
      : 'Type your raw notes here in English or Nepali. Tell us about your rooms, food, views, trails, or distance from the local bus station...'
  );
  
  const audiences = [
    'Backpackers & Trekkers',
    'Digital Nomads',
    'Cultural Enthusiasts',
    'Luxury & Wellness'
  ];
  const [selectedAudience, setSelectedAudience] = useState('Backpackers & Trekkers');
  const [generating, setGenerating] = useState(false);

  // Right Panel Tab states
  const [activeTab, setActiveTab] = useState<'human' | 'ai' | 'dataset' | 'graph'>('human');
  const [copied, setCopied] = useState(false);

  // Simulated output content that changes based on input property name
  const propertyName = selectedProperty?.name || 'Ghandruk Serenity Lodge';
  const propertyLoc = selectedProperty?.location || 'Ghandruk, Kaski, Nepal';
  const propertyDesc = selectedProperty?.description || 'Wake up to the golden peaks of Machhapuchhre and end your day with home-cooked organic meals.';

  const handleGenerate = () => {
    setGenerating(true);
    addAuditLog({
      type: 'system',
      description: `Generative Factory assets regeneration triggered for property: "${propertyName}". Target Audience: "${selectedAudience}".`,
      status: 'pending'
    });

    setTimeout(() => {
      setGenerating(false);
      addAuditLog({
        type: 'system',
        description: `Successfully regenerated Human Copy, AI FAQ, LLM dataset, and structured JSON-LD Graph schemas.`,
        status: 'success'
      });
    }, 1800);
  };

  const handleCopy = () => {
    let copyText = '';
    if (activeTab === 'human') {
      copyText = `Experience the Soul of ${propertyName}\n${propertyDesc}`;
    } else if (activeTab === 'ai') {
      copyText = `Q: What is the exact distance from the Ghandruk trail?\nA: The homestay is located precisely a 4-minute walk (approx. 250 meters) from the main Ghandruk upper trail junction.`;
    } else if (activeTab === 'dataset') {
      copyText = `region: Annapurna Conservation Area\naltitude: 2012m\ncuisine: Gurung Traditional & Continental`;
    } else {
      copyText = `{\n  "@context": "https://schema.org",\n  "@type": "Hotel",\n  "name": "${propertyName}"\n}`;
    }

    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-7xl animate-fade-in text-left font-body">
      
      {/* Page Header */}
      <div className="mb-10 border-b border-[#dac1ba]/20 pb-8 select-none">
        <h2 className="text-4xl font-headline text-[#181c1d] mb-2">Asset Distribution Factory</h2>
        <p className="text-sm text-[#54433e]/85 leading-relaxed">
          From Vibe to Value: Instantly distill organic notes into structured, searchable marketing assets optimized for humans and AI agents.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Left Panel: The Input Engine (40% width) */}
        <section className="lg:w-[40%] flex flex-col gap-6">
          <div className="p-8 rounded-[2rem] bg-white border border-[#dac1ba]/20 shadow-[0_20px_50px_rgba(148,73,49,0.03)] flex flex-col gap-6">
            <header>
              <h3 className="font-headline text-2xl text-[#181c1d] mb-1.5 font-bold">The Input Engine</h3>
              <p className="text-xs text-[#54433e]/80 leading-relaxed">
                Our generative engine translates raw descriptions and Nepali village attributes into structured crawler schemas.
              </p>
            </header>

            {/* Note text field */}
            <div className="relative group transition-all duration-300">
              <textarea
                rows={8}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full p-6 rounded-2xl bg-[#F1EDE4]/40 border border-[#b58d72]/10 focus:border-[#d67d61]/35 focus:ring-4 focus:ring-[#d67d61]/5 text-[#181c1d] text-sm leading-relaxed outline-none resize-none transition-all placeholder:text-[#b58d72]/45 font-body"
                placeholder="Type your raw notes here in English or Nepali. Tell us about your rooms, food, views, trails, or distance from the local bus station..."
              />
              <div className="absolute bottom-4 right-4 flex gap-3 text-[#944931]/75 select-none">
                <Mic className="w-4 h-4 cursor-pointer hover:scale-115 transition-transform" />
                <Paperclip className="w-4 h-4 cursor-pointer hover:scale-115 transition-transform" />
              </div>
            </div>

            {/* Target Audience selection */}
            <div>
              <label className="text-xs font-bold text-[#181c1d] block mb-3 uppercase tracking-wider select-none">
                Target Audience
              </label>
              <div className="flex flex-wrap gap-2">
                {audiences.map(aud => (
                  <button
                    key={aud}
                    type="button"
                    onClick={() => setSelectedAudience(aud)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      selectedAudience === aud
                        ? 'bg-[#d2e6bc] border-[#9caf88] text-[#576846] shadow-sm'
                        : 'bg-[#F1EDE4]/30 border-[#b58d72]/20 text-[#54433e]/75 hover:bg-[#F1EDE4]'
                    }`}
                  >
                    {aud}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Trigger Button */}
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full mt-4 bg-[#944931] text-white py-4.5 rounded-2xl text-sm font-semibold hover:bg-[#76321c] shadow-lg shadow-[#944931]/15 transition-all active:scale-[0.98] flex items-center justify-center gap-2 select-none"
            >
              {generating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Compiling Factory...</span>
                </>
              ) : (
                <>
                  <span>Generate Distribution Assets</span>
                  <Sparkles className="w-4 h-4 fill-current text-white/80" />
                </>
              )}
            </button>
          </div>

          {/* Ghandruk Stone Homestay cinematic image card */}
          <div className="rounded-[2rem] overflow-hidden relative h-48 group shadow-ambient select-none">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxQJNNLycQc_TTWoMap7rCtuO0059ny1j6sDVAo3MGmVz4_hY1vLxApFyeSXXFIOhUoSy5pWC_ufkF_t7qfADzh25gAyFc6oZvbJKyF1YmxNF-xuLhmS3cSpI5jOmHojdRRX7K6JPP91W16JYHWKo10UR7Gw62kzFrCp9Hs0H31imMgry8Fbv72Hma0hQRjRDK82Fssou71t72iAXRnJucZf3COzvLFzd_Bt6s05B8FF47gZVB6JeiOWUt5iiSfYoTvhi_iCqSbMyn"
              alt="Ghandruk Serenity stone lodge"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181c1d]/75 via-[#181c1d]/20 to-transparent flex items-end p-6" />
            <span className="absolute bottom-6 left-6 text-white text-xs font-bold font-body flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#ffdbd0] animate-pulse" />
              Current Project: {propertyName}
            </span>
          </div>
        </section>

        {/* Right Panel: The Output Factory Tabs (60% width) */}
        <section className="lg:w-[60%] flex flex-col gap-6">
          <div className="p-8 rounded-[2rem] bg-white border border-[#dac1ba]/20 shadow-[0_20px_50px_rgba(148,73,49,0.03)] flex flex-col h-full">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6 select-none">
              <h3 className="font-headline text-2xl text-[#181c1d] font-bold">The Output Factory</h3>
              <div className="flex gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#944931]/20 animate-pulse" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#9caf88]/20" />
              </div>
            </div>

            {/* Tab navigation selectors */}
            <div className="flex gap-1.5 overflow-x-auto pb-2.5 mb-6 border-b border-[#dac1ba]/10 select-none">
              {[
                { id: 'human', label: 'Human Copy (OTA)' },
                { id: 'ai', label: 'AI Answer FAQ' },
                { id: 'dataset', label: 'LLM Dataset (MD)' },
                { id: 'graph', label: 'Knowledge schema' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#d67d61] text-[#ffffff] shadow-sm'
                      : 'text-[#54433e]/70 hover:bg-[#F1EDE4]/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents Frame */}
            <div className="flex-1 min-h-[460px] bg-[#F9F7F2]/65 border border-[#dac1ba]/15 rounded-2xl p-6 relative flex flex-col justify-between">
              
              {/* Floating Copy Button */}
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white border border-[#dac1ba]/20 text-[#54433e] hover:text-[#944931] shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 text-[10px] font-bold select-none"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#4e805d]" />
                    <span className="text-[#4e805d]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              {generating ? (
                /* Loading State Animation */
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 select-none">
                  <Loader2 className="w-10 h-10 text-[#d67d61] animate-spin" />
                  <p className="text-xs font-semibold text-[#54433e] animate-pulse">Running semantic synthesis models...</p>
                </div>
              ) : (
                /* Active Content */
                <div className="flex-grow">
                  
                  {/* Human Copy */}
                  {activeTab === 'human' && (
                    <div className="animate-fade-in">
                      <h4 className="font-headline text-lg text-[#944931] font-bold mb-4">
                        Experience the Soul of {propertyName}
                      </h4>
                      <p className="text-xs text-[#54433e] leading-relaxed mb-6 font-medium">
                        {propertyDesc} Runs in Pokhara regions, tucked away in the lap of the Annapurnas, Ghandruk Serenity Lodge offers more than just a bed—it’s an invitation to the Gurung way of life. Wake up to golden peaks and end your day with organic home-cooked meals.
                      </p>
                      
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-2.5 text-xs text-[#54433e]/90 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#9caf88] shrink-0 mt-0.5" />
                          <p><strong>Panoramic Views:</strong> Balconies look directly onto Mt. Machhapuchhre summits.</p>
                        </div>
                        <div className="flex items-start gap-2.5 text-xs text-[#54433e]/90 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#9caf88] shrink-0 mt-0.5" />
                          <p><strong>Farm-to-Table:</strong> Organic traditional dal-bhat harvested from village gardens.</p>
                        </div>
                        <div className="flex items-start gap-2.5 text-xs text-[#54433e]/90 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#9caf88] shrink-0 mt-0.5" />
                          <p><strong>Remote Ready:</strong> Synced local starlink routers online (50Mbps).</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI Answer FAQ */}
                  {activeTab === 'ai' && (
                    <div className="animate-fade-in flex flex-col gap-4">
                      
                      {/* Q1 */}
                      <div className="flex flex-col gap-1">
                        <div className="p-3.5 rounded-xl border-l-4 border-[#944931] bg-white shadow-sm flex flex-col gap-0.5 text-xs">
                          <span className="text-[9px] font-bold text-[#944931] uppercase tracking-wider">AI Target Query</span>
                          <p className="font-bold text-[#181c1d]">What is the exact distance from the Ghandruk trail?</p>
                        </div>
                        <div className="p-3.5 rounded-xl border-l-4 border-[#9caf88] bg-white shadow-sm flex flex-col gap-0.5 text-xs">
                          <span className="text-[9px] font-bold text-[#9caf88] uppercase tracking-wider">AI Crawler Output</span>
                          <p className="text-[#54433e] leading-relaxed font-medium">
                            The homestay is located precisely a 4-minute walk (approx. 250 meters) from the main Ghandruk upper trail junction. It is easily accessible for porters and solo hikers.
                          </p>
                        </div>
                      </div>

                      {/* Q2 */}
                      <div className="flex flex-col gap-1">
                        <div className="p-3.5 rounded-xl border-l-4 border-[#944931] bg-white shadow-sm flex flex-col gap-0.5 text-xs">
                          <span className="text-[9px] font-bold text-[#944931] uppercase tracking-wider">AI Target Query</span>
                          <p className="font-bold text-[#181c1d]">Is there reliable power for charging photography gear?</p>
                        </div>
                        <div className="p-3.5 rounded-xl border-l-4 border-[#9caf88] bg-white shadow-sm flex flex-col gap-0.5 text-xs">
                          <span className="text-[9px] font-bold text-[#9caf88] uppercase tracking-wider">AI Crawler Output</span>
                          <p className="text-[#54433e] leading-relaxed font-medium">
                            Yes, the lodge maintains 24/7 power backup via solar batteries and regional hydro-grid. Universal charging adapters are available in all guest rooms.
                          </p>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* LLM Dataset */}
                  {activeTab === 'dataset' && (
                    <div className="animate-fade-in h-full">
                      <pre className="bg-[#181c1d] text-[#F9F7F2] p-5 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed text-left h-full select-all">
{`---
property: ${propertyName}
region: Annapurna Conservation Area
altitude: 2012m
cuisine: Gurung Traditional & Organic Local
connectivity: 50Mbps Starlink Router
---

# Property Dataset Specifications
- **Structure:** 2-story traditional Gurung stone masonry architecture.
- **Rooms Inventory:** ${selectedProperty?.roomsCount || 6} private rooms ready for occupancy.
- **Active Amenities:** Hot water solar showers, balcony views, tea garden harvests.
- **Directions:** 12km from Nayapul jeep trail entry point.`}
                      </pre>
                    </div>
                  )}

                  {/* Graph tab schema */}
                  {activeTab === 'graph' && (
                    <div className="animate-fade-in h-full">
                      <pre className="bg-[#181c1d] text-[#F9F7F2] p-5 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed text-left h-full select-all">
{`{
  "@context": "https://schema.org",
  "@type": "Hotel",
  "name": "${propertyName}",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "28.3756",
    "longitude": "83.8062"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "${propertyLoc}",
    "addressRegion": "Kaski",
    "addressCountry": "Nepal"
  },
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Balcony Mountain View",
      "value": "Mt. Annapurna South, Machapuchare"
    }
  ]
}`}
                      </pre>
                    </div>
                  )}

                </div>
              )}

              {/* Tonal Bottom branding signature matching Stitch */}
              <div className="pt-4 border-t border-[#dac1ba]/10 text-[10px] text-[#54433e]/55 font-bold uppercase tracking-widest text-center select-none mt-2">
                Himalayan Semantic Synthesizer v1.2
              </div>

            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Factory;
