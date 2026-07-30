import React from 'react';
import { UserProfile, Subject, Topic, StudyCalendarEvent } from '../types';
import { 
  Play, 
  Flame, 
  Clock, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Calendar as CalendarIcon, 
  Sparkles, 
  Bot,
  Award,
  ChevronRight
} from 'lucide-react';

interface HomeViewProps {
  user: UserProfile;
  subjects: Subject[];
  weeklyCalendar: StudyCalendarEvent[];
  onNavigate: (view: string) => void;
  onSelectTopic: (topic: Topic) => void;
  onOpenIAChat: () => void;
  onToggleCalendarEvent: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  user,
  subjects,
  weeklyCalendar,
  onNavigate,
  onSelectTopic,
  onOpenIAChat,
  onToggleCalendarEvent
}) => {
  // Find last accessed topic or default to Mathematics
  const allTopics = subjects.flatMap(s => s.topics);
  const lastTopic = allTopics.find(t => t.id === user.lastAccessedTopicId) || allTopics[0];

  const weeklyProgressPercent = Math.min(100, Math.round((user.weeklyStudiedHours / user.weeklyGoalHours) * 100));

  // Get recently accessed subjects
  const recentSubjects = subjects.slice(0, 3);

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner */}
      <section className="bg-gradient-to-r from-[#2563EB] to-blue-700 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl shadow-blue-900/10">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold text-blue-100 mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Foco no ENEM & Vestibulares</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black mb-2 tracking-tight">
            Olá, {user.name}!
          </h1>
          <p className="text-blue-100 text-sm md:text-base mb-6 leading-relaxed">
            Seja bem-vindo(a)! Estude de forma organizada e conquiste sua vaga no vestibular dos seus sonhos.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onSelectTopic(lastTopic)}
              className="bg-white hover:bg-blue-50 text-[#2563EB] px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-blue-950/20 flex items-center space-x-2 transition-all hover:scale-102 cursor-pointer active:scale-98"
            >
              <Play className="w-4 h-4 fill-[#2563EB]" />
              <span>Continuar Estudando: {lastTopic.title}</span>
            </button>
            <div className="text-xs font-semibold text-blue-200">
              Meta semanal: <span className="font-bold text-white">{weeklyProgressPercent}% concluída</span>
            </div>
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 -right-12 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Overview Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Hours Studied */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center font-black shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 dark:text-white leading-tight">{user.hoursStudied}h</div>
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Horas estudadas</div>
          </div>
        </div>

        {/* Weekly Goal Progress */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center font-black shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-gray-900 dark:text-white">{user.weeklyStudiedHours}h / {user.weeklyGoalHours}h</span>
            </div>
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Meta Semanal</div>
            <div className="w-full bg-gray-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${weeklyProgressPercent}%` }} />
            </div>
          </div>
        </div>

        {/* Study Streak */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center font-black shrink-0">
            <Flame className="w-6 h-6 fill-orange-500 text-orange-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 dark:text-white leading-tight">{user.streakDays} Dias</div>
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Sequência ativa</div>
          </div>
        </div>

        {/* Completed Topics */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center font-black shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 dark:text-white leading-tight">{user.completedTopicIds.length} Tópicos</div>
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Conteúdos concluídos</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Subjects & Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Subjects */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Últimas Matérias Acessadas</h2>
              <button
                onClick={() => onNavigate('estudos')}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <span>Ver todas</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentSubjects.map((sub) => {
                const totalTopics = sub.topics.length;
                const completedCount = sub.topics.filter(t => user.completedTopicIds.includes(t.id)).length;
                const progressPct = Math.round((completedCount / totalTopics) * 100);

                return (
                  <div
                    key={sub.id}
                    onClick={() => onNavigate('estudos')}
                    className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer group"
                  >
                    <div className={`w-10 h-10 ${sub.bgColor} rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{sub.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{completedCount} de {totalTopics} tópicos</p>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick AI Assistant Launcher Card */}
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl p-6 text-white flex flex-col sm:flex-row items-center justify-between shadow-lg gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base">Professor IA Facilita+</h3>
                <p className="text-xs text-indigo-200 mt-0.5">
                  Tire dúvidas, peça resoluções passo a passo ou receba dicas de Redação ENEM!
                </p>
              </div>
            </div>
            <button
              onClick={onOpenIAChat}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer shadow-md shadow-indigo-900/50"
            >
              Abrir Chat
            </button>
          </div>
        </div>

        {/* Right Column: Study Calendar */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Calendário de Estudos</h2>
              </div>
              <span className="text-xs font-bold text-gray-400">Esta semana</span>
            </div>

            <div className="space-y-3 flex-1">
              {weeklyCalendar.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => onToggleCalendarEvent(evt.id)}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start space-x-3 cursor-pointer ${
                    evt.completed
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                      : 'bg-gray-50 dark:bg-slate-800/40 border-gray-100 dark:border-slate-800 hover:border-gray-200 dark:hover:border-slate-700'
                  }`}
                >
                  <button className="mt-0.5 shrink-0">
                    <CheckCircle2 className={`w-5 h-5 ${evt.completed ? 'text-emerald-600 dark:text-emerald-400 fill-emerald-100' : 'text-gray-300 dark:text-slate-600'}`} />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider">{evt.day}</span>
                      <span className="text-[10px] text-gray-400 font-medium">{evt.time}</span>
                    </div>
                    <div className={`text-sm font-bold ${evt.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                      {evt.subject}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                      {evt.topics.join(' • ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('painel')}
              className="w-full mt-4 py-3 border-2 border-dashed border-gray-200 dark:border-slate-800 text-gray-500 dark:text-gray-400 rounded-2xl text-xs font-bold hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer"
            >
              Ver Cronograma Inteligente Completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
