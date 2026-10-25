import React, { useState } from 'react';
import { 
  X, 
  Briefcase, 
  Palette, 
  Code2, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2, 
  Layers, 
  DollarSign, 
  Clock, 
  Database,
  Cpu
} from 'lucide-react';
import { EXPERT_DOSSIER_DATA, ExpertSection } from '../data/dossierData';

interface DossierModalProps {
  onClose: () => void;
  isDarkMode: boolean;
}

export const DossierModal: React.FC<DossierModalProps> = ({
  onClose,
  isDarkMode,
}) => {
  const [activeExpertKey, setActiveExpertKey] = useState<string>('pm');

  const expertKeys = [
    { key: 'pm', label: 'Product Manager', icon: Briefcase },
    { key: 'ux', label: 'UX/UI Designer', icon: Palette },
    { key: 'dev', label: 'Full Stack Dev', icon: Code2 },
    { key: 'marketing', label: 'Marketing & Growth', icon: TrendingUp },
    { key: 'security', label: 'Experto Seguridad', icon: ShieldAlert },
  ];

  const currentExpert: ExpertSection = EXPERT_DOSSIER_DATA[activeExpertKey];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex flex-col justify-center items-center p-3 sm:p-6 animate-fade-in">
      <div className="w-full max-w-4xl h-full max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header Bar */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                Dossier Ejecutivo & Arquitectura WorldConnect
              </h2>
              <p className="text-xs text-indigo-300">
                Dictamen del equipo multidisciplinario de expertos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Expert Selector Segmented Tabs */}
        <div className="px-5 py-2.5 border-b border-slate-800 bg-slate-950/40 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          {expertKeys.map((item) => {
            const Icon = item.icon;
            const isActive = activeExpertKey === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveExpertKey(item.key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Author info header */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] uppercase font-bold tracking-wider text-indigo-400 block mb-0.5">
                {currentExpert.role}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {currentExpert.title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">{currentExpert.expertName}</p>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium self-start sm:self-auto">
              Revisión Q4 2026 / 2027
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {currentExpert.summary}
          </p>

          {/* Key Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentExpert.keyPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/90 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-100 mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{pillar.title}</span>
                  </h4>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  {pillar.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                      <span className="text-indigo-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Deep Dive Raw Markdown / Specs */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed space-y-3 font-mono">
            <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block font-sans">
              Especificación Técnica y Plan de Ejecución
            </span>
            <pre className="whitespace-pre-wrap font-sans text-xs text-slate-200">
              {currentExpert.deepDiveMarkdown}
            </pre>
          </div>

          {/* Startup Launch Budget for 90 Days Summary Table */}
          {activeExpertKey === 'pm' && (
            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20">
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2 font-sans flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" />
                Presupuesto Optimizado para Lanzamiento en 90 Días ($18,500 USD)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-sans">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Cloud & Servidores</span>
                  <span className="text-sm font-bold text-white font-mono">$2,500</span>
                  <span className="text-[9px] text-slate-500 block">Cloud Run + Redis + Supabase</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">APIs de IA & Speech</span>
                  <span className="text-sm font-bold text-white font-mono">$1,800</span>
                  <span className="text-[9px] text-slate-500 block">Gemini Flash + LiveKit</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Biometría & KYC</span>
                  <span className="text-sm font-bold text-white font-mono">$3,200</span>
                  <span className="text-[9px] text-slate-500 block">Liveness 3D + Stripe Identity</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Growth & Seed Users</span>
                  <span className="text-sm font-bold text-white font-mono">$11,000</span>
                  <span className="text-[9px] text-slate-500 block">Creators + Campus Ambassadors</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">
            WorldConnect Architecture Blueprint v1.0
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 transition-colors cursor-pointer"
          >
            Volver a la App Móvil
          </button>
        </div>
      </div>
    </div>
  );
};
