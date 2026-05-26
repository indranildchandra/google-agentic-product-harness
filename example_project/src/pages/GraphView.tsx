import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Share2, 
  HelpCircle, 
  Code, 
  MapPin, 
  Sparkles, 
  Copy, 
  Check, 
  GitBranch,
  Bot,
  ArrowRight
} from 'lucide-react';
import type { GraphNode as GNode } from '../types';

const GraphView: React.FC = () => {
  const { graphNodes, graphLinks, selectedProperty, addAuditLog } = useApp();

  const [activePortal, setActivePortal] = useState<'mesh' | 'schema'>('mesh');

  // Mesh visualizer states
  const [selectedNode, setSelectedNode] = useState<GNode | null>(null);
  const [hoverNodeId, setHoverNodeId] = useState<string | null>(null);

  // Schema builder states
  const [narrative, setNarrative] = useState(
    selectedProperty
      ? `A sun-drenched organic homestay in Ghandruk overlooking the majestic Annapurna South peaks. Offering authentic Gurung culture cooking classes and Starlink connectivity for remote workers.`
      : 'A sun-drenched lodge in Ghandruk overlooking the Annapurna range with Starlink for remote nomads.'
  );
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const propertyName = selectedProperty?.name || 'Ghandruk Serenity Lodge';
  const propertyLoc = selectedProperty?.location || 'Ghandruk, Kaski, Nepal';

  const nodePositions: Record<string, { x: number; y: number }> = {
    'prop-1': { x: 300, y: 220 },
    'host-1': { x: 150, y: 150 },
    'att-1': { x: 450, y: 130 },
    'att-2': { x: 450, y: 320 },
    'exp-1': { x: 120, y: 300 },
    'exp-2': { x: 300, y: 380 },
    'lia-1': { x: 180, y: 50 }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'host':
        return '#9caf88';
      case 'property':
        return '#d67d61';
      case 'attraction':
        return '#b58d72';
      case 'experience':
        return '#d99152';
      default:
        return '#79573f';
    }
  };

  const handleGenerateGraph = () => {
    setGenerating(true);
    addAuditLog({
      type: 'system',
      description: `Structured Knowledge Graph semantic hooks generation started for "${propertyName}".`,
      status: 'pending'
    });

    setTimeout(() => {
      setGenerating(false);
      addAuditLog({
        type: 'system',
        description: `Knowledge Graph JSON-LD schema compiled (B&B standard). Entity linkages confirmed with Wikidata.`,
        status: 'success'
      });
    }, 1500);
  };

  const handleCopySchema = () => {
    const schemaText = `{
  "@context": "https://schema.org",
  "@type": "BedAndBreakfast",
  "name": "${propertyName}",
  "location": {
    "@type": "Place",
    "name": "${propertyLoc}",
    "sameAs": "https://en.wikipedia.org/wiki/Ghandruk"
  },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "View of Annapurna South", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Starlink Internet", "value": true }
  ]
}`;

    navigator.clipboard.writeText(schemaText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-7xl animate-fade-in text-left font-body">
      
      {/* Header with Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-[#dac1ba]/20 pb-8 select-none">
        <div>
          <h2 className="text-4xl font-headline text-[#181c1d] mb-2">Hospitality Knowledge Graph</h2>
          <p className="text-sm text-[#54433e]/85 leading-relaxed">
            Machine semantic cataloging. Switch between visual node mappings and structured JSON-LD crawler schemas.
          </p>
        </div>

        <div className="flex bg-[#F1EDE4]/60 p-1.5 rounded-2xl border border-[#dac1ba]/30 shadow-sm self-start">
          <button
            onClick={() => setActivePortal('mesh')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activePortal === 'mesh'
                ? 'bg-white text-[#944931] shadow-sm'
                : 'text-[#54433e]/70 hover:text-[#181c1d]'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Visual Node Mesh</span>
          </button>
          <button
            onClick={() => setActivePortal('schema')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activePortal === 'schema'
                ? 'bg-white text-[#944931] shadow-sm'
                : 'text-[#54433e]/70 hover:text-[#181c1d]'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Entity Schema Builder</span>
          </button>
        </div>
      </div>

      {/* PORTAL 1: SVG Visual Node Mesh */}
      {activePortal === 'mesh' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-fade-in">
          <div className="lg:col-span-3 bg-[#F9F7F2] border border-[#dac1ba]/30 rounded-3xl p-6 shadow-ambient flex flex-col justify-between relative overflow-hidden select-none min-h-[500px]">
            <div className="flex justify-between items-center mb-4 z-10">
              <span className="text-[10px] font-bold text-[#b58d72] uppercase tracking-wider flex items-center gap-1.5 bg-white border border-[#dac1ba]/20 px-3 py-1.5 rounded-xl shadow-ambient">
                <Share2 className="w-3.5 h-3.5" />
                Interactive Entity Mesh
              </span>
              <span className="text-[9px] text-[#54433e]/50 font-bold uppercase tracking-wider">
                Hover or Click bubbles to inspect local tourism dependencies
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center relative w-full h-[400px]">
              <svg 
                className="w-full h-full min-h-[400px] border border-[#dac1ba]/10 rounded-2xl bg-white/50 backdrop-blur-[6px]"
                viewBox="0 0 600 450"
              >
                <defs>
                  <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="18"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#dac1ba" />
                  </marker>
                </defs>

                {graphLinks.map((link, idx) => {
                  const start = nodePositions[link.source];
                  const end = nodePositions[link.target];
                  if (!start || !end) return null;

                  const isHovered = hoverNodeId === link.source || hoverNodeId === link.target;

                  return (
                    <g key={idx}>
                      <line
                        x1={start.x}
                        y1={start.y}
                        x2={end.x}
                        y2={end.y}
                        stroke={isHovered ? '#d67d61' : '#dac1ba'}
                        strokeWidth={isHovered ? '2' : '1'}
                        strokeDasharray={link.weight === 3 ? '4,4' : 'none'}
                        opacity={hoverNodeId ? (isHovered ? 1 : 0.25) : 0.7}
                        className="transition-all duration-300"
                        markerEnd="url(#arrow)"
                      />
                      <text
                        x={(start.x + end.x) / 2}
                        y={(start.y + end.y) / 2 - 5}
                        fill="#54433e"
                        fontSize="9"
                        fontWeight="600"
                        textAnchor="middle"
                        opacity={hoverNodeId ? (isHovered ? 1 : 0) : 0.6}
                        className="font-body transition-opacity duration-300 pointer-events-none"
                      >
                        {link.label}
                      </text>
                    </g>
                  );
                })}

                {graphNodes.map((node) => {
                  const pos = nodePositions[node.id];
                  if (!pos) return null;

                  const isSelected = selectedNode?.id === node.id;
                  const isHovered = hoverNodeId === node.id;
                  const dim = hoverNodeId && !isHovered && !isSelected;

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${pos.x}, ${pos.y})`}
                      className="cursor-pointer group"
                      onClick={() => setSelectedNode(node)}
                      onMouseEnter={() => setHoverNodeId(node.id)}
                      onMouseLeave={() => setHoverNodeId(null)}
                    >
                      <circle
                        r={isSelected ? '18' : '15'}
                        fill="transparent"
                        stroke={getNodeColor(node.type)}
                        strokeWidth="2"
                        opacity={isSelected || isHovered ? 1 : 0}
                        className="transition-all duration-300"
                      />

                      <circle
                        r={isSelected ? '13' : '10'}
                        fill={getNodeColor(node.type)}
                        opacity={dim ? 0.35 : 1}
                        className="transition-all duration-300"
                      />

                      <text
                        y={isSelected ? '32' : '26'}
                        fill="#181c1d"
                        fontSize={isSelected ? '10' : '9'}
                        fontWeight={isSelected ? '700' : '500'}
                        textAnchor="middle"
                        opacity={dim ? 0.35 : 1}
                        className="font-body transition-all duration-300 filter drop-shadow-sm select-none"
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="flex gap-4 border-t border-[#dac1ba]/20 pt-4 text-[9px] font-bold uppercase tracking-wider font-body text-[#54433e]/70">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#d67d61]" /><span>Lodge</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#9caf88]" /><span>Host</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#b58d72]" /><span>Attraction</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#d99152]" /><span>Experience</span></div>
            </div>
          </div>

          <div className="flex flex-col gap-6 font-body text-left">
            {selectedNode ? (
              <div className="bg-white border border-[#dac1ba]/20 rounded-3xl p-6 shadow-ambient flex flex-col gap-4 animate-fade-in">
                <div>
                  <span 
                    className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${getNodeColor(selectedNode.type)}15`,
                      color: getNodeColor(selectedNode.type)
                    }}
                  >
                    {selectedNode.type}
                  </span>
                  <h3 className="text-xl font-headline text-[#181c1d] mt-2 font-bold leading-snug">{selectedNode.label}</h3>
                </div>
                <div className="border-t border-[#dac1ba]/10 pt-4 flex flex-col gap-3">
                  <div>
                    <span className="text-[10px] text-[#54433e]/50 font-bold uppercase block mb-1">Description</span>
                    <p className="text-xs text-[#54433e]/90 leading-relaxed font-semibold">{selectedNode.description || 'Verified local Gurung coordinate.'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#54433e]/50 font-bold uppercase block mb-1.5">AEO Readiness</span>
                    <span className="px-2.5 py-1 rounded-xl bg-[#9caf88]/10 text-[#4e805d] text-xs font-bold inline-block">✓ Synthesized</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#dac1ba]/20 rounded-3xl p-6 shadow-ambient flex flex-col items-center justify-center text-center min-h-[300px] select-none text-[#54433e]/60">
                <HelpCircle className="w-10 h-10 text-[#b58d72]/30 mb-3 stroke-[1.5]" />
                <p className="text-xs">Click on any visual bubble to inspect semantic coordinates.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PORTAL 2: Entity Schema Builder */}
      {activePortal === 'schema' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
          
          {/* Left panel: Input engine (5 cols) */}
          <section className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div className="bg-white rounded-[2rem] p-8 shadow-ambient border border-[#dac1ba]/20 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d2e6bc] flex items-center justify-center text-[#526442] select-none">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-headline text-xl text-[#181c1d] font-bold">Input Engine</h3>
              </div>

              <div className="flex flex-col gap-4 font-body">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#54433e]/70 ml-1">Property Narrative</label>
                  <textarea
                    rows={5}
                    value={narrative}
                    onChange={e => setNarrative(e.target.value)}
                    className="w-full bg-[#F1EDE4]/30 border border-[#b58d72]/20 rounded-2xl p-4 focus:ring-2 focus:ring-[#944931] outline-none transition-all resize-none text-xs font-semibold text-[#181c1d] leading-relaxed"
                    placeholder="Describe the soul of your stay..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#54433e]/70 ml-1">Vibe Tags</label>
                    <div className="flex flex-wrap gap-1.5 select-none">
                      <span className="bg-[#9caf88]/15 text-[#526442] px-2.5 py-1 rounded-full text-[10px] font-bold border border-[#9caf88]/10">Serene</span>
                      <span className="bg-[#9caf88]/15 text-[#526442] px-2.5 py-1 rounded-full text-[10px] font-bold border border-[#9caf88]/10">Remote</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 select-none">
                    <label className="text-xs font-bold text-[#54433e]/70 ml-1">Location Node</label>
                    <div className="bg-[#F1EDE4]/30 border border-[#b58d72]/20 rounded-xl px-3 py-2 flex items-center gap-1.5 text-xs text-[#181c1d] font-bold">
                      <MapPin className="w-3.5 h-3.5 text-[#944931]" />
                      <span>{propertyLoc.split(',')[0]}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGenerateGraph}
                  disabled={generating}
                  className="w-full bg-[#181c1d] text-[#F9F7F2] py-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#54433e] transition-colors select-none"
                >
                  <span>Generate Graph Schema</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Balcony visual preview card */}
            <div className="relative h-60 rounded-[2rem] overflow-hidden group shadow-ambient select-none">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600"
                alt="balcony Annapurna sunrise"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6" />
              <div className="absolute bottom-6 left-6 text-white text-left font-body">
                <span className="text-[9px] text-white/70 uppercase tracking-widest block font-bold mb-0.5">Active Context</span>
                <h4 className="font-headline text-lg font-bold">{propertyName}</h4>
              </div>
            </div>
          </section>

          {/* Right panel: Tabbed schema pre visualizer (7 cols) */}
          <section className="lg:col-span-7 flex flex-col h-full text-left">
            <div className="bg-white rounded-[2rem] border border-[#dac1ba]/20 p-8 shadow-ambient flex flex-col h-full">
              
              <div className="flex justify-between items-center mb-6 border-b border-[#dac1ba]/10 pb-5">
                <div>
                  <h3 className="font-headline text-2xl text-[#944931] font-bold">Structured Entity Hooks</h3>
                  <p className="text-[11px] text-[#54433e]/85 leading-relaxed font-medium">
                    Structured JSON-LD schema linking local parameters directly to global travel catalogs.
                  </p>
                </div>

                <button
                  onClick={handleCopySchema}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all text-[10px] font-bold select-none ${
                    copied
                      ? 'bg-[#d2e6bc]/30 border-[#9caf88]/30 text-[#576846]'
                      : 'bg-white border-[#dac1ba]/20 text-[#54433e] hover:text-[#944931] shadow-sm'
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
                      <span>Copy Schema</span>
                    </>
                  )}
                </button>
              </div>

              {/* JSON Pre box */}
              <div className="bg-[#2D2421] rounded-3xl p-8 relative overflow-hidden group select-all min-h-[320px]">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                  <Share2 className="w-24 h-24 text-white" />
                </div>
                
                <pre className="font-mono text-xs leading-relaxed text-white overflow-x-auto text-left">
{`{
  `}
<span className="text-[#ffdbd0]">"@context"</span>: <span className="text-[#9caf88]">"https://schema.org"</span>,
  <span className="text-[#ffdbd0]">"@type"</span>: <span className="text-[#9caf88]">"BedAndBreakfast"</span>,
  <span className="text-[#ffdbd0]">"name"</span>: <span className="text-[#9caf88]">"${propertyName}"</span>,
  <span className="text-[#ffdbd0]">"location"</span>: {`{
    `}
<span className="text-[#ffdbd0]">"@type"</span>: <span className="text-[#9caf88]">"Place"</span>,
    <span className="text-[#ffdbd0]">"name"</span>: <span className="text-[#9caf88]">"${propertyLoc}"</span>,
    <span className="text-[#ffdbd0]">"sameAs"</span>: <span className="text-[#9caf88]">"https://en.wikipedia.org/wiki/Ghandruk"</span>
  {`},
  `}
<span className="text-[#ffdbd0]">"amenityFeature"</span>: {`[
    { `}
<span className="text-[#ffdbd0]">"@type"</span>: <span className="text-[#9caf88]">"LocationFeatureSpecification"</span>, <span className="text-[#ffdbd0]">"name"</span>: <span className="text-[#9caf88]">"View of Annapurna South"</span>, <span className="text-[#ffb59e]">"value"</span>: <span className="text-[#b58d72] font-bold">true</span> {`},
    { `}
<span className="text-[#ffdbd0]">"@type"</span>: <span className="text-[#9caf88]">"LocationFeatureSpecification"</span>, <span className="text-[#ffdbd0]">"name"</span>: <span className="text-[#9caf88]">"Starlink Internet"</span>, <span className="text-[#ffb59e]">"value"</span>: <span className="text-[#b58d72] font-bold">true</span> {`}
  ]
}`}
                </pre>
              </div>

              {/* Knowledge Connection cards at bottom */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left select-none">
                <div className="p-5 bg-[#F1EDE4]/40 border border-[#b58d72]/15 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#181c1d] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <GitBranch className="w-4 h-4 text-[#944931]" />
                      Entity Links
                    </h4>
                    <p className="text-[11px] text-[#54433e]/85 leading-relaxed font-semibold">Direct semantic alignments mapping to regional travel ontologies.</p>
                  </div>
                  <span className="px-2.5 py-1 bg-white rounded-lg text-[9px] font-bold text-[#944931] uppercase tracking-widest inline-block mt-3 w-fit">
                    Wikidata: Q2361730
                  </span>
                </div>

                <div className="p-5 bg-[#F1EDE4]/40 border border-[#b58d72]/15 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#181c1d] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Bot className="w-4 h-4 text-[#526442]" />
                      LLM Context Ready
                    </h4>
                    <p className="text-[11px] text-[#54433e]/85 leading-relaxed font-semibold">Verified output indexing rate for Gemini & GPT conversational citations.</p>
                  </div>
                  <div className="flex items-center gap-2 text-[#526442] font-bold text-[9px] uppercase mt-3">
                    <span className="w-2 h-2 rounded-full bg-[#526442] animate-pulse"></span>
                    <span>Readiness: 100%</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

        </div>
      )}

    </div>
  );
};

export default GraphView;
