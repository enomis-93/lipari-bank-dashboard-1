import { useEffect, useState } from 'react';
import styles from './Header.module.css';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // localStorage unavailable
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const Header = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🏦</span>
        <span className={styles.logoText}>LipariBank</span>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.themeToggle}
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          aria-label={isDark ? 'Passa al tema chiaro' : 'Passa al tema scuro'}
          title={isDark ? 'Tema chiaro' : 'Tema scuro'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
        <div className={styles.userInfo}>
          <span className={styles.greeting}>Benvenuto,</span>
          <span className={styles.userName}>Mario Rossi</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
