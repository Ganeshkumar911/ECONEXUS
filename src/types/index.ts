export interface WasteType {
  id: string;
  name: string;
  category: 'recyclable' | 'compostable' | 'hazardous' | 'landfill';
  icon: string;
  description: string;
  disposalInstructions: string;
  environmentalImpact: string;
}

export interface RecyclingCenter {
  id: string;
  name: string;
  address: string;
  acceptedItems: string[];
  hours: string;
  phone: string;
  website?: string;
  lat?: number;
  lng?: number;
  distance?: number;
  category?: 'hazardous' | 'e-waste' | 'compost' | 'general';
  specialItems?: string[];
  zone?: 'South Chennai' | 'Central Chennai' | 'North Chennai' | 'West Chennai' | 'Chennai Suburbs' | 'Rest of Tamil Nadu';
  doorstepPickupAvailable?: boolean;
}

export interface WasteTrackingData {
  date: string;
  timestamp?: string;
  itemDescription?: string;
  recyclable: number;
  compostable: number;
  hazardous: number;
  landfill: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  dateOfBirth: string;
  place: string;
  pincode: string;
  phone?: string;
  address?: string;
  bio?: string;
  goals?: {
    totalWasteReduced: number;
    recyclablesCollected: number;
    compostCreated: number;
    streakDays: number;
    zeroLandfillEntries: number;
  };
  stats: {
    totalWasteReduced: number;
    recyclablesCollected: number;
    compostCreated: number;
    streakDays: number;
  };
  achievements: Achievement[];
  trackingData: WasteTrackingData[];
}

export interface RegisteredUser {
  email: string;
  password: string;
  profile: UserProfile;
}

export type CourseCategory =
  | 'All'
  | 'Circular Economy'
  | 'E-Waste Management'
  | 'Plastics & Recycling'
  | 'Composting & Organic'
  | 'Hazardous & Industrial'
  | 'Zero Waste Living';

export type PlatformType =
  | 'Coursera'
  | 'edX'
  | 'YouTube'
  | 'SWAYAM'
  | 'Udemy'
  | 'UNEP'
  | 'OpenLearn'
  | 'EcoSort Academy';

export interface CoursePlatform {
  name: string;
  type: PlatformType;
  brandColor: string;
  websiteUrl: string;
  logoBadgeText?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  summary: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: CourseCategory;
  platform: CoursePlatform;
  platformUrl: string;
  instructor: string;
  institution: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  rating: number;
  reviewsCount: number;
  enrolledCount: number;
  isFree: boolean;
  certificateAvailable: boolean;
  imageUrl: string;
  badge?: 'Bestseller' | 'Featured' | 'Certification Course' | 'Free Course' | 'Popular';
  overview: string;
  learningOutcomes: string[];
  modules: CourseModule[];
}

export interface VideoResource {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: string;
  platform: string;
  channelName: string;
  videoUrl: string;
  embedId?: string;
  thumbnailUrl: string;
  category: string;
}

export interface DownloadableResource {
  id: string;
  title: string;
  fileType: 'PDF Guide' | 'Worksheet' | 'Checklist' | 'Infographic';
  description: string;
  fileSize: string;
  downloadCount: string;
  downloadUrl: string;
  previewContent?: string[];
}