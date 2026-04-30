'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/data/i18n';
import { TerminalPalette } from './palette';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

interface AiMiniChatProps {
  palette: TerminalPalette;
  onContinue: (initialQuestion?: string) => void;
}

interface MiniMsg {
  role: 'user' | 'ai';
  text: string;
}

export const AiMiniChat: React.FC<AiMiniChatProps> = ({ palette, onContinue }) => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<MiniMsg[]>([]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' });
  }, [messages, loading]);

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || loading) return;
    setInput('');
    setMessages((p) => [...p, { role: 'user', text: q }]);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ prompt: q }),
      });
      if (res.ok) {
        const data = await res.json();
        setMessages((p) => [...p, { role: 'ai', text: data.answer }]);
      } else {
        setMessages((p) => [...p, { role: 'ai', text: t.terminal.aiError }]);
      }
    } catch {
      setMessages((p) => [...p, { role: 'ai', text: t.terminal.aiError }]);
    } finally {
      setLoading(false);
    }
  };

  const lastTwo = messages.slice(-2);

  return (
    <div className='term-card' style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <div style={{ color: palette.dim, fontSize: 11, marginBottom: 4 }}>
          {t.askAi.title}
        </div>
        <div style={{ color: palette.text, fontSize: 13 }}>{t.askAi.sub}</div>
      </div>

      {/* Quick chips */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {t.askAi.chips.map((chip) => (
          <button
            key={chip}
            type='button'
            onClick={() => ask(chip)}
            disabled={loading}
            style={{
              fontSize: 11,
              padding: '4px 10px',
              background: 'transparent',
              border: `1px solid ${palette.line}`,
              color: palette.dim,
              cursor: loading ? 'default' : 'pointer',
              fontFamily: 'inherit',
              borderRadius: 4,
              whiteSpace: 'nowrap',
              opacity: loading ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.borderColor = palette.accent;
            }}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = palette.line)}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Last messages */}
      <div
        style={{
          flex: 1,
          minHeight: 80,
          maxHeight: 180,
          overflowY: 'auto',
          fontSize: 13,
          lineHeight: 1.6,
          padding: 8,
          background: palette.bg,
          border: `1px solid ${palette.line}`,
          borderRadius: 4,
        }}
      >
        {lastTwo.length === 0 && !loading && (
          <div style={{ color: palette.dim, fontStyle: 'italic' }}>
            {/* hint when empty */}
            ↑ {t.askAi.placeholder.toLowerCase()}
          </div>
        )}
        {lastTwo.map((m, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <span
              style={{
                color: m.role === 'user' ? palette.accent : palette.accent2,
                marginRight: 6,
              }}
            >
              {m.role === 'user' ? '>' : '🤖'}
            </span>
            <span style={{ color: m.role === 'user' ? palette.text : palette.dim }}>
              {m.text}
            </span>
          </div>
        ))}
        {loading && (
          <div style={{ color: palette.dim }}>
            🤖 <span className='term-dots-spin'>{t.terminal.aiThinking}<span>.</span><span>.</span><span>.</span></span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 8px',
          border: `1px solid ${palette.line}`,
          borderRadius: 4,
        }}
      >
        <span style={{ color: palette.accent, fontSize: 13 }}>{'>'}</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input.trim() && !loading) ask(input);
          }}
          placeholder={t.askAi.placeholder}
          disabled={loading}
          autoCapitalize='off'
          autoCorrect='off'
          spellCheck={false}
          style={{
            flex: 1,
            background: 'transparent',
            border: 0,
            outline: 0,
            color: palette.text,
            fontFamily: 'inherit',
            fontSize: 13,
            caretColor: palette.accent,
          }}
        />
      </div>

      {/* Continue */}
      <button
        type='button'
        onClick={() => onContinue(messages.length > 0 ? undefined : undefined)}
        style={{
          background: 'transparent',
          border: 0,
          color: palette.accent2,
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: 12,
          padding: 0,
          textAlign: 'left',
          alignSelf: 'flex-start',
        }}
      >
        {t.askAi.continue}
      </button>
    </div>
  );
};
