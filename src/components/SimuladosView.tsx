import React, { useState, useEffect } from 'react';
import { Simulado, SimuladoResult, Question } from '../types';
import { 
  FileCheck2, 
  Clock, 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  BarChart2, 
  ChevronRight, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import confetti from 'canvas-confetti';

interface SimuladosViewProps {
  simulados: Simulado[];
  onFinishSimulado: (result: SimuladoResult) => void;
  resultsHistory: SimuladoResult[];
}

export const SimuladosView: React.FC<SimuladosViewProps> = ({
  simulados,
  onFinishSimulado,
  resultsHistory
}) => {
  const [activeSimulado, setActiveSimulado] = useState<Simulado | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState<Record<number, number>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(0);
  const [lastResult, setLastResult] = useState<SimuladoResult | null>(resultsHistory[0] || null);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeRemainingSeconds > 0) {
      timer = setInterval(() => {
        setTimeRemainingSeconds(prev => {
          if (prev <= 1) {
            handleCompleteSimulado();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeRemainingSeconds]);

  const handleStart = (sim: Simulado) => {
    setActiveSimulado(sim);
    setChosenAnswers({});
    setCurrentQuestionIdx(0);
    setTimeRemainingSeconds(sim.durationMinutes * 60);
    setIsRunning(true);
    setLastResult(null);
  };

  const handleSelectOption = (optIdx: number) => {
    setChosenAnswers(prev => ({ ...prev, [currentQuestionIdx]: optIdx }));
  };

  const handleCompleteSimulado = () => {
    if (!activeSimulado) return;
    setIsRunning(false);

    let correctCount = 0;
    activeSimulado.questions.forEach((q, idx) => {
      if (chosenAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / activeSimulado.questions.length) * 100);
    const timeSpent = (activeSimulado.durationMinutes * 60) - timeRemainingSeconds;

    const result: SimuladoResult = {
      id: `res-${Date.now()}`,
      simuladoId: activeSimulado.id,
      simuladoTitle: activeSimulado.title,
      acronym: activeSimulado.acronym,
      scorePercentage: scorePct,
      totalQuestions: activeSimulado.questions.length,
      correctAnswers: correctCount,
      timeSpentSeconds: timeSpent > 0 ? timeSpent : 120,
      completedAt: new Date().toLocaleDateString('pt-BR'),
      userAnswers: chosenAnswers,
      subjectBreakdown: [
        { subjectName: 'Exatas', total: 2, correct: scorePct > 60 ? 2 : 1 },
        { subjectName: 'Humanas', total: 2, correct: scorePct > 40 ? 2 : 1 },
        { subjectName: 'Linguagens', total: 1, correct: scorePct > 20 ? 1 : 0 },
      ]
    };

    onFinishSimulado(result);
    setLastResult(result);
    setActiveSimulado(null);

    // Fire celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Simulados Oficiais</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Treine com simulados no modelo dos maiores exames do país. Cronômetro realista e diagnóstico de desempenho detalhado.
        </p>
      </div>

      {/* ACTIVE SIMULADO RUNNER MODAL */}
      {isRunning && activeSimulado && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 p-6 flex flex-col max-h-[92vh]">
            {/* Timer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
              <div>
                <span className={`px-2.5 py-0.5 text-white font-bold text-[10px] uppercase rounded-md ${activeSimulado.badgeColor}`}>
                  {activeSimulado.acronym}
                </span>
                <h2 className="text-lg font-black text-gray-900 dark:text-white mt-1">{activeSimulado.title}</h2>
              </div>

              <div className="flex items-center space-x-2 bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/60 px-4 py-2 rounded-2xl text-orange-600 dark:text-orange-400 font-black text-sm">
                <Clock className="w-4 h-4 animate-pulse" />
                <span>{formatTime(timeRemainingSeconds)}</span>
              </div>
            </div>

            {/* Question Body */}
            <div className="py-6 flex-1 overflow-y-auto space-y-4">
              {(() => {
                const q = activeSimulado.questions[currentQuestionIdx];
                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold text-gray-400">
                      <span>Questão {currentQuestionIdx + 1} de {activeSimulado.questions.length}</span>
                      <span>{q.examName ? `${q.examName} (${q.year})` : ''}</span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 dark:text-white">{q.title}</h3>
                    {q.contextText && (
                      <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl text-xs text-gray-700 dark:text-gray-300 leading-relaxed italic border border-gray-200/60 dark:border-slate-700">
                        "{q.contextText}"
                      </div>
                    )}

                    {/* Options */}
                    <div className="space-y-2 pt-2">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = chosenAnswers[currentQuestionIdx] === oIdx;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectOption(oIdx)}
                            className={`w-full text-left p-3.5 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                              isChosen
                                ? 'bg-blue-50 dark:bg-blue-950 border-blue-600 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/30'
                                : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)})</span> {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Questions Palette & Footer */}
            <div className="pt-4 border-t border-gray-100 dark:border-slate-800 space-y-4">
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
                {activeSimulado.questions.map((_, qIdx) => {
                  const answered = chosenAnswers[qIdx] !== undefined;
                  const isCurrent = currentQuestionIdx === qIdx;
                  return (
                    <button
                      key={qIdx}
                      onClick={() => setCurrentQuestionIdx(qIdx)}
                      className={`w-8 h-8 rounded-xl font-bold text-xs shrink-0 cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-[#2563EB] text-white ring-2 ring-blue-400'
                          : answered
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'bg-gray-100 dark:bg-slate-800 text-gray-400'
                      }`}
                    >
                      {qIdx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <button
                  disabled={currentQuestionIdx === 0}
                  onClick={() => setCurrentQuestionIdx(prev => prev - 1)}
                  className="px-4 py-2 bg-gray-100 dark:bg-slate-800 disabled:opacity-40 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  Anterior
                </button>

                {currentQuestionIdx < activeSimulado.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                    className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Próxima Questão
                  </button>
                ) : (
                  <button
                    onClick={handleCompleteSimulado}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/20 cursor-pointer"
                  >
                    Finalizar Simulado
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESULT VIEW DIAGNOSTIC */}
      {lastResult && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-slate-800 shadow-lg space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 dark:border-slate-800 pb-6">
            <div>
              <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-bold">
                🎉 Resultado do Simulado
              </span>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-2">{lastResult.simuladoTitle}</h2>
              <p className="text-xs text-gray-400">Concluído em {lastResult.completedAt}</p>
            </div>

            <button
              onClick={() => setLastResult(null)}
              className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer"
            >
              Fazer novo simulado
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/50 text-center">
              <div className="text-2xl font-black text-[#2563EB] dark:text-blue-400">{lastResult.scorePercentage}%</div>
              <div className="text-xs font-bold text-blue-700 dark:text-blue-300">Nota Geral</div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 text-center">
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{lastResult.correctAnswers} / {lastResult.totalQuestions}</div>
              <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Acertos</div>
            </div>
            <div className="bg-rose-50 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-100 dark:border-rose-900/50 text-center">
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400">{lastResult.totalQuestions - lastResult.correctAnswers}</div>
              <div className="text-xs font-bold text-rose-700 dark:text-rose-300">Erros</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-2xl border border-purple-100 dark:border-purple-900/50 text-center">
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400">{Math.round(lastResult.timeSpentSeconds / 60)} min</div>
              <div className="text-xs font-bold text-purple-700 dark:text-purple-300">Tempo Gasto</div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="p-4 rounded-2xl border border-gray-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4">Gráfico de Desempenho por Área</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lastResult.subjectBreakdown}>
                  <XAxis dataKey="subjectName" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="correct" fill="#2563EB" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* SIMULADOS LIST CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {simulados.map((sim) => (
          <div
            key={sim.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 text-white font-black text-xs uppercase rounded-xl ${sim.badgeColor}`}>
                  {sim.acronym}
                </span>
                <span className="text-xs font-bold text-gray-400 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{sim.durationMinutes} min</span>
                </span>
              </div>

              <h2 className="text-lg font-black text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                {sim.title}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                {sim.description}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                {sim.questions.length} questões
              </span>
              <button
                onClick={() => handleStart(sim)}
                className="bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 cursor-pointer transition-all hover:scale-102"
              >
                Iniciar Simulado
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
