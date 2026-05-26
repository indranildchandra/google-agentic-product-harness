export interface Property {
  id: string;
  name: string;
  location: string;
  type: string;
  rating: number;
  roomsCount: number;
  description: string;
  thumbnail: string;
  connectedChannels: string[];
}

export type DistributionStatus = 'idle' | 'running' | 'success' | 'failed';

export interface DistributionRun {
  id: string;
  channelName: string;
  status: DistributionStatus;
  progress: number; // 0 to 100
  lastUpdated: string;
  details: string;
}

export interface ResourceFile {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'document';
  size: string;
  status: 'synced' | 'pending' | 'local';
  folder: 'Gallery' | 'Documents' | 'Marketing' | 'Certificates';
  url: string;
  uploadDate: string;
}

export interface AeoQuery {
  id: string;
  queryText: string;
  score: number; // 0 to 100
  responseBody: string;
  improvements: string[];
}

export interface CompetitorData {
  id: string;
  name: string;
  pricing: number; // NPR per night
  rating: number;
  distance: string; // e.g. "0.5 km"
  amenities: string[];
  geoScore: number; // 0 to 100 generative engine optimization score
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'host' | 'property' | 'experience' | 'attraction' | 'liaison';
  description?: string;
  x?: number;
  y?: number;
}

export interface GraphLink {
  source: string;
  target: string;
  label: string;
  weight: number; // 1 to 5
}

export interface AuditLog {
  id: string;
  type: 'system' | 'distribution' | 'onboarding' | 'resource' | 'profile';
  description: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
}
