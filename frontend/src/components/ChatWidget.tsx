'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Minus, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '@/utils/utils';
import { useTranslation } from '@/data/i18n';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="chat-widget z-50">
      {/* Floating Button */}
      <AnimatePresence>
        {(showButton || isOpen) && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'fixed bottom-6 right-4 sm:bottom-6 sm:right-6 z-[60] flex items-center justify-center',
              'w-14 h-14 rounded-2xl',
              'bg-gradient-to-br from-icon-accent to-secondary text-white',
              'shadow-xl shadow-icon-accent/30 hover:shadow-2xl hover:shadow-icon-accent/40',
              'transition-all duration-300 cursor-pointer',
              isOpen ? 'hidden sm:flex' : 'flex'
            )}
            aria-label={isOpen ? t.chat.close : t.chat.open}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <MessageCircle className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pulse effect */}
            {!isOpen && (
              <span className="absolute inset-0 rounded-2xl bg-icon-accent animate-ping opacity-30" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: 'spring', bounce: 0.2 }}
            className={cn(
              'fixed z-[55] flex flex-col overflow-hidden shadow-2xl',
              'inset-0 w-full h-[100dvh] rounded-none',
              'sm:inset-auto sm:bottom-24 sm:right-6',
              'sm:w-[380px] sm:h-[550px] sm:max-h-[85vh] sm:rounded-3xl',
              'border border-white/20'
            )}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,246,0.98) 100%)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Header */}
            <div
              className="p-4 border-b border-black/5 flex justify-between items-center shrink-0"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-2 rounded-xl bg-gradient-to-br from-icon-accent to-secondary"
                >
                  <Bot className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-base text-foreground">
                    {t.chat.title}
                  </h3>
                  <p className="text-xs text-foreground/50 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    {t.chat.subtitle}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-black/5 transition-colors sm:hidden"
              >
                <Minus className="w-5 h-5 text-foreground/50" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-black/[0.02]">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-4 text-center"
                >
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-icon-accent/10 to-secondary/10">
                    <Sparkles className="w-8 h-8 text-icon-accent" />
                  </div>
                  <div>
                    <p className="text-foreground/50 text-sm">{t.chat.placeholder}</p>
                    <p className="text-foreground/30 text-xs mt-1">Powered by AI</p>
                  </div>
                </motion.div>
              )}
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    'flex gap-2',
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  )}
                >
                  <div className={cn(
                    'p-1.5 rounded-lg shrink-0',
                    message.role === 'user' ? 'bg-icon-accent/10' : 'bg-secondary/30'
                  )}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-icon-accent" />
                    ) : (
                      <Bot className="w-4 h-4 text-foreground/50" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'max-w-[75%] w-fit p-3.5 rounded-2xl text-sm break-words',
                      message.role === 'user'
                        ? 'rounded-tr-md bg-gradient-to-br from-icon-accent to-secondary text-white shadow-lg shadow-icon-accent/20'
                        : 'rounded-tl-md bg-white border border-black/5 shadow-sm text-foreground'
                    )}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="p-1.5 rounded-lg bg-secondary/30">
                    <Bot className="w-4 h-4 text-foreground/50" />
                  </div>
                  <div className="p-3.5 rounded-2xl rounded-tl-md bg-white border border-black/5 shadow-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-icon-accent" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-black/5 bg-white/50 backdrop-blur-sm shrink-0">
              <div className="flex gap-2">
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t.chat.inputPlaceholder}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-black/5 bg-white outline-none focus:border-icon-accent/30 transition-all text-sm"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-icon-accent to-secondary text-white shadow-lg shadow-icon-accent/20 disabled:opacity-50 disabled:shadow-none transition-all"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
