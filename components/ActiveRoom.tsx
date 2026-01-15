
import React, { useRef, useEffect, useState } from 'react';
import { Mic, MicOff, Settings, PhoneOff, MessageSquare, MoreVertical, Send, Volume2, Copy, Check } from 'lucide-react';
import { useStore } from '../store';
import { AudioSettingsModal, Button } from './Shared';
import clsx from 'clsx';
import { Message } from '../types';

export const ActiveRoomScreen = () => {
  const { messages, isMicActive, toggleMic, setView, addMessage, user, roomCode } = useStore();
  const [showAudioSettings, setShowAudioSettings] = useState(false);
  const [inputText, setInputText] = useState('');
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCopyCode = () => {
    if (roomCode) {
      navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSend = () => {
      if (!inputText.trim()) return;
      
      const newMsg: Message = {
          id: Date.now().toString(),
          senderId: user.id,
          senderName: user.name,
          avatar: user.avatar,
          textOriginal: inputText,
          textTranslated: "Çeviri yapılıyor...", 
          timestamp: new Date(),
          language: 'TR',
          isMe: true
      };
      
      addMessage(newMsg);
      setInputText('');

      setTimeout(() => {
         useStore.setState(state => ({
             messages: state.messages.map(m => m.id === newMsg.id ? {...m, textTranslated: "Çeviri: " + m.textOriginal} : m)
         }));
      }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 relative">
      <AudioSettingsModal isOpen={showAudioSettings} onClose={() => setShowAudioSettings(false)} />

      <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 z-20 shadow-sm">
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           <div>
               <div className="flex items-center gap-2">
                   <h1 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider">Oda #{roomCode || 'BRIDGE'}</h1>
                   <button 
                    onClick={handleCopyCode}
                    className={clsx(
                        "p-1 rounded-md transition-all duration-200",
                        copied ? "text-green-500 bg-green-50 dark:bg-green-900/20" : "text-gray-400 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                    title="Kodu Kopyala"
                   >
                       {copied ? <Check size={14} /> : <Copy size={14} />}
                   </button>
                   {copied && <span className="text-[10px] font-bold text-green-500 animate-in fade-in slide-in-from-left-1">Kopyalandı!</span>}
               </div>
               <p className="text-xs text-green-600 dark:text-green-400 font-medium">Bağlı • Canlı Çeviri Aktif</p>
           </div>
        </div>
        <div className="flex items-center gap-2">
            <button 
                onClick={() => setView('TRANSCRIPT')}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                title="Geçmiş"
            >
                <MessageSquare size={20} />
            </button>
            <button 
                onClick={() => setShowAudioSettings(true)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
                <Settings size={20} />
            </button>
            <button 
                onClick={() => setView('HOME')}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full ml-2"
            >
                <PhoneOff size={20} />
            </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
         <div className="text-center my-4">
             <span className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs px-3 py-1 rounded-full">
                 Bugün
             </span>
         </div>
         
         {messages.map((msg) => (
             <ChatBubble key={msg.id} msg={msg} />
         ))}
         <div ref={messagesEndRef} />
      </main>

      <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 z-20">
          <div className="max-w-4xl mx-auto flex items-end gap-3">
             <button 
                onClick={() => setShowAudioSettings(true)}
                className="p-3 text-gray-500 hover:text-primary-500 transition-colors"
             >
                 <Volume2 size={24} />
             </button>
             
             <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl p-2 flex items-center gap-2">
                 <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Mesaj yazın..."
                    className="flex-1 bg-transparent border-none focus:ring-0 px-2 text-gray-900 dark:text-white placeholder-gray-500"
                 />
                 <button 
                    onClick={handleSend}
                    disabled={!inputText.trim()}
                    className="p-2 bg-primary-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
                 >
                     <Send size={18} />
                 </button>
             </div>

             <button 
                onClick={toggleMic}
                className={clsx(
                    "p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95",
                    isMicActive 
                        ? "bg-red-500 text-white shadow-red-500/30 animate-pulse" 
                        : "bg-primary-600 text-white shadow-primary-600/30"
                )}
             >
                {isMicActive ? <MicOff size={24} /> : <Mic size={24} />}
             </button>
          </div>
      </div>
    </div>
  );
};

const ChatBubble: React.FC<{ msg: Message }> = ({ msg }) => {
    return (
        <div className={clsx("flex gap-3 max-w-[85%] md:max-w-[70%]", msg.isMe ? "ml-auto flex-row-reverse" : "")}>
            <img src={msg.avatar} alt="" className="w-8 h-8 rounded-full flex-shrink-0 self-end mb-1" />
            <div className={clsx(
                "flex flex-col p-3 rounded-2xl shadow-sm",
                msg.isMe 
                    ? "bg-primary-600 text-white rounded-br-none" 
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none border border-gray-100 dark:border-gray-700"
            )}>
                <span className={clsx("text-xs mb-1 block", msg.isMe ? "text-primary-200" : "text-gray-500 dark:text-gray-400")}>
                    {msg.textOriginal}
                </span>
                <span className="text-base md:text-lg font-bold leading-tight">
                    {msg.textTranslated}
                </span>
                
                <span className={clsx("text-[10px] mt-2 block opacity-70", msg.isMe ? "text-right" : "text-left")}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    )
}
