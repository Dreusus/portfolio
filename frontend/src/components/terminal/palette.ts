export interface TerminalPalette {
  bg: string;
  panel: string;
  line: string;
  text: string;
  dim: string;
  accent: string;
  accent2: string;
  warn: string;
  red: string;
}

export const darkPalette: TerminalPalette = {
  bg: '#0d1117',
  panel: '#161b22',
  line: '#21262d',
  text: '#c9d1d9',
  dim: '#8b949e',
  accent: '#3fb950',
  accent2: '#58a6ff',
  warn: '#d29922',
  red: '#f85149',
};

export const lightPalette: TerminalPalette = {
  bg: '#fafbfc',
  panel: '#ffffff',
  line: '#e1e4e8',
  text: '#24292e',
  dim: '#6a737d',
  accent: '#28a745',
  accent2: '#0366d6',
  warn: '#b08800',
  red: '#d73a49',
};

export const getPalette = (theme: 'dark' | 'light'): TerminalPalette =>
  theme === 'dark' ? darkPalette : lightPalette;
