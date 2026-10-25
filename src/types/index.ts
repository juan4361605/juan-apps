export type MBTIType = 
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  country: string;
  countryCode: string;
  flag: string;
  city: string;
  avatar: string;
  gallery: string[];
  bio: string;
  occupation: string;
  languages: string[];
  nativeLanguage: string;
  mbti: MBTIType;
  interests: string[];
  intent: 'Amor y Relación Seria' | 'Intercambio Cultural' | 'Amistad Internacional' | 'Networking';
  distanceKm: number;
  isOnline: boolean;
  isVerified: boolean;
  trustScore: number;
  voiceNoteUrl?: string;
  voiceBioDuration?: number;
  zodiac?: string;
  heightCm?: number;
  prompts: {
    question: string;
    answer: string;
  }[];
  culturalFact: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  translatedText?: string;
  timestamp: string;
  isAudio?: boolean;
  audioDuration?: number;
  imageUrl?: string;
  sourceLang?: string;
  targetLang?: string;
  culturalNote?: string;
}

export interface MatchConversation {
  id: string;
  profile: UserProfile;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  compatibilityScore: number;
  messages: ChatMessage[];
}

export interface GlobalEvent {
  id: string;
  title: string;
  category: 'Intercambio de Idiomas' | 'Speed Dating Global' | 'Cultura & Música' | 'Nomad Lounge';
  countryFocus: string[];
  date: string;
  time: string;
  attendeesCount: number;
  maxAttendees: number;
  bannerGradient: string;
  isLiveNow: boolean;
  hostName: string;
}

export interface UserPassportData {
  level: number;
  levelTitle: string;
  xp: number;
  xpToNextLevel: number;
  stampsCount: number;
  visitedCountries: string[];
  badges: {
    id: string;
    name: string;
    icon: string;
    description: string;
    unlocked: boolean;
  }[];
  coins: number;
  superLikesLeft: number;
  boostsLeft: number;
  isPremium: boolean;
  premiumTier?: 'Free' | 'WorldPass' | 'Global VIP';
}
