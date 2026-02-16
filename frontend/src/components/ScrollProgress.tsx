'use client';
import React from 'react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollProgress = (window.scrollY / totalHeight) * 100;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 bg-foreground/5 z-50">
      <div
        className="h-full bg-gradient-to-r from-icon-accent to-accent-yellow transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
