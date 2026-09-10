import { TypingAnimation } from '@/components';

// The component types character by character and never stops. A fast
// typingSpeed plus a long delayBetweenTexts means a screenshot lands on a
// fully typed phrase rather than on an empty span.
export const Default = () => (
  <div style={{ fontSize: 18 }}>
    <span style={{ color: '#6b7280' }}>I build </span>
    <TypingAnimation
      texts={['test automation frameworks']}
      typingSpeed={12}
      delayBetweenTexts={60000}
      className='font-medium'
    />
  </div>
);

export const HeroHeadline = () => (
  <div style={{ maxWidth: 560 }}>
    <div style={{ fontSize: 14, color: '#6b7280' }}>Andrey Polyakov</div>
    <h2 style={{ fontSize: 32, fontWeight: 600, margin: '4px 0 0' }}>Full Stack QA Engineer</h2>
    <div style={{ marginTop: 8, fontSize: 18, color: '#6b7280' }}>
      <TypingAnimation
        texts={['Playwright · pytest · FastAPI']}
        typingSpeed={12}
        delayBetweenTexts={60000}
      />
    </div>
  </div>
);

export const RotatingRoles = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 16 }}>
    <TypingAnimation
      texts={['QA Automation Engineer', 'Backend Developer', 'SDET']}
      typingSpeed={10}
      delayBetweenTexts={60000}
      className='font-medium'
    />
    <span style={{ fontSize: 13, color: '#6b7280' }}>
      texts rotate, then delete and retype
    </span>
  </div>
);

export const Monospace = () => (
  <div
    style={{
      borderRadius: 6,
      background: '#0d1117',
      padding: '12px 16px',
      fontFamily: "ui-monospace, 'Geist Mono', monospace",
      fontSize: 14,
      color: '#3fb950',
      display: 'inline-block',
    }}
  >
    <span style={{ color: '#8b949e' }}>$ </span>
    <TypingAnimation
      texts={['pytest -m smoke --alluredir=allure-results']}
      typingSpeed={10}
      delayBetweenTexts={60000}
    />
  </div>
);
