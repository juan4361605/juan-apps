import React, { useState } from 'react';
import { 
  Send, 
  Mic, 
  Video, 
  Sparkles, 
  Languages, 
  ArrowLeft, 
  Play, 
  Pause, 
  Coffee, 
  Compass, 
  CheckCheck, 
  Paperclip,
  Check,
  ShieldCheck,
  Globe2,
  HelpCircle,
  X,
  Volume2,
  Copy,
  ChevronRight,
  RefreshCw,
  Info
} from 'lucide-react';
import { MatchConversation, UserProfile, ChatMessage } from '../types';
import { INITIAL_CONVERSATIONS, INITIAL_USER_PROFILE } from '../data/mockData';

interface ChatTabProps {
  conversations: MatchConversation[];
  activeChatProfile: UserProfile | null;
  onSelectChat: (conv: MatchConversation) => void;
  onBackToList: () => void;
  onStartVideoCall: (profile: UserProfile) => void;
  onStartVirtualDate: (profile: UserProfile) => void;
  isDarkMode: boolean;
}

// Available target languages for real-time translation API
const SUPPORTED_TRANSLATION_LANGUAGES = [
  { code: 'es', name: 'Español', flag: '🇪🇸', speechCode: 'es-ES' },
  { code: 'en', name: 'English', flag: '🇺🇸', speechCode: 'en-US' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', speechCode: 'fr-FR' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', speechCode: 'ja-JP' },
  { code: 'pt', name: 'Português', flag: '🇧🇷', speechCode: 'pt-BR' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', speechCode: 'de-DE' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', speechCode: 'it-IT' },
];

