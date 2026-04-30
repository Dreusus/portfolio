'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from '@/data/i18n';
import { useBugHunter, useIsMobile, useReveal } from '@/hooks';
import { SKILLS } from '@/data/skillsData';
import { Bug } from './Bug';
import { BugHunterPill } from './BugHunterPill';
import { AiMiniChat } from './AiMiniChat';
import { getPalette } from './palette';

type Theme = 'dark' | 'light';
type CmdEntry = { type: 'out' | 'res' | 'err'; text: string };
type WindowState = 'fullscreen' | 'minimized' | 'closed';
type ContactState = 'normal' | 'fullscreen';
type Mode = 'cmd' | 'ai';

interface TerminalShellProps {
  theme?: Theme;
}

const TABS = [
  { id: 'about.md', icon: '📄', section: 'section-about' },
  { id: 'projects.json', icon: '{ }', section: 'section-projects' },
  { id: 'skills.yaml', icon: '─', section: 'section-skills' },
  { id: 'experience.log', icon: '📋', section: 'section-experience' },
  { id: 'contact.sh', icon: '$', section: 'section-contact' },
];

const SECTION_TO_TAB: Record<string, string> = TABS.reduce(
  (acc, tab) => ({ ...acc, [tab.section]: tab.id }),
  {},
);

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

// Mac traffic-light colours (always lit — no greyscale)
const MAC_RED = '#ff5f57';
const MAC_YELLOW = '#febc2e';
const MAC_GREEN = '#28c840';

