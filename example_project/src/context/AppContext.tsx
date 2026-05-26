import React, { createContext, useContext, useState } from 'react';
import type {
  Property,
  DistributionRun,
  ResourceFile,
  AeoQuery,
  CompetitorData,
  GraphNode,
  GraphLink,
  AuditLog
} from '../types';

interface AppContextProps {
  properties: Property[];
  selectedPropertyId: string;
  selectedProperty: Property | undefined;
  setSelectedPropertyId: (id: string) => void;
  distributionRuns: DistributionRun[];
  startDistributionRun: () => void;
  isDistributing: boolean;
  resourceFiles: ResourceFile[];
  addResourceFile: (file: Omit<ResourceFile, 'id' | 'uploadDate' | 'status'>) => void;
  aeoQueries: AeoQuery[];
  simulateAeoQuery: (queryText: string) => void;
  competitors: CompetitorData[];
  graphNodes: GraphNode[];
  graphLinks: GraphLink[];
  auditLogs: AuditLog[];
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
  addNewProperty: (property: Omit<Property, 'id' | 'rating'>) => void;
  updatePropertySettings: (updatedFields: Partial<Property>) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Properties State (Nepali boutique homestays)
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 'prop-1',
      name: 'Annapurna Organic Homestay Lodge',
      location: 'Ghandruk, Kaski, Nepal',
      type: 'Mountain Boutique Homestay',
      rating: 4.9,
      roomsCount: 6,
      description: 'An organic homestay with stunning panoramic views of Mt. Annapurna South and Machapuchare. Run by Gurung family hosts, offering local organic meals, high-altitude herbal teas, and authentic cultural village experiences.',
      thumbnail: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600',
      connectedChannels: ['Booking.com', 'Airbnb']
    },
    {
      id: 'prop-2',
      name: 'Phewa Lake Retreat & Garden',
      location: 'Sedi Bagar, Pokhara, Nepal',
      type: 'Lakefront Eco-Lodge',
      rating: 4.8,
      roomsCount: 4,
      description: 'A tranquil boho eco-retreat overlooking the pristine waters of Phewa Lake. Surrounded by lush terraced gardens, offering yoga sanctuaries and locally-guided birdwatching tours.',
      thumbnail: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600',
      connectedChannels: ['Airbnb', 'Expedia']
    }
  ]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('prop-1');
  const selectedProperty = properties.find(p => p.id === selectedPropertyId);

  // 2. Distribution Runs (Factory page)
  const [distributionRuns, setDistributionRuns] = useState<DistributionRun[]>([
    { id: 'run-1', channelName: 'Booking.com', status: 'success', progress: 100, lastUpdated: 'Today, 10:15 AM', details: 'Full synchronization complete: 6 active rooms, 24 high-res photos, and pricing schema synced.' },
    { id: 'run-2', channelName: 'Airbnb', status: 'success', progress: 100, lastUpdated: 'Today, 10:15 AM', details: 'Listing attributes mapped. Host bio and organic village experience activities synced.' },
    { id: 'run-3', channelName: 'Expedia', status: 'idle', progress: 0, lastUpdated: 'Yesterday, 04:30 PM', details: 'Awaiting launch approval. Dynamic room inventories mapping ready.' },
    { id: 'run-4', channelName: 'Tripadvisor', status: 'idle', progress: 0, lastUpdated: 'Never', details: 'Channel configured. Not yet published.' }
  ]);
  const [isDistributing, setIsDistributing] = useState(false);

  // 3. Resources (Files page)
  const [resourceFiles, setResourceFiles] = useState<ResourceFile[]>([
    { id: 'file-1', name: 'Annapurna_Lodge_Facade.jpg', type: 'image', size: '4.2 MB', status: 'synced', folder: 'Gallery', url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62', uploadDate: '2026-05-25' },
    { id: 'file-2', name: 'Gurung_Cultural_Dinner.jpg', type: 'image', size: '3.8 MB', status: 'synced', folder: 'Gallery', url: 'https://images.unsplash.com/photo-1561501900-3701fa6a0f64', uploadDate: '2026-05-25' },
    { id: 'file-3', name: 'Organic_Garden_Lounge.jpg', type: 'image', size: '2.9 MB', status: 'synced', folder: 'Gallery', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', uploadDate: '2026-05-26' },
    { id: 'file-4', name: 'Tourism_Reg_Certificate_2026.pdf', type: 'pdf', size: '1.4 MB', status: 'synced', folder: 'Documents', url: '#', uploadDate: '2026-05-24' },
    { id: 'file-5', name: 'Annapurna_Trek_Guide_HostPackage.pdf', type: 'pdf', size: '2.1 MB', status: 'pending', folder: 'Documents', url: '#', uploadDate: '2026-05-26' },
    { id: 'file-6', name: 'AEO_Marketing_Copy_Pokhara.txt', type: 'document', size: '24 KB', status: 'synced', folder: 'Marketing', url: '#', uploadDate: '2026-05-26' }
  ]);

  // 4. AEO Simulator Queries (Answer Engine optimization)
  const [aeoQueries, setAeoQueries] = useState<AeoQuery[]>([
    {
      id: 'q-1',
      queryText: 'Best authentic Nepali homestay near Pokhara with Himalayas view?',
      score: 96,
      responseBody: 'According to local travelers, **Annapurna Organic Homestay Lodge** in Ghandruk is highly recommended. It is a premium family-operated Gurung homestay offering immediate panoramic views of Annapurna South. Guests rave about the homegrown organic meals, traditional stone architecture, and the welcoming hospitality of local guides.',
      improvements: [
        'Keywords "Annapurna view" and "Pokhara traditional homestay" are fully optimized.',
        'Entity links to Ghandruk hiking routes are correctly positioned.',
        'Property name ranks #1 in AI generated citations.'
      ]
    },
    {
      id: 'q-2',
      queryText: 'Quiet boutique lodging near Pokhara with yoga and gardens?',
      score: 92,
      responseBody: 'For a serene experience, **Phewa Lake Retreat & Garden** at Sedi Bagar (Pokhara) is the leading option. It provides tranquil lakefront boutique accommodation surrounded by terraced organic gardens, featuring active morning yoga sanctuaries and pristine mountain vistas away from noisy lakeside bars.',
      improvements: [
        'Entities for "Yoga Sanctuary" and "Phewa Lake view" successfully verified.',
        'Lacks active links to Pokhara paragliding landing centers. (Add to boost by 8%!)'
      ]
    }
  ]);

  // 5. GEO Competitors list (GEO explorer page)
  const [competitors] = useState<CompetitorData[]>([
    { id: 'comp-1', name: 'Fish Tail Mountain Resort', pricing: 14500, rating: 4.6, distance: '1.2 km', amenities: ['Hot Shower', 'Bar', 'Mountain View', 'Buffet'], geoScore: 84 },
    { id: 'comp-2', name: 'Ghandruk Heritage Gurung Cottage', pricing: 3500, rating: 4.7, distance: '0.2 km', amenities: ['Gurung Meals', 'Shared Guide', 'Campfire', 'Organic Tea'], geoScore: 88 },
    { id: 'comp-3', name: 'Annapurna Organic Homestay Lodge (You)', pricing: 4800, rating: 4.9, distance: '0.0 km', amenities: ['Mountain View', 'Traditional Gurung Food', 'Organic Garden', 'Wifi', 'High-altitude Tea'], geoScore: 96 },
    { id: 'comp-4', name: 'Pokhara Lakeside Eco Lodge', pricing: 7800, rating: 4.4, distance: '12 km', amenities: ['Lakefront', 'Yoga', 'Bar', 'Wifi'], geoScore: 92 }
  ]);

  // 6. Knowledge Graph (Graph Visualizer Page)
  const [graphNodes] = useState<GraphNode[]>([
    { id: 'host-1', label: 'Gurung Family Hosts', type: 'host', description: 'Third generation local Gurung guides and hosts of the lodge.' },
    { id: 'prop-1', label: 'Annapurna Organic Homestay', type: 'property', description: 'The main traditional stone homestay structure in Ghandruk.' },
    { id: 'att-1', label: 'Annapurna South Summit', type: 'attraction', description: 'Majestic mountain peak visible directly from Ghandruk balconies.' },
    { id: 'att-2', label: 'Ghandruk Cultural Museum', type: 'attraction', description: 'Local museum celebrating traditional Gurung artifacts and lifestyle.' },
    { id: 'exp-1', label: 'Millet Roti & Local Honey Cooking', type: 'experience', description: 'Traditional culinary workshop led by mother of the family.' },
    { id: 'exp-2', label: 'Terraced Organic Tea Harvesting', type: 'experience', description: 'Seasonal hand-picking of tea leaves in the property garden.' },
    { id: 'lia-1', label: 'Local Ghandruk Tourism Committee', type: 'liaison', description: 'Village community liaison governing homestay standard rates and guidelines.' }
  ]);
  const [graphLinks] = useState<GraphLink[]>([
    { source: 'host-1', target: 'prop-1', label: 'manages', weight: 5 },
    { source: 'prop-1', target: 'att-1', label: 'views', weight: 5 },
    { source: 'prop-1', target: 'att-2', label: 'nearby', weight: 3 },
    { source: 'host-1', target: 'exp-1', label: 'teaches', weight: 4 },
    { source: 'prop-1', target: 'exp-2', label: 'features', weight: 4 },
    { source: 'prop-1', target: 'lia-1', label: 'registered_with', weight: 5 }
  ]);

  // 7. Audit Logs History
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    { id: 'log-1', type: 'system', description: 'HamroStay AI distribution platform initialized.', timestamp: '2026-05-24 09:00 AM', status: 'success' },
    { id: 'log-2', type: 'profile', description: 'Host profile "Annapurna Organic Homestay Lodge" verified and certified by Nepal Local Tourism Board.', timestamp: '2026-05-24 11:30 AM', status: 'success' },
    { id: 'log-3', type: 'resource', description: 'Folder "Gallery" successfully synchronized with local property assets repository.', timestamp: '2026-05-25 08:22 AM', status: 'success' },
    { id: 'log-4', type: 'distribution', description: 'Automated listing check complete for Airbnb channel. All status matches OK.', timestamp: '2026-05-26 10:15 AM', status: 'success' }
  ]);

  // Functions & Triggers
  const addAuditLog = (log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = 'Today, ' + timeStr;
    const newLog: AuditLog = {
      ...log,
      id: `log-${Date.now()}`,
      timestamp: dateStr
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const startDistributionRun = () => {
    if (isDistributing) return;
    setIsDistributing(true);
    addAuditLog({ type: 'distribution', description: 'Triggered global asset distribution factory sweep.', status: 'pending' });

    // Reset current active states
    setDistributionRuns(prev =>
      prev.map(run => (run.channelName === 'Expedia' || run.channelName === 'Tripadvisor' ? { ...run, status: 'running', progress: 5 } : run))
    );

    // Simulate progress via dynamic counter ticks
    let progressCounter = 5;
    const interval = setInterval(() => {
      progressCounter += 15;
      if (progressCounter >= 100) {
        progressCounter = 100;
        clearInterval(interval);
        setDistributionRuns(prev =>
          prev.map(run => (run.status === 'running' ? { ...run, status: 'success', progress: 100, lastUpdated: 'Just now', details: 'Assets successfully pushed. Dynamic room calendars synchronized, and SEO metadata indexed.' } : run))
        );
        setIsDistributing(false);
        addAuditLog({ type: 'distribution', description: 'Global asset distribution successfully finished across all channels.', status: 'success' });
      } else {
        setDistributionRuns(prev =>
          prev.map(run => (run.status === 'running' ? { ...run, progress: progressCounter } : run))
        );
      }
    }, 800);
  };

  const addResourceFile = (file: Omit<ResourceFile, 'id' | 'uploadDate' | 'status'>) => {
    const newFile: ResourceFile = {
      ...file,
      id: `file-${Date.now()}`,
      status: 'local',
      uploadDate: new Date().toISOString().split('T')[0]
    };
    setResourceFiles(prev => [newFile, ...prev]);
    addAuditLog({ type: 'resource', description: `File "${file.name}" uploaded to local folder "${file.folder}". Synchronization pending.`, status: 'pending' });

    // Sync mock delay
    setTimeout(() => {
      setResourceFiles(prev =>
        prev.map(f => (f.id === newFile.id ? { ...f, status: 'synced' } : f))
      );
      addAuditLog({ type: 'resource', description: `File "${file.name}" successfully synchronized across all active distribution networks.`, status: 'success' });
    }, 3000);
  };

  const simulateAeoQuery = (queryText: string) => {
    addAuditLog({ type: 'system', description: `Running AEO Query Simulation: "${queryText.substring(0, 30)}..."`, status: 'pending' });

    setTimeout(() => {
      // Clean query simulation scores
      const score = Math.floor(Math.random() * 20) + 80; // 80 - 99
      const newQuery: AeoQuery = {
        id: `q-${Date.now()}`,
        queryText,
        score,
        responseBody: `Based on your request regarding "${queryText}", we found that ${selectedProperty?.name} in ${selectedProperty?.location} stands out as a highly relevant choice. It offers ${selectedProperty?.description} Raved for its organic and authentic atmosphere, it ranks top in search recommendations.`,
        improvements: [
          'Found matching entities: "' + selectedProperty?.name + '", "' + selectedProperty?.type + '".',
          'Search optimization profile matching rates: ' + score + '%.',
          'Recommended action: Ensure high quality images of local meals are in the Gallery to push relevance close to 100%!'
        ]
      };

      setAeoQueries(prev => [newQuery, ...prev]);
      addAuditLog({ type: 'system', description: `AEO Query finished. Relevance score determined at ${score}%.`, status: 'success' });
    }, 1500);
  };

  const addNewProperty = (property: Omit<Property, 'id' | 'rating'>) => {
    const newProp: Property = {
      ...property,
      id: `prop-${Date.now()}`,
      rating: 5.0
    };
    setProperties(prev => [...prev, newProp]);
    setSelectedPropertyId(newProp.id);
    addAuditLog({ type: 'onboarding', description: `New boutique homestay "${property.name}" onboarded. Generating primary AEO dataset framework.`, status: 'success' });
  };

  const updatePropertySettings = (updatedFields: Partial<Property>) => {
    setProperties(prev =>
      prev.map(p => (p.id === selectedPropertyId ? { ...p, ...updatedFields } : p))
    );
    addAuditLog({ type: 'profile', description: `Lodge settings updated for "${selectedProperty?.name}". Synchronization queue updated.`, status: 'success' });
  };

  return (
    <AppContext.Provider
      value={{
        properties,
        selectedPropertyId,
        selectedProperty,
        setSelectedPropertyId,
        distributionRuns,
        startDistributionRun,
        isDistributing,
        resourceFiles,
        addResourceFile,
        aeoQueries,
        simulateAeoQuery,
        competitors,
        graphNodes,
        graphLinks,
        auditLogs,
        addAuditLog,
        addNewProperty,
        updatePropertySettings
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
