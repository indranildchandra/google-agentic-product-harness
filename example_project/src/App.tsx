import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

// Pages
import Onboarding from './pages/Onboarding';
import Factory from './pages/Factory';
import Resources from './pages/Resources';
import AeoEngine from './pages/AeoEngine';
import GeoDataset from './pages/GeoDataset';
import GraphView from './pages/GraphView';
import HostProfile from './pages/HostProfile';
import HistoryLog from './pages/HistoryLog';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="flex min-h-screen w-full bg-[#f7fafb]">
          {/* Permanent Elegant Sidebar navigation */}
          <Sidebar />

          {/* Core Page Display Layout */}
          <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
            {/* Topbar Header */}
            <Topbar />

            {/* Render Routing Outlet */}
            <main className="flex-1 bg-[#F9F7F2]/30 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Onboarding />} />
                <Route path="/factory" element={<Factory />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/aeo" element={<AeoEngine />} />
                <Route path="/geo" element={<GeoDataset />} />
                <Route path="/graph" element={<GraphView />} />
                <Route path="/settings" element={<HostProfile />} />
                <Route path="/history" element={<HistoryLog />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
