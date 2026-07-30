import React, { useState } from 'react';
import { Subject, Topic } from '../types';
import { 
  Search, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Calculator, 
  Dna, 
  FlaskConical, 
  Zap, 
  Landmark, 
  Globe, 
  Sparkles, 
  Users, 
  Languages, 
  Palette,
  Play
} from 'lucide-react';

interface EstudosViewProps {
  subjects: Subject[];
  completedTopicIds: string[];
  onSelectTopic: (topic: Topic) => void;
  searchQuery: string;
}

export const EstudosView: React.FC<EstudosViewProps> = ({
  subjects,
  completedTopicIds,
  onSelectTopic,
  searchQuery
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | 'all'>('all');

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator': return Calculator;
      case 'BookOpen': return BookOpen;
      case 'Dna': return Dna;
      case 'FlaskConical': return FlaskConical;
      case 'Zap': return Zap;
      case 'Landmark': return Landmark;
      case 'Globe': return Globe;
      case 'Sparkles': return Sparkles;
      case 'Users': return Users;
      case 'Languages': return Languages;
      case 'Palette': return Palette;
      default: return BookOpen;
    }
  };

  const filteredSubjects = subjects.filter(sub => {
    if (selectedSubjectId !== 'all' && sub.id !== selectedSubjectId) return false;
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    const matchSubject = sub.name.toLowerCase().includes(query);
    const matchTopic = sub.topics.some(t => t.title.toLowerCase().includes(query) || t.summary.toLowerCase().includes(query));
    return matchSubject || matchTopic;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Área de Estudos</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Explore todos os conteúdos organizados de acordo com o edital do ENEM e dos principais vestibulares.
          </p>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full scrollbar-none">
          <button
            onClick={() => setSelectedSubjectId('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedSubjectId === 'all'
                ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/20'
                : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
            }`}
          >
            Todas as Matérias ({subjects.length})
          </button>
          {subjects.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedSubjectId === sub.id
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/20'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      </div>

      {/* Subjects & Topics Render */}
      <div className="space-y-8">
        {filteredSubjects.map((sub) => {
          const IconComp = getSubjectIcon(sub.icon);
          const totalSubTopics = sub.topics.length;
          const completedSubTopics = sub.topics.filter(t => completedTopicIds.includes(t.id)).length;
          const subProgressPct = Math.round((completedSubTopics / totalSubTopics) * 100);

          return (
            <section key={sub.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
              {/* Subject Title */}
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${sub.bgColor} rounded-2xl flex items-center justify-center font-bold`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white">{sub.name}</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{sub.description}</p>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-gray-900 dark:text-white">{completedSubTopics} / {totalSubTopics} concluídos</div>
                  <div className="w-32 bg-gray-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                    <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${subProgressPct}%` }} />
                  </div>
                </div>
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sub.topics.map((topic) => {
                  const isDone = completedTopicIds.includes(topic.id);

                  return (
                    <div
                      key={topic.id}
                      onClick={() => onSelectTopic(topic)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                        isDone
                          ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
                          : 'bg-gray-50/60 dark:bg-slate-800/40 border-gray-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-gray-400 flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{topic.estimatedMinutes} min</span>
                          </span>
                          {isDone ? (
                            <span className="flex items-center space-x-1 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Concluído</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 group-hover:underline">
                              Estudar agora
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
                          {topic.summary}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-800/60 text-xs font-semibold text-gray-600 dark:text-gray-300">
                        <span>{topic.exercises.length + topic.examQuestions.length} questões</span>
                        <Play className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
