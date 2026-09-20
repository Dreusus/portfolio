'use client';

import React from 'react';
import { MissionProvider } from './MissionContext';
import { Cursor } from './Cursor';
import { Hud, StatusLine } from './Hud';
import { Boot } from './Boot';
import { Now } from './Now';
import { StackField } from './StackField';
import { History } from './History';
import { Contact } from './Contact';
import { Bugs } from './Bugs';
import { PassWave } from './PassWave';

export const MissionControl: React.FC = () => (
  <MissionProvider>
    <Cursor />
    <Hud />
    <main className='relative w-full'>
      <Boot />
      <Now />
      <StackField />
      <History />
      <Contact />
    </main>
    <StatusLine />
    <Bugs />
    <PassWave />
  </MissionProvider>
);
