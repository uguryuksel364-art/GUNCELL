
import React, { useState } from 'react';
import { ArrowLeft, Moon, Globe, Bell, Mic2, Shield, Info, LogOut, Check, X, User, Languages, ArrowRightLeft } from 'lucide-react';
import { useStore } from '../store';
import { Card, Button } from './Shared';
import { Language } from '../types';
import clsx from 'clsx';

const SUPPORTED_LANGUAGES: { code: Language; name: string; flag: string }[] = [
    { code: 'TR', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'EN', name: 'İngilizce', flag: '🇺🇸' },
    { code: 'ES', name: 'İspanyolca', flag: '🇪🇸' },
    { code: 'FR', name: 'Fransızca', flag: '🇫🇷' },
    { code: 'DE', name: 'Almanca', flag: '🇩🇪' },
];

export const SettingsScreen = () => {
  const { setView, theme, toggleTheme, audioSettings, availableVoices, updateAudioSettings, activeLanguagePair, setLanguagePair } = useStore();
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const selectedVoice = availableVoices.find(v => v.id === audioSettings.selectedVoiceId) || availableVoices[0];

  const handleSwapLanguages = () => {
      setLanguagePair(activeLanguagePair.to, activeLanguagePair.from);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-8">
      <div className="bg-white dark:bg-gray-900 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 px-4 h-16 flex items-center gap-4">
         <button onClick={() => setView('HOME')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
             <ArrowLeft />
         </button>
         <h1 className="text-xl font-bold">Ayarlar</h1>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6 mt-4">
        
        <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">Genel</h2>
            <Card className="!p-0 overflow-hidden">
                <SettingItem 
                    icon={Languages} 
                    label="Dil Çifti" 
                    value={`${activeLanguagePair.from} ↔ ${activeLanguagePair.to}`} 
                    onClick={() => setIsLanguageModalOpen(true)} 
                />
                <div className="h-px bg-gray-100 dark:bg-gray-700 mx-4" />
                <SettingItem 
                    icon={Moon} 
                    label="Karanlık Mod" 
                    toggle 
                    checked={theme === 'dark'} 
                    onToggle={toggleTheme} 
                />
                <div className="h-px bg-gray-100 dark:bg-gray-700 mx-4" />
                <SettingItem 
                    icon={Bell} 
                    label="Bildirimler" 
                    toggle 
                    checked={true} 
                    onToggle={() => {}} 
                />
            </Card>
        </section>

        <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">Ses ve Çeviri</h2>
            <Card className="!p-0 overflow-hidden">
                <SettingItem 
                    icon={Mic2} 
                    label="Yapay Zeka Sesi" 
                    value={`${selectedVoice.gender === 'female' ? 'Kadın' : 'Erkek'} (${selectedVoice.name})`} 
                    onClick={() => setIsVoiceModalOpen(true)} 
                />
                <div className="h-px bg-gray-100 dark:bg-gray-700 mx-4" />
                <div className="p-4 flex flex-col gap-2">
                    <span className="text-sm font-medium">Konuşma Hızı</span>
                    <input type="range" className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600" />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Yavaş</span>
                        <span>Normal</span>
                        <span>Hızlı</span>
                    </div>
                </div>
            </Card>
        </section>

        <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">Gizlilik</h2>
            <Card className="!p-0 overflow-hidden">
                 <SettingItem 
                    icon={Shield} 
                    label="Konuşma Geçmişini Kaydet" 
                    toggle 
                    checked={true} 
                    onToggle={() => {}} 
                />
                 <div className="h-px bg-gray-100 dark:bg-gray-700 mx-4" />
                 <SettingItem 
                    icon={LogOut} 
                    label="Otomatik Geçmiş Silme" 
                    value="30 Gün"
                    onClick={() => {}} 
                />
            </Card>
        </section>
        
        <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">Hakkında</h2>
            <Card className="!p-0 overflow-hidden">
                 <SettingItem 
                    icon={Info} 
                    label="Versiyon" 
                    value="1.0.0 (Beta)"
                    onClick={() => {}} 
                />
                <div className="h-px bg-gray-100 dark:bg-gray-700 mx-4" />
                <button className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-red-500 font-medium">
                    Hesabı Sil
                </button>
            </Card>
        </section>

        <div className="text-center text-xs text-gray-400 py-4">
            VoiceBridge © 2024. Tüm hakları saklıdır.
        </div>
      </div>

      {/* Language Selection Modal */}
      {isLanguageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                <Languages className="text-primary-600" size={20} />
                Dil Çiftini Ayarla
              </h3>
              <button 
                onClick={() => setIsLanguageModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4 items-center">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Kaynak Dil</label>
                        <div className="flex flex-col gap-2">
                            {SUPPORTED_LANGUAGES.map(lang => (
                                <button
                                    key={`from-${lang.code}`}
                                    onClick={() => setLanguagePair(lang.code, activeLanguagePair.to)}
                                    className={clsx(
                                        "flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-sm font-medium",
                                        activeLanguagePair.from === lang.code 
                                            ? "bg-primary-50 dark:bg-primary-900/20 border-primary-500 text-primary-700 dark:text-primary-300" 
                                            : "bg-gray-50 dark:bg-gray-800 border-transparent hover:border-gray-200 dark:hover:border-gray-700 text-gray-600 dark:text-gray-400"
                                    )}
                                >
                                    <span>{lang.flag}</span>
                                    <span>{lang.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Hedef Dil</label>
                        <div className="flex flex-col gap-2">
                            {SUPPORTED_LANGUAGES.map(lang => (
                                <button
                                    key={`to-${lang.code}`}
                                    onClick={() => setLanguagePair(activeLanguagePair.from, lang.code)}
                                    className={clsx(
                                        "flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-sm font-medium",
                                        activeLanguagePair.to === lang.code 
                                            ? "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-300" 
                                            : "bg-gray-50 dark:bg-gray-800 border-transparent hover:border-gray-200 dark:hover:border-gray-700 text-gray-600 dark:text-gray-400"
                                    )}
                                >
                                    <span>{lang.flag}</span>
                                    <span>{lang.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button 
                        onClick={handleSwapLanguages}
                        className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
                        title="Dilleri Değiştir"
                    >
                        <ArrowRightLeft size={24} className="text-primary-600" />
                    </button>
                </div>
            </div>

            <div className="mt-8">
              <Button fullWidth onClick={() => setIsLanguageModalOpen(false)}>Kaydet</Button>
            </div>
          </div>
        </div>
      )}

      {/* Voice Selection Modal */}
      {isVoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                <Mic2 className="text-primary-600" size={20} />
                Ses Seçimi
              </h3>
              <button 
                onClick={() => setIsVoiceModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              {availableVoices.map((voice) => (
                <div 
                  key={voice.id}
                  onClick={() => {
                    updateAudioSettings({ selectedVoiceId: voice.id });
                    setIsVoiceModalOpen(false);
                  }}
                  className={clsx(
                    "flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border-2",
                    audioSettings.selectedVoiceId === voice.id 
                      ? "bg-primary-50 dark:bg-primary-900/20 border-primary-500" 
                      : "bg-gray-50 dark:bg-gray-800 border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={clsx(
                      "p-2 rounded-xl",
                      voice.gender === 'female' ? "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400" : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    )}>
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{voice.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{voice.accent} Aksan</p>
                    </div>
                  </div>
                  {audioSettings.selectedVoiceId === voice.id && (
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white">
                      <Check size={14} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button fullWidth onClick={() => setIsVoiceModalOpen(false)}>Kapat</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SettingItem = ({ 
    icon: Icon, 
    label, 
    value, 
    toggle, 
    checked, 
    onToggle,
    onClick 
}: { 
    icon: React.ElementType, 
    label: string, 
    value?: string, 
    toggle?: boolean, 
    checked?: boolean, 
    onToggle?: () => void,
    onClick?: () => void
}) => (
    <div 
        onClick={toggle ? onToggle : onClick}
        className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
    >
        <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
                <Icon size={18} />
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100">{label}</span>
        </div>
        
        {toggle ? (
            <div className={`w-11 h-6 rounded-full relative transition-colors ${checked ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${checked ? 'left-6' : 'left-1'}`} />
            </div>
        ) : (
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{value}</span>
                <span className="text-gray-400">›</span>
            </div>
        )}
    </div>
);
