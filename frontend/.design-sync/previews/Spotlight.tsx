import React from 'react';
import { Spotlight } from '@/components';

// Spotlight tracks the pointer inside the element named by `containerId` and
// trails three blurred `bg-secondary` blobs behind it. A static card has no
// pointer, so each cell parks the cursor with a synthetic mousemove — that is
// the only way the effect is visible in a screenshot.
const Stage = ({
  id,
  at,
  children,
}: {
  id: string;
  at: { x: number; y: number };
  children?: React.ReactNode;
}) => {
  React.useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const point = () => {
      const r = el.getBoundingClientRect();
      window.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: r.left + at.x,
          clientY: r.top + at.y,
          bubbles: true,
        })
      );
    };
    const timers = [0, 120, 350, 600, 900, 1400].map((d) => setTimeout(point, d));
    return () => timers.forEach(clearTimeout);
  }, [id, at.x, at.y]);

  return (
    <div
      id={id}
      style={{
        position: 'relative',
        width: 560,
        maxWidth: '100%',
        height: 320,
        overflow: 'hidden',
        borderRadius: 12,
        border: '1px solid #e2e8e0',
        background: '#ffffff',
      }}
    >
      <Spotlight containerId={id} />
      {children}
    </div>
  );
};

export const Default = () => (
  <Stage id='spotlight-preview-default' at={{ x: 280, y: 150 }} />
);

export const BehindContent = () => (
  <Stage id='spotlight-preview-content' at={{ x: 220, y: 120 }}>
    <div
      style={{
        position: 'relative',
        zIndex: 20,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 8,
        padding: '0 32px',
      }}
    >
      <div style={{ fontSize: 14, color: '#6b7280' }}>Andrey Polyakov</div>
      <h2 style={{ fontSize: 30, fontWeight: 600, margin: 0 }}>Full Stack QA Engineer</h2>
      <p style={{ maxWidth: 340, fontSize: 14, color: '#6b7280', margin: 0 }}>
        Test automation, API and UI coverage, CI pipelines that stay green.
      </p>
    </div>
  </Stage>
);

export const CornerPosition = () => (
  <Stage id='spotlight-preview-corner' at={{ x: 460, y: 230 }}>
    <div
      style={{
        position: 'absolute',
        left: 24,
        top: 24,
        zIndex: 20,
        fontFamily: "ui-monospace, 'Geist Mono', monospace",
        fontSize: 12,
        color: '#6b7280',
      }}
    >
      apolyakov.tech
    </div>
  </Stage>
);
