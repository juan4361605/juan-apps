import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Sparkles, 
  Play, 
  Radio, 
  Coffee, 
  Mic, 
  Hand, 
  Heart, 
  Check, 
  X,
  Volume2
} from 'lucide-react';
import { GlobalEvent, UserProfile } from '../types';
import { GLOBAL_EVENTS, PROFILES_CATALOG } from '../data/mockData';

interface EventsTabProps {
  onStartVirtualDateWith: (profile: UserProfile) => void;
  isDarkMode: boolean;
}

export const EventsTab: React.FC<EventsTabProps> = ({
  onStartVirtualDateWith,
  isDarkMode,
}) => {
  const [events, setEvents] = useState<GlobalEvent[]>(GLOBAL_EVENTS);
  const [activeEventRoom, setActiveEventRoom] = useState<GlobalEvent | null>(null);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [rouletteQuestion, setRouletteQuestion] = useState('¿Cuál es la palabra o modismo más bonito de tu idioma que no se puede traducir?');
  const [isSpinningQuestion, setIsSpinningQuestion] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>(['ev_1']);

  const questionsPool = [
    '¿Cuál es la comida típica de tu infancia que más añoras cuando estás lejos?',
    'Si pudieras teletransportarte hoy a cualquier país por solo 2 horas, ¿adónde irías?',
    '¿Cuál es la costumbre de tu país que más suele sorprender a los extranjeros?',
    '¿Qué canción de tu cultura todo el mundo debería escuchar al menos una vez?',
    '¿Cuál ha sido la mayor lección que has aprendido viajando o hablando con alguien de otra cultura?'
  ];

  const handleSpinQuestion = () => {
    setIsSpinningQuestion(true);
    setTimeout(() => {
      const randomQ = questionsPool[Math.floor(Math.random() * questionsPool.length)];
      setRouletteQuestion(randomQ);
      setIsSpinningQuestion(false);
    }, 450);
  };

  const handleToggleRegister = (eventId: string) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(prev => prev.filter(id => id !== eventId));
    } else {
      setRegisteredEvents(prev => [...prev, eventId]);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto pb-20 select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-black text-slate-100 flex items-center gap-2">
            <span>Eventos & Salas Globales</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          </h2>
          <p className="text-xs text-slate-400">Encuentros interculturales en vivo y citas grupales</p>
        </div>
      </div>

      {/* Featured Virtual Date Banner */}
      <div className="relative p-4 rounded-3xl bg-gradient-to-r from-pink-950/60 via-purple-950/40 to-indigo-950/60 border border-pink-500/30 mb-5 overflow-hidden shadow-lg">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-pink-300 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Experiencia Diferencial Exclusiva</span>
            </div>
            <h3 className="text-base font-bold text-white">Primeras Citas Virtuales 3D</h3>
            <p className="text-xs text-slate-300 max-w-sm mt-0.5">
              Café en la Piazza di Spagna en Roma, paseo sonoro por París o contemplar la aurora boreal con juegos interactivos.
            </p>
          </div>

          <button
            onClick={() => onStartVirtualDateWith(PROFILES_CATALOG[0])}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-xs shadow-md shadow-pink-500/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            Iniciar Cita Virtual Demo
          </button>
        </div>
      </div>

      {/* Live Now Events List */}
      <div className="mb-5">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
          Salas en Vivo Ahora Mismo
        </span>

        <div className="space-y-3">
          {events.map((ev) => {
            const isRegistered = registeredEvents.includes(ev.id);
            return (
              <div
                key={ev.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all shadow-md relative overflow-hidden"
              >
                {/* Event header badge */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {ev.isLiveNow ? (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold animate-pulse">
                        <Radio className="w-3 h-3" /> EN VIVO
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-medium">
                        {ev.time}
                      </span>
                    )}
                    <span className="text-[11px] text-indigo-400 font-semibold">{ev.category}</span>
                  </div>

                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    {ev.attendeesCount}/{ev.maxAttendees}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-100 mb-1">{ev.title}</h4>
                <p className="text-[11px] text-slate-400 mb-3">Anfitrión: {ev.hostName}</p>

                {/* Country Flags Focus */}
                <div className="flex items-center gap-1.5 mb-4">
                  {ev.countryFocus.map((country, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-medium text-slate-300"
                    >
                      {country}
                    </span>
                  ))}
                </div>

                {/* Bottom Join CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <button
                    onClick={() => handleToggleRegister(ev.id)}
                    className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer flex items-center gap-1 font-medium"
                  >
                    {isRegistered ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Registrado</span>
                      </>
                    ) : (
                      <span>+ Guardar en calendario</span>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveEventRoom(ev)}
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  >
                    Entrar a la Sala
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LIVE EVENT ROOM MODAL (Simulated Group Audio/Video Lounge) */}
      {activeEventRoom && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col p-4 animate-fade-in pb-safe">
          {/* Room Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 shrink-0">
            <div>
              <span className="text-[10px] uppercase font-mono text-rose-400 flex items-center gap-1">
                <Radio className="w-3 h-3 animate-ping" />
                SALA VIRTUAL EN VIVO
              </span>
              <h3 className="text-sm font-bold text-slate-100 truncate max-w-[220px]">
                {activeEventRoom.title}
              </h3>
            </div>

            <button
              onClick={() => setActiveEventRoom(null)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Speakers Stage Grid */}
          <div className="mb-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Escenario Principal (Micrófono Activo)
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {PROFILES_CATALOG.slice(0, 3).map((speaker, i) => (
                <div
                  key={speaker.id}
                  className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center text-center relative"
                >
                  <div className={`relative w-14 h-14 rounded-full overflow-hidden mb-1.5 ${i === 0 ? 'ring-2 ring-emerald-500 animate-pulse' : 'ring-1 ring-slate-700'}`}>
                    <img src={speaker.avatar} alt={speaker.name} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 right-0 text-xs">{speaker.flag}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-200 truncate w-full">{speaker.name.split(' ')[0]}</span>
                  <span className="text-[10px] text-slate-400 truncate">{speaker.city}</span>
                  {i === 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Cultural Question Roulette */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 mb-4 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Ruleta Rompehielos Cultural
              </span>
              <button
                onClick={handleSpinQuestion}
                className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/40 transition-colors cursor-pointer"
              >
                Girar Pregunta 🎲
              </button>
            </div>
            <p className={`text-xs text-slate-100 font-medium leading-relaxed italic ${isSpinningQuestion ? 'opacity-40 animate-pulse' : ''}`}>
              "{rouletteQuestion}"
            </p>
          </div>

          {/* Live Translation Captions Bar */}
          <div className="flex-1 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 mb-4 overflow-y-auto space-y-2 text-xs">
            <span className="text-[10px] font-mono text-slate-400 block border-b border-slate-800 pb-1">
              Subtítulos y traducción en directo (Gemini Speech Engine):
            </span>
            <div className="text-slate-300">
              <span className="font-bold text-pink-400">Yuki (Tokio): </span>
              "En Japón disfrutamos mucho de las estaciones y de la tranquilidad del té..."
            </div>
            <div className="text-slate-300">
              <span className="font-bold text-indigo-400">Julien (París): </span>
              "Exactement! C'est la même poésie qu'on retrouve dans un bon vin de terroir."
              <span className="text-slate-500 block text-[10px]">[Traducido]: ¡Exacto! Es la misma poesía que se encuentra en un buen vino de la tierra.</span>
            </div>
          </div>

          {/* Room Controls Bar */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-around shrink-0">
            <button
              onClick={() => setIsHandRaised(!isHandRaised)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isHandRaised
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Hand className="w-4 h-4" />
              <span>{isHandRaised ? 'Mano Levantada (En cola)' : 'Pedir la palabra'}</span>
            </button>

            <button
              onClick={() => setActiveEventRoom(null)}
              className="px-4 py-2.5 rounded-full bg-rose-600 text-white text-xs font-semibold hover:bg-rose-500 cursor-pointer"
            >
              Salir de la Sala
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
