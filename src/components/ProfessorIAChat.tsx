import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { askProfessorIA } from '../services/aiService';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  PenTool, 
  Calendar, 
  Copy, 
  Check, 
  User,
  RotateCcw
} from 'lucide-react';

interface ProfessorIAChatProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopicTitle?: string;
}

export const ProfessorIAChat: React.FC<ProfessorIAChatProps> = ({
  isOpen,
  onClose,
  initialTopicTitle
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'ia',
      text: `### 🚀 Olá! Eu sou o seu **Professor IA** do Facilita+!

Estou aqui para ajudar você a gabaritar no **ENEM** e nos **Vestibulares**!

O que você gostaria de fazer hoje?
- ❓ **Tirar uma dúvida** sobre qualquer matéria ou conceito.
- 📐 **Resolver um exercício passo a passo**.
- 📝 **Receber dicas para a Redação Nota 1000 no ENEM**.
- 📅 **Criar um cronograma de estudos personalizado**.

Digite sua pergunta abaixo ou escolha um dos atalhos rápidos!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialTopicTitle) {
      handleQuickPrompt(`Pode me dar um resumo prático com os pontos principais de ${initialTopicTitle}?`, 'chat');
    }
  }, [initialTopicTitle]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string, modeOverride?: 'chat' | 'step_by_step' | 'essay_feedback' | 'schedule') => {
    const prompt = (textToSend || inputPrompt).trim();
    if (!prompt || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const responseText = await askProfessorIA({
        prompt,
        topicTitle: initialTopicTitle,
        mode: modeOverride || 'chat'
      });

      const iaMsg: ChatMessage = {
        id: `ia-${Date.now()}`,
        sender: 'ia',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, iaMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'ia',
          text: 'Ops! Ocorreu uma oscilação na conexão. Tente perguntar novamente!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string, mode: 'chat' | 'step_by_step' | 'essay_feedback' | 'schedule') => {
    handleSendMessage(prompt, mode);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg h-full shadow-2xl border-l border-gray-100 dark:border-slate-800 flex flex-col">
        {/* Chat Drawer Header */}
        <div className="p-4 md:p-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h2 className="font-black text-base">Professor IA</h2>
                <span className="px-2 py-0.5 bg-white/20 rounded-md text-[10px] font-bold">Online</span>
              </div>
              <p className="text-xs text-blue-100">Seu assistente virtual 24h do Facilita+</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Quick Shortcut Chips */}
        <div className="p-3 bg-gray-50 dark:bg-slate-800/60 border-b border-gray-100 dark:border-slate-800 flex items-center space-x-2 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => handleQuickPrompt("Como estruturar uma Redação Nota 1000 no ENEM?", "essay_feedback")}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-full text-xs font-bold text-gray-700 dark:text-gray-200 hover:border-blue-500 shrink-0 cursor-pointer shadow-2xs"
          >
            <PenTool className="w-3.5 h-3.5 text-blue-600" />
            <span>Redação ENEM</span>
          </button>

          <button
            onClick={() => handleQuickPrompt("Pode resolver um exercício passo a passo para mim?", "step_by_step")}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-full text-xs font-bold text-gray-700 dark:text-gray-200 hover:border-blue-500 shrink-0 cursor-pointer shadow-2xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Passo a Passo</span>
          </button>

          <button
            onClick={() => handleQuickPrompt("Crie um cronograma de estudos focado no ENEM", "schedule")}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-full text-xs font-bold text-gray-700 dark:text-gray-200 hover:border-blue-500 shrink-0 cursor-pointer shadow-2xs"
          >
            <Calendar className="w-3.5 h-3.5 text-purple-600" />
            <span>Cronograma</span>
          </button>
        </div>

        {/* Message History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start space-x-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ia' && (
                <div className="w-8 h-8 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] p-4 rounded-3xl text-xs leading-relaxed space-y-2 relative group shadow-2xs ${
                  m.sender === 'user'
                    ? 'bg-[#2563EB] text-white rounded-tr-xs font-medium'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-tl-xs border border-gray-200/50 dark:border-slate-700/50'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">
                  {m.text}
                </div>

                <div className={`flex items-center justify-between text-[10px] pt-1 ${m.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                  <span>{m.timestamp}</span>
                  {m.sender === 'ia' && (
                    <button
                      onClick={() => handleCopy(m.id, m.text)}
                      className="hover:text-blue-600 transition-colors cursor-pointer"
                      title="Copiar resposta"
                    >
                      {copiedId === m.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  )}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-2xl bg-slate-800 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-xs text-gray-400 p-3 bg-gray-50 dark:bg-slate-800/40 rounded-2xl w-fit animate-pulse">
              <Bot className="w-4 h-4 text-blue-600" />
              <span>O Professor IA está pensando e formatando a resposta...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Digite sua dúvida sobre qualquer matéria..."
              className="flex-1 bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white text-xs rounded-2xl px-4 py-3 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim() || loading}
              className="bg-[#2563EB] hover:bg-blue-700 disabled:opacity-40 text-white p-3 rounded-2xl transition-all shadow-md shadow-blue-600/20 cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
