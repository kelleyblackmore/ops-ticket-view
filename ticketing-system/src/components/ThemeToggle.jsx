import { useEffect, useState } from 'react';

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {}
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  const next = theme === 'dark' ? 'light' : 'dark';
  const label = theme === 'dark' ? 'Light' : 'Dark';

  return (
    <button className="primary" onClick={() => setTheme(next)} aria-label={`Switch to ${label} mode`}>
      {label} mode
    </button>
  );
}
