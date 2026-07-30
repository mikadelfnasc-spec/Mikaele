export type GradeLevel = '1º ano' | '2º ano' | '3º ano' | 'Concluído';
export type StudyPeriod = 'Manhã' | 'Tarde' | 'Noite' | 'Integral';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  grade: GradeLevel;
  period: StudyPeriod;
  streakDays: number;
  hoursStudied: number;
  weeklyGoalHours: number;
  weeklyStudiedHours: number;
  completedTopicIds: string[];
  favoriteTopicIds: string[];
  lastAccessedTopicId?: string;
  theme: 'light' | 'dark';
}

export interface Question {
  id: string;
  title: string;
  contextText?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  examName?: string;
  year?: number;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  subjectName: string;
  topicTitle: string;
}

export interface Topic {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  summary: string;
  explanation: string;
  youtubeEmbedId: string;
  youtubeTitle: string;
  exercises: Question[];
  flashcards: Flashcard[];
  examQuestions: Question[];
  estimatedMinutes: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  topics: Topic[];
}

export interface Simulado {
  id: string;
  title: string;
  acronym: 'ENEM' | 'FUVEST' | 'UNESP' | 'UNICAMP' | 'VUNESP';
  description: string;
  durationMinutes: number;
  questions: Question[];
  badgeColor: string;
}

export interface SimuladoResult {
  id: string;
  simuladoId: string;
  simuladoTitle: string;
  acronym: string;
  scorePercentage: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpentSeconds: number;
  completedAt: string;
  userAnswers: Record<number, number>; // questionIndex -> chosenOption
  subjectBreakdown: {
    subjectName: string;
    total: number;
    correct: number;
  }[];
}

export interface VestibularInfo {
  id: string;
  acronym: string;
  fullName: string;
  examDate: string;
  daysRemaining: number;
  editalUrl: string;
  summary: string;
  topicsCovered: string[];
  cutoffs: { course: string; score: number }[];
  studyTips: string[];
  badgeColor: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  category: 'estudo' | 'simulado' | 'sequencia' | 'ia';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ia';
  text: string;
  timestamp: string;
  isStepByStep?: boolean;
}

export interface StudyCalendarEvent {
  id: string;
  day: string; // 'Segunda', 'Terça', etc.
  subject: string;
  topics: string[];
  time: string;
  completed: boolean;
}
