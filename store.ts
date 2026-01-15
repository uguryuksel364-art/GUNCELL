
import { create } from 'zustand';
import { AppState, Message, Voice, Language } from './types';

// Mock Data
const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    senderId: 'user1',
    senderName: 'Ahmet Y.',
    avatar: 'https://picsum.photos/seed/user1/40/40',
    textOriginal: 'Merhaba, nasılsın?',
    textTranslated: 'Hello, how are you?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    language: 'TR',
    isMe: true,
  },
  {
    id: '2',
    senderId: 'user2',
    senderName: 'John D.',
    avatar: 'https://picsum.photos/seed/user2/40/40',
    textOriginal: "I'm good, thanks! And you?",
    textTranslated: 'İyiyim, teşekkürler! Ya sen?',
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
    language: 'EN',
    isMe: false,
  },
  {
    id: '3',
    senderId: 'user1',
    senderName: 'Ahmet Y.',
    avatar: 'https://picsum.photos/seed/user1/40/40',
    textOriginal: 'Ben de iyiyim. Proje nasıl gidiyor?',
    textTranslated: 'I am also good. How is the project going?',
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
    language: 'TR',
    isMe: true,
  },
];

const AVAILABLE_VOICES: Voice[] = [
  { id: 'v1', name: 'Sarah', gender: 'female', accent: 'Amerikan' },
  { id: 'v2', name: 'Emma', gender: 'female', accent: 'İngiliz' },
  { id: 'v3', name: 'James', gender: 'male', accent: 'Amerikan' },
  { id: 'v4', name: 'Oliver', gender: 'male', accent: 'Avustralya' },
];

export const useStore = create<AppState>((set) => ({
  currentView: 'HOME',
  theme: 'light',
  isMicActive: false,
  activeLanguagePair: { from: 'TR', to: 'EN' },
  roomCode: null,
  messages: MOCK_MESSAGES,
  availableVoices: AVAILABLE_VOICES,
  user: {
    id: 'u1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    avatar: 'https://picsum.photos/seed/me/200/200',
  },
  stats: {
    totalTalkTime: '42s 15d',
    roomsCreated: 18,
    favoritePair: 'TR ↔ EN',
  },
  devices: [
    { id: '1', name: 'AirPods Pro', status: 'connected', battery: 85 },
    { id: '2', name: 'JBL Flip 5', status: 'available' },
    { id: '3', name: 'Sony WH-1000XM4', status: 'available', battery: 40 },
  ],
  audioSettings: {
    speakerVolume: 75,
    micSensitivity: 80,
    echoCancellation: true,
    noiseReduction: true,
    selectedVoiceId: 'v1',
  },

  setView: (view) => set({ currentView: view }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  toggleMic: () => set((state) => ({ isMicActive: !state.isMicActive })),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  connectDevice: (id) =>
    set((state) => ({
      devices: state.devices.map((d) =>
        d.id === id ? { ...d, status: 'connecting' } : d
      ),
    })),
  setRoomCode: (code) => set({ roomCode: code }),
  updateAudioSettings: (settings) => set((state) => ({
    audioSettings: { ...state.audioSettings, ...settings }
  })),
  setLanguagePair: (from: Language, to: Language) => set({ activeLanguagePair: { from, to } }),
  updateUser: (userData) => set((state) => ({
    user: { ...state.user, ...userData }
  })),
}));
