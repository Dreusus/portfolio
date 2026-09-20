'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/data/i18n';
import { SKILLS } from '@/data/skillsData';
import { useMission } from './MissionContext';

type Entry = { kind: 'cmd' | 'out' | 'err' | 'ai'; text: string };
type Mode = 'cmd' | 'ai';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

/** Compact terminal that lives inside the hero. Commands + AI mode. */
export const Terminal: React.FC = () => {
  const { t } = useTranslation();
  const { hunter, terminalFocusTick } = useMission();
  const [mode, setMode] = useState<Mode>('cmd');
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState<Entry[]>([]);
  const [stack, setStack] = useState<string[]>([]);
  const [stackIdx, setStackIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // scroll only the terminal box, never the page
    const box = boxRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [history, busy]);

  useEffect(() => {
    if (terminalFocusTick > 0) inputRef.current?.focus();
  }, [terminalFocusTick]);

  // Bug hunter completion feedback
  useEffect(() => {
    if (hunter.complete) push({ kind: 'out', text: t.mc.terminal.allCaught });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hunter.complete]);

  const push = (...entries: Entry[]) => setHistory((h) => [...h, ...entries].slice(-80));

  const askAi = async (q: string) => {
    push({ kind: 'cmd', text: `${t.mc.terminal.aiPrompt} ${q}` });
    setBusy(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ prompt: q }),
      });
      if (res.ok) {
        const data = await res.json();
        push({ kind: 'ai', text: String(data.answer ?? '') });
      } else push({ kind: 'err', text: t.terminal.aiError });
    } catch {
      push({ kind: 'err', text: t.terminal.aiError });
    } finally {
      setBusy(false);
    }
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd || busy) return;
    setInput('');
    setStack((s) => [cmd, ...s].slice(0, 50));
    setStackIdx(-1);
    const c = cmd.toLowerCase();

    if (mode === 'ai') {
      if (c === 'exit' || c === 'quit') {
        setMode('cmd');
        push({ kind: 'cmd', text: `${t.mc.terminal.aiPrompt} ${cmd}` }, { kind: 'out', text: t.terminal.aiExit });
        return;
      }
      if (c === 'clear') return setHistory([]);
      void askAi(cmd);
      return;
    }

    const line: Entry = { kind: 'cmd', text: `${t.mc.terminal.title}:~$ ${cmd}` };
    switch (c) {
      case 'help':
        push(line, { kind: 'out', text: t.mc.terminal.help });
        break;
      case 'whoami':
        push(line, { kind: 'out', text: t.mc.terminal.whoami });
        break;
      case 'skills':
        push(line, { kind: 'out', text: SKILLS.map((s) => s.name).join(' · ') });
        break;
      case 'experience':
        push(line, { kind: 'out', text: t.mc.terminal.experienceLines.join('\n') });
        break;
      case 'contact':
        push(line, { kind: 'out', text: 'github.com/Dreusus · linkedin.com/in/dreusus · t.me/dreusus' });
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'ai':
        setMode('ai');
        push(line, { kind: 'out', text: t.terminal.aiActivated });
        break;
      case 'sudo bug-hunt':
      case 'bug-hunt':
        hunter.toggle();
        push(line, { kind: 'out', text: hunter.active ? t.mc.terminal.bugStop : t.mc.terminal.bugStart });
        break;
      case 'clear':
        setHistory([]);
        break;
      default:
        push(line, { kind: 'err', text: `${t.mc.terminal.notFound}: ${cmd}` });
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') return run(input);
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!stack.length) return;
      const next = Math.min(stackIdx + 1, stack.length - 1);
      setStackIdx(next);
      setInput(stack[next]);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = stackIdx - 1;
      setStackIdx(next);
      setInput(next < 0 ? '' : stack[next]);
    }
  };

  const prompt = mode === 'ai' ? t.mc.terminal.aiPrompt : `${t.mc.terminal.title}:~$`;

  return (
    <div
      className='glass rounded-2xl overflow-hidden font-[family-name:var(--font-jetbrains)] text-[13px] leading-relaxed'
      onClick={() => inputRef.current?.focus()}
      data-hover
    >
      <div className='flex items-center gap-2 border-b border-line px-4 py-2.5'>
        <span className='h-2.5 w-2.5 rounded-full bg-bug/80' />
        <span className='h-2.5 w-2.5 rounded-full bg-run/80' />
        <span className='h-2.5 w-2.5 rounded-full bg-pass/80' />
        <span className='ml-3 text-fg-muted'>{t.mc.terminal.title} — {mode === 'ai' ? 'ai' : 'zsh'}</span>
        <span className='ml-auto hidden text-fg-faint sm:inline'>{t.mc.terminal.hint}</span>
      </div>
      <div ref={boxRef} className='mc-scroll h-44 overflow-y-auto px-4 py-3 sm:h-52'>
        {history.length === 0 && (
          <p className='text-fg-faint'>
            <span className='text-pass'>{t.mc.terminal.title}:~$</span> help
            <br />
            <span className='text-fg-muted'>{t.mc.terminal.help}</span>
          </p>
        )}
        {history.map((h, i) => (
          <p
            key={i}
            className={
              h.kind === 'cmd'
                ? 'text-fg'
                : h.kind === 'err'
                  ? 'text-bug'
                  : h.kind === 'ai'
                    ? 'text-pass'
                    : 'text-fg-muted'
            }
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {h.text}
          </p>
        ))}
        {busy && <p className='text-fg-faint'>{t.terminal.aiThinking}</p>}
        <div className='flex items-center gap-2'>
          <span className={mode === 'ai' ? 'text-pass' : 'text-pass'}>{prompt}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            className='min-w-0 flex-1 bg-transparent text-fg outline-none placeholder:text-fg-faint'
            placeholder={t.mc.terminal.placeholder}
            aria-label='terminal'
            autoComplete='off'
            spellCheck={false}
          />
          <span className='caret h-4 w-2 bg-pass' aria-hidden />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
};
