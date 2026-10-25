import React from 'react';
import { 
  Flame, 
  Globe, 
  MessageCircle, 
  Calendar, 
  User, 
  Sun, 
  Moon, 
  FileText,
  Sparkles
} from 'lucide-react';

export type TabType = 'discover' | 'world' | 'chat' | 'events' | 'profile';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadCount: number;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenDossier: () => void;
  isPhoneView: boolean;
}

export const TopHeader: React.FC<{
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenDossier: () => void;
}> = ({ isDarkMode, onToggleTheme, onOpenDossier }) => {
  return (
    <header className="sticky top-0 z-40 px-4 py-2.5 flex items-center justify-between border-b border-slate-200/10 backdrop-blur-xl bg-slate-900/70 text-slate-100 shrink-0">
      {/* Brand Zone */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-600/30">
          <Globe className="w-4 h-4 text-white" />
        </div>
        <div>
          <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-200 to-violet-400 bg-clip-text text-transparent">
            WorldConnect
          </span>
        </div>
      </div>

      {/* Action Zone */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenDossier}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 active:scale-95 transition-all cursor-pointer"
          title="Ver Dossier Ejecutivo de Producto, UX, Tech, Marketing y Seguridad"
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Equipo Experto</span>
          <span className="sm:hidden">Dossier</span>
        </button>

        <button
          onClick={onToggleTheme}
          aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100 bg-slate-800/60 border border-slate-700/60 transition-colors cursor-pointer"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>
      </div>
    </header>
  );
};

export const BottomTabBar: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  unreadCount,
  isDarkMode,
}) => {
  const tabs = [
    { id: 'discover' as TabType, label: 'Descubrir', icon: Flame },
    { id: 'world' as TabType, label: 'Mundo', icon: Globe },
    { id: 'chat' as TabType, label: 'Chats', icon: MessageCircle, badge: unreadCount },
    { id: 'events' as TabType, label: 'Eventos', icon: Calendar },
    { id: 'profile' as TabType, label: 'Pasaporte', icon: User },
  ];

  return (
    <nav 
      aria-label="Navegación principal"
      className={`sticky bottom-0 z-40 w-full border-t backdrop-blur-xl transition-colors duration-200 pb-safe ${
        isDarkMode 
          ? 'bg-slate-950/85 border-slate-800/80 text-slate-300' 
          : 'bg-white/90 border-slate-200/90 text-slate-700 shadow-lg'
      }`}
    >
      <div className="grid grid-cols-5 h-16 items-center px-1 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-transform active:scale-90 ${
                isActive 
                  ? 'text-indigo-500 font-semibold' 
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'}`} />
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-1 whitespace-nowrap ${isActive ? 'text-indigo-400 font-semibold' : 'text-slate-400'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-indigo-500" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
