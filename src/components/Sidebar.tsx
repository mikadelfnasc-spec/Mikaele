import React from 'react';
import { UserProfile } from '../types';
import { 
  Home, 
  BookOpen, 
  FileCheck2, 
  GraduationCap, 
  BarChart3, 
  User, 
  Settings, 
  Bot, 
  Sparkles,
  Layers
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  user: UserProfile;
  onOpenIAChat: () => void;
  onOpenFlashcards: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  user,
  onOpenIAChat,
  onOpenFlashcards
}) => {
  const navItems = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'estudos', label: 'Estudos', icon: BookOpen },
    { id: 'simulados', label: 'Simulados', icon: FileCheck2 },
    { id: 'vestibulares', label: 'Vestibulares', icon: GraduationCap },
    { id: 'painel', label: 'Painel do Aluno', icon: BarChart3 },
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col h-screen sticky top-0 shrink-0 select-none transition-colors z-20">
      {/* Brand Header */}
      <div 
        onClick={() => onNavigate('inicio')}
        className="p-6 flex items-center space-x-3 cursor-pointer group"
      >
        <div className="w-10 h-10 bg-[#2563EB] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
          F+
        </div>
        <div>
          <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Facilita+</span>
          <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Estudos & ENEM</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 shadow-xs'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800/60 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#2563EB] dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}

        <div className="pt-2">
          <button
            onClick={onOpenFlashcards}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all cursor-pointer border border-purple-100 dark:border-purple-900/30"
          >
            <Layers className="w-5 h-5 text-purple-500" />
            <span>Deck de Flashcards</span>
          </button>
        </div>
      </nav>

      {/* Professor IA Mini Banner */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 text-white shadow-lg shadow-blue-600/15 relative overflow-hidden">
          <div className="absolute top-2 right-2 text-blue-200/40">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="text-xs font-semibold text-blue-100 mb-0.5">Dúvida rápida?</div>
          <div className="font-bold text-base mb-2.5 flex items-center space-x-1.5">
            <Bot className="w-4 h-4" />
            <span>Professor IA</span>
          </div>
          <button
            onClick={onOpenIAChat}
            className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
          >
            Tirar Dúvida Agora
          </button>
        </div>

        {/* User Footer */}
        <div 
          onClick={() => onNavigate('perfil')}
          className="mt-4 flex items-center space-x-3 px-2 py-2.5 rounded-xl border border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-200 dark:ring-slate-700"
          />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-gray-900 dark:text-white truncate">{user.name}</div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider truncate">
              {user.grade} • {user.period}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
