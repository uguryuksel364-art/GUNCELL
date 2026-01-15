
export type Language = 'TR' | 'EN' | 'ES' | 'FR' | 'DE';

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  avatar: string;
  textOriginal: string;
  textTranslated: string;
  timestamp: Date;
  language: Language;
  isMe: boolean;
}

export interface BluetoothDevice {
  id: string;
  name: string;
  status: 'connected' | 'available' | 'connecting';
  battery?: number;
}

export interface RoomStats {
  totalTalkTime: string;
  roomsCreated: number;
  favoritePair: string;
}

export interface Voice {
  id: string;
  name: string;
  gender: 'male' | 'female';
  accent: string;
}

export interface AudioSettings {
  speakerVolume: number;
  micSensitivity: number;
  echoCancellation: boolean;
  noiseReduction: boolean;
  selectedVoiceId: string;
}

export type ViewState = 'HOME' | 'ROOM' | 'BLUETOOTH' | 'TRANSCRIPT' | 'SETTINGS' | 'PROFILE';

export interface AppState {
  currentView: ViewState;
  theme: 'light' | 'dark';
  isMicActive: boolean;
  activeLanguagePair: { from: Language; to: Language };
  roomCode: string | null;
  devices: BluetoothDevice[];
  messages: Message[];
  user: User;
  stats: RoomStats;
  audioSettings: AudioSettings;
  availableVoices: Voice[];
  
  // Actions
  setView: (view: ViewState) => void;
  toggleTheme: () => void;
  toggleMic: () => void;
  addMessage: (msg: Message) => void;
  connectDevice: (id: string) => void;
  setRoomCode: (code: string | null) => void;
  updateAudioSettings: (settings: Partial<AudioSettings>) => void;
  setLanguagePair: (from: Language, to: Language) => void;
  updateUser: (userData: Partial<User>) => void;
}
