'use client';

import React, { createContext, useContext, useCallback, useSyncExternalStore } from 'react';
import { en } from './en';
import { ru } from './ru';

type Language = 'en' | 'ru';
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const translations: Record<Language, Translations> = { en, ru };

const defaultValue: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: en,
};

const LanguageContext = createContext<LanguageContextType>(defaultValue);

let listeners: (() => void)[] = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
}

function getSnapshot(): Language {
  const saved = localStorage.getItem('language');
  if (saved === 'en' || saved === 'ru') {
    return saved;
  }
  return 'en';
}

function getServerSnapshot(): Language {
  return 'en';
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLanguage = useCallback((lang: Language) => {
    localStorage.setItem('language', lang);
    emitChange();
  }, []);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  return useContext(LanguageContext);
};
