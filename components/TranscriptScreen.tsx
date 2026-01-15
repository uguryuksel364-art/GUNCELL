
import React, { useState } from 'react';
import { X, Search, FileText, Share2, Download, Filter, Trash2, Volume2 } from 'lucide-react';
import { useStore } from '../store';
import { Message } from '../types';
import { Button } from './Shared';
import clsx from 'clsx';

export const TranscriptScreen = () => {
  const { messages, setView } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessages = messages.filter(m => 
    m.textOriginal.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.textTranslated.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col">
      <div className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 bg-white dark:bg-gray-900">
        <h2 className="text-lg font-bold">Konuşma Geçmişi</h2>
        <div className="flex items-center gap-2">
           <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
               <Share2 size={20} />
           </button>
           <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
               <Download size={20} />
           </button>
           <button onClick={() => setView('ROOM')} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
             <X size={20} />
           </button>
        </div>
      </div>

      <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex gap-3">
        <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
                type="text" 
                placeholder="Geçmişte ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-100 dark:bg-gray-800 pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
        </div>
        <Button variant="secondary" className="!px-3 !py-2">
            <Filter size={18} />
        </Button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        <div className="flex-1 overflow-y-auto border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 bg-blue-50/30 dark:bg-blue-900/10">
            <div className="p-3 sticky top-0 bg-blue-100/90 dark:bg-blue-900/50 backdrop-blur-sm border-b border-blue-200 dark:border-blue-800 z-10 mb-2">
                <span className="font-bold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                    TR <span className="text-xs font-normal opacity-70">Orijinal</span>
                </span>
            </div>
            <div className="p-4 space-y-4">
                {filteredMessages.map(msg => (
                   msg.language === 'TR' ? (
                       <MessageRow key={msg.id} msg={msg} type="original" />
                   ) : (
                       <MessageRow key={msg.id} msg={msg} type="translated" />
                   )
                ))}
            </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-green-50/30 dark:bg-green-900/10">
            <div className="p-3 sticky top-0 bg-green-100/90 dark:bg-green-900/50 backdrop-blur-sm border-b border-green-200 dark:border-green-800 z-10 mb-2">
                <span className="font-bold text-green-800 dark:text-green-200 flex items-center gap-2">
                    EN <span className="text-xs font-normal opacity-70">Çeviri</span>
                </span>
            </div>
            <div className="p-4 space-y-4">
                {filteredMessages.map(msg => (
                   msg.language === 'EN' ? (
                       <MessageRow key={msg.id} msg={msg} type="original" />
                   ) : (
                       <MessageRow key={msg.id} msg={msg} type="translated" />
                   )
                ))}
            </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex justify-between items-center">
         <span className="text-sm text-gray-500">{filteredMessages.length} mesaj bulundu</span>
         <button className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
             <Trash2 size={16} /> Geçmişi Temizle
         </button>
      </div>
    </div>
  );
};

interface MessageRowProps {
    msg: Message;
    type: 'original' | 'translated';
}

const MessageRow: React.FC<MessageRowProps> = ({ msg, type }) => {
    const isOriginal = type === 'original';
    const text = isOriginal ? msg.textOriginal : msg.textTranslated;
    
    return (
        <div className="flex gap-3 group">
            <img src={msg.avatar} alt={msg.senderName} className="w-8 h-8 rounded-full flex-shrink-0" />
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{msg.senderName}</span>
                    <span className="text-xs text-gray-400">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                <div className={clsx(
                    "p-3 rounded-lg text-sm relative group-hover:shadow-sm transition-all",
                    isOriginal 
                        ? "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" 
                        : "bg-gray-100 dark:bg-gray-800/50 border border-transparent italic text-gray-600 dark:text-gray-400"
                )}>
                    {text}
                    <button className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                        <Volume2 size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
