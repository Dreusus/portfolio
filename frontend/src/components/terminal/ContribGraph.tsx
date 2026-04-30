import React from 'react';
import { TerminalPalette } from './palette';

interface ContribGraphProps {
  palette: TerminalPalette;
}

const TOTAL_CELLS = 7 * 26;

const CELLS: readonly number[] = Array.from({ length: TOTAL_CELLS }, (_, i) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return Math.floor((x - Math.floor(x)) * 5);
});

export const ContribGraph: React.FC<ContribGraphProps> = ({ palette }) => {
  const colors = palette.bg.startsWith('#0d')
    ? ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
    : ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(26, 1fr)',
        gap: 2,
        marginTop: 16,
      }}
    >
      {CELLS.map((v, i) => (
        <span
          key={i}
          style={{ aspectRatio: '1', background: colors[v], borderRadius: 1 }}
        />
      ))}
    </div>
  );
};
