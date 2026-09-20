'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Bot, CornerDownLeft } from 'lucide-react';
import { useTranslation } from '@/data/i18n';
import { SKILLS } from '@/data/skillsData';
import { useMission } from './MissionContext';

type Entry = { kind: 'cmd' | 'out' | 'err' | 'ai'; text: string };
type Mode = 'cmd' | 'ai';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';
const PROMPT = '$';

/** Terminal in the hero: typed commands, clickable command chips and an AI mode. */
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
  const boxRef = useRef<HTMLDivElement>(null);

  const commands = t.mc.terminal.commands;

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

  const helpText = () => commands.map((c) => `${c.cmd.padEnd(11)} ${c.desc}`).join('\n');

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

    const line: Entry = { kind: 'cmd', text: `${PROMPT} ${cmd}` };
    switch (c) {
      case 'help':
      case '?':
        push(line, { kind: 'out', text: helpText() });
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

  const chips: { label: string; cmd: string }[] =
    mode === 'ai'
      ? [...t.mc.terminal.aiSuggestions.map((q) => ({ label: q, cmd: q })), { label: 'exit', cmd: 'exit' }]
      : commands.filter((c) => c.cmd !== 'help' && c.cmd !== 'clear').map((c) => ({ label: c.cmd, cmd: c.cmd }));

  const ai = mode === 'ai';

  return (
    <div
      className='glass flex flex-col overflow-hidden rounded-2xl font-[family-name:var(--font-jetbrains)] text-[13px] leading-relaxed'
      onClick={() => inputRef.current?.focus()}
      data-hover
    >
      <div className='flex items-center gap-2 border-b border-line px-4 py-2.5'>
        <span className='h-2.5 w-2.5 rounded-full bg-bug/80' />
        <span className='h-2.5 w-2.5 rounded-full bg-run/80' />
        <span className='h-2.5 w-2.5 rounded-full bg-pass/80' />
        <span className='ml-3 text-fg-muted'>{t.mc.terminal.title}</span>
        {ai && (
          <span className='ml-2 inline-flex items-center gap-1 rounded-full bg-brand/15 px-2 py-0.5 text-[11px] text-brand'>
            <Bot className='h-3 w-3' /> ai
          </span>
        )}
        <span className='ml-auto hidden text-fg-faint sm:inline'>{t.mc.terminal.hint}</span>
      </div>

      <div ref={boxRef} className='mc-scroll h-44 overflow-y-auto px-4 py-3 sm:h-52 2xl:h-[clamp(20rem,38vh,32rem)]'>
        {history.length === 0 && (
          <div className='text-fg-muted'>
            <p className='mb-2 text-fg'>{t.mc.terminal.welcome}</p>
            <ul className='grid gap-0.5'>
              {commands.map((c) => (
                <li key={c.cmd}>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      run(c.cmd);
                    }}
                    className='group inline-flex gap-3 text-left hover:text-fg'
                  >
                    <span className='w-24 shrink-0 text-brand group-hover:underline'>{c.cmd}</span>
                    <span>{c.desc}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {history.map((h, i) => (
          <p
            key={i}
            className={
              h.kind === 'cmd' ? 'text-fg' : h.kind === 'err' ? 'text-bug' : h.kind === 'ai' ? 'text-brand' : 'text-fg-muted'
            }
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {h.text}
          </p>
        ))}
        {busy && <p className='text-fg-faint'>{t.terminal.aiThinking}</p>}
      </div>

      <div className='border-t border-line px-4 py-2.5'>
        <div className='flex items-center gap-2'>
          <span className='text-brand'>{ai ? t.mc.terminal.aiPrompt : PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            className='min-w-0 flex-1 bg-transparent text-fg outline-none placeholder:text-fg-faint'
            placeholder={ai ? t.mc.terminal.aiPlaceholder : t.mc.terminal.placeholder}
            aria-label='terminal'
            autoComplete='off'
            spellCheck={false}
          />
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              run(input);
            }}
            className='grid h-7 w-7 place-items-center rounded-md border border-line text-fg-muted transition-colors hover:border-brand hover:text-brand'
            aria-label={t.mc.terminal.runLabel}
            title={t.mc.terminal.runLabel}
          >
            <CornerDownLeft className='h-3.5 w-3.5' />
          </button>
        </div>
        <div className='mt-2 flex flex-wrap gap-1.5'>
          {chips.map((c) => (
            <button
              key={c.cmd}
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                run(c.cmd);
              }}
              className={`rounded-full border px-2.5 py-0.5 text-[11px] transition-colors ${
                (c.cmd === 'bug-hunt' && hunter.active) ? 'border-bug/60 text-bug' : 'border-line text-fg-muted hover:border-brand hover:text-brand'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
