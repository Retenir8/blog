'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeContext = createContext({ night: false, toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [night, setNight] = useState(false);
  useEffect(() => {
    setNight(document.documentElement.dataset.theme === 'night');
  }, []);
  function toggle() {
    const value = !night;
    setNight(value);
    document.documentElement.dataset.theme = value ? 'night' : 'day';
    try {
      localStorage.setItem('blog-theme', value ? 'night' : 'day');
    } catch {
      /* Theme still works without storage. */
    }
  }
  return (
    <ThemeContext.Provider value={{ night, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const { night, toggle } = useContext(ThemeContext);
  return (
    <Button
      variant="ghost"
      size="icon"
      className="theme-toggle"
      onClick={toggle}
      aria-label={night ? '切换为白天天空' : '切换为夜晚天空'}
      title={night ? '白天天空' : '夜晚天空'}
    >
      {night ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}
