import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Utensils, 
  Wifi, 
  Copy, 
  Check, 
  MessageSquare
} from 'lucide-react';

const AeoEngine: React.FC = () => {
  const { selectedProperty } = useApp();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeFaqTab, setActiveFaqTab] = useState<'aeo' | 'social' | 'seo' | 'booking'>('aeo');

  const propertyName = selectedProperty?.name || 'Ghandruk Serenity Lodge';

  const faqPairs = [
    {
      id: 'faq1',
      context: 'Proximity',
      q: 'What is the exact distance from the Ghandruk trail?',
      a: 'The homestay is located precisely a 4-minute walk from the main Ghandruk trail entrance. This proximity allows for easy luggage transport while maintaining a quiet atmosphere away from the heavy foot traffic of the main thoroughfare.'
    },
    {
      id: 'faq2',
      context: 'Gastronomy',
      q: 'What local food is served?',
      a: 'We serve authentic Gurung cuisine, including local dhido and organic chicken sourced from our village. All vegetables are seasonal and harvested from the surrounding terraces, ensuring a true farm-to-table experience that reflects the culinary heritage of the Annapurna region.'
    },
    {
      id: 'faq3',
      context: 'Infrastructure',
      q: 'Is there high-speed internet for remote work?',
      a: 'Yes, we provide high-speed Starlink internet connectivity suitable for digital nomads. Our infrastructure supports video conferencing and large file transfers, making our homestay an ideal base for travelers who need to stay productive while enjoying mountain solitude.'
    }
  ];

  const handleCopyPair = (id: string, q: string, a: string) => {
    const copyText = `Q: ${q}\nA: ${a}`;
    navigator.clipboard.writeText(copyText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row overflow-hidden font-body animate-fade-in text-left">
      
      {/* Left Panel: Source Analysis Property Vibe Profile (40% width) */}
      <section className="w-full md:w-2/5 border-r border-[#dac1ba]/20 p-8 flex flex-col gap-6 bg-[#F9F7F2]/40 overflow-y-auto">
        <div className="mb-4">
          <span className="bg-[#d2e6bc] text-[#576846] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider select-none">
            Source Analysis
          </span>
          <h2 className="font-headline text-3xl text-[#181c1d] mt-4 font-bold">Property Vibe Profile</h2>
          <p className="text-xs text-[#54433e]/80 mt-1">Core data harvested from Ghandruk homestay assets.</p>
        </div>

        <div className="flex flex-col gap-5">
          {/* Data Point 1 */}
          <div className="p-6 bg-[#F1EDE4]/50 rounded-3xl border border-[#b58d72]/15">
            <div className="flex justify-between items-start mb-3 select-none">
              <h4 className="text-sm font-bold text-[#181c1d] uppercase tracking-wide">Location & Access</h4>
              <MapPin className="w-5 h-5 text-[#944931] stroke-[1.5]" />
            </div>
            <p className="text-xs text-[#54433e]/90 leading-relaxed font-medium">
              Primary entry via Ghandruk main trail. Steep stone stairs, 4-minute walking distance. High accessibility for standard hikers and local guides.
            </p>
          </div>

          {/* Data Point 2 */}
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-[#dac1ba]/20">
            <div className="flex justify-between items-start mb-3 select-none">
              <h4 className="text-sm font-bold text-[#181c1d] uppercase tracking-wide">Cuisine & Ingredients</h4>
              <Utensils className="w-5 h-5 text-[#944931] stroke-[1.5]" />
            </div>
            <p className="text-xs text-[#54433e]/90 leading-relaxed font-medium">
              Zero-mile sourcing. Signature: Millet Dhido, traditional Gurung Bread, and Local Organic Chicken curry. Kitchen led directly by Ghandruk village matriarchs.
            </p>
          </div>

          {/* Data Point 3 */}
          <div className="p-6 bg-[#F1EDE4]/50 rounded-3xl border border-[#b58d72]/15">
            <div className="flex justify-between items-start mb-3 select-none">
              <h4 className="text-sm font-bold text-[#181c1d] uppercase tracking-wide">Digital Infrastructure</h4>
              <Wifi className="w-5 h-5 text-[#944931] stroke-[1.5]" />
            </div>
            <p className="text-xs text-[#54433e]/90 leading-relaxed font-medium">
              Starlink satellite internet installed. 100Mbps down. Full local power backup for charging cameras, laptops, and mobile devices safely.
            </p>
          </div>
        </div>
      </section>

      {/* Right Panel: Multi-Tab Output Factory (60% width) */}
      <section className="w-full md:w-3/5 bg-white p-8 flex flex-col overflow-y-auto">
        
        {/* Tab Headers */}
        <div className="flex items-center gap-6 border-b border-[#dac1ba]/20 mb-8 overflow-x-auto pb-1 select-none">
          <button 
            onClick={() => setActiveFaqTab('social')}
            className={`px-2 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
              activeFaqTab === 'social' ? 'border-[#944931] text-[#944931]' : 'border-transparent text-[#54433e]/50 hover:text-[#181c1d]'
            }`}
          >
            Social Media Content
          </button>
          
          <button 
            onClick={() => setActiveFaqTab('aeo')}
            className={`px-2 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
              activeFaqTab === 'aeo' ? 'border-[#944931] text-[#944931]' : 'border-transparent text-[#54433e]/50 hover:text-[#181c1d]'
            }`}
          >
            AI Answer Engine (FAQ Focus)
          </button>

          <button 
            onClick={() => setActiveFaqTab('seo')}
            className={`px-2 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
              activeFaqTab === 'seo' ? 'border-[#944931] text-[#944931]' : 'border-transparent text-[#54433e]/50 hover:text-[#181c1d]'
            }`}
          >
            SEO Snippets
          </button>

          <button 
            onClick={() => setActiveFaqTab('booking')}
            className={`px-2 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
              activeFaqTab === 'booking' ? 'border-[#944931] text-[#944931]' : 'border-transparent text-[#54433e]/50 hover:text-[#181c1d]'
            }`}
          >
            Booking Agents
          </button>
        </div>

        {/* Active Content: AEO Citation Magnet */}
        {activeFaqTab === 'aeo' ? (
          <div className="flex-1 flex flex-col justify-between max-w-3xl">
            <div className="flex flex-col gap-8">
              <header>
                <h3 className="font-headline text-3xl text-[#944931] font-bold">AEO Citation Magnet</h3>
                <p className="text-xs text-[#54433e]/80 mt-1.5 leading-relaxed">
                  Structured FAQ engine specifically configured for semantic search crawlers and LLM RAG ingestion models.
                </p>
              </header>

              <div className="flex flex-col gap-6">
                {faqPairs.map((pair) => (
                  <div
                    key={pair.id}
                    className="group p-8 bg-[#f7fafb] rounded-[2rem] border border-[#dac1ba]/25 hover:shadow-lg transition-all relative overflow-hidden"
                  >
                    {/* Visual left highlight */}
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#944931]/20" />

                    <div className="flex justify-between items-center mb-4 select-none">
                      <span className="bg-[#944931]/10 text-[#944931] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Query Context: {pair.context}
                      </span>
                      
                      <button
                        onClick={() => handleCopyPair(pair.id, pair.q, pair.a)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all text-[10px] font-bold ${
                          copiedId === pair.id
                            ? 'bg-[#d2e6bc]/30 border-[#9caf88]/30 text-[#576846]'
                            : 'bg-white border-[#dac1ba]/20 text-[#54433e] hover:text-[#944931] shadow-sm'
                        }`}
                      >
                        {copiedId === pair.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Pair</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex flex-col gap-3 font-body text-left">
                      <h4 className="text-sm font-bold text-[#181c1d] flex gap-2 items-start">
                        <span className="text-[#944931]/40 font-headline italic font-bold">Q:</span>
                        <span>{pair.q}</span>
                      </h4>
                      <div className="flex gap-2 items-start text-xs text-[#54433e]/90 leading-relaxed font-medium">
                        <span className="text-[#526442]/40 font-headline italic font-bold">A:</span>
                        <p>{pair.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Optimization Tip Panel */}
            <div className="mt-12 p-6 bg-[#d2e6bc]/30 border border-[#9caf88]/20 rounded-2xl flex items-center gap-6 select-none animate-fade-in">
              <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 shadow-sm border border-[#9caf88]">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
                  alt="Host Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-[#576846] font-bold text-xs uppercase tracking-wider mb-0.5">Optimization Directive</p>
                <p className="text-[#576846] text-xs leading-relaxed font-medium">
                  These structured Q&A segments are compiled with Schema microdata coordinates to assist generative bots (Perplexity, Google AEO) in citing {propertyName} directly.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-12 text-[#54433e]/60 select-none">
            <MessageSquare className="w-12 h-12 text-[#b58d72]/30 mb-3 stroke-[1.5]" />
            <p className="text-sm">Tab assets successfully prepared. Trigger AI Audit from guides to publish snippet credentials.</p>
          </div>
        )}
      </section>

    </div>
  );
};

export default AppGridWrapper;

// Simple route component wrapper to prevent unused exports or react build conflicts
function AppGridWrapper() {
  return <AeoEngine />;
}