export const ChatTab: React.FC<ChatTabProps> = ({
  conversations,
  activeChatProfile,
  onSelectChat,
  onBackToList,
  onStartVideoCall,
  onStartVirtualDate,
  isDarkMode,
}) => {
  const [selectedConvId, setSelectedConvId] = useState<string | null>(
    activeChatProfile ? conversations.find(c => c.profile.id === activeChatProfile.id)?.id || conversations[0].id : null
  );
  const [inputText, setInputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [autoTranslateEnabled, setAutoTranslateEnabled] = useState(true);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [showIcebreakers, setShowIcebreakers] = useState(false);
  const [icebreakerList, setIcebreakerList] = useState<string[]>([]);
  const [isLoadingIcebreakers, setIsLoadingIcebreakers] = useState(false);

  // Real-time Message Selection & Translation Inspector state
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null);
  const [selectedTargetLang, setSelectedTargetLang] = useState<string>('es');
  const [activeTranslatedText, setActiveTranslatedText] = useState<string>('');
  const [activeDetectedLang, setActiveDetectedLang] = useState<string>('auto');
  const [activeCulturalNote, setActiveCulturalNote] = useState<string>('');
  const [isInspectingTranslation, setIsInspectingTranslation] = useState<boolean>(false);
  const [copiedTextState, setCopiedTextState] = useState<boolean>(false);

  // Active conversation object
  const activeConv = conversations.find((c) => c.id === selectedConvId) || 
    (activeChatProfile ? {
      id: `conv_${activeChatProfile.id}`,
      profile: activeChatProfile,
      lastMessage: '¡Nuevo Match! Di hola con el rompehielos IA.',
      lastMessageTime: 'Ahora',
      unreadCount: 0,
      compatibilityScore: 94,
      messages: []
    } : null);

  // Speech synthesis helper
  const handleSpeak = (text: string, langCode: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedTextState(true);
    setTimeout(() => setCopiedTextState(false), 2000);
  };

  // Trigger translation API when selecting or changing target language
  const handleSelectMessageForTranslation = async (msg: ChatMessage, customTargetLang = 'es') => {
    setSelectedMessage(msg);
    setSelectedTargetLang(customTargetLang);

    // If message already has the desired translation and no language switch requested
    if (msg.translatedText && customTargetLang === 'es') {
      setActiveTranslatedText(msg.translatedText);
      setActiveDetectedLang(msg.sourceLang || 'auto');
      setActiveCulturalNote(msg.culturalNote || 'Comunicación intercultural fluida y respetuosa.');
      return;
    }

    // Call translation API in real-time
    setIsInspectingTranslation(true);
    try {
      const response = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: msg.text,
          targetLang: customTargetLang,
          sourceLang: msg.sourceLang || 'auto'
        })
      });

      const data = await response.json();
      if (data.translatedText) {
        setActiveTranslatedText(data.translatedText);
        setActiveDetectedLang(data.detectedLang || msg.sourceLang || 'auto');
        setActiveCulturalNote(data.culturalNote || 'Matiz comunicativo verificado.');
        // Cache if it was the default language
        if (customTargetLang === 'es') {
          msg.translatedText = data.translatedText;
          msg.culturalNote = data.culturalNote;
        }
      } else {
        setActiveTranslatedText(msg.translatedText || msg.text);
      }
    } catch (err) {
      setActiveTranslatedText(msg.translatedText || msg.text);
      setActiveCulturalNote('Traducción directa.');
    } finally {
      setIsInspectingTranslation(false);
    }
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || !activeConv) return;

    const newMsgId = `m_${Date.now()}`;
    const userMsg: ChatMessage = {
      id: newMsgId,
      senderId: 'me',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceLang: 'es',
      targetLang: activeConv.profile.countryCode === 'JP' ? 'ja' : activeConv.profile.countryCode === 'FR' ? 'fr' : 'en'
    };

    activeConv.messages.push(userMsg);
    activeConv.lastMessage = textToSend;
    activeConv.lastMessageTime = 'Ahora';
    setInputText('');

    // Trigger AI translation & partner reply in real time
    setIsTranslating(true);

    try {
      const transRes = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToSend,
          targetLang: userMsg.targetLang,
          sourceLang: 'es'
        })
      });
      const transData = await transRes.json();
      if (transData.translatedText) {
        userMsg.translatedText = transData.translatedText;
        userMsg.culturalNote = transData.culturalNote;
      }
    } catch {
      userMsg.translatedText = textToSend;
    }

    // Simulate authentic international partner reply after 1.6 seconds
    setTimeout(async () => {
      let partnerReplyText = '';
      let partnerTranslated = '';
      let partnerLang = 'en';
      let culturalNote = '';

      if (activeConv.profile.countryCode === 'JP') {
        partnerReplyText = 'メッセージありがとう！あなたの言葉がとても温かくて嬉しいです 🌸 もっとお話ししたいですね！';
        partnerTranslated = '¡Muchas gracias por tu mensaje! Tus palabras son muy cálidas y me alegran 🌸 ¡Me encantaría seguir charlando!';
        partnerLang = 'ja';
        culturalNote = 'Tono cálido con flor de cerezo (sakura), símbolo de nuevos comienzos y hospitalidad.';
      } else if (activeConv.profile.countryCode === 'FR') {
        partnerReplyText = 'C’est adorable de ta part! J’adore ta façon de voir le monde. Tu viens quand à Paris?';
        partnerTranslated = '¡Es adorable de tu parte! Me encanta tu forma de ver el mundo. ¿Cuándo vienes a París?';
        partnerLang = 'fr';
        culturalNote = 'Expresión de coquetería parisina elegante y directa.';
      } else if (activeConv.profile.countryCode === 'BR') {
        partnerReplyText = 'Que mensagem linda! Adorei sua energia! Aqui a música e o mar estão maravilhosos!';
        partnerTranslated = '¡Qué mensaje tan lindo! ¡Me encantó tu energía! ¡Aquí la música y el mar están maravillosos!';
        partnerLang = 'pt';
        culturalNote = 'Afecto y espontaneidad típicamente cariocas.';
      } else {
        partnerReplyText = 'I really appreciate that! It is refreshing to connect with someone with such a global mindset.';
        partnerTranslated = '¡De verdad lo aprecio! Es muy refrescante conectar con alguien con una mentalidad tan global.';
        partnerLang = 'en';
        culturalNote = 'Agradecimiento sincero en tono cosmopolita.';
      }

      const partnerMsg: ChatMessage = {
        id: `m_rep_${Date.now()}`,
        senderId: activeConv.profile.id,
        text: partnerReplyText,
        translatedText: partnerTranslated,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceLang: partnerLang,
        targetLang: 'es',
        culturalNote
      };

      activeConv.messages.push(partnerMsg);
      activeConv.lastMessage = partnerTranslated;
      activeConv.lastMessageTime = 'Ahora';
      setIsTranslating(false);
    }, 1600);
  };

  const handleFetchIcebreakers = async () => {
    if (!activeConv) return;
    setIsLoadingIcebreakers(true);
    setShowIcebreakers(true);

    try {
      const res = await fetch('/api/ai/icebreakers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfile: INITIAL_USER_PROFILE,
          targetProfile: activeConv.profile,
          language: 'es'
        })
      });
      const data = await res.json();
      setIcebreakerList(data.icebreakers || []);
    } catch {
      setIcebreakerList([
        `¡Hola! Me encantó ver que compartimos pasión por los viajes. ¿Qué lugar del mundo te ha cambiado la perspectiva?`,
        `Si tuvieras que describir tu cultura usando solo tres palabras, ¿cuáles elegirías?`
      ]);
    } finally {
      setIsLoadingIcebreakers(false);
    }
  };

  const handleVoiceRecordToggle = () => {
    if (isRecordingVoice) {
      setIsRecordingVoice(false);
      if (activeConv) {
        const audioMsg: ChatMessage = {
          id: `m_audio_${Date.now()}`,
          senderId: 'me',
          text: '[Nota de voz en español]',
          translatedText: '[Nota de voz procesada y traducida en tiempo real]',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isAudio: true,
          audioDuration: recordingSeconds || 4,
          culturalNote: 'Audio sintetizado con motor de voz y traducción simultánea'
        };
        activeConv.messages.push(audioMsg);
        setRecordingSeconds(0);
      }
    } else {
      setIsRecordingVoice(true);
      setRecordingSeconds(1);
    }
  };

  // Helper for language name and flag display
  const getLanguageLabel = (code?: string) => {
    switch (code?.toLowerCase()) {
      case 'ja': return { name: 'Japonés', flag: '🇯🇵', speech: 'ja-JP' };
      case 'fr': return { name: 'Francés', flag: '🇫🇷', speech: 'fr-FR' };
      case 'pt': return { name: 'Portugués', flag: '🇧🇷', speech: 'pt-BR' };
      case 'en': return { name: 'Inglés', flag: '🇺🇸', speech: 'en-US' };
      case 'de': return { name: 'Alemán', flag: '🇩🇪', speech: 'de-DE' };
      case 'it': return { name: 'Italiano', flag: '🇮🇹', speech: 'it-IT' };
      case 'es': 
      default:
        return { name: 'Español', flag: '🇪🇸', speech: 'es-ES' };
    }
  };

  // If in list view (no chat selected)
  if (!activeConv) {
    return (
      <div className="flex-1 flex flex-col p-4 overflow-y-auto pb-20 select-none">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-slate-100">Mensajes & Conexiones</h2>
            <p className="text-xs text-slate-400">Traducción automática en tiempo real activa</p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Globe2 className="w-3.5 h-3.5" />
            <span>AI Auto-Translate</span>
          </div>
        </div>

        {/* New Matches Horizontal Bubbles */}
        <div className="mb-5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
            Nuevos Matches Mundiales
          </span>
          <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedConvId(c.id);
                  onSelectChat(c);
                }}
                className="flex flex-col items-center shrink-0 cursor-pointer group"
              >
                <div className="relative w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 via-rose-500 to-indigo-500 group-hover:scale-105 transition-transform">
                  <img
                    src={c.profile.avatar}
                    alt={c.profile.name}
                    className="w-full h-full rounded-full object-cover border-2 border-slate-900"
                  />
                  <span className="absolute bottom-0 right-0 text-xs">{c.profile.flag}</span>
                </div>
                <span className="text-xs font-semibold text-slate-200 mt-1 max-w-[64px] truncate">
                  {c.profile.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-indigo-400 font-mono font-medium">
                  {c.compatibilityScore}%
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Conversations List */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
            Conversaciones Activas
          </span>
          <div className="space-y-2">
            {conversations.map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedConvId(c.id);
                  onSelectChat(c);
                }}
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                    <img src={c.profile.avatar} alt={c.profile.name} className="w-full h-full object-cover" />
                    {c.profile.isOnline && (
                      <div className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                        {c.profile.name}
                      </span>
                      <span className="text-xs">{c.profile.flag}</span>
                      {c.profile.isVerified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-300 truncate max-w-[200px]">
                      {c.lastMessage}
                    </p>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {c.profile.nativeLanguage} · {c.profile.city}
                    </span>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-1">
                  <span className="text-[10px] text-slate-400 font-mono">{c.lastMessageTime}</span>
                  {c.unreadCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {c.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Active Chat Thread View
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden select-none relative">
      {/* Chat Thread Header */}
      <div className="px-3 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setSelectedConvId(null);
              setSelectedMessage(null);
              onBackToList();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="relative w-9 h-9 rounded-full overflow-hidden">
            <img src={activeConv.profile.avatar} alt={activeConv.profile.name} className="w-full h-full object-cover" />
            <span className="absolute bottom-0 right-0 text-[10px]">{activeConv.profile.flag}</span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-100">{activeConv.profile.name}</span>
              {activeConv.profile.isVerified && <ShieldCheck className="w-3 h-3 text-blue-400" />}
            </div>
            <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {activeConv.profile.city} (Online)
            </span>
          </div>
        </div>

        {/* Header Action Tools */}
        <div className="flex items-center gap-1.5">
          {/* Virtual First Date Trigger */}
          <button
            onClick={() => onStartVirtualDate(activeConv.profile)}
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/30 hover:bg-pink-500/30 transition-colors cursor-pointer"
            title="Primera Cita Virtual 3D"
          >
            <Coffee className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">Cita 3D</span>
          </button>

          {/* Video Call Trigger */}
          <button
            onClick={() => onStartVideoCall(activeConv.profile)}
            className="p-1.5 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
            title="Iniciar Videollamada con subtítulos traducidos"
          >
            <Video className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real-Time Translation Indicator & Quick Info Bar */}
      <div className="px-3 py-1.5 bg-gradient-to-r from-blue-950/60 via-indigo-950/50 to-violet-950/60 border-b border-indigo-500/20 flex items-center justify-between text-[11px] text-indigo-300 shrink-0">
        <div className="flex items-center gap-1.5">
          <Languages className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="truncate">
            Traducción en Tiempo Real: Español ⟷ {activeConv.profile.nativeLanguage}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-slate-400 hidden sm:inline">Toca un mensaje para traducir</span>
          <button
            onClick={() => setAutoTranslateEnabled(!autoTranslateEnabled)}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 hover:bg-indigo-500/40 transition-colors cursor-pointer"
          >
            {autoTranslateEnabled ? 'Auto-Translate: ON' : 'Auto-Translate: OFF'}
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5">
        {activeConv.messages.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
            <p className="font-semibold text-slate-200">¡Conexión iniciada con {activeConv.profile.name}!</p>
            <p className="text-[11px] text-slate-400 max-w-xs mx-auto mt-1">
              Usa el asistente IA para enviar un saludo cultural personalizado en {activeConv.profile.nativeLanguage}.
            </p>
          </div>
        ) : (
          activeConv.messages.map((msg) => {
            const isMe = msg.senderId === 'me';
            const isSelected = selectedMessage?.id === msg.id;
            const originalLang = getLanguageLabel(msg.sourceLang);

            return (
              <div
                key={msg.id}
                onClick={() => handleSelectMessageForTranslation(msg, 'es')}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[88%] ${isMe ? 'ml-auto' : 'mr-auto'} group cursor-pointer`}
              >
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm relative transition-all duration-200 ${
                    isSelected
                      ? 'ring-2 ring-indigo-400 shadow-lg scale-[1.01]'
                      : 'hover:border-indigo-400/50'
                  } ${
                    isMe
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm'
                      : 'bg-slate-800 text-slate-100 rounded-tl-sm border border-slate-700/80'
                  }`}
                >
                  {/* Message Translation Tag Bar */}
                  <div className="flex items-center justify-between text-[10px] text-slate-300 font-mono mb-1 pb-1 border-b border-white/10">
                    <span className="flex items-center gap-1 font-sans">
                      <span>{originalLang.flag}</span>
                      <span>{originalLang.name}</span>
                    </span>
                    <span className="text-indigo-200 text-[9px] uppercase tracking-wider flex items-center gap-0.5">
                      <Languages className="w-2.5 h-2.5" />
                      <span>Toca para ver traducción</span>
                    </span>
                  </div>

                  {/* Voice Message Bubble */}
                  {msg.isAudio ? (
                    <div className="flex items-center gap-2.5 py-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingAudioId(playingAudioId === msg.id ? null : msg.id);
                        }}
                        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
                      >
                        {playingAudioId === msg.id ? (
                          <Pause className="w-4 h-4 fill-white" />
                        ) : (
                          <Play className="w-4 h-4 fill-white translate-x-0.5" />
                        )}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 h-4">
                          {[40, 70, 30, 90, 50, 80, 60, 100, 45, 65, 30].map((h, i) => (
                            <span
                              key={i}
                              style={{ height: `${h}%` }}
                              className={`w-1 rounded-full ${
                                playingAudioId === msg.id ? 'bg-emerald-400 animate-pulse' : 'bg-white/60'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-300 block mt-1 font-mono">
                          0:0{msg.audioDuration || 4} · Audio con traducción instantánea
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Main Message Text (Shows translated by default if auto-translate is on, else original) */}
                      <p className="font-medium text-slate-100">
                        {autoTranslateEnabled && msg.translatedText ? msg.translatedText : msg.text}
                      </p>

                      {/* Side-by-side snippet preview */}
                      {msg.translatedText && (
                        <div className="mt-1.5 pt-1.5 border-t border-white/10 text-[10px] text-slate-300 italic flex items-center justify-between">
                          <span className="truncate pr-2">
                            {autoTranslateEnabled ? `Orig: "${msg.text}"` : `Trad: "${msg.translatedText}"`}
                          </span>
                        </div>
                      )}
                    </>
                  )}

                  {/* Cultural note indicator if present */}
                  {msg.culturalNote && (
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-amber-300 font-medium">
                      <HelpCircle className="w-3 h-3" />
                      <span className="truncate">{msg.culturalNote}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 mt-0.5 px-1 text-[10px] text-slate-400 font-mono">
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-indigo-400" />}
                </div>
              </div>
            );
          })
        )}

        {isTranslating && (
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 max-w-xs text-xs text-slate-400 animate-pulse">
            <Languages className="w-4 h-4 text-indigo-400 animate-spin" />
            <span>Traduciendo en tiempo real con Gemini API...</span>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MESSAGE TRANSLATION INSPECTOR DRAWER / CARD (Shows Original + Translation) */}
      {/* ========================================================================= */}
      {selectedMessage && (
        <div className="p-3.5 mx-3 mb-2 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-indigo-500/50 shadow-2xl animate-fade-in shrink-0 z-30 ring-1 ring-white/10">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Globe2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Traducción de Mensaje en Tiempo Real</span>
                <span className="text-[10px] text-indigo-300">WorldConnect API Translation Engine</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedMessage(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              title="Cerrar traducción"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Side-by-side Dual Language Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2.5">
            {/* Box 1: Idioma Original */}
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                  <span className="flex items-center gap-1 font-bold text-slate-200">
                    <span>{getLanguageLabel(selectedMessage.sourceLang).flag}</span>
                    <span>Idioma Original ({getLanguageLabel(selectedMessage.sourceLang).name})</span>
                  </span>
                  <button
                    onClick={() => handleSpeak(selectedMessage.text, getLanguageLabel(selectedMessage.sourceLang).speech)}
                    className="p-1 hover:text-indigo-400 cursor-pointer"
                    title="Escuchar pronunciación original"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-100 font-medium leading-relaxed">
                  "{selectedMessage.text}"
                </p>
              </div>
            </div>

            {/* Box 2: Idioma Traducido */}
            <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 flex flex-col justify-between relative">
              <div>
                <div className="flex items-center justify-between text-[10px] text-indigo-300 font-mono mb-1">
                  <span className="flex items-center gap-1 font-bold text-indigo-200">
                    <span>{getLanguageLabel(selectedTargetLang).flag}</span>
                    <span>Traducción ({getLanguageLabel(selectedTargetLang).name})</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleSpeak(activeTranslatedText || selectedMessage.translatedText || selectedMessage.text, getLanguageLabel(selectedTargetLang).speech)}
                      className="p-1 hover:text-white cursor-pointer"
                      title="Escuchar pronunciación traducida"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleCopy(activeTranslatedText || selectedMessage.translatedText || selectedMessage.text)}
                      className="p-1 hover:text-white cursor-pointer"
                      title="Copiar texto traducido"
                    >
                      {copiedTextState ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {isInspectingTranslation ? (
                  <div className="py-2 flex items-center gap-2 text-xs text-indigo-300 animate-pulse">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Traduciendo al {getLanguageLabel(selectedTargetLang).name}...</span>
                  </div>
                ) : (
                  <p className="text-xs text-white font-medium leading-relaxed">
                    "{activeTranslatedText || selectedMessage.translatedText || selectedMessage.text}"
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Dynamic Language Switcher Pills */}
          <div className="mb-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
              Traducir a otro idioma en tiempo real:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              {SUPPORTED_TRANSLATION_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelectMessageForTranslation(selectedMessage, lang.code)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                    selectedTargetLang === lang.code
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40 scale-105'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cultural Nuance Note */}
          {(activeCulturalNote || selectedMessage.culturalNote) && (
            <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/20 text-[11px] text-amber-200 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong className="font-semibold text-amber-300">Contexto cultural: </strong>
                {activeCulturalNote || selectedMessage.culturalNote}
              </span>
            </div>
          )}
        </div>
      )}

      {/* AI Icebreaker Quick Suggestions Drawer */}
      {showIcebreakers && (
        <div className="p-3 mx-3 mb-2 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-xl animate-fade-in shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-indigo-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Sugerencias del Asistente Rompehielos:
            </span>
            <button onClick={() => setShowIcebreakers(false)} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {isLoadingIcebreakers ? (
            <div className="py-2 text-center text-xs text-slate-400">Generando abridores con Gemini...</div>
          ) : (
            <div className="space-y-1.5">
              {icebreakerList.map((ic, i) => (
                <button
                  key={i}
                  onClick={() => {
                    handleSendMessage(ic);
                    setShowIcebreakers(false);
                  }}
                  className="w-full text-left p-2 rounded-xl bg-slate-800/80 hover:bg-indigo-600/20 text-xs text-slate-200 hover:text-white border border-slate-700/60 transition-colors cursor-pointer"
                >
                  "{ic}"
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom Message Input Bar */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          {/* AI Icebreaker trigger */}
          <button
            onClick={handleFetchIcebreakers}
            className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Sugerir temas y rompehielos con IA"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Voice recorder button */}
          <button
            onClick={handleVoiceRecordToggle}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
              isRecordingVoice
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title={isRecordingVoice ? 'Detener y enviar audio' : 'Grabar nota de voz'}
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={isRecordingVoice ? 'Grabando voz... presiona el micro para enviar' : `Escribe en tu idioma... la API traduce a ${activeConv.profile.nativeLanguage}`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="w-full pl-3 pr-8 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer ${
              inputText.trim()
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30 active:scale-90'
                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
