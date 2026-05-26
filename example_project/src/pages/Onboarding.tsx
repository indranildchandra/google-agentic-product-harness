import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building, 
  MapPin, 
  AlignLeft, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Globe, 
  Languages, 
  Lightbulb, 
  Sparkles 
} from 'lucide-react';

const Onboarding: React.FC = () => {
  const { addNewProperty } = useApp();

  const [step, setStep] = useState(1);
  
  // Step 1 Form states
  const [name, setName] = useState('');
  const [language, setLanguage] = useState<'nepali' | 'english'>('english');

  // Step 2 Form states
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Mountain Boutique Homestay');
  const [roomsCount, setRoomsCount] = useState(4);

  // Step 3 Form states
  const [description, setDescription] = useState('');
  const [airbnbConnected, setAirbnbConnected] = useState(true);
  const [bookingConnected, setBookingConnected] = useState(false);
  const [expediaConnected, setExpediaConnected] = useState(false);

  const [successMsg, setSuccessMsg] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location) return;

    const channels: string[] = [];
    if (airbnbConnected) channels.push('Airbnb');
    if (bookingConnected) channels.push('Booking.com');
    if (expediaConnected) channels.push('Expedia');

    addNewProperty({
      name,
      location,
      type,
      roomsCount,
      description: description || `${name} is an authentic sanctuary offering localized Himalayan experiences and high-altitude views.`,
      thumbnail: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600',
      connectedChannels: channels
    });

    setSuccessMsg(true);
    setStep(1);
    setName('');
    setLocation('');
    setDescription('');
    
    setTimeout(() => {
      setSuccessMsg(false);
    }, 4000);
  };

  // Get dynamic step progress percentage
  const getProgressWidth = () => {
    if (step === 1) return '33.33%';
    if (step === 2) return '66.66%';
    return '100%';
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-start p-8 md:p-16 overflow-hidden">
      
      {/* Golden hour Himalayan Backdrop Image with desaturated editorial styling */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F9F7F2] via-[#F9F7F2]/65 to-transparent z-10" />
        <img
          alt="Golden Hour Himalayas Background"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcolnfce9oYeV3tFOe-AE5-f9aBNSgjd0ooG5q_2xmW-Qk-WpNOUm0bH98Zdvzmx3-M2vFwN2w8bvck831fM87cw8PFd0BJKqy88Vg3Nlxou6iyiy2ibkhlFsjqARr6SIvH5e4lRtl0HS_HOObv8EirvJn3nycAia9DGGUoae9LJnLHhUmmVXK9Mu8x5UJL_tjk-KMFpkMizZTvXTCk2L1NapyrOraHrDERRINfOxFRHKpOH-0bGFKoulqBJzMIB2OUXJ7-Gifmrty"
          className="w-full h-full object-cover object-center opacity-85 select-none pointer-events-none"
        />
      </div>

      {/* Onboarding canvas container */}
      <div className="relative z-20 w-full max-w-[600px] flex flex-col gap-6 text-left">
        
        {/* Step Indicator Panel */}
        <div className="flex flex-col gap-2 select-none">
          <div className="flex justify-between items-end">
            <span className="font-body text-xs font-bold uppercase tracking-wider text-[#d67d61]">
              Step {step} of 3
            </span>
            <span className="font-headline text-lg font-semibold text-[#54433e]">
              {step === 1 ? 'Basic Info' : step === 2 ? 'Sanctuary Specs' : 'Distribution OTAs'}
            </span>
          </div>
          <div className="h-1.5 w-full bg-[#e0e3e4] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#d67d61] transition-all duration-500 ease-out" 
              style={{ width: getProgressWidth() }}
            />
          </div>
        </div>

        {/* Success complete banner */}
        {successMsg && (
          <div className="p-4 bg-[#F1EDE4] border border-[#9caf88] rounded-2xl flex items-center gap-3 text-[#4e805d] font-body text-sm animate-fade-in shadow-ambient">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span className="font-semibold">Sanctuary successfully created! Dynamic index updates queued globally.</span>
          </div>
        )}

        {/* The Card Board */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#dac1ba]/30 shadow-ambient transition-all duration-300 transform hover:scale-[1.002]">
          
          {/* STEP 1: Basic details */}
          {step === 1 && (
            <section className="flex flex-col gap-8 animate-fade-in">
              <header className="flex flex-col gap-3">
                <h1 className="font-headline text-4xl text-[#181c1d] leading-tight font-bold">
                  Namaste, future host.
                </h1>
                <p className="font-body text-sm text-[#54433e]/85 leading-relaxed">
                  We’re honored to help you share your piece of the Himalayas with the world. Let’s begin your journey with a few simple details.
                </p>
              </header>

              <div className="flex flex-col gap-6 font-body">
                {/* Input 1 */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#54433e]/80 ml-1" htmlFor="homestay-name">
                    Homestay Name
                  </label>
                  <input
                    type="text"
                    id="homestay-name"
                    placeholder="e.g. Annapurna Organic Homestay"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-[#F1EDE4]/50 border border-[#b58d72]/30 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#d67d61] focus:border-[#d67d61] outline-none transition-all placeholder:text-[#b58d72]/50 text-[#181c1d] text-sm font-semibold"
                  />
                </div>

                {/* Input 2: Language Button Select Grid */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#54433e]/80 ml-1">
                    Primary Language
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* Nepali Button */}
                    <button
                      type="button"
                      onClick={() => setLanguage('nepali')}
                      className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border font-semibold text-xs transition-all ${
                        language === 'nepali'
                          ? 'bg-[#d2e6bc] border-[#9caf88] text-[#576846] shadow-ambient'
                          : 'bg-[#F1EDE4]/50 border-[#b58d72]/30 text-[#54433e]/70 hover:bg-[#F1EDE4]'
                      }`}
                    >
                      <Languages className="w-4 h-4 stroke-[1.5]" />
                      <span>Nepali</span>
                    </button>

                    {/* English Button */}
                    <button
                      type="button"
                      onClick={() => setLanguage('english')}
                      className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border font-semibold text-xs transition-all ${
                        language === 'english'
                          ? 'bg-[#d2e6bc] border-[#9caf88] text-[#576846] shadow-ambient'
                          : 'bg-[#F1EDE4]/50 border-[#b58d72]/30 text-[#54433e]/70 hover:bg-[#F1EDE4]'
                      }`}
                    >
                      <Globe className="w-4 h-4 stroke-[1.5]" />
                      <span>English</span>
                    </button>

                  </div>
                </div>
              </div>

              {/* Navigation Action Footer */}
              <div className="pt-6 border-t border-[#dac1ba]/10 flex items-center justify-between font-body">
                <span className="text-xs text-[#54433e]/40 font-bold">HAMROSTAY CORE</span>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!name}
                  className={`px-8 py-3.5 rounded-full text-xs font-bold transition-all shadow-lg flex items-center gap-2 ${
                    !name
                      ? 'bg-[#F1EDE4] text-[#54433e]/40 cursor-not-allowed shadow-none'
                      : 'bg-[#d67d61] text-[#ffffff] shadow-[#d67d61]/25 hover:bg-[#944931]'
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>
          )}

          {/* STEP 2: Sanctuary specs details */}
          {step === 2 && (
            <section className="flex flex-col gap-8 animate-fade-in">
              <header className="flex flex-col gap-3">
                <h1 className="font-headline text-4xl text-[#181c1d] leading-tight font-bold">
                  Tell us about your sanctuary.
                </h1>
                <p className="font-body text-sm text-[#54433e]/85 leading-relaxed">
                  Every stone house has a story. Select your lodge's unique regional specs, locations, and rooms count limits.
                </p>
              </header>

              <div className="flex flex-col gap-6 font-body">
                
                {/* Input 1 */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#54433e]/80 ml-1" htmlFor="homestay-loc">
                    Property Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="homestay-loc"
                      placeholder="e.g. Ghandruk, Kaski, Nepal"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className="w-full bg-[#F1EDE4]/50 border border-[#b58d72]/30 rounded-xl pl-10 pr-4 py-3.5 focus:ring-2 focus:ring-[#d67d61] focus:border-[#d67d61] outline-none transition-all placeholder:text-[#b58d72]/50 text-[#181c1d] text-sm font-semibold"
                    />
                    <MapPin className="w-4 h-4 text-[#b58d72] absolute left-3.5 top-4" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Select accommodation type */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#54433e]/80 ml-1">
                      Sanctuary Type
                    </label>
                    <select
                      value={type}
                      onChange={e => setType(e.target.value)}
                      className="bg-[#F1EDE4]/50 border border-[#b58d72]/30 rounded-xl px-4 py-3.5 text-xs font-bold text-[#181c1d] focus:ring-2 focus:ring-[#d67d61] focus:border-[#d67d61] outline-none transition-all cursor-pointer"
                    >
                      <option value="Mountain Boutique Homestay">Mountain Boutique Homestay</option>
                      <option value="Lakefront Eco-Lodge">Lakefront Eco-Lodge</option>
                      <option value="Heritage Nepali Farmhouse">Heritage Nepali Farmhouse</option>
                      <option value="Luxury Safari Camp">Luxury Safari Camp</option>
                    </select>
                  </div>

                  {/* Room Inventory */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#54433e]/80 ml-1">
                      Rooms Count
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min={1}
                        max={40}
                        value={roomsCount}
                        onChange={e => setRoomsCount(parseInt(e.target.value) || 1)}
                        className="w-full bg-[#F1EDE4]/50 border border-[#b58d72]/30 rounded-xl pl-10 pr-4 py-3.5 focus:ring-2 focus:ring-[#d67d61] focus:border-[#d67d61] outline-none transition-all text-[#181c1d] text-xs font-bold"
                      />
                      <Building className="w-4 h-4 text-[#b58d72] absolute left-3.5 top-4" />
                    </div>
                  </div>

                </div>

              </div>

              {/* Navigation Action Footer */}
              <div className="pt-6 border-t border-[#dac1ba]/10 flex items-center justify-between font-body select-none">
                <button
                  type="button"
                  onClick={handleBack}
                  className="group flex items-center gap-2 text-[#54433e]/80 font-bold hover:text-[#d67d61] transition-all text-xs"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!location}
                  className={`px-8 py-3.5 rounded-full text-xs font-bold transition-all shadow-lg flex items-center gap-2 ${
                    !location
                      ? 'bg-[#F1EDE4] text-[#54433e]/40 cursor-not-allowed shadow-none'
                      : 'bg-[#d67d61] text-[#ffffff] shadow-[#d67d61]/25 hover:bg-[#944931]'
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>
          )}

          {/* STEP 3: Distribution credentials OTAs details */}
          {step === 3 && (
            <section className="flex flex-col gap-6 animate-fade-in">
              <header className="flex flex-col gap-3">
                <h1 className="font-headline text-4xl text-[#181c1d] leading-tight font-bold">
                  Distribute your valley.
                </h1>
                <p className="font-body text-sm text-[#54433e]/85 leading-relaxed">
                  Map credentials. Push localized marketing parameters and mountain details instantly across booking networks.
                </p>
              </header>

              <div className="flex flex-col gap-4 font-body text-left">
                
                {/* Description Textarea */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#54433e]/80 ml-1">
                    Generative Pitch Narrative
                  </label>
                  <div className="relative">
                    <textarea
                      rows={3}
                      placeholder="Write details on Gurung legacy cooking, local honey collections, and panoramic views..."
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      className="w-full bg-[#F1EDE4]/50 border border-[#b58d72]/30 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-[#d67d61] focus:border-[#d67d61] outline-none transition-all placeholder:text-[#b58d72]/50 text-[#181c1d] text-xs font-semibold resize-none"
                    />
                    <AlignLeft className="w-4 h-4 text-[#b58d72] absolute left-3.5 top-3.5" />
                  </div>
                </div>

                {/* OTA checkboxes switches grid */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-[10px] uppercase font-bold text-[#54433e]/60 tracking-wider ml-1">
                    Active OTA Channels Connection
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    
                    {/* Airbnb */}
                    <div className="flex items-center justify-between bg-[#F9F7F2]/60 border border-[#dac1ba]/30 p-3 rounded-2xl">
                      <span className="text-xs font-bold text-[#181c1d]">Airbnb</span>
                      <label className="relative inline-flex items-center cursor-pointer scale-90">
                        <input
                          type="checkbox"
                          checked={airbnbConnected}
                          onChange={e => setAirbnbConnected(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 bg-[#e0e3e4] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#9caf88] h-4 after:h-3 after:w-3"></div>
                      </label>
                    </div>

                    {/* Booking.com */}
                    <div className="flex items-center justify-between bg-[#F9F7F2]/60 border border-[#dac1ba]/30 p-3 rounded-2xl">
                      <span className="text-xs font-bold text-[#181c1d]">Booking.com</span>
                      <label className="relative inline-flex items-center cursor-pointer scale-90">
                        <input
                          type="checkbox"
                          checked={bookingConnected}
                          onChange={e => setBookingConnected(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 bg-[#e0e3e4] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#9caf88] h-4 after:h-3 after:w-3"></div>
                      </label>
                    </div>

                    {/* Expedia */}
                    <div className="flex items-center justify-between bg-[#F9F7F2]/60 border border-[#dac1ba]/30 p-3 rounded-2xl">
                      <span className="text-xs font-bold text-[#181c1d]">Expedia</span>
                      <label className="relative inline-flex items-center cursor-pointer scale-90">
                        <input
                          type="checkbox"
                          checked={expediaConnected}
                          onChange={e => setExpediaConnected(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 bg-[#e0e3e4] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#9caf88] h-4 after:h-3 after:w-3"></div>
                      </label>
                    </div>

                  </div>
                </div>

              </div>

              {/* Navigation Action Footer */}
              <div className="pt-5 border-t border-[#dac1ba]/10 flex items-center justify-between font-body select-none">
                <button
                  type="button"
                  onClick={handleBack}
                  className="group flex items-center gap-2 text-[#54433e]/80 font-bold hover:text-[#d67d61] transition-all text-xs"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-3.5 rounded-full text-xs font-bold bg-[#d67d61] hover:bg-[#944931] text-[#ffffff] shadow-lg shadow-[#d67d61]/25 flex items-center gap-2 transition-all transform active:scale-95"
                >
                  <span>Namaste, Submit</span>
                  <Sparkles className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>
            </section>
          )}

        </div>

        {/* Contextual Guidance Panel (Host Tip matching Stitch design) */}
        <div className="flex gap-4 items-start p-4 bg-[#d2e6bc]/30 border border-[#d2e6bc]/50 rounded-2xl max-w-md animate-fade-in select-none">
          <div className="bg-[#d2e6bc] text-[#576846] p-2 rounded-xl shrink-0">
            <Lightbulb className="w-5 h-5 fill-current" />
          </div>
          <div className="font-body text-left">
            <h4 className="text-xs font-bold text-[#576846] mb-0.5">Host Onboarding Tip</h4>
            <p className="text-[11px] text-[#576846] leading-relaxed">
              {step === 1 
                ? 'Nepali hosts who offer local language support see a 24% higher engagement from regional travelers.'
                : step === 2
                ? 'Accurate location tags boost visibility rates within Generative Search Engines by 38%!'
                : 'Connecting at least 2 booking networks ensures active crawl optimization matches.'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Onboarding;
