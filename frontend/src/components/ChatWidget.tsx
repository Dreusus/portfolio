'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Minus } from 'lucide-react';
import { cn } from '@/utils/utils';
import { useTranslation } from '@/data/i18n';

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
  const [showButton, setShowButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Показываем кнопку после скролла вниз (только на мобилке)
  useEffect(() => {
    const isMobile = window.innerWidth < 640;

    // На десктопе показываем сразу
    if (!isMobile) {
      setShowButton(true);
      return;
    }

    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const loadHistory = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/chat/history`, { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          const history: Message[] = [];
          data.items.forEach((item: { prompt: string; response: string }) => {
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
      const response = await fetch(`${API_URL}/api/v1/chat`, {
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
      {(showButton || isOpen) && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-[60] flex items-center justify-center',
            'w-14 h-14 rounded-full',
            'bg-primary text-primary-foreground',
            'shadow-lg hover:bg-primary/90 hover:scale-105 transition-all cursor-pointer',
            isOpen && 'rotate-90',
            isOpen ? 'hidden sm:flex' : 'flex'
          )}
          aria-label={isOpen ? t.chat.close : t.chat.open}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      )}

      {/* Окно чата */}
      {isOpen && (
        <div
          className={cn(
            'fixed z-[55] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-300',
            'inset-0 w-full h-[100dvh] rounded-none',
            'sm:inset-auto sm:bottom-24 sm:right-6',
            'sm:w-[350px] sm:h-[500px] sm:max-h-[80vh] sm:rounded-2xl',
            'bg-background border border-border'
          )}
        >
          {/* Шапка */}
          <div className="p-4 border-b border-border flex justify-between items-center shrink-0 bg-muted">
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                {t.chat.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.chat.subtitle}
              </p>
            </div>
            {/* Кнопка свернуть (только для мобильных) */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-accent transition-colors sm:hidden"
              aria-label={t.chat.close}
            >
              <Minus className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* Сообщения */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" role="log" aria-live="polite">
            {messages.length === 0 && (
              <div className="text-center text-sm py-8 text-muted-foreground">
                {t.chat.placeholder}
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'max-w-[75%] w-fit p-3 rounded-2xl text-sm break-words overflow-hidden',
                  message.role === 'user'
                    ? 'ml-auto rounded-br-md bg-primary text-primary-foreground'
                    : 'mr-auto rounded-bl-md bg-muted text-foreground'
                )}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="mr-auto p-3 rounded-2xl rounded-bl-md bg-muted text-foreground">
                <Loader2 className="w-5 h-5 animate-spin" aria-label="Loading" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Ввод текста */}
          <div className="p-4 border-t border-border shrink-0 safe-area-bottom">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.chat.inputPlaceholder}
                className="flex-1 px-4 py-2 rounded-xl border-0 outline-none focus:ring-2 focus:ring-icon-accent/50 text-base bg-muted text-foreground placeholder:text-muted-foreground transition-shadow"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl disabled:opacity-50 transition-all bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                aria-label="Send message"
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
