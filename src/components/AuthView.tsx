import React, { useState } from 'react';
import { Mail, Lock, User, GraduationCap, ArrowRight, BookOpen, CheckCircle, Sparkles } from 'lucide-react';
import { GradeLevel, StudyPeriod } from '../types';

interface AuthViewProps {
  onLogin: (email: string, name?: string, grade?: GradeLevel, period?: StudyPeriod) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Form State
  const [email, setEmail] = useState('ana.souza@estudante.com');
  const [password, setPassword] = useState('senha123');
  const [name, setName] = useState('Ana Souza');
  const [grade, setGrade] = useState<GradeLevel>('3º ano');
  const [period, setPeriod] = useState<StudyPeriod>('Manhã');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotPassword) {
      setMessage('Instruções para redefinição de senha foram enviadas para seu e-mail!');
      setTimeout(() => setForgotPassword(false), 2500);
      return;
    }

    if (isRegistering) {
      onLogin(email, name, grade, period);
    } else {
      onLogin(email);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F3F4F6] dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Decorative Educational Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/10 dark:bg-indigo-600/10 blur-3xl pointer-events-none" />

      {/* Floating Educational Icons */}
      <div className="absolute top-12 left-16 text-blue-200 dark:text-slate-800 animate-bounce duration-1000 hidden md:block">
        <GraduationCap className="w-16 h-16 opacity-40" />
      </div>
      <div className="absolute bottom-16 left-24 text-indigo-200 dark:text-slate-800 hidden md:block">
        <BookOpen className="w-14 h-14 opacity-30" />
      </div>
      <div className="absolute top-20 right-20 text-purple-200 dark:text-slate-800 hidden md:block">
        <Sparkles className="w-12 h-12 opacity-30" />
      </div>

      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 dark:border-slate-800 p-8 z-10 relative">
        {/* Brand Identity */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#2563EB] rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto shadow-lg shadow-blue-600/25 mb-3">
            F+
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Facilita<span className="text-[#2563EB]">+</span>
          </h1>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1 italic">
            "Seu futuro começa com um clique."
          </p>
        </div>

        {message && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {forgotPassword ? (
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 text-center">
                Digite seu e-mail para receber um link de recuperação de senha.
              </p>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">E-mail</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@exemplo.com"
                    className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3 rounded-2xl text-sm transition-all shadow-md shadow-blue-600/20 cursor-pointer"
              >
                Enviar Link de Redefinição
              </button>

              <button
                type="button"
                onClick={() => setForgotPassword(false)}
                className="w-full mt-3 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-semibold cursor-pointer"
              >
                Voltar para o Login
              </button>
            </div>
          ) : (
            <>
              {isRegistering && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Nome Completo</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Ana Souza"
                      className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">E-mail</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@exemplo.com"
                    className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Senha</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {isRegistering && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Série</label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value as GradeLevel)}
                      className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-all cursor-pointer"
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
                      className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="Manhã">Manhã</option>
                      <option value="Tarde">Tarde</option>
                      <option value="Noite">Noite</option>
                      <option value="Integral">Integral</option>
                    </select>
                  </div>
                </div>
              )}

              {!isRegistering && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span>Lembrar de mim</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotPassword(true)}
                    className="text-[#2563EB] hover:underline font-semibold cursor-pointer"
                  >
                    Esqueci minha senha
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3 rounded-2xl text-sm transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
              >
                <span>{isRegistering ? 'Criar minha conta' : 'Entrar no Facilita+'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-4 text-center border-t border-gray-100 dark:border-slate-800 mt-4">
                <button
                  type="button"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-xs text-gray-600 dark:text-gray-400 font-medium hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  {isRegistering ? (
                    <>Já possui conta? <span className="font-bold text-[#2563EB]">Fazer Login</span></>
                  ) : (
                    <>Ainda não tem conta? <span className="font-bold text-[#2563EB]">Criar conta grátis</span></>
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
