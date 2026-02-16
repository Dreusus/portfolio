'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Minus, Bot, User } from 'lucide-react';
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

  useEffect(() => {
    const isMobile = window.innerWidth < 640;

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
    <div className="z-50">
      {showButton && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'fixed bottom-6 right-4 sm:bottom-6 sm:right-6 z-[60] flex items-center justify-center',
            'w-12 h-12 rounded-full bg-icon-accent text-white shadow-lg',
            'hover:bg-icon-accent-dark transition-colors',
            isOpen && 'hidden sm:flex'
          )}
          aria-label={isOpen ? t.chat.close : t.chat.open}
        >
          {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        </button>
      )}

      {isOpen && (
        <div
          className={cn(
            'fixed z-[55] flex flex-col bg-white shadow-xl',
            'inset-0 w-full h-full',
            'sm:inset-auto sm:bottom-20 sm:right-6 sm:w-[380px] sm:h-[520px] sm:rounded-xl sm:border sm:border-foreground/10'
          )}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-foreground/5 bg-gradient-to-r from-primary/50 to-secondary/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-icon-accent flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t.chat.title}</h3>
                <p className="text-xs text-foreground/50">{t.chat.subtitle}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-foreground/5 transition-colors sm:hidden"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-sm text-foreground/50 py-8">
                {t.chat.placeholder}
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex gap-2 items-start',
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                )}
              >
                {/* Аватар */}
                <div
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0',
                    message.role === 'user'
                      ? 'bg-accent-yellow/20'
                      : 'bg-icon-accent/10'
                  )}
                >
                  {message.role === 'user' ? (
                    <User className="w-3.5 h-3.5 text-accent-orange" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 text-icon-accent" />
                  )}
                </div>

                {/* Сообщение */}
                <div
                  className={cn(
                    'max-w-[75%] w-fit p-3 rounded-xl text-sm',
                    message.role === 'user'
                      ? 'bg-accent-yellow/20 text-foreground rounded-tr-sm'
                      : 'bg-icon-accent/10 text-foreground rounded-tl-sm'
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 items-start">
                <div className='w-7 h-7 rounded-full bg-icon-accent/10 flex items-center justify-center flex-shrink-0'>
                  <Bot className="w-3.5 h-3.5 text-icon-accent" />
                </div>
                <div className="p-3 rounded-xl bg-icon-accent/10 rounded-tl-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-icon-accent" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-foreground/5">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.chat.inputPlaceholder}
                className="flex-1 px-4 py-2.5 rounded-lg border border-foreground/10 text-sm focus:outline-none focus:border-icon-accent transition-colors"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-icon-accent text-white disabled:opacity-50 transition-opacity"
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
