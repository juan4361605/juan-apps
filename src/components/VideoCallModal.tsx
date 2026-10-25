import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  Languages, 
  Sparkles, 
  ShieldCheck, 
  Smile, 
  Volume2,
  X
} from 'lucide-react';
import { UserProfile } from '../types';

interface VideoCallModalProps {
  profile: UserProfile;
  onClose: () => void;
  isDarkMode: boolean;
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  profile,
  onClose,
}) => {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [activeSubtitle, setActiveSubtitle] = useState({
    original: profile.countryCode === 'JP' ? '東京は今とても静かな夜です。そちらの天気はどうですか？' : 'Bonjour! Je suis vraiment ravi de te voir enfin en vidéo.',
    translated: profile.countryCode === 'JP' ? 'Tokio está muy tranquila esta noche. ¿Cómo está el clima por allí?' : '¡Hola! Me alegra muchísimo verte por fin en vídeo.',
    speaker: profile.name
  });
  const [showAiCueCard, setShowAiCueCard] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    const subtitleTimer = setTimeout(() => {
      setActiveSubtitle({
        original: profile.countryCode === 'JP' 
          ? 'あなたの街のカフェの雰囲気をいつか見てみたいです ☕' 
          : 'J’espère qu’on aura bientôt l’occasion de prendre un café ensemble en vrai.',
        translated: profile.countryCode === 'JP'
          ? 'Me encantaría ver el ambiente de los cafés de tu ciudad algún día ☕'
          : 'Espero que pronto tengamos la oportunidad de tomarnos un café juntos en persona.',
        speaker: profile.name
      });
    }, 4500);

    return () => {
      clearInterval(timer);
      clearTimeout(subtitleTimer);
    };
  }, [profile]);

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-4 animate-fade-in pb-safe">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between z-20">
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-white">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold">{profile.name}</span>
              <ShieldCheck className="w-3 h-3 text-blue-400" />
              <span className="text-xs">{profile.flag}</span>
            </div>
            <span className="text-[10px] text-slate-300 font-mono">{formatSeconds(callDuration)} · HD 1080p</span>
          </div>
        </div>

        {/* Real-time speech translation badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium backdrop-blur-md">
          <Languages className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Subtítulos Traducidos en Vivo (IA)</span>
        </div>
      </div>

      {/* Main Remote Video Viewport */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-full h-full object-cover filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Local Self PIP Preview */}
      <div className="absolute top-20 right-4 w-28 h-40 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl z-20 bg-slate-900">
        {isVideoOff ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-[10px]">
            <VideoOff className="w-6 h-6 mb-1 text-slate-500" />
            <span>Cámara apagada</span>
          </div>
        ) : (
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
            alt="Yo"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Bottom Area: Live Subtitle Box + AI Cue Card + Controls */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-lg mx-auto">
        {/* Live Subtitle HUD */}
        <div className="w-full mb-3 p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-lg animate-fade-in">
          <div className="flex items-center justify-between text-[10px] text-emerald-400 font-mono mb-1">
            <span>Voz de {activeSubtitle.speaker}</span>
            <span>Español simultáneo</span>
          </div>
          <p className="text-xs font-semibold text-white leading-relaxed">
            "{activeSubtitle.translated}"
          </p>
          <p className="text-[10px] text-slate-400 italic mt-0.5">
            Original: {activeSubtitle.original}
          </p>
        </div>

        {/* AI Conversation Cue Card */}
        {showAiCueCard && (
          <div className="w-full mb-4 p-2.5 rounded-xl bg-indigo-950/70 backdrop-blur-md border border-indigo-500/30 text-indigo-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Tema sugerido por IA: Pregúntale sobre su rincón favorito de {profile.city}.</span>
            </div>
            <button onClick={() => setShowAiCueCard(false)} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Call Controls Floating Bar */}
        <div className="flex items-center gap-4 p-2.5 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/20 shadow-2xl">
          {/* Mute Mic */}
          <button
            onClick={() => setIsMicMuted(!isMicMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isMicMuted ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Toggle Video */}
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isVideoOff ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>

          {/* End Call */}
          <button
            onClick={onClose}
            className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/40 active:scale-95 transition-all cursor-pointer"
            title="Finalizar llamada"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
