import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  Search, 
  Flame, 
  Bell, 
  Bot, 
  Sun, 
  Moon, 
  Menu, 
  X,
  GraduationCap,
  LogOut,
  User,
  Settings
} from 'lucide-react';

interface NavbarProps {
  user: UserProfile;
  onOpenIAChat: () => void;
  onToggleTheme: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenIAChat,
  onToggleTheme,
  onSearchChange,
  searchQuery,
  onNavigate,
  onLogout
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 transition-colors">
      {/* Search Input */}
      <div className="flex-1 max-w-md mr-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Pesquisar matérias, tópicos, simulados..."
            className="w-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-100 text-sm rounded-full pl-10 pr-4 py-2 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all placeholder-gray-400"
          />
          {searchQuery && (
            <button 
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Streak Counter */}
        <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 rounded-full text-xs font-bold border border-orange-200 dark:border-orange-800/50 shadow-xs">
          <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse" />
          <span>{user.streakDays} dias de sequência</span>
        </div>

        {/* Professor IA trigger */}
        <button
          onClick={onOpenIAChat}
          className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all hover:shadow-md cursor-pointer"
        >
          <Bot className="w-4 h-4" />
          <span>Professor IA</span>
        </button>

        {/* Theme Switcher */}
        <button
          onClick={onToggleTheme}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="Alternar Tema Claro/Escuro"
        >
          {user.theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors relative cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            <span className="w-2 h-2 bg-blue-600 rounded-full absolute top-1.5 right-1.5 ring-2 ring-white dark:ring-slate-900" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-4 z-50 text-sm animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100 dark:border-slate-800">
                <span className="font-bold text-gray-900 dark:text-white">Notificações</span>
                <span className="text-xs text-blue-600 font-medium">3 novas</span>
              </div>
              <div className="space-y-3">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-xs">
                  <p className="font-semibold text-blue-900 dark:text-blue-300">🎯 Novo Simulado ENEM liberado!</p>
                  <p className="text-blue-700 dark:text-blue-400 mt-0.5">Teste seus conhecimentos em 10 questões inéditas.</p>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-slate-800 text-xs">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">🔥 Sequência de 12 dias mantida!</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5">Continue estudando hoje para alcançar a conquista de 15 dias.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/30"
            />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3 border-b border-gray-100 dark:border-slate-800">
                <p className="font-bold text-gray-900 dark:text-white text-sm leading-tight">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                <span className="inline-block mt-1.5 px-2 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-md text-[10px] font-bold uppercase tracking-wider">
                  {user.grade} • {user.period}
                </span>
              </div>
              <div className="py-1">
                <button
                  onClick={() => { onNavigate('perfil'); setShowUserDropdown(false); }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-gray-400" />
                  <span>Meu Perfil</span>
                </button>
                <button
                  onClick={() => { onNavigate('configuracoes'); setShowUserDropdown(false); }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                  <span>Configurações</span>
                </button>
              </div>
              <div className="pt-1 border-t border-gray-100 dark:border-slate-800">
                <button
                  onClick={() => { onLogout(); setShowUserDropdown(false); }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair da conta</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
