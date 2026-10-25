import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Crown, 
  Zap, 
  Coins, 
  Camera, 
  Check, 
  MapPin, 
  Languages, 
  Award, 
  Gift, 
  Lock, 
  X,
  Compass,
  ArrowRight
} from 'lucide-react';
import { UserPassportData, UserProfile } from '../types';
import { INITIAL_USER_PROFILE, INITIAL_PASSPORT } from '../data/mockData';

interface ProfileTabProps {
  passport: UserPassportData;
  onUpdatePassport: (newPassport: UserPassportData) => void;
  isDarkMode: boolean;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  passport,
  onUpdatePassport,
  isDarkMode,
}) => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationStep, setVerificationStep] = useState<'intro' | 'scanning' | 'complete'>('intro');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [boostActiveUntil, setBoostActiveUntil] = useState<number | null>(null);
  const [showGiftsModal, setShowGiftsModal] = useState(false);
  const [activePlan, setActivePlan] = useState<'Free' | 'WorldPass' | 'Global VIP'>(passport.premiumTier || 'WorldPass');

  const handleStartVerification = () => {
    setVerificationStep('scanning');
    setTimeout(() => {
      setVerificationStep('complete');
      setProfile((prev) => ({ ...prev, isVerified: true, trustScore: 100 }));
      onUpdatePassport({
        ...passport,
        xp: passport.xp + 500,
        badges: passport.badges.map((b) => b.id === 'b2' ? { ...b, unlocked: true } : b)
      });
    }, 2800);
  };

  const handleActivateBoost = () => {
    if (passport.boostsLeft <= 0) {
      setShowSubscriptionModal(true);
      return;
    }

    onUpdatePassport({
      ...passport,
      boostsLeft: passport.boostsLeft - 1
    });

    setBoostActiveUntil(Date.now() + 30 * 60 * 1000); // 30 minutes
  };

  const handleSelectPlan = (plan: 'Free' | 'WorldPass' | 'Global VIP') => {
    setActivePlan(plan);
    onUpdatePassport({
      ...passport,
      isPremium: plan !== 'Free',
      premiumTier: plan,
      superLikesLeft: plan === 'Global VIP' ? 99 : 10,
      boostsLeft: plan === 'Global VIP' ? 5 : 2
    });
    setShowSubscriptionModal(false);
  };

  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto pb-20 select-none">
      {/* Profile Overview Card */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 mb-4 shadow-xl relative overflow-hidden">
        {/* Glow behind avatar */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-3.5 mb-3">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 ring-2 ring-indigo-500/50">
            <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            <button
              onClick={() => setShowVerificationModal(true)}
              className="absolute bottom-0 right-0 p-1 rounded-tl-lg bg-indigo-600 text-white"
              title="Verificar selfie 3D"
            >
              <Camera className="w-3 h-3" />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-bold text-slate-100">{profile.name}, {profile.age}</h2>
              {profile.isVerified ? (
                <span title="Verificado con selfie biométrica 3D">
                  <ShieldCheck className="w-4 h-4 text-blue-400 fill-blue-500/20" />
                </span>
              ) : (
                <button
                  onClick={() => setShowVerificationModal(true)}
                  className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-semibold border border-amber-500/30"
                >
                  Verificar ID
                </button>
              )}
              <span className="text-sm">{profile.flag}</span>
            </div>

            <p className="text-xs text-slate-400 truncate">{profile.occupation}</p>
            <div className="flex items-center gap-2 text-[11px] text-indigo-400 font-medium mt-1">
              <span>{profile.mbti}</span>
              <span>·</span>
              <span>{profile.city}</span>
              <span>·</span>
              <span>TrustScore: {profile.trustScore}%</span>
            </div>
          </div>
        </div>

        {/* Level & XP Progress Bar */}
        <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-200">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Nivel {passport.level}: {passport.levelTitle}</span>
            </div>
            <span className="font-mono text-indigo-400 text-[11px]">
              {passport.xp} / {passport.xpToNextLevel} XP
            </span>
          </div>

          {/* Bar */}
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
              style={{ width: `${(passport.xp / passport.xpToNextLevel) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Action Monetization Grid */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        {/* Profile Boost */}
        <button
          onClick={handleActivateBoost}
          className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
            boostActiveUntil
              ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/20'
              : 'bg-slate-900 border-slate-800 hover:border-amber-500/40 text-slate-200'
          }`}
        >
          <Zap className={`w-5 h-5 mb-1 ${boostActiveUntil ? 'text-amber-400 animate-bounce' : 'text-amber-400'}`} />
          <span className="text-xs font-bold block">
            {boostActiveUntil ? '10x Activo' : 'Boost Perfil'}
          </span>
          <span className="text-[10px] text-slate-400">
            {boostActiveUntil ? '30m restantes' : `${passport.boostsLeft} disponibles`}
          </span>
        </button>

        {/* Coins Wallet */}
        <button
          onClick={() => setShowGiftsModal(true)}
          className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-center transition-all cursor-pointer flex flex-col items-center justify-center"
        >
          <Coins className="w-5 h-5 text-indigo-400 mb-1" />
          <span className="text-xs font-bold text-slate-200 block">{passport.coins} Coins</span>
          <span className="text-[10px] text-slate-400">Regalos & Tienda</span>
        </button>

        {/* VIP Subscription */}
        <button
          onClick={() => setShowSubscriptionModal(true)}
          className="p-3 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-500/40 text-center transition-all cursor-pointer flex flex-col items-center justify-center shadow-md"
        >
          <Crown className="w-5 h-5 text-amber-400 mb-1" />
          <span className="text-xs font-bold text-white block">{activePlan}</span>
          <span className="text-[10px] text-indigo-300">Gestionar Plan</span>
        </button>
      </div>

      {/* Cultural Passport Stamps Section */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 mb-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-100">Pasaporte de Conexiones Mundiales</h3>
          </div>
          <span className="text-xs font-mono text-indigo-400">{passport.stampsCount} sellos</span>
        </div>

        <p className="text-xs text-slate-400 mb-3 leading-relaxed">
          Cada vez que conectas y conversas con alguien de una nueva cultura, desbloqueas el sello oficial en tu pasaporte:
        </p>

        {/* Stamps Grid */}
        <div className="grid grid-cols-4 gap-2">
          {passport.visitedCountries.map((country, idx) => (
            <div
              key={idx}
              className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center text-center group hover:border-indigo-500/40 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xs mb-1">
                {country === 'Japón' ? '🇯🇵' : country === 'Francia' ? '🇫🇷' : country === 'Brasil' ? '🇧🇷' : country === 'Italia' ? '🇮🇹' : country === 'Portugal' ? '🇵🇹' : country === 'México' ? '🇲🇽' : '🇬🇧'}
              </div>
              <span className="text-[10px] font-semibold text-slate-200 truncate w-full">{country}</span>
              <span className="text-[9px] text-emerald-400 font-mono">Sellado</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Badges & Quests */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 mb-4">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
          Insignias & Logros Políglotas
        </span>
        <div className="space-y-2.5">
          {passport.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3 rounded-2xl border flex items-center justify-between ${
                badge.unlocked
                  ? 'bg-slate-950/70 border-slate-800'
                  : 'bg-slate-950/30 border-slate-800/40 opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <span className="text-xs font-bold text-slate-100 block">{badge.name}</span>
                  <span className="text-[11px] text-slate-400">{badge.description}</span>
                </div>
              </div>
              {badge.unlocked ? (
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Lock className="w-4 h-4 text-slate-600 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SELFIE 3D LIVENESS VERIFICATION MODAL */}
      {showVerificationModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center p-5 text-center animate-fade-in">
          <div className="w-full max-w-sm p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="flex justify-end mb-2">
              <button onClick={() => setShowVerificationModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {verificationStep === 'intro' && (
              <>
                <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Verificación Facial Biométrica 3D</h3>
                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                  WorldConnect protege la comunidad global eliminando perfiles falsos y catfishing. Esta prueba rápida de 5 segundos comprueba que eres tú.
                </p>
                <button
                  onClick={handleStartVerification}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  Iniciar Prueba de Cámara 3D
                </button>
              </>
            )}

            {verificationStep === 'scanning' && (
              <div className="py-4 flex flex-col items-center">
                {/* Oval Camera Ring */}
                <div className="relative w-44 h-56 rounded-full border-4 border-indigo-500/80 border-t-transparent animate-spin mb-4 overflow-hidden flex items-center justify-center bg-slate-950">
                  <div className="w-full h-full object-cover opacity-60 flex items-center justify-center">
                    <Camera className="w-10 h-10 text-indigo-400" />
                  </div>
                </div>
                <p className="text-xs font-semibold text-indigo-300 animate-pulse">
                  Gira la cabeza suavemente hacia la derecha...
                </p>
                <span className="text-[10px] text-slate-500 mt-1">Escaneando vectores de profundidad con IA</span>
              </div>
            )}

            {verificationStep === 'complete' && (
              <div className="py-4 flex flex-col items-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">¡Identidad Verificada al 100%!</h3>
                <p className="text-xs text-slate-300 mb-6">
                  Has ganado la insignia oficial FaceMatch Pro y +500 XP en tu pasaporte cultural.
                </p>
                <button
                  onClick={() => {
                    setShowVerificationModal(false);
                    setVerificationStep('intro');
                  }}
                  className="w-full py-3 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 cursor-pointer"
                >
                  Continuar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBSCRIPTION & VIP TIERS MODAL */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-sm max-h-[90%] bg-slate-900 border border-indigo-500/30 rounded-3xl p-5 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Planes WorldConnect</h3>
              </div>
              <button onClick={() => setShowSubscriptionModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {/* WorldPass */}
              <div
                onClick={() => handleSelectPlan('WorldPass')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  activePlan === 'WorldPass'
                    ? 'bg-indigo-950/60 border-indigo-500 shadow-md ring-1 ring-indigo-500'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold text-white">WorldPass</span>
                  <span className="text-xs font-mono font-bold text-indigo-400">$14.99 / mes</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-2">Ideal para conectar sin límites en cualquier continente</p>
                <ul className="text-[11px] text-slate-300 space-y-1">
                  <li>✓ Likes y Rebobinados Ilimitados</li>
                  <li>✓ Traducción IA de chat ilimitada</li>
                  <li>✓ Teleport Virtual a cualquier país</li>
                  <li>✓ 5 Super Likes por semana</li>
                </ul>
              </div>

              {/* Global VIP */}
              <div
                onClick={() => handleSelectPlan('Global VIP')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  activePlan === 'Global VIP'
                    ? 'bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border-purple-500 shadow-lg ring-1 ring-purple-500'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white">Global VIP</span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold">TOP</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">$29.99 / mes</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-2">La experiencia definitiva con salas 3D y prioridad de match</p>
                <ul className="text-[11px] text-slate-300 space-y-1">
                  <li>✓ Todo lo de WorldPass incluido</li>
                  <li>✓ Videollamadas HD con traducción simultánea de voz</li>
                  <li>✓ Acceso a Citas Virtuales 3D ilimitadas</li>
                  <li>✓ 1 Boost mensual gratuito + Super Likes infinitos</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowSubscriptionModal(false)}
              className="w-full py-2.5 text-xs text-slate-400 font-medium hover:text-slate-200 cursor-pointer text-center"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* VIRTUAL GIFTS & COINS STORE MODAL */}
      {showGiftsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-pink-400" />
                <h3 className="text-lg font-bold text-white">Regalos Culturales</h3>
              </div>
              <button onClick={() => setShowGiftsModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Envía presentes emblemáticos a tus matches internacionales para destacar en el chat:
            </p>

            <div className="grid grid-cols-2 gap-2.5 mb-6">
              {[
                { name: 'Té Matcha de Kioto', icon: '🍵', cost: 50 },
                { name: 'Vino Pinot Noir de París', icon: '🍷', cost: 80 },
                { name: 'Flor de Sakura Sagrada', icon: '🌸', cost: 120 },
                { name: 'Açaí Orgánico de Río', icon: '🥥', cost: 60 },
              ].map((g, i) => (
                <div key={i} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center text-center">
                  <span className="text-2xl mb-1">{g.icon}</span>
                  <span className="text-xs font-semibold text-slate-200">{g.name}</span>
                  <span className="text-[10px] text-amber-400 font-mono mt-1">{g.cost} Coins</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowGiftsModal(false)}
              className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs"
            >
              Cerrar Tienda
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
