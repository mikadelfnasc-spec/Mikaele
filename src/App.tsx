import React, { useState, useEffect } from 'react';
import { UserProfile, Subject, Topic, Simulado, SimuladoResult, Achievement, StudyCalendarEvent } from './types';
import { INITIAL_USER, SUBJECTS, SIMULADOS, VESTIBULARES, ACHIEVEMENTS, WEEKLY_CALENDAR } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AuthView } from './components/AuthView';
import { HomeView } from './components/HomeView';
import { EstudosView } from './components/EstudosView';
import { TopicDetailModal } from './components/TopicDetailModal';
import { SimuladosView } from './components/SimuladosView';
import { VestibularesView } from './components/VestibularesView';
import { PerfilView } from './components/PerfilView';
import { PainelView } from './components/PainelView';
import { ConfiguracoesView } from './components/ConfiguracoesView';
import { ProfessorIAChat } from './components/ProfessorIAChat';
import { FlashcardsDeckModal } from './components/FlashcardsDeckModal';

export default function App() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('facilita_auth') === 'true';
  });

  // User State
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('facilita_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  // View Routing State
  const [currentView, setCurrentView] = useState<string>('inicio');

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers State
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isIAChatOpen, setIsIAChatOpen] = useState(false);
  const [iaTopicTitle, setIaTopicTitle] = useState<string | undefined>(undefined);
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState(false);

  // Data Stores State
  const [subjects] = useState<Subject[]>(SUBJECTS);
  const [simulados] = useState<Simulado[]>(SIMULADOS);
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [calendarEvents, setCalendarEvents] = useState<StudyCalendarEvent[]>(WEEKLY_CALENDAR);
  const [simuladoResults, setSimuladoResults] = useState<SimuladoResult[]>([]);

  // Sync User to localStorage
  useEffect(() => {
    localStorage.setItem('facilita_user', JSON.stringify(user));
    localStorage.setItem('facilita_auth', isAuthenticated ? 'true' : 'false');
  }, [user, isAuthenticated]);

  // Apply Dark/Light Theme to Document Element
  useEffect(() => {
    if (user.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [user.theme]);

  // Handlers
  const handleLogin = (email: string, name?: string, grade?: any, period?: any) => {
    setUser(prev => ({
      ...prev,
      email,
      name: name || prev.name,
      grade: grade || prev.grade,
      period: period || prev.period
    }));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('facilita_auth');
  };

  const handleToggleTheme = () => {
    setUser(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }));
  };

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updated }));
  };

  const handleToggleCompleteTopic = (topicId: string) => {
    setUser(prev => {
      const isDone = prev.completedTopicIds.includes(topicId);
      const newCompleted = isDone
        ? prev.completedTopicIds.filter(id => id !== topicId)
        : [...prev.completedTopicIds, topicId];

      return {
        ...prev,
        completedTopicIds: newCompleted,
        lastAccessedTopicId: topicId,
        hoursStudied: isDone ? Math.max(0, prev.hoursStudied - 0.5) : prev.hoursStudied + 0.5,
        weeklyStudiedHours: isDone ? Math.max(0, prev.weeklyStudiedHours - 0.5) : prev.weeklyStudiedHours + 0.5
      };
    });
  };

  const handleToggleFavoriteTopic = (topicId: string) => {
    setUser(prev => {
      const isFav = prev.favoriteTopicIds.includes(topicId);
      const newFavs = isFav
        ? prev.favoriteTopicIds.filter(id => id !== topicId)
        : [...prev.favoriteTopicIds, topicId];
      return { ...prev, favoriteTopicIds: newFavs };
    });
  };

  const handleToggleCalendarEvent = (eventId: string) => {
    setCalendarEvents(prev => prev.map(evt => evt.id === eventId ? { ...evt, completed: !evt.completed } : evt));
  };

  const handleFinishSimulado = (result: SimuladoResult) => {
    setSimuladoResults(prev => [result, ...prev]);
    setUser(prev => ({
      ...prev,
      hoursStudied: prev.hoursStudied + 1,
      weeklyStudiedHours: prev.weeklyStudiedHours + 1
    }));
  };

  const handleResetData = () => {
    setUser(INITIAL_USER);
    setCalendarEvents(WEEKLY_CALENDAR);
    setSimuladoResults([]);
    localStorage.clear();
  };

  if (!isAuthenticated) {
    return <AuthView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] dark:bg-slate-950 text-gray-900 dark:text-gray-100 flex font-sans transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => { setCurrentView(view); setSearchQuery(''); }}
        user={user}
        onOpenIAChat={() => { setIaTopicTitle(undefined); setIsIAChatOpen(true); }}
        onOpenFlashcards={() => setIsFlashcardsOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Sticky Header Navbar */}
        <Navbar
          user={user}
          onOpenIAChat={() => { setIaTopicTitle(undefined); setIsIAChatOpen(true); }}
          onToggleTheme={handleToggleTheme}
          onSearchChange={(q) => { setSearchQuery(q); if (q && currentView !== 'estudos') setCurrentView('estudos'); }}
          searchQuery={searchQuery}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
        />

        {/* View Switcher */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {currentView === 'inicio' && (
            <HomeView
              user={user}
              subjects={subjects}
              weeklyCalendar={calendarEvents}
              onNavigate={setCurrentView}
              onSelectTopic={(t) => setSelectedTopic(t)}
              onOpenIAChat={() => { setIaTopicTitle(undefined); setIsIAChatOpen(true); }}
              onToggleCalendarEvent={handleToggleCalendarEvent}
            />
          )}

          {currentView === 'estudos' && (
            <EstudosView
              subjects={subjects}
              completedTopicIds={user.completedTopicIds}
              onSelectTopic={(t) => setSelectedTopic(t)}
              searchQuery={searchQuery}
            />
          )}

          {currentView === 'simulados' && (
            <SimuladosView
              simulados={simulados}
              onFinishSimulado={handleFinishSimulado}
              resultsHistory={simuladoResults}
            />
          )}

          {currentView === 'vestibulares' && (
            <VestibularesView
              vestibulares={VESTIBULARES}
            />
          )}

          {currentView === 'painel' && (
            <PainelView
              user={user}
              subjects={subjects}
              achievements={achievements}
              calendarEvents={calendarEvents}
            />
          )}

          {currentView === 'perfil' && (
            <PerfilView
              user={user}
              achievements={achievements}
              onUpdateUser={handleUpdateUser}
            />
          )}

          {currentView === 'configuracoes' && (
            <ConfiguracoesView
              user={user}
              onToggleTheme={handleToggleTheme}
              onLogout={handleLogout}
              onResetData={handleResetData}
            />
          )}
        </main>
      </div>

      {/* Topic Detail Modal */}
      {selectedTopic && (
        <TopicDetailModal
          topic={selectedTopic}
          isCompleted={user.completedTopicIds.includes(selectedTopic.id)}
          isFavorite={user.favoriteTopicIds.includes(selectedTopic.id)}
          onToggleComplete={handleToggleCompleteTopic}
          onToggleFavorite={handleToggleFavoriteTopic}
          onClose={() => setSelectedTopic(null)}
          onOpenIAChatWithTopic={(title) => {
            setSelectedTopic(null);
            setIaTopicTitle(title);
            setIsIAChatOpen(true);
          }}
        />
      )}

      {/* Professor IA Floating Chat Drawer */}
      <ProfessorIAChat
        isOpen={isIAChatOpen}
        onClose={() => setIsIAChatOpen(false)}
        initialTopicTitle={iaTopicTitle}
      />

      {/* Flashcards Review Deck Modal */}
      {isFlashcardsOpen && (
        <FlashcardsDeckModal
          subjects={subjects}
          onClose={() => setIsFlashcardsOpen(false)}
        />
      )}
    </div>
  );
}
