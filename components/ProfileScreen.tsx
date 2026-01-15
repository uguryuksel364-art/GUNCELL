
import React, { useState } from 'react';
import { ArrowLeft, Camera, BarChart3, Clock, Languages, Save, X as CloseIcon, User as UserIcon, Mail } from 'lucide-react';
import { useStore } from '../store';
import { Card, Button } from './Shared';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import clsx from 'clsx';

export const ProfileScreen = () => {
  const { user, stats, setView, updateUser } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editAvatar, setEditAvatar] = useState(user.avatar);

  const activityData = [
    { name: 'Pzt', hours: 2.5 },
    { name: 'Sal', hours: 1.2 },
    { name: 'Çar', hours: 3.8 },
    { name: 'Per', hours: 2.1 },
    { name: 'Cum', hours: 4.5 },
    { name: 'Cmt', hours: 1.0 },
    { name: 'Paz', hours: 0.5 },
  ];

  const langData = [
      { name: 'TR-EN', value: 65 },
      { name: 'TR-DE', value: 25 },
      { name: 'TR-FR', value: 10 },
  ];
  const COLORS = ['#6366f1', '#a5b4fc', '#e0e7ff'];

  const handleSave = () => {
    updateUser({
      name: editName,
      email: editEmail,
      avatar: editAvatar
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setEditAvatar(user.avatar);
    setIsEditing(false);
  };

  const handleRandomAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setEditAvatar(`https://picsum.photos/seed/${randomSeed}/200/200`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-8">
      <div className="bg-white dark:bg-gray-900 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 px-4 h-16 flex items-center gap-4">
         <button onClick={() => setView('HOME')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
             <ArrowLeft />
         </button>
         <h1 className="text-xl font-bold">Profil</h1>
      </div>

      <div className="max-w-3xl mx-auto p-4 space-y-6">
        <Card className="flex flex-col items-center text-center !pb-8 !pt-8 relative overflow-hidden">
            <div className="relative mb-6">
                <img 
                  src={isEditing ? editAvatar : user.avatar} 
                  alt="Profil" 
                  className="w-28 h-28 rounded-full border-4 border-primary-500 shadow-xl object-cover transition-all" 
                />
                {isEditing && (
                  <button 
                    onClick={handleRandomAvatar}
                    className="absolute bottom-0 right-0 p-2.5 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all transform hover:scale-110 active:scale-95"
                    title="Avatarı Değiştir"
                  >
                    <Camera size={18} />
                  </button>
                )}
            </div>

            {isEditing ? (
              <div className="w-full max-w-sm space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Ad Soyad"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="E-posta Adresi"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button variant="secondary" className="flex-1" onClick={handleCancel}>
                    <CloseIcon size={18} /> İptal
                  </Button>
                  <Button variant="primary" className="flex-1" onClick={handleSave}>
                    <Save size={18} /> Kaydet
                  </Button>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                <p className="text-gray-500 mb-6">{user.email}</p>
                <Button variant="outline" className="!px-8" onClick={() => setIsEditing(true)}>Profili Düzenle</Button>
              </div>
            )}
        </Card>

        <div className="grid grid-cols-3 gap-4">
            <StatCard icon={Clock} label="Konuşma" value={stats.totalTalkTime} color="text-blue-500" />
            <StatCard icon={Languages} label="Favori Dil" value={stats.favoritePair} color="text-purple-500" />
            <StatCard icon={BarChart3} label="Odalar" value={stats.roomsCreated} color="text-green-500" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <h3 className="font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                  <BarChart3 size={18} className="text-primary-500" />
                  Haftalık Aktivite
                </h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={activityData}>
                            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px', color: '#fff' }}
                                cursor={{fill: 'rgba(99, 102, 241, 0.1)'}}
                            />
                            <Bar dataKey="hours" fill="#6366f1" radius={[6, 6, 0, 0]} name="Saat" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card>
                <h3 className="font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                  <Languages size={18} className="text-primary-500" />
                  Dil Kullanımı
                </h3>
                <div className="h-64 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={langData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={85}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {langData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                    {langData.map((entry, index) => (
                      <div key={entry.name} className="flex items-center gap-1 text-xs font-medium text-gray-500">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                        {entry.name}
                      </div>
                    ))}
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <Card className="!p-4 flex flex-col items-center justify-center text-center group hover:border-primary-500/50 transition-colors">
        <Icon className={`w-6 h-6 mb-2 ${color} group-hover:scale-110 transition-transform`} />
        <div className="text-xl font-bold text-gray-900 dark:text-white">{value}</div>
        <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">{label}</div>
    </Card>
);
