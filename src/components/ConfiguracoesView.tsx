import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  Settings, 
  Lock, 
  Sun, 
  Moon, 
  Bell, 
  LogOut, 
  CheckCircle2, 
  ShieldCheck, 
  RotateCcw 
} from 'lucide-react';

interface ConfiguracoesViewProps {
  user: UserProfile;
  onToggleTheme: () => void;
  onLogout: () => void;
  onResetData: () => void;
}

export const ConfiguracoesView: React.FC<ConfiguracoesViewProps> = ({
  user,
  onToggleTheme,
  onLogout,
  onResetData
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Notifications toggles
  const [notifyDailyReminders, setNotifyDailyReminders] = useState(true);
  const [notifySimuladoAlerts, setNotifySimuladoAlerts] = useState(true);
  const [notifyWeeklyReport, setNotifyWeeklyReport] = useState(true);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (newPassword.length < 6) {
      setPasswordError('A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('A confirmação da senha não confere com a nova senha.');
      return;
    }

    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Configurações da Conta</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Ajuste suas preferências de interface, segurança e notificações da plataforma.
        </p>
      </div>

      <div className="space-y-6">
        {/* Theme Settings */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white flex items-center space-x-2 border-b border-gray-100 dark:border-slate-800 pb-3">
            {user.theme === 'dark' ? <Moon className="w-4 h-4 text-purple-500" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <span>Aparência e Tema da Interface</span>
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200">Modo Escuro / Claro</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                Alterne para o modo escuro para estudar confortavelmente à noite.
              </p>
            </div>

            <button
              onClick={onToggleTheme}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                user.theme === 'dark'
                  ? 'bg-purple-950 text-purple-300 border border-purple-800'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {user.theme === 'dark' ? (
                <>
                  <Moon className="w-4 h-4 text-purple-400" />
                  <span>Modo Escuro Ativo</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>Modo Claro Ativo</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Password Change Form */}
        <form onSubmit={handleChangePassword} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white flex items-center space-x-2 border-b border-gray-100 dark:border-slate-800 pb-3">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>Alterar Senha de Acesso</span>
          </h2>

          {passwordSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-2xl flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Sua senha foi alterada com sucesso!</span>
            </div>
          )}

          {passwordError && (
            <div className="p-3 bg-rose-50 text-rose-700 text-xs font-bold rounded-2xl flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{passwordError}</span>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Senha Atual</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Nova Senha</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Confirmar Nova Senha</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a nova senha"
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer"
          >
            Atualizar Senha
          </button>
        </form>

        {/* Notifications Preference */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white flex items-center space-x-2 border-b border-gray-100 dark:border-slate-800 pb-3">
            <Bell className="w-4 h-4 text-emerald-600" />
            <span>Notificações e Lembretes de Estudo</span>
          </h2>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
              <div>
                <p className="text-xs font-bold text-gray-800 dark:text-gray-200">Lembretes Diários de Sequência</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Receba alertas para não quebrar seus dias seguidos estudando.</p>
              </div>
              <input
                type="checkbox"
                checked={notifyDailyReminders}
                onChange={(e) => setNotifyDailyReminders(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
              <div>
                <p className="text-xs font-bold text-gray-800 dark:text-gray-200">Alertas de Novos Simulados</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Notificar quando um novo simulado oficial ENEM ou FUVEST estiver disponível.</p>
              </div>
              <input
                type="checkbox"
                checked={notifySimuladoAlerts}
                onChange={(e) => setNotifySimuladoAlerts(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
              <div>
                <p className="text-xs font-bold text-gray-800 dark:text-gray-200">Relatório Semanal de Desempenho</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Resumo por e-mail das suas horas estudadas e metas alcançadas.</p>
              </div>
              <input
                type="checkbox"
                checked={notifyWeeklyReport}
                onChange={(e) => setNotifyWeeklyReport(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Danger / Logout Zone */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-gray-900 dark:text-white">Encerrar Sessão</p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Desconectar da sua conta no Facilita+.</p>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onResetData}
              className="px-4 py-2.5 rounded-2xl border border-gray-200 dark:border-slate-700 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetar Dados Local</span>
            </button>

            <button
              onClick={onLogout}
              className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 cursor-pointer flex items-center space-x-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair da Conta</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
