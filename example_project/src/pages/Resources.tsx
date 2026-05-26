import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Database, 
  Camera, 
  Cpu, 
  CheckCircle, 
  ArrowRight, 
  Award, 
  Scale, 
  Folder, 
  Upload, 
  Search, 
  Check, 
  CloudLightning,
  ImageIcon,
  FileText,
  FileSpreadsheet
} from 'lucide-react';

const Resources: React.FC = () => {
  const { resourceFiles, addResourceFile } = useApp();

  const [activePortal, setActivePortal] = useState<'guides' | 'vault'>('guides');

  // Vault/Uploader Tab states
  const [activeFolderTab, setActiveFolderTab] = useState<'All' | 'Gallery' | 'Documents' | 'Marketing'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState<'image' | 'pdf' | 'document'>('image');
  const [fileFolder, setFileFolder] = useState<'Gallery' | 'Documents' | 'Marketing' | 'Certificates'>('Gallery');
  const [fileSize, setFileSize] = useState('2.5 MB');

  // Audit loading state
  const [auditing, setAuditing] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);

  const folders = ['All', 'Gallery', 'Documents', 'Marketing'] as const;

  const filteredFiles = resourceFiles.filter((file) => {
    const matchesTab = activeFolderTab === 'All' || file.folder === activeFolderTab;
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) return;

    let name = fileName;
    if (fileType === 'image' && !name.endsWith('.jpg')) name += '.jpg';
    if (fileType === 'pdf' && !name.endsWith('.pdf')) name += '.pdf';
    if (fileType === 'document' && !name.endsWith('.txt')) name += '.txt';

    addResourceFile({
      name,
      type: fileType,
      size: fileSize,
      folder: fileFolder,
      url: '#'
    });

    setFileName('');
    setShowUploadForm(false);
  };

  const triggerAudit = () => {
    setAuditing(true);
    setTimeout(() => {
      setAuditing(false);
      setAuditComplete(true);
      setTimeout(() => setAuditComplete(false), 3000);
    }, 2000);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-5 h-5 text-[#d67d61]" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-[#ba1a1a]" />;
      default:
        return <FileSpreadsheet className="w-5 h-5 text-[#b58d72]" />;
    }
  };

  return (
    <div className="p-8 max-w-7xl animate-fade-in text-left font-body">
      
      {/* Tab controls: Guides vs Vault */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-[#dac1ba]/20 pb-8 select-none">
        <div>
          <h2 className="text-4xl font-headline text-[#181c1d] mb-2">Workspace Resources</h2>
          <p className="text-sm text-[#54433e]/80 leading-relaxed">
            Boutique Host Portal: Learn best practices for AI ranking or manage active marketing assets in the vault.
          </p>
        </div>

        <div className="flex bg-[#F1EDE4]/60 p-1.5 rounded-2xl border border-[#dac1ba]/30 shadow-sm self-start">
          <button
            onClick={() => setActivePortal('guides')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activePortal === 'guides'
                ? 'bg-white text-[#944931] shadow-sm'
                : 'text-[#54433e]/70 hover:text-[#181c1d]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Knowledge Guides</span>
          </button>
          <button
            onClick={() => setActivePortal('vault')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activePortal === 'vault'
                ? 'bg-white text-[#944931] shadow-sm'
                : 'text-[#54433e]/70 hover:text-[#181c1d]'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Lodge Asset Vault</span>
          </button>
        </div>
      </div>

      {/* PORTAL 1: Breathtaking Bento Grid Guides */}
      {activePortal === 'guides' && (
        <div className="animate-fade-in flex flex-col gap-10">
          
          {/* Main Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* Photography Masterclass (8 cols) */}
            <div className="md:col-span-8 group cursor-pointer relative rounded-[2rem] overflow-hidden shadow-ambient hover:shadow-hover border border-[#dac1ba]/25 h-[400px] transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200"
                alt="Photography Best Practices"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181c1d]/90 via-[#181c1d]/30 to-transparent flex flex-col justify-end p-8" />
              <div className="absolute bottom-8 left-8 flex flex-col items-start text-left z-10 select-none">
                <span className="bg-[#944931] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5 shadow-sm">
                  <Camera className="w-3.5 h-3.5" />
                  Masterclass
                </span>
                <h3 className="font-headline text-3xl text-white font-bold mb-2">
                  Photography Best Practices
                </h3>
                <p className="text-white/80 text-xs leading-relaxed max-w-lg font-medium">
                  Capture the soul of your space. Learn how to use warm natural light and local Gurung stone textures to create high-converting booking imagery.
                </p>
              </div>
            </div>

            {/* AI Search AEO Card (4 cols) */}
            <div className="md:col-span-4 group cursor-pointer bg-[#d2e6bc] hover:bg-[#b9cda4] p-8 rounded-[2rem] shadow-ambient hover:shadow-hover border border-[#9caf88]/20 transition-all duration-300 flex flex-col justify-between">
              <div className="text-left">
                <div className="w-12 h-12 rounded-2xl bg-[#526442] text-[#d2e6bc] flex items-center justify-center mb-6 shadow-sm">
                  <Cpu className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-headline text-2xl text-[#111f05] mb-3 leading-snug font-bold">
                  What is AI Search (AEO)?
                </h3>
                <p className="text-[#111f05]/75 text-xs leading-relaxed font-medium">
                  Learn how Answer Engine Optimization helps potential guests discover your homestay organically through conversational AI engines like ChatGPT and Gemini.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-[#111f05] font-bold text-xs group-hover:gap-4 transition-all uppercase tracking-wider select-none">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Airbnb Tips Card (6 cols) */}
            <div className="md:col-span-6 bg-[#F1EDE4]/70 p-8 rounded-[2rem] border border-[#b58d72]/20 shadow-ambient hover:shadow-hover transition-all duration-300 flex flex-col md:flex-row gap-6 items-stretch">
              <div className="flex-1 flex flex-col justify-between text-left">
                <div>
                  <h3 className="font-headline text-2xl text-[#944931] mb-3 font-bold">
                    Airbnb & Booking Tips
                  </h3>
                  <p className="text-[#54433e]/85 text-xs leading-relaxed mb-6 font-medium">
                    Optimization strategies for high-ranking listings. From dynamic village pricing matrices to establishing a Superhost profile.
                  </p>
                  <ul className="flex flex-col gap-2.5 text-xs text-[#54433e]/90 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#944931] shrink-0" />
                      <span>Keyword-rich local descriptors</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#944931] shrink-0" />
                      <span>Review management automations</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full md:w-44 h-44 rounded-2xl overflow-hidden shrink-0 shadow-sm select-none">
                <img
                  src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400"
                  alt="Hospitality Tea Mug"
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
            </div>

            {/* Guidelines Card (6 cols) */}
            <div className="md:col-span-6 bg-[#b48c71]/10 p-8 rounded-[2rem] border border-[#b48c71]/25 shadow-ambient hover:shadow-hover transition-all duration-300 flex flex-col md:flex-row gap-6 items-stretch">
              <div className="flex-1 flex flex-col justify-between text-left">
                <div>
                  <h3 className="font-headline text-2xl text-[#79573f] mb-3 font-bold">
                    Nepali Homestay Rules
                  </h3>
                  <p className="text-[#54433e]/85 text-xs leading-relaxed mb-6 font-medium">
                    Ensuring local cultural integrity while satisfying modern quality standards. A standard roadmap for regional village expansion.
                  </p>
                  <div className="flex gap-2 flex-wrap select-none">
                    <span className="px-3 py-1 bg-white border border-[#b48c71]/35 rounded-full text-[10px] font-bold text-[#79573f] uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      Culture
                    </span>
                    <span className="px-3 py-1 bg-white border border-[#b48c71]/35 rounded-full text-[10px] font-bold text-[#79573f] uppercase tracking-wider flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5" />
                      Legal
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-44 h-44 rounded-2xl overflow-hidden shrink-0 shadow-sm select-none">
                <img
                  src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=400"
                  alt="Nepali wooden window detail"
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
            </div>

          </div>

          {/* Coaching Audit Footer Banner */}
          <section className="bg-[#944931] p-8 md:p-12 rounded-[2.5rem] text-[#ffffff] flex flex-col md:flex-row items-center justify-between gap-8 shadow-ambient select-none">
            <div className="max-w-xl text-left">
              <h3 className="font-headline text-3xl mb-3 font-bold">Need Personalized Coaching?</h3>
              <p className="text-white/80 text-sm leading-relaxed font-body font-medium">
                Our Generative Auditor analyzes your active listings and outlines a custom optimization roadmap tailored to your specific Ghandruk/Pokhara valley coordinates.
              </p>
            </div>
            <button
              onClick={triggerAudit}
              disabled={auditing}
              className={`px-8 py-4 rounded-full text-sm font-bold shadow-xl transition-all transform active:scale-95 shrink-0 ${
                auditing
                  ? 'bg-white/40 text-white cursor-not-allowed shadow-none'
                  : 'bg-white text-[#944931] hover:bg-[#F9F7F2]'
              }`}
            >
              {auditing ? 'Auditing System...' : auditComplete ? '✓ Report Generated' : 'Start AI Audit'}
            </button>
          </section>

        </div>
      )}

      {/* PORTAL 2: The Files Vault Manager */}
      {activePortal === 'vault' && (
        <div className="animate-fade-in flex flex-col gap-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4 select-none">
            <div>
              <h3 className="text-xl font-headline text-[#181c1d] font-bold">Lodge Asset Vault</h3>
              <p className="text-xs text-[#54433e]/75 font-body">Manage synchronized file assets crawled by OTAs.</p>
            </div>

            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#d67d61] text-[#ffffff] font-body text-sm font-semibold hover:bg-[#944931] shadow-ambient hover:shadow-hover transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>Upload New File</span>
            </button>
          </div>

          {/* Upload form block */}
          {showUploadForm && (
            <form
              onSubmit={handleUploadSubmit}
              className="mb-8 p-6 bg-white border border-[#dac1ba]/30 rounded-3xl shadow-ambient max-w-xl animate-fade-in"
            >
              <h3 className="text-base font-bold text-[#181c1d] mb-4">Add Local Resource Asset</h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-[#54433e]/60 font-body">File Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Garden_Balcony_View"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="bg-[#F9F7F2]/50 border border-[#dac1ba]/40 rounded-xl px-4 py-2.5 text-sm text-[#181c1d] focus:border-[#d67d61] transition-all font-body font-semibold"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-[#54433e]/60 font-body">Type</label>
                    <select
                      value={fileType}
                      onChange={(e) => setFileType(e.target.value as any)}
                      className="bg-[#F9F7F2]/50 border border-[#dac1ba]/40 rounded-xl px-3 py-2.5 text-xs text-[#181c1d] focus:border-[#d67d61] font-body font-semibold cursor-pointer"
                    >
                      <option value="image">Image (JPG)</option>
                      <option value="pdf">PDF Doc</option>
                      <option value="document">Text File (TXT)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-[#54433e]/60 font-body">Folder</label>
                    <select
                      value={fileFolder}
                      onChange={(e) => setFileFolder(e.target.value as any)}
                      className="bg-[#F9F7F2]/50 border border-[#dac1ba]/40 rounded-xl px-3 py-2.5 text-xs text-[#181c1d] focus:border-[#d67d61] font-body font-semibold cursor-pointer"
                    >
                      <option value="Gallery">Gallery (Photos)</option>
                      <option value="Documents">Documents (PDFs)</option>
                      <option value="Marketing">Marketing (Promos)</option>
                      <option value="Certificates">Certificates</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-[#54433e]/60 font-body">Size</label>
                    <input
                      type="text"
                      value={fileSize}
                      onChange={(e) => setFileSize(e.target.value)}
                      className="bg-[#F9F7F2]/50 border border-[#dac1ba]/40 rounded-xl px-3 py-2.5 text-xs text-[#181c1d] focus:border-[#d67d61] font-body"
                    />
                  </div>
                </div>

                <div className="flex gap-3 justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadForm(false)}
                    className="px-4 py-2 text-xs font-semibold font-body text-[#54433e]/70 hover:text-[#181c1d]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-semibold font-body bg-[#d67d61] hover:bg-[#944931] text-white rounded-xl shadow-ambient"
                  >
                    Upload Asset
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Subfolders tabs and Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 select-none">
            <div className="flex gap-2 border-b border-[#dac1ba]/20 pb-0.5">
              {folders.map((folder) => (
                <button
                  key={folder}
                  onClick={() => setActiveFolderTab(folder)}
                  className={`px-4 py-2 text-sm font-semibold font-body transition-all relative ${
                    activeFolderTab === folder ? 'text-[#d67d61]' : 'text-[#54433e]/60 hover:text-[#181c1d]'
                  }`}
                >
                  {folder}
                  {activeFolderTab === folder && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d67d61]" />
                  )}
                </button>
              ))}
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search vault..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border border-[#dac1ba]/30 rounded-xl pl-9 pr-4 py-2 text-xs text-[#181c1d] w-64 focus:border-[#d67d61] font-body shadow-ambient"
              />
              <Search className="w-3.5 h-3.5 text-[#54433e]/40 absolute left-3 top-3" />
            </div>
          </div>

          {/* File Grid */}
          {filteredFiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="bg-white border border-[#dac1ba]/20 rounded-3xl overflow-hidden shadow-ambient hover:shadow-hover transition-all duration-300 flex flex-col justify-between"
                >
                  {file.folder === 'Gallery' && file.url !== '#' ? (
                    <div className="h-40 bg-[#F9F7F2] overflow-hidden select-none">
                      <img
                        src={`${file.url}?auto=format&fit=crop&q=80&w=400`}
                        alt={file.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-40 bg-[#F9F7F2]/60 border-b border-[#dac1ba]/10 flex items-center justify-center select-none">
                      <Folder className="w-16 h-16 text-[#b58d72]/20 stroke-[1]" />
                    </div>
                  )}

                  <div className="p-5 text-left font-body">
                    <div className="flex gap-3 items-start mb-3">
                      <div className="mt-0.5">{getFileIcon(file.type)}</div>
                      <div className="overflow-hidden">
                        <h4 className="text-sm font-bold text-[#181c1d] truncate" title={file.name}>
                          {file.name}
                        </h4>
                        <span className="text-[10px] text-[#54433e]/50 font-medium block mt-0.5">
                          {file.folder} • {file.size}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#dac1ba]/10 pt-4 mt-2">
                      <span className="text-[10px] text-[#54433e]/40 font-bold uppercase tracking-wider">
                        {file.uploadDate}
                      </span>

                      <div className="flex items-center gap-1.5 text-[10px] font-bold">
                        {file.status === 'synced' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#4e805d]" />
                            <span className="text-[#4e805d]">SYNCED</span>
                          </>
                        ) : file.status === 'pending' ? (
                          <>
                            <CloudLightning className="w-3.5 h-3.5 text-[#d99152] animate-pulse" />
                            <span className="text-[#d99152]">PENDING SYNC</span>
                          </>
                        ) : (
                          <>
                            <CloudLightning className="w-3.5 h-3.5 text-[#d67d61] animate-pulse" />
                            <span className="text-[#d67d61]">LOCAL</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white border border-[#dac1ba]/20 rounded-3xl shadow-ambient select-none">
              <Folder className="w-12 h-12 text-[#b58d72]/30 mx-auto mb-3 stroke-[1.5]" />
              <p className="text-sm font-body text-[#54433e]/60">No files found matching the selected parameters.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default Resources;
