"use client";

import * as React from "react";

type Theme = "dark" | "light";

type ThemeContextValue = {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);
const storageKey = "portfolio-theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

function getCurrentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const savedTheme = window.localStorage.getItem(storageKey);
    const initialTheme =
      savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";

    applyTheme(initialTheme);
  }, []);

  const setTheme = React.useCallback((theme: Theme) => {
    window.localStorage.setItem(storageKey, theme);
    applyTheme(theme);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(getCurrentTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  const value = React.useMemo(
    () => ({
      setTheme,
      toggleTheme,
    }),
    [setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider.");
  }

  return context;
}
