'use client';

import React from 'react';
import { BugHunter } from '@/hooks';
import { useTranslation } from '@/data/i18n';

interface BugHunterPillProps {
  hunter: BugHunter;
  theme?: 'light' | 'dark';
  accent?: string;
}

export const BugHunterPill: React.FC<BugHunterPillProps> = ({
  hunter,
  theme = 'dark',
  accent = '#3fb950',
}) => {
  const { t } = useTranslation();
  if (!hunter.active) return null;
  const dark = theme === 'dark';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: '12px 16px',
        background: dark ? 'rgba(15,15,17,0.92)' : 'rgba(255,255,255,0.95)',
        color: dark ? '#fff' : '#0f0f11',
        border: `1px solid ${accent}`,
        borderRadius: 8,
        fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
        fontSize: 12,
        backdropFilter: 'blur(8px)',
        boxShadow: dark ? '0 8px 24px rgba(0,0,0,0.5)' : '0 8px 24px rgba(0,0,0,0.1)',
        minWidth: 240,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: accent, fontWeight: 700 }}>🪲 BUG_HUNTER</span>
        <button
          onClick={hunter.toggle}
          style={{
            background: 'transparent',
            border: 0,
            color: 'inherit',
            cursor: 'pointer',
            opacity: 0.6,
          }}
          aria-label='Close bug hunter'
        >
          ✕
        </button>
      </div>
      {hunter.complete ? (
        <div style={{ color: accent }}>{t.bugHunter.complete}</div>
      ) : (
        <>
          <div style={{ opacity: 0.7 }}>{t.bugHunter.hint}</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {Array.from({ length: hunter.total }).map((_, i) => (
              <span
                key={i}
                style={{
                  width: 24,
                  height: 4,
                  background:
                    i < hunter.found.size ? accent : dark ? '#333' : '#e5e5e5',
                  borderRadius: 2,
                }}
              />
            ))}
          </div>
          <div style={{ opacity: 0.7 }}>
            {hunter.found.size}/{hunter.total} {t.bugHunter.progress}
          </div>
        </>
      )}
    </div>
  );
};
