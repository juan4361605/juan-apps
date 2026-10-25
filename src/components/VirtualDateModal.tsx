import React, { useState } from 'react';
import { 
  Coffee, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Heart, 
  X, 
  MessageCircle, 
  Check, 
  Smile,
  Compass
} from 'lucide-react';
import { UserProfile } from '../types';

interface VirtualDateModalProps {
  profile: UserProfile;
  onClose: () => void;
  isDarkMode: boolean;
}

export const VirtualDateModal: React.FC<VirtualDateModalProps> = ({
  profile,
  onClose,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<'rome' | 'paris' | 'kyoto' | 'iceland'>('rome');
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(true);
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [showToastCelebration, setShowToastCelebration] = useState(false);

  const locations = [
    {
      id: 'rome' as const,
      name: 'Café en Piazza Navona',
      city: 'Roma, Italia 🇮🇹',
      ambientSound: 'Murmullo de fuente & Jazz italiano',
      bgGradient: 'from-amber-900/60 via-stone-900 to-slate-950',
      icon: '☕'
    },
    {
      id: 'paris' as const,
      name: 'Terraza en Montmartre',
      city: 'París, Francia 🇫🇷',
      ambientSound: 'Acordeón bohemio & Lluvia suave',
      bgGradient: 'from-blue-900/50 via-indigo-950 to-slate-950',
      icon: '🍷'
    },
    {
      id: 'kyoto' as const,
      name: 'Pabellón de Bambú',
      city: 'Kioto, Japón 🇯🇵',
      ambientSound: 'Viento en bambú & Cuencos de té',
      bgGradient: 'from-emerald-950/60 via-slate-900 to-slate-950',
      icon: '🍵'
    },
    {
      id: 'iceland' as const,
      name: 'Cabaña Aurora Boreal',
      city: 'Reikiavik, Islandia 🇮🇸',
      ambientSound: 'Fuego de chimenea & Cielo estrellado',
      bgGradient: 'from-violet-950/70 via-purple-950 to-slate-950',
      icon: '✨'
    }
  ];

  const deepPrompts = [
    'Si tu vida fuera una película de autor, ¿en qué ciudad del mundo empezaría la primera escena y por qué?',
    '¿Qué es algo que la mayoría de la gente malinterpreta sobre ti a primera vista?',
    '¿Cuál es la tradición o costumbre de tu familia que te gustaría conservar siempre?',
    'Si tuvieras un billete de avión abierto para usar mañana mismo con alguien especial, ¿hacia dónde volaríamos?',
    '¿Qué canción resume perfectamente el estado de tu corazón en este momento?'
  ];

  const currentLocation = locations.find(l => l.id === selectedLocation) || locations[0];

  const handleNextPrompt = () => {
    setActivePromptIndex((prev) => (prev + 1) % deepPrompts.length);
  };

  const handleVirtualToast = () => {
    setShowToastCelebration(true);
    setTimeout(() => setShowToastCelebration(false), 2600);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-b ${currentLocation.bgGradient} flex flex-col justify-between p-4 animate-fade-in pb-safe text-white`}>
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 z-20">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-pink-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            PRIMERA CITA VIRTUAL 3D
          </span>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>{currentLocation.name}</span>
            <span className="text-xs">{currentLocation.city}</span>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Ambient sound toggle */}
          <button
            onClick={() => setIsAmbientPlaying(!isAmbientPlaying)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
              isAmbientPlaying
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-white/10 text-slate-400 border-white/10'
            }`}
          >
            {isAmbientPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{currentLocation.ambientSound}</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Location Switcher Horizontal Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-2 z-20 no-scrollbar">
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setSelectedLocation(loc.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedLocation === loc.id
                ? 'bg-white text-slate-900 shadow-md scale-105'
                : 'bg-black/30 hover:bg-black/50 text-slate-300 border border-white/10'
            }`}
          >
            <span>{loc.icon}</span>
            <span>{loc.name}</span>
          </button>
        ))}
      </div>

      {/* Central Visual Atmosphere & Partner Avatar Stage */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10 text-center">
        {/* Glow halo */}
        <div className="w-48 h-48 rounded-full bg-pink-500/20 blur-3xl absolute pointer-events-none" />

        {/* Partner Card on Date */}
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-white/20 shadow-2xl mx-auto">
            <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
          </div>
          <span className="absolute -bottom-2 -right-2 text-2xl">{profile.flag}</span>
        </div>

        <h4 className="text-xl font-extrabold tracking-tight mb-1">
          Compartiendo un momento con {profile.name}
        </h4>
        <p className="text-xs text-slate-300 max-w-sm mb-6">
          Están sentados juntos en {currentLocation.name}. La música de fondo crea una atmósfera mágica sin silencios incómodos.
        </p>

        {/* Deep Connection Prompt Card */}
        <div className="w-full max-w-md p-4 rounded-3xl bg-black/50 backdrop-blur-xl border border-white/15 text-left mb-4 shadow-xl">
          <div className="flex items-center justify-between text-xs text-pink-300 font-semibold mb-2">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Pregunta para conectar ({activePromptIndex + 1}/{deepPrompts.length})
            </span>
            <button
              onClick={handleNextPrompt}
              className="text-[11px] underline hover:text-white cursor-pointer"
            >
              Siguiente pregunta →
            </button>
          </div>
          <p className="text-sm font-medium text-white leading-relaxed italic">
            "{deepPrompts[activePromptIndex]}"
          </p>
        </div>

        {/* Virtual Toast Button */}
        <button
          onClick={handleVirtualToast}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-xs shadow-lg shadow-pink-500/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
        >
          <span>🥂 Brindis Virtual</span>
        </button>

        {showToastCelebration && (
          <div className="mt-3 text-xs text-amber-300 font-bold animate-bounce">
            ✨ ¡Brindis compartido con {profile.name}! +100 puntos de afinidad cultural.
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 z-20">
        <span>WorldConnect Experiencia 3D</span>
        <button
          onClick={onClose}
          className="text-white hover:underline cursor-pointer"
        >
          Volver al chat
        </button>
      </div>
    </div>
  );
};
