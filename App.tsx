
import React, { useEffect, useState } from 'react';
import { useStore } from './store';
import { ActiveRoomScreen } from './components/ActiveRoom';
import { BluetoothScreen } from './components/BluetoothScreen';
import { TranscriptScreen } from './components/TranscriptScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { Button, Card } from './components/Shared';
import { Mic2, UserCircle, Settings as SettingsIcon, Plus, UserPlus, X, Hash, Languages } from 'lucide-react';
import clsx from 'clsx';

function App() {
  const { currentView, setView, theme } = useStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const renderView = () => {
    switch (currentView) {
      case 'ROOM': return <ActiveRoomScreen />;
      case 'BLUETOOTH': return <BluetoothScreen />;
      case 'TRANSCRIPT': return <TranscriptScreen />;
      case 'SETTINGS': return <SettingsScreen />;
      case 'PROFILE': return <ProfileScreen />;
      case 'HOME':
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans antialiased transition-colors duration-200">
      {renderView()}
    </div>
  );
}

const HomeScreen = () => {
    const { setView, setRoomCode, activeLanguagePair } = useStore();
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
    const [joinCode, setJoinCode] = useState('');

    const handleCreateRoom = () => {
        const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        setRoomCode(randomCode);
        setView('ROOM');
    };

    const handleJoinRoom = () => {
        if (joinCode.length >= 4) {
            setRoomCode(joinCode.toUpperCase());
            setView('ROOM');
        }
    };
    
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-primary-600 to-primary-800 rounded-b-[3rem] z-0" />
            <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            
            <nav className="relative z-10 p-6 flex justify-between items-center text-white">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <Mic2 /> VoiceBridge
                </div>
                <button onClick={() => setView('PROFILE')}>
                   <img src="https://picsum.photos/seed/me/200/200" alt="Profil" className="w-10 h-10 rounded-full border-2 border-white/30" />
                </button>
            </nav>

            <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 space-y-8">
                <div className="text-center text-white space-y-4 mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Dil Engellerini <br/> Anında Aşın
                    </h1>
                    <p className="text-primary-100 max-w-md mx-auto text-lg">
                        Kesintisiz yüz yüze iletişim için yapay zeka destekli gerçek zamanlı sesli çeviri.
                    </p>
                </div>

                {/* Quick Info Bar */}
                <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/20 text-white mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Languages size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-wider font-bold opacity-60">Aktif Dil Çifti</p>
                            <p className="font-bold">{activeLanguagePair.from} ↔ {activeLanguagePair.to}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setView('SETTINGS')}
                        className="text-xs font-bold bg-white text-primary-600 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors"
                    >
                        Değiştir
                    </button>
                </div>

                <div className="w-full max-w-md space-y-4">
                    <div 
                        onClick={handleCreateRoom}
                        className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl flex items-center justify-between cursor-pointer transform hover:scale-[1.02] transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                <Plus size={28} />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Oda Oluştur</h3>
                                <p className="text-gray-500 text-sm">Yeni bir konuşma başlatın</p>
                            </div>
                        </div>
                        <div className="text-gray-300 group-hover:text-primary-500">→</div>
                    </div>

                    <div 
                        onClick={() => setIsJoinModalOpen(true)}
                        className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl flex items-center justify-between cursor-pointer transform hover:scale-[1.02] transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                <UserPlus size={28} />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Odaya Katıl</h3>
                                <p className="text-gray-500 text-sm">Kod girin veya QR taratın</p>
                            </div>
                        </div>
                        <div className="text-gray-300 group-hover:text-green-500">→</div>
                    </div>
                </div>
            </main>

            <div className="relative z-10 p-6 pb-8 flex justify-center gap-6">
                <ToolButton icon={SettingsIcon} label="Ayarlar" onClick={() => setView('SETTINGS')} />
                <div className="w-px bg-gray-200 dark:bg-gray-700 h-10 self-center" />
                <ToolButton icon={UserCircle} label="Cihazlar" onClick={() => setView('BLUETOOTH')} />
            </div>

            {isJoinModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Hash className="text-primary-600" size={20} />
                                Odaya Katıl
                            </h3>
                            <button 
                                onClick={() => setIsJoinModalOpen(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                            Çeviriye başlamak için partnerinizin paylaştığı 6 haneli kodu girin.
                        </p>
                        
                        <div className="space-y-4">
                            <input 
                                type="text"
                                placeholder="Örn: K7M2P9"
                                value={joinCode}
                                onChange={(e) => setJoinCode(e.target.value.toUpperCase().slice(0, 6))}
                                className="w-full text-center text-2xl font-bold tracking-widest bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-primary-500 rounded-2xl py-4 outline-none transition-all placeholder:font-normal placeholder:text-gray-400 placeholder:text-lg placeholder:tracking-normal"
                                autoFocus
                            />
                            
                            <div className="flex gap-3 pt-2">
                                <Button 
                                    variant="secondary" 
                                    className="flex-1" 
                                    onClick={() => setIsJoinModalOpen(false)}
                                >
                                    İptal
                                </Button>
                                <Button 
                                    variant="primary" 
                                    className="flex-[2]" 
                                    disabled={joinCode.length < 4}
                                    onClick={handleJoinRoom}
                                >
                                    Odaya Katıl
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const ToolButton = ({ icon: Icon, label, onClick }: any) => (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group">
        <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm text-gray-400 group-hover:text-primary-600 group-hover:shadow-md transition-all">
            <Icon size={24} />
        </div>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>
    </button>
)

export default App;
