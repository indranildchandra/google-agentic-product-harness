import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Save,
  CheckCircle,
  User,
  Shield,
  Camera,
  Eye,
  EyeOff,
  Globe,
  Star
} from 'lucide-react';

const HostProfile: React.FC = () => {
  const { selectedProperty, updatePropertySettings, addAuditLog } = useApp();

  const [name, setName] = useState('Namrata R.');
  const [email, setEmail] = useState('namrata.retreat@himalayan.host');
  const [phone, setPhone] = useState('+977 984-XXXXXXX');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [timezone, setTimezone] = useState('(GMT+05:45) Kathmandu');
  const [currency, setCurrency] = useState('NPR - Nepalese Rupee');
  const [autoDetect, setAutoDetect] = useState(true);
  const [selectedModel, setSelectedModel] = useState<'heritage' | 'nomad' | 'concierge'>('heritage');
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Parallax calculations for the avatar image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProperty) {
      updatePropertySettings({
        name: selectedProperty.name, // Keep existing property metadata in sync
        description: selectedProperty.description
      });
    }

    addAuditLog({
      type: 'profile',
      description: `Host settings updated: timezone set to ${timezone}, active AI model: ${selectedModel === 'heritage' ? 'Heritage Pro' : selectedModel === 'nomad' ? 'Nomad Lite' : 'Concierge Alpha'}.`,
      status: 'success'
    });

    setShowSaveMessage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setShowSaveMessage(false);
    }, 4000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in text-left">
      {/* Header Section */}
      <div className="mb-10 border-b border-[#dac1ba]/20 pb-8 select-none">
        <h1 className="font-headline text-4xl font-bold text-[#944931] mb-2">Host Settings</h1>
        <p className="font-body text-base text-[#54433e]/80">
          Refine your boutique homestay's digital presence and AI configurations.
        </p>
      </div>

      {showSaveMessage && (
        <div className="mb-8 p-4 bg-[#F9F7F2] border border-[#9caf88] rounded-2xl flex items-center gap-3 text-[#4e805d] font-body text-sm animate-fade-in shadow-ambient">
          <CheckCircle className="w-5 h-5 text-[#9caf88]" />
          <div>
            <span className="font-semibold block">Host changes saved successfully!</span>
            <span className="text-xs text-[#54433e]/70">Your updated localization preferences and AI configurations have been deployed.</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-10">
        {/* Profile Card Section */}
        <section className="bg-white rounded-2xl p-8 shadow-ambient border border-[#dac1ba]/10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div 
              className="relative cursor-pointer overflow-hidden rounded-full w-32 h-32 border-4 border-[#F1EDE4] shadow-md transition-all duration-300"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                setMousePos({ x: 0, y: 0 });
              }}
            >
              <img 
                alt="Namrata R." 
                className="w-full h-full object-cover transition-transform duration-300 ease-out" 
                style={{
                  transform: isHovered 
                    ? `scale(1.1) translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`
                    : 'scale(1) translate(0, 0)'
                }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKjwlSEi_hfsEOPbc9_wwuCtcuZEeATQT9z_Y_tyXY-jm8g2Uu7IEOgYVQ4SyhxaL-X9CIbbLjkW1zOhxM2z5Yfa5gONRMDWDV1XRtJ7CMRbe34sUuOn8BNPCOl6YasJG00UK9a79BjZEUWidqNgG85JzLde7tX6tVkUKFkb7EkitTUoM86P-lckZM0BJOMiKKl9wGWicDwwizZ6Rz_iZEckU9QRNFSjvIvsTQN_WnIHHjQ-wIttDhjh_uKzgajDR91j3JcD1CrEB_"
              />
              <div className="absolute bottom-0 right-0 bg-[#944931] text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </div>
            </div>

            <div className="flex-grow text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 justify-center md:justify-start">
                <h2 className="font-headline text-3xl font-bold text-[#181c1d]">{name}</h2>
                <span className="px-3 py-1 bg-[#d2e6bc] text-[#576846] text-xs font-semibold rounded-full inline-flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  Premium Member
                </span>
              </div>
              <p className="font-body text-sm text-[#54433e] mb-4">
                Managing "{selectedProperty?.name || 'Annapurna Organic Homestay'}" • Host since 2021
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <button 
                  type="button"
                  onClick={() => {
                    const newName = prompt("Enter new name:", name);
                    if (newName) setName(newName);
                  }}
                  className="bg-[#F1EDE4] text-[#944931] border border-[#dac1ba]/30 px-4 py-2 rounded-lg font-body text-xs font-semibold hover:bg-[#dac1ba]/20 transition-all"
                >
                  Edit Bio
                </button>
                <button 
                  type="button"
                  onClick={() => alert(`Viewing public profile for ${name}`)}
                  className="text-[#54433e]/80 hover:text-[#944931] font-body text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  View public profile
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Input Settings Form */}
        <form onSubmit={handleSave} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Account Details Box */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#dac1ba]/20 pb-2 select-none">
                <User className="w-5 h-5 text-[#944931]" />
                <h3 className="font-headline text-lg font-bold text-[#181c1d]">Account Details</h3>
              </div>
              
              <div className="space-y-4 text-left">
                <div>
                  <label className="block font-body text-xs font-semibold text-[#54433e] mb-1.5 ml-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F1EDE4]/50 border border-[#dac1ba]/30 rounded-xl px-4 py-3 text-sm text-[#181c1d] focus:ring-2 focus:ring-[#944931]/20 focus:border-[#944931] outline-none transition-all font-body"
                    required
                  />
                </div>

                <div>
                  <label className="block font-body text-xs font-semibold text-[#54433e] mb-1.5 ml-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F1EDE4]/50 border border-[#dac1ba]/30 rounded-xl px-4 py-3 text-sm text-[#181c1d] focus:ring-2 focus:ring-[#944931]/20 focus:border-[#944931] outline-none transition-all font-body"
                    required
                  />
                </div>

                <div>
                  <label className="block font-body text-xs font-semibold text-[#54433e] mb-1.5 ml-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#F1EDE4]/50 border border-[#dac1ba]/30 rounded-xl px-4 py-3 text-sm text-[#181c1d] focus:ring-2 focus:ring-[#944931]/20 focus:border-[#944931] outline-none transition-all font-body pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#54433e]/60 hover:text-[#944931] transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Localization Preferences Box */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#dac1ba]/20 pb-2 select-none">
                <Globe className="w-5 h-5 text-[#944931]" />
                <h3 className="font-headline text-lg font-bold text-[#181c1d]">Localization</h3>
              </div>

              <div className="space-y-4 text-left">
                <div>
                  <label className="block font-body text-xs font-semibold text-[#54433e] mb-1.5 ml-1">Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full bg-[#F1EDE4]/50 border border-[#dac1ba]/30 rounded-xl px-4 py-3 text-sm text-[#181c1d] focus:ring-2 focus:ring-[#944931]/20 focus:border-[#944931] outline-none transition-all font-body cursor-pointer"
                  >
                    <option value="(GMT+05:45) Kathmandu">(GMT+05:45) Kathmandu</option>
                    <option value="(GMT+05:30) New Delhi">(GMT+05:30) New Delhi</option>
                    <option value="(GMT+00:00) UTC">(GMT+00:00) UTC</option>
                  </select>
                </div>

                <div>
                  <label className="block font-body text-xs font-semibold text-[#54433e] mb-1.5 ml-1">Preferred Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-[#F1EDE4]/50 border border-[#dac1ba]/30 rounded-xl px-4 py-3 text-sm text-[#181c1d] focus:ring-2 focus:ring-[#944931]/20 focus:border-[#944931] outline-none transition-all font-body cursor-pointer"
                  >
                    <option value="NPR - Nepalese Rupee">NPR - Nepalese Rupee</option>
                    <option value="USD - US Dollar">USD - US Dollar</option>
                    <option value="EUR - Euro">EUR - Euro</option>
                  </select>
                </div>

                {/* Auto detect toggle */}
                <div className="flex items-center justify-between p-4 bg-[#b48c71]/15 rounded-xl border border-[#b48c71]/20 mt-6 select-none">
                  <div>
                    <p className="font-body text-sm font-semibold text-[#5f402a]">Auto-detect Location</p>
                    <p className="font-body text-xs text-[#5f402a]/70">Update local events automatically</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAutoDetect(!autoDetect)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      autoDetect ? 'bg-[#944931]' : 'bg-[#dac1ba]'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        autoDetect ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* AI Model Selection */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-[#dac1ba]/20 pb-2 select-none">
              <Shield className="w-5 h-5 text-[#944931]" />
              <h3 className="font-headline text-lg font-bold text-[#181c1d]">AI Model Selection</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Model 1: Heritage Pro */}
              <div
                onClick={() => setSelectedModel('heritage')}
                className={`relative cursor-pointer rounded-2xl p-6 bg-white shadow-ambient transition-all duration-300 border-2 ${
                  selectedModel === 'heritage' 
                    ? 'border-[#944931] scale-[1.02]' 
                    : 'border-[#dac1ba]/20 hover:border-[#944931]/50'
                }`}
              >
                {selectedModel === 'heritage' && (
                  <div className="absolute top-4 right-4 text-[#944931] animate-fade-in">
                    <CheckCircle className="w-5 h-5 fill-[#944931] text-white" />
                  </div>
                )}
                <h4 className="font-headline text-lg font-semibold text-[#181c1d] mb-2 select-none">Heritage Pro</h4>
                <p className="font-body text-xs text-[#54433e] leading-relaxed mb-6 select-none">
                  Optimized for cultural depth and descriptive storytelling. Best for premium guests.
                </p>
                <div className="flex flex-wrap gap-2 select-none">
                  <span className="bg-[#9caf88]/20 text-[#3b4c2c] text-[10px] font-semibold px-2 py-0.5 rounded">Formal</span>
                  <span className="bg-[#9caf88]/20 text-[#3b4c2c] text-[10px] font-semibold px-2 py-0.5 rounded">Deep Context</span>
                </div>
              </div>

              {/* Model 2: Nomad Lite */}
              <div
                onClick={() => setSelectedModel('nomad')}
                className={`relative cursor-pointer rounded-2xl p-6 bg-white shadow-ambient transition-all duration-300 border-2 ${
                  selectedModel === 'nomad' 
                    ? 'border-[#944931] scale-[1.02]' 
                    : 'border-[#dac1ba]/20 hover:border-[#944931]/50'
                }`}
              >
                {selectedModel === 'nomad' && (
                  <div className="absolute top-4 right-4 text-[#944931] animate-fade-in">
                    <CheckCircle className="w-5 h-5 fill-[#944931] text-white" />
                  </div>
                )}
                <h4 className="font-headline text-lg font-semibold text-[#181c1d] mb-2 select-none">Nomad Lite</h4>
                <p className="font-body text-xs text-[#54433e] leading-relaxed mb-6 select-none">
                  Concise, modern, and energetic. Perfect for quick bookings and active travelers.
                </p>
                <div className="flex flex-wrap gap-2 select-none">
                  <span className="bg-[#F1EDE4] text-[#54433e] text-[10px] font-semibold px-2 py-0.5 rounded">Casual</span>
                  <span className="bg-[#F1EDE4] text-[#54433e] text-[10px] font-semibold px-2 py-0.5 rounded">Efficient</span>
                </div>
              </div>

              {/* Model 3: Concierge Alpha */}
              <div
                onClick={() => setSelectedModel('concierge')}
                className={`relative cursor-pointer rounded-2xl p-6 bg-white shadow-ambient transition-all duration-300 border-2 ${
                  selectedModel === 'concierge' 
                    ? 'border-[#944931] scale-[1.02]' 
                    : 'border-[#dac1ba]/20 hover:border-[#944931]/50'
                }`}
              >
                {selectedModel === 'concierge' && (
                  <div className="absolute top-4 right-4 text-[#944931] animate-fade-in">
                    <CheckCircle className="w-5 h-5 fill-[#944931] text-white" />
                  </div>
                )}
                <h4 className="font-headline text-lg font-semibold text-[#181c1d] mb-2 select-none">Concierge Alpha</h4>
                <p className="font-body text-xs text-[#54433e] leading-relaxed mb-6 select-none">
                  Experimental. Uses hyper-local data for specific trek recommendations.
                </p>
                <div className="flex flex-wrap gap-2 select-none">
                  <span className="bg-[#F1EDE4] text-[#54433e] text-[10px] font-semibold px-2 py-0.5 rounded">Experimental</span>
                  <span className="bg-[#F1EDE4] text-[#54433e] text-[10px] font-semibold px-2 py-0.5 rounded">Local</span>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Footer & Action */}
          <footer className="mt-12 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between border-t border-[#dac1ba]/20 pt-8 pb-12 select-none">
            <div className="flex items-start gap-4 max-w-xl text-left">
              <div className="bg-[#944931]/10 p-3 rounded-full text-[#944931] shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-body text-sm font-bold text-[#181c1d] mb-1">Your Privacy is Our Tradition</h5>
                <p className="font-body text-xs text-[#54433e]/80 leading-relaxed">
                  We ensure all guest data and property details are processed locally within the Himalayan node. 
                  Your information is never sold to third-party aggregators.{' '}
                  <a href="#charter" onClick={(e) => {e.preventDefault(); alert("Trust Charter Details:\n- 100% Local data node execution\n- Zero analytical third-party tracking\n- Secured by RSA-4096 homomorphic encapsulation");}} className="text-[#944931] underline font-semibold hover:text-[#551905]">
                    Read our Trust Charter
                  </a>.
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#d67d61] hover:bg-[#944931] text-white px-8 py-3.5 rounded-full font-body text-sm font-semibold shadow-lg shadow-[#d67d61]/20 hover:shadow-xl active:scale-[0.98] transition-all transform shrink-0 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default HostProfile;
