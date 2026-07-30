import React from 'react';
import { UserProfile, Subject, Achievement, StudyCalendarEvent } from '../types';
import { 
  BarChart3, 
  Flame, 
  Target, 
  Trophy, 
  Calendar, 
  Award, 
  TrendingUp, 
  BookOpen,
  Users
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface PainelViewProps {
  user: UserProfile;
  subjects: Subject[];
  achievements: Achievement[];
  calendarEvents: StudyCalendarEvent[];
}

export const PainelView: React.FC<PainelViewProps> = ({
  user,
  subjects,
  achievements,
  calendarEvents
}) => {
  // Weekly hours chart mock
  const weeklyHoursData = [
    { day: 'Seg', horas: 2.5 },
    { day: 'Ter', horas: 3.0 },
    { day: 'Qua', horas: 2.0 },
    { day: 'Qui', horas: 1.5 },
    { day: 'Sex', horas: 2.5 },
    { day: 'Sáb', horas: 0.0 },
    { day: 'Dom', horas: 0.0 },
  ];

  // Subject distribution
  const subjectDistribution = subjects.slice(0, 5).map(s => ({
    name: s.name,
    completed: s.topics.filter(t => user.completedTopicIds.includes(t.id)).length,
    total: s.topics.length
  }));

  const COLORS = ['#2563EB', '#9333EA', '#16A34A', '#EA580C', '#0284C7'];

  // Personal Ranking Mock
  const leaderboard = [
    { pos: 1, name: 'Lucas Ferreira', pts: '1.420 pts', streak: 24, isUser: false },
    { pos: 2, name: 'Beatriz Lima', pts: '1.280 pts', streak: 18, isUser: false },
    { pos: 3, name: `${user.name} (Você)`, pts: '1.150 pts', streak: user.streakDays, isUser: true },
    { pos: 4, name: 'Gabriel Santos', pts: '980 pts', streak: 9, isUser: false },
    { pos: 5, name: 'Camila Rocha', pts: '890 pts', streak: 7, isUser: false },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Painel Analítico do Aluno</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Acompanhe sua evolução diária, progresso de metas, ranking pessoal e consistência de estudos.
        </p>
      </div>

      {/* Top Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center font-bold shrink-0">
            <Flame className="w-5 h-5 fill-orange-500 text-orange-500" />
          </div>
          <div>
            <div className="text-xl font-black text-gray-900 dark:text-white">{user.streakDays} Dias</div>
            <div className="text-xs text-gray-400 font-medium">Sequência Ativa</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-gray-900 dark:text-white">{user.completedTopicIds.length} Tópicos</div>
            <div className="text-xs text-gray-400 font-medium">Matérias Estudadas</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-bold shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-gray-900 dark:text-white">{user.weeklyStudiedHours}h / {user.weeklyGoalHours}h</div>
            <div className="text-xs text-gray-400 font-medium">Meta Semanal</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center font-bold shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-gray-900 dark:text-white">3º Lugar</div>
            <div className="text-xs text-gray-400 font-medium">Ranking Geral</div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Hours Bar Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-gray-900 dark:text-white flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>Evolução de Horas Estudadas (Esta Semana)</span>
            </h2>
            <span className="text-xs text-emerald-600 font-bold">+15% em relação à semana passada</span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyHoursData}>
                <XAxis dataKey="day" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                <Tooltip />
                <Bar dataKey="horas" fill="#2563EB" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leaderboard / Ranking */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-3">
            <h2 className="font-bold text-sm text-gray-900 dark:text-white flex items-center space-x-2">
              <Users className="w-4 h-4 text-amber-500" />
              <span>Ranking Pessoal de Estudantes</span>
            </h2>
            <span className="text-xs font-bold text-blue-600">Top 5</span>
          </div>

          <div className="space-y-2.5">
            {leaderboard.map((item) => (
              <div
                key={item.pos}
                className={`p-3 rounded-2xl flex items-center justify-between text-xs transition-all ${
                  item.isUser
                    ? 'bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 font-bold text-blue-900 dark:text-blue-100'
                    : 'bg-gray-50 dark:bg-slate-800/40 text-gray-800 dark:text-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                    item.pos === 1 ? 'bg-amber-400 text-black' : item.pos === 2 ? 'bg-slate-300 text-black' : item.pos === 3 ? 'bg-amber-700 text-white' : 'bg-gray-200 dark:bg-slate-700 text-gray-600'
                  }`}>
                    {item.pos}
                  </span>
                  <span>{item.name}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 font-medium">{item.streak} dias 🔥</span>
                  <span className="font-black text-blue-600 dark:text-blue-400">{item.pts}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
