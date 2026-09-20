'use client';

import React, { useEffect, useRef } from 'react';
import { useMission } from './MissionContext';

interface Ring {
  x: number;
  y: number;
  born: number;
}

const GAP = 34;
const RING_LIFE = 3200;
const RING_SPEED = 0.16; // px per ms

/**
 * Dot grid with sonar rings. Rings spawn from the pointer (or the centre when idle),
 * dots light up when a ring front passes over them. Pauses when hidden or offscreen.
 */
export const SonarCanvas: React.FC<{ className?: string }> = ({ className }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const { reduced } = useMission();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;
    let visible = true;
    let lastSpawn = 0;
    const rings: Ring[] = [];
    const pointer = { x: -1, y: -1, active: false };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(255,255,255,0.10)';
      for (let x = GAP / 2; x < w; x += GAP) {
        for (let y = GAP / 2; y < h; y += GAP) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const frame = (now: number) => {
      if (!running) return;
      if (!visible) {
        raf = requestAnimationFrame(frame);
        return;
      }
      if (now - lastSpawn > (pointer.active ? 900 : 1700)) {
        rings.push({
          x: pointer.active ? pointer.x : w * 0.5,
          y: pointer.active ? pointer.y : h * 0.45,
          born: now,
        });
        lastSpawn = now;
      }
      while (rings.length && now - rings[0].born > RING_LIFE) rings.shift();

      ctx.clearRect(0, 0, w, h);

      for (let x = GAP / 2; x < w; x += GAP) {
        for (let y = GAP / 2; y < h; y += GAP) {
          let glow = 0;
          for (const ring of rings) {
            const age = now - ring.born;
            const radius = age * RING_SPEED;
            const d = Math.hypot(x - ring.x, y - ring.y);
            const band = Math.abs(d - radius);
            if (band < 42) {
              const fade = 1 - age / RING_LIFE;
              glow = Math.max(glow, (1 - band / 42) * fade);
            }
          }
          if (pointer.active) {
            const dp = Math.hypot(x - pointer.x, y - pointer.y);
            if (dp < 140) glow = Math.max(glow, (1 - dp / 140) * 0.7);
          }
          const a = 0.08 + glow * 0.9;
          const r = 1 + glow * 1.8;
          ctx.fillStyle = glow > 0.05 ? `rgba(34,197,94,${a})` : `rgba(255,255,255,${a})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // faint ring outlines
      for (const ring of rings) {
        const age = now - ring.born;
        const radius = age * RING_SPEED;
        const alpha = (1 - age / RING_LIFE) * 0.18;
        ctx.strokeStyle = `rgba(34,197,94,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= w && pointer.y <= h;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onVis = () => {
      visible = document.visibilityState === 'visible';
    };

    resize();
    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(frame);
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerleave', onLeave);
      document.addEventListener('visibilitychange', onVis);
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting && document.visibilityState === 'visible';
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) drawStatic();
    });
    ro.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVis);
      io.disconnect();
      ro.disconnect();
    };
  }, [reduced]);

  return <canvas ref={ref} aria-hidden className={className} />;
};
