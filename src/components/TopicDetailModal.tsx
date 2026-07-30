import React, { useState } from 'react';
import { Topic, Question, Flashcard } from '../types';
import { 
  X, 
  CheckCircle2, 
  Play, 
  FileText, 
  HelpCircle, 
  Layers, 
  Star, 
  Bot, 
  Check, 
  RotateCw, 
  Award,
  Sparkles
} from 'lucide-react';

interface TopicDetailModalProps {
  topic: Topic;
  isCompleted: boolean;
  isFavorite: boolean;
  onToggleComplete: (topicId: string) => void;
  onToggleFavorite: (topicId: string) => void;
  onClose: () => void;
  onOpenIAChatWithTopic: (topicTitle: string) => void;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  topic,
  isCompleted,
  isFavorite,
  onToggleComplete,
  onToggleFavorite,
  onClose,
  onOpenIAChatWithTopic
}) => {
  const [activeTab, setActiveTab] = useState<'explicacao' | 'video' | 'exercicios' | 'flashcards'>('explicacao');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showAnswerExplanations, setShowAnswerExplanations] = useState<Record<string, boolean>>({});
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const allQuestions = [...(topic.exercises || []), ...(topic.examQuestions || [])];
  const flashcards = topic.flashcards || [];

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setShowAnswerExplanations(prev => ({ ...prev, [questionId]: true }));
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-gray-50/50 dark:bg-slate-900/80">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-wider rounded-md">
                {topic.subjectName}
              </span>
              <span className="text-xs text-gray-400">• {topic.estimatedMinutes} min de leitura</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight">{topic.title}</h2>
          </div>

          <div className="flex items-center space-x-2">
            {/* Favorite button */}
            <button
              onClick={() => onToggleFavorite(topic.id)}
              className={`p-2.5 rounded-2xl border transition-all cursor-pointer ${
                isFavorite 
                  ? 'bg-amber-50 text-amber-500 border-amber-200 dark:bg-amber-950/40 dark:border-amber-900/50' 
                  : 'bg-white dark:bg-slate-800 text-gray-400 border-gray-200 dark:border-slate-700 hover:text-amber-500'
              }`}
              title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              <Star className={`w-5 h-5 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>

            {/* Complete toggle button */}
            <button
              onClick={() => onToggleComplete(topic.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Concluído' : 'Marcar como concluído'}</span>
            </button>

            {/* Close modal */}
            <button
              onClick={onClose}
              className="p-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-gray-100 dark:border-slate-800 px-6 bg-white dark:bg-slate-900 shrink-0 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('explicacao')}
            className={`flex items-center space-x-2 py-3.5 px-4 font-bold text-xs border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'explicacao'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Explicação & Resumo</span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center space-x-2 py-3.5 px-4 font-bold text-xs border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'video'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Videoaula</span>
          </button>

          <button
            onClick={() => setActiveTab('exercicios')}
            className={`flex items-center space-x-2 py-3.5 px-4 font-bold text-xs border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'exercicios'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Exercícios ({allQuestions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center space-x-2 py-3.5 px-4 font-bold text-xs border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'flashcards'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Flashcards ({flashcards.length})</span>
          </button>
        </div>

        {/* Modal Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: EXPLICAÇÃO & RESUMO */}
          {activeTab === 'explicacao' && (
            <div className="space-y-6">
              {/* Resumo Card */}
              <div className="bg-blue-50/70 dark:bg-blue-950/30 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/40">
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-bold text-xs mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Resumo Expresso Facilita+</span>
                </div>
                <p className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-relaxed">
                  {topic.summary}
                </p>
              </div>

              {/* Explicação Detalhada */}
              <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-wrap space-y-4">
                {topic.explanation}
              </div>

              {/* AI Help CTA inside topic */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bot className="w-6 h-6 shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs">Ficou com alguma dúvida sobre {topic.title}?</h4>
                    <p className="text-[11px] text-blue-100">O Professor IA pode te explicar com exemplos diferentes!</p>
                  </div>
                </div>
                <button
                  onClick={() => onOpenIAChatWithTopic(topic.title)}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
                >
                  Perguntar ao Professor IA
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: VIDEOAULA */}
          {activeTab === 'video' && (
            <div className="space-y-4">
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${topic.youtubeEmbedId}`}
                  title={topic.youtubeTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">{topic.youtubeTitle}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Videoaula selecionada e focada nos conteúdos cobrados nos vestibulares e no ENEM.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: EXERCÍCIOS */}
          {activeTab === 'exercicios' && (
            <div className="space-y-6">
              {allQuestions.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <HelpCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-semibold">Exercícios em breve para este tópico!</p>
                </div>
              ) : (
                allQuestions.map((q, qIndex) => {
                  const chosenOpt = selectedAnswers[q.id];
                  const showExp = showAnswerExplanations[q.id];

                  return (
                    <div key={q.id} className="bg-gray-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                          Questão #{qIndex + 1} {q.examName ? `• ${q.examName} (${q.year})` : ''}
                        </span>
                        {showExp && (
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            chosenOpt === q.correctIndex
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          }`}>
                            {chosenOpt === q.correctIndex ? 'Resposta Correta! 🎉' : 'Resposta Incorreta'}
                          </span>
                        )}
                      </div>

                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{q.title}</p>
                      {q.contextText && (
                        <p className="text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-gray-200 dark:border-slate-700 leading-relaxed italic">
                          "{q.contextText}"
                        </p>
                      )}

                      <div className="space-y-2">
                        {q.options.map((opt, oIdx) => {
                          let btnStyle = "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-200 hover:border-blue-400";
                          if (showExp) {
                            if (oIdx === q.correctIndex) {
                              btnStyle = "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold";
                            } else if (chosenOpt === oIdx) {
                              btnStyle = "bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200";
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleSelectOption(q.id, oIdx)}
                              className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{String.fromCharCode(65 + oIdx)}) {opt}</span>
                              {showExp && oIdx === q.correctIndex && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {showExp && (
                        <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
                          <p className="font-bold mb-1">💡 Resolução Comentada:</p>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB 4: FLASHCARDS */}
          {activeTab === 'flashcards' && (
            <div className="space-y-6">
              {flashcards.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Layers className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-semibold">Nenhum flashcard disponível para este tópico ainda.</p>
                </div>
              ) : (
                <div className="max-w-md mx-auto space-y-4">
                  <div className="text-center text-xs font-bold text-gray-400">
                    Card {currentFlashcardIndex + 1} de {flashcards.length}
                  </div>

                  {/* Flashcard Box */}
                  <div
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="h-64 w-full bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl flex flex-col items-center justify-center text-center cursor-pointer select-none transition-transform active:scale-98 relative group"
                  >
                    <div className="absolute top-4 right-4 text-xs font-bold text-blue-200 bg-white/20 px-2.5 py-1 rounded-full">
                      {isFlipped ? 'Resposta' : 'Pergunta'}
                    </div>

                    <p className="text-base font-bold leading-relaxed px-4">
                      {isFlipped ? flashcards[currentFlashcardIndex].back : flashcards[currentFlashcardIndex].front}
                    </p>

                    <div className="absolute bottom-4 flex items-center space-x-1 text-xs text-blue-200 opacity-80 group-hover:opacity-100">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Clique para virar</span>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      disabled={currentFlashcardIndex === 0}
                      onClick={() => { setCurrentFlashcardIndex(prev => prev - 1); setIsFlipped(false); }}
                      className="px-4 py-2 bg-gray-100 dark:bg-slate-800 disabled:opacity-40 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 cursor-pointer"
                    >
                      Anterior
                    </button>
                    <button
                      disabled={currentFlashcardIndex === flashcards.length - 1}
                      onClick={() => { setCurrentFlashcardIndex(prev => prev + 1); setIsFlipped(false); }}
                      className="px-4 py-2 bg-blue-600 text-white disabled:opacity-40 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Próximo
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
