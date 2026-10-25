import React, { useState } from 'react';
import { 
  Globe, 
  MapPin, 
  Search, 
  Filter, 
  Sparkles, 
  Plane, 
  ShieldCheck, 
  Users, 
  Languages, 
  Heart, 
  Check, 
  X,
  Radio
} from 'lucide-react';
import { UserProfile } from '../types';
import { COUNTRIES_DIRECTORY, PROFILES_CATALOG } from '../data/mockData';

interface WorldMapTabProps {
  onSelectProfile: (profile: UserProfile) => void;
  isDarkMode: boolean;
}

export const WorldMapTab: React.FC<WorldMapTabProps> = ({
  onSelectProfile,
  isDarkMode,
}) => {
  const [selectedContinent, setSelectedContinent] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('JP');
  const [teleportActiveCity, setTeleportActiveCity] = useState<string>('Tokio, Japón');
  const [showFilters, setShowFilters] = useState(false);
  const [showTeleportSuccess, setShowTeleportSuccess] = useState(false);

  // Filters state
  const [ageRange, setAgeRange] = useState<[number, number]>([20, 35]);
  const [selectedIntent, setSelectedIntent] = useState<string>('Todos');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const continents = ['Todos', 'Asia', 'Europa', 'Sudamérica', 'Norteamérica'];

  const filteredCountries = COUNTRIES_DIRECTORY.filter((c) => {
    const matchesContinent = selectedContinent === 'Todos' || c.continent === selectedContinent;
    const matchesQuery = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesContinent && matchesQuery;
  });

  const selectedCountry = COUNTRIES_DIRECTORY.find((c) => c.code === selectedCountryCode) || COUNTRIES_DIRECTORY[0];

  // Profiles belonging to this country or matching
  const availableProfiles = PROFILES_CATALOG.filter((p) => {
    if (selectedCountryCode && p.countryCode !== selectedCountryCode) {
      // If we don't have enough, show others with tag
      return false;
    }
    if (verifiedOnly && !p.isVerified) return false;
    return true;
  });

  const displayProfiles = availableProfiles.length > 0 ? availableProfiles : PROFILES_CATALOG;

  const handleTeleportTo = (country: typeof COUNTRIES_DIRECTORY[0]) => {
    setSelectedCountryCode(country.code);
    setTeleportActiveCity(`${country.name} (${country.flag})`);
    setShowTeleportSuccess(true);
    setTimeout(() => setShowTeleportSuccess(false), 2400);
  };

  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto pb-20 select-none">
      {/* Header and Teleport Indicator */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-100 flex items-center gap-2">
            <span>Explorador Mundial</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </h2>
          <p className="text-xs text-slate-400">Descubre almas afines y amigos en más de 190 países</p>
        </div>

        <button
          onClick={() => setShowFilters(true)}
          className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition-colors cursor-pointer"
          title="Filtros avanzados"
        >
          <Filter className="w-4 h-4 text-indigo-400" />
        </button>
      </div>

      {/* Active Teleport Banner */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-violet-900/40 border border-indigo-500/30 flex items-center justify-between mb-4 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center">
            <Plane className="w-4 h-4 text-indigo-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-300">Pasaporte Virtual Activo</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-200">GPS Global</span>
            </div>
            <p className="text-xs font-semibold text-slate-100">{teleportActiveCity}</p>
          </div>
        </div>

        <button
          onClick={() => {
            const nextCountry = COUNTRIES_DIRECTORY[(COUNTRIES_DIRECTORY.findIndex(c => c.code === selectedCountryCode) + 1) % COUNTRIES_DIRECTORY.length];
            handleTeleportTo(nextCountry);
          }}
          className="px-2.5 py-1 text-xs font-medium rounded-lg bg-indigo-500/30 text-indigo-200 hover:bg-indigo-500/50 transition-colors cursor-pointer"
        >
          Cambiar Destino
        </button>
      </div>

      {showTeleportSuccess && (
        <div className="mb-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>¡Teletransportado con éxito! Tu ubicación virtual ahora es {teleportActiveCity}.</span>
        </div>
      )}

      {/* Interactive World Visual Stage */}
      <div className="relative w-full h-44 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-3.5 mb-4 overflow-hidden shadow-inner flex flex-col justify-between">
        {/* Decorative Grid and World Map Silhouette */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Pulsing City Beacons on map */}
        <div className="absolute top-10 left-12 flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
          <span className="text-[10px] font-mono text-blue-300">NYC (5.2k online)</span>
        </div>
        <div className="absolute top-16 left-36 flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-ping" />
          <span className="text-[10px] font-mono text-violet-300">París (3.8k)</span>
        </div>
        <div className="absolute top-8 right-12 flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-ping" />
          <span className="text-[10px] font-mono text-pink-300">Tokio (8.4k)</span>
        </div>
        <div className="absolute bottom-8 left-20 flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] font-mono text-emerald-300">Río (4.1k)</span>
        </div>

        {/* Map Stage Header */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 font-mono">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            142,390 miembros globales online
          </span>
          <span className="text-indigo-400 font-semibold">{selectedCountry.flag} {selectedCountry.name}</span>
        </div>

        {/* Map Stage Quick Selector Pill */}
        <div className="relative z-10 flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
          {COUNTRIES_DIRECTORY.slice(0, 7).map((c) => (
            <button
              key={c.code}
              onClick={() => handleTeleportTo(c)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                selectedCountryCode === c.code
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40 scale-105'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700'
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search & Continent Filters */}
      <div className="space-y-2 mb-4">
        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar país o idioma..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Continent Segmented Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar">
          {continents.map((cont) => (
            <button
              key={cont}
              onClick={() => setSelectedContinent(cont)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedContinent === cont
                  ? 'bg-slate-800 text-white font-semibold border border-indigo-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cont}
            </button>
          ))}
        </div>
      </div>

      {/* Country List Horizontal Cards */}
      <div className="mb-4">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Países destacados ({filteredCountries.length})
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {filteredCountries.slice(0, 6).map((item) => (
            <button
              key={item.code}
              onClick={() => handleTeleportTo(item)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedCountryCode === item.code
                  ? 'bg-indigo-950/40 border-indigo-500/60 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xl">{item.flag}</span>
                <span className="text-[10px] text-emerald-400 font-mono">● {item.count.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-200 block truncate">{item.name}</span>
                <span className="text-[10px] text-slate-400">{item.continent}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Profiles Online in this Country */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Miembros activos en {selectedCountry.name}
          </span>
          <span className="text-xs text-indigo-400 font-medium">Verificados</span>
        </div>

        <div className="space-y-2.5">
          {displayProfiles.map((prof) => (
            <div
              key={prof.id}
              onClick={() => onSelectProfile(prof)}
              className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <img src={prof.avatar} alt={prof.name} className="w-full h-full object-cover" />
                  {prof.isOnline && (
                    <div className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-900" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                      {prof.name}, {prof.age}
                    </span>
                    {prof.isVerified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    )}
                    <span className="text-xs">{prof.flag}</span>
                  </div>
                  <span className="text-xs text-slate-400 block truncate max-w-[180px]">
                    {prof.city} · {prof.occupation}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-indigo-400 font-medium mt-0.5">
                    <span>{prof.mbti}</span>
                    <span>·</span>
                    <span>{prof.languages[0]}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProfile(prof);
                }}
                className="w-9 h-9 rounded-full bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                title="Conectar"
              >
                <Heart className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FILTER DRAWER MODAL */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex flex-col justify-end animate-fade-in">
          <div className="w-full max-h-[80%] bg-slate-900 text-slate-100 rounded-t-3xl border-t border-slate-700 p-5 overflow-y-auto pb-safe">
            <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Filtros de Exploración Global</h3>
              <button onClick={() => setShowFilters(false)} className="p-1 rounded-full text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Age slider */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-300">Rango de Edad</span>
                <span className="text-indigo-400 font-bold">{ageRange[0]} - {ageRange[1]} años</span>
              </div>
              <input
                type="range"
                min="18"
                max="60"
                value={ageRange[1]}
                onChange={(e) => setAgeRange([18, parseInt(e.target.value)])}
                className="w-full accent-indigo-500"
              />
            </div>

            {/* Intent Selector */}
            <div className="mb-4">
              <span className="text-xs font-semibold text-slate-300 block mb-2">Objetivo de Conexión</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['Todos', 'Amor y Relación Seria', 'Intercambio Cultural', 'Networking'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedIntent(item)}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                      selectedIntent === item
                        ? 'bg-indigo-600/30 border-indigo-500 text-white font-medium'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Verified toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800 border border-slate-700 mb-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-medium text-slate-200">Solo perfiles verificados con selfie 3D</span>
              </div>
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`w-10 h-6 rounded-full transition-colors flex items-center p-0.5 ${
                  verifiedOnly ? 'bg-indigo-600 justify-end' : 'bg-slate-700 justify-start'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
              </button>
            </div>

            <button
              onClick={() => setShowFilters(false)}
              className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
