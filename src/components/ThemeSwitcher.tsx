import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  type Theme = '☀️' | '🌙';

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    return saved ? saved : '☀️';
  });

  const switchTheme = () => {
    setTheme((prev) => (prev === '☀️' ? '🌙' : '☀️'));
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) {
      setTheme(saved);
      return;
    }
  }, []);

  useEffect(() => {
    const isLight = theme === '☀️';

    if (!document.startViewTransition) {
      document.documentElement.style.setProperty('--theme', theme);
      return;
    }

    document.startViewTransition(() => {
      if (isLight) {
        document.documentElement.style.removeProperty('--theme');
      } else {
        document.documentElement.style.setProperty('--theme', theme);
      }
    });

    localStorage.setItem('theme', theme);
  }, [theme]);

  const text = theme === '☀️' ? 'Dark mode' : 'Light mode';
  const icon = theme === '☀️' ? 'icon-moon-stroke' : 'icon-brightness_high';

  return (
    <button
      type="button"
      className="btn btn--mode"
      onClick={switchTheme}
      aria-pressed={theme === '🌙'}
      aria-label={text}
      title={text}
    >
      <svg className="btn__icon" aria-hidden="true">
        <use href={`/icons.svg#${icon}`}></use>
      </svg>
      <span>{text}</span>
    </button>
  );
}
