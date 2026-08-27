
import React, { useState, useEffect } from 'react';

const ThemeSwitcher: React.FC = () => {
  // null = not yet read from storage; the class on <html> is already
  // correct before hydration (set by the inline script in index.html).
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem('theme');
    } catch {}
    setIsDark(stored !== 'light');
  }, []);

  useEffect(() => {
    if (isDark === null) return;
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {}
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(isDark === false)}
      aria-label="Switch color theme"
      suppressHydrationWarning
      className="text-[11px] font-mono uppercase tracking-[0.2em] px-3.5 py-2 border border-line hover:border-fg text-muted hover:text-fg transition-colors duration-200 rounded-[3px]"
    >
      {isDark === false ? 'Dark' : 'Light'}
    </button>
  );
};

export default ThemeSwitcher;
