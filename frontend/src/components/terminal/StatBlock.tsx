'use client';

import React from 'react';

interface StatBlockProps {
  value: number;
  label: string;
  accent: string;
  dim: string;
}

export const StatBlock: React.FC<StatBlockProps> = ({ value, label, accent, dim }) => (
  <div>
    <div
      style={{
        fontSize: 28,
        fontWeight: 700,
        color: accent,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {value.toLocaleString()}
    </div>
    <div style={{ fontSize: 11, color: dim }}>{label}</div>
  </div>
);
