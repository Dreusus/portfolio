'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Minus } from 'lucide-react';
import { cn } from '@/shared/utils/utils';
import { useTranslation } from '@/shared/i18n';
import './chat-widget.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function ChatWidget() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      // Блокируем скролл только на мобильных
      if (window.innerWidth < 640) {
        document.body.style.overflow = 'hidden';
      }
      if (messages.length === 0) {
        loadHistory();
      }
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const loadHistory = async () => {
    try {
      const response = await fetch(`${API_URL}/request`, { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const history: Message[] = [];
          data.forEach((item: { prompt: string; response: string }) => {
            history.push({ role: 'user', content: item.prompt });
            history.push({ role: 'assistant', content: item.response });
          });
          setMessages(history);
        }
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { role: 'assistant', content: data.answer }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: t.chat.error }]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: t.chat.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-widget z-50">
      {/* Кнопка открытия (Кругляш) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'chat-toggle-btn',
          'fixed bottom-6 right-6 z-[60] flex items-center justify-center',
          'w-14 h-14 rounded-full',
          'shadow-lg hover:scale-105 transition-all cursor-pointer',
          isOpen && 'rotate-90',
          // Скрываем кругляш на мобиле когда открыт чат, показываем на десктопе всегда
          isOpen ? 'hidden sm:flex' : 'flex'
        )}
        aria-label={isOpen ? t.chat.close : t.chat.open}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Окно чата */}
      {isOpen && (
        <div
          className={cn(
            'fixed z-[55] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-300',
            // --- МОБИЛЬНАЯ ВЕРСИЯ (по умолчанию) ---
            'inset-0 w-full h-[100dvh] rounded-none',

            // --- ДЕСКТОП ВЕРСИЯ (sm и выше) ---
            // ВАЖНО: sm:inset-auto сбрасывает inset-0, чтобы окно не растягивалось
            'sm:inset-auto sm:bottom-24 sm:right-6',
            'sm:w-[350px] sm:h-[500px] sm:max-h-[80vh] sm:rounded-2xl'
          )}
          style={{
            backgroundColor: 'var(--chat-bg)',
            borderColor: 'var(--chat-border)',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
        >
          {/* Шапка */}
          <div
            className="p-4 border-b flex justify-between items-center shrink-0"
            style={{ backgroundColor: 'var(--chat-header-bg)', borderColor: 'var(--chat-border)' }}
          >
            <div>
              <h3 className="font-semibold text-lg" style={{ color: 'var(--chat-header-title)' }}>
                {t.chat.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--chat-header-subtitle)' }}>
                {t.chat.subtitle}
              </p>
            </div>
            {/* Кнопка свернуть (только для мобильных) */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-black/5 transition-colors sm:hidden"
            >
              <Minus className="w-6 h-6" style={{ color: 'var(--chat-header-title)' }} />
            </button>
          </div>

          {/* Сообщения */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-sm py-8" style={{ color: 'var(--chat-header-subtitle)' }}>
                {t.chat.placeholder}
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'max-w-[85%] p-3 rounded-2xl text-sm break-words',
                  message.role === 'user' ? 'ml-auto rounded-br-md' : 'mr-auto rounded-bl-md'
                )}
                style={{
                  backgroundColor: message.role === 'user' ? 'var(--chat-user-bg)' : 'var(--chat-assistant-bg)',
                  color: message.role === 'user' ? 'var(--chat-user-text)' : 'var(--chat-assistant-text)',
                }}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div
                className="mr-auto p-3 rounded-2xl rounded-bl-md"
                style={{ backgroundColor: 'var(--chat-assistant-bg)', color: 'var(--chat-assistant-text)' }}
              >
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Ввод текста */}
          <div className="p-4 border-t safe-area-bottom shrink-0" style={{ borderColor: 'var(--chat-border)' }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.chat.inputPlaceholder}
                className="flex-1 px-4 py-2 rounded-xl border-0 outline-none focus:ring-2 focus:ring-blue-500/50 text-base"
                style={{ backgroundColor: 'var(--chat-input-bg)', color: 'var(--chat-input-text)' }}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="chat-send-btn w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl disabled:opacity-50 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}