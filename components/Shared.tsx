import React from 'react';
import { Settings, Volume2, Mic, Activity, Zap, X } from 'lucide-react';
import clsx from 'clsx';
import { useStore } from '../store';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  className?: string;
  fullWidth?: boolean;
  icon?: React.ElementType;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className,
  fullWidth = false,
  icon: Icon
}) => {
  const baseStyles = "px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95";
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/30",
    secondary: "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300",
    outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20"
  };

  return (
    <button
      onClick={onClick}
      className={clsx(baseStyles, variants[variant], fullWidth && "w-full", className)}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={clsx("bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6", className)}>
    {children}
  </div>
);

export const AudioSettingsModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { audioSettings, updateAudioSettings } = useStore();
  const { speakerVolume, micSensitivity, echoCancellation, noiseReduction } = audioSettings;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary-500" />
            Ses Ayarları
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Speaker Volume */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-2"><Volume2 size={16} /> Hoparlör Ses Seviyesi</span>
              <span>{speakerVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={speakerVolume}
              onChange={(e) => updateAudioSettings({ speakerVolume: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>

          {/* Mic Sensitivity */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-2"><Mic size={16} /> Mikrofon Hassasiyeti</span>
              <span>{micSensitivity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={micSensitivity}
              onChange={(e) => updateAudioSettings({ micSensitivity: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>

          <div className="h-px bg-gray-100 dark:bg-gray-800" />

          {/* Toggles */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                <Activity size={20} />
              </div>
              <div>
                <p className="font-semibold text-sm">Echo Cancellation</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Yankı engelleme</p>
              </div>
            </div>
            <button
              onClick={() => updateAudioSettings({ echoCancellation: !echoCancellation })}
              className={clsx(
                "w-12 h-6 rounded-full transition-colors relative",
                echoCancellation ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-600"
              )}
            >
              <div className={clsx("w-4 h-4 bg-white rounded-full absolute top-1 transition-all", echoCancellation ? "left-7" : "left-1")} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                <Zap size={20} />
              </div>
              <div>
                <p className="font-semibold text-sm">Noise Reduction</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Gürültü azaltma</p>
              </div>
            </div>
            <button
              onClick={() => updateAudioSettings({ noiseReduction: !noiseReduction })}
              className={clsx(
                "w-12 h-6 rounded-full transition-colors relative",
                noiseReduction ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-600"
              )}
            >
              <div className={clsx("w-4 h-4 bg-white rounded-full absolute top-1 transition-all", noiseReduction ? "left-7" : "left-1")} />
            </button>
          </div>
        </div>

        <div className="mt-8">
           <Button fullWidth onClick={onClose}>Tamam</Button>
        </div>
      </div>
    </div>
  );
};