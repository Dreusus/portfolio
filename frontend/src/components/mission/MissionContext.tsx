'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { useBugHunter, type BugHunter } from '@/hooks';

export type StageId = 'boot' | 'run' | 'suites' | 'stack' | 'history' | 'contact';
export const STAGES: StageId[] = ['boot', 'run', 'suites', 'stack', 'history', 'contact'];

interface MissionValue {
  hunter: BugHunter;
  stage: StageId;
  setStage: (s: StageId) => void;
  released: boolean;
  release: () => void;
  /** true when fancy motion is allowed: fine pointer + no reduced-motion */
  fancy: boolean;
  reduced: boolean;
  focusTerminal: () => void;
  terminalFocusTick: number;
}

const Ctx = createContext<MissionValue | null>(null);

export const MissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const hunter = useBugHunter(5);
  const [stage, setStage] = useState<StageId>('boot');
  const [released, setReleased] = useState(false);
  const [terminalFocusTick, setTick] = useState(0);
  const reducedPref = useReducedMotion();
  const reduced = !!reducedPref;
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const release = useCallback(() => {
    setReleased(true);
    window.setTimeout(() => setReleased(false), 2600);
  }, []);

  const focusTerminal = useCallback(() => setTick((v) => v + 1), []);

  const value = useMemo<MissionValue>(
    () => ({
      hunter,
      stage,
      setStage,
      released,
      release,
      fancy: finePointer && !reduced,
      reduced,
      focusTerminal,
      terminalFocusTick,
    }),
    [hunter, stage, released, release, finePointer, reduced, focusTerminal, terminalFocusTick],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useMission = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useMission outside MissionProvider');
  return v;
};
