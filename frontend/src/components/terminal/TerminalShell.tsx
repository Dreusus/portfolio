'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from '@/data/i18n';
import { useBugHunter, useIsMobile, useReveal } from '@/hooks';
import { SKILLS } from '@/data/skillsData';
import { Bug } from './Bug';
import { BugHunterPill } from './BugHunterPill';
import { StatBlock } from './StatBlock';
import { ContribGraph } from './ContribGraph';
import { getPalette } from './palette';

type Theme = 'dark' | 'light';
type CmdEntry = { type: 'out' | 'res' | 'err'; text: string };
type WindowState = 'normal' | 'collapsed' | 'fullscreen' | 'closed';
type ContactState = 'normal' | 'collapsed' | 'fullscreen';
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
  const [windowState, setWindowState] = useState<WindowState>('normal');
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

  useEffect(() => {
    if (isMobile) setContactState('collapsed');
  }, [isMobile]);

  const fullName = `${t.name.first} ${t.name.last}`;
  const skills = useMemo(() => SKILLS.slice(0, 12), []);
  const whyEntries = useMemo(() => Object.values(t.whyChooseMe.features), [t]);

  const cmdEndRef = useRef<HTMLDivElement | null>(null);
  const cmdInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    cmdEndRef.current?.scrollIntoView({ block: 'nearest' });
  }, [cmdHistory]);

  // IntersectionObserver to track which section is in view → highlight tab
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
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
  }, []);

  const scrollToSection = useCallback((tabId: string) => {
    setActiveTab(tabId);
    const tab = TABS.find((tb) => tb.id === tabId);
    if (!tab) return;
    const el = document.getElementById(tab.section);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Window controls — main bar
  const handleClose = () => setWindowState('closed');
  const handleCollapse = () =>
    setWindowState((s) => (s === 'collapsed' ? 'normal' : 'collapsed'));
  const handleFullscreen = () =>
    setWindowState((s) => (s === 'fullscreen' ? 'normal' : 'fullscreen'));

  // Contact panel controls
  const handleContactClear = () => {
    setCmdHistory([]);
    setMode('cmd');
  };
  const handleContactCollapse = () =>
    setContactState((s) => (s === 'collapsed' ? 'normal' : 'collapsed'));
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

  // ---- Window-state styles ----
  const isFullscreen = windowState === 'fullscreen';
  const isCollapsed = windowState === 'collapsed';

  if (windowState === 'closed') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: 32,
        }}
      >
        <button
          onClick={() => setWindowState('normal')}
          style={{
            background: palette.panel,
            color: palette.text,
            border: `1px solid ${palette.line}`,
            padding: '20px 32px',
            cursor: 'pointer',
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <span style={{ color: palette.red }}>⬤ {t.terminal.windowClosed}</span>
          <span style={{ color: palette.dim, fontSize: 12 }}>{t.terminal.reopen}</span>
        </button>
      </div>
    );
  }

  const outerStyle: React.CSSProperties = isFullscreen
    ? {
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
      }
    : {
        width: '100%',
        maxWidth: 1280,
        margin: '0 auto',
        background: palette.bg,
        color: palette.text,
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        fontSize: 14,
        lineHeight: 1.6,
        position: 'relative',
      };

  const sectionPadding = '0 32px 32px';

  return (
    <div style={outerStyle}>
      <style>{`
        .term-tab { padding: 8px 14px; background: transparent; border: 0; border-right: 1px solid ${palette.line}; color: ${palette.dim}; font-family: inherit; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: color .15s, background .15s; }
        .term-tab:hover { color: ${palette.text}; background: ${palette.bg}; }
        .term-tab.active { background: ${palette.bg}; color: ${palette.text}; border-bottom: 2px solid ${palette.accent}; }
        .term-mac { width: 12px; height: 12px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; transition: filter .15s, transform .1s; position: relative; }
        .term-mac:hover { filter: brightness(1.2); }
        .term-mac:active { transform: scale(0.9); }
        .term-mac::before { content: attr(data-glyph); font-size: 8px; color: rgba(0,0,0,0.55); position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0; }
        .term-mac:hover::before { opacity: 1; }
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

      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 16px',
          background: palette.panel,
          borderBottom: `1px solid ${palette.line}`,
          position: 'sticky',
          top: 0,
          zIndex: 20,
        }}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type='button'
            onClick={handleClose}
            aria-label='Close terminal'
            title='Close'
            data-glyph='✕'
            className='term-mac'
            style={{ background: '#ff5f57' }}
          />
          <button
            type='button'
            onClick={handleCollapse}
            aria-label='Minimize terminal'
            title={isCollapsed ? 'Expand' : 'Minimize'}
            data-glyph='—'
            className='term-mac'
            style={{ background: '#febc2e' }}
          />
          <button
            type='button'
            onClick={handleFullscreen}
            aria-label='Toggle fullscreen'
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            data-glyph='⤢'
            className='term-mac'
            style={{ background: '#28c840' }}
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
          position: 'sticky',
          top: 41,
          zIndex: 19,
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
                  background:
                    activeTab === tab.id ? palette.bg : 'transparent',
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

      {!isCollapsed && (
        <>
          {/* Hero / about */}
          <div id='section-about' style={{ padding: '32px 32px 0', scrollMarginTop: 90 }}>
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
              display: 'grid',
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
            <div className='term-card'>
              <div style={{ color: palette.dim, fontSize: 11, marginBottom: 12 }}>
                # {t.sections.stats}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <StatBlock
                  value={t.stats.contributions}
                  label={t.stats.label_contributions}
                  accent={palette.accent}
                  dim={palette.dim}
                />
                <StatBlock
                  value={t.stats.repos}
                  label={t.stats.label_repos}
                  accent={palette.accent2}
                  dim={palette.dim}
                />
                <StatBlock
                  value={t.stats.stars}
                  label={t.stats.label_stars}
                  accent={palette.warn}
                  dim={palette.dim}
                />
                <StatBlock
                  value={t.stats.bugs}
                  label={t.stats.label_bugs}
                  accent={palette.red}
                  dim={palette.dim}
                />
              </div>
              <ContribGraph palette={palette} />
            </div>
          </div>

          {/* Projects */}
          <div
            id='section-projects'
            data-reveal
            style={{ padding: sectionPadding, scrollMarginTop: 90 }}
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
            style={{ padding: sectionPadding, position: 'relative', scrollMarginTop: 90 }}
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
            style={{ padding: sectionPadding, scrollMarginTop: 90 }}
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
          <div data-reveal style={{ padding: sectionPadding }}>
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
            style={{ padding: sectionPadding, scrollMarginTop: 90 }}
          >
            <div
              className='term-card'
              style={{
                background: dark ? '#010409' : '#f6f8fa',
                position: contactState === 'fullscreen' ? 'fixed' : 'relative',
                inset: contactState === 'fullscreen' ? '24px' : undefined,
                zIndex: contactState === 'fullscreen' ? 60 : undefined,
                boxShadow:
                  contactState === 'fullscreen'
                    ? `0 20px 60px rgba(0,0,0,0.6)`
                    : undefined,
                display: 'flex',
                flexDirection: 'column',
                maxHeight: contactState === 'fullscreen' ? 'calc(100vh - 48px)' : undefined,
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
                <button
                  type='button'
                  onClick={handleContactClear}
                  aria-label='Clear terminal'
                  title='Clear history'
                  data-glyph='✕'
                  className='term-mac'
                  style={{ background: palette.red }}
                />
                <button
                  type='button'
                  onClick={handleContactCollapse}
                  aria-label='Collapse terminal output'
                  title={contactState === 'collapsed' ? 'Expand' : 'Collapse'}
                  data-glyph='—'
                  className='term-mac'
                  style={{ background: palette.warn }}
                />
                <button
                  type='button'
                  onClick={handleContactFullscreen}
                  aria-label='Toggle terminal fullscreen'
                  title={contactState === 'fullscreen' ? 'Exit fullscreen' : 'Fullscreen'}
                  data-glyph='⤢'
                  className='term-mac'
                  style={{ background: palette.accent }}
                />
                <span style={{ marginLeft: 8, fontSize: 12, color: palette.dim }}>
                  contact.sh — try: help, ai, sudo bug-hunt
                </span>
              </div>
              {contactState !== 'collapsed' && (
                <div
                  style={{
                    minHeight: 160,
                    flex: 1,
                    overflowY: 'auto',
                    maxHeight:
                      contactState === 'fullscreen' ? 'calc(100vh - 160px)' : 480,
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
                      placeholder={
                        mode === 'ai' ? 'ask anything…' : "type 'help'"
                      }
                      disabled={aiLoading}
                      autoCapitalize='off'
                      autoCorrect='off'
                      spellCheck={false}
                      inputMode='text'
                    />
                    <span className='term-blink' style={{ color: palette.accent }}>
                      ▊
                    </span>
                  </div>
                  <div ref={cmdEndRef} />
                </div>
              )}
              {contactState !== 'collapsed' && (
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
              )}
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
                display: 'flex',
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
        </>
      )}

      <BugHunterPill hunter={hunter} theme={theme} accent={palette.accent} />
    </div>
  );
};