export const TerminalShell: React.FC<TerminalShellProps> = ({ theme = 'dark' }) => {
  const { t, language, setLanguage } = useTranslation();
  const hunter = useBugHunter();
  const [activeTab, setActiveTab] = useState('about.md');
  const [cmdInput, setCmdInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<CmdEntry[]>([
    { type: 'out', text: 'andrey@portfolio:~$ whoami' },
    { type: 'res', text: 'Andrey Polyakov — Full Stack QA Engineer' },
    { type: 'out', text: 'andrey@portfolio:~$ cat README.md' },
  ]);
  const [windowState, setWindowState] = useState<WindowState>('fullscreen');
  const [contactState, setContactState] = useState<ContactState>('normal');
  const [mode, setMode] = useState<Mode>('cmd');
  const [aiLoading, setAiLoading] = useState(false);
  const [cmdStack, setCmdStack] = useState<string[]>([]);
  const [stackIdx, setStackIdx] = useState(-1);
  const [tabsMenuOpen, setTabsMenuOpen] = useState(false);

  const isMobile = useIsMobile(720);
  const palette = getPalette(theme);
  const dark = theme === 'dark';
  useReveal();

  const fullName = `${t.name.first} ${t.name.last}`;
  const skills = useMemo(() => SKILLS.slice(0, 12), []);
  const whyEntries = useMemo(() => Object.values(t.whyChooseMe.features), [t]);

  const cmdEndRef = useRef<HTMLDivElement | null>(null);
  const cmdInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    cmdEndRef.current?.scrollIntoView({ block: 'nearest' });
  }, [cmdHistory]);

  // Track which section is in view → highlight tab
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    if (windowState === 'minimized' || windowState === 'closed') return;
    const ids = TABS.map((tab) => tab.section);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const tabId = SECTION_TO_TAB[visible.target.id];
          if (tabId) setActiveTab(tabId);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-120px 0px -40% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [windowState]);

  const scrollToSection = useCallback((tabId: string) => {
    setActiveTab(tabId);
    const tab = TABS.find((tb) => tb.id === tabId);
    if (!tab) return;
    const el = document.getElementById(tab.section);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // ---- Main IDE window controls ----
  // 🟢 — mock (always fullscreen, нет normal-режима)
  // 🟡 — minimize → desktop+taskbar
  // 🔴 — close → splash welcome
  const handleClose = () => setWindowState('closed');
  const handleMinimize = () => setWindowState('minimized');
  const handleFullscreenMock = () => {
    /* no-op — desktop окно всегда на весь экран */
  };
  const restoreWindow = () => setWindowState('fullscreen');

  // ---- Contact panel controls ----
  const handleContactClose = () => {
    if (contactState === 'fullscreen') setContactState('normal');
  };
  const handleContactNoop = () => {
    /* yellow — decorative */
  };
  const handleContactFullscreen = () =>
    setContactState((s) => (s === 'fullscreen' ? 'normal' : 'fullscreen'));

  const askAi = async (question: string) => {
    const thinkingTag = `__thinking_${Date.now()}__`;
    setCmdHistory((prev) => [
      ...prev,
      { type: 'out', text: `ai> ${question}` },
      { type: 'res', text: thinkingTag },
    ]);
    setAiLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ prompt: question }),
      });
      if (response.ok) {
        const data = await response.json();
        setCmdHistory((prev) =>
          prev.map((h) =>
            h.text === thinkingTag ? { type: 'res', text: `🤖 ${data.answer}` } : h,
          ),
        );
      } else {
        setCmdHistory((prev) =>
          prev.map((h) =>
            h.text === thinkingTag ? { type: 'err', text: t.terminal.aiError } : h,
          ),
        );
      }
    } catch {
      setCmdHistory((prev) =>
        prev.map((h) =>
          h.text === thinkingTag ? { type: 'err', text: t.terminal.aiError } : h,
        ),
      );
    } finally {
      setAiLoading(false);
    }
  };

  const runCmd = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    setCmdInput('');
    setCmdStack((prev) => [trimmed, ...prev].slice(0, 50));
    setStackIdx(-1);

    if (mode === 'ai') {
      const c = trimmed.toLowerCase();
      if (c === 'exit' || c === 'quit') {
        setMode('cmd');
        setCmdHistory((p) => [
          ...p,
          { type: 'out', text: `ai> ${trimmed}` },
          { type: 'res', text: t.terminal.aiExit },
        ]);
        return;
      }
      if (c === 'clear') {
        setCmdHistory([]);
        return;
      }
      void askAi(trimmed);
      return;
    }

    const out: CmdEntry[] = [
      ...cmdHistory,
      { type: 'out', text: `andrey@portfolio:~$ ${trimmed}` },
    ];
    const c = trimmed.toLowerCase();
    if (c === 'help')
      out.push({
        type: 'res',
        text: 'Available: whoami, skills, projects, contact, ai, clear, sudo bug-hunt',
      });
    else if (c === 'whoami') out.push({ type: 'res', text: `${t.hero.title} · ${t.location}` });
    else if (c === 'skills')
      out.push({ type: 'res', text: skills.map((s) => s.name).join(', ') });
    else if (c === 'projects')
      out.push({
        type: 'res',
        text: t.projects.items.map((p) => '• ' + p.title).join('\n'),
      });
    else if (c === 'contact')
      out.push({ type: 'res', text: 'github.com/Dreusus · linkedin.com/in/dreusus' });
    else if (c === 'clear') {
      setCmdHistory([]);
      return;
    } else if (c === 'ai' || c === 'ai-question') {
      setMode('ai');
      out.push({ type: 'res', text: t.terminal.aiActivated });
    } else if (c === 'sudo bug-hunt') {
      hunter.toggle();
      out.push({ type: 'res', text: '🪲 Bug Hunter mode activated. Find 5 bugs.' });
    } else out.push({ type: 'err', text: `command not found: ${trimmed}` });

    setCmdHistory(out);
  };

  // -------- CLOSED — VS Code splash (overlay over IDE) --------
  const splashOverlay = windowState === 'closed' ? (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 80,
          background: palette.bg,
          color: palette.text,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
        }}
      >
        <div style={{ maxWidth: 640, width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>📁</div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 600,
              margin: '0 0 8px',
              color: palette.text,
            }}
          >
            Welcome to <span style={{ color: palette.accent }}>andrey-polyakov</span>
          </h1>
          <p style={{ color: palette.dim, fontSize: 14, marginBottom: 32 }}>
            VS Code — editing evolved
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
              marginBottom: 32,
              textAlign: 'left',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: palette.dim,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  marginBottom: 12,
                }}
              >
                Recent
              </div>
              <button
                type='button'
                onClick={restoreWindow}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: 'transparent',
                  border: 0,
                  color: palette.accent2,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 13,
                  padding: '6px 0',
                }}
              >
                andrey-polyakov{' '}
                <span style={{ color: palette.dim, fontSize: 11 }}>~/portfolio</span>
              </button>
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: palette.dim,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  marginBottom: 12,
                }}
              >
                Get started
              </div>
              <div style={{ color: palette.dim, fontSize: 13 }}>
                Re-open the project to continue browsing.
              </div>
            </div>
          </div>

          <button
            type='button'
            onClick={restoreWindow}
            style={{
              background: palette.accent,
              color: '#000',
              border: 0,
              padding: '12px 28px',
              fontFamily: 'inherit',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              borderRadius: 4,
            }}
          >
            ↗ Re-open project
          </button>
        </div>
      </div>
    ) : null;

  // -------- MINIMIZED — Desktop + taskbar (overlay) --------
  const minimizedOverlay = windowState === 'minimized' ? (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 80,
          overflowY: 'auto',
          background: dark
            ? 'radial-gradient(ellipse at top, #1a2238 0%, #0d1117 60%, #050810 100%)'
            : 'radial-gradient(ellipse at top, #cfe1ff 0%, #e9eef5 60%, #fafbfc 100%)',
          color: palette.text,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          paddingBottom: 56,
        }}
      >
        {/* Desktop file icons */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, 96px)',
            gap: 24,
            padding: 32,
            justifyContent: 'flex-start',
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type='button'
              onClick={() => {
                setActiveTab(tab.id);
                restoreWindow();
                setTimeout(() => scrollToSection(tab.id), 100);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                background: 'transparent',
                border: 0,
                cursor: 'pointer',
                padding: 8,
                borderRadius: 6,
                color: palette.text,
                transition: 'background .15s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: palette.panel,
                  border: `1px solid ${palette.line}`,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              >
                {tab.icon}
              </div>
              <span style={{ fontSize: 11, color: palette.text, textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>
                {tab.id}
              </span>
            </button>
          ))}
        </div>

        {/* Taskbar */}
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: 48,
            background: 'rgba(15,15,17,0.85)',
            backdropFilter: 'blur(12px)',
            borderTop: `1px solid ${palette.line}`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: 12,
            zIndex: 100,
            color: '#fff',
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 12,
          }}
        >
          <span style={{ fontSize: 16 }}>📁</span>
          <span style={{ flex: 1 }}>
            andrey-polyakov — <span style={{ color: palette.accent2 }}>VS Code</span>
          </span>
          <button
            type='button'
            onClick={restoreWindow}
            aria-label='Restore window'
            style={{
              background: palette.accent,
              color: '#000',
              border: 0,
              padding: '6px 14px',
              fontFamily: 'inherit',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            ↗ Restore
          </button>
        </div>
      </div>
    ) : null;

  // -------- Fullscreen IDE (always) --------
  const outerStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    width: '100%',
    height: '100vh',
    margin: 0,
    background: palette.bg,
    color: palette.text,
    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
    fontSize: 14,
    lineHeight: 1.6,
    overflowY: 'auto',
    overflowX: 'hidden',
  };

  const sectionPadding = '0 32px 32px';

  return (
    <>
    <div style={outerStyle}>
      <style>{`
        .term-tab { padding: 8px 14px; background: transparent; border: 0; border-right: 1px solid ${palette.line}; color: ${palette.dim}; font-family: inherit; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: color .15s, background .15s; }
        .term-tab:hover { color: ${palette.text}; background: ${palette.bg}; }
        .term-tab.active { background: ${palette.bg}; color: ${palette.text}; border-bottom: 2px solid ${palette.accent}; }
        .term-mac { width: 13px; height: 13px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; transition: filter .15s, transform .1s; position: relative; box-shadow: inset 0 0 0 0.5px rgba(0,0,0,0.25); flex-shrink: 0; }
        .term-mac:hover { filter: brightness(1.15); }
        .term-mac:active { transform: scale(0.9); }
        .term-mac[data-decorative="true"] { cursor: default; }
        .term-mac[data-decorative="true"]:active { transform: none; }
        .term-mac::before { content: attr(data-glyph); font-size: 9px; font-weight: 700; color: rgba(0,0,0,0.6); position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity .15s; }
        .term-mac-group:hover .term-mac::before { opacity: 1; }
        .term-line { display: flex; }
        .term-ln { width: 48px; text-align: right; color: ${palette.dim}; opacity: 0.5; padding-right: 16px; user-select: none; flex-shrink: 0; }
        .term-tk-com { color: ${palette.dim}; font-style: italic; }
        .term-input { background: transparent; border: 0; outline: 0; color: inherit; font-family: inherit; font-size: inherit; flex: 1; }
        .term-card { border: 1px solid ${palette.line}; background: ${palette.panel}; padding: 16px; transition: border-color .2s; position: relative; }
        .term-card:hover { border-color: ${palette.accent}; }
        [data-reveal] { opacity: 0; transform: translateY(12px); transition: opacity .6s ease, transform .6s ease; }
        [data-reveal].is-revealed { opacity: 1; transform: none; }
        .term-blink { animation: term-blink 1s step-end infinite; }
        @keyframes term-blink { 50% { opacity: 0; } }
        .term-bar { height: 4px; background: ${palette.line}; position: relative; overflow: hidden; }
        .term-bar > span { position: absolute; inset: 0 auto 0 0; background: ${palette.accent}; }
        .term-dots-spin span { animation: term-dots 1.4s infinite ease-in-out; display: inline-block; }
        .term-dots-spin span:nth-child(2) { animation-delay: .2s; }
        .term-dots-spin span:nth-child(3) { animation-delay: .4s; }
        @keyframes term-dots { 0%, 80%, 100% { opacity: .25; } 40% { opacity: 1; } }
        @media (max-width: 720px) {
          .term-grid-2 { grid-template-columns: 1fr !important; }
          .term-grid-3 { grid-template-columns: 1fr !important; }
          .term-hero-h1 { font-size: 32px !important; }
        }
      `}</style>

      {/* Sticky header (title bar + tabs as one unit) */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: palette.panel,
          boxShadow: dark
            ? '0 6px 16px rgba(0,0,0,0.45)'
            : '0 4px 12px rgba(0,0,0,0.08)',
          display: contactState === 'fullscreen' ? 'none' : undefined,
        }}
      >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 16px',
          background: palette.panel,
          borderBottom: `1px solid ${palette.line}`,
        }}
      >
        <div className='term-mac-group' style={{ display: 'flex', gap: 8 }}>
          <button
            type='button'
            onClick={handleClose}
            aria-label='Close'
            title='Close'
            data-glyph='✕'
            className='term-mac'
            style={{ background: MAC_RED }}
          />
          <button
            type='button'
            onClick={handleMinimize}
            aria-label='Minimize'
            title='Minimize'
            data-glyph='—'
            className='term-mac'
            style={{ background: MAC_YELLOW }}
          />
          <button
            type='button'
            onClick={handleFullscreenMock}
            aria-label='Decorative'
            title=''
            data-glyph='⤢'
            data-decorative={true}
            className='term-mac'
            style={{ background: MAC_GREEN }}
          />
        </div>
        <div style={{ flex: 1, textAlign: 'center', color: palette.dim, fontSize: 12 }}>
          ~/portfolio — andrey@dev — zsh
        </div>
        <div style={{ display: 'flex', gap: 12, fontSize: 12, color: palette.dim }}>
          <button
            onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
            style={{
              background: 'transparent',
              border: `1px solid ${palette.line}`,
              color: palette.text,
              padding: '4px 10px',
              fontFamily: 'inherit',
              cursor: 'pointer',
              fontSize: 11,
            }}
          >
            {language.toUpperCase()}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: palette.panel,
          borderBottom: `1px solid ${palette.line}`,
          overflowX: 'auto',
        }}
      >
        {isMobile ? (
          <button
            type='button'
            onClick={() => setTabsMenuOpen(true)}
            aria-label='Open files menu'
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 14px',
              background: 'transparent',
              border: 0,
              borderRight: `1px solid ${palette.line}`,
              color: palette.text,
              fontFamily: 'inherit',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
              <path d='M3 6h18M3 12h18M3 18h18' />
            </svg>
            <span style={{ color: palette.warn, fontSize: 11 }}>
              {TABS.find((tb) => tb.id === activeTab)?.icon}
            </span>
            <span>{activeTab}</span>
          </button>
        ) : (
          TABS.map((tab) => (
            <button
              key={tab.id}
              className={`term-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => scrollToSection(tab.id)}
            >
              <span style={{ color: palette.warn, fontSize: 11 }}>{tab.icon}</span>
              <span>{tab.id}</span>
            </button>
          ))
        )}
        <div style={{ flex: 1, borderRight: `1px solid ${palette.line}` }} />
        <div
          style={{
            padding: '8px 14px',
            color: palette.dim,
            fontSize: 11,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: palette.accent }} />
          {!isMobile && t.available}
        </div>
      </div>
      </div>

      {tabsMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 70,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}
          onClick={() => setTabsMenuOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '85%',
              maxWidth: 320,
              height: '100%',
              background: palette.panel,
              borderRight: `1px solid ${palette.line}`,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderBottom: `1px solid ${palette.line}`,
                color: palette.dim,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              <span>EXPLORER</span>
              <button
                type='button'
                onClick={() => setTabsMenuOpen(false)}
                aria-label='Close files menu'
                style={{
                  background: 'transparent',
                  border: 0,
                  color: palette.text,
                  cursor: 'pointer',
                  fontSize: 18,
                  padding: 4,
                }}
              >
                ✕
              </button>
            </div>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type='button'
                onClick={() => {
                  scrollToSection(tab.id);
                  setTabsMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 16px',
                  background: activeTab === tab.id ? palette.bg : 'transparent',
                  border: 0,
                  borderLeft:
                    activeTab === tab.id
                      ? `3px solid ${palette.accent}`
                      : '3px solid transparent',
                  color: activeTab === tab.id ? palette.text : palette.dim,
                  fontFamily: 'inherit',
                  fontSize: 14,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ color: palette.warn, fontSize: 13 }}>{tab.icon}</span>
                <span>{tab.id}</span>
              </button>
            ))}
            <div
              style={{
                marginTop: 'auto',
                padding: '12px 16px',
                color: palette.dim,
                fontSize: 11,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: palette.accent,
                }}
              />
              {t.available}
            </div>
          </div>
        </div>
      )}

      {/* Hero / about */}
      <div
        id='section-about'
        style={{
          padding: '32px 32px 0',
          scrollMarginTop: 90,
          display: contactState === 'fullscreen' ? 'none' : undefined,
        }}
      >
        <div className='term-line'>
          <span className='term-ln'>1</span>
          <span className='term-tk-com'># {t.sections.about.toUpperCase()}.md</span>
        </div>
        <div className='term-line'>
          <span className='term-ln'>2</span>
          <span> </span>
        </div>
        <div className='term-line'>
          <span className='term-ln'>3</span>
          <h1
            className='term-hero-h1'
            style={{
              fontSize: 56,
              lineHeight: 1.05,
              fontWeight: 700,
              margin: 0,
              color: palette.text,
            }}
          >
            <span style={{ color: palette.accent }}>const</span>{' '}
            <span style={{ color: palette.accent2 }}>engineer</span>{' '}
            <span style={{ color: palette.dim }}>=</span>{' '}
            <span style={{ color: palette.warn }}>&quot;{fullName}&quot;</span>
            <span className='term-blink' style={{ color: palette.accent, fontWeight: 100 }}>
              |
            </span>
          </h1>
        </div>
        <div className='term-line' style={{ marginTop: 16 }}>
          <span className='term-ln'>4</span>
          <div>
            <span className='term-tk-com'>{'// '}</span>
            <span style={{ fontSize: 22, color: palette.text }}>{t.hero.title}</span>
            <span className='term-tk-com'> → </span>
            <span style={{ fontSize: 22, color: palette.accent }}>{t.tagline}</span>
            <Bug
              id='bug-1'
              hunter={hunter}
              color={palette.red}
              style={{
                position: 'relative',
                display: 'inline-block',
                marginLeft: 8,
              }}
            />
          </div>
        </div>
        <div className='term-line'>
          <span className='term-ln'>5</span>
          <span> </span>
        </div>
      </div>

      {/* About + Stats */}
      <div
        data-reveal
        className='term-grid-2'
        style={{
          padding: 32,
          display: contactState === 'fullscreen' ? 'none' : 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }}
      >
        <div className='term-card'>
          <div style={{ color: palette.dim, fontSize: 11, marginBottom: 8 }}>
            # {t.sections.about}
          </div>
          <p style={{ margin: 0, color: palette.text, fontSize: 15, lineHeight: 1.7 }}>
            {t.about.description}
          </p>
          <div
            style={{
              marginTop: 16,
              display: 'flex',
              gap: 16,
              fontSize: 12,
              color: palette.dim,
              position: 'relative',
              flexWrap: 'wrap',
            }}
          >
            <span>📍 {t.location}</span>
            <span style={{ color: palette.accent }}>● {t.available}</span>
            <Bug
              id='bug-2'
              hunter={hunter}
              color={palette.red}
              style={{ position: 'absolute', right: -8, top: -8 }}
            />
          </div>
        </div>
        <AiMiniChat
          palette={palette}
          onContinue={() => {
            setMode('ai');
            setContactState('normal');
            setActiveTab('contact.sh');
            setTimeout(() => {
              const el = document.getElementById('section-contact');
              el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              cmdInputRef.current?.focus();
            }, 50);
          }}
        />
      </div>

      {/* Projects */}
      <div
        id='section-projects'
        data-reveal
        style={{
          padding: sectionPadding,
          scrollMarginTop: 90,
          display: contactState === 'fullscreen' ? 'none' : undefined,
        }}
      >
        <div className='term-line'>
          <span className='term-ln'>~</span>
          <span className='term-tk-com'>{`// ${t.sections.projects.toLowerCase()}.json`}</span>
        </div>
        <div
          className='term-grid-2'
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            marginTop: 16,
          }}
        >
          {t.projects.items.map((p, i) => (
            <div key={p.id} className='term-card' style={{ position: 'relative' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 8,
                }}
              >
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: palette.text }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: 12, color: palette.dim }}>{p.tag}</div>
                </div>
                <span
                  style={{
                    fontSize: 10,
                    padding: '2px 8px',
                    border: `1px solid ${
                      p.status === 'Live' ? palette.accent : palette.warn
                    }`,
                    color: p.status === 'Live' ? palette.accent : palette.warn,
                    borderRadius: 2,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {p.status}
                </span>
              </div>
              <p
                style={{
                  margin: '8px 0 12px',
                  fontSize: 13,
                  color: palette.dim,
                  lineHeight: 1.6,
                }}
              >
                {p.desc}
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {p.stack.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: 11,
                      color: palette.accent2,
                      padding: '2px 6px',
                      background: dark ? 'rgba(88,166,255,0.1)' : 'rgba(3,102,214,0.06)',
                      borderRadius: 2,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              {i === 0 && (
                <Bug
                  id='bug-3'
                  hunter={hunter}
                  color={palette.red}
                  style={{ top: 8, right: 8 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div
        id='section-skills'
        data-reveal
        style={{
          padding: sectionPadding,
          position: 'relative',
          scrollMarginTop: 90,
          display: contactState === 'fullscreen' ? 'none' : undefined,
        }}
      >
        <div className='term-line'>
          <span className='term-ln'>~</span>
          <span className='term-tk-com'>{`// ${t.sections.skills.toLowerCase()}.yaml`}</span>
        </div>
        <div
          className='term-grid-3'
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            marginTop: 16,
          }}
        >
          {skills.map((s, i) => (
            <div
              key={s.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                position: 'relative',
              }}
            >
              <span style={{ width: 80, fontSize: 13, color: palette.text }}>{s.name}</span>
              <div className='term-bar' style={{ flex: 1 }}>
                <span style={{ width: `${s.level}%` }} />
              </div>
              <span style={{ fontSize: 11, color: palette.dim, width: 32 }}>{s.level}</span>
              {i === 4 && (
                <Bug
                  id='bug-4'
                  hunter={hunter}
                  color={palette.red}
                  style={{ position: 'absolute', right: -16, top: -8 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div
        id='section-experience'
        data-reveal
        style={{
          padding: sectionPadding,
          scrollMarginTop: 90,
          display: contactState === 'fullscreen' ? 'none' : undefined,
        }}
      >
        <div className='term-line'>
          <span className='term-ln'>~</span>
          <span className='term-tk-com'>{`// ${t.sections.experience.toLowerCase()}.log`}</span>
        </div>
        <div
          style={{
            marginTop: 16,
            borderLeft: `2px solid ${palette.line}`,
            paddingLeft: 24,
          }}
        >
          {t.experience.jobs.map((e, i) => (
            <div key={i} style={{ marginBottom: 24, position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  left: -29,
                  top: 6,
                  width: 10,
                  height: 10,
                  background: i === 0 ? palette.accent : palette.dim,
                  borderRadius: '50%',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <div>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{e.title}</span>
                  <span style={{ color: palette.dim }}> @ </span>
                  <span style={{ color: palette.accent2 }}>{e.company}</span>
                </div>
                <span style={{ fontSize: 12, color: palette.dim }}>{e.period}</span>
              </div>
              <ul
                style={{
                  margin: '8px 0 0',
                  paddingLeft: 16,
                  color: palette.dim,
                  fontSize: 13,
                }}
              >
                {e.points.map((b, j) => (
                  <li key={j} style={{ marginBottom: 4 }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Why */}
      <div
        data-reveal
        style={{
          padding: sectionPadding,
          display: contactState === 'fullscreen' ? 'none' : undefined,
        }}
      >
        <div className='term-line'>
          <span className='term-ln'>~</span>
          <span className='term-tk-com'>{`// ${t.sections.why.toLowerCase()}`}</span>
        </div>
        <div
          className='term-grid-3'
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            marginTop: 16,
          }}
        >
          {whyEntries.map((w, i) => (
            <div key={i} className='term-card'>
              <div style={{ fontSize: 11, color: palette.accent }}>0{i + 1}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>{w.title}</div>
              <div style={{ fontSize: 12, color: palette.dim, marginTop: 4 }}>
                {w.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact panel */}
      <div
        id='section-contact'
        data-reveal
        style={{
          padding: contactState === 'fullscreen' ? 0 : sectionPadding,
          scrollMarginTop: 90,
        }}
      >
        <div
          className={contactState === 'fullscreen' ? '' : 'term-card'}
          style={{
            background: dark ? '#010409' : '#f6f8fa',
            position: 'relative',
            border: contactState === 'fullscreen' ? 0 : undefined,
            display: 'flex',
            flexDirection: 'column',
            minHeight: contactState === 'fullscreen' ? '100vh' : undefined,
            padding: contactState === 'fullscreen' ? '16px 24px' : 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 16,
              paddingBottom: 8,
              borderBottom: `1px solid ${palette.line}`,
            }}
          >
            <div className='term-mac-group' style={{ display: 'flex', gap: 8 }}>
              <button
                type='button'
                onClick={handleContactClose}
                aria-label={contactState === 'fullscreen' ? 'Exit fullscreen' : 'Decorative'}
                title={contactState === 'fullscreen' ? 'Exit fullscreen' : ''}
                data-glyph='✕'
                data-decorative={contactState !== 'fullscreen'}
                className='term-mac'
                style={{ background: MAC_RED }}
              />
              <button
                type='button'
                onClick={handleContactNoop}
                aria-label='Decorative'
                title=''
                data-glyph='—'
                data-decorative={true}
                className='term-mac'
                style={{ background: MAC_YELLOW }}
              />
              <button
                type='button'
                onClick={handleContactFullscreen}
                aria-label='Toggle terminal fullscreen'
                title={contactState === 'fullscreen' ? 'Exit fullscreen' : 'Fullscreen'}
                data-glyph='⤢'
                className='term-mac'
                style={{ background: MAC_GREEN }}
              />
            </div>
            <span style={{ marginLeft: 8, fontSize: 12, color: palette.dim }}>
              contact.sh — try: help, ai, sudo bug-hunt
            </span>
          </div>
          <div
            style={{
              minHeight: 160,
              flex: 1,
              overflowY: 'auto',
              maxHeight: contactState === 'fullscreen' ? undefined : 480,
            }}
            onClick={() => cmdInputRef.current?.focus()}
          >
            {cmdHistory.map((h, i) => {
              const isThinking = h.text.startsWith('__thinking_');
              return (
                <div
                  key={i}
                  style={{
                    color:
                      h.type === 'err'
                        ? palette.red
                        : h.type === 'res'
                        ? palette.dim
                        : palette.text,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {isThinking ? (
                    <span className='term-dots-spin'>
                      🤖 {t.terminal.aiThinking} <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </span>
                  ) : (
                    h.text
                  )}
                </div>
              );
            })}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  color: mode === 'ai' ? palette.accent2 : palette.accent,
                  marginRight: 8,
                }}
              >
                {mode === 'ai' ? 'ai>' : 'andrey@portfolio:~$'}
              </span>
              <input
                ref={cmdInputRef}
                className='term-input'
                value={cmdInput}
                onChange={(e) => {
                  setCmdInput(e.target.value);
                  setStackIdx(-1);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (cmdInput.trim() && !aiLoading) runCmd(cmdInput);
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (cmdStack.length === 0) return;
                    const next = Math.min(stackIdx + 1, cmdStack.length - 1);
                    setStackIdx(next);
                    setCmdInput(cmdStack[next]);
                  } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const next = stackIdx - 1;
                    setStackIdx(next);
                    setCmdInput(next < 0 ? '' : cmdStack[next]);
                  }
                }}
                placeholder={mode === 'ai' ? 'ask anything…' : "type 'help'"}
                disabled={aiLoading}
                autoCapitalize='off'
                autoCorrect='off'
                spellCheck={false}
                inputMode='text'
                style={{ caretColor: palette.accent }}
                autoFocus
              />
            </div>
            <div ref={cmdEndRef} />
          </div>
          <div
            style={{
              display: 'flex',
              gap: 6,
              padding: '8px 0 0',
              borderTop: `1px solid ${palette.line}`,
              marginTop: 8,
              overflowX: 'auto',
            }}
            className='scrollbar-hide'
          >
            {(mode === 'ai'
              ? ['exit', 'clear']
              : ['help', 'whoami', 'projects', 'skills', 'ai', 'sudo bug-hunt']
            ).map((q) => (
              <button
                key={q}
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  if (!aiLoading) runCmd(q);
                }}
                style={{
                  flexShrink: 0,
                  padding: '4px 10px',
                  fontSize: 11,
                  background: 'transparent',
                  border: `1px solid ${palette.line}`,
                  color: palette.dim,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  borderRadius: 4,
                  whiteSpace: 'nowrap',
                }}
              >
                {q}
              </button>
            ))}
          </div>
          <Bug
            id='bug-5'
            hunter={hunter}
            color={palette.red}
            style={{ top: 12, right: 12 }}
          />
        </div>

        <div
          style={{
            marginTop: 24,
            display: contactState === 'fullscreen' ? 'none' : 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: palette.dim,
            fontSize: 12,
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span>{`// ${t.contact.headline}`}</span>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a
              href='https://github.com/Dreusus'
              target='_blank'
              rel='noopener noreferrer'
              style={{ color: palette.text, textDecoration: 'none' }}
            >
              github.com/Dreusus →
            </a>
            <a
              href='https://www.linkedin.com/in/dreusus/'
              target='_blank'
              rel='noopener noreferrer'
              style={{ color: palette.text, textDecoration: 'none' }}
            >
              linkedin →
            </a>
            <a
              href='https://t.me/dreusus'
              target='_blank'
              rel='noopener noreferrer'
              style={{ color: palette.text, textDecoration: 'none' }}
            >
              telegram →
            </a>
          </div>
        </div>
      </div>

      <BugHunterPill hunter={hunter} theme={theme} accent={palette.accent} />
    </div>
    {splashOverlay}
    {minimizedOverlay}
    </>
  );
};
