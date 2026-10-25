import React from 'react';
import { Wifi, Battery, Smartphone, Monitor } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  isPhoneView: boolean;
  onToggleView: () => void;
  isDarkMode: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  isPhoneView,
  onToggleView,
  isDarkMode,
}) => {
  const currentTime = '09:41';

  if (!isPhoneView) {
    return (
      <div className={`min-h-screen w-full transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
        <div className="max-w-6xl mx-auto px-4 py-4 min-h-screen flex flex-col">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full py-6 px-4 flex flex-col items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-100'}`}>
      {/* Top Device Bar */}
      <div className="mb-4 flex items-center justify-between w-full max-w-[420px] px-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-300">Apple iPhone 16 Pro View</span>
          <span className="text-slate-600">·</span>
          <span>iOS 18</span>
        </div>
        <button
          onClick={onToggleView}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-slate-900/60 border border-slate-800 rounded-full transition-colors cursor-pointer"
          title="Cambiar a vista de escritorio expandida"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Expandir pantalla</span>
        </button>
      </div>

      {/* Physical iPhone Shell */}
      <div className="relative w-full max-w-[400px] h-[844px] rounded-[52px] p-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-2xl shadow-indigo-950/40 border border-slate-700/80 ring-1 ring-white/10 flex flex-col overflow-hidden">
        {/* Screen Bezel & Dynamic Island Area */}
        <div className={`relative w-full h-full rounded-[42px] overflow-hidden flex flex-col border border-black/40 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-900'}`}>
          {/* Status Bar */}
          <div className="sticky top-0 z-50 px-7 pt-3 pb-2 flex items-center justify-between text-xs font-semibold select-none backdrop-blur-md bg-transparent">
            <span>{currentTime}</span>

            {/* Dynamic Island Pill */}
            <div className="w-28 h-6 bg-black rounded-full flex items-center justify-between px-2.5 mx-auto shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800/80 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-500/60" />
              </div>
              <div className="w-2 h-2 rounded-full bg-indigo-500/40 animate-pulse" />
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[10px] font-mono">5G</span>
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Screen Scrollable Body */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative">
            {children}
          </div>

          {/* iPhone Home Indicator */}
          <div className="w-full flex justify-center py-2.5 bg-transparent pointer-events-none shrink-0">
            <div className={`w-32 h-1 rounded-full ${isDarkMode ? 'bg-white/40' : 'bg-black/30'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};
