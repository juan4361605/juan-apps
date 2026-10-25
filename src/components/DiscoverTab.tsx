import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Star, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Languages, 
  Info, 
  ChevronUp, 
  Compass, 
  MessageCircle,
  Brain,
  Send,
  Check
} from 'lucide-react';
import { UserProfile } from '../types';
import { PROFILES_CATALOG, INITIAL_USER_PROFILE } from '../data/mockData';

interface DiscoverTabProps {
  onMatch: (profile: UserProfile) => void;
  onOpenChatWith: (profile: UserProfile) => void;
  isDarkMode: boolean;
}

export const DiscoverTab: React.FC<DiscoverTabProps> = ({
  onMatch,
  onOpenChatWith,
  isDarkMode,
}) => {
  const [deck, setDeck] = useState<UserProfile[]>(PROFILES_CATALOG);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showFullProfile, setShowFullProfile] = useState(false);
  const [showIcebreakerSheet, setShowIcebreakerSheet] = useState(false);
  const [icebreakers, setIcebreakers] = useState<string[]>([]);
  const [isLoadingIcebreakers, setIsLoadingIcebreakers] = useState(false);
  const [lastAction, setLastAction] = useState<'like' | 'pass' | 'superlike' | null>(null);
  const [matchCelebration, setMatchCelebration] = useState<UserProfile | null>(null);
  const [copiedIcebreaker, setCopiedIcebreaker] = useState<string | null>(null);

  const currentProfile = deck[currentIndex];

  const handleSwipe = (action: 'like' | 'pass' | 'superlike') => {
    if (!currentProfile) return;

    setLastAction(action);
    setHistory((prev) => [...prev, currentIndex]);

    if (action === 'like' || action === 'superlike') {
      // Trigger match celebration for international matches!
      setMatchCelebration(currentProfile);
      onMatch(currentProfile);
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setLastAction(null);
      setIsPlayingAudio(false);
      setShowFullProfile(false);
    }, 280);
  };

  const handleRewind = () => {
    if (history.length === 0) return;
    const lastIndex = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setCurrentIndex(lastIndex);
  };

  const toggleVoiceBio = () => {
    setIsPlayingAudio((prev) => !prev);
  };

  const fetchAiIcebreakers = async () => {
    if (!currentProfile) return;
    setIsLoadingIcebreakers(true);
    setShowIcebreakerSheet(true);

    try {
      const response = await fetch('/api/ai/icebreakers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfile: INITIAL_USER_PROFILE,
          targetProfile: currentProfile,
          language: 'es'
        })
      });

      const data = await response.json();
      if (data.icebreakers && data.icebreakers.length > 0) {
        setIcebreakers(data.icebreakers);
      } else {
        setIcebreakers([
          `¡Hola ${currentProfile.name}! Me fascinó tu perfil en ${currentProfile.city}. ¿Cuál es el rincón más especial que recomendarías visitar?`,
          `Veo que te interesa ${currentProfile.interests[0]}. ¡A mí también! ¿Cómo empezó tu pasión por eso?`,
          `¡Qué coincidencia internacional! ¿Cuál es la tradición de ${currentProfile.country} que más te llena de orgullo?`
        ]);
      }
    } catch {
      setIcebreakers([
        `¡Hola ${currentProfile.name}! Saludos desde España. Me encantaría practicar idiomas y conocer más de ${currentProfile.city}.`,
        `Me llamó mucho la atención tu foto en ${currentProfile.city}. ¡Tienes un estilo genial!`,
        `¿Qué música o comida me recomendarías para empezar a enamorarme de tu país?`
      ]);
    } finally {
      setIsLoadingIcebreakers(false);
    }
  };

  const handleSendIcebreakerFromMatch = (text: string) => {
    setCopiedIcebreaker(text);
    setTimeout(() => {
      if (matchCelebration) {
        onOpenChatWith(matchCelebration);
        setMatchCelebration(null);
      }
    }, 600);
  };

  if (!currentProfile || currentIndex >= deck.length) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
          <Compass className="w-10 h-10 text-indigo-400 animate-spin" style={{ animationDuration: '12s' }} />
        </div>
        <h3 className="text-xl font-bold mb-2 text-slate-100">Has explorado todos los perfiles de hoy</h3>
        <p className="text-sm text-slate-400 max-w-xs mb-6">
          Nuestra IA está buscando nuevas conexiones en Tokio, París, Río y Nueva York. Vuelve en un momento o usa el Teleport Mundial.
        </p>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setHistory([]);
          }}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 active:scale-95 transition-transform cursor-pointer"
        >
          Reiniciar Exploración
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col relative px-3 py-2 overflow-hidden select-none">
      {/* Compatibility Banner */}
      <div className="flex items-center justify-between px-2 mb-2">
        <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-medium">
          <Brain className="w-3.5 h-3.5 text-indigo-400" />
          <span>Química MBTI: {INITIAL_USER_PROFILE.mbti} × {currentProfile.mbti}</span>
        </div>
        <div className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          94% Compatibilidad
        </div>
      </div>

      {/* Main Swipe Card */}
      <div className="relative flex-1 w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-900 flex flex-col transition-transform duration-300">
        {/* Photo Container */}
        <div className="relative w-full h-full min-h-[460px]">
          <img
            src={currentProfile.avatar}
            alt={currentProfile.name}
            className="w-full h-full object-cover"
            loading="eager"
            referrerPolicy="no-referrer"
          />

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Top Badges on Card */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            {/* Live Distance & Country */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/10 text-xs font-medium text-white shadow-sm">
              <span className="text-base">{currentProfile.flag}</span>
              <span>{currentProfile.country}</span>
              <span className="text-slate-400">·</span>
              <span>{currentProfile.distanceKm.toLocaleString()} km</span>
            </div>

            {/* Voice Bio Pill Button */}
            {currentProfile.voiceBioDuration && (
              <button
                onClick={toggleVoiceBio}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md text-xs font-medium transition-all shadow-md cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-slate-950/70 text-slate-200 border border-white/10 hover:bg-slate-900/90'
                }`}
                title="Escuchar saludo de voz"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>0:0{currentProfile.voiceBioDuration}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Voz real ({currentProfile.voiceBioDuration}s)</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Action Feedback Stamp Overlay */}
          {lastAction === 'like' && (
            <div className="absolute top-1/4 right-8 transform rotate-12 border-4 border-emerald-500 text-emerald-400 font-black text-3xl px-4 py-1.5 rounded-xl uppercase tracking-widest backdrop-blur-sm z-30 animate-pulse">
              LIKE
            </div>
          )}
          {lastAction === 'pass' && (
            <div className="absolute top-1/4 left-8 transform -rotate-12 border-4 border-rose-500 text-rose-400 font-black text-3xl px-4 py-1.5 rounded-xl uppercase tracking-widest backdrop-blur-sm z-30 animate-pulse">
              PASAR
            </div>
          )}
          {lastAction === 'superlike' && (
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -rotate-6 border-4 border-blue-400 text-blue-300 font-black text-3xl px-6 py-2 rounded-xl uppercase tracking-widest backdrop-blur-sm z-30 animate-bounce">
              SUPER LIKE
            </div>
          )}

          {/* Bottom Profile Details Inside Card */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
            {/* Name, Age, Verification */}
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight">{currentProfile.name}, {currentProfile.age}</h2>
                {currentProfile.isVerified && (
                  <span title="Verificación facial 3D aprobada">
                    <ShieldCheck className="w-5 h-5 text-blue-400 fill-blue-500/20" />
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowFullProfile(true)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
                title="Ver bio completa"
              >
                <ChevronUp className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* City & Occupation */}
            <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-2.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>{currentProfile.city}</span>
              <span className="text-slate-500">·</span>
              <span className="truncate">{currentProfile.occupation}</span>
            </div>

            {/* Spoken Languages */}
            <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-3">
              <Languages className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{currentProfile.languages.join(' · ')}</span>
            </div>

            {/* Bio summary */}
            <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed mb-3">
              "{currentProfile.bio}"
            </p>

            {/* Interests Chips */}
            <div className="flex flex-wrap gap-1.5">
              {currentProfile.interests.slice(0, 3).map((interest, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-medium text-slate-200 border border-white/10"
                >
                  {interest}
                </span>
              ))}
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-semibold">
                {currentProfile.mbti}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Action Buttons (Apple Tinder/Bumble ergonomic bar) */}
      <div className="mt-3 flex items-center justify-center gap-3.5 px-4 shrink-0">
        {/* Rewind */}
        <button
          onClick={handleRewind}
          disabled={history.length === 0}
          className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all cursor-pointer shadow-md ${
            history.length === 0
              ? 'opacity-40 border-slate-700 bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'border-amber-500/30 bg-slate-900 text-amber-400 hover:bg-amber-500/10 active:scale-90'
          }`}
          title="Deshacer último swipe"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Pass (Swipe Left) */}
        <button
          onClick={() => handleSwipe('pass')}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-slate-900 border border-rose-500/40 text-rose-500 hover:bg-rose-500/10 hover:border-rose-500 active:scale-90 transition-all shadow-lg cursor-pointer"
          title="Pasar"
        >
          <X className="w-7 h-7 stroke-[2.5]" />
        </button>

        {/* AI Icebreaker Assistant */}
        <button
          onClick={fetchAiIcebreakers}
          className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30 hover:brightness-110 active:scale-90 transition-all cursor-pointer"
          title="Rompehielos inteligente IA"
        >
          <Sparkles className="w-5 h-5" />
        </button>

        {/* Super Like */}
        <button
          onClick={() => handleSwipe('superlike')}
          className="w-11 h-11 rounded-full flex items-center justify-center bg-slate-900 border border-blue-400/40 text-blue-400 hover:bg-blue-400/10 active:scale-90 transition-all shadow-md cursor-pointer"
          title="Super Like Internacional"
        >
          <Star className="w-5 h-5 fill-blue-400/20" />
        </button>

        {/* Like (Swipe Right) */}
        <button
          onClick={() => handleSwipe('like')}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 hover:brightness-110 active:scale-90 transition-all cursor-pointer"
          title="Me Gusta"
        >
          <Heart className="w-7 h-7 fill-white stroke-none" />
        </button>
      </div>

      {/* FULL PROFILE MODAL / BOTTOM SHEET */}
      {showFullProfile && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex flex-col justify-end animate-fade-in">
          <div className="w-full max-h-[85%] bg-slate-900 text-slate-100 rounded-t-3xl border-t border-slate-700 p-5 overflow-y-auto pb-safe">
            <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold">{currentProfile.name}, {currentProfile.age}</h3>
                <p className="text-xs text-indigo-400">{currentProfile.occupation} · {currentProfile.city}, {currentProfile.country} {currentProfile.flag}</p>
              </div>
              <button
                onClick={() => setShowFullProfile(false)}
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cultural Fact Card */}
            <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 mb-4">
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider block mb-1">Dato Cultural de {currentProfile.country}</span>
              <p className="text-xs text-slate-300 italic">"{currentProfile.culturalFact}"</p>
            </div>

            {/* Prompts */}
            <div className="space-y-3 mb-4">
              {currentProfile.prompts.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <span className="text-xs font-semibold text-slate-400 block mb-1">{p.question}</span>
                  <p className="text-sm font-medium text-slate-100">{p.answer}</p>
                </div>
              ))}
            </div>

            {/* Trust & Safety Radar */}
            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="text-xs font-bold block text-slate-200">TrustScore: {currentProfile.trustScore}/100</span>
                  <span className="text-[11px] text-slate-400">Verificación 3D Facial Activa</span>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-semibold">100% Auténtico</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowFullProfile(false);
                  handleSwipe('pass');
                }}
                className="flex-1 py-3 rounded-xl bg-slate-800 text-rose-400 font-semibold text-sm border border-rose-500/30 hover:bg-rose-500/10 cursor-pointer"
              >
                Pasar
              </button>
              <button
                onClick={() => {
                  setShowFullProfile(false);
                  handleSwipe('like');
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                Me Gusta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI ICEBREAKER SHEET */}
      {showIcebreakerSheet && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex flex-col justify-end animate-fade-in">
          <div className="w-full max-h-[80%] bg-slate-900 text-slate-100 rounded-t-3xl border-t border-indigo-500/30 p-5 overflow-y-auto pb-safe">
            <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold">Rompehielos Inteligente IA</h3>
              </div>
              <button
                onClick={() => setShowIcebreakerSheet(false)}
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Gemini AI analizó las personalidades de ambos ({INITIAL_USER_PROFILE.mbti} & {currentProfile.mbti}) y sus pasiones por {currentProfile.interests[0]} para crear abridores respetuosos y culturales:
            </p>

            {isLoadingIcebreakers ? (
              <div className="py-8 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-slate-400 font-medium">Creando frases personalizadas con IA...</span>
              </div>
            ) : (
              <div className="space-y-2.5 mb-6">
                {icebreakers.map((text, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      handleSwipe('superlike');
                      setShowIcebreakerSheet(false);
                      onOpenChatWith(currentProfile);
                    }}
                    className="w-full text-left p-3.5 rounded-2xl bg-slate-800/80 hover:bg-indigo-600/20 border border-slate-700 hover:border-indigo-500/40 transition-all cursor-pointer group"
                  >
                    <p className="text-xs text-slate-200 group-hover:text-white leading-relaxed">"{text}"</p>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-indigo-400 font-medium">
                      <span>Enviar con Super Like</span>
                      <Send className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowIcebreakerSheet(false)}
              className="w-full py-2.5 text-xs text-slate-400 font-medium hover:text-slate-200 cursor-pointer text-center"
            >
              Cerrar y volver
            </button>
          </div>
        </div>
      )}

      {/* MATCH CELEBRATION MODAL */}
      {matchCelebration && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-indigo-600 flex items-center justify-center mb-4 shadow-xl shadow-rose-500/30 animate-bounce">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-pink-400 via-rose-300 to-indigo-400 bg-clip-text text-transparent mb-1">
            ¡Es un Match Mundial!
          </h2>
          <p className="text-xs text-slate-300 mb-6">
            Tú y {matchCelebration.name} se han gustado mutuamente desde {matchCelebration.city} {matchCelebration.flag}
          </p>

          {/* Overlapping Avatars */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 rounded-full ring-4 ring-indigo-500 overflow-hidden shadow-2xl -mr-4 z-10">
              <img src={INITIAL_USER_PROFILE.avatar} alt="Yo" className="w-full h-full object-cover" />
            </div>
            <div className="w-24 h-24 rounded-full ring-4 ring-rose-500 overflow-hidden shadow-2xl z-20">
              <img src={matchCelebration.avatar} alt={matchCelebration.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Suggested Quick Icebreakers */}
          <div className="w-full max-w-sm mb-6 text-left">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2 text-center">
              Rompe el hielo al instante con IA:
            </span>
            <div className="space-y-2">
              {[
                `¡Hola ${matchCelebration.name}! Qué alegría coincidir internacionalmente. ¿Cómo se dice "un placer" en tu idioma?`,
                `Me encantó tu foto en ${matchCelebration.city}. Si fuera hoy, ¿qué plato típico me invitarías a probar?`
              ].map((phrase, i) => (
                <button
                  key={i}
                  onClick={() => handleSendIcebreakerFromMatch(phrase)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500 text-xs text-slate-200 text-left transition-all cursor-pointer flex items-center justify-between"
                >
                  <span className="truncate pr-2">"{phrase}"</span>
                  {copiedIcebreaker === phrase ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <Send className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5 w-full max-w-xs">
            <button
              onClick={() => {
                onOpenChatWith(matchCelebration);
                setMatchCelebration(null);
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Abrir Chat con Traducción IA
            </button>
            <button
              onClick={() => setMatchCelebration(null)}
              className="w-full py-2.5 text-xs text-slate-400 hover:text-slate-200 font-medium cursor-pointer"
            >
              Seguir descubriendo personas
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
