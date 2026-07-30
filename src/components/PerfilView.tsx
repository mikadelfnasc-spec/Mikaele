import React, { useState } from 'react';
import { UserProfile, GradeLevel, StudyPeriod, Achievement } from '../types';
import { 
  User, 
  Mail, 
  Clock, 
  BookOpen, 
  FileCheck2, 
  Target, 
  Flame, 
  Award, 
  CheckCircle2,
  Save,
  Sparkles
} from 'lucide-react';

interface PerfilViewProps {
  user: UserProfile;
  achievements: Achievement[];
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const PerfilView: React.FC<PerfilViewProps> = ({
  user,
  achievements,
  onUpdateUser
}) => {
  const [name, setName] = useState(user.name);
  const [grade, setGrade] = useState<GradeLevel>(user.grade);
  const [period, setPeriod] = useState<StudyPeriod>(user.period);
  const [weeklyGoalHours, setWeeklyGoalHours] = useState(user.weeklyGoalHours);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name,
      grade,
      period,
      weeklyGoalHours
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Perfil do Aluno</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Gerencie seus dados acadêmicos, acompanhe suas conquistas e ajuste suas metas de aprendizado.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Card & Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm text-center">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-blue-500/20 shadow-md mb-4"
            />
            <h2 className="text-xl font-black text-gray-900 dark:text-white">{user.name}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            <div className="flex items-center justify-center space-x-2 mt-3">
              <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">
                {user.grade}
              </span>
              <span className="px-3 py-1 bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-full text-xs font-bold uppercase tracking-wider">
                {user.period}
              </span>
            </div>
          </div>

          {/* Form to edit fields */}
          <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white border-b border-gray-100 dark:border-slate-800 pb-3">
              Editar Dados de Estudos
            </h3>

            {savedSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-2xl flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Perfil atualizado com sucesso!</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Nome Completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Série</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as GradeLevel)}
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl px-3 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="1º ano">1º ano</option>
                  <option value="2º ano">2º ano</option>
                  <option value="3º ano">3º ano</option>
                  <option value="Concluído">Concluído</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Período</label>
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value as StudyPeriod)}
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl px-3 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                  <option value="Integral">Integral</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Meta Semanal (Horas)</label>
              <input
                type="number"
                min="1"
                max="80"
                value={weeklyGoalHours}
                onChange={(e) => setWeeklyGoalHours(Number(e.target.value))}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3 rounded-2xl text-xs transition-all shadow-md shadow-blue-600/20 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Alterações</span>
            </button>
          </form>
        </div>

        {/* Stats & Achievements */}
        <div className="lg:col-span-7 space-y-6">
          {/* Detailed Display Metrics Grid */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white border-b border-gray-100 dark:border-slate-800 pb-3">
              Métricas e Progresso Acadêmico
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
                <Clock className="w-5 h-5 text-blue-600 mb-1" />
                <div className="text-xl font-black text-gray-900 dark:text-white">{user.hoursStudied}h</div>
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Horas Estudadas</div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
                <BookOpen className="w-5 h-5 text-emerald-600 mb-1" />
                <div className="text-xl font-black text-gray-900 dark:text-white">{user.completedTopicIds.length}</div>
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Conteúdos Concluídos</div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50">
                <FileCheck2 className="w-5 h-5 text-purple-600 mb-1" />
                <div className="text-xl font-black text-gray-900 dark:text-white">8</div>
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Simulados Realizados</div>
              </div>

              <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-100 dark:border-orange-900/50">
                <Target className="w-5 h-5 text-orange-600 mb-1" />
                <div className="text-xl font-black text-gray-900 dark:text-white">{user.weeklyGoalHours}h</div>
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Meta Semanal</div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50 col-span-2 md:col-span-2">
                <Flame className="w-5 h-5 text-amber-500 fill-amber-500 mb-1" />
                <div className="text-xl font-black text-gray-900 dark:text-white">{user.streakDays} Dias Seguidos</div>
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Sequência de Estudos Ativa 🔥</div>
              </div>
            </div>
          </div>

          {/* Achievements / Insígnias */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Sistema de Conquistas & Insígnias</span>
              </h3>
              <span className="text-xs text-gray-400 font-semibold">
                {achievements.filter(a => a.unlocked).length} de {achievements.length} desbloqueadas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start space-x-3 ${
                    ach.unlocked
                      ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40'
                      : 'bg-gray-50 dark:bg-slate-800/40 border-gray-100 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    ach.unlocked ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' : 'bg-gray-200 dark:bg-slate-700 text-gray-400'
                  }`}>
                    <Award className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-gray-900 dark:text-white truncate">{ach.title}</h4>
                      {ach.unlocked && <span className="text-[10px] font-extrabold text-amber-600 uppercase">Desbloqueado</span>}
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">{ach.description}</p>
                    
                    <div className="w-full bg-gray-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2">
                      <div
                        className={`h-full rounded-full ${ach.unlocked ? 'bg-amber-500' : 'bg-gray-400'}`}
                        style={{ width: `${Math.min(100, Math.round((ach.progress / ach.maxProgress) * 100))}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
