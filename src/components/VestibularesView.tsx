import React, { useState } from 'react';
import { VestibularInfo } from '../types';
import { 
  GraduationCap, 
  Calendar, 
  ExternalLink, 
  BookOpen, 
  Award, 
  Lightbulb, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface VestibularesViewProps {
  vestibulares: VestibularInfo[];
}

export const VestibularesView: React.FC<VestibularesViewProps> = ({ vestibulares }) => {
  const [selectedVest, setSelectedVest] = useState<VestibularInfo>(vestibulares[0]);

  return (
    <div className="space-y-6 pb-12">
      {/* Title Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Guia Completo dos Vestibulares</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Calendário de provas, editais oficiais, notas de corte atualizadas e dicas estratégicas para garantir sua aprovação.
        </p>
      </div>

      {/* Selector Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {vestibulares.map((v) => (
          <button
            key={v.id}
            onClick={() => setSelectedVest(v)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedVest.id === v.id
                ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-600/20'
                : 'bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50'
            }`}
          >
            {v.acronym}
          </button>
        ))}
      </div>

      {/* Selected Vestibular Detailed Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-slate-800 shadow-sm space-y-8">
        {/* Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase ${selectedVest.badgeColor}`}>
                {selectedVest.acronym}
              </span>
              <span className="text-xs text-gray-400 font-medium">Oficial</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">{selectedVest.fullName}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{selectedVest.summary}</p>
          </div>

          {/* Countdown Badge */}
          <div className="bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 p-4 rounded-2xl text-center shrink-0 w-full md:w-auto">
            <div className="flex items-center justify-center space-x-1.5 text-blue-600 dark:text-blue-400 text-xs font-bold mb-1">
              <Calendar className="w-4 h-4" />
              <span>Data da Prova</span>
            </div>
            <div className="text-xl font-black text-gray-900 dark:text-white">
              {new Date(selectedVest.examDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </div>
            <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-1">
              Faltam {selectedVest.daysRemaining} dias
            </div>
          </div>
        </div>

        {/* Content Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Topics Covered */}
          <div className="bg-gray-50/70 dark:bg-slate-800/40 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-gray-900 dark:text-white font-bold text-sm">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Conteúdo & Formato Cobrado</span>
            </div>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
              {selectedVest.topicsCovered.map((topic, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cutoff Scores Table */}
          <div className="bg-gray-50/70 dark:bg-slate-800/40 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-gray-900 dark:text-white font-bold text-sm">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Notas de Corte Típicas</span>
            </div>
            <div className="space-y-2">
              {selectedVest.cutoffs.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-gray-100 dark:border-slate-800">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{item.course}</span>
                  <span className="font-black text-blue-600 dark:text-blue-400">{item.score} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Study Tips */}
        <div className="bg-amber-50/60 dark:bg-amber-950/20 p-5 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 space-y-3">
          <div className="flex items-center space-x-2 text-amber-900 dark:text-amber-300 font-bold text-sm">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>Dicas Estratégicas do Professor IA para {selectedVest.acronym}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {selectedVest.studyTips.map((tip, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-3.5 rounded-xl text-xs text-gray-700 dark:text-gray-300 border border-amber-100 dark:border-slate-800 leading-relaxed">
                <span className="font-bold text-amber-600 block mb-1">Dica #{idx + 1}</span>
                {tip}
              </div>
            ))}
          </div>
        </div>

        {/* Official Edital Link */}
        <div className="flex justify-end pt-2">
          <a
            href={selectedVest.editalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gray-900 dark:bg-slate-800 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <span>Acessar Edital Oficial ({selectedVest.acronym})</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
