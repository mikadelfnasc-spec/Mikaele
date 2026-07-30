import React, { useState } from 'react';
import { Subject, Flashcard } from '../types';
import { X, Layers, RotateCw, ChevronLeft, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';

interface FlashcardsDeckModalProps {
  subjects: Subject[];
  onClose: () => void;
}

export const FlashcardsDeckModal: React.FC<FlashcardsDeckModalProps> = ({ subjects, onClose }) => {
  const allFlashcards: Flashcard[] = subjects.flatMap(s => s.topics.flatMap(t => t.flashcards || []));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  if (allFlashcards.length === 0) {
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full text-center space-y-4">
          <Layers className="w-12 h-12 mx-auto text-purple-500" />
          <h2 className="text-xl font-black text-gray-900 dark:text-white">Deck de Flashcards</h2>
          <p className="text-xs text-gray-500">Nenhum flashcard cadastrado ainda.</p>
          <button onClick={onClose} className="px-6 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl cursor-pointer">
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const currentCard = allFlashcards[currentIndex];
  const isMastered = masteredIds.includes(currentCard.id);

  const toggleMastered = () => {
    if (isMastered) {
      setMasteredIds(prev => prev.filter(id => id !== currentCard.id));
    } else {
      setMasteredIds(prev => [...prev, currentCard.id]);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 p-6 flex flex-col items-center space-y-6 relative">
        {/* Header */}
        <div className="w-full flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900 dark:text-white">Deck de Flashcards</h2>
              <p className="text-[11px] text-gray-400">Revisão ativa de conceitos chave</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Counter */}
        <div className="flex items-center space-x-2 text-xs font-bold text-gray-500">
          <span>{currentCard.subjectName} • {currentCard.topicTitle}</span>
          <span>({currentIndex + 1} / {allFlashcards.length})</span>
        </div>

        {/* Card Box */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="h-72 w-full bg-gradient-to-br from-purple-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl flex flex-col items-center justify-center text-center cursor-pointer select-none relative group transition-transform active:scale-98"
        >
          <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider">
            {isFlipped ? 'Resposta' : 'Pergunta'}
          </div>

          <p className="text-lg font-bold leading-relaxed px-4">
            {isFlipped ? currentCard.back : currentCard.front}
          </p>

          <div className="absolute bottom-4 flex items-center space-x-1 text-xs text-purple-200 opacity-80 group-hover:opacity-100">
            <RotateCw className="w-4 h-4" />
            <span>Clique para virar o card</span>
          </div>
        </div>

        {/* Controls */}
        <div className="w-full flex items-center justify-between pt-2">
          <button
            disabled={currentIndex === 0}
            onClick={() => { setCurrentIndex(prev => prev - 1); setIsFlipped(false); }}
            className="p-3 bg-gray-100 dark:bg-slate-800 disabled:opacity-30 rounded-2xl text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center space-x-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <button
            onClick={toggleMastered}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
              isMastered
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 hover:text-emerald-600'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isMastered ? 'Dominado' : 'Marcar como Dominado'}</span>
          </button>

          <button
            disabled={currentIndex === allFlashcards.length - 1}
            onClick={() => { setCurrentIndex(prev => prev + 1); setIsFlipped(false); }}
            className="p-3 bg-[#2563EB] disabled:opacity-30 text-white rounded-2xl text-xs font-bold flex items-center space-x-1 cursor-pointer"
          >
            <span>Próximo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
