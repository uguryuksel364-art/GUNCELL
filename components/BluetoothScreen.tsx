
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bluetooth, Battery, CheckCircle, Wifi, ArrowLeft } from 'lucide-react';
import { useStore } from '../store';
import { Button, Card } from './Shared';

export const BluetoothScreen = () => {
  const { devices, connectDevice, setView } = useStore();
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 flex flex-col relative overflow-hidden">
      <div className="relative z-10 flex items-center justify-between mb-8">
         <button onClick={() => setView('HOME')} className="p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
             <ArrowLeft />
         </button>
         <h1 className="text-xl font-bold">Bluetooth Cihazları</h1>
         <div className="w-8" /> 
      </div>

      <div className="relative h-64 flex items-center justify-center mb-8 shrink-0">
        <div className="absolute inset-0 flex items-center justify-center">
            {isScanning && (
                <>
                <motion.div
                    className="absolute w-64 h-64 border border-primary-500/20 rounded-full"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                    className="absolute w-48 h-48 border border-primary-500/30 rounded-full"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                </>
            )}
            <div className="w-32 h-32 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center z-10 shadow-xl border-4 border-white dark:border-gray-800">
                <Bluetooth className={`w-12 h-12 text-primary-600 ${isScanning ? 'animate-pulse' : ''}`} />
            </div>
        </div>
      </div>

      <div className="text-center mb-6">
          <h2 className="text-lg font-semibold">{isScanning ? 'Cihazlar taranıyor...' : 'Tarama Tamamlandı'}</h2>
          <p className="text-sm text-gray-500">{isScanning ? 'Yakındaki Bluetooth cihazları aranıyor' : `${devices.length} cihaz bulundu`}</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 z-10">
        {devices.map((device) => (
          <Card key={device.id} className="!p-4 flex items-center justify-between cursor-pointer hover:border-primary-500 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${device.status === 'connected' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}>
                {device.status === 'connected' ? <CheckCircle size={20} /> : <Wifi size={20} />}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{device.name}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                   <span className="capitalize">{device.status === 'connected' ? 'Bağlı' : device.status === 'connecting' ? 'Bağlanıyor...' : 'Müsait'}</span>
                   {device.battery && (
                       <span className="flex items-center gap-1 border-l pl-2 border-gray-300 dark:border-gray-600">
                           <Battery size={12} /> %{device.battery}
                       </span>
                   )}
                </div>
              </div>
            </div>
            
            {device.status !== 'connected' && (
                <Button 
                    variant={device.status === 'connecting' ? 'ghost' : 'secondary'}
                    className="!py-2 !px-3 text-sm"
                    onClick={() => connectDevice(device.id)}
                >
                    {device.status === 'connecting' ? 'Bağlanıyor...' : 'Bağlan'}
                </Button>
            )}
          </Card>
        ))}
      </div>
      
      {!isScanning && (
          <div className="mt-4 z-10">
              <Button fullWidth onClick={() => setIsScanning(true)}>Yeniden Tara</Button>
          </div>
      )}
    </div>
  );
};
