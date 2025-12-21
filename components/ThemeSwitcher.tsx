
import React, { useState, useEffect } from 'react';

const ThemeSwitcher: React.FC = () => {
  // Initializing with true for black theme as default
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 rounded-md text-xs uppercase tracking-widest font-bold"
    >
      {isDark ? 'Light' : 'Dark'}
    </button>
  );
};

export default ThemeSwitcher;
